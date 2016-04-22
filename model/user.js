var mysql   = require("mysql");
var request = require('request');

function user(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

user.prototype.handleRoutes = function(router,connection) {
  router.post("/testingUser",function(req,res){
      res.json({"message":"hahaha"});
  });
    
    router.post("/semuaOrang",function(req, res){
        var id = req.body.id;
        var query = "SELECT * FROM `orang`";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":orang});
            }
        })
    })
    
    router.post("/login",function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = "SELECT * FROM `orang` WHERE username = '"+ username+"' AND password = '" +password+"'";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            ri}
            else{
                if (orang.length <= 0){                    
                    res.json({" ":"login gagal"});
                }
                else{                    
                    res.json({"message":"login berhasil"});
                }
            }
        })
    })
    
    
}

module.exports = user;
