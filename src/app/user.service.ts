import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private httpclient: HttpClient) {}
  listuser: User[];

  refreshList(data) {
    return this.httpclient
      .get(environment.apiUrl + '/api/get')
      .toPromise()
      .then(data);
  }
  upload(formdata: any): Observable<any> {
    return this.httpclient.post(environment.apiUrl + '/api/upload', formdata);
  }
  getalluser(): Observable<any> {
    return this.httpclient.get(environment.apiUrl + '/api/get');
  }
  getuser(id: any): Observable<any> {
    return this.httpclient.get(environment.apiUrl + '/api/getuser/' + id);
  }
  updateUser(id: any, body: any): Observable<any> {
    // console.log(id);
    // console.log('body',body)
    console.log('api', environment.apiUrl + '/api/update/' + id, 'body', body);
    return this.httpclient.put(environment.apiUrl + '/api/update/' + id, body);
  }
  deleteuser(id: any): Observable<any> {
    return this.httpclient.delete(
      `${environment.apiUrl + '/api/delete'}/${id}`
    );
  }
  postUser(body: any): Observable<any> {
    return this.httpclient.post(environment.apiUrl + '/api/create', body);
  }
}
