import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../../../../services/helpers.service';
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  prod: string;
  name: any;
  url: any;
  @ViewChild('inputFile') inputFile;

  constructor(
    private activeRoute: ActivatedRoute,
    private helpers: HelpersService,
    private api: ApiService,
    private router: Router
  ) { }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    this.id = this.activeRoute.snapshot.params.id;
    this.prod = this.activeRoute.snapshot.params.prod;
    if (this.prod !== '0') {
      await this.api.httpRequest('/product/' + this.prod, 'get').then((result) => {
        // @ts-ignore
        this.name = result.name;
        // @ts-ignore
        this.url = result.image;
      }).catch(async (err) => {
        this.helpers.toast(err, 'danger');
      });
    } else {
      this.name = '';
      this.url = '';
    }
  }

  async updateItem() {
    if (!this.name) {
      return this.helpers.toast('O nome é obrigatório', 'danger');
    } else if (this.prod === '0' && !this.url) {
      return this.helpers.toast('Escolha uma imagem para o produto', 'danger');
    }

    this.helpers.alertDialog(
      'Atualizar',
      'Você realmente deseja atualizar as informações?').then(async (res) => {
      // @ts-ignore
      if (res.success) {

        const form = new FormData();
        form.append('idCategory', this.id);
        form.append('id', this.prod);
        form.append('name', this.name);
        form.append('image', this.url);

        await this.api.httpRequest('/product', this.prod !== '0' ? 'put' : 'post',
          form).then((result) => {
          this.helpers.toast('Produto atualizada com sucesso', 'success');
          this.router.navigate(['/main']);
        }).catch(async (err) => {
          this.helpers.toast(err, 'danger');
        });
      }
    }).catch(err => {});
  }

  async deleteItem() {
    this.helpers.alertDialog(
      'Deletar',
      'Você realmente deseja deletar?').then(async (res) => {
      // @ts-ignore
      if (res.success) {
        await this.api.httpRequest('/product/' + this.id, 'delete').then((result) => {
          this.helpers.toast('Produto deletada com sucesso', 'success');
          this.router.navigate(['/main']);
        }).catch(async (err) => {
          this.helpers.toast(err, 'danger');
        });
      }
    }).catch(err => {});
  }

  getFile($event: any) {
    const input = document.querySelector('#file > input');
    // @ts-ignore
    this.url = input.files[0];
  }
}
