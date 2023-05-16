import { AfterViewInit, Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-advert",
  templateUrl: "./advert.component.html",
  styleUrls: ["./advert.component.scss"],
})
export class AdvertComponent implements AfterViewInit {
  @Input() banner: Banner;
  showAd = environment.adsense.show;
  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window["adsbygoogle"] = window["adsbygoogle"] || []).push({
          overlays: { bottom: true },
        });
      } catch (e) {
        console.error(e);
      }
    }, 0);
  }
}
