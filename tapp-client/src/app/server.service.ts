import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthStateService } from '@okta/okta-angular';
import {AccessToken, AuthState, OktaAuth} from '@okta/okta-auth-js';
import { environment } from '../environments/environment';
import { filter, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, public oktaAuth: OktaAuthStateService) { }

  private async request(method: string, url: string, data?: any) {
    const token = this.oktaAuth.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState),
      map((authState: AuthState) => authState.accessToken?.accessToken ?? '')
    );

    //token.subscribe(res => console.log("Token: ", res));

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getBowsers() {
    return this.request('GET', `${environment.serverUrl}/bowsers`);
  }

  updateBowser(bowser) {
    return this.request('PUT', `${environment.serverUrl}/updateBowsers`, bowser);
  }

  deleteBowser(bowser) {
    return this.request('DELETE', `${environment.serverUrl}/bowsers/${bowser}`);
  }

  getBowsersCount() {
    return this.request('GET', `${environment.serverUrl}/bowserscount`);
  }

}