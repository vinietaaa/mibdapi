var mysql   = require("mysql");
var request = require('request');

function penyewa(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
bundle.prototype.handleRoutes = function(router,connection) {
    router.post("/insertRenter",function(req, res){
        var id_renter = req.body.Id_renter;
        var name = req.body.Name;
        var address = req.body.Address;
        var number_phone = req.body.Number_phone;
        var query = "INSERT INTO `renter`(`Id_renter`, `Name`, `Number_phone`, `Address`) VALUES ('" + id_renter +"','" + name +"','" + number_phone +"','" + address +"')";
        
        connection.query(query, function(err, bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })
    
    router.post("/searchRenter",function(req,res){
        var number_phone = req.body.Number_phone;
        var query = ""
    }
};

module.exports = penyewa;