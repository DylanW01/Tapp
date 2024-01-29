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

    // Set a timeout for 4 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Query timeout")), 4000);
    });

    // Set a variable to store the timeout ID
    let timeoutId: NodeJS.Timeout;

    // Make the server request and race it with the timeout
    Promise.race([this.server.getStats(), timeoutPromise])
      .then((response: any) => {
        // Clear the timeout if the request succeeds within 4 seconds
        clearTimeout(timeoutId);

        console.log(response);
        this.totalBowsers = response.bowsersCount;
        this.activeBowsers = response.activeBowsersCount;
        this.pendingTickets = response.pendingTicketCount;
        this.activeTickets = response.activeTicketCount;
        this.bowsersDown = response.bowserDownCount;
      })
      .catch((error: any) => {
        // Check if the error is due to a timeout
        if (error.message === "Query timeout") {
          // If it's a timeout, open the modal
          const modalRef = this.modalService.open(ServerOfflineModalComponent, modalOptions);
          modalRef.result.then(() => {
            // Modal closed, call getStats
            this.getStats();
          });
        } else {
          // Handle other errors here
          console.error(error);
        }
      });

    // Set the timeout ID
    timeoutId = setTimeout(() => {
      // If the request takes longer than 4 seconds, reject the timeout promise
      clearTimeout(timeoutId);
      timeoutPromise.catch((error) => console.error(error));
    }, 4000);

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
