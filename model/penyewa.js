var mysql   = require("mysql");
var request = require('request');

function penyewa(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
penyewa.prototype.handleRoutes = function(router,connection) {
    router.post("/allRenters",function(req, res){
        var id = req.body.id;
        var query = "SELECT * FROM `renter`";

        connection.query(query, function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":tool});
            }
        })
    })
    router.post("/insertRenter",function(req, res){
        var id_renter = req.body.Id_renter;
        var name = req.body.Name;
        var address = req.body.Address;
        var number_phone = req.body.Number_phone;
        var query = "INSERT INTO `renter`(`Id_renter`, `Name`, `Number_phone`, `Address`) VALUES ('" + id_renter +"','" + name +"','" + number_phone +"','" + address +"')";
        
        connection.query(query, function(err, renter){
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
        var query = "SELECT * FROM `renter` WHERE `Number_phone` LIKE '"+number_phone+"'";
        
        connection.query(query, function(err, renter){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":renter});
            }
        })
    })
};

module.exports = penyewa;