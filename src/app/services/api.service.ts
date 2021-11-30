import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HelpersService} from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://desafio-traux-nodejs.herokuapp.com/api';

  constructor(
    private http: HttpClient,
    private helpers: HelpersService
  ) { }

  httpRequest(part: string, method?: string, data?: any) {
    const token = localStorage.getItem('jefftoken');
    let headersOptions = new HttpHeaders();
    if (method === 'put' || method === 'post') {
      headersOptions = new HttpHeaders()
        .set('Access-Control-Allow-Origin' , '*')
        .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        .set('Accept','*/*')
        .set('Authorization', ' Bearer ' + token);
    } else {
      headersOptions = new HttpHeaders()
        .set('Access-Control-Allow-Origin' , '*')
        .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        .set('Accept','*/*')
        .set('Content-type','application/json')
        .set('Authorization', ' Bearer ' + token);
    }
    this.helpers.loading();
    return new Promise(async (resolve, reject) => {
      if (method === 'post') {
        this.http.post(`${this.url}${part}`, data, { headers: headersOptions }).subscribe(
          response => {
            this.helpers.unloading();
            console.log('Success: ' + JSON.stringify(response));
            resolve(response);
          },
          err => {
            console.log('Err post: ' + JSON.stringify(err));
            reject(this.errorReport(err));
            this.helpers.unloading();
          }
        );
      } else if (method === 'get') {
          this.http.get(`${this.url}${part}`, { headers: headersOptions, params: data }).subscribe(
            response => {
              this.helpers.unloading();
              console.log('Success: ' + JSON.stringify(response));
              resolve(response);
            },
            err => {
              console.log('Err get: ' + JSON.stringify(err));
              reject(this.errorReport(err));
              this.helpers.unloading();
            }
          );
      } else if (method === 'delete') {
        this.http.delete(`${this.url}${part}`, { headers: headersOptions }).subscribe(
          response => {
            this.helpers.unloading();
            console.log('Success: ' + JSON.stringify(response));
            resolve(response);
          },
          err => {
            console.log('Err get: ' + JSON.stringify(err));
            reject(this.errorReport(err));
            this.helpers.unloading();
          }
        );
      } else if (method === 'put') {
        this.http.put(`${this.url}${part}`, data, { headers: headersOptions}).subscribe(
          response => {
            this.helpers.unloading();
            console.log('Success: ' + JSON.stringify(response));
            resolve(response);
          },
          err => {
            console.log('Err get: ' + JSON.stringify(err));
            reject(this.errorReport(err));
            this.helpers.unloading();
          }
        );
      }
    });
  }

  // Registre seus códigos de erro aqui.
  errorReport(err) {
    let msg = '';
    switch (err.status) {
      case 400: {
        msg = err.error.message;
        break;
      }
      case 401: {
        msg = err.error.message ? err.error.message : err.error.error;
        break;
      }
      default: {
        msg = err.message;
        break;
      }
    }
    return msg;
  }
}
