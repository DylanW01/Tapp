import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { interval, take } from "rxjs";
import { ServerService } from "src/app/server.service";

@Component({
  selector: "app-server-offline-modal",
  templateUrl: "./server-offline-modal.component.html",
  styleUrls: ["./server-offline-modal.component.scss"],
})
export class ServerOfflineModalComponent implements OnInit {
  constructor(private server: ServerService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    interval(10000)
      .pipe(take(6))
      .subscribe(() => {
        this.server
          .getStats()
          .then(() => {
            this.close();
          })
          .catch((error) => {
            // Handle the error if needed
          });
      });
  }

  close() {
    this.activeModal.close();
  }
}
