import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { CLIENTS } from '../models/clients.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Observable<Client[]> {
    return of(CLIENTS);
  }
}
