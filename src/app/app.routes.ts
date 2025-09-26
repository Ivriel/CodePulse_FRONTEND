import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { BlogpostList } from './features/blog-post/blogpost-list/blogpost-list';
import { BlogpostAdd } from './features/blog-post/blogpost-add/blogpost-add';
import { EditBlogpost } from './features/blog-post/edit-blogpost/edit-blogpost';

export const routes: Routes = [
    {
        path:'admin/categories',
        component:CategoryList
    },
    {
        path:'admin/categories/add',
        component:AddCategory
    },
    {
        path:'admin/categories/:id',
        component:EditCategory
    },
    {
        path:'admin/blogposts',
        component:BlogpostList
    },
    {
        path:'admin/blogposts/add',
        component:BlogpostAdd
    },
    {
        path:'admin/blogposts/:id',
        component:EditBlogpost
    }
    
];
