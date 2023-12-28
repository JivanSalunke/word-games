import { Component, OnInit } from '@angular/core';
import { WordServiceService } from '../word-service.service';

@Component({
  selector: 'app-mirror-word',
  templateUrl: './mirror-word.component.html',
  styleUrls: ['./mirror-word.component.css'],
})
export class MirrorWordComponent implements OnInit {
  name: string = 'Angular';
  question: string = '';
  answer: string = '';
  score: number = 0;
  start: boolean = false;
  time: number = 0;
  timeOut: any;
  interval: any;
  waiting: boolean=false;
  wordLength: number = 5;
  duration: number = 10000;
  screenWidth: number = 0;
  personalBest: number=0;
  message: string = '';
  constructor(private wordService: WordServiceService) {}
  ngOnInit() {
    if (!this.personalBest) {
      localStorage.setItem('Best', '0');
    }
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 500) {
      this.wordLength = 4;
    }
  }
  startGame() {
    this.personalBest = Number(localStorage.getItem('Best'));
    this.waiting = true;
    this.score = -1;
    this.answer = '';
    this.question = '';
    this.answer = '';
    this.message = '';
    this.check();
  }
  setQuestion() {}
  sendAlert(message: string) {
    alert(message);
    this.start = false;
  }
  compare() {
    this.answer = this.answer.toLocaleLowerCase();
    if (this.question == this.answer) {
      clearTimeout(this.timeOut);
      this.check();
    }
  }
  check() {
    this.time = 10;

    clearInterval(this.interval);
    if (this.question == this.answer) {
      this.answer = '';
      this.score++;
      const length = Math.floor(Math.random() * this.wordLength) + 2;
      this.wordService.getOneWord(length).subscribe((data) => {
        this.question = data[0].toLowerCase();
        this.waiting = false;
        this.start = true;
      });
      this.interval = setInterval(() => {
        this.time--;
      }, 1000);
      this.timeOut = setTimeout(() => {
        this.check();
      }, this.duration);
    } else if (this.answer != this.question) {
      if (this.score > this.personalBest) {
        localStorage.setItem('Best', '' + this.score);
      }
      this.message =
        '<h3>Oopps Time Up!!!</h3> <h4> It was "' +
        this.question +
        '"!!!. your score is: ' +
        this.score +
        '</h4>';
    }
  }

  retry(e:any) {
    this.startGame();
  }
}
