import { Component, OnInit } from '@angular/core';
import { WordServiceService } from '../word-service.service';

@Component({
  selector: 'app-jumbled-word',
  templateUrl: './jumbled-word.component.html',
  styleUrls: ['./jumbled-word.component.css'],
})
export class JumbledWordComponent implements OnInit {
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
  duration: number = 30000;
  screenWidth: number = 0;
  personalBest: number = Number(localStorage.getItem('jumbledBest'));
  questionToShow: string = '';
  message: string = '';
  constructor(private wordService: WordServiceService) {}

  ngOnInit() {
    if (!this.personalBest) {
      localStorage.setItem('jumbledBest', '0');
    }
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 500) {
      this.wordLength = 4;
    }
  }

  startGame() {
    this.personalBest = Number(localStorage.getItem('jumbledBest'));
    this.start = true;
    this.waiting = true;
    this.score = -1;
    this.answer = '';
    this.question = '';
    this.answer = '';
    this.message = '';
    this.check();
  }

  compare() {
    this.answer = this.answer.toLocaleLowerCase();
    if (this.question == this.answer) {
      clearTimeout(this.timeOut);
      this.check();
    }
  }

  getJumbledWord(word:string) {
    var a = word.split(''),
      n = a.length;
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join('');
  }

  check() {
    this.time = 30;
    clearInterval(this.interval);
    if (this.question == this.answer) {
      this.answer = '';
      this.score++;
      const length = Math.floor(Math.random() * this.wordLength) + 2;
      this.wordService.getOneWord(length).subscribe((data) => {
        this.question = data[0].toLowerCase();
        this.questionToShow = this.getJumbledWord(data[0].toLowerCase());
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
        localStorage.setItem('jumbledBest', '' + this.score);
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
