import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { filter, map, take, tap } from "rxjs";
import { createAuth0Client } from "@auth0/auth0-spa-js";

@Injectable({
  providedIn: "root",
})
export class ServerService {
  constructor(private http: HttpClient) {}

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: "json",
      observe: "body",
      headers: {
        //    Authorization: `Bearer ${token}`,
      },
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  // Tickets

  getTickets() {
    return this.request("GET", `${environment.serverUrl}/tickets`);
  }

  createTicket(ticket) {
    //return this.request("POST", `${environment.serverUrl}/tickets`, ticket);
  }

  deleteTicket(ticket) {
    return this.request("DELETE", `${environment.serverUrl}/tickets/${ticket.requestId}`, ticket);
  }

  // End of Tickets

  // Bowsers
  getBowsers() {
    return this.request("GET", `${environment.serverUrl}/bowsers`);
  }

  createBowser(bowser) {
    //* Takes in "lat, lon, size, status, capacity"
    return this.request("POST", `${environment.serverUrl}/bowsers`, bowser);
  }

  updateBowser(bowser) {
    //* Takes in "lat, lon, size, lastTopUp, status"
    return this.request("PUT", `${environment.serverUrl}/bowsers${bowser.bowserId}`, bowser);
  }

  deleteBowser(bowser) {
    return this.request("DELETE", `${environment.serverUrl}/bowsers/${bowser.bowserId}`, bowser);
  }
  // End of Bowesrs

  // Info Cards
  getBowsersCount() {
    return this.request("GET", `${environment.serverUrl}/bowserscount`);
  }

  getActiveBowserCount() {
    return this.request("GET", `${environment.serverUrl}/activebowserscount`);
  }

  getPendingTicketCount() {
    return this.request("GET", `${environment.serverUrl}/pendingticketcount`);
  }

  getActiveTicketCount() {
    return this.request("GET", `${environment.serverUrl}/activeticketcount`);
  }

  getBowserMaintenanceCount() {
    return this.request("GET", `${environment.serverUrl}/bowserdowncount`);
  }
  // End of Info Cards
}
