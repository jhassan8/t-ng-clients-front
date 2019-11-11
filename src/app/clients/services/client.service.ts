import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private url: string = environment.api_url + 'clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client, {headers: this.httpHeaders});
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.url}/id/${id}`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client.id}`, client, {headers: this.httpHeaders});
  }
  
}
