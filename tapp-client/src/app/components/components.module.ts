import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderInfoCardsComponent } from "./header-info-cards/header-info-cards.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { CreateBowserModalComponent } from "../pages/bowser-table/components/create-bowser-modal/create-bowser-modal.component";
import { DeleteBowserModalComponent } from "../pages/bowser-table/components/delete-bowser-modal/delete-bowser-modal.component";
import { EditBowserModalComponent } from "../pages/bowser-table/components/edit-bowser-modal/edit-bowser-modal.component";
import { CreateTicketModalComponent } from "../pages/support-ticket-table/components/create-ticket-modal/create-ticket-modal.component";

@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, HeaderInfoCardsComponent, DeleteBowserModalComponent, EditBowserModalComponent, CreateBowserModalComponent, CreateTicketModalComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, HeaderInfoCardsComponent, CreateBowserModalComponent, CreateTicketModalComponent],
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule, GoogleMapsModule],
})
export class ComponentsModule {}
