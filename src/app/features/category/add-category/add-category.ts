import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory implements OnDestroy {

  model:AddCategoryRequest;
  private addCategorySubscription?:Subscription

  constructor(private categoryService:CategoryService,private router:Router){
    this.model = {
      name:'',
      urlHandle:''
    }
  }

  onFormSubmit(){
    this. addCategorySubscription =  this.categoryService.addCategory(this.model).subscribe({
      next:()=> {
        alert("Berhasil dikirim")
        this.router.navigateByUrl("/admin/categories")
      },
      error:(err:any) => {
        alert("Error")
        console.error(err)
      }
    })
  }

  ngOnDestroy(): void {
      this.addCategorySubscription?.unsubscribe()
  }
}
