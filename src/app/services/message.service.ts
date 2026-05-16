import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 
  constructor(private loadingService: LoadingService) {}

  send(templateParams: any): Promise<any> {

    this.loadingService.show();

    return emailjs.send(
      'service_y818vcr',
      'template_q9zj7fp',
      templateParams,
      'pay5ymTaS_dzjK2Ul'
    )
    .finally(() => {
      this.loadingService.hide();
    });
  }
}
