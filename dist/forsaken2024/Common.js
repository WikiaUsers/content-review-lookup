$(function () {
  const avatarImg = document.querySelector(".wds-avatar__image");
  const target = document.getElementById("user-avatar");

  if (avatarImg && target) {
    let imgUrl =
      avatarImg.currentSrc ||
      (avatarImg.srcset
        ? avatarImg.srcset.split(",").pop().split(" ")[0]
        : avatarImg.src);
    imgUrl = imgUrl.replace(/\/scale-to-width-down\/\d+/, "");

    target.style.backgroundImage = `url(${imgUrl})`;
    target.style.backgroundSize = "cover";
    target.style.backgroundPosition = "center";
    target.style.backgroundRepeat = "no-repeat";
  }
});

const el = document.getElementById("Spectgreet");

// UTC Time Greeting
function getBase() {
  const hour = new Date().getUTCHours();
  return hour < 12 ? "Good Morning," :
         hour < 18 ? "Good Afternoon," :
         "Good Evening,";
}

// Message Choices
const messages = [
  "you aren't alone here,",
  "come back and play,",
  "do you hear that?",
  "why did you lock the door?",
  "you can't escape me,"
];
function setNormal() {
  el.innerText = getBase();
}

// Upper Lowercase Text
function glitch() {
  const msg = messages[Math.floor(Math.random() * messages.length)];

  let i = 0;
  const interval = setInterval(() => {
    let text = msg
      .split("")
      .map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase())
      .join("");
    el.innerText = text;
    i++;
    if (i > 35) { 
      clearInterval(interval);
      setNormal();
    }
  }, 80);
}

setNormal();
setInterval(() => {
  glitch();
}, 30000);