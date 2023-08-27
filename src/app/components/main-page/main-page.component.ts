import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/interfaces/goal';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalsService, private router: Router) {}

  ngOnInit(): void {
    this.goals = this.goalService.getGoals();
    this.goalService.goalsChanged.subscribe((goals) => {
      this.goals = goals;
    });
  }

  openNewGoalForm() {
    this.router.navigate(['main', 'new-goal']);
  }
}
