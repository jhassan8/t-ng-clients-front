import { Component, OnInit } from '@angular/core';
import { Client } from './models/client.model';
import { ClientService } from './services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) {
    this.clientService.getClients().subscribe(
      data => this.clients = data
    );
  }

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
  }

}
