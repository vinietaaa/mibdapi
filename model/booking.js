var mysql   = require("mysql");
var GeoPoint = require("geopoint");
var gcm = require('node-gcm');
var request = require('request');

function booking(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

booking.prototype.handleRoutes = function(router,connection) {
  router.post("/testing",function(req,res){
      res.json({"message":"hahaha"});
  });
    
}

module.exports = booking;
