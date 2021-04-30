import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private httpclient:HttpClient) { }

  getuser(): Observable<any>{
return this.httpclient.get(environment.apiUrl+"/api/get")
  }
  getuseid(): Observable<any>{
let param1= new HttpParams().set('id','6087ef92fd786b7a4631af50');
return this.httpclient.get(environment.apiUrl+"/api/get/id",{params:param1})
  }
  // putPaymentDetail() {
  //   return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  // }
  // putuser():Observable<any>{
  //   return this.httpclient.put(environment.apiUrl+"/api")
  // }
  postUser(body:any) : Observable<any>{
    return this.httpclient.post(environment.apiUrl+'/api/create', body);
  }

}
