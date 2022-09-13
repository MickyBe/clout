// import { useContext } from "react";
// import { Platform } from "react-native";
// import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

const GetLocation = new Promise(async (resolve, reject) => {
  //   const permissionType =
  //     Platform.Version < 29
  //       ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //       : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
  MapboxGL.requestAndroidLocationPermissions()
    .then((response) => {
      if (response) {
        console.log("LOCATION GRANTED");
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("LOCATION GRANTED");
            resolve(position);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      } else {
        console.log("LOCATION REJECTED");
        reject("Permission denied");
      }
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  //   PermissionsAndroid.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
  //     title: "Kliq",
  //     message: "Can kliq access your location",
  //   })
  //     .then((response) => {
  //       if (response === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log("LOCATION GRANTED");
  //         Geolocation.getCurrentPosition(
  //           (position) => {
  //             resolve(position);
  //           },
  //           (error) => {
  //             console.log(error);
  //             reject(error);
  //           }
  //         );
  //       } else {
  //         reject("Permission denied");
  //       }
  //     })
  //     .catch((error) => reject(error));
});

export default GetLocation;
