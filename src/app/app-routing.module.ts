import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimerPageComponent } from './components/timer-page/timer-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { NewGoalComponent } from './components/main-page/new-goal/new-goal.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ViewGoalComponent } from './components/shared/view-goal/view-goal.component';
import { GamesListComponent } from './components/games-page/games-list/games-list.component';
import { GuessTheNumberComponent } from './components/games-page/guess-the-number/guess-the-number.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: 'new-goal',
        component: NewGoalComponent,
      },
      {
        path: ':id',
        component: ViewGoalComponent,
      },
    ],
  },
  { path: 'history', component: HistoryPageComponent },
  { path: 'timer', component: TimerPageComponent },
  {
    path: 'games',
    component: GamesPageComponent,
    children: [
      { path: 'games-list', component: GamesListComponent },
      { path: 'guess-the-number', component: GuessTheNumberComponent },
    ],
  },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
