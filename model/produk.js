var mysql   = require("mysql");
var request = require('request');

function produk(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}
produk.prototype.handleRoutes = function(router,connection) {

    router.post("/allProduk",function(req, res){

        var query = "SELECT * FROM `produk`";

        connection.query(query, function(err,produk){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":produk});
            }
        })
    })

    router.post("/deleteProduk", function(req, res){
        var id = req.body.id_produk;
        var querySelect = "SELECT * FROM `produk` WHERE id_produk = '"+id+"'";
        connection.query(querySelect, function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                if(tool.length<=0){
                    res.json({" ":"delete gagal"});
                }
                else{

                    var query = "DELETE FROM `produk` WHERE id_produk = '"+id+"'";
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

    router.post("/insertProduk", function(req,res){
        var id = req.body.id_produk;
        var nama = req.body.nama_produk;
        var deskripsi = req.body.deskripsi;
        var harga = req.body.harga;
        var foto = req.body.foto;
        var query = "INSERT INTO `produk`(`id_produk`, `nama_produk`, `deksripsi`, `harga`, `foto`) VALUES ('" + id +"','" + nama_produk +"','" + deskripsi +"','" + harga +"','" + foto +"')";

        connection.query(query, function(err, tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":"insert berhasil"});
            }
        })
    })

        router.post("/updateProduk", function(req,res){
        var id = req.body.id_produk;
        var nama = req.body.nama_produk;
        var deskripsi = req.body.deskripsi;
        var harga = req.body.harga;
        var foto = req.body.foto;

        var query = "UPDATE `produk` SET `nama_produk`=?,`deskripsi`=?,`harga`=?,`foto`=? WHERE `id_produk`=?"
        var table = [nama, deksripsi, harga, foto, id];
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

    router.post("/checkToolByDate", function(req,res){
        var date1 = req.body.Rental_date1;
        var date2 = req.body.Rental_date2;
        var query = "SELECT * FROM `tool_transaction` JOIN `tool` ON tool_transaction.Id_tool = tool.Id_tool WHERE `Rental_date`>='"+date1+"' AND `Rental_date` <='"+date2+"'";


        connection.query(query,function(err,tool){
            if(err){
                res.json({"message":query});
            }
            else{
                res.json({"message":tool});
            }
        })
    })

    router.post("/checkToolByPeriode", function(req,res){
//        yyyy/mm/dd
        Date.prototype.thismonth = function (){
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()+1).toString();
            var dd = this.getDate().toString();
            return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]);
        }
        Date.prototype.lastmonth = function (){
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()).toString();
            var dd = this.getDate().toString();
            return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]);
        }
        var today = new Date();
        var this_month = today.thismonth();
        var last_month = today.lastmonth();

//        res.json(last_month+" "+this_month);
        var query = "SELECT * FROM `tool_transaction` JOIN `tool` ON tool_transaction.Id_tool = tool.Id_tool WHERE `Rental_date` >= '"+last_month+"' AND `Rental_date` <= '"+this_month+"'";

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


module.exports = produk;
