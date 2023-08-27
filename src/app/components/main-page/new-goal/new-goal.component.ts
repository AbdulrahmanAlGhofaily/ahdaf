import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css'],
})
export class NewGoalComponent {
  minDate!: string;

  constructor(private router: Router, private goalService: GoalsService) {
    this.setMinDate();
  }

  setMinDate(): void {
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
  }

  onAddGoal(form: NgForm): void {
    const goal = {
      id: this.goalService.getGoals().length,
      title: form.value.title,
      description: form.value.description,
      status: 'active' as 'active' | 'done' | 'abandoned',
      endDate: new Date(form.value.deadline),
    };
    this.goalService.addGoal(goal);
    this.closeForm();
  }

  closeForm(): void {
    this.router.navigate(['main']);
  }
}
