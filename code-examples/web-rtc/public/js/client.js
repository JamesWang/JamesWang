var name, connectedUser;
var connection = new WebSocket('wss://192.168.15.114:46443');
var loginPage = document.querySelector('#login-page'),
    username = document.querySelector('#username'),
    loginBtn = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsername = document.querySelector('#theirUsername'),
    callBtn = document.querySelector('#call'),
    hangupBtn = document.querySelector('#hang-up');

callPage.style.display = 'none';
loginBtn.addEventListener('click', function (event) {
    name = username.value;
    if (name.length > 0) {
        send({
            type: 'login',
            name: name
        });
    }
});

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
    return !!navigator.getUserMedia;                    
}
function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection ||
                               window.webkitRTCPeerConnection || 
                               window.mozRTCPeerConnection;
    window.RTCSessionDescription =  window.RTCSessionDescription ||
                                    window.webkitRTCSessionDescription ||
                                    window.mozRTCSessionDescription;
    window.RTCIceCandidate = window.RTCIceCandidate ||
                             window.webkitRTCIceCandidate || 
                             window.mozRTCIceCandidate;

    return !!window.RTCPeerConnection;
}

var yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection, stream;

function startConnection() {
    if( hasUserMedia()) {
        navigator.getUserMedia({video:true,audio:false}, function(myStream){
            stream = myStream;
            yourVideo.src = window.URL.createObjectURL(stream);
            if( hasRTCPeerConnection()) {
                setupPeerConnection(stream);
            } else {
                alert("Sorry, your browser does not support WebRTC");
            }
        }, function(err) {
            console.log(err);
        });
    } else {
        alert("Sorry, your browser does not support WebRTC");
    }
}

function setupPeerConnection( stream ) {
    var configuration = {
        "iceServers":[{"url":"stun:stun.1.google.com:19302"}]
    };
    yourConnection = new RTCPeerConnection(configuration);    
    yourConnection.addStream(stream);
    
    yourConnection.onaddstream = function(e) {
        if( !theirVideo ) {
            theirVideo = document.querySelector('#theirs');
        }
        theirVideo.src = window.URL.createObjectURL(e.stream);
    };

    yourConnection.onicecandidate = function(event) {
        if( event.candidate ) {
            send({
                name:connectedUser,
                type:"candidate",
                candidate:event.candidate
            });
        }
    };   
}

function startPeerConnection( user ){
    connectedUser = user;
    yourConnection.createOffer( function(offer){
        yourConnection.setLocalDescription(offer, function(){
            send({
                name:user,
                type:'offer',
                offer:offer
        })});
    }, function(err){
        alert('An error has occured!');
    });
}

connection.onopen = function () {
    console.log("Connected");
};

connection.onmessage = function (message) {
    console.log("Got message:", message.data);
    var data = JSON.parse(message.data);
    switch (data.type) {
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer, data.name);
            break;
        case "candidate":
            onCandidate(data.candidate,data.name);
            break;
        case "leave":
            onLeave();
            break;
        default:
            break;
    }
};

connection.onerror = function (err) {
    console.log("Got Error:", err);
}

function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));
    yourConnection.createAnswer(function (answer) {
        yourConnection.setLocalDescription(answer);
        send({
            name:name,
            type: 'answer',
            answer: answer
        });
    }, function (err) {
        alert('An error has occurred!');
    });
};

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
};

function onCandidate( candidate ) {
    yourConnection.addIceCandidate( new RTCIceCandidate(candidate));
}



function onLogin(success) {
    if (success === false) {
        alert('Login unsucessful, please try a different name.');
    } else {
        loginPage.style.display = 'none';
        callPage.style.display = 'block';
        startConnection();
    }
}
callBtn.addEventListener('click', function () {
    var theirUsername = document.querySelector('#theirUsername').value;
    if (theirUsername.length > 0) {
        startPeerConnection(theirUsername);
    }
});

hangupBtn.addEventListener( 'click11', function(name){
    send({
        name:connectedUser,
        type:'leave'        
    });
    onLeave();
});

function onLeave() {
    connection = null;
    theirVideo = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    yourConnection.onaddstream=null;
    setupPeerConnection(stream);
}