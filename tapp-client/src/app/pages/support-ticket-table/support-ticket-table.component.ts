import { Component, Input, OnInit } from "@angular/core";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { ServerService } from "src/app/server.service";
import { ToastrService } from "ngx-toastr";
import { NgbActiveModal, NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { DeleteBowserModalComponent } from "../bowser-table/components/delete-bowser-modal/delete-bowser-modal.component";
import { EditBowserModalComponent } from "../bowser-table/components/edit-bowser-modal/edit-bowser-modal.component";
import { CreateTicketModalComponent } from "./components/create-ticket-modal/create-ticket-modal.component";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: "bowser-table",
  templateUrl: "./support-ticket-table.component.html",
  styleUrls: ["./support-ticket-table.component.scss"],
})
export class TicketTablesComponent implements OnInit {
  page = 1;
  pageSize = 20;
  tickets: any[] = [];
  mappedArray = [];
  options: NgbModalOptions = {
    backdrop: "static",
  };

  ngOnInit() {
    this.getTicketsForTable();
  }

  constructor(private server: ServerService, private toastr: ToastrService, private modalService: NgbModal) {}

  private getTicketsForTable() {
    this.server.getTickets().then((response: any[]) => {
      this.tickets = response;
    });
  }

  createTicket() {
    const modalRef = this.modalService.open(CreateTicketModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.server.createBowser(result).then(() => {
          this.toastr.success("Ticket has been created.");
          this.getTicketsForTable();
        });
      } else {
        this.toastr.warning("Ticket was not saved.");
      }
    });
  }

  deleteTicket(ticket) {
    const modalRef = this.modalService.open(DeleteBowserModalComponent);
    //   modalRef.componentInstance.bowserId = ticket.requestId;
    //   modalRef.result.then((result) => {
    //     if (result) {
    this.server.deleteTicket(ticket).then(() => {
      this.toastr.success("Ticket " + ticket.requestId + " has been deleted.");
      this.getTicketsForTable();
      //       });
      //     } else {
      //       this.toastr.warning("Ticket " + ticket.requestId + " has not been deleted.");
      //     }
    });
  }

  editBowser(bowser) {
    const modalRef = this.modalService.open(EditBowserModalComponent, this.options);
    modalRef.componentInstance.bowser = bowser;
    modalRef.result.then((bowser) => {
      console.log(bowser);
      if (bowser) {
        this.server.updateBowser(bowser).then(() => {
          this.toastr.success("Bowser " + bowser.bowserId + " updated successfully.");
          this.getTicketsForTable();
        });
      } else {
        this.toastr.warning("Changes to bowser " + bowser.bowserId + " have been discarded.");
      }
    });
  }
}
