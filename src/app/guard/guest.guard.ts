import { Injectable } from '@angular/core';
import {Router, CanLoad} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {
  constructor(
    private router: Router
  ) { }

  async canLoad(): Promise<boolean> {
    const data = localStorage.getItem('jefftoken');
    console.log('DATA: ' + data);
    if (data) {
      this.router.navigateByUrl('/main', { replaceUrl: true });
    }
    return true;
  }

}
