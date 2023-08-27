import { Component, OnInit } from '@angular/core';
import { GoalsService } from './services/goals.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private goalsService: GoalsService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('goals')) {
      localStorage.setItem('goals', '[]');
    }
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    this.goalsService.setGoals(goals);

    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', '');
    } else {
      const theme = localStorage.getItem('theme') || '';
      this.settings.setTheme(theme);
    }
  }
}
