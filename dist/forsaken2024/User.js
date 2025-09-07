$(function () {
  // Only run this on your userpage
  if (mw.config.get("wgPageName") !== "User:No1.exe") return;

  // Create audio player container
  const container = document.createElement("div");
  container.id = "myAudioPlayer";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.left = "6%";
  container.style.zIndex = "999";
  container.style.padding = "10px";
  container.style.background = "linear-gradient(to right, #000000, #0b4f0d)";
  container.style.border = "4px solid transparent";
  container.style.borderRadius = "0px 10px 0px 0px";
  container.style.boxShadow = "0 0 12px red";
  document.body.appendChild(container);

  // Initialize the HTML5 Audio Player
  new HTML5AudioPlayer({
    target: '#myAudioPlayer',
    source: 'https://static.wikia.nocookie.net/forsaken2024/images/FILEPATH/Hacklordlms.mp3',
    autoplay: true,
    loop: true,
    volume: 1
  }).on('play', () => {
    document.body.style.background = "linear-gradient(to right, #4b0082, #8a2be2)";
  }).on('pause', () => {
    document.body.style.background = "linear-gradient(to right, #000000, #0b4f0d)";
  });
});

// Import the HTML5 Audio Player script from Dev Wiki
importScriptPage('HTML5AudioPlayer/code.js', 'dev');