import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category';
import { Category } from '../../category/models/category.model';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { UpdateBlockPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule,FormsModule,MarkdownModule,MatSelectModule,MatButtonModule],
  templateUrl: './edit-blogpost.html', 
  styleUrl: './edit-blogpost.css'
})
export class EditBlogpost implements OnInit,OnDestroy{

  id:string | null = null
  routeSubscription?:Subscription
  model?:BlogPost
  categories$?:Observable<Category[]>
  selectedCategories?:string[]
  updateBlogPostSubscription?:Subscription
  getBlogPostSubscription?:Subscription
  deleteBlogPostSubscription?:Subscription

  constructor(private route:ActivatedRoute, private blogPostService:BlogPostService, private categoryService:CategoryService, private router:Router){ }

  ngOnInit(): void {
    this.categories$ =  this.categoryService.getAllCategories()

   this.routeSubscription= this.route.paramMap.subscribe({
      next:(params)=> {
       this.id = params.get('id')
       this.getBlogPostById()
      },
      error:(err:any) => {
        console.error("Error getting id: ",err)
      }
    })
  }

  getBlogPostById():void {

    if(this.id) {
    this.getBlogPostSubscription =  this.blogPostService.getBlogPostById(this.id).subscribe({
        next:(res)=> {
          // ensure publishedDate is a Date instance
          this.model = {
            ...res,
            publishedDate: new Date(res.publishedDate)
          }
          this.selectedCategories = res.categories.map(x=> x.id)
        }
      })
    }
   
  }

  onSubmit():void {
    if(this.model && this.id) {
      var updateBlogPost:UpdateBlockPost = {
        author:this.model.author,
        content:this.model.content,
        shortDescription:this.model.shortDescription,
        featuredImageUrl:this.model.featuredImageUrl,
        isVisible:this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedCategories?? []
      }

     this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id,updateBlogPost).subscribe({
        next:(value) => {
          alert("blogpost Updated successfully")
          this.router.navigateByUrl("/admin/blogposts")
        },
        error:(error:any) => {
          alert("error updating blogpost")
          console.error("Error updating blogpost: ",error)
        }
      })
    } 
  }

  onDelete(){
    if(this.id) {
      var confirmDelete = confirm("are you sure you wanna to delete this blogpost?")
      if(confirmDelete) {
        this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
          next:()=> {
            alert("Sucessfully deleting blogpost")
            this.router.navigateByUrl("/admin/blogposts")
          },
          error:(error:any)=> {
            alert("Error deleting blogpost")
            console.error("Error deleting blogpost: ",error)
          }
        })
      }
    }
  }

  backToBlogpost():void{
    this.router.navigateByUrl("/admin/blogposts")
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
    this.updateBlogPostSubscription?.unsubscribe()
    this.getBlogPostSubscription?.unsubscribe()
    this.deleteBlogPostSubscription?.unsubscribe()
  }

  // bind helpers for input[type=date]
  formatDate(dateValue?: Date): string | null {
    if (!dateValue) return null
    const d = new Date(dateValue)
    if (isNaN(d.getTime())) return null
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  onDateChange(value: string): void {
    if (!this.model) return
    // value comes as yyyy-MM-dd from the date input
    this.model.publishedDate = new Date(value)
  }

}
