import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => { //what does this mean
    axios
      .post("http://localhost:5000/api/v1/users/register", userData)
      .then(res => history.push("/login")) //redirect to login after successful login
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}

//Login User
export const loginUser = userData => dispatch => {
    axios
      .post("http://localhost:5000/api/v1/users/register", userData)
      .then(res => {
        //Save to Local storage

        //set token to local Storage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        //set token to Auth header
        setAuthToken(token);
        //Decode tokenn to get user data
        const decoded = jwt_decode(token);
        //Set current User
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}

//Set Logged in User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded 
    }
}

//User Loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING 
    }
}

//log User Out 
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem('jwtToken')
    //Remove auth header  for future requests
    setAuthToken(false)
    //Set current user to an empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}