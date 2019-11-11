import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crupdate',
  templateUrl: './crupdate.component.html'
})
export class CrupdateComponent implements OnInit {

  title: string = "Create new client";
  client: Client = new Client();

  constructor(private clientService: ClientService, private router: Router) { }

  public create(): void {
    this.clientService.saveClient(this.client).subscribe(
      r => {
        this.router.navigate(['clients'])
        Swal.fire('saved successful!', `the client ${r.name} has been saved.`, 'success');
      }
    );
  }

  ngOnInit() {
  }

}
