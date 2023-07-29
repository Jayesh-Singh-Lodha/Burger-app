import axios from "axios";

const instance=axios.create({
    baseURL:'https://myburgerapp-7e6fd-default-rtdb.firebaseio.com/'
});

export default instance;