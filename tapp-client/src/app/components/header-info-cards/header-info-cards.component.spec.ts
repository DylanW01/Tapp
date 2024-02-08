import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderInfoCardsComponent } from "./header-info-cards.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HeaderInfoCardsComponent", () => {
  let component: HeaderInfoCardsComponent;
  let fixture: ComponentFixture<HeaderInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderInfoCardsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
