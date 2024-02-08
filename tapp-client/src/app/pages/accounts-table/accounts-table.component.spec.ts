import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AccountsTableComponent } from "./accounts-table.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrModule } from "ngx-toastr";

describe("AccountsTableComponent", () => {
  let component: AccountsTableComponent;
  let fixture: ComponentFixture<AccountsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsTableComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: "ToastConfig", useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
