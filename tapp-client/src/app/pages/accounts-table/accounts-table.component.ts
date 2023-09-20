import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import { CreateBowserModalComponent } from "../bowser-table/components/create-bowser-modal/create-bowser-modal.component";
import { CreateUserModalComponent } from "./components/create-user-modal/create-user-modal.component";

@Component({
  selector: "app-accounts-table",
  templateUrl: "./accounts-table.component.html",
  styleUrls: ["./accounts-table.component.scss"],
})
export class AccountsTableComponent implements OnInit {
  constructor(private server: ServerService, private toastr: ToastrService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  createUser() {
    const modalRef = this.modalService.open(CreateUserModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.server.createUser(result).then(() => {
          this.toastr.success("User has been created.");
          //this.getUsersForTable();
        });
      } else {
        this.toastr.warning("Operation cancelled", "User was not created");
      }
    });
  }
}
