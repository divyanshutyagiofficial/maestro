importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');

config = {
    apiKey: "AIzaSyDhFHl4_jKcrwj1cUsjuzb-1M6t7DgQy50",
    authDomain: "droweb-ba581.firebaseapp.com",
    databaseURL: "https://droweb-ba581.firebaseio.com",
    projectId: "droweb-ba581",
    storageBucket: "droweb-ba581.appspot.com",
    messagingSenderId: "76236516379"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'Hey there !!!';
    const options = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, options);
});