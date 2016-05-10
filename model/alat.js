var mysql   = require("mysql");
var request = require('request');

function alat(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
alat.prototype.handleRoutes = function(router,connection) {
    
    router.post("/allTools",function(req, res){
        var id = req.body.id;
        var query = "SELECT * FROM `tool`";

        connection.query(query, function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":tool});
            }
        })
    })
    
    router.post("/deleteTool", function(req, res){
        var id = req.body.Id_tool;
        var querySelect = "SELECT * FROM `tool` WHERE Id_tool = '"+id+"'";
        connection.query(querySelect, function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                if(tool.length<=0){
                    res.json({" ":"delete gagal"});
                }
                else{
                    
                    var query = "DELETE FROM `tool` WHERE Id_tool = '"+id+"'";
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
    
    router.post("/insertTool", function(req,res){
        var id_tool = req.body.Id_tool;
        var name_tool = req.body.Name_tool;
        var type = req.body.Type;
        var price = req.body.Price;
        var stock = req.body.Stock;
        var status = req.body.Status;
        var query = "INSERT INTO `tool`(`Id_tool`, `Name_tool`, `Type`, `Price`, `Stock`) VALUES ('" + id_tool +"','" + name_tool +"','" + type +"','" + price +"','" + stock +"')";
        
        connection.query(query, function(err, tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })
    
    router.post("/updateTool", function(req,res){
        var id_tool = req.body.Id_tool;
        var name_tool = req.body.Name_tool;
        var type = req.body.Type;
        var price = req.body.Price;
        var stock = req.body.Stock;
        var status = req.body.Status;
        
        var query = "UPDATE `tool` SET `Name_tool`=?,`Type`=?,`Price`=?,`Stock`=? WHERE `Id_tool`=?"
        var table = [name_tool, type, price, stock, status, id_tool];
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
    
    router.post("/selectTool", function(req,res){
        var query = "SELECT `Id_tool`, `Name_tool`, `Stock` FROM `tool` WHERE Date = ";
        
        connection.query(query,function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":tool});
            }
        })
    })
};


module.exports = alat;