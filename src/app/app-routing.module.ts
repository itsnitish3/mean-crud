import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { PostFormComponent } from './post-form/post-form.component';


const routes: Routes = [
  { path: 'form', component: PostFormComponent },
  { path: 'file', component: FileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
