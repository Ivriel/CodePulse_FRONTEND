import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, MarkdownComponent, MatButtonModule],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit {
  url:string | null =null
  blogPost$?:Observable<BlogPost>

  constructor(
    private route:ActivatedRoute,
    private blogPostService:BlogPostService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params:any)=> {
       this.url = params.get('url')
      }
    })

    // fetch blog details by url
    if(this.url) {
     this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url)
    }
  }

  onBackButton():void {
    this.router.navigateByUrl("/")
  }

}
