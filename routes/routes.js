var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req,res){

	res.send("Welcome to MusicTender!");

});

router.get('/index.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");


    fs.readFile(__dirname + "/../views/" + "index.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});

router.get('/index1.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");
    //console.log("Request:")
    //var ip = req.clientIp;
    
    //console.log("Client's IP" + ip)

    fs.readFile(__dirname + "/../views/" + "index1.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});

router.get('/index_mobile.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");
    //console.log("Request:")
    //var ip = req.clientIp;
    
    //console.log("Client's IP" + ip)

    fs.readFile(__dirname + "/../views/" + "index_mobile.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});


//export this router into our app.js
module.exports = router;