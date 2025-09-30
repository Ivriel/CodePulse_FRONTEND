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
  totalCount?:number;
  list:number[] = [];
  pageNumber = 1;
  pageSize = 3;

  constructor(private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.categoryService.getCategoryCount().subscribe({
      next:(res:number)=> {
        this.totalCount = res;
        this.list = new Array(Math.ceil(res /  this.pageSize))
        this.categories$ =  this.categoryService.getAllCategories(
          undefined,undefined,undefined,this.pageNumber,this.pageSize
        );
      }
    })
  }

  onSearch(queryText:string):void {
    this.categories$ = this.categoryService.getAllCategories(queryText)
  }

  sort(sortBy:string, sortDirection:string) {
    this.categories$ = this.categoryService.getAllCategories(undefined,sortBy,sortDirection)
  }

  getPage(pageNumber:number){
    this.pageNumber = pageNumber
    this.categories$ =  this.categoryService.getAllCategories(
      undefined,undefined,undefined,this.pageNumber,this.pageSize
    );
  }

  getPrevPage(){
    if(this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1
    this.categories$ =  this.categoryService.getAllCategories(
      undefined,undefined,undefined,this.pageNumber,this.pageSize
    );
  }

  getNextPage(){
    if(this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber += 1
    this.categories$ =  this.categoryService.getAllCategories(
      undefined,undefined,undefined,this.pageNumber,this.pageSize
    );
  }

}