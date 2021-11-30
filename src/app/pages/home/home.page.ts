import { Component, OnInit } from '@angular/core';
import {HelpersService} from '../../services/helpers.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  password: string;

  constructor(
    private helpers: HelpersService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async tryLogin() {
    if (!this.email) {
      return await this.helpers.toast('Preencha seu email!', 'danger');
    } else if (!this.password) {
      return await this.helpers.toast('Preencha sua senha de acesso!', 'danger');
    }

    await this.api.httpRequest('/signIn', 'post', {
      username: this.email,
      password: this.password
    }).then((result) => {
      const token = JSON.stringify(result);
      localStorage.setItem('jefftoken', token.replace(/['"]+/g, ''));
      this.router.navigate(['/main']);
    }).catch(async (err) => {
      this.helpers.toast(err, 'danger');
    });

  }
}
