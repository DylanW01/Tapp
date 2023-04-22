import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteBowserModalComponent } from "./delete-bowser-modal.component";

describe("DeleteBowserModalComponent", () => {
  let component: DeleteBowserModalComponent;
  let fixture: ComponentFixture<DeleteBowserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBowserModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBowserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
