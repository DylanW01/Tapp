import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "$default",
  bgsOpacity: 1,
  bgsPosition: "bottom-right",
  delay: 0.1,
  bgsType: "rectangle-bounce",
  blur: 5,
  fgsColor: "$default",
  fgsPosition: "center-center",
  fgsType: "rectangle-bounce",
  logoUrl: "../assets/img/brand/tapp-logos_transparent_icon.png",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "$default",
};

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-88138568.okta.com/oauth2/default',
  clientId: '0oa8d8o93uPFQw7415d7',
  redirectUri: 'https://localhost:4200/login/callback'
});

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
    }),
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
    OktaAuthModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [HttpClient, { provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
