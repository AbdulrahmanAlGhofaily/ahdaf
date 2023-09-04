import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/interfaces/goal';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  goals: Goal[] = [];
  searchText: string = '';

  constructor(private goalService: GoalsService, private router: Router) {}

  ngOnInit(): void {
    this.goals = this.goalService.getGoals();
    this.goalService.goalsChanged.subscribe((goals) => {
      this.goals = goals;
    });
  }
}
