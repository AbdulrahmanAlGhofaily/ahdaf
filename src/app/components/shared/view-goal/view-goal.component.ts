import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/interfaces/goal';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-view-goal',
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.css'],
})
export class ViewGoalComponent implements OnInit {
  goal!: Goal;
  goalId!: number | string;
  minDate!: string;
  done = false;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalsService: GoalsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.goalId = params['id'];
      this.goal = this.goalsService.getGoal(+this.goalId) as Goal;
    });
    this.done = this.goal.status === 'done';
    this.setMinDate();
  }

  getGoalEndDate(): string {
    const endDate = new Date(this.goal.endDate);
    return endDate.toLocaleDateString();
  }

  onDoneChange() {
    if (this.done) {
      this.goal.status = 'done';
    } else {
      this.goal.status = 'active';
    }
    this.goalsService.updateGoal(this.goal);
  }

  deleteGoal(): void {
    this.goalsService.deleteGoal(+this.goalId);
    this.closeGoal();
  }

  enterEditMode(): void {
    this.editMode = true;
  }

  closeGoal(): void {
    this.router.navigate(['main']);
  }

  updateGoal(form: NgForm): void {
    const updatedGoal = {
      ...this.goal,
      title: form.value.title,
      description: form.value.description,
      endDate: new Date(form.value.deadline),
    };
    this.goalsService.updateGoal(updatedGoal);
    this.leaveEditMode();
  }

  setMinDate(): void {
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
  }

  leaveEditMode(): void {
    this.editMode = false;
  }

  closeGoalView(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeGoal();
    }
  }
}
