import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blogpost.model';
import { CommonModule } from '@angular/common';
import {  BlogPostService } from '../services/blog-post';
import { Router } from '@angular/router';
import { MarkdownComponent } from "ngx-markdown";
import { CategoryService } from '../../category/services/category';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blogpost-add',
  imports: [FormsModule, CommonModule, MarkdownComponent,MatSelectModule,MatButtonModule],
  templateUrl: './blogpost-add.html',
  styleUrl: './blogpost-add.css'
})
export class BlogpostAdd implements OnInit{
    model:AddBlogPost;
    categories$?: Observable<Category[]>

    constructor(private blogPostService:BlogPostService, private router:Router, private categoryService:CategoryService,){
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
}
