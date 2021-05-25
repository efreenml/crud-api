import { ToastAndroid } from "react-native";

const showToast = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
export {showToast};