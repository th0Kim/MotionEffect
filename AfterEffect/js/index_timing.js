var animationSpray = document.getElementById("animationSpray");

var SoundPshit =  new Audio('https://upload.wikimedia.org/wikipedia/commons/f/f0/Shaking_aerosol_sprayer.ogg');

var animation = bodymovin.loadAnimation({
  wrapper: document.getElementById("animation"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  prerender: true,
  path: "data.json"
});

var curFrame;
var timer;

animationSpray.addEventListener("mouseenter", fEnter);
animationSpray.addEventListener("mouseleave", fLeave);
animationSpray.addEventListener("mousedown", fClicDown);
animationSpray.addEventListener("mouseup", fClicUp);

// On Enter behavior
function fEnter() {
  animationSpray.removeEventListener("mouseenter", fEnter);
  animation.playSegments([0, 50], true);
  animationSpray.addEventListener("mouseleave", fLeave);
}

// On Leave behavior
function fLeave() {
  animationSpray.removeEventListener("mouseleave", fLeave);

  animation.playSegments([100, 150], true);

  animationSpray.addEventListener("mouseenter", fEnter);
}

// On mouseDown
function fClicDown() {
  animationSpray.removeEventListener("mousedown", fClicDown);
  animation.playSegments([50, 60], true);
  timer=setInterval(function(){
          animation.playSegments([60, 75], true);
    //PlaySound(SoundPshit);
     }, 300);
  animationSpray.addEventListener("mousedown", fClicDown);
}

// On mouseUp
function fClicUp() {
  if (timer) clearInterval(timer)
  animationSpray.removeEventListener("mouseup", fClicUp);
 
  animation.playSegments([75, 100], true);
  //StopSound(SoundPshit);
  animationSpray.addEventListener("mouseup", fClicUp);
}

// Restart
animation.wrapper.addEventListener("complete", fRestart);

function fRestart() {
  console.log(curFrame + " Restart");
  animation.wrapper.goToAndStop(0);
}



//Sounds


function PlaySound(SoundPshit) {
    
    SoundPshit.play();
}

function StopSound(SoundPshit) {
    SoundPshit.pause();
    SoundPshit.currentTime = 0;
}