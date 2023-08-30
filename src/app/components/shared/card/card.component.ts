import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/interfaces/goal';
import { GoalsService } from 'src/app/services/goals.service';
import * as canvasConfetti from 'canvas-confetti';

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
    const daysLeft =
      Math.floor(
        (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
      ) + 1;

    if (daysLeft < 0) {
      this.goalData.status = 'abandoned';
      this.goalsService.updateGoal(this.goalData);
    }

    return daysLeft;
  }

  handleGoalDone(event: Event) {
    event.stopPropagation();
    if (this.goalData.status === 'active') {
      this.goalData.status = 'done';
      canvasConfetti.create(
        document.querySelector('.canvas') as HTMLCanvasElement,
        {
          resize: true,
          useWorker: true,
        }
      )({
        particleCount: 200,
        spread: 150,
        origin: {
          y: 0.5,
        },
        ticks: 250,
        scalar: 1,
      });
      this.goalsService.updateGoal(this.goalData);
    } else if (this.goalData.status === 'done') {
      this.goalData.status = 'active';
      this.goalsService.updateGoal(this.goalData);
    }
  }
}
