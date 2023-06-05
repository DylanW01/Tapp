import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { BowserTablesComponent } from "../../pages/bowser-table/bowser-table.component";
import { TicketTablesComponent } from "../../pages/support-ticket-table/support-ticket-table.component";
import { AccountsTableComponent } from "src/app/pages/accounts-table/accounts-table.component";
import { AuthGuard } from "@auth0/auth0-angular";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "bowsers", component: BowserTablesComponent },
  { path: "tickets", component: TicketTablesComponent },
  { path: "user-profile", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "maps", component: MapsComponent },
  { path: "user-accounts", component: AccountsTableComponent, canActivate: [AuthGuard] },
];
