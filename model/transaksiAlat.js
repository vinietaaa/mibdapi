var mysql   = require("mysql");
var request = require('request');

function transaksiAlat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
transaksiAlat.prototype.handleRoutes = function(router,connection) {


//    router.post("/insertToolTransaction",function(req, res){
//        
//    })
    
        router.post("/rentTool", function(req,res){
        var id_tool = req.body.Id_tool;
        var id_renter = req.body.Id_renter;
        var numOfRent = req.body.NumOfRent;
        var rental_date = req.body.Rental_date;
        var rental_time = req.body.Rental_time;
        var name_tool = req.body.Name_tool;
        var price = req.body.Price;
        var name = req.body.Name;
        var query = "INSERT INTO `tool_transaction`(`Id_tool`, `Id_renter`, `NumOfRent`, `Rental_date`, `Rental_time`) VALUES ('" + id_tool +"','" + id_renter +"','" + numOfRent +"','" + rental_date +"','" + rental_time +"')";
            
        var query2 = "INSERT INTO `tool`(`Name_tool`, `Price`) VALUES ('" + name_tool +"','" + price +"')";
            
        var query3 = "INSERT INTO `renter`(`Name`) VALUES ('" + name +"')";
        
        
        connection.query(query, function(err, tool){
            if(err){
                res.json({"message":query});
            }
            else{
                connection.query(query2, function(err, tool2){
                    if(err){
                        res.json({"message":query});
                    }
                    else{
                        connection.query(query3, function(err,tool3){
                            if(err){
                                res.json({"message":query});
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
        var name_tool = req.body.Name_tool;
        var type = req.body.Type;
        var price = req.body.Price;
        var stock = req.body.Stock;
        
        var query = "UPDATE `tool` SET `Stock`=`Stock`+? WHERE `Id_tool`=?"
        var table = [stock, id_tool];  
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
    
    router.post("/checkReport", function(req,res){
        var query = "SELECT * FROM `tool_transaction` JOIN `tool` ON `tool_transaction`.`Id_tool` = `tool`.`Id_tool`";
//        var query2 = "SELECT `Id_renter`, `Name` FROM `tool_transaction` JOIN `renter` ON tool_transaction.Id_renter = renter.Id_renter";
        
        connection.query(query,function(err,user){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":user});
//                connection.query(query2,function(err,user){
//                    if(err){
//                        res.json({"message":query});
//                    }
//                    else{
//                        res.json({"message":user});
                    }
                })
            })
        
     
};

module.exports = transaksiAlat;