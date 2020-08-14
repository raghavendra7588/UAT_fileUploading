import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUpload, User } from './upload-documents.model';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {

  userId: string;
  userName: string;
  userRole: string;

  public BASE_API = 'http://localhost:64968';

  public UPLOAD_DOCUMENT_URL = this.BASE_API + '/' + 'api/UploadFiles';
  public GET_ALL_RECORDS = this.BASE_API + '/' + 'api/UploadFiles';
  public GET_RECORD_BY_ID = this.BASE_API + '/' + 'api/UploadFiles';
  public LOGGED_IN_URL = 'http://203.112.144.38/uat_AdminApi/api/User/authenticate';

  constructor(public http: HttpClient) { }


  addHttptHeader(jsonType: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    if (jsonType) {
      headers = headers.append('Content-Type', 'application/json');
    } else {
      headers = headers.append('Content-Type', 'text/plain');
    }
    return headers;
  }

  uploadDocuments(fileUpload: any): Observable<any> {
    return this.http.post<any>(this.UPLOAD_DOCUMENT_URL, fileUpload);
  }

  getAllDocuments(): Observable<FileUpload> {
    return this.http.get<FileUpload>(this.GET_ALL_RECORDS);
  }
  getDocumentById(id: number): Observable<FileUpload> {
    return this.http.get<FileUpload>(this.GET_RECORD_BY_ID + '/' + id);
  }
  loginUser(user: User) {
    return this.http.post<any>(this.LOGGED_IN_URL, user);
  }

}
