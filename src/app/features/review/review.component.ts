import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AddReviewDialogComponent } from './add-review/add-review.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})

export class ReviewComponent {

  reviews: any[] = [];
  

   baseUrl = 'https://hwswfwvhaczkmtgmcgga.supabase.co/rest/v1/Reviews';

 headers = {
  apikey: 'sb_publishable_qz5LekabtEmKqxQXpsQwOA_mUF3XBhf',
  Authorization: 'Bearer sb_publishable_qz5LekabtEmKqxQXpsQwOA_mUF3XBhf',
  'Content-Type': 'application/json'
};

  constructor(private dialog: MatDialog,private http: HttpClient) {}

  ngOnInit() {
    this.loadReviews();
    this.reviewsload();
  }

  // ✅ Load reviews
  loadReviews() {
    const data = [
      {
        name: 'Arun',
        rating: 5,
        message: 'Amazing stay! Clean rooms and great service.'
      },
      {
        name: 'Priya',
        rating: 4,
        message: 'Very peaceful place. Food was good.'
      },
      {
        name: 'Karthik',
        rating: 5,
        message: 'Perfect for weekend getaway.'
      },
      {
        name: 'Divya',
        rating: 3,
        message: 'Rooms are decent, but service can improve.'
      }
    ];

    // ✅ FIXED star logic (boolean only)
    this.reviews = data.map(r => ({
      ...r,
      stars: Array.from({ length: 5 }, (_, i) => i < r.rating)
    }));
  }

  // ✅ Open dialog
  openDialog() {
    const ref = this.dialog.open(AddReviewDialogComponent, {
      width: '90%',
      maxWidth: '420px',
      panelClass: 'custom-dialog'
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return;

      const newReview = {
        ...res,
        stars: Array.from({ length: 5 }, (_, i) => i < res.rating)
      };

      this.reviews = [...this.reviews, newReview];
    });
  }

  trackByIndex(index: number) {
    return index;
  }

  reviewsload() {
   this.http.get(`${this.baseUrl}?select=*`, { headers: this.headers })
  .subscribe({
    next: res => 
      {console.log('GET:', res)
      this.reviews = (res as any[]).map(r => ({
        name: r.Name,
        rating: r.rating,
        message: r.Message,
        stars: Array.from({ length: 5 }, (_, i) => i < r.rating)
      }))
      },
    error: err => console.error(err)
  });
  }
  
}