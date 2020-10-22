// @ts-nocheck
// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();  

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createBufferSource(audioElement);

track.connect(audioContext.destination);

function playSample(sample, rate) {

  }
//======================================
//             PLAY/PAUSE
//======================================
// select play button
const playButton = document.querySelector('button');
function loadSample(url) {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer));
  }

  function playSample(sample) {
    const source = audioContext.createBufferSource();
    source.buffer = sample;
    source.connect(audioContext.destination);
    source.start(0);
  }
  
//note that the button's attribute is set on 'loop'
playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    

    bodies.addEventListener('bodiesDetected', (e) => {
        body = e.detail.bodies.getBodyAt(0)
        distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
        currentValueIsWithinDistance = (distance > 20 && distance < 100)
        document.getElementById('output').innerText = `Distance between wrists: ${distance}`
        body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
        let audioPitch = [0.1 , 0.2, 0.3, 0.4, 0.5,  0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
    
        const maxDistance = 190
        let distanceForPitch = distance <= maxDistance ? distance: maxDistance;
        let constrictedDistanceToPitch = Math.round(distanceForPitch/10)
        console.log(audioPitch[constrictedDistanceToPitch])
        
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    
        // play or pause track depending on state
        if (this.dataset.playing === 'false') {
            console.log('I am playing');
            audioElement.play();
            
        // loadSample('../zybmel.mp3')
        // .then(sample => playSample(sample));
            this.dataset.playing = 'true';
        } else if (this.dataset.playing === 'true') {
            // console.log("I've been paused");
            // audioElement.pause();
            // this.dataset.playing = 'false';
        }
    // let sample = audio()
    
    //   playSample(sample, audioPitch);
    
    })
    
}, false);

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