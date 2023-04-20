import { Component, Input, OnInit } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from "src/app/server.service";
import { ToastrService } from "ngx-toastr";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBowserModalComponent } from '../../components/delete-bowser-modal/delete-bowser-modal.component';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: "bowser-table",
  templateUrl: "./bowser-table.component.html",
  styleUrls: ["./bowser-table.component.scss"],
})
export class BowserTablesComponent implements OnInit {
  page = 1;
  bowsers: any[] = [];
  mappedArray = [];

  ngOnInit() {
    this.getBowsersForTable();    
  }

  constructor(private server: ServerService, private toastr: ToastrService, private modalService: NgbModal) { }

  private getBowsersForTable() {
    this.server.getBowsers().then((response: any[]) => {
      this.bowsers = response;
    });
  }

  deleteBowser(bowserId: number) {
    const modalRef = this.modalService.open(DeleteBowserModalComponent);
    modalRef.componentInstance.bowserId = bowserId;
    modalRef.result.then((result) => {
      if (result) {
        this.server.deleteBowser(bowserId).then(() => {
          this.toastr.success(
            "Bowser " + bowserId + " has been deleted."
          );
          this.getBowsersForTable();
        });
      } else {
        this.toastr.warning("Bowser " + bowserId + " has not been deleted.");
      }
    });

    
  }
}