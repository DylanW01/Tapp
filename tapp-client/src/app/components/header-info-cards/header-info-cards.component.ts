import { Component, OnInit } from "@angular/core";
import { ServerService } from "src/app/server.service";

@Component({
  selector: "app-header-info-cards",
  templateUrl: "./header-info-cards.component.html",
  styleUrls: ["./header-info-cards.component.scss"],
})
export class HeaderInfoCardsComponent implements OnInit {
  interval: NodeJS.Timer;
  constructor(private server: ServerService) {}

  totalBowsers: number;
  activeBowsers: number;
  pendingTickets: number;
  activeTickets: number;
  bowsersDown: number;

  ngOnInit(): void {
    this.getStats();
    this.interval = setInterval(() => {
      this.getStats();
    }, 60000);
  }

  getStats() {
    this.server.getStats().then((response: any) => {
      console.log(response);
      this.totalBowsers = response.bowsersCount;
      this.activeBowsers = response.activeBowsersCount;
      this.pendingTickets = response.pendingTicketCount;
      this.activeTickets = response.activeTicketCount;
      this.bowsersDown = response.bowserDownCount;
    });
  }
}
