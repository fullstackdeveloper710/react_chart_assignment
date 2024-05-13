import axios from "axios";

// GET api global service 
// @@url api url
//@@ onSuccess and onError is used the response of the api these are the callback function 
export const GETAPISERVICE = (url, onSuccess, onError) => {
  axios
    .get(url)
    .then((res) => onSuccess(res))
    .catch((err) => onError(err));
};
