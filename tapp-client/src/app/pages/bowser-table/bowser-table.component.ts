import { Component, Input, OnInit } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from "src/app/server.service";
import { ToastrService } from "ngx-toastr";
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBowserModalComponent } from '../../components/delete-bowser-modal/delete-bowser-modal.component';
import { EditBowserModalComponent } from "src/app/components/edit-bowser-modal/edit-bowser-modal.component";
import { CreateBowserModalComponent } from "src/app/components/create-bowser-modal/create-bowser-modal.component";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: "bowser-table",
  templateUrl: "./bowser-table.component.html",
  styleUrls: ["./bowser-table.component.scss"],
})
export class BowserTablesComponent implements OnInit {
  page = 1;
  pageSize = 15;
  bowsers: any[] = [];
  mappedArray = [];
  options: NgbModalOptions = {
    backdrop: 'static',  };

  ngOnInit() {
    this.getBowsersForTable();    
  }

  constructor(private server: ServerService, private toastr: ToastrService, private modalService: NgbModal) { }

  private getBowsersForTable() {
    this.server.getBowsers().then((response: any[]) => {
      this.bowsers = response;
    });
  }

  createBowser() {
    const modalRef = this.modalService.open(CreateBowserModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.server.createBowser(result).then(() => {
          this.toastr.success(
            "Bowser has been created."
          );
          this.getBowsersForTable();
        });
      } else {
        this.toastr.warning("Bowser was not saved.");
      }
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

  editBowser(bowser) {
    const modalRef = this.modalService.open(EditBowserModalComponent, this.options);
    modalRef.componentInstance.bowser = bowser;
    modalRef.result.then((bowser) => {
      if (bowser) {
        this.server.updateBowser(bowser).then(() => {
          this.toastr.success(
            "Bowser " + bowser.bowserId + " updated successfully."
          );
          this.getBowsersForTable();
        });
      } else {
        this.toastr.warning("Changes to bowser " + bowser.bowserId + " have been discarded.");
      }
    });    
  }  
}