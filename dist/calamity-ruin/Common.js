$(function(){

  /* ================= PAGE CHECK ================= */

  if (mw.config.get("wgPageName") !== "The_Knight") return;

  /* ================= CONFIG ================= */

  const AUDIO_URL  = 'https://files.catbox.moe/0p8rjg.mp3';
  const VIDEO_URL  = 'https://static.wikia.nocookie.net/calamity-ruin/images/9/9a/The_Roaring_Knight_maybe.mp4';

  const FLASH_START = 15.8;
  const FLASH_END   = 16.6;
  const VIDEO_TIME  = 16.6;

  const CHANCE = 0.001; // 0.1%

  /* ================= 1% CHANCE CHECK ================= */

  const triggered = Math.random() < CHANCE;
  if (!triggered) return;

  /* ================= VIDEO ================= */

  const video = $('<video>').attr({
    src: VIDEO_URL,
    muted: true,
    playsinline: true,
    preload: 'metadata',
    loop: true
  }).css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 9996,
    pointerEvents: 'none',
    visibility: 'hidden',
    willChange: 'transform',
    transform: 'translateZ(0)'
  }).appendTo('body')[0];

  let killed = false;
  let videoVisible = false;

  function showVideo(){
  if(videoVisible) return;

  video.currentTime = VIDEO_TIME;
  video.play().catch(()=>{});
  video.style.visibility = "visible";

  videoVisible = true;
}

  function hideVideo(){
    video.style.visibility = "hidden";
    videoVisible = false;
  }

  /* ================= TEXT ================= */

  function textStyle(size, top=null, bottom=null){
    return {
      position: 'fixed',
      top: top,
      bottom: bottom,
      left: '50%',
      transform: 'translateX(-50%)',
      color: '#000',
      fontSize: size + 'px',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 9999,
      pointerEvents: 'none',
      textShadow: `
        -2px -2px 0 #fff,
         2px -2px 0 #fff,
        -2px  2px 0 #fff,
         2px  2px 0 #fff
      `,
      opacity: 0,
      transition: 'opacity .6s ease'
    };
  }

  const topText = $('<div>').html(`
    Music by: th3reckoning<br>
    Video by: Celi
  `).css(textStyle(28, '40px')).appendTo('body')[0];

  const bottomText = $('<div>')
    .text('THIS HAS A 0.1% CHANCE TO APPEAR!!')
    .css(textStyle(30, null, '40px'))
    .appendTo('body')[0];

  const controlText = $('<div>')
    .text('Press P to stop the music and video.')
    .css(textStyle(22, null, '80px'))
    .appendTo('body')[0];

  function hideAllText(){
    topText.style.opacity = 0;
    bottomText.style.opacity = 0;
    controlText.style.opacity = 0;
  }

  function updateText(current, duration){
    if(current < 6 || duration - current < 6){
      topText.style.opacity = 1;
      bottomText.style.opacity = 1;
      controlText.style.opacity = 0;
    } else {
      topText.style.opacity = 0;
      bottomText.style.opacity = 0;
      controlText.style.opacity = 1;
    }
  }

  /* ================= FLASH ================= */

  const flash = $('<div>').css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#ffffff',
    zIndex: 9998,
    pointerEvents: 'none',
    opacity: 0
  }).appendTo('body')[0];

  function updateFlash(current){
    if(current >= FLASH_START && current <= FLASH_END){
      const progress = (current - FLASH_START) / (FLASH_END - FLASH_START);
      flash.style.opacity = 1 - progress;
    } else {
      flash.style.opacity = 0;
    }
  }

  /* ================= CANVAS ================= */

  function makeCanvas(side){
    return $('<canvas>').css({
      position:'fixed',
      top:0,
      width:'120px',
      height:'100%',
      left: side === 'left' ? 0 : 'auto',
      right: side === 'right' ? 0 : 'auto',
      zIndex:9997,
      pointerEvents:'none'
    }).appendTo('body')[0];
  }

  const cLeft  = makeCanvas('left');
  const cRight = makeCanvas('right');
  const ctxL = cLeft.getContext('2d');
  const ctxR = cRight.getContext('2d');

  function resize(){
    [cLeft, cRight].forEach(c=>{
      c.width = 120;
      c.height = innerHeight;
    });
  }
  resize();
  $(window).on('resize', resize);

  /* ================= AUDIO ================= */

  const audio = new Audio(AUDIO_URL);
  audio.crossOrigin = "anonymous";

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.85;

  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  const data = new Uint8Array(analyser.frequencyBinCount);

  /* ================= VISUALIZER ================= */

  function drawSide(ctx, arr, invert){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    const bars = 64;
    const bh = ctx.canvas.height / bars;

    for(let i=0;i<bars;i++){
      const v = arr[i] || 0;
      const w = (v / 255) * ctx.canvas.width * 0.9;

      const grad = ctx.createLinearGradient(
        invert ? ctx.canvas.width : 0,
        0,
        invert ? ctx.canvas.width - w : w,
        0
      );

      grad.addColorStop(0, '#000000');
      grad.addColorStop(1, '#ffffff');

      ctx.fillStyle = grad;

      ctx.fillRect(
        invert ? ctx.canvas.width - w : 0,
        ctx.canvas.height - (i+1)*bh,
        w,
        bh - 2
      );
    }
  }

  /* ================= LOOP ================= */

  function loop(){
  if(killed) return;
  requestAnimationFrame(loop);

    if(audio.ended){
      video.pause();
      hideVideo();
      hideAllText();
      drawSide(ctxL, [], false);
      drawSide(ctxR, [], true);
      return;
    }

    if(audio.paused){
      drawSide(ctxL, [], false);
      drawSide(ctxR, [], true);
      return;
    }

    analyser.getByteFrequencyData(data);
    drawSide(ctxL, data, false);
    drawSide(ctxR, data, true);

    const current = audio.currentTime;
    const duration = audio.duration || 0;

    updateFlash(current);
    updateText(current, duration);

    if(current >= VIDEO_TIME){
      showVideo();
    }
  }

  loop();

  /* ================= KEY CONTROL ================= */

document.addEventListener('keydown', function(e){
  if(e.key.toLowerCase() === 'p' && !killed){

    // Mata tudo permanentemente
    killed = true;

    audio.pause();
    video.pause();

    hideVideo();
    hideAllText();

    drawSide(ctxL, [], false);
    drawSide(ctxR, [], true);
  }
});

  /* ================= AUTOPLAY ================= */

  audio.play().catch(() => {
    document.addEventListener("click", function init(){
      audio.play();
      audioCtx.resume();
      document.removeEventListener("click", init);
    });
  });

});