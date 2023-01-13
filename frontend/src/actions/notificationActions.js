import { 
  SET_MESSAGE,
  HIDE_MESSAGE
} from "../constants/notificationConstants";

export function setMessage(severity, notification) {  
  return {
    type: SET_MESSAGE,
    notification: notification,
    severity: severity
  }
};

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
    
  }
}