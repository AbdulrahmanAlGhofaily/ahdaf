import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css'],
})
export class StopWatchComponent implements OnDestroy {
  private timerSubscription?: Subscription;
  timerValueInMilliseconds: number = 0;
  isTimerRunning: boolean = false;
  timerValues = {
    milliseconds: '000',
    seconds: '00',
    minutes: '00',
    hours: '00',
  };

  startTimer() {
    if (!this.isTimerRunning) {
      this.timerSubscription = timer(0, 10).subscribe(() => {
        this.timerValueInMilliseconds += 10;
        this.updateTimeValues();
      });

      this.isTimerRunning = true;
    }
  }

  pauseTimer() {
    if (this.isTimerRunning) {
      this.timerSubscription?.unsubscribe();
      this.isTimerRunning = false;
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.timerValues = {
      milliseconds: '000',
      seconds: '00',
      minutes: '00',
      hours: '00',
    };
    this.timerValueInMilliseconds = 0;
  }

  private updateTimeValues() {
    const totalMilliseconds = this.timerValueInMilliseconds;
    this.timerValues = {
      milliseconds: (totalMilliseconds % 1000).toString().padStart(3, '0'),
      seconds: (Math.floor(totalMilliseconds / 1000) % 60)
        .toString()
        .padStart(2, '0'),
      minutes: (Math.floor(totalMilliseconds / 60000) % 60)
        .toString()
        .padStart(2, '0'),
      hours: Math.floor(totalMilliseconds / 3600000)
        .toString()
        .padStart(2, '0'),
    };
  }

  ngOnDestroy() {
    this.pauseTimer();
  }
}
