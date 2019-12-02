import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  client: Client;
  private file: File;

  constructor(private clientService: ClientService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(p => {
      let id =+ p.get('id');
      if(id) {
        this.clientService.getClient(id).subscribe(d => {
          this.client = d;
        })
      }
    })
  }

  selectFile(event) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.clientService.uploadAvatar(this.file, this.client.id).subscribe(d => {
      this.client = d;
      Swal.fire('Sucess', 'the file has been upload correcly.', 'success');
    });
  }

}
