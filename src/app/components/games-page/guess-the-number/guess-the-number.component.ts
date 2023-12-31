import { Component, OnInit } from '@angular/core';
import * as canvasConfetti from 'canvas-confetti';
import { Howl } from 'howler';

@Component({
  selector: 'app-guess-the-number',
  templateUrl: './guess-the-number.component.html',
  host: {
    class: 'classYouWantApplied',
  },
  styleUrls: ['./guess-the-number.component.css'],
})
export class GuessTheNumberComponent implements OnInit {
  randomNumber: number = 0;
  userGuess: number = 0;
  numberOfGuesses: number = 0;
  highscore: number = 0;
  message: string = 'خمن رقماً 😄';
  emoji: string = '❓';
  disableButton: boolean = false;
  sound = new Howl({
    src: ['assets/sounds/confetti-pop-sound-effect.mp3'],
    volume: 0.2,
  });

  constructor() {
    this.randomNumber = Math.floor(Math.random() * 100 + 1);
  }

  ngOnInit(): void {
    const gameData = JSON.parse(localStorage.getItem('gamesData') as string);
    if (!gameData.hasOwnProperty('guessTheNumber')) {
      gameData.guessTheNumber = {
        highscore: 0,
      };
      localStorage.setItem('gamesData', JSON.stringify(gameData));
    } else {
      this.highscore = gameData.guessTheNumber.highscore;
    }
  }

  resetGame() {
    this.randomNumber = Math.floor(Math.random() * 100 + 1);
    this.userGuess = 0;
    this.numberOfGuesses = 0;
    this.message = 'خمن رقماً 😄';
    this.emoji = '❓';
    this.disableButton = false;
  }

  checkGuess() {
    if (this.userGuess == this.randomNumber) {
      this.disableButton = true;
      this.numberOfGuesses++;
      this.message = `${this.randomNumber} هو الرقم الصحيح!`;
      this.emoji = '🥳';
      this.sound.play();
      canvasConfetti.create(
        document.querySelector('.canvas') as HTMLCanvasElement,
        {
          resize: true,
          useWorker: true,
        }
      )({
        particleCount: 200,
        spread: 150,
        origin: {
          y: 0.45,
        },
        ticks: 300,
        scalar: 1,
      });

      if (this.numberOfGuesses < this.highscore || this.highscore == 0) {
        this.highscore = this.numberOfGuesses;
        const gameData = JSON.parse(
          localStorage.getItem('gamesData') as string
        );
        gameData.guessTheNumber.highscore = this.highscore;
        localStorage.setItem('gamesData', JSON.stringify(gameData));
      }
    } else if (this.userGuess > this.randomNumber) {
      this.message = 'خمن رقماً أقل';
      this.emoji = '👇';
      this.numberOfGuesses++;
    } else {
      this.message = 'خمن رقماً أكبر';
      this.emoji = '👆';
      this.numberOfGuesses++;
    }
    this.userGuess = 0;
  }
}
