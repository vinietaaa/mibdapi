var mysql   = require("mysql");
var request = require('request');

function customer(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
customer.prototype.handleRoutes = function(router,connection) {
    router.post("/allCustomers",function(req, res){

        var query = "SELECT * FROM `customer`";

        connection.query(query, function(err,customer){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":customer});
            }
        })
    })
    router.post("/insertCustomer", function(req,res){
        var id = req.body.id_customer;
        var nama = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var number_phone = req.body.number_phone;
        var address = req.body.address;
        var query = "INSERT INTO `customer`(`id_customer`, `nama_customer`, `username`, `password`, `email`, `noTelpon`, `alamat`) VALUES ('" +id+"','" +nama+"','" +username+"','" +password+"','" +email+"','" +number_phone+"', '" +address+"')";

        connection.query(query, function(err, customer){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })

    router.post("/searchCustomer",function(req,res){
        var username = req.body.username;
        var query = "SELECT * FROM `customer` WHERE `username` LIKE '"+username+"'";

        connection.query(query, function(err, customer){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":customer});
            }
        })
    })

    router.post("/updateCustomer", function(req,res){
        var id = req.body.id_customer;
        var nama = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var number_phone = req.body.number_phone;
        var address = req.body.address;

        var query = "UPDATE `customer` SET `nama_customer`= ?,`username`=?,`password`=?,`email`=?, `noTelpon`=?, `alamat`=? WHERE `id_customer`=?";
        var table = [nama, username, password, email, number_phone, address, id];
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

    router.post("/loginCustomer",function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = "SELECT * FROM `customer` WHERE Username = '"+ username+"' AND Password = '" +password+"'";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if (orang.length <= 0){
                    res.json({" ":"login gagal"});
                }
                else{
                    var query2 = "UPDATE `customer` SET `status` = '1' WHERE username = '"+username+"'";
                    connection.query(query2,function(err,user){
                        if(err){
                            res.json({"message":query2});
                        }
                        else{
                            res.json({"message":orang[0]});
                        }
                    })
                }
            }
        })
    })

    router.post("/logoutCustomer",function(req, res){
        var username = req.body.username;
        var query = "SELECT * FROM `customer` WHERE username = '"+ username+"'";

        connection.query(query, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if (orang.length <= 0){
                    res.json({" ":"logout gagal"});
                }
                else{
                    var query2 = "UPDATE `customer` SET `status` = '0' WHERE username = '"+username+"'";
                    connection.query(query2,function(err,customer){
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
};

module.exports = customer;
