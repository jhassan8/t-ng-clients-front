import { Component, OnInit } from '@angular/core';
import { Client } from './models/client.model';
import { ClientService } from './services/client.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  paginator: any;

  selectedClient: Client;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  delete(client: Client): void {
    Swal.fire({
      title: `Are you sure you want to delete the client? ${client.name}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe(d => {
          this.clients = this.clients.filter(c => c !== client);
          Swal.fire(
            'Deleted!',
            `The client ${client.name} as beed deleted.`,
            'success'
          )
        })
      }
    })
  }

  ngOnInit() {
    // this.clientService.getClients().pipe(
    //   tap(clients => {
    //     clients.forEach(c => {
    //       console.log(c.name);
    //     })
    //   })
    // ).subscribe(clients => this.clients = clients);

    this.activatedRoute.paramMap.subscribe( params => {

      let page = +params.get('page') ? +params.get('page') : 0;

      this.clientService.getClientsPaggined(page).pipe(
        tap(r => {
          console.log(r);
          (r.content as Client[]).forEach(c => {
            console.log(c.name);
          })
        })
      ).subscribe(r => {
        this.clients = r.content as Client[];
        this.paginator = r;
      });

    });
    
  }

  openModal(client: Client) {
    this.selectedClient = client;
  }

}
