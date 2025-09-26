import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css'
})
export class BlogpostList implements OnInit{
  blogPosts$:Observable<any[]> | undefined

  constructor(private blogPostService:BlogPostService){}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts()
  }

}
