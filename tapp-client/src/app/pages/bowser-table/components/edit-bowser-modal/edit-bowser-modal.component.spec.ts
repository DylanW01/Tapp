import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditBowserModalComponent } from "./edit-bowser-modal.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

describe("EditBowserModalComponent", () => {
  let component: EditBowserModalComponent;
  let fixture: ComponentFixture<EditBowserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBowserModalComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: {
            // Mock the methods used by the component
            close: () => null,
            // Add more methods as needed
          },
        },
      ],
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
