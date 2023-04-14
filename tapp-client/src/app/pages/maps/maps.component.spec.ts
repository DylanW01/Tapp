import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MapsComponent } from "./maps.component";
import { Component, OnInit } from "@angular/core";
import { GoogleMap, GoogleMapsModule } from "@angular/google-maps";
import { Observable, map, catchError, of } from "rxjs";

describe("MapsComponent", () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MapsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
