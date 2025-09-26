import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule,CommonModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css'
})
export class ImageSelector implements OnInit{
  private file?:File;
  fileName:string = '';
  title:string = '';
  images$?:Observable<BlogImage[]>

  @ViewChild('form',{static:false}) imageUploadForm?:NgForm 

  constructor(private imageService:ImageService){}

  ngOnInit(): void {
   this.getImages()
  }

    onFileUploadChange(event:Event):void {
      const element = event.currentTarget as HTMLInputElement
      this.file = element.files?.[0]
    }

    uploadImage():void {
      if(this.file && this.fileName !== '' && this.title !== '') {
        this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
          next:(res)=> {
            this.imageUploadForm?.resetForm()
            this.getImages()
          }
        })
      }
    }

    private getImages(){
      this.images$ = this.imageService.getAllImages()
    }
}
