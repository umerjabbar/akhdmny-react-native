let BASEURL = "http://148.251.72.170:8080/akhdmny/public/api";
let CLIENTURL = "/user";
let DRIVERURL = "/driver";
var MIDDLEURL = CLIENTURL;

let LocalConstants = {
    BASEURL, CLIENTURL, DRIVERURL, MIDDLEURL
}



let NetworkServices = {
    Login : "/login",
    Register : "/register",
    Verification : "/verification",
    Logout : "/logout",
    ForgotPassword : "/forget",
    UpdateProfile : "/update/profile",
}

export{LocalConstants, NetworkServices}