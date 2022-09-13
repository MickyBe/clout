import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import {socket} from "./socket";
import auth from '@react-native-firebase/auth';
import { baseUrl } from "../config/url/api.url";
import { getLocationInterval, locationIntervalFilter } from "./storage";

const userData = [
    {
      id: 1,
      name: "Abel",
      image:
        "https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg",
      color: "red",
      location: [38.727146, 8.966563],
    },
    {
      id: 2,
      name: "Bekele",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-Hj6iohePqFFAXjs7wlKWJT317N69JYjrQ&usqp=CAU",
      color: "blue",
      location: [38.723322, 8.968712],
    },
    {
      id: 3,
      name: "Tesemma",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa1pJgqNGQ7G0o2oaT3CLntytr0M2I8BlyCA&usqp=CAU",
      color: "green",
      location: [38.726362, 8.96443],
    },
    {
      id: 4,
      name: "Gemmechu",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xBCRKLnDjw_o48CbyOVERfkFO0uhMSjnvw&usqp=CAU",
      color: "gray",
      location: [38.726788, 8.972328],
    },
    {
      id: 5,
      name: "Lemma",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjhBaCE6_IlqbjxTdth5Hm0mccqejntA2XA&usqp=CAU",
      color: "orange",
      location: [38.726213, 8.970333],
    },
  ];

export const background =  () => {
  // const interval = await getLocationInterval();
  const user = auth().currentUser;
    BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 0.1,
        distanceFilter: 50,
        notificationTitle: "Background tracking",
        notificationText: "enabled",
        debug: true,
        startOnBoot: false,
        stopOnTerminate: true,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 10000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
        url: `${baseUrl}/location`,
        httpHeaders: {
          "Authorization": `Bearer ${user?.uid}`,
        },
        // // customize post properties
        postTemplate: {
          latitude: "@latitude",
          longitude: "@longitude",
        },
      });
      BackgroundGeolocation.on("location", (location) => {
        // console.log(location);
        // handle your locations here
        // to perform long running operation on iOS
        // you need to create background task
        console.log('location',location);
        let col=Math.floor(Math.random() * 4);
        auth().onAuthStateChanged(user => {
          if (user) {
            console.log('location after logged in',location);
            console.log('with user',user);
            socket.emit('location', {
              "id":user.uid,
              "name": user.email,
              "image":userData[col].image,
              "color": userData[col].color,
              "disconnected":false,
              "location": [location.longitude, location.latitude],
          });
          } else {
            console.log('location before',location);
          }
        });
        BackgroundGeolocation.startTask((taskKey) => {
          // execute long running task
          // eg. ajax post location
          // IMPORTANT: task has to be ended by endTask
          BackgroundGeolocation.endTask(taskKey);
        });
      });
  
      BackgroundGeolocation.on("stationary", (stationaryLocation) => {
        // handle stationary locations here
        Actions.sendLocation(stationaryLocation);
      });
  
      BackgroundGeolocation.on("error", (error) => {
        console.log("[ERROR] BackgroundGeolocation error:", error);
      });
  
      BackgroundGeolocation.on("start", () => {
        console.log("[INFO] BackgroundGeolocation service has been started");
      });
  
      BackgroundGeolocation.on("stop", () => {
        console.log("[INFO] BackgroundGeolocation service has been stopped");
      });
  
      BackgroundGeolocation.on("authorization", (status) => {
        console.log(
          "[INFO] BackgroundGeolocation authorization status: " + status
        );
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
          setTimeout(
            () =>
              Alert.alert(
                "App requires location tracking permission",
                "Would you like to open app settings?",
                [
                  {
                    text: "Yes",
                    onPress: () => BackgroundGeolocation.showAppSettings(),
                  },
                  {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel",
                  },
                ]
              ),
            1000
          );
        }
      });
  
      BackgroundGeolocation.on("background", () => {
        console.log("[INFO] App is in background");
      });
  
      BackgroundGeolocation.on("foreground", () => {
        console.log("[INFO] App is in foreground");
      });
  
      BackgroundGeolocation.on("abort_requested", () => {
        console.log("[INFO] Server responded with 285 Updates Not Required");
  
        // Here we can decide whether we want stop the updates or not.
        // If you've configured the server to return 285, then it means the server does not require further update.
        // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
        // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
      });
  
      BackgroundGeolocation.on("http_authorization", () => {
        console.log("[INFO] App needs to authorize the http requests");
      });
  
      BackgroundGeolocation.checkStatus((status) => {
        console.log(
          "[INFO] BackgroundGeolocation service is running",
          status.isRunning
        );
        console.log(
          "[INFO] BackgroundGeolocation services enabled",
          status.locationServicesEnabled
        );
        console.log(
          "[INFO] BackgroundGeolocation auth status: " + status.authorization
        );
        auth().onAuthStateChanged((user) => {
          if (user) {
            BackgroundGeolocation.start();
          }else {
            BackgroundGeolocation.stop();
          }
        })
        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
          BackgroundGeolocation.start(); //triggers start on start event
        }
      });
}