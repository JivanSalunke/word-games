import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() message: string='';
  @Output() retry: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  tryAgain() {
    this.retry.emit();
  }
}
