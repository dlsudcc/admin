import { Component } from '@angular/core';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
      this.updateTheme(isDark);
    });
  }
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }

  private updateTheme(isDarkMode: boolean): void {
    const themeClass = isDarkMode ? 'dark-theme' : 'light-theme';
    document.documentElement.className = themeClass;
  }
}
