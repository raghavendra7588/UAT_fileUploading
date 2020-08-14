import { Component, OnInit } from '@angular/core';
import { UploadDocumentService } from '../upload-document.service';
import { User } from '../upload-documents.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = new User();

  constructor(public uploadDocumentService: UploadDocumentService, public router: Router) { }

  ngOnInit(): void {
    this.user.username = '9821163016';
    this.user.password = '123456';
  }

  navigateToFileUpload() {
    this.uploadDocumentService.loginUser(this.user).subscribe(data => {
      console.log("new PRoject");
      console.log(data);

      this.uploadDocumentService.userId = data.id;
      this.uploadDocumentService.userName = data.name;
      this.uploadDocumentService.userRole = data.role;

      localStorage.setItem('token', data.token)
      this.router.navigate(['/uploadDocuments']);
    });

  }
}
