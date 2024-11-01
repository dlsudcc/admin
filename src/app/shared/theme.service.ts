import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  toggleTheme(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
  }
}