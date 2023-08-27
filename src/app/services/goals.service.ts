import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Goal } from '../interfaces/goal';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  public goalsChanged = new Subject<Goal[]>();
  private goals: Goal[] = [];

  constructor() {}

  public getGoals() {
    return this.goals.slice();
  }

  public setGoals(goals: Goal[]) {
    this.goals = goals;
    this.goalsChanged.next(this.goals.slice());
  }

  public getGoal(id: number) {
    return { ...this.goals.find((goal) => goal.id === id) };
  }

  public addGoal(goal: Goal) {
    this.goals.push(goal);
    this.updateLocalStorage();
    this.goalsChanged.next(this.goals.slice());
  }

  public updateGoal(goal: Goal) {
    this.goals.forEach((g, i) => {
      g.id === goal.id ? (this.goals[i] = goal) : null;
    });
    this.updateLocalStorage();
    this.goalsChanged.next(this.goals.slice());
  }

  public deleteGoal(id: number) {
    this.goals = this.goals.filter((goal) => goal.id !== id);
    this.updateLocalStorage();
    this.goalsChanged.next(this.goals.slice());
  }

  public changeStatus(id: number, status: 'active' | 'done' | 'abandoned') {
    this.goals.forEach((g, i) => {
      g.id === id ? (this.goals[i].status = status) : null;
    });
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }
}
