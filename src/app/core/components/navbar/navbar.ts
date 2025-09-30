import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';
import { User } from '../../../features/auth/models/user.model';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  user?:User
  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(res) => {
        this.user = res
      }
    })

   this.user =  this.authService.getUser()
  }

  onLogout():void {
    const isLogout = confirm("Are you sure you wanna to logout?")
    if(isLogout) {
      this.authService.logout()
      this.router.navigateByUrl("/")
    }
  }

}
