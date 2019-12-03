import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  state: boolean;

  constructor() { }

  open() {
    this.state = true;
  }

  close() {
    this.state = false;
  }
}
