import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  state: boolean;
  private _uploadNotify = new EventEmitter<any>();

  constructor() { }

  get uploadNotify(): EventEmitter<any> {
    return this._uploadNotify;
  }

  open() {
    this.state = true;
  }

  close() {
    this.state = false;
  }
}
