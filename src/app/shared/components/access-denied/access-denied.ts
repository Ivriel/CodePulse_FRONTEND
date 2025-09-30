import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  imports: [MatButtonModule],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.css'
})
export class AccessDenied {
  constructor(private router:Router){}

  onBackButton():void {
    this.router.navigateByUrl("/")
  }
}
