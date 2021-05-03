import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
/** @title Form field with error messages */
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern('^[0-9]*$'),
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-z A-Z]*$'),
  ]);
  signupForm = this.formBuilder.group({
    name: this.name,
    phone: this.phone,
    email: this.email,
  });
  constructor(
    private formBuilder: FormBuilder,
    private _UserService: UserService
  ) {}

  onSubmit() {
    if (!this.idOfDataToBeUpdated) this.createuser();
    else this.updateuser();
    this._UserService.refreshList((data) => {
      this.listuser = data;
    });
  }
  listuser: User[];
  data;
  idOfDataToBeUpdated: string = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit() {
    this._UserService.getalluser().subscribe((data) => {
      this.listuser = data;
      // console.log(this.listuser)
    });
  }

  // submitData(){
  //   if (this._id)
  // }

  createuser() {
    if (this.phone.value || this.email.value || this.phone.value) {
      let body: any = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
      };
      this._UserService.postUser(body).subscribe(
        (data) => {
          console.log(data);
          this._UserService.refreshList((data) => {
            this.listuser = data;
          });
        },
        (err) => {
          console.log('err', err);
        }
      );
    } else {
      console.log('Please add data properly');
    }
    this.signupForm.reset();
  }

  deleteuser(id: any) {
    this._UserService.deleteuser(id).subscribe((res) => {
      this._UserService.refreshList((data) => {
        this.listuser = data;
      });
    });
  }
  getuser(data: any) {
    this._UserService.getuser(data._id).subscribe((res) => {
      this.data = res;
      this.idOfDataToBeUpdated = data._id;
      this.signupForm.setValue({
        name: data.name,
        phone: data.phone,
        email: data.email,
      });
    });
  }
  updateuser() {
    let body: any = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
    };
    console.log('Updated User Value', this.idOfDataToBeUpdated);
    this._UserService
      .updateUser(this.idOfDataToBeUpdated, body)
      .subscribe
      // body => {
      //   // this.signupForm.reset();
      //   console.log(this.idOfDataToBeUpdated);
      //   // console.warn(body);
      //   this._UserService.refreshList((data) => {
      //     this.listuser = data;
      //   });
      // },
      // err => { console.log(err); }
      ();
  }
}
