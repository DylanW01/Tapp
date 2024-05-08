import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { User } from "./models/user";
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

  // Users

  createUser(user: User) {
    return this.request("POST", `${environment.serverUrl}/users`, user);
  }

  getAdminUsers() {
    return this.request("GET", `${environment.serverUrl}/users/role/admin`);
  }

  getTawkToHash(email: string) {
    const requestBody = { email };
    return this.request("POST", `${environment.serverUrl}/tawktohash`, requestBody);
  }

  // End of Users

  // Info Cards
  getStats() {
    return this.request("GET", `${environment.serverUrl}/bowserticketstats`);
  }

  // End of Info Cards
}
