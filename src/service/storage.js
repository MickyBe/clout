import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationAccuracyTypes } from "../config/location-accuracy";

export const storeLocationInterval = async (interval) => {
    try {
        await AsyncStorage.setItem(INTERVAL_KEY, interval);
    }catch (err) {
        console.log( "ERROR >>> ", err);
    }
}

export const getLocationInterval = async () => {
    try {
        return await AsyncStorage.getItem(INTERVAL_KEY);
    }catch (err) {
        console.log("ERROR >>> ", err);
    }
}

export const locationIntervalFilter = (intervalType) => {
    switch(intervalType) {
        case LocationAccuracyTypes.QUICKSTER:
            return 60000;
        case LocationAccuracyTypes.DASHER:
            return 180000;
        case LocationAccuracyTypes.COMING:
            return 300000;
        case LocationAccuracyTypes.LATE:
            return 900000;
        default:
            return 0;
    }
}

const INTERVAL_KEY = "interval";