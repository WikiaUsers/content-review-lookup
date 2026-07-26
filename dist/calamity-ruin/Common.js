$(function () {

const TARGET_AUDIO = "BrokenSong.mp3";
const CATBOX_AUDIO = "https://files.catbox.moe/la23ux.mp3";

const SOUL_RED = "https://static.wikia.nocookie.net/calamity-ruin/images/c/c9/SoulDeltarune.png/revision/latest?cb=20260718173618&format=original";
const SOUL_BLUE = "https://static.wikia.nocookie.net/calamity-ruin/images/c/c6/SoulBroken.png/revision/latest?cb=20260718173642&format=original";

/*========================
      TIMELINE
========================*/

const SOUL_APPEAR = 3.1;
const SOUL_CHANGE = 11.0;
const FLASH_TIME = 11.3;
const SOUL_HIDE = 11.4;

/*========================
      AUDIO
========================*/

let audio = null;
let analyser = null;
let audioCtx = null;
let source = null;
let freqData = null;
let initialized = false;

/*========================
      CANVAS
========================*/

const canvas = $("<canvas>")
.css({
    position:"fixed",
    left:0,
    top:0,
    width:"100%",
    height:"100%",
    pointerEvents:"none",
    zIndex:9998
})
.appendTo("body")[0];

const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();

$(window).on("resize",resizeCanvas);

/*========================
        SOUL
========================*/

const soul = $("<img>")
.attr("src",SOUL_RED)
.css({
    position:"fixed",
    left:"50%",
    top:"50%",
    width:"180px",
    transform:"translate(-50%,-50%) scale(.8)",
    opacity:0,
    pointerEvents:"none",
    zIndex:9999,
    transition:"opacity .4s ease, transform .4s ease",
    filter:"drop-shadow(0 0 20px red)"
})
.appendTo("body");

/*========================
        FLASH
========================*/

const flash = $("<div>")
.css({
    position:"fixed",
    inset:0,
    background:"#fff",
    opacity:0,
    pointerEvents:"none",
    zIndex:10000,
    transition:"opacity .15s linear"
})
.appendTo("body");

function doFlash(){

    flash.css("opacity",1);

    setTimeout(()=>{
        flash.css("opacity",0);
    },120);

}

/*========================
    AUDIO CONTEXT
========================*/

function createAudioSystem(audioElement){

    audioCtx = new(window.AudioContext||window.webkitAudioContext)();

    analyser = audioCtx.createAnalyser();

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = .82;

    freqData = new Uint8Array(analyser.frequencyBinCount);

    source = audioCtx.createMediaElementSource(audioElement);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

}

/*========================
   VISUALIZER SETTINGS
========================*/

let visualizerColor = "#ff3030";

const LINE_WIDTH = 3;

const GLOW = 30;

/*========================
 DRAW VISUALIZER
========================*/

function drawHalf(invert){

    ctx.beginPath();

    const centerY = canvas.height / 2;

    const slice = canvas.width / 220;

    for(let i=0;i<220;i++){

        const idx = Math.floor(i * freqData.length / 220);

        const amp =
            (freqData[idx] / 255) * 170;

        const x = i * slice;

        const y = invert
            ? centerY - amp
            : centerY + amp;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

}

function drawVisualizer(){

    requestAnimationFrame(drawVisualizer);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(!audio || !analyser)
        return;

    analyser.getByteFrequencyData(freqData);

    ctx.save();

    const grad = ctx.createLinearGradient(
        0,
        canvas.height/2-170,
        0,
        canvas.height/2+170
    );

    if(visualizerColor=="#ff2020"){

        grad.addColorStop(0,"#ff9090");
        grad.addColorStop(.3,"#ff4040");
        grad.addColorStop(1,"#800000");

    }else{

        grad.addColorStop(0,"#cfffff");
        grad.addColorStop(.3,"#4ddfff");
        grad.addColorStop(1,"#0066ff");

    }

    ctx.strokeStyle = grad;
    ctx.lineWidth = 3;

    ctx.shadowColor = visualizerColor;
    ctx.shadowBlur = 45;

    drawHalf(true);
    drawHalf(false);

    ctx.restore();

}

/*========================
 DETECT AUDIO
========================*/

document.addEventListener("play",function(e){

    if(e.target.tagName!=="AUDIO")
        return;

    if(!e.target.src.includes(TARGET_AUDIO))
        return;

    audio=e.target;

    if(!initialized){

        audio.pause();

        audio.src=CATBOX_AUDIO;

        audio.crossOrigin="anonymous";

        audio.load();

        audio.play();

        createAudioSystem(audio);

        initialized=true;

    }

    if(audioCtx&&audioCtx.state==="suspended")
        audioCtx.resume();

},true);

/*========================
 FLAGS
========================*/

let soulAppeared=false;
let soulChanged=false;
let flashDone=false;
let soulHidden=false;

/*========================
 SCREEN SHAKE
========================*/

let shake = 0;

function screenShake(){

    requestAnimationFrame(screenShake);

    if(shake<=0){

        canvas.style.transform="";
        soul.css("transform",
            soulHidden
            ? "translate(-50%,-50%) scale(.7)"
            : soulAppeared
                ? "translate(-50%,-50%) scale(1)"
                : "translate(-50%,-50%) scale(.8)"
        );

        return;

    }

    shake*=0.9;

    const x=(Math.random()-0.5)*shake;
    const y=(Math.random()-0.5)*shake;

    canvas.style.transform=`translate(${x}px,${y}px)`;

    soul.css(
        "transform",
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
    );

}

screenShake();

/*
=========================================

PARTE 2 COMEÇA DAQUI

=========================================
/*========================
      TIMELINE LOOP
========================*/

function updateTimeline(){

    requestAnimationFrame(updateTimeline);

    if(!audio) return;

    const t = audio.currentTime;

    /*========================
        SOUL APPEAR
    ========================*/

    if(
        t >= SOUL_APPEAR &&
        !soulAppeared
    ){

        soulAppeared = true;

        soul.css({
            opacity:1,
            transform:"translate(-50%,-50%) scale(1)"
        });

        visualizerColor = "#ff2020";

    }

    /*========================
        SOUL GLOW
    ========================*/

    if(soulAppeared && !soulHidden){

        const pulse =
            20 +
            Math.sin(t*5)*12;

        soul.css(
            "filter",
            `drop-shadow(0 0 ${pulse}px ${visualizerColor})`
        );

    }

    /*========================
       IMAGE CHANGE
    ========================*/

    if(
        t >= SOUL_CHANGE &&
        !soulChanged
    ){

        soulChanged = true;

        soul.css("opacity",0);

        setTimeout(function(){

            soul.attr(
                "src",
                SOUL_BLUE
            );

            soul.css({
                opacity:1,
                filter:"drop-shadow(0 0 30px #00bfff)"
            });

        },170);

    }

    /*========================
         FLASH
    ========================*/

    if(
        t >= FLASH_TIME &&
        !flashDone
    ){

        flashDone = true;

        doFlash();
        shake=18;
        visualizerColor = "#00bfff";

        $("body").css({
            transition:"filter .18s ease",
            filter:"brightness(2)"
        });

        setTimeout(function(){

            $("body").css({
                filter:"brightness(1)"
            });

        },180);

    }

    /*========================
        SOUL HIDE
    ========================*/

    if(
        t >= SOUL_HIDE &&
        !soulHidden
    ){

        soulHidden = true;

        soul.css({
            opacity:0,
            transform:"translate(-50%,-50%) scale(.7)"
        });

    }

    /*========================
        RESET
    ========================*/

    if(t < 0.5){

        soulAppeared = false;
        soulChanged = false;
        flashDone = false;
        soulHidden = false;

        visualizerColor = "#ff2020";

        soul.attr(
            "src",
            SOUL_RED
        );

        soul.css({
            opacity:0,
            transform:"translate(-50%,-50%) scale(.8)",
            filter:"drop-shadow(0 0 20px red)"
        });

    }

}

updateTimeline();

/*========================
   STOP / END HANDLING
========================*/

function resetEverything(){

    soulAppeared = false;
    soulChanged = false;
    flashDone = false;
    soulHidden = false;

    visualizerColor = "#ff2020";

    soul.attr(
        "src",
        SOUL_RED
    );

    soul.css({
        opacity:0,
        transform:"translate(-50%,-50%) scale(.8)",
        filter:"drop-shadow(0 0 20px red)"
    });

}

document.addEventListener("pause",function(e){

    if(e.target!==audio)
        return;

    resetEverything();

},true);

document.addEventListener("ended",function(e){

    if(e.target!==audio)
        return;

    resetEverything();

},true);

});


mw.loader.using(['mediawiki.util']).then(() => {

    if (mw.config.get('wgPageName') !== 'Home') return;

    // 0.1%
    if (Math.random() > 0.001) return;

    const content = document.querySelector('.mw-parser-output');
    if (!content) return;

    const originalHTML = content.innerHTML;

    // Música
    const audio = new Audio(
        'https://static.wikia.nocookie.net/calamity-ruin/images/4/47/ERRORSONGNOTFOUND.mp3/revision/latest?cb=20260709000048&format=original'
    );

    document.addEventListener('click', function startMusic() {
        audio.play().catch(() => {});
    }, { once: true });

    // Cria um background cobrindo toda a tela
    const bg = document.createElement("div");
    bg.id = "gasterBackground";
    bg.style.cssText = `
        position:fixed;
        inset:0;
        z-index:-1;
        background:url("https://static.wikia.nocookie.net/calamity-ruin/images/0/03/Room.jpg/revision/latest?cb=20260709000447&format=original") center center / cover no-repeat;
    `;
    document.body.appendChild(bg);

    // Esconde o fundo original da wiki
    document.body.style.background = "#000";
    document.documentElement.style.background = "#000";

    // Página corrompida
    content.innerHTML = `
        <div style="text-align:center;margin-top:60px">

            <img src="https://static.wikia.nocookie.net/calamity-ruin/images/2/22/CRLogoAlt.png/revision/latest?cb=20260708235957&format=original"
                 style="width:460px">

            <div style="
                margin:auto;
                margin-top:40px;
                max-width:700px;
                padding:30px;
                background:rgba(0,0,0,.82);
                border:1px solid #444;
                color:white;
                font-family:'Determination Mono',monospace;
                font-size:18px;
                line-height:1.9;
                text-align:left;
            ">

📬︎📬︎📬︎☟︎♏︎●︎●︎□︎✍︎

<br><br>

✋︎♐︎ ⍓︎□︎◆︎ ♍︎♋︎■︎ ❒︎♏︎♋︎♎︎ ⧫︎♒︎♓︎⬧︎📪︎ ⧫︎♒︎♏︎■︎ ⬧︎□︎❍︎♏︎⧫︎♒︎♓︎■︎♑︎ ♒︎♋︎⬧︎ ♑︎□︎■︎♏︎ ⧫︎♏︎❒︎❒︎♓︎♌︎●︎⍓︎ ⬥︎❒︎□︎■︎♑︎📬︎

<br><br>

✋︎ ♎︎□︎■︎🕯︎⧫︎ 🙵■︎□︎⬥︎ ♒︎□︎⬥︎ ⍓︎□︎◆︎ ♐︎□︎◆︎■︎♎︎ ⧫︎♒︎♓︎⬧︎ ◻︎●︎♋︎♍︎♏︎...

<br><br>

☟︎♏︎🕯︎⬧︎ ⬥︎♋︎⧫︎♍︎♒︎♓︎■︎♑︎📬︎

<br><br>

🏱︎●︎♏︎♋︎⬧︎♏︎...

<br><br>

♎︎□︎■︎🕯︎⧫︎ ⧫︎❒︎◆︎⬧︎⧫︎ ⧫︎♒︎♏︎ ❍︎♋︎■︎ ⬥︎♒︎□︎ ⬧︎◻︎♏︎♋︎🙵⬧︎ ⧫︎♒︎❒︎□︎◆︎♑︎♒︎ ♒︎♓︎⬧︎ ♒︎♋︎■︎♎︎⬧︎📬︎

            </div>

            <div style="
                margin-top:60px;
                color:#777;
                letter-spacing:4px;
                font-size:12px;
                font-family:'Determination Mono',monospace;
            ">
                ERROR: SAVE DATA NOT FOUND
            </div>

        </div>
    `;

    setTimeout(() => {

        audio.pause();
        audio.currentTime = 0;

        content.innerHTML = originalHTML;

        bg.remove();

    }, 120000);

});

$(function(){

  /* ================= PAGE CHECK ================= */

  if (mw.config.get("wgPageName") !== "The_Knight") return;

  /* ================= CONFIG ================= */

  const AUDIO_URL  = 'https://files.catbox.moe/0p8rjg.mp3';
  const VIDEO_URL  = 'https://static.wikia.nocookie.net/calamity-ruin/images/9/9a/The_Roaring_Knight_maybe.mp4';

  const FLASH_START = 15.8;
  const FLASH_END   = 16.6;
  const VIDEO_TIME  = 16.6;

  const CHANCE = 1; // 3%

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
    .text('THIS HAS A 1% CHANCE TO APPEAR!!')
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