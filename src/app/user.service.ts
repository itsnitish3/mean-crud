import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private httpclient:HttpClient) { }

  getuser(): Observable<any>{
return this.httpclient.get("http://localhost:4300/api/get")
  }
  getuseid(): Observable<any>{
let param1= new HttpParams().set('id','6087ef92fd786b7a4631af50');
return this.httpclient.get("http://localhost:4300/api/get/id",{params:param1})
  }
}
