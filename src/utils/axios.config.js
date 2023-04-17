import axios from "axios";
let URL;

switch(process.env.REACT_APP_ENVIRONMENT){
    case "DEVELOPMENT":
        URL = "http://localhost:5001/"
        break;
        case "PRODUCTION":
            URL = "http://localhost.com/";
        break;
        default:
            URL = "http://localhost:5001/"
}


const instance = axios.create({
    baseURL:URL,
});
export default instance;