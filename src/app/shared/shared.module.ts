import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';



@NgModule({
  declarations: [],
  imports: [HttpClientModule,
    // because I`m using lazy loading
    QuillModule.forRoot()],
  exports: [
    HttpClientModule,
    QuillModule]
})
export class SharedModule { }
