import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category';
import { Category } from '../models/category.model';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';


@Component({
  selector: 'app-edit-category',
  imports: [RouterLink,FormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css'
})
export class EditCategory implements OnInit,OnDestroy{

  id:string | null = null;
  paramsSubscription?:Subscription;
  category?:Category
  editCategorySubscription?:Subscription

  constructor(private route:ActivatedRoute, private categoryService:CategoryService, private router:Router){

  }

  ngOnInit(): void {
      this.paramsSubscription =  this.route.paramMap.subscribe({
        next:(params) => {
          this.id = params.get('id')

          if(this.id) {
              this.categoryService.getCategoryById(this.id).subscribe({
                next:(res:Category) => {
                  this.category = res
                }
              })  
          }
        }
      })
  }

    onFormSubmit():void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name:this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    if(this.id) {
   this.editCategorySubscription =  this.categoryService.updateCategory(this.id,updateCategoryRequest).subscribe({
      next:() => {
        this.router.navigateByUrl("/admin/categories")
      }
    })
    }

  }

  onDelete():void{
    const isDelete = confirm("Yakin ingin menghapus?")
    if(isDelete) {
      if(this.id) {
    this.categoryService.deleteCategory(this.id).subscribe({
      next:()=> {
        this.router.navigateByUrl("/admin/categories")
      }
    })
    }
    }
  }

  ngOnDestroy(): void {
      this.paramsSubscription?.unsubscribe()
      this.editCategorySubscription?.unsubscribe()
  }

}
