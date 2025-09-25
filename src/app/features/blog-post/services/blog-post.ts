import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogPost {
  constructor(private http:HttpClient){}

  createBlogPost(data:AddBlogPost):Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`,data)
  }

  getAllBlogPosts():Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`)
  }

}
