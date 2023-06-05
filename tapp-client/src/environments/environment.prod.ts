export const environment = {
  production: true,
  serverUrl: "https://tappapi.dylanwarrell.com:443",
  appVersion: require("../../package.json").version,
  auth: {
    domain: "tapp.uk.auth0.com",
    clientId: "YtDD0pvA2wPHiquxaLI7JpPoJtOhGS4S",
    redirectUri: window.location.origin,
  },
};
