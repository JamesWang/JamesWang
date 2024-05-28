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
    window.RTCSessionDescription = window.RTCSessionDescription ||
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
    if (hasUserMedia()) {
        navigator.getUserMedia({ video: true, audio: false }, function (myStream) {
            stream = myStream;
            yourVideo.src = window.URL.createObjectURL(stream);
            if (hasRTCPeerConnection()) {
                setupPeerConnection(stream);
            } else {
                alert("Sorry, your browser does not support WebRTC");
            }
        }, function (err) {
            console.log(err);
        });
    } else {
        alert("Sorry, your browser does not support WebRTC");
    }
}

function setupPeerConnection(stream) {
    var configuration = {
        "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
    };
    yourConnection = new RTCPeerConnection(configuration);
    yourConnection.addStream(stream);

    yourConnection.onaddstream = function (e) {
        if (!theirVideo) {
            theirVideo = document.querySelector('#theirs');
        }
        theirVideo.src = window.URL.createObjectURL(e.stream);
    };

    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            send({
                name: connectedUser,
                type: "candidate",
                candidate: event.candidate
            });
        }
    };
}


function startPeerConnection(user) {
    connectedUser = user;
    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer, function () {
            send({
                name: user,
                type: 'offer',
                offer: offer
            })
        });
    }, function (err) {
        alert('An error has occured!');
    });
}
