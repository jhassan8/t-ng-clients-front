import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{

  list: string[] = ['item 1', 'item 2', 'item 3', 'item 4']
  visible: boolean = true;

  constructor() { }

  toggle() {
    this.visible = !this.visible;
  }
}
