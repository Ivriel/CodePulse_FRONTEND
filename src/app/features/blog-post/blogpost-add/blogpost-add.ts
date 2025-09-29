import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blogpost.model';
import { CommonModule } from '@angular/common';
import {  BlogPostService } from '../services/blog-post';
import { Router } from '@angular/router';
import { MarkdownComponent } from "ngx-markdown";
import { CategoryService } from '../../category/services/category';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageService } from '../../../shared/components/image-selector/image';

@Component({
  selector: 'app-blogpost-add',
  imports: [FormsModule, CommonModule, MarkdownComponent,MatSelectModule,MatButtonModule,ImageSelector],
  templateUrl: './blogpost-add.html',
  styleUrl: './blogpost-add.css'
})
export class BlogpostAdd implements OnInit,OnDestroy{
    model:AddBlogPost;
    categories$?: Observable<Category[]>
    isImageSelectorVisible:boolean = false
    imageSelectorSubscription?:Subscription

    constructor(
      private blogPostService:BlogPostService, 
      private router:Router, 
      private categoryService:CategoryService,
      private imageService:ImageService
    ){
      this.model = {
        title:'',
        shortDescription:'',
        content:'',
        featuredImageUrl:'',
        urlHandle:'',
        author:'',
        publishedDate:new Date(),
        isVisible:false,
        categories:[],
      }
    }

    ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories()

     this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
        next:(selectedImage:any)=> {
          this.model.featuredImageUrl = selectedImage.url
          this.closeImageSelector()
        }
      })
    }

    onCategoryChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const selectedValues = Array.from(selectElement.selectedOptions, option => option.value);
      this.model.categories = selectedValues;
    }
    

    onBackButton():void {
      this.router.navigateByUrl("/admin/blogposts")
    }

    onSubmit(): void{
      console.log(this.model)
      this.blogPostService.createBlogPost(this.model).subscribe({
        next:()=> {
          this.router.navigateByUrl("/admin/blogposts")
          alert("Blog Post Added Successfully")
        },
        error:(err:any)=> {
          console.error("Error adding blogpost: ",err)
          alert("Error adding blogpost")
        }
      })
    }

    openImageSelector():void {
      this.isImageSelectorVisible = true
    }
  
    closeImageSelector():void {
      this.isImageSelectorVisible = false
    }

    ngOnDestroy(): void {
      this.imageSelectorSubscription?.unsubscribe()
    }
  
}
