import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crupdate',
  templateUrl: './crupdate.component.html'
})
export class CrupdateComponent implements OnInit {

  title: string = "Create new client";
  client: Client = new Client();

  errors: string[]

  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  public create(): void {
    this.clientService.saveClient(this.client).subscribe(
      r => {
        this.router.navigate(['clients'])
        Swal.fire('saved successful!', `the client ${r.client.name} has been saved.`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
      }
    );
  }

  loadClient() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id) {
          this.clientService.getClient(id).subscribe(
            client => this.client = client
          )
        }
      }
    )
  }

  update() {
    this.clientService.updateClient(this.client).subscribe(
      r => {
        this.router.navigate(['clients'])
        Swal.fire('updated successful!', `the client ${r.client.name} has been updated.`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
      }
    );
  }

}
