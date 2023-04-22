import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ServerService } from "src/app/server.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-create-bowser-modal",
  templateUrl: "./create-bowser-modal.component.html",
  styleUrls: ["./create-bowser-modal.component.scss"],
})
export class CreateBowserModalComponent implements OnInit {
  newBowser: FormGroup;
  currentCapacity: number;
  apiLoaded: Observable<boolean>;
  timeout;

  constructor(httpClient: HttpClient, public activeModal: NgbActiveModal, private toastr: ToastrService, private server: ServerService, private ngxLoader: NgxUiLoaderService) {
    this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyASHU1WvCipdeZGJoIeI-TQkLKoPur3PDE", "callback").pipe(
      map(() => true),
      catchError(() => of(false))
    );
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
    this.ngxLoader.startBackground();
    this.newBowser = new FormGroup({
      lat: new FormControl(null, Validators.required),
      lon: new FormControl(null, Validators.required),
      size: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      capacity: new FormControl(null, Validators.required),
    });
    this.timeout = setTimeout(() => {
      this.ngxLoader.stop();
      this.toastr.warning("Please allow location access to use the maps feature", "Cannot find location");
    }, 10000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.ngxLoader.stopBackground();
        clearTimeout(this.timeout);
      });
    } else {
      this.ngxLoader.stopBackground();
      this.toastr.warning("Please allow location access to use the maps feature", "Cannot find location");
    }
    this.getBowsersForMap();
  }

  saveBowser() {
    if (this.newBowser.valid) {
      this.activeModal.close(this.newBowser.value);
    } else {
      this.toastr.error("Check all fields are valid and try again", "Bowser not added");
    }
  }

  cancel() {
    this.activeModal.close();
  }

  populateBowserMap(bowsers) {
    this.bowsersPositions = [];
    this.bowserOfflinePositions = [];
    this.bowserSpannerPositions = [];
    bowsers.forEach((bowser) => {
      if (bowser.status === "Active") {
        this.bowsersPositions.push({
          lat: bowser.lat,
          lng: bowser.lon,
        });
      } else if (bowser.status === "Inactive") {
        this.bowserOfflinePositions.push({
          lat: bowser.lat,
          lng: bowser.lon,
        });
      } else if (bowser.status === "Problematic") {
        this.bowserSpannerPositions.push({
          lat: bowser.lat,
          lng: bowser.lon,
        });
      }
    });
  }

  private getBowsersForMap() {
    this.server.getBowsers().then((response: any[]) => {
      this.populateBowserMap(response);
    });
  }
}
