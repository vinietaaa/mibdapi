var mysql   = require("mysql");
var request = require('request');

function alat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
alat.prototype.handleRoutes = function(router,connection) {
};

module.exports = alat;