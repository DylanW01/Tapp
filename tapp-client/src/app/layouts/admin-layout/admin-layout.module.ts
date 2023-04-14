import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { GoogleMapsModule } from "@angular/google-maps";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { BowserTablesComponent } from "../../pages/bowser-table/bowser-table.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "../../components/components.module";
import { AccountsTableComponent } from "../../pages/accounts-table/accounts-table.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    BowserTablesComponent,
    AccountsTableComponent,
  ],
  exports: [MapsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    GoogleMapsModule,
    ComponentsModule,
  ],
})
export class AdminLayoutModule {}
