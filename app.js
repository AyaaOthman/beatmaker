//setting the Class of the DrumKit
class DrumKit {
  constructor() {
    this.pad = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");
    this.playing = null;
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".slider");
  }
  //Adding the Active Style
  activePadStyle() {
    this.classList.toggle("active");
  }
  //looping
  repeat() {
    //sellecting each pad
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    //animation loop

    activePad.forEach((pad) => {
      pad.style.animation = `animation 0.3s alternate ease-in-out 2`;
      //check for active pads
      if (pad.classList.contains("active")) {
        //what sound
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.kickAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.kickAudio.currentTime = 0;

          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.playing) {
      clearInterval(this.playing);
      this.playing = null;
    } else {
      this.playing = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  playStop() {
    if (!this.playing) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.add = "active";
    } else {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.remove = "active";
    }
  }
  changeSound(e) {
    const selectionTrack = e.target.name;
    const selctionSound = e.target.value;
    console.log(selectionTrack);
    switch (selectionTrack) {
      case "kick":
        this.kickAudio.src = selctionSound;

        break;
      case "snare":
        this.snareAudio.src = selctionSound;
        break;
      case "hihat":
        this.hihatAudio.src = selctionSound;
        break;
    }
  }
  mute(e) {
    const muteTrack = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteTrack) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteTrack) {
        case "0":
          this.kickAudio.volume = 1;
          break;

        case "1":
          this.snareAudio.volume = 1;
          break;

        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  tempo(e) {
    this.bpm = e.target.value;
    const tempoValue = document.querySelector(".tempoNr");

    tempoValue.innerText = e.target.value;

    clearInterval(this.playing);
    this.playing = null;
    this.playBtn.innerText = "Play";

    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
//creating the drumKit
const drumkit = new DrumKit();

//Events
//activation of pad & remove animation from it
drumkit.pad.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePadStyle);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
// play btn start loop
drumkit.playBtn.addEventListener("click", function () {
  drumkit.start();
  drumkit.playStop();
});
// change btw sounds
drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});
drumkit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});
drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.tempo(e);
});
