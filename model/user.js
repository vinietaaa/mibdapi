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
        var query = "SELECT * FROM `user`";

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
        var query = "SELECT * FROM `user` WHERE username = '"+ username+"' AND password = '" +password+"'";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if (orang.length <= 0){                    
                    res.json({" ":"login gagal"});
                }
                else{                                    
                    var query2 = "UPDATE `user` SET `status` = 'active' WHERE username = '"+username+"'";
                    connection.query(query2,function(err,user){
                        if(err){
                            res.json({"message":query2});
                        }
                        else{
                            res.json({"message":"login berhasil"});
                        }
                    })
                }
            }
        })
    })
    
    router.post("/logout",function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = "SELECT * FROM `user` WHERE username = '"+ username+"' AND password = '" +password+"'";

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
    
    router.post("/delete", function(req, res){
        var id = req.body.id;
        var querySelect = "SELECT * FROM `user` WHERE Id = '"+id+"'";
        connection.query(querySelect, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if(orang.length<=0){
                    res.json({" ":"delete gagal"});
                }
                else{
                    
        var query = "DELETE FROM `user` WHERE Id = '"+id+"'";
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
    
    router.post("/insert", function(req,res){
        var id = req.body.id;
        var nama = req.body.nama;
        var alamat = req.body.alamat;
        var id_sewa = req.body.id_sewa;
        var nomor_hp = req.body.nomor_hp;
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        var query = "INSERT INTO `user`(`Id`, `Nama`, `Alamat`, `Username`, `Password`, `role`, `status`) VALUES ('" + id +"','" + nama +"','" + alamat +"','" + username +"','" + password +"','" + role +"','"+status+"')";
        
        connection.query(query, function(err, orang){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })
    
    router.post("/update", function(req,res){
        var id = req.body.id;
        var nama = req.body.nama;
        var alamat = req.body.alamat;
        var id_sewa = req.body.id_sewa;
        var nomor_hp = req.body.nomor_hp;
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        var status = req.body.status;
        
        var query = "UPDATE `user` SET `Nama`= ?,`Alamat`=?,`Username`=?,`Password`=?, `role`=?, `status`=? WHERE `Id`=?";
        var table = [nama, alamat, username, password, role, status, id];
        query= mysql.format(query,table);
        
        connection.query(query,function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"update berhasil"});
            }
        })
    })
    
    router.post("/checkStatus", function(req,res){
        var query = "SELECT `username` FROM `user` WHERE `status` = 'active'";
        
        connection.query(query,function(err,user){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":user});
            }
        })
    })
       
}

module.exports = user;
