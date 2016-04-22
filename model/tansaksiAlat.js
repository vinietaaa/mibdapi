var mysql   = require("mysql");
var request = require('request');

function transaksiAlat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiAlat.prototype.handleRoutes = function(router,connection) {
};

module.exports = transaksiAlat;