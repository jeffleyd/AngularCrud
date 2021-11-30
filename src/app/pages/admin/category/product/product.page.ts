import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../../../services/helpers.service';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public products: any;
  public id: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private helpers: HelpersService,
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.id = this.activeRoute.snapshot.params.id;
    await this.api.httpRequest('/product', 'get').then((result) => {
      this.products = result;
    }).catch(async (err) => {
      this.helpers.toast(err, 'danger');
    });
  }
}
