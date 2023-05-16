import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BowserTablesComponent } from "./bowser-table.component";

describe("TablesComponent", () => {
  let component: BowserTablesComponent;
  let fixture: ComponentFixture<BowserTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BowserTablesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowserTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
