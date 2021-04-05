import { initializeApp, app, storage } from "firebase-admin";
import { config } from "firebase-functions";

let fbApp: app.App;

function init() {
  fbApp = initializeApp({}, config().fb.project_id);
  return fbApp;
};

export default {
  initializeApp() {
    return init();
  },
  app() {
    return fbApp;
  },
  bucket() {
    if (!fbApp) init();
    return storage(fbApp).bucket(config().fb.storage_bucket);
  }
};
