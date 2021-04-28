import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });

  //   hide: boolean = false;
  // form: FormGroup;
  // private msg ;
  // form: FormGroup = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   phone: ['', [Validators.required, Validators.minLength(10)]]
  // });




  constructor(public fb: FormBuilder , private _UserService: UserService) // private http: HttpClient
  {

    this.form = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
    });
  }
listuser:User[];
// datas:User;
//  na=JSON.stringify(datas)

//  datas: User[]  ;

  ngOnInit() {
    this._UserService.getuser().subscribe(
      data=>{
            this.listuser= data;
            // console.log(this.listuser)
      }
    );

  }



  onLogin() {
    let formData: any = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('email', this.form.get('email').value);
    }


}
