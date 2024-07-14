const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded){
            throw new UnauthorisedError();
        }
        // if reached here, then user is authenticated allow them to access the api

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role : decoded.role
        }

        next();
    } catch (error) {
            return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        });
    }
}

/**
 * This function checks if the authenticated user is an admin or not ?
 * Because we will call isAdmin after isLogged thats why we will receive user details
 */

/**
 * client -> isLoggedin -> isAdmon -> Api controller
 */

async function isAdmin(req, res, next) { 
    const loggedInUser = req.user; // fetching the role(user, admin) of logged in user
    if(loggedInUser.role == "ADMIN"){
        next();
    }
    else{
        return res.status(401).json({
            success : false,
            data : {},
            message : "You are not authorised for this action",
            error : {
                statusCode : 401, 
                reason : "Unauthorised user for this action"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}