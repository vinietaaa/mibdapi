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
        var stock = req.body.Stock;
        var query = "INSERT INTO `bundle`(`Id_bundle`, `Name_bundle`, `Price`, `Stock`) VALUES ('" + id_bundle +"','" + name_bundle +"','" + price +"','" + stock +"')";
        
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
        var stock = req.body.Stock;
        
        var query = "UPDATE `bundle` SET `Name_bundle`=?, `Price`=?,`Stock`=`Stock`+? WHERE `Id_bundle`=?"
        var table = [name_bundle, price,stock, id_bundle];
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
    
    router.post("/updateStock", function(req,res){
        var id_bundle = req.body.Id_bundle;
        var id_tool = req.body.Id_tool;
        
        var query1 = "SELECT `Id_tool` FROM `bundle_details` WHERE `Id_bundle`='"+id_bundle+"'";
        connection.query(query1,function(err,bundle){
            if(err){
                res.json({"message":query1});
            }
            else{
                var stockBundle = 100;
                var i = 0;
                if(Number(i)<Number(bundle.length)-1){
                    if(Number(bundle1[0].stock)<=Number(stockBundle)){
                        stockBundle=bundle1[0].stock;
                        res.json({"length":stockBundle});
                    } 
                }else{
                    res.json({"length":stockBundle});
                }
//                res.json(bundle.length-1);
//                for(var i=0; i<bundle.length; i++){
//                    var query2 = "SELECT `stock` FROM `tool` WHERE Id_tool='"+bundle[0].Id_tool+"'";
//                    connection.query(query2,function(err,bundle1){
//                        if(err){
//                            res.json({"message":query2});
//                        }
//                        else{
//                            if(Number(i)<Number(bundle.length)-1){                             
//                                if(Number(bundle1[0].stock)<=Number(stockBundle)){
//                                    stockBundle=bundle1[0].stock;
//                                }   
//                            }else{
//                                res.json({"length":stockBundle});
//                            }
//                        }
//                    })
//                }
                
            }
        })
        
    })
    
        router.post("/insertBundleDetails", function(req,res){
        var id_bundle = req.body.Id_bundle;
        var id_tool = req.body.Id_tool;
        var query = "INSERT INTO `bundle_details`(`Id_bundle`, `Id_tool`) VALUES ('" + id_bundle +"','" + id_tool+"')";
        
        connection.query(query, function(err, bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
                
            }
        })
    })
        
        
        
        router.post("/allBundleDetails", function(req,res){
        var query = "SELECT * FROM `bundle_details`";
        
        connection.query(query, function(err, bundle){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":bundle});
            }
        })
    })
};

module.exports = bundle;