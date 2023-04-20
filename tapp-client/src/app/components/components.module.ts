import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderInfoCardsComponent } from "./header-info-cards/header-info-cards.component";
import { DeleteBowserModalComponent } from './delete-bowser-modal/delete-bowser-modal.component';
import { EditBowserModalComponent } from './edit-bowser-modal/edit-bowser-modal.component';
import { CreateBowserModalComponent } from './create-bowser-modal/create-bowser-modal.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderInfoCardsComponent,
    DeleteBowserModalComponent,
    EditBowserModalComponent,
    CreateBowserModalComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderInfoCardsComponent,
  ],
})
export class ComponentsModule {}
