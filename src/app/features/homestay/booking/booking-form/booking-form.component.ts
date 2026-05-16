import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from "@angular/material/core";
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MessageService } from '../../../../services/message.service';



@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,   
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,     
    MatSelectModule,    
    MatCardModule       
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  providers: [DatePipe]
})
export class BookingFormComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private emailService: MessageService) {

  }
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      nights: [1, [Validators.required, Validators.min(1)]],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0],
      rooms: [1, [Validators.required, Validators.min(1)]],
      bookingType: ['family', Validators.required],
      message: ['']
    });
  }


  submitForm() {
    if (this.bookingForm.valid) {

      const formData = this.bookingForm.value;

      const templateParams = {
        name: formData.name,
        mobile: formData.mobile,
        checkin: this.datePipe.transform(formData.checkIn, 'dd-MMM-yyyy'),
        checkout: this.datePipe.transform(formData.checkOut, 'dd-MMM-yyyy'),
        nights: formData.nights,
        members: (formData.adults || 0) + (formData.children || 0),
        rooms: formData.rooms,
        adults: formData.adults,
        children: formData.children,
        bookingType: formData.bookingType,
        message: formData.message
      };
      console.log('Template Params:', templateParams); 

      this.emailService.send(templateParams)
        .then(() => {

          alert('Your booking request has been sent successfully.');

          this.bookingForm.reset();

        })
        .catch((error) => {

          alert('Failed to send booking request.');

          console.error(error);

        });
    }
  }
}
