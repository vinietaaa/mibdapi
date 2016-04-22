var mysql   = require("mysql");
var request = require('request');

function transaksiBundle(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiBundle.prototype.handleRoutes = function(router,connection) {
};

module.exports = transaksiBundle;