import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimerPageComponent } from './components/timer-page/timer-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { CardComponent } from './components/shared/card/card.component';
import { NewGoalComponent } from './components/main-page/new-goal/new-goal.component';
import { FormsModule } from '@angular/forms';
import { GoalsService } from './services/goals.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ViewGoalComponent } from './components/shared/view-goal/view-goal.component';
import { GuessTheNumberComponent } from './components/games-page/guess-the-number/guess-the-number.component';
import { GamesListComponent } from './components/games-page/games-list/games-list.component';
import { TimerComponent } from './components/timer-page/timer/timer.component';
import { StopWatchComponent } from './components/timer-page/stop-watch/stop-watch.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavBarComponent,
    MainPageComponent,
    TimerPageComponent,
    HistoryPageComponent,
    GamesPageComponent,
    SettingsPageComponent,
    CardComponent,
    NewGoalComponent,
    ErrorPageComponent,
    ViewGoalComponent,
    GuessTheNumberComponent,
    GamesListComponent,
    TimerComponent,
    StopWatchComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [GoalsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
