import { Component, Inject, OnInit } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Tapp";
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router) {}

  public ngOnInit(): void {}

  public async signIn(): Promise<void> {}

  public async signOut(): Promise<void> {}
}
