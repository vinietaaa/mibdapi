var mysql   = require("mysql");
var request = require('request');

function transaksiBundle(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiBundle.prototype.handleRoutes = function(router,connection) {
    
    router.post("/rentBundle", function(req,res){
        var id_bundle = req.body.Id_bundle;
        var id_renter = req.body.Id_renter;
        var numOfRent = req.body.NumOfRent;
        var rental_time = req.body.Rental_time;
        var query = "INSERT INTO `bundle_transaction`(`Id_bundle`, `Id_renter`, `NumOfRent`, `Rental_time`) VALUES ('" + id_bundle +"','" + id_renter +"','" + numOfRent +"','" + rental_time +"')";
        
        var queryUpdate = "UPDATE `bundle` SET `Stock`=`Stock`-? WHERE `Id_bundle`=?"        
            
        var query2 = "SELECT `Stock` FROM `bundle` WHERE `Id_bundle` ='" +id_bundle+"'";
        connection.query(query, function(err, tool){
            if(err){
                res.json({"message":query});
            }
            else{
                connection.query(query2, function(err, tool3){
                    if(err){
                        res.json({"message":query2});
                    }
                    else{
                        if(tool3[0].Stock<=0){
                            var table = [0, id_bundle];  
                            queryUpdate= mysql.format(queryUpdate,table);   
                        }else{
                            var table = [numOfRent, id_bundle];  
                            queryUpdate= mysql.format(queryUpdate,table);
                        }
                        connection.query(queryUpdate, function(err, tool2){
                            if(err){
                                res.json({"message":queryUpdate});
                            }
                            else{
                                res.json({"message":"insert berhasil"});

                            }
                        })
                    }
                })
            }               
        })   
    })
    
    router.post("/returnBundle",function(req,res){
        var id_bundle = req.body.Id_bundle;
        var numOfRent = req.body.NumOfRent;
        
        var query = "UPDATE `bundle` SET `Stock`=`Stock`+? WHERE `Id_bundle`=?"
        var table = [numOfRent, id_bundle];  
        query= mysql.format(query,table);
        
        connection.query(query,function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"update berhasil"});
            }
        })
    })
    
    router.post("/checkReportBundle", function(req,res){    
        var query = "SELECT `bundle_transaction`.*, `bundle`.*, `renter`.* FROM (`bundle_transaction` JOIN `bundle` ON `bundle_transaction`.`Id_bundle` = `bundle`.`Id_bundle`) JOIN `renter` ON (`bundle_transaction`.`Id_renter` = `renter`.`Id_renter`)";
        
        connection.query(query,function(err,user){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":user});
            }
        })
    })
    
    
};

module.exports = transaksiBundle;