import { Injectable } from "@angular/core";
import { ServerService } from "./server.service";

@Injectable({
  providedIn: "root",
})
export class TawkToService {
  constructor(private server: ServerService) {}

  tawkLogin(userId, userName, userEmail) {
    this.server.getTawkToHash(userEmail).then((response) => {
      console.log(userName, userEmail, (response as { hash: string }).hash);

      const timeoutInSeconds = 120;
      const intervalInMilliseconds = 2000; // 2 seconds
      let elapsedTime = 0;

      const checkStatus = () => {
        // Check if Tawk_API.getStatus() returns true
        if ((window as any).Tawk_API.getStatus) {
          console.log("Tawk_API.getStatus is true. Logging in...");

          // Perform the login action
          (window as any).Tawk_API.setAttributes({
            name: userName,
            email: userEmail,
            userId: userId,
            hash: (response as { hash: string }).hash,
          });

          console.log("Tawk login successful.");
        } else {
          console.log("Tawk_API.getStatus is still false. Checking again in 2 seconds...");
          elapsedTime += intervalInMilliseconds;

          if (elapsedTime < timeoutInSeconds * 1000) {
            setTimeout(checkStatus, intervalInMilliseconds);
          } else {
            console.warn("Timeout reached. Status not true within 2 minutes.");
          }
        }
      };

      // Start the initial check
      checkStatus();
    });
  }
}
