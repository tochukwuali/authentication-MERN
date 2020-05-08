const express = require("express");
const router = express.Router();
const { addUser, loginUser, getUsers } = require('../controllers/UserController')

router
    .route('/')
    .get(getUsers)

router
    .route('/register')
    .post(addUser)

router
    .route('/login')
    .post(loginUser)

module.exports = router