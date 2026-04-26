import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewDialogComponent {

     baseUrl = 'https://hwswfwvhaczkmtgmcgga.supabase.co/rest/v1/Reviews';

 headers = {
  apikey: 'sb_publishable_qz5LekabtEmKqxQXpsQwOA_mUF3XBhf',
  Authorization: 'Bearer sb_publishable_qz5LekabtEmKqxQXpsQwOA_mUF3XBhf',
  'Content-Type': 'application/json'
};
form: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReviewDialogComponent>,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
    name: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1)]],
    message: ['', Validators.required]
  });
  }

  setRating(value: number): void {
    this.form.patchValue({ rating: value });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;
    console.log('Review Submitted:', this.form.value);
    this.addReview(this.form.value.name, this.form.value.message, this.form.value.rating);
    this.dialogRef.close(this.form.value); 
  }
  addReview(name: string, message: string, rating: number) {
  this.http.post(
    this.baseUrl,
    {
      Name: name,
      Message: message,
      rating: rating
    },
    { headers: this.headers }
  ).subscribe({
    next: res => console.log('POST:', res),
    error: err => console.error(err)
  });
}
}