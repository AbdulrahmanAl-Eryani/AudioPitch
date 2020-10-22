// @ts-nocheck

// get the audio element
const audioElement = document.querySelector('audio');

//======================================
//             PLAY/PAUSE
//======================================
// select play button
const playButton = document.querySelector('button');



//note that the button's attribute is set on 'loop'
playButton.addEventListener('click', function() {
    if (this.dataset.playing === 'false') {
        console.log('I am playing');
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        console.log("I've been paused");
        audioElement.pause();
        this.dataset.playing = 'false';
    }   
}, false);


//======================================
//     Display Video  In Canvas
//======================================
// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.MobileNetV1, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 100})

// Update playback rate based on distance between wrists
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    currentValueIsWithinDistance = (distance > 20 && distance < 100)
    document.getElementById('output').innerText = `Distance between wrists: ${distance}`
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)

    // An Array of length 20 which contains possible values for playback rate
    let audioPitch = [0.1 , 0.2, 0.3, 0.4, 0.5,  0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
    // Set max distance for limiter, which is also equal to the length of the array audioPitch
    const maxDistance = 19;
    // Divide distance by ten since we want distance 190 to be the 20th item in our array
    const distanceDividedByTen = distance /10;
    // Set upper limit for distance to be max distance and if it exceeds it then set the distance to max distance
    let constrictedDistanceToPitch = distanceDividedByTen <= maxDistance  ? distanceDividedByTen: maxDistance;
    // Round distanceForPitch to a number that does not contain a decimal so it can be used as a key to get an array value
    let roundedConstrictedDistanceToPitch = Math.round(constrictedDistanceToPitch)
    // Set the playback rate to the the value of audio pitch at a specific key
    audioElement.playbackRate = audioPitch[roundedConstrictedDistanceToPitch];
    // Console log current playback rate to determine if it is actually changing or not
    console.log("current playback rate", audioElement.playbackRate)
})        

let body;
let distance;
let prevValueIsWithinDistance = false;
let currentValueIsWithinDistance = false;

currentValueIsWithinDistance = (distance > 10 && distance < 100);

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

    // draw the video element into the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    
    if (body) {
        // draw circle for left and right wrist
        const leftWrist = body.getBodyPart(bodyParts.leftWrist)
        const rightWrist = body.getBodyPart(bodyParts.rightWrist)

        // draw left wrist
        ctx.beginPath();
        ctx.arc(leftWrist.position.x, leftWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()

        // draw right wrist
        ctx.beginPath();
        ctx.arc(rightWrist.position.x, rightWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()
    }
    requestAnimationFrame(drawCameraIntoCanvas)
}

/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();