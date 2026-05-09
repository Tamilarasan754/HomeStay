import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatOptionModule } from "@angular/material/core";
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
   CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,   
    MatOptionModule,    // Required for mat-option
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,       // Required for mat-icon
    MatSelectModule,    // Required for mat-select
    MatCardModule       // Required for mat-card
],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  providers: [DatePipe] 
})
export class BookingFormComponent implements OnInit {

 bookingForm!: FormGroup;

  constructor(private fb: FormBuilder,private datePipe: DatePipe) { 

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
console.log('Template Params:', templateParams); // Debug log

    emailjs.send(
      'service_5ue8oaa',     // 🔥service id
      'template_q9zj7fp',    //  template id
      templateParams,
      'Fk7SUFJMlF8dTMNB1'      // 🔥 from EmailJS
    ).then(
      (response) => {
        alert('Booking sent successfully.');
        this.bookingForm.reset(); // clear form
      },
      (error) => {
        alert('Failed to send booking Please Contact This Number :6369694843');
        console.error(error);
      }
    );

  } else {
    alert('Fill required fields');
  }
}

}
