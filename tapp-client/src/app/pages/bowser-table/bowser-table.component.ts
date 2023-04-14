import { Component, OnInit } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from "src/app/server.service";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: "bowser-table",
  templateUrl: "./bowser-table.component.html",
  styleUrls: ["./bowser-table.component.scss"],
})
export class BowserTablesComponent implements OnInit {
  page = 1;
  bowsers: any[] = [];
  mappedArray = [];

  ngOnInit() {
    this.getBowsersForTable();    
  }

  constructor(private server: ServerService) { }

  private getBowsersForTable() {
    this.server.getBowsers().then((response: any[]) => {
      this.bowsers = response;
      console.log(this.bowsers);
    });
  }

  updateEvent() {
    const bowserData = {
      id: 1,
      lat: '51.904563',
      lon: '2.077380',
      size: 'Small',
      lastTopUp: null,
      status: 'Active',

    };
    this.server.updateBowser(bowserData).then(() => {
      this.getBowsersForTable();
    });
  }

  deleteBowser(index) {
    this.server.deleteBowser(this.bowsers[index]).then(() => {
      this.getBowsersForTable();
    });
  }
}