import { Component, OnInit, ElementRef, Inject } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public name$!: Observable<string>;
  public isAuthenticated$!: Observable<boolean>;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location, private element: ElementRef, private router: Router, public auth: AuthService) {
    this.location = location;
  }

  public ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  async logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
