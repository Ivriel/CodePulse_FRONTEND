import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post';
import {  Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css'
})
export class BlogpostList implements OnInit{
  blogPosts:any[] = []
  private subcription:Subscription | undefined

  constructor(private blogPostService:BlogPostService){}

  ngOnInit(): void {
    this.getAllBlogposts()
  }

  getAllBlogposts(): void {
    Swal.fire({
      title: 'Memuat data profile...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

   this.subcription = this.blogPostService.getAllBlogPosts().subscribe({
      next: (res:any[]) => {
        this.blogPosts = res
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat login',
          icon:'error'
        })
        console.error("Error loading blogposts")
      },
      complete:() => {
        Swal.close()
      }
    })
  }

}
