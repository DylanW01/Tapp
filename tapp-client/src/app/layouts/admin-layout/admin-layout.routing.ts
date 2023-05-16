import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { BowserTablesComponent } from "../../pages/bowser-table/bowser-table.component";
import { TicketTablesComponent } from "../../pages/support-ticket-table/support-ticket-table.component";
import { AccountsTableComponent } from "src/app/pages/accounts-table/accounts-table.component";
import { OktaAuthGuard, OktaCallbackComponent } from "@okta/okta-angular";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "bowsers", component: BowserTablesComponent },
  { path: "tickets", component: TicketTablesComponent },
  { path: "user-profile", component: UserProfileComponent, canActivate: [OktaAuthGuard] },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "user-accounts", component: AccountsTableComponent, canActivate: [OktaAuthGuard] },
  { path: "login/callback", component: OktaCallbackComponent },
];
