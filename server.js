/* =====================================================
      Importing Necessory Module & Envoirnment Setting
   ===================================================== */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var port = process.env.PORT || '3000';
var cors = require('cors');
var fs = require('fs');
var app = express();
var __dirname = './user_directory/R5/R5_1';
var uploadPath = './user_directory/R5/';
var multer = require('multer');
var fileUpload = require('express-fileupload');
var firebase = require("firebase");
var admin = require("firebase-admin");
// import * as admin from "firebase-admin";

var config = {
    apiKey: "AIzaSyA6ozf67ohbTk9EvSr9gFeX4layz6aN7jA",
    authDomain: "sample-98876.firebaseapp.com",
    databaseURL: "https://sample-98876.firebaseio.com",
    storageBucket: "sample-98876.appspot.com",
    messagingSenderId: "975075020136"
};
firebase.initializeApp(config);


var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sample-98876.firebaseio.com"
});


/* =====================================================
            Middleware Will Run on Every Request
   ===================================================== */

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/deleteUser', function (req, res) {
    var uidToDelete = req.headers.uid;
    admin.auth().deleteUser(uidToDelete)
        .then(function () {
            console.log("Successfully deleted user");
            res.end();
        })
        .catch(function (error) {
            console.log("Error deleting user:", error);
            res.end();
        });
    console.log(uidToDelete);

})



/* =====================================================
                      Server Listen
   ===================================================== */

app.listen(port, function () {
    console.log("server is listening on port : ", port);
}).timeout = 25000;
