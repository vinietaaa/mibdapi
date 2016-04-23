var express = require("express"),
	mysql = require("mysql"),
	bodyParser = require("body-parser");

// require models
//tambah model
var bookingModel = require("./model/booking.js"); 
var userModel = require("./model/user.js");
var alatModel = require("./model/alat.js");
var bundleModel = require("./model/bundle.js");
// end of require model

var app = express();

// for website purpose
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// end of bodyParser

// start of function connect
function connect(){
	var self = this;
	self.connectMysql();
};
// end of function connects

// start connect mysql
connect.prototype.connectMysql = function() {
      var self = this;
      var pool = mysql.createPool({
         sconnectionLimit : 100,
         multipleStatements: true,
         host     : 'localhost',
         user     : 'root',
         password : '',
         database : 'penyewaanalatcamping',
         debug    :  false
      });

	pool.getConnection(function(err,connection){
        if(err) {
            throw err;
        } else {
            self.configureExpress(connection);
        }
	});
}
// end of connect mysql

// start of configureExpress
connect.prototype.configureExpress = function(connection) {
	var self = this;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // get an instance of the router for api routes
        var router = express.Router();
    
        // apply the routes to our application with the prefix /api
        app.use('/api', router);

        // calling model
        //tambah model
        var booking = new bookingModel(router,connection);
        var user = new userModel(router, connection);
        var alat = new alatModel(router, connection);
        var bundle = new bundleModel(router, connection);
        // end of calling model

        self.startServer();
};
// end of configureExpress

// start server
connect.prototype.startServer = function() {
	app.listen(3000,function(){
      console.log("WELCOME TO MIBD API");
  });
};
// end of start server

// start of stop server
connect.prototype.stop = function(err) {
	console.log("ISSUE WITH MYSQL \n"+ err);
	process.exit(1);
};
// end of stop server

new connect();
