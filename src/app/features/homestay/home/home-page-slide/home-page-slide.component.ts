import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page-slide',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,  
    MatButtonModule
  ],
  templateUrl: './home-page-slide.component.html',
  styleUrl: './home-page-slide.component.scss',
  
})
export class HomePageSlideComponent {
  slides = [
    { img: 'assets/images/IMG6.jpg' },
    { img: 'assets/images/IMG7.jpg' },
    { img: 'assets/images/IMG8.jpg' },
    { img: 'assets/images/IMG6.jpg' }
  ];

  currentIndex = 0;
  private startX = 0;

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(i: number) {
    this.currentIndex = i;
  }

  // Swipe logic for mobile
  handleTouchStart(e: TouchEvent) {
    this.startX = e.touches[0].clientX;
  }

  handleTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches[0].clientX;
    const diff = this.startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? this.next() : this.prev();
    }
  }

}
