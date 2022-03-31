const socket = io('https://1c72-2402-800-620e-c978-a5af-b27a-bdf4-cc17.ngrok.io')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  port: '3001'
})

const myVideo = document.createElement('video')
// myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream);
        const videoA = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(videoA, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
}).catch(err => console.log(err));

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    console.log(video)
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.autoplay = true;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}