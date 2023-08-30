import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';

interface TimerValues {
  seconds: string;
  minutes: string;
  hours: string;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  private timerSubscription?: Subscription;
  timerValueInSeconds: number = 0;
  isTimerRunning: boolean = false;
  timerValues: TimerValues = {
    seconds: '00',
    minutes: '00',
    hours: '00',
  };

  validateInput(field: keyof TimerValues, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 2;

    let sanitizedValue = inputElement.value.replace(/[^\d-]/g, '');
    if (sanitizedValue.length > 1) {
      sanitizedValue =
        sanitizedValue.charAt(0) + sanitizedValue.slice(1).replace('-', '');
    }

    if (sanitizedValue.length > maxLength) {
      sanitizedValue = sanitizedValue.slice(0, maxLength);
    }

    inputElement.value = sanitizedValue;
    this.timerValues[field] = sanitizedValue;

    const enteredValue = parseInt(sanitizedValue, 10);
    let maxValue = 59;

    if (field === 'hours') {
      maxValue = 23;
    }

    if (enteredValue > maxValue) {
      inputElement.value = maxValue.toString();
      this.timerValues[field] = inputElement.value;
    }
  }

  startTimer() {
    if (!this.isTimerRunning) {
      if (this.timerValueInSeconds <= 0) {
        this.timerValueInSeconds =
          this.convertToSeconds(this.timerValues.hours, 'hours') +
          this.convertToSeconds(this.timerValues.minutes, 'minutes') +
          this.convertToSeconds(this.timerValues.seconds, 'seconds');
      }

      this.timerSubscription = timer(0, 1000).subscribe(() => {
        if (this.timerValueInSeconds > 0) {
          this.timerValueInSeconds--;
          this.timerValues = {
            seconds: (this.timerValueInSeconds % 60)
              .toString()
              .padStart(2, '0'),
            minutes: (Math.floor(this.timerValueInSeconds / 60) % 60)
              .toString()
              .padStart(2, '0'),
            hours: Math.floor(this.timerValueInSeconds / 3600)
              .toString()
              .padStart(2, '0'),
          };
        } else {
          this.pauseTimer();
        }
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
      seconds: '00',
      minutes: '00',
      hours: '00',
    };
    this.timerValueInSeconds = 0;
  }

  private convertToSeconds(
    value: string,
    unit: 'hours' | 'minutes' | 'seconds'
  ): number {
    return (
      parseInt(value, 10) *
      (unit === 'hours' ? 3600 : unit === 'minutes' ? 60 : 1)
    );
  }

  ngOnDestroy() {
    this.pauseTimer();
  }
}
