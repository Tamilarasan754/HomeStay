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
      'service_5ue8oaa',
      'template_q9zj7fp',
      templateParams,
      'Fk7SUFJMlF8dTMNB1'
    )
    .finally(() => {
      this.loadingService.hide();
    });
  }
}
