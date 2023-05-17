import { Component, OnInit } from "@angular/core";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService) {}

  public ngOnInit(): void {}
}
