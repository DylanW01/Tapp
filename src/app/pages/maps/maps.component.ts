import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyASHU1WvCipdeZGJoIeI-TQkLKoPur3PDE', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  options: google.maps.MapOptions = {
    zoom: 13,
    scrollwheel: false,
    center: {lat: 51.89948430584023, lng: -2.0782783087952157},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
      {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
      {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
      {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
      {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
      {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
      {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
      {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]


     /* [
        {"elementType":"labels","stylers":[{"visibility":"off"}]},
        {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
        {"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"simplified"}]},
        {"featureType":"poi.government","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","stylers":[{"visibility":"simplified"}]},
        {"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":30}]},
        {"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"simplified"}]},
        {"featureType":"transit.station.rail","stylers":[{"visibility":"simplified"}]},
        {"featureType":"water","stylers":[{"color":"#5e72e4"},{"visibility":"on"}]}]*/

  };
  
  ngOnInit() {
/*
    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!'
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
*/
  }

}
