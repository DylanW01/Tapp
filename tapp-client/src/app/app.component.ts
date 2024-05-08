import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { TawkToService } from "./tawk-to.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Tapp";
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router, public auth: AuthService, public tawkToService: TawkToService) {}

  public ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log("User authenticated", user);
        // User is authenticated, access user properties
        this.tawkToService.tawkLogin(user.sub, user.name, user.email, user.email_verified, user.picture);
      } else {
        // User is not authenticated
        console.log("User not authenticated");
      }
    }); // Corrected placement of closing parenthesis
  }

  public async signIn(): Promise<void> {}

  public async signOut(): Promise<void> {}
}
