var mysql   = require("mysql");
var request = require('request');

function bundle(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
bundle.prototype.handleRoutes = function(router,connection) {
    router.post("/allBundles",function(req, res){
        var query = "SELECT * FROM `bundle`";

        connection.query(query, function(err,bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":bundle});
            }
        })
    })
    
    router.post("/deleteBundle", function(req, res){
        var id = req.body.Id_bundle;
        var querySelect = "SELECT * FROM `bundle` WHERE Id_bundle = '"+id+"'";
        connection.query(querySelect, function(err,bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                if(bundle.length<=0){
                    res.json({" ":"delete gagal"});
                }
                else{
                    
                    var query = "DELETE FROM `bundle` WHERE Id_bundle = '"+id+"'";
                     connection.query(query, function(err,del){
                         if(err){
                             res.json({"message":query});
                         }
                         else{
                             res.json({"message":"delete berhasil"});
                         }
                     })
                }
            }
        })
    })
    
    router.post("/insertBundle", function(req,res){
        var id_bundle = req.body.Id_bundle;
        var name_bundle = req.body.Name_bundle;
        var price = req.body.Price;
        var status = req.body.Status;
        var query = "INSERT INTO `bundle`(`Id_bundle`, `Name_bundle`, `Price`, `Status`) VALUES ('" + id_bundle +"','" + name_bundle +"','" + price +"','" + status +"')";
        
        connection.query(query, function(err, bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })
    
    router.post("/updateBundle", function(req,res){
        var id_bundle = req.body.Id_bundle;
        var name_bundle = req.body.Name_bundle;
        var price = req.body.Price;
        var status = req.body.Status;
        
        var query = "UPDATE `bundle` SET `Name_bundle`=?, `Price`=?,`Status`=? WHERE `Id_bundle`=?"
        var table = [name_bundle, price,status, id_bundle];
        query= mysql.format(query,table);
        
        connection.query(query,function(err,bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"update berhasil"});
            }
        })
    })
};

module.exports = bundle;