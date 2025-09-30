import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit{
  categories$?: Observable<Category[]>;
  constructor(private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.categories$ =  this.categoryService.getAllCategories()
  }

  onSearch(queryText:string):void {
    this.categories$ = this.categoryService.getAllCategories(queryText)
  }

  sort(sortBy:string, sortDirection:string) {
    this.categories$ = this.categoryService.getAllCategories(undefined,sortBy,sortDirection)
  }

}