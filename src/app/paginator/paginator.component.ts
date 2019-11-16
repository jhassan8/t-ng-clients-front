import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;
  pages: number[]

  start: number;
  end: number;

  constructor() { }

  ngOnInit() {
    this.refreshPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    let pageChange = changes['paginator'];

    if(pageChange.previousValue) {
      this.refreshPages();
    }
  }

  refreshPages() {
    this.start = Math.min(Math.max(1, this.paginator.number-4), this.paginator.totalPages-5);
    this.start = Math.min(Math.max(this.paginator.totalPages, this.paginator.number+4), 6);
    if(this.paginator.totalPages > 5) {
      this.pages = new Array(this.end - this.start).fill(0).map((_value, index) => index + this.start);
    } else {
      this.pages = new Array(this.paginator.totalPages).fill(0).map((_value, index) => index + 1);
    }
  }

}
