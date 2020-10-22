




// // for legacy browsers
// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioContext = new AudioContext();  

// // get the audio element
// const audioElement = document.querySelector('audio');

// // pass it into the audio context
// const track = audioContext.createMediaElementSource(audioElement);
// track.connect(audioContext.destination);

// // select our play button
// const playButton = document.querySelector('button');

// playButton.addEventListener('click', function() {

//     // check if context is in suspended state (autoplay policy)
//     if (audioContext.state === 'suspended') {
//         audioContext.resume();
//     }

//     // play or pause track depending on state
//     if (this.dataset.playing === 'false') {
//         console.log('I am playing');
//         audioElement.play();
//         this.dataset.playing = 'true';
//     } else if (this.dataset.playing === 'true') {
//         console.log("I've been paused");
//         audioElement.pause();
//         this.dataset.playing = 'false';
//     }
// }, false);

// var audioPitch = [0.1 , 0.2, 0.3, 0.4, 0.5,  0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]

// distanceForPitch = distance ≥ 20 ? distance: 20 - 1

// let sample = audio("zymbel.mp3")
// function playSample(sample, rate) {
//     const source = context.createBufferSource();
//     source.buffer = sample;
//     source.playbackRate.value = rate;
//     source.connect(context.destination);
//     source.start(0);
//   }
//   playSample(sample, audioPitch);

//   ///every 20px distance it should change in pitch 