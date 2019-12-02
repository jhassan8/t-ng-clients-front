import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-AR';

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
    //return this.http.get<Client[]>(this.url);
    return this.http.get(this.url).pipe(
      map(r => {
        let c = r as Client[];
        return c.map(c => {
          c.name = c.name.toUpperCase();
          c.surname = c.name.toUpperCase();
          // not is a string implements with pipe
          // c.createAt = formatDate(c.createAt, 'dd/MM/yyyy', 'en-US');
          // using pipe in ts
          // registerLocaleData(localeES, 'es-AR');
          // c.createAt = new DatePipe('es-AR').transform(c.createAt, 'EEEE dd, MMMM yyyy');
          return c;
        });
      })
    );
  }

  getClientsPaggined(page: number): Observable<any> {
    //return this.http.get<Client[]>(this.url);
    return this.http.get(this.url+ '/page/' + page).pipe(
      map((r: any) => {
        (r.content as Client[]).map(c => {
          c.name = c.name.toUpperCase();
          c.surname = c.name.toUpperCase();
          return c;
        });
        return r;
      })
    );
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

  uploadAvatar(file: File, id): Observable<Client> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return this.http.post(`${this.url}/upload`, formData).pipe(
      map((r: any) => r.client as Client),
      catchError(e => {
        Swal.fire('Error', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
  
}
