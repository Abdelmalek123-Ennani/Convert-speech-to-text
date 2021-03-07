
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const textInput = document.getElementById('text');
const selectButton = document.getElementById('select-button');
const copyButton = document.getElementById('copy-button');
const cutButton = document.getElementById('cut-button');

const btnTalk = document.getElementById('talk');
const alertMessage = document.querySelector('.alert');
let currentIndex;


playButton.addEventListener('click' , () => {
    playtext(textInput.value);
})
pauseButton.addEventListener('click' ,pauseText);
stopButton.addEventListener('click' , stopText);

selectButton.addEventListener('mouseout' , hoverSelectButton);
selectButton.addEventListener('click' , selectFunction);

copyButton.addEventListener('click' , copyFunction);
copyButton.addEventListener('mouseout' , hoverCopyButton);

cutButton.addEventListener('click' , cutFunction);
cutButton.addEventListener('mouseout' , hoverCuatButton);


/* input the things */

const speechRecognitoion = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognitoion();

btnTalk.addEventListener('click' , () => {
    recognition.start();
})

recognition.addEventListener('start' , () => {
    alertMessage.textContent = "You are recording now ):"
})


recognition.addEventListener('speechend' , () => {
    alertMessage.textContent = "Recording has been terminated";
})

recognition.addEventListener('result' , (e) => {
    const current = e.currentIndex;
    const transcript = e.results[0][0].transcript;
    textInput.textContent = transcript;
    alertMessage.textContent = "Click the button below to start Recording";
})










const utterance  = new SpeechSynthesisUtterance();
const voices = window.speechSynthesis.getVoices();;
utterance.voice = voices[3]; // female voice

utterance.addEventListener('boundary' , e => {
    // return the index of the first char on the world that the computer saying right now
   currentIndex = e.charIndex; 
});

function playtext(text) {

    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }

    if ( speechSynthesis.pause && speechSynthesis.speaking ) {
        return speechSynthesis.resume();
    }

   
    if ( utterance.speaking ) return;
   
    utterance.text = text;
    
    utterance.rate =  false || 1;
    
    speechSynthesis.speak(utterance);
}


function pauseText(){
    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }
    //cheak if the computer are speaking or not
    // if it was speakung make it stop
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
}



function stopText() {
    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }
    // resume to leave the pause state
    speechSynthesis.resume();
    // then cancel the speechSynthesis
    speechSynthesis.cancel();

    // clear the field
    textInput.textContent = "";
}


// to make copy
function copyFunction() {

    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }

    textInput.select();
    textInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    
    var tooltip = document.querySelector("#copy-button #myTooltip");
    tooltip.innerHTML = "Copied:)";
  }
// when hover over the button
  function hoverCopyButton() {
    var tooltip = document.querySelector("#copy-button #myTooltip");
    tooltip.innerHTML = "Click to copy";
  }


  function cutFunction() {

    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }

    textInput.select();
    textInput.setSelectionRange(0, 99999);
    document.execCommand("cut");
    
    var tooltip = document.querySelector("#cut-button #myTooltip");
    tooltip.innerHTML = "cutted:)";
  }

  function hoverCuatButton() {
    var tooltip = document.querySelector("#cut-button #myTooltip");
    tooltip.innerHTML = "Click to cut";
  }

// selecth button
  function selectFunction() {

    if ( textInput.value.trim() == "" ) {
        alert('Please write something first');
        return;
    }

    textInput.select();    
    var tooltip = document.querySelector("#select-button #myTooltip");
    tooltip.innerHTML = "selected:)";
  }

  function hoverSelectButton() {
    var tooltip = document.querySelector("#select-button #myTooltip");
    tooltip.innerHTML = "Click to cut";
  }
