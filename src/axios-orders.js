import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-8ddbe.firebaseio.com/"
});

export default instance;
