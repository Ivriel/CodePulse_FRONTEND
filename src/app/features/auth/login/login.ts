import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-request.model';
import {  AuthService } from '../services/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  model:LoginRequest

  constructor(
    private authService:AuthService, 
    private cookieService:CookieService,
    private router:Router
){
    this.model = {
      email:'', 
      password:''
    }
  }

  onFormSubmit():void{
    this.authService.login(this.model).subscribe({
      next:(res)=> {
        // set auth cookie
        alert("Berhasil login")
        this.cookieService.set('Authorization',`Bearer ${res.token}`,undefined,'/',undefined, true, 'Strict')
        
        // set user
        this.authService.setUser({
          email:res.email,
          roles:res.roles
        })
        
        // redirect back to home
        this.router.navigateByUrl("/")
      }
    })
  }

}
