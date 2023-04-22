import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateBowserModalComponent } from "./create-bowser-modal.component";

describe("CreateBowserModalComponent", () => {
  let component: CreateBowserModalComponent;
  let fixture: ComponentFixture<CreateBowserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBowserModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBowserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
