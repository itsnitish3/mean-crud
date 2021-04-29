import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
/** @title Form field with error messages */
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]);
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z A-Z]*$')]);
  signupForm = this.formBuilder.group({
    name: this.name,
    phone: this.phone,
    email: this.email
  });
  constructor(
    private formBuilder: FormBuilder, private _UserService: UserService
  ) { }
  onSubmit(): void {
    console.log(this.signupForm.value)
    var body = JSON.stringify(this.signupForm.value);
    console.log(body)

  }
  listuser: User[];

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit() {
    this._UserService.getuser().subscribe(
      data => {
        this.listuser = data;
        // console.log(this.listuser)
      }
    );

  }

  submitData() {
    if (this.phone.value || this.email.value || this.phone.value) {
      let body: any = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value
      };

      this._UserService.postUser(body).subscribe(data => {
        console.log(data);
      }, err => {
        console.log('err', err)
      });
    } else {
      console.log('Please add data properly')
    }


  }
}

