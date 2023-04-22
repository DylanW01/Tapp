import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ServerService } from "src/app/server.service";
import { GoogleMap, GoogleMapsModule } from "@angular/google-maps";
import { Observable, catchError, map, of } from "rxjs";
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: "app-create-bowser-modal",
  templateUrl: "./create-bowser-modal.component.html",
  styleUrls: ["./create-bowser-modal.component.scss"],
})
export class CreateBowserModalComponent implements OnInit {
  bowser: any;
  apiLoaded: Observable<boolean>;
  newBowser: FormGroup;
  currentCapacity: number;

  constructor(
    httpClient: HttpClient,
    public activeModal: NgbActiveModal,
    private server: ServerService
  ) {
    this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyASHU1WvCipdeZGJoIeI-TQkLKoPur3PDE", "callback").pipe(map(() => true),catchError(() => of(false)));
  }

  // ---- BOWSER MARKER ICONS ----
  center: google.maps.LatLngLiteral = { lat: 51.8994, lng: -2.0783 };
  userLocationIcon = {
    url: "https://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png",
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17.5, 17.5),
  };
  bowserIcon = {
    url: "https://maps.google.com/mapfiles/kml/shapes/water.png",
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17.5, 17.5),
  };
  bowserSpannerIcon = {
    url: "https://maps.google.com/mapfiles/kml/shapes/mechanic.png",
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17.5, 17.5),
  };
  bowserOfflineIcon = {
    url: "https://maps.google.com/mapfiles/kml/shapes/caution.png",
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17.5, 17.5),
  };

  // ---- ICON OPTIONS ----
  userMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: this.userLocationIcon,
  };
  bowserMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: this.bowserIcon,
  };
  bowserSpannerMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: this.bowserSpannerIcon,
  };
  bowserOfflineMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: this.bowserOfflineIcon,
  };

  // ---- INIT LOCATION ARRAY ----
  bowsersPositions: google.maps.LatLngLiteral[] = [];
  bowserSpannerPositions: google.maps.LatLngLiteral[] = [];
  bowserOfflinePositions: google.maps.LatLngLiteral[] = [];
  userLocation: google.maps.LatLngLiteral[] = [];

  // ---- MAP OPTIONS ----
  options: google.maps.MapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#444444" }],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#f2f2f2" }],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
      },
    ],
  };

  // ------- END OF MAP SETUP -------

  ngOnInit() {
    this.newBowser = new FormGroup({
      lat: new FormControl(''),
      lon: new FormControl(''),
      size: new FormControl(''),
      status: new FormControl(''),
      capacity: new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.newBowser.value);
  }

  saveBowser() {
    this.activeModal.close(this.bowser);
  }

  cancel() {
    this.activeModal.close(false);
  }
}
