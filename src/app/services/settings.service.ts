import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  public setTheme(theme: string) {
    document.body.style.background = theme;
    localStorage.setItem('theme', theme);
  }
}
