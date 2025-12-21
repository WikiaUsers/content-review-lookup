$(function(){

  const TARGET = 'LiveAndLearn.mp3';
  const CATBOX = 'https://files.catbox.moe/o6oyhc.mp3';

  const VIDEO_URL   = 'https://files.catbox.moe/mwtvhk.mp4';
  const VIDEO_START = 26; // aparece no segundo 26

/* ========== LYRICS ========== */

const lyrics = [
  { t: 17.20, l: "Can you feel life movin' through your mind?" },
  { t: 23.08, l: "Ooh... looks like it came back for more" },
  { t: 27.40, l: "Yeah" },
  { t: 28.55, l: "Can you feel time slippin' down your spine?" },
  { t: 35.00, l: "Ooh... you try and try to ignore" },
  { t: 38.50, l: "Yeah" },
  { t: 40.70, l: "But you can hardly swallow" },
  { t: 46.20, l: "Your fears and pain" },
  { t: 51.85, l: "When you can't help but follow" },
  { t: 57.70, l: "It puts you right back where you came" },

  { t: 64.50, l: "Live and learn" },
  { t: 66.50, l: "Hanging on the edge of tomorrow" },
  { t: 69.90, l: "Live and learn" },
  { t: 71.30, l: "From the works of yesterday" },
  { t: 75.60, l: "Live and learn" },
  { t: 77.70, l: "If you beg or if you borrow" },
  { t: 81.10, l: "Live and learn" },
  { t: 82.50, l: "You may never find your way" },
  { t: 88.40, l: "Whoa yeah" }
];


  /* ========== UI ========== */

  const bg = $('<div>').css({
    position:'fixed',
    bottom:0,left:0,
    width:'100%',height:'160px',
    background:'rgba(0,0,0,.65)',
    zIndex:9997,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .3s ease'
  }).appendTo('body');

  const lyricBox = $('<div>').css({
    position:'fixed',
    bottom:'90px',
    width:'100%',
    textAlign:'center',
    zIndex:9999,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .2s ease'
  }).appendTo('body');

  const lyricText = $('<span>').css({
    fontSize:'32px',
    fontWeight:'bold',
    background:'linear-gradient(90deg, red 0%, red 50%, blue 50%, blue 100%)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    WebkitTextStroke:'1px black',
    whiteSpace:'nowrap'
  }).appendTo(lyricBox);

  /* ========== VIDEO OVERLAY ========== */

  const video = $('<video>').attr({
    src: VIDEO_URL,
    muted: true,
    playsinline: true,
    preload: 'auto'
  }).css({
    position:'fixed',
    top:0,left:0,
    width:'100%',
    height:'100%',
    objectFit:'cover',
    zIndex:9996,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .8s ease'
  }).appendTo('body')[0];

  video.volume = 0; // GARANTIA TOTAL: sem áudio

  let videoVisible = false;

  function showVideo(){
    if(videoVisible) return;
    videoVisible = true;
    video.currentTime = 0;
    video.play();
    video.style.opacity = 0.5; // 50% transparente
  }

  function hideVideo(){
    if(!videoVisible) return;
    videoVisible = false;
    video.style.opacity = 0;
    video.pause();
  }

  /* ========== CANVAS ========== */

  function mkCanvas(top,flip){
    return $('<canvas>').css({
      position:'fixed',
      left:0,width:'100%',height:'80px',
      top:top?0:'auto',
      bottom:top?'auto':0,
      transform:flip?'scaleY(-1)':'none',
      zIndex:9998,
      pointerEvents:'none'
    }).appendTo('body')[0];
  }

  const cTop = mkCanvas(true,true);
  const cBot = mkCanvas(false,false);
  const ctxT = cTop.getContext('2d');
  const ctxB = cBot.getContext('2d');

  function resize(){
    [cTop,cBot].forEach(c=>{
      c.width = innerWidth;
      c.height = 80;
    });
  }
  resize();
  $(window).on('resize',resize);

  /* ========== AUDIO CORE ========== */

  let audio = null;
  let ctx = null;
  let analyser = null;
  let data = null;
  let lyricIndex = -1;
  let initialized = false;

  function setupAudio(a){
    ctx = new (window.AudioContext||window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.85;
    data = new Uint8Array(analyser.frequencyBinCount);

    const src = ctx.createMediaElementSource(a);
    src.connect(analyser);
    analyser.connect(ctx.destination);
  }

  /* ========== VISUALIZER LOOP ========== */

  function drawBars(ctx2,arr){
    ctx2.clearRect(0,0,cBot.width,cBot.height);
    const bars = 64;
    const mid = cBot.width/2;
    const bw = mid/bars;

    for(let i=0;i<bars;i++){
      const v = arr[i]||0;
      const h = (v/255)*cBot.height*0.75;
      const g = ctx2.createLinearGradient(0,cBot.height-h,0,cBot.height);
      g.addColorStop(0,'red');
      g.addColorStop(1,'blue');
      ctx2.fillStyle = g;
      ctx2.fillRect(mid+i*bw,cBot.height-h,bw-1,h);
      ctx2.fillRect(mid-(i+1)*bw,cBot.height-h,bw-1,h);
    }
  }

  function loop(){
    requestAnimationFrame(loop);

    if(!audio || !analyser){
      drawBars(ctxT,[]);
      drawBars(ctxB,[]);
      return;
    }

    if(audio.paused || audio.ended){
      drawBars(ctxT,[]);
      drawBars(ctxB,[]);
      lyricBox.css('opacity',0);
      bg.css('opacity',0);
      hideVideo();
      return;
    }

    analyser.getByteFrequencyData(data);
    drawBars(ctxT,data);
    drawBars(ctxB,data);
    bg.css('opacity',1);

    if(audio.currentTime >= VIDEO_START){
      showVideo();
    } else {
      hideVideo();
    }
  }

  loop();

  /* ========== AUDIO DETECTION ========== */

  document.addEventListener('play',e=>{
    if(e.target.tagName!=='AUDIO')return;
    if(!e.target.src.includes(TARGET))return;

    audio = e.target;

    if(!initialized){
      audio.pause();
      audio.src = CATBOX;
      audio.crossOrigin='anonymous';
      audio.load();
      audio.play();
      setupAudio(audio);
      initialized = true;
    }

    if(ctx && ctx.state==='suspended') ctx.resume();
  },true);

  /* ========== LYRIC TRACKING ========== */

  setInterval(()=>{
    if(!audio || audio.paused || audio.ended){
      lyricBox.css('opacity',0);
      lyricIndex = -1;
      return;
    }

    const t = audio.currentTime;

    for(let i=lyrics.length-1;i>=0;i--){
      if(t >= lyrics[i].t){
        if(i!==lyricIndex){
          lyricIndex = i;
          lyricText.text(lyrics[i].l);
          lyricBox.css('opacity',1);
        }
        break;
      }
    }
  },100);

});







$(function(){

  /* ================= CONFIG ================= */

  const TARGET_MP3 = 'EVIL.GREEN_CHASE_THEME.mp3';
  const AUDIO_URL  = 'https://files.catbox.moe/wz2lpb.mp3';
  const VIDEO_URL  = 'https://files.catbox.moe/wdtn6r.mp4';

  /* ================= VIDEO ================= */

  const video = $('<video>').attr({
    src: VIDEO_URL,
    muted: true,
    playsinline: true,
    preload: 'auto',
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
    opacity: 0,
    transition: 'opacity .6s ease'
  }).appendTo('body')[0];

  video.volume = 0; // garantia absoluta

  function showVideo(){
    video.play().catch(()=>{});
    video.style.opacity = 0.5;
  }

  function hideVideo(){
    video.style.opacity = 0;
    video.pause();
  }

  /* ================= CANVAS ================= */

  function makeCanvas(side){
    return $('<canvas>').css({
      position:'fixed',
      top:0,
      bottom:0,
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

  /* ================= AUDIO CORE ================= */

  let audio = null;
  let audioCtx = null;
  let analyser = null;
  let data = null;
  let initialized = false;

  function setupAudio(a){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.85;

    data = new Uint8Array(analyser.frequencyBinCount);

    const src = audioCtx.createMediaElementSource(a);
    src.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

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
      grad.addColorStop(0,'#00ff66');
      grad.addColorStop(1,'#006633');

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
    requestAnimationFrame(loop);

    if(!audio || !analyser){
      drawSide(ctxL, [], false);
      drawSide(ctxR, [], true);
      hideVideo();
      return;
    }

    if(audio.paused || audio.ended){
      drawSide(ctxL, [], false);
      drawSide(ctxR, [], true);
      hideVideo();
      return;
    }

    analyser.getByteFrequencyData(data);
    drawSide(ctxL, data, false);
    drawSide(ctxR, data, true);
    showVideo();
  }

  loop();

  /* ================= AUDIO DETECTION ================= */

  document.addEventListener('play', e=>{
    if(e.target.tagName !== 'AUDIO') return;
    if(!e.target.src.includes(TARGET_MP3)) return;

    audio = e.target;

    if(!initialized){
      audio.pause();
      audio.src = AUDIO_URL;
      audio.crossOrigin = 'anonymous';
      audio.load();
      audio.play();

      setupAudio(audio);
      initialized = true;
    }

    if(audioCtx && audioCtx.state === 'suspended'){
      audioCtx.resume();
    }
  }, true);

});








$(function(){

  const TARGET_AUDIO = 'HisWorld2.mp3';
  const CATBOX_AUDIO = 'https://files.catbox.moe/wpy16n.mp3';
  const VIDEO_URL    = 'https://files.catbox.moe/jpvvm4.mp4';

  const FLASH_START = 181.2; // 03:01.2
  const VIDEO_END   = 223.0; // 03:43

  const LYRIC_OFFSET = -0.18;
  
  /* ================= LYRICS ================= */

  const lyrics = [
  { t:21.7, l:"Come on and light the fuse," },
  { t:22.6, l:"he's a rocket, and he's ready to go" },
  { t:24.5, l:"'Cause now the countdown has started, and he's ready to blow" },
  { t:27.2, l:"He's got the dope sounds pumpin' in a stereo (-eo!)" },
  { t:29.9, l:"Kickin' a** fast, puttin' on a show" },
  { t:32.6, l:"Go on and get yourself together, there's no time to rest" },
  { t:35.3, l:"And if you put the time in, he'll put you to the test" },
  { t:38.0, l:"He's like the runnin' man, in his world, more is less" },
  { t:40.7, l:"And if you wanna test him, best bring your best" },
  { t:43.6, l:"Don't make me spell it out, bring your best!" },

  { t:47.2, l:"In this world (his world!)" },
  { t:50.3, l:"Where life is strong" },
  { t:52.6, l:"In this world (his world!)" },
  { t:55.8, l:"Life's an open book" },
  { t:58.0, l:"In this world (his world!)" },
  { t:60.9, l:"Where compromise does not exist" },
  { t:63.5, l:"In his world of worlds, every step meets the risk!" },

  { t:68.9, l:"In this world (his world!)" },
  { t:71.9, l:"Where one is all" },
  { t:74.2, l:"In this world (his world!)" },
  { t:77.5, l:"Never fear the fall" },
  { t:79.6, l:"In this world (his world!)" },
  { t:82.5, l:"Where compromise does not exist" },
  { t:85.1, l:"In his world of worlds, every step meets the risk!" },

  { t:91.1, l:"Runnin' it back again, well, what d'you expect?" },
  { t:93.2, l:"Comin' out to win ten out of ten, got a real rough neck" },
  { t:96.1, l:"Spikes up his liberty and straps on his shoes" },
  { t:98.6, l:"Cuz he's the best there ever was, haven't you heard the news?" },
  { t:101.4, l:"Intergalactic continental champ, running things" },
  { t:104.2, l:"Hyperactive instrumental with pulling strings" },
  { t:106.7, l:"See he's the one who understands when the tides will swing" },
  { t:109.4, l:"So he's breaking down doors, never following" },

  { t:112.1, l:"Come on and psyche yourself up, 'cause it's time to play" },
  { t:114.8, l:"Bounce to the beats and the rhymes, 'cause they're here to stay" },
  { t:117.5, l:"The one and only marathon man, livin' the day" },
  { t:120.4, l:"Rollin' up, comin' fast, and he'll blow you away" },
  { t:122.9, l:"Because the pressures of this world, they can take their toll" },
  { t:125.6, l:"And it's tough to get away when they take a hold" },
  { t:128.3, l:"The only way to break free is to break the mold" },
  { t:131.3, l:"He can't stop now, lock and load" },
  { t:134.2, l:"Don't stop now, c'mon, rock n' roll!" },

  { t:137.6, l:"In this world (his world!)" },
  { t:139.6, l:"(Gotta make your own way!)" },
  { t:140.6, l:"Where life is strong" },
  { t:143.0, l:"In this world (his world!)" },
  { t:145.0, l:"(Life is just a game you play!)" },
  { t:146.3, l:"Life's an open book" },
  { t:148.3, l:"In this world (his world!)" },
  { t:150.3, l:"(Notice that we're here to stay!)" },
  { t:151.2, l:"Where compromise does not exist" },
  { t:153.8, l:"In his world of worlds" },
  { t:156.2, l:"Every step meets the risk!" },

  { t:159.3, l:"In this world (his world!)" },
  { t:161.2, l:"(Gotta make your own way!)" },
  { t:162.2, l:"Where one is all" },
  { t:164.5, l:"In this world (his world!)" },
  { t:166.5, l:"(Life is just a game you play!)" },
  { t:167.8, l:"Never fear the fall" },
  { t:169.9, l:"In this world (his world!)" },
  { t:171.9, l:"(Notice that we're here to stay!)" },
  { t:172.8, l:"Where compromise does not exist" },
  { t:175.4, l:"In his world of worlds" },
  { t:177.9, l:"Every step meets the risk!" },

  { t:224.2, l:"Light the fuse on his rocket and he's ready to go" },
  { t:226.7, l:"Cuz now the countdown has started and he's ready to blow" },
  { t:229.3, l:"(In his world! Where one is all!)" },
  { t:235.0, l:"Intergalactic continental champ, running things" },
  { t:237.7, l:"Hyperactive instrumental with pulling strings" },
  { t:240.1, l:"(In his world! Never fear the fall!)" },
  { t:251.0, l:"The only way to break free is to break the mold" },
  { t:254.0, l:"He can't stop now, rock and roll" },
  { t:256.4, l:"(His world!) I said he can't stop now, lock and load" },
  { t:259.6, l:"(His world!) Don't stop now, c'mon and rock and roll!" }
];

/* ================= LYRIC UI ================= */

  const lyricBox = $('<div>').css({
    position:'fixed',
    bottom:'100px',
    width:'100%',
    textAlign:'center',
    zIndex:9999,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .2s ease'
  }).appendTo('body');

  const lyricText = $('<span>').css({
    fontSize:'32px',
    fontWeight:'bold',
    background:'linear-gradient(90deg, #4fc3ff 0%, #b3e5ff 100%)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    WebkitTextStroke:'1px black',
    whiteSpace:'nowrap'
  }).appendTo(lyricBox);

  let lyricIndex = -1;
  let lyricsEnabled = true;

  /* ================= FLASH ================= */

  const flash = $('<div>').css({
    position:'fixed',
    inset:0,
    background:'#fff',
    zIndex:10000,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .6s ease'
  }).appendTo('body');

  function flashOnce(){
    flash.css('opacity',1);
    setTimeout(()=>flash.css('opacity',0),600);
  }

  /* ================= VIDEO ================= */

  const video = $('<video>').attr({
    src: VIDEO_URL,
    muted:true,
    playsinline:true,
    preload:'auto'
  }).css({
    position:'fixed',
    inset:0,
    width:'100%',
    height:'100%',
    objectFit:'cover',
    zIndex:9996,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .8s ease'
  }).appendTo('body')[0];

  // 🔒 HARD MUTE
  video.muted = true;
  video.volume = 0;
  video.addEventListener('volumechange',()=>{
    video.muted = true;
    video.volume = 0;
  });

  let videoActive = false;
  let flashStart = false;
  let flashEnd = false;

  /* ================= CANVAS ================= */

  function mkCanvas(top,flip){
    return $('<canvas>').css({
      position:'fixed',
      left:0,
      width:'100%',
      height:'90px',
      top:top?'0':'auto',
      bottom:top?'auto':'0',
      transform:flip?'scaleY(-1)':'none',
      zIndex:9998,
      pointerEvents:'none'
    }).appendTo('body')[0];
  }

  const cTop = mkCanvas(true,true);
  const cBot = mkCanvas(false,false);
  const ctxT = cTop.getContext('2d');
  const ctxB = cBot.getContext('2d');

  function resize(){
    [cTop,cBot].forEach(c=>{
      c.width = innerWidth;
      c.height = 90;
    });
  }
  resize();
  $(window).on('resize',resize);

  /* ================= AUDIO ================= */

  let audio = null;
  let audioCtx = null;
  let analyser = null;
  let data = null;
  let init = false;

  function setupAudio(a){
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.8;
    data = new Uint8Array(analyser.frequencyBinCount);

    const src = audioCtx.createMediaElementSource(a);
    src.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function draw(ctx,arr){
    ctx.clearRect(0,0,cBot.width,cBot.height);
    const bars = 70;
    const mid = cBot.width/2;
    const bw = mid/bars;

    for(let i=0;i<bars;i++){
      const v = arr[i]||0;
      const h = (v/255)*cBot.height*0.8;

      const g = ctx.createLinearGradient(0,cBot.height-h,0,cBot.height);
      g.addColorStop(0,'#b3e5ff');
      g.addColorStop(1,'#0066ff');

      ctx.fillStyle = g;
      ctx.fillRect(mid+i*bw,cBot.height-h,bw-1,h);
      ctx.fillRect(mid-(i+1)*bw,cBot.height-h,bw-1,h);
    }
  }

  /* ================= MAIN LOOP ================= */

  function loop(){
    requestAnimationFrame(loop);

    if(!audio || !analyser){
      draw(ctxT,[]);
      draw(ctxB,[]);
      lyricBox.css('opacity',0);
      return;
    }

    // ⏸ pausa / ⏹ fim → lyrics somem
    if(audio.paused || audio.ended){
      lyricBox.css('opacity',0);
    }

    analyser.getByteFrequencyData(data);
    draw(ctxT,data);
    draw(ctxB,data);

    const t = audio.currentTime;

    // 🎤 lyrics (somente se não pausado)
    if(lyricsEnabled && !audio.paused && !audio.ended){
      for(let i=lyrics.length-1;i>=0;i--){
        if(t >= lyrics[i].t + LYRIC_OFFSET){
          if(i !== lyricIndex){
            lyricIndex = i;
            lyricText.text(lyrics[i].l);
            lyricBox.css('opacity',1);
          }
          break;
        }
      }
    }

    const shouldShowVideo =
      !audio.paused &&
      t >= FLASH_START &&
      t < VIDEO_END;

    if(shouldShowVideo){
      if(!videoActive){
        videoActive = true;
        lyricsEnabled = false;
        lyricBox.css('opacity',0);
        video.style.opacity = 0.5;
        video.play();
      }

      const vTime = t - FLASH_START;
      if(Math.abs(video.currentTime - vTime) > 0.15){
        video.currentTime = vTime;
      }

    } else {
      if(videoActive){
        videoActive = false;
        video.pause();
        video.style.opacity = 0;
        lyricsEnabled = true;
      }
    }

    if(t >= FLASH_START && !flashStart){
      flashStart = true;
      flashOnce();
    }

    if(t >= VIDEO_END && !flashEnd){
      flashEnd = true;
      flashOnce();
    }
  }
  loop();

  /* ================= AUDIO DETECT ================= */

  document.addEventListener('play',e=>{
    if(e.target.tagName!=='AUDIO') return;
    if(!e.target.src.includes(TARGET_AUDIO)) return;

    audio = e.target;

    if(!init){
      audio.pause();
      audio.src = CATBOX_AUDIO;
      audio.crossOrigin = 'anonymous';
      audio.load();
      audio.play();
      setupAudio(audio);
      init = true;
    }

    if(audioCtx.state === 'suspended'){
      audioCtx.resume();
    }
  },true);

});

(function () {
  // ===== CONFIG =====
  const CHANCE = 0.0001; // 1%
  const DURATION = 20000; // 20 segundos

  const IMAGE_URL =
    "https://static.wikia.nocookie.net/the-official-reign-over-all/images/a/ad/THEENDISNEAR.png/revision/latest?cb=20251220005251&format=original";
  const AUDIO_URL =
    "https://static.wikia.nocookie.net/the-official-reign-over-all/images/a/a7/Hehearsyou.mp3/revision/latest";
  // ==================

  if (Math.random() > CHANCE) return;

  mw.loader.using("jquery", function () {
    // ===== ANIMAÇÃO DO TEXTO =====
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes exeShake {
        0%   { transform: translate(0, 0); }
        20%  { transform: translate(-1px, 1px); }
        40%  { transform: translate(1px, -1px); }
        60%  { transform: translate(-1px, -1px); }
        80%  { transform: translate(1px, 1px); }
        100% { transform: translate(0, 0); }
      }
    `;
    document.head.appendChild(style);

    // ===== OVERLAY =====
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,1)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.pointerEvents = "none";
    overlay.style.textAlign = "center";

    // ===== IMAGEM =====
    const img = document.createElement("img");
    img.src = IMAGE_URL;
    img.style.maxWidth = "55vw";
    img.style.maxHeight = "55vh";
    img.style.width = "auto";
    img.style.height = "auto";
    img.style.objectFit = "contain";
    img.style.marginBottom = "24px";

    // ===== TEXTO EXE =====
    const text = document.createElement("div");
    text.innerHTML =
      "He sees you, he hears you,<br>the end is near,<br>he is going to reign over all";

    text.style.color = "#ff0000";
    text.style.fontSize = "26px";
    text.style.fontFamily = "serif";
    text.style.letterSpacing = "3px";
    text.style.textShadow =
      "0 0 5px #ff0000, 0 0 10px #8b0000, 0 0 20px #000";
    text.style.animation = "exeShake 0.08s infinite";
    text.style.opacity = "0.95";

    overlay.appendChild(img);
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // ===== TEXTO DE AVISO (FORA DO OVERLAY) =====
    const notice = document.createElement("div");
    notice.innerHTML =
      "Don’t worry, this is just a rare screen that can appear sometimes.<br>" +
      "Fun fact: it has a 0.01% chance to appear.<br>" +
      "This screen will disappear in 20 seconds.";

    notice.style.position = "fixed";
    notice.style.top = "15px";
    notice.style.left = "0";
    notice.style.width = "100%";
    notice.style.textAlign = "center";
    notice.style.color = "#ffffff";
    notice.style.fontSize = "14px";
    notice.style.fontFamily = "sans-serif";
    notice.style.opacity = "0.9";
    notice.style.textShadow = "0 0 6px #000";
    notice.style.zIndex = "1000001";
    notice.style.pointerEvents = "none";

    document.body.appendChild(notice);

    // ===== ÁUDIO =====
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.7;
    audio.muted = true;

    audio.play().catch(() => {});

    const unlockAudio = () => {
      audio.muted = false;
      document.removeEventListener("mousedown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("mousedown", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    // ===== REMOVER TUDO JUNTO =====
    setTimeout(() => {
      audio.pause();
      audio.src = "";
      overlay.remove();
      notice.remove();
    }, DURATION);
  });
})();