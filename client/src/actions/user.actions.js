import axios from 'axios';
const API_URL = process.env.API_URL;

export const registerUser = (email, username, password, organizationName) => {
    const data = {
        username: username,
        password: password,
        email: email,
        organizationName: organizationName
    }
    const headers = {"Content-Type" : "application/json"}
    return dispatch => {
        axios.post(API_URL + "/users/signup", JSON.stringify(data), {headers})
            .then(res => {
                const flags = {registrationSuccessFlag: true, registrationFailedFlag: false};
                if (res.data.error) {
                    flags.registrationFailedFlag = true;
                    flags.registrationSuccessFlag = false;
                }
                dispatch(updateUser(flags));
            })
            .catch(err => {
                console.error(err);
                dispatch(updateUser({registrationSuccessFlag: false, registrationFailedFlag: true}));
            })
    }
}

export const login = (username, password) => {
    const data = {
        username: username,
        password: password
    }
    const headers = {"Content-Type" : "application/json"}
    return dispatch => {
        axios.post(API_URL + "/login", JSON.stringify(data), {headers})
            .then(res => {
                console.log("Success");
                console.log(res.headers);
                // TODO: Send user to dashboard
            })
            .catch(err => {
                console.log("failed");
                // TODO: Notify User of error
            })
    }
}

export const updateUser = user => {
    return {
        type: 'UPDATE_USER',
        user: user
    }
}