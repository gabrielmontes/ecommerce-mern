import { HIDE_MESSAGE } from "../constants/notificationConstants";

const initState = {
  notification: "",
  isOpen: false,
  severity: ""
};

export function notificationReducer(state = initState, action) {
  const { notification, severity } = action;

  if (notification) {
    return {
      notification: notification,
      isOpen: true,
      severity: severity
    }
  } else if (action.type === HIDE_MESSAGE) {
    return {
      notification: "",
      isOpen: false,
      severity: severity
    }
  }

  return state;
}