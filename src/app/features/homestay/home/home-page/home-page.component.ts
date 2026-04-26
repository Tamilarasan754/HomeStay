import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReviewComponent } from "../../../review/review.component";
import{HomePageSlideComponent} from "../../home/home-page-slide/home-page-slide.component"

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    ReviewComponent,
    HomePageSlideComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      members: [''],
      checkIn: ['',[Validators.required]],
      checkOut: ['',[Validators.required]],
      message: [''],
      time:[''],
    });
  }
  
 // ✅ ONE state variable only
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  amenities = [
    { icon: '🛏️', title: 'Cozy Rooms', desc: 'Spacious rooms' },
    { icon: '🍳', title: 'Kitchen', desc: 'Home food' },
    { icon: '🌿', title: 'Garden', desc: 'Nature view' },
    { icon: '📶', title: 'WiFi', desc: 'Fast internet' },
    { icon: '🚗', title: 'Parking', desc: 'Free parking' },
    { icon: '☕', title: 'Breakfast', desc: 'Free breakfast' }
  ];

  submitForm() {
  if (this.bookingForm.valid) {

    const formData = this.bookingForm.value;

    const templateParams = {
      name: formData.name,
      time:formData.time,
      mobile: formData.mobile,
      members: formData.members,
      checkin: formData.checkIn,
      checkout: formData.checkOut,
      message: formData.message
    };

    emailjs.send(
      'service_5ue8oaa',     // 🔥service id
      'template_q9zj7fp',    //  template id
      templateParams,
      'Fk7SUFJMlF8dTMNB1'      // 🔥 from EmailJS
    ).then(
      (response) => {
        alert('Booking sent successfully');
        this.bookingForm.reset(); // clear form
      },
      (error) => {
        alert('Failed to send booking');
        console.error(error);
      }
    );

  } else {
    alert('Fill required fields');
  }
}
}
