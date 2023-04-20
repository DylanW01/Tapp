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

  // Bowsers
  getBowsers() {
    return this.request('GET', `${environment.serverUrl}/bowsers`);
  }
  createBowser(bowser) {
    //* Takes in "lat, lon, size, status, capacityPercentage"
    return this.request('POST', `${environment.serverUrl}/bowsers`, bowser);
  }

  updateBowser(bowser) {
    //* Takes in "lat, lon, size, lastTopUp, status"
    return this.request('PUT', `${environment.serverUrl}/bowsers${bowser.bowserId}`, bowser);
  }

  deleteBowser(bowserId : number) {
    return this.request('DELETE', `${environment.serverUrl}/bowsers/${bowserId}`);
  }
  // End of Bowesrs

  // Info Cards
  getBowsersCount() {
    return this.request('GET', `${environment.serverUrl}/bowserscount`);
  }

  getActiveBowserCount() {
    return this.request('GET', `${environment.serverUrl}/activebowserscount`);
  }

  getPendingTicketCount() {
    return this.request('GET', `${environment.serverUrl}/pendingticketcount`);
  }

  getActiveTicketCount() {
    return this.request('GET', `${environment.serverUrl}/activeticketcount`);
  }

  getBowserMaintenanceCount() {
    return this.request('GET', `${environment.serverUrl}/bowserdowncount`);
  }
  // End of Info Cards
}
