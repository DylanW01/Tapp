import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DeleteBowserModalComponent } from "./delete-bowser-modal.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

describe("DeleteBowserModalComponent", () => {
  let component: DeleteBowserModalComponent;
  let fixture: ComponentFixture<DeleteBowserModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DeleteBowserModalComponent],
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
    fixture = TestBed.createComponent(DeleteBowserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
