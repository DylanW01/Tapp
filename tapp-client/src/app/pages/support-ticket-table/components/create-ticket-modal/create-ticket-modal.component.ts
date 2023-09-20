import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-create-ticket-modal",
  templateUrl: "./create-ticket-modal.component.html",
  styleUrls: ["./create-ticket-modal.component.scss"],
})
export class CreateTicketModalComponent implements OnInit {
  newTicket: FormGroup;

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private server: ServerService, private ngxLoader: NgxUiLoaderService) {
    this.newTicket = new FormGroup({
      lat: new FormControl(null, Validators.required),
      lon: new FormControl(null, Validators.required),
      type: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  saveTicket() {
    if (this.newTicket.valid) {
      this.activeModal.close(this.newTicket.value);
    } else {
      this.toastr.error("Check all fields are valid and try again", "Ticket not created");
    }
  }

  cancel() {
    this.activeModal.close();
  }
}
