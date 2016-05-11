var mysql   = require("mysql");
var request = require('request');

function transaksiAlat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiAlat.prototype.handleRoutes = function(router,connection) {

    router.post("/rentTool", function(req,res){
        var id_tool = req.body.Id_tool;
        var id_renter = req.body.Id_renter;
        var numOfRent = req.body.NumOfRent;
        var rental_time = req.body.Rental_time;
        var query = "INSERT INTO `tool_transaction`(`Id_tool`, `Id_renter`, `NumOfRent`, `Rental_time`) VALUES ('" + id_tool +"','" + id_renter +"','" + numOfRent +"','" + rental_time +"')";
        
        var queryUpdate = "UPDATE `tool` SET `Stock`=`Stock`-? WHERE `Id_tool`=?"        
            
        var query2 = "SELECT `Stock` FROM `tool` WHERE `Id_tool` ='" +id_tool+"'";
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
                            var table = [0, id_tool];  
                            queryUpdate= mysql.format(queryUpdate,table);   
                        }else{
                            var table = [numOfRent, id_tool];  
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
    
    router.post("/returnTool",function(req,res){
        var id_tool = req.body.Id_tool;
        var numOfRent = req.body.NumOfRent;
        
        var query = "UPDATE `tool` SET `Stock`=`Stock`+? WHERE `Id_tool`=?";
        var table = [numOfRent, id_tool];  
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
    
    router.post("/checkReportTool", function(req,res){    
        var query = "SELECT `tool_transaction`.*, `tool`.*, `renter`.* FROM (`tool_transaction` JOIN `tool` ON `tool_transaction`.`Id_tool` = `tool`.`Id_tool`) JOIN `renter` ON (`tool_transaction`.`Id_renter` = `renter`.`Id_renter`)";
        
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

module.exports = transaksiAlat;