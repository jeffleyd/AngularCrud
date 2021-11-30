import { Injectable } from '@angular/core';
import {Router, CanLoad} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private router: Router
  ) { }

  async canLoad(): Promise<boolean> {
    const data = localStorage.getItem('jefftoken');
    if (!data) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
    return true;
  }

}
