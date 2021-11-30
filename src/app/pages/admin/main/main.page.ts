import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HelpersService} from '../../../services/helpers.service';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  categories: any;

  constructor(
    private router: Router,
    private helpers: HelpersService,
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.api.httpRequest('/category', 'get').then((result) => {
      this.categories = result;
    }).catch(async (err) => {
      this.helpers.toast(err, 'danger');
    });
  }

  logout() {
    localStorage.removeItem('jefftoken');
    this.router.navigate(['/home']);
  }
}
