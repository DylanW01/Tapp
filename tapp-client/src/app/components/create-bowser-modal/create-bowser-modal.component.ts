import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-bowser-modal',
  templateUrl: './create-bowser-modal.component.html',
  styleUrls: ['./create-bowser-modal.component.scss']
})
export class CreateBowserModalComponent implements OnInit {

  bowser: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  saveBowser() {
    this.activeModal.close(this.bowser);
  }

  cancel() {
    this.activeModal.close(false);
  }
}
