import axios from "axios";

export function getMessages() {
  return axios.get(`https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet`);
}

export function postMessage(messageObj) {
  return axios.post(
    `https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet`,
    {
      messageObj
    }
  );
}
