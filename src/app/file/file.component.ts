import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  title = 'fileUpload';
  images;
  constructor(  private _UserService: UserService){}

  ngOnInit(){

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images)
    }
  }

  url="http://localhost:4300/file/a.png"
  onSubmit(){

    const formData = new FormData();
    formData.append('file', this.images);
    this._UserService.upload(formData).subscribe()

    }


  }
