import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  vloading: any;

  constructor(
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  async toast(msg: string, type: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: type,
      duration: 2000
    });
    await toast.present();
  }

  async loading(msg: string= 'Por favor, aguarde...') {
    this.vloading = await this.loadingController.create({
      message: msg
    });
    await this.vloading.present();
  }

  unloading() {
    this.vloading.dismiss();
  }

  async alertDialog(title: string, msg: string, inputsAdd?: any) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: title,
        message: msg,
        inputs: inputsAdd,
        buttons: [
          {
            text: 'Fechar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              reject(false);
            }
          }, {
            text: 'Confirmar',
            handler: (val) => {
              resolve({success: true, fields: val});
            }
          }
        ]
      });

      await alert.present();
    });

  }

  async validateDefault(arr: []) {
    return new Promise(async (resolve, reject) => {
      for (const val of arr) {
        const key = arr.indexOf(val);
        if (!val) {
          await this.toast('Você precisa preenchar o campo ' + key, 'danger');
          reject(false);
        }
      }
      resolve(true);
    });
  }
}
