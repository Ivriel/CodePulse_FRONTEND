import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { BlogpostList } from './features/blog-post/blogpost-list/blogpost-list';
import { BlogpostAdd } from './features/blog-post/blogpost-add/blogpost-add';
import { EditBlogpost } from './features/blog-post/edit-blogpost/edit-blogpost';
import { Home } from './features/public/home/home';
import { BlogDetails } from './features/public/blog-details/blog-details';
import { Login } from './features/auth/login/login';
import { authGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        component:Home
    },
    {
        path:'blog/:url',
        component:BlogDetails
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        canActivate:[authGuard],
        children:[
            {   
                path:'categories',
                component:CategoryList
            },
            {
                path:'categories/add',
                component:AddCategory
            },
            {
                path:'categories/:id',
                component:EditCategory
            },
            {
                path:'blogposts',
                component:BlogpostList
            },
            {
                path:'blogposts/add',
                component:BlogpostAdd
            },
            {
                path:'blogposts/:id',
                component:EditBlogpost
            }
        ]
    }
    
    
];
