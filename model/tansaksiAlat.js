var mysql   = require("mysql");
var request = require('request');

function transaksiAlat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiAlat.prototype.handleRoutes = function(router,connection) {
};

    router.post("/toolTransaction",function(req, res){
        var username = req.body.username;
        var query = "SELECT * FROM `user` WHERE username = '"+ username+"'";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if (orang.length <= 0){                    
                    res.json({" ":"logout gagal"});
                }
                else{                                    
                    var query2 = "UPDATE `user` SET `status` = '' WHERE username = '"+username+"'";
                    connection.query(query2,function(err,user){
                        if(err){
                            res.json({"message":query2});
                        }
                        else{
                            res.json({"message":"logout berhasil"});
                        }
                    })
                }
            }
        })
    })

module.exports = transaksiAlat;