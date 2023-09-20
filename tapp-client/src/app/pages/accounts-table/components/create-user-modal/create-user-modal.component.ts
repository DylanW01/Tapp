import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-create-user-modal",
  templateUrl: "./create-user-modal.component.html",
  styleUrls: ["./create-user-modal.component.scss"],
})
export class CreateUserModalComponent implements OnInit {
  newUser: FormGroup;

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private server: ServerService, private ngxLoader: NgxUiLoaderService) {}

  ngOnInit() {
    this.newUser = new FormGroup({
      email: new FormControl("", Validators.required),
      blocked: new FormControl(false, Validators.required),
      email_verified: new FormControl(false, Validators.required),
      given_name: new FormControl("", Validators.required),
      family_name: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      picture: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      verify_email: new FormControl(true, Validators.required),
    });
  }

  saveUser() {
    if (this.newUser.valid) {
      const newUser: User = {
        email: this.newUser.value.email,
        blocked: this.newUser.value.blocked,
        email_verified: this.newUser.value.email_verified,
        given_name: this.newUser.value.given_name,
        family_name: this.newUser.value.family_name,
        name: this.newUser.value.name,
        picture: this.newUser.value.picture,
        password: this.newUser.value.password,
        verify_email: this.newUser.value.verify_email,
      };
      this.activeModal.close(newUser);
    } else {
      this.toastr.error("Check all fields are valid and try again", "User not created");
    }
  }

  cancel() {
    this.activeModal.close();
  }
}
