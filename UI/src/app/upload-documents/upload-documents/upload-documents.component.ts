import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmitterService } from '../emitter.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UploadDocumentService } from '../upload-document.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {

  selectedDocument: string;
  isDocumentTypeSelected: boolean = false;
  isFileUploaded: boolean = false;
  filename: string = null;
  fileData: File = null;
  fileName: any;
  @ViewChild('uploadForm') public uploadForm: NgForm;
  displayedColumns: string[] = ['fileType', 'filePath', 'createdOn'];

  dataSource: any;
  newRecordSubscription: Subscription;

  role: string;
  user: any;
  documents: any;
  userRole: string;
  userName: string;
  userId: string;


  constructor(public UploadDocumentsService: UploadDocumentService,
    public emitterService: EmitterService,
    public activatedRoute: ActivatedRoute,
    public toastr: ToastrService) {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.userId = params['userId'];
    //   this.role = params['role'];
    // });
  }


  ngOnInit(): void {
    this.userId = this.UploadDocumentsService.userId;
    this.userName = this.UploadDocumentsService.userName;
    this.userRole = this.UploadDocumentsService.userRole;
    if (this.userRole === 'partner') {
      this.documents = [
        { id: 0, type: 'Pan Card' },
        { id: 1, type: 'Aadhar Card' },
        { id: 3, type: 'Cancel Cheque' },
        { id: 4, type: 'Individual Photo Copy' }
      ];
    }
    else {
      this.documents = [
        { id: 0, type: 'Pan Card' },
        { id: 1, type: 'Aadhar Card' },
        { id: 2, type: 'Shop Act' },
        { id: 3, type: 'Cancel Cheque' },
        { id: 4, type: 'Individual Photo Copy' },
        { id: 5, type: 'Shop Photo' },
        { id: 6, type: 'Vendor Photo with Shop' }
      ];
    }

    this.fetchAllRecords();
    this.newRecordSubscription = this.emitterService.isRecord.subscribe(value => {
      if (value) {
        this.fetchAllRecords();
      }
    });
  }


  onFileSelect(e: any): void {
    this.fileData = <File>e.target.files[0];
    this.isFileUploaded = true;
    this.fileName = e.target.files[0].name;
  }


  onDocumentSubmit() {
    const formData = new FormData();
    formData.append('File', this.fileData, this.fileName);
    formData.append('documentType', this.selectedDocument);
    formData.append('userId', this.userId);
    formData.append('userName', this.userName);
    formData.append('userRole', this.userRole);

    this.UploadDocumentsService.uploadDocuments(formData).subscribe(data => {
      this.emitterService.isRecord.emit(true);
      this.toastr.success('File Uploaded Successfully');
      this.isFileUploaded = false;
      this.uploadForm.reset();
    });

  }

  fetchAllRecords() {
    this.UploadDocumentsService.getAllDocuments().subscribe(data => {
      this.dataSource = data;
    });
  }


  selectedDocumentType() {
    this.isDocumentTypeSelected = true;
  }


  ngOnDestroy() {
    this.isDocumentTypeSelected = false;
    this.newRecordSubscription.unsubscribe();
  }

}
