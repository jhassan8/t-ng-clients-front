import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private url: string = environment.api_url + 'clients';

  constructor(private http: HttpClient, private router: Router) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post<any>(this.url, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400) return throwError(e);
        Swal.fire('Error', e.error.message, 'error');
        return throwError(e);
      })
    );;
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.url}/id/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        Swal.fire('Error', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${this.url}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400) return throwError(e);
        Swal.fire('Error', e.error.message, 'error');
        return throwError(e);
      })
    );;
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.message, 'error');
        return throwError(e);
      })
    );;
  }
  
}
