import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketTablesComponent } from "./support-ticket-table.component";

describe("TablesComponent", () => {
  let component: TicketTablesComponent;
  let fixture: ComponentFixture<TicketTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketTablesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
