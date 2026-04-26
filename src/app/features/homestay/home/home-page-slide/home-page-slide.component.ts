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
    { img: 'https://picsum.photos/id/10/1200/800' },
    { img: 'https://picsum.photos/id/20/1200/800' },
    { img: 'https://picsum.photos/id/30/1200/800' },
    { img: 'https://picsum.photos/id/40/1200/800' }
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
