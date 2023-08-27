import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent {
  constructor(private settings: SettingsService) {}

  changeTheme(theme: string) {
    this.settings.setTheme(theme);
  }
}
