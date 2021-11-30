import { Component, OnInit } from '@angular/core';
import {HelpersService} from '../../../services/helpers.service';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: any;
  email: any;
  password: any;
  passconfirm: any;

  constructor(
    private helpers: HelpersService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async tryCreate() {
    if (!this.name) {
      return await this.helpers.toast('Preencha seu nome!', 'danger');
    } else if (!this.email) {
      return await this.helpers.toast('Preencha seu email!', 'danger');
    } else if (!this.password) {
      return await this.helpers.toast('Preencha a senha!', 'danger');
    } else if (!this.passconfirm) {
      return await this.helpers.toast('Preencha a senha de confirmação!', 'danger');
    } else if (this.password !== this.passconfirm) {
      return await this.helpers.toast('Sua senha e a de confirmação precisa ser idênticas.', 'danger');
    }

    await this.api.httpRequest('/signUp', 'post', {
      name: this.name,
      username: this.email,
      password: this.password
    }).then((result) => {
      this.helpers.toast('Sua conta foi criada com sucesso!', `success`);
      this.router.navigate(['/home']);
    }).catch(async (err) => {
      this.helpers.toast(err, 'danger');
    });
  }
}
