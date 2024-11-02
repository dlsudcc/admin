import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastDTO, ToastType } from '../components/toast/toast';
import { CONFIG_TOASTDURATION_SECONDS } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: ToastDTO = null;
  private toastSubject = new BehaviorSubject<ToastDTO>(this.toast);
  toast$ = this.toastSubject.asObservable();

  add(title: string, message: string, type: ToastType) {
    const toast = new ToastDTO(); // Create a new instance of ToastDTO
    toast.title = title;
    toast.message = message;
    toast.type = type;
    toast.duration = CONFIG_TOASTDURATION_SECONDS * 1000;
    toast.timeLeft = toast.duration;
    this.toastSubject.next(toast);
  }
}
