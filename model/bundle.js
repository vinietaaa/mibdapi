var mysql   = require("mysql");
var request = require('request');

function bundle(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
bundle.prototype.handleRoutes = function(router,connection) {
};

module.exports = bundle;