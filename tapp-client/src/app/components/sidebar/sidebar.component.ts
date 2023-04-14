import { Component, Inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { Observable, filter, map } from "rxjs";

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

  constructor(
    private router: Router,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth,
    private authStateService: OktaAuthStateService,) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.isAuthenticated$ = this.authStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
