import auth from "@react-native-firebase/auth";
import { apiKey } from "../data/constants";

export const apiHeader = () => {
  const user = auth().currentUser;
  return {
    headers: {
      Authorization: `Bearer ${user.uid}`,
    },
  };
};

export const imageApiHeader = () => {
  const user = auth().currentUser;
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data; charset=utf-8",
      Authorization: `Bearer ${user.uid}`,
    },
  };
};

export const apiKeyHeader = () => {
  return {
    headers: {
      Authorization: apiKey,
    },
  };
}
