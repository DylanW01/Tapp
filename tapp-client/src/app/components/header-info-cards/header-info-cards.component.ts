import { Component, OnInit } from "@angular/core";
import { ServerService } from "src/app/server.service";
import { ServerOfflineModalComponent } from "./server-offline-modal/server-offline-modal.component";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-header-info-cards",
  templateUrl: "./header-info-cards.component.html",
  styleUrls: ["./header-info-cards.component.scss"],
})
export class HeaderInfoCardsComponent implements OnInit {
  interval: NodeJS.Timer;
  constructor(private server: ServerService, private modalService: NgbModal) {}

  totalBowsers: number;
  activeBowsers: number;
  pendingTickets: number;
  activeTickets: number;
  bowsersDown: number;

  ngOnInit(): void {
    const modalOptions: NgbModalOptions = {
      backdrop: "static", // 'static' prevents closing on outside click
      keyboard: false, // 'false' prevents closing with the keyboard ESC key
      centered: true,
    };
    this.server
      .getStats()
      .then((response: any) => {
        console.log(response);
        this.totalBowsers = response.bowsersCount;
        this.activeBowsers = response.activeBowsersCount;
        this.pendingTickets = response.pendingTicketCount;
        this.activeTickets = response.activeTicketCount;
        this.bowsersDown = response.bowserDownCount;
      })
      .catch((error: any) => {
        const modalRef = this.modalService.open(ServerOfflineModalComponent, modalOptions);
        modalRef.result.then(() => {
          // Modal closed, call getStats
          this.getStats();
        });
      });
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
