var WebSocketServer = require('ws').Server,	
    users = {},
    https = require('https'),
    fs = require('fs'), 
    express = require('express');

var app = express();

var options = {
    key:fs.readFileSync('key.pem').toString(),    
    cert:fs.readFileSync('cert.pem').toString()
};
var httpsServer = https.createServer(options, app);
httpsServer.listen(46443);

//wss = new WebSocketServer({port:46181})
wss = new WebSocketServer({
    server:httpsServer
});
wss.on('listening', function(){
    console.log("Server started...");
});
wss.on('connection', function(connection) {
    connection.on('message',function(message){
		console.log("Got message:", message);
        var data;
        try {
            data = JSON.parse(message);
        } catch ( e ) {
            console.log("Error parsing JSON");
            data = {};
        }
        switch( data.type ) {
            case "login":
                console.log("User logged in as:"  + data.name );
                if( users[data.name]) { //already exists
                    sendTo(connection,{
                        type:"login",
                        success:false
                    });
                } else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo( connection,{
                        type:"login",
                        success:true
                    });
                }
                break;
            case "offer":
                console.log("Sending offer to :", data.name);
                var conn = users[data.name];
                if( conn != null ) {
                    connection.othername = data.name;
                    sendTo(conn, {
                        type:"offer",
                        offer:data.offer,
                        name:connection.name
                    });
                }
                break;
            case "answer":
                console.log("Sending answer to :", data.name );
                var conn = users[data.name];
                if( conn != null ) {
                    connection.othername = data.name;
                    sendTo(conn, {
                        type:"answer",
                        answer: data.answer
                    });
                }
                break;
            case "candidate":
                console.log("Sending candidate to :", data.name);
                var conn = users[data.name];
                if( conn != null ) {
                    sendTo(conn, {
                        type:"candidate",
                        candidate: data.candidate
                    });
                }
                break;
            case "leave":
                console.log("Disconnection user from ", data.name);
                var conn = users[data.name];            
                if( conn != null ) {
                    conn.othername = null;
                    sendTo(conn, {
                        type:"leave"
                    });
                }
                break;
            default:
                sendTo(connection,{
                    type:"error",
                    message:"Unrecognized command:" +  data.type
                });
                break;
        }
    });
    connection.on("close", function(){
        if( connection.name != null ) {
            delete users[connection.name];
            if( connection.othername ) {
                console.log("Disconnecting user from :", connection.othername);
                var conn = users[connection.othername];
                if( conn != null ) {
                    conn.othername = null;
                    sendTo(conn, {
                        type:"leave"
                    });
                }
            }
        }
    });
	function sendTo(conn, message ) {
        conn.send(JSON.stringify(message));
    }
});


