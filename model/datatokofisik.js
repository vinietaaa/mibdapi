var mysql   = require("mysql");
var request = require('request');

function datatokofisik(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

datatokofisik.prototype.handleRoutes = function(router,connection) {
    router.post("/allTokoFisik",function(req, res){

        var query = "SELECT * FROM `datatokofisik`";

        connection.query(query, function(err,customer){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":customer});
            }
        })
    })

    router.post("/deleteTokoFisik", function(req, res){
        var id = req.body.id;
        var querySelect = "SELECT * FROM `datatokofisik` WHERE id_toko = '"+id+"'";
        connection.query(querySelect, function(err,orang){
            if(err){
                res.json({"message":query});
            }
            else{
                if(orang.length<=0){
                    res.json({" ":"delete gagal"});
                }
                else{
                     var query = "DELETE FROM `datatokofisik` WHERE id_toko = '"+id+"'";
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

    router.post("/insertTokoFisik", function(req,res){
        var id = req.body.id;
        var nama = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var number_phone = req.body.number_phone;
        var address = req.body.address;
        var tipeMember = req.body.tipeMember;
        var query = "INSERT INTO `datatokofisik`(`id_toko`, `nama_toko`, `username`, `password`, `noTelpon`, `alamat`,`tipeMember`) VALUES ('" + id +"','" + nama +"','" + username +"','" + password +"','" + number_phone +"','" + address +"', '" + tipeMember +"')";

        connection.query(query, function(err, customer){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })

    router.post("/updateTokoFisik", function(req,res){
      var id = req.body.id;
      var nama = req.body.name;
      var username = req.body.username;
      var password = req.body.password;
      var number_phone = req.body.number_phone;
      var address = req.body.address;
      var tipeMember = req.body.tipeMember;

        var query = "UPDATE `datatokofisik` SET `nama_toko`= ?,`username`=?,`password`=?,`noTelpon`=?, `alamat`=?, `tipeMember`=? WHERE `id_toko`=?";
        var table = [nama, username, password, number_phone, address, tipeMember, id];
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

    router.post("/createBill", function(req,res){
        var id_renter = req.body.Id_renter;
        var query = "SELECT `Name_tool`, `NumOfRent`, `Price` FROM `tool_transaction` JOIN `tool` ON tool_transaction.Id_tool = tool.Id_tool WHERE Id_renter ='"+id_renter+"'";

        connection.query(query,function(err,bill){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":bill});
            }
        })
    })
}

module.exports = datatokofisik;
