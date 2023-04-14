import { Component, OnInit } from "@angular/core";
import { ServerService } from "src/app/server.service";

@Component({
  selector: "app-header-info-cards",
  templateUrl: "./header-info-cards.component.html",
  styleUrls: ["./header-info-cards.component.scss"],
})
export class HeaderInfoCardsComponent implements OnInit {
  constructor(private server: ServerService) {}

  totalBowsers: any;

  ngOnInit(): void {
    this.getBowsersForTable();
  }

  getBowsersForTable() {
    this.server.getBowsersCount().then((response: any[]) => {
      console.log("Bowser Count: ", response);
    });
  }
}
