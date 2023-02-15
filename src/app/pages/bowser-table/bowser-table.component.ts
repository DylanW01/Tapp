import { Component, OnInit } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: "bowser-table",
  templateUrl: "./bowser-table.component.html",
  styleUrls: ["./bowser-table.component.scss"],
})
export class BowserTablesComponent implements OnInit {
  page = 1;

  ngOnInit() {}

}