import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blogpost.model';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../services/blog-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './blogpost-add.html',
  styleUrl: './blogpost-add.css'
})
export class BlogpostAdd {
    model:AddBlogPost;

    constructor(private blogPostService:BlogPost, private router:Router){
      this.model = {
        title:'',
        shortDescription:'',
        content:'',
        featuredImageUrl:'',
        urlHandle:'',
        author:'',
        publishedDate:new Date(),
        isVisible:false
      }
    }

    onSubmit(): void{
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
