import { Pipe, PipeTransform } from '@angular/core';
import { Goal } from '../interfaces/goal';

@Pipe({
  name: 'goalFilter',
})
export class GoalFilterPipe implements PipeTransform {
  transform(goals: Goal[], searchText: string): Goal[] {
    if (!searchText) {
      return goals;
    }
    searchText = searchText.toLowerCase();
    return goals.filter((goal) => {
      return (
        goal.title.toLowerCase().includes(searchText) ||
        goal.description?.toLowerCase().includes(searchText)
      );
    });
  }
}
