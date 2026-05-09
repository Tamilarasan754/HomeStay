import { Component, OnInit } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReviewComponent } from "../../../review/review.component";
import{HomePageSlideComponent} from "../../home/home-page-slide/home-page-slide.component"
import { BookingFormComponent } from '../../booking/booking-form/booking-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    ReviewComponent,
    HomePageSlideComponent,
    BookingFormComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {


  constructor() {
  }
  displayText = '';
  fullText = 'Where the wind carries stories and the Hills keep secrets....';
  isMenuOpen: boolean = false;

  ngOnInit() {
    this.startTyping();
  }

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
  ];
  // For Word-by-Word version
startTyping() {
  const words = this.fullText.split(" ");
  let i = 0;
  const typingInterval = setInterval(() => {
    this.displayText += words[i] + " ";
    i++;
    if (i === words.length) clearInterval(typingInterval);
  }, 400); // Slower speed for words
}
}
