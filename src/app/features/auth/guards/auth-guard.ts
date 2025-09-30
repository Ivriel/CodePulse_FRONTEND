import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  const router = inject(Router)
  const authService = inject(AuthService)
  const user = authService.getUser()

  // jwt token
  let token = cookieService.get('Authorization')

  if(token && user) {// buat ngecek ada token atau ga + expires apa ga
    token = token.replace('Bearer ','') // soalnya ada word bearer token makanya enggak bisa langsung di decocde. harus benar benar jwt nya (dipisah dari bearer) aja
    const decodedToken:any = jwtDecode(token)

    // check kalau token expired
    const expirationDate = decodedToken.exp * 1000
    const currentTime = new Date().getTime()

    if(expirationDate < currentTime) {
      authService.logout()
      alert("Please login first")
      return router.createUrlTree(['/login'],{
        queryParams:{
          returnUrl:state.url
        }
      })
    } else {
      // token masih valid
      if(user.roles.includes('Writer')) {
        return true
      } else {
        alert('Unauthorized')
        return false
      }
    }

  } else {
    authService.logout()
    alert("Please login first")
    return router.createUrlTree(['/login'],{
      queryParams:{
      returnUrl:state.url
    }})
  }

};
