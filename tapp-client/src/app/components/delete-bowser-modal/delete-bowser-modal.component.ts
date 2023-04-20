import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-bowser-modal',
  templateUrl: './delete-bowser-modal.component.html',
  styleUrls: ['./delete-bowser-modal.component.scss']
})
export class DeleteBowserModalComponent implements OnInit {

  bowserId: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  confirmDelete() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.close(false);
  }
}
