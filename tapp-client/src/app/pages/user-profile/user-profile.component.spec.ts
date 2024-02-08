import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "@auth0/auth0-angular";
import { UserProfileComponent } from "./user-profile.component";
import { of } from "rxjs";

describe("UserProfileComponent", () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // Mock the methods used by the component
            isAuthenticated$: of(false),
            user$: of(null),
            idToken$: of(null),
            // Add more methods as needed
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
