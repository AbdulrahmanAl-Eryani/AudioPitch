// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();  

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

// select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
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

var audioPitch = [0.1 , 0.2, 0.3, 0.4, 0.5,  0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
var currentDistance= [distance > 10 && distance < 30, distance > 30 && distance < 50 ,
    distance > 10 && distance < 30  ,distance > 10 && distance < 30 ,  ]
    
if {
    distance >
    
}
function value_limit(val, min, max)[
    return val < min? min : (val > max ? max : val)
]

for 
let prevValueIsWithinDistance = false;
let currentValueIsWithinDistance = false;

var audio = new Audio('ding.wav');

window.setInterval( function(){
    
    currentValueIsWithinDistance =(distance > 20 && distance < 100 )
    
    if(currentValueIsWithinDistance && prevValueIsWithinDistance){
        audio.play()
    }

    prevValueIsWithinDistance = currentValueIsWithinDistance
  },2000)

  ///if the value is in

  function loadSample(sample) {
    return fetch(sample)
      .then(response => response.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer));
  }
  
  function playSample(sample) {
    const source = context.createBufferSource();
    source.buffer = sample;
    source.connect(context.destination);
    source.start(0);
  }
  
  loadSample("zymbel.mp3")
    .then(sample => playSample(sample));
  
    
    function playSample(sample, rate) {
      const source = context.createBufferSource();
      source.buffer = sample;
      source.playbackRate.value = rate;
      source.connect(context.destination);
      source.start(0);
    }
    playSample(sample, 0.5);