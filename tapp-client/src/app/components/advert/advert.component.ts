import { AfterViewInit, Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-advert",
  templateUrl: "./advert.component.html",
  styleUrls: ["./advert.component.scss"],
})
export class AdvertComponent implements AfterViewInit {
  @Input() data;
  showAd = environment.adsense.show;
  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window["adsbygoogle"] = window["adsbygoogle"] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }
}
