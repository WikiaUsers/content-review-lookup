mw.loader.using(['jquery'], function () {

$(document).ready(function(){

  const TARGET_AUDIO = 'HisWorld2.mp3';
  const INTERNAL_AUDIO = 'https://static.wikia.nocookie.net/project-outcome/images/d/da/HisWorld2.mp3/revision/latest?cb=20260502043224&format=original';
  const VIDEO_URL = 'https://static.wikia.nocookie.net/project-outcome/images/8/89/HisWorldVideo.mp4/revision/latest?cb=20260505124950&format=original';

  const FLASH_START = 181.2;
  const VIDEO_END   = 223.0;
  const LYRIC_OFFSET = 0.05; ;

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

  /* ================= UI ================= */

  const lyricBox = $('<div>').css({
    position:'fixed',
    bottom:'100px',
    width:'100%',
    textAlign:'center',
    zIndex:9999,
    pointerEvents:'none',
    opacity:0,
    transition:'opacity .15s linear'
  }).appendTo('body');

  const lyricText = $('<span>').css({
    fontSize:'32px',
    fontWeight:'bold',
    background:'linear-gradient(180deg, #4fc3ff 0%, #b3e5ff 100%)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    WebkitTextStroke:'1px black',
    whiteSpace:'nowrap'
  }).appendTo(lyricBox);

  const flash = $('<div>').css({
    position:'fixed',
    inset:0,
    background:'#fff',
    zIndex:10000,
    opacity:0,
    pointerEvents:'none',
    transition:'opacity .5s ease'
  }).appendTo('body');

  function flashOnce(){
    flash.css('opacity',1);
    setTimeout(()=>flash.css('opacity',0),500);
  }

  /* ================= VIDEO ================= */

  let video = null;

  function createVideo(){
    if(video) return;

    video = document.createElement('video');
    video.src = VIDEO_URL;
    video.muted = true;
    video.preload = "metadata";
    video.style.position = "fixed";
    video.style.inset = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.zIndex = "9996";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";

    document.body.appendChild(video);
  }

  /* ================= AUDIO ================= */

  let audio = null;
  let started = false;

  function hookAudio(){
    document.querySelectorAll('audio').forEach(a=>{
      if(audio) return;
      if(a.src && a.src.includes(TARGET_AUDIO)){
        audio = a;
        startSystem();
      }
    });
  }

  function startSystem(){
    if(started) return;
    started = true;

    audio.src = INTERNAL_AUDIO;
    audio.load();

    createVideo();
    loop();
  }

/* ================= LOOP ================= */

let lyricIndex = -1;
let videoActive = false;
let flashStart = false;
let flashEnd = false;
let lastTime = 0; // 🔥 novo

function loop(){
  requestAnimationFrame(loop);
  if(!audio) return;

  const t = audio.currentTime;

  // 🔥 detecta skip / mudança brusca
  if(Math.abs(t - lastTime) > 0.4){
    lyricIndex = -1; // força resync
  }
  lastTime = t;

  // 🔇 pausou = tudo some
  if(audio.paused || audio.ended){
    lyricBox.css('opacity',0);

    if(video){
      video.pause();
      video.style.opacity = 0;
      videoActive = false;
    }

    return;
  }

/* ================= LYRICS ================= */

if(!audio.paused && !audio.ended){

  let found = -1;

  for(let i = lyrics.length - 1; i >= 0; i--){
    if(t >= lyrics[i].t + LYRIC_OFFSET){
      found = i;
      break;
    }
  }

  if(found !== -1){
    lyricText.text(lyrics[found].l);

    // 🚫 esconde durante o vídeo
    if(!(t >= FLASH_START && t < VIDEO_END)){
      lyricBox.css('opacity',1);
    } else {
      lyricBox.css('opacity',0);
    }

  } else {
    lyricBox.css('opacity',0);
  }

}

  /* ================= VIDEO ================= */

  if(video && t >= FLASH_START && t < VIDEO_END){

    if(!videoActive){
      videoActive = true;
      video.style.opacity = 0.5;
      video.currentTime = 0;
      video.play().catch(()=>{});
    }

    const target = t - FLASH_START;

    if(Math.abs(video.currentTime - target) > 0.25){
      video.currentTime = target;
    }

  } else if(video && videoActive){
    videoActive = false;
    video.pause();
    video.style.opacity = 0;
  }

  /* ================= FLASH ================= */

  if(t >= FLASH_START && !flashStart){
    flashStart = true;
    flashOnce();
  }

  if(t >= VIDEO_END && !flashEnd){
    flashEnd = true;
    flashOnce();
  }
}

  /* ================= INIT ================= */

  hookAudio();
  setInterval(hookAudio, 1500);

}); // ready

}); // loader