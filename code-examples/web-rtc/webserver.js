var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https'),    
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
  //  methodOverride = require('method-override'),
    logger = require('morgan')
    tls = require('tls');
    //ssl = require('ssl-root-cas').addFile('cert.pem');

var app = express();
var cache = {};

app.set("port", process.env.PORT || 33000 );
app.use(express.static(path.resolve(__dirname,"public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//app.use(methodOverride());
app.use(logger());
//app.use( app.router);
app.get("/", function(req,res){
    res.render("index");
}).get("/filesharing", function(req,res){
    res.render("filesharing");
});
//app.use( flash() );

var options = {
    key:fs.readFileSync('key.pem').toString(),    
    cert:fs.readFileSync('cert.pem').toString()
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen( app.get("port"), function(){
    console.log(" Http Server started on port:" + app.get("port"));
});
httpsServer.listen(33443, function(){
    console.log("Https Server started on port:"+ 33443);
});

/*
app.listen(app.get("port"), function(){
    console.log("Server started on port:" + app.get("port"));
});
*/



