importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

  workbox.routing.registerRoute(
    /.*/,
    workbox.strategies.staleWhileRevalidate()
  );
  firebase.initializeApp({
    apiKey: "AIzaSyDa3lXwrggng1hq6BY_QtGVucDnU-OGeEg",
    authDomain: "bioforest-smart.firebaseapp.com",
    databaseURL: "https://bioforest-smart.firebaseio.com",
    projectId: "bioforest-smart",
    storageBucket: "bioforest-smart.appspot.com",
    messagingSenderId: "782404818298",
    appId: "1:782404818298:web:2d060bc550ef663df232c3",
  });

  const messaging = firebase.messaging();
  if (firebase.messaging.isSupported()) {
    messaging.setBackgroundMessageHandler(function(payload) {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );
      // Customize notification here
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        requireInteraction: true,
        silent: false,
      };

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  } else {
    console.log("Can’t load messaging!");
  }
} else {
  console.log("not supported");
}
