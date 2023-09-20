import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditBowserModalComponent } from "./edit-bowser-modal.component";

describe("EditBowserModalComponent", () => {
  let component: EditBowserModalComponent;
  let fixture: ComponentFixture<EditBowserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBowserModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBowserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
