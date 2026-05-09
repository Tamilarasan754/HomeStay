import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe,NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    public loadingService = inject(LoadingService);
}
