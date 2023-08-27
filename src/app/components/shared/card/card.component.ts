import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/interfaces/goal';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() goalData!: Goal;

  constructor(private goalsService: GoalsService, private router: Router) {}

  getGoalEndDate(): string {
    const endDate = new Date(this.goalData.endDate);
    return endDate.toLocaleDateString();
  }

  getDaysLeft(): number {
    const endDate = new Date(this.goalData.endDate);
    const currentDate = new Date();
    const daysLeft = Math.floor(
      (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );

    if (daysLeft < 0) {
      this.goalData.status = 'abandoned';
      this.goalsService.updateGoal(this.goalData);
    }

    return daysLeft;
  }
}
