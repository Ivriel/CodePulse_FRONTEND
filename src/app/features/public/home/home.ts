import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  blogs$?:Observable<BlogPost[]>

  constructor(private blogPostService:BlogPostService){}

  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPosts()  
  }

}
