import { Component, Inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Observable, filter, map } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "src/environments/environment";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/bowsers",
    title: "Bowsers",
    icon: "fa-solid fa-fill-drip text-purple",
    class: "",
  },
  {
    path: "/tickets",
    title: "Support Tickets",
    icon: "fa-solid fa-headset text-teal",
    class: "",
  },
  {
    path: "/maps",
    title: "Bowser Map",
    icon: "ni ni-pin-3 text-orange",
    class: "",
  },
  {
    path: "/user-accounts",
    title: "User Accounts",
    icon: "fa-solid fa-users text-success",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public isAuthenticated$!: Observable<boolean>;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  async logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
