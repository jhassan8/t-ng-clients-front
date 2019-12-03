import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() client: Client;
  file: File;
  progress: number = 0;

  constructor(private clientService: ClientService, public modalService: ModalService) { }

  ngOnInit() {
    // this.activateRoute.paramMap.subscribe(p => {
    //   let id =+ p.get('id');
    //   if(id) {
    //     this.clientService.getClient(id).subscribe(d => {
    //       this.client = d;
    //     })
    //   }
    // })
  }

  selectFile(event) {
    this.progress = 0;
    this.file = event.target.files[0];
    if(this.file.type.indexOf('image') < 0) {
      Swal.fire('Format error: ', 'The file format is invalid.', 'error');
      this.file = null;
    }
  }

  uploadFile() {
    if(!this.file) {
      Swal.fire('Upload error: ', 'please select a image file.', 'error');
    } else {
      this.clientService.uploadAvatar(this.file, this.client.id).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        } else if(event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.client = response.client as Client;

          this.modalService.uploadNotify.emit(this.client);
          Swal.fire('Sucess', response.message, 'success');
        }
      });
    }
  }

  closeModal() {
    this.modalService.close();
    this.file = null;
    this.progress = 0;
  }

}
