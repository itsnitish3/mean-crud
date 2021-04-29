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
  // postuser(): Observable<any>{
  //   this.httpclient.post<any>('http://localhost:4300/api/create', { }).subscribe(data => {
  //           // this.postId = data.id;
  //           return this.data = data;
  //       })
  // }
  // postuser():Observable{
  //  this.httpclient.post('http://localhost:4300/api/create',body).subscribe(
  //     response=>{
  //       console.log(response)
  //     return this.User = response
  //     },err=>{
  //       console.log(err)
  //     }
  //   )
  // }

  postUser(body:any) : Observable<any>{
    return this.httpclient.post(environment.apiUrl+'/api/create', body);
  }

}
