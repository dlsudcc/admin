import { Component, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastDTO } from './toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  toasts: ToastDTO[] = [];
  timeElapsed: number[] = []; // To keep track of time elapsed for each toast
  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(toast => {
      if (toast) {
        this.toasts.push(toast);
        const interval = setInterval(() => {
          toast.timeLeft! -= 10; // Decrease time left by 100ms
          if (toast.timeLeft! <= 0) {
            clearInterval(interval);
            this.remove(this.toasts.indexOf(toast)); // Remove the toast when time runs out
          }
        }, 10);
      }
    });
  }
  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
