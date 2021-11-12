import axios from "axios";
import {environmentConstants} from "./constants";
import {AuthState, authState} from "./state/auth";
import {goto} from "$app/navigation";

// Create a instance of axios to use the same base url.
const axiosInstance = axios.create({
    baseURL: environmentConstants.BASE_URL // it's not recommended to have this info here.
});
let auth: AuthState = {loggedIn: false, token: ""};
authState.subscribe(authState => auth = authState);


// common method for attaching additional params.
// TODO: implement middleware for axios
const apiRequest = (method, url, request) => {
    if (!auth.loggedIn || auth.token == "") {
        goto(environmentConstants.LOGIN_PAGE)
    }
    const headers = {
        authorization: auth.token
    };
    //using the axios instance to perform the request that received from each http method
    return axiosInstance(
        {
            method,
            url,
            data: request,
            headers
        }
    )
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
};
