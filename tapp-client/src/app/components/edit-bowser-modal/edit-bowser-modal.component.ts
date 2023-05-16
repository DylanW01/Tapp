import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-bowser-modal",
  templateUrl: "./edit-bowser-modal.component.html",
  styleUrls: ["./edit-bowser-modal.component.scss"],
})
export class EditBowserModalComponent implements OnInit {
  bowser: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  saveBowser() {
    this.activeModal.close(this.bowser);
  }

  cancel() {
    this.activeModal.close(false);
  }
}
