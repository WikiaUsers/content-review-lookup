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
    pointerEvents:'none'
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




mw.loader.using(['jquery'], function () {

$(document).ready(function(){

const TARGET_AUDIO = 'SuperSonicHero.mp3';
const INTERNAL_AUDIO = 'https://static.wikia.nocookie.net/project-outcome/images/6/67/SuperSonicHero.mp3/revision/latest?cb=20260617201834&format=original';

const VIDEO_URL = 'https://static.wikia.nocookie.net/project-outcome/images/2/2c/SuperSonicIntro.mp4/revision/latest?cb=20260617201741&format=original';

const LYRIC_OFFSET = 0.05;

  /* ================= LYRICS ================= */
  const lyrics = [

// efeito especial
{ t:21.243, l:"You" },
{ t:21.637, l:"You can" },
{ t:22.136, l:"You can feel" },
{ t:22.886, l:"You can feel me" },

// efeito especial
{ t:23.968, l:"You" },
{ t:24.137, l:"You can" },
{ t:24.250, l:"You can see" },
{ t:24.969, l:"You can see me" },
{ t:25.180, l:"You can see me clear" },

// efeito especial
{ t:26.302, l:"I" },
{ t:26.718, l:"I don't" },
{ t:27.218, l:"I don't whis" },
{ t:27.601, l:"I don't whisper" },

// efeito especial
{ t:27.851, l:"Yes," },
{ t:28.102, l:"Yes, I" },
{ t:28.603, l:"Yes, I shout!" },

{ t:29.635, l:"SHOUT!" },

{ t:31.635, l:"And in my dust" },
{ t:34.300, l:"I leave you doubt" },

{ t:36.790, l:"And you know me" },
{ t:40.100, l:"Yes you do" },
{ t:41.851, l:"And you can hear me" },
{ t:43.035, l:"Coming light years away" },
{ t:46.634, l:"Faster than light" },

// efeito especial
{ t:49.034, l:"In a" },
{ t:49.352, l:"In a world" },
{ t:49.851, l:"In a world you" },
{ t:50.602, l:"In a world you wonder" },
{ t:52.401, l:"You can feel" },
{ t:54.390, l:"A Super Sonic power" },
{ t:56.280, l:"Over you" },
// efeito especial
{ t:57.500, l:"Yes," },
{ t:57.900, l:"Yes, I'm" },
{ t:58.200, l:"Yes, I'm real" },
// efeito especial
{ t:59.534, l:"I" },
{ t:59.785, l:"I will" },
{ t:60.035, l:"I will speed" },
{ t:60.400, l:"I will speed my" },

{ t:60.700, l:"way" },
{ t:61.418, l:"way right" },

{ t:61.768, l:"through" },
{ t:62.267, l:"through you" },

{ t:62.784, l:"here" },
{ t:63.034, l:"here I" },
{ t:63.534, l:"here I am" },

// efeito especial
{ t:64.419, l:"I'm" },
{ t:64.668, l:"I'm the" },
{ t:64.918, l:"I'm the Super" },
{ t:65.300, l:"I'm the Super Sonic" },
{ t:66.000, l:"I'm the Super Sonic power" },

// efeito especial
{ t:66.668, l:"That" },
{ t:66.918, l:"That you" },
{ t:67.300, l:"That you fear" },

// efeito especial
{ t:68.050, l:"Yes," },
{ t:68.320, l:"Yes, I" },
{ t:68.590, l:"Yes, I am" },

// efeito especial
{ t:69.669, l:"I'm" },
{ t:69.918, l:"I'm the" },
{ t:70.100, l:"I'm the Super" },
{ t:70.418, l:"I'm the Super Sonic" },
{ t:71.167, l:"I'm the Super Sonic Hero" },

// efeito especial
{ t:71.918, l:"That" },
{ t:72.320, l:"That you" },
{ t:72.551, l:"That you know" }
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
    transition:'none'
  }).appendTo('body');

  const lyricText = $('<span>').css({
    fontSize:'32px',
    fontWeight:'bold',
    background:'linear-gradient(180deg,#fff7b2 0%,#ffd700 40%,#ffae00 100%)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    WebkitTextStroke:'1px #000',
    textShadow:
        '0 0 10px rgba(255,215,0,.8),' +
        '0 0 25px rgba(255,180,0,.6)',
    whiteSpace:'nowrap',

    opacity:0,
    transform:'scale(0.9)',
    transition:'opacity .25s ease, transform .25s ease'

}).appendTo(lyricBox);

  const flash = $('<div>').css({
    position:'fixed',
    inset:0,
    background:'#fff',
    zIndex:10000,
    opacity:0,
    pointerEvents:'none',
    transition:'none'
  }).appendTo('body');


const hideRanges = [
  [23.212,23.968],
  [25.468,26.302],
  [33.135,34.300],

  [39.400,40.100], // And you know me
  [41.334,41.851], // Yes you do
  [45.786,46.634], // Coming light years away
  [48.640,49.034],  // Faster than light
  [51.850,52.401], // In a world you wonder
  [53.651,54.390], // You can feel
  [57.285,57.500], // Over you
  [58.700,59.534], // Yes, I'm real
  [67.850,68.050], // That you fear
  [71.800,71.918]  // Hero (ajuste depois se precisar)
];

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

let videoActive = false;
let lastTime = 0;
let lastLyric = '';

function loop(){

    requestAnimationFrame(loop);

    if(!audio) return;

    const t = audio.currentTime;

    if(Math.abs(t - lastTime) > 0.4){
    }

    lastTime = t;

    if(audio.paused || audio.ended){

    // some lyrics
    lyricText.css({
        opacity:0,
        transform:'translateY(15px) scale(0.95)'
    });

    lyricBox.css('opacity',0);

    // limpa texto
    lastLyric = '';
    lyricText.text('');

    // some flash
    flash.css('opacity',0);

    // some vídeo
    if(video){
        video.pause();
        video.style.opacity = 0;
        videoActive = false;
    }

    return;
}

    let shouldHide = false;

    for(const r of hideRanges){

    if(t >= r[0] && t < r[1]){

        shouldHide = true;
        break;

    }
}


if(t >= 20.400 && t <= 21.100){

    const p = (t - 20.400) / (21.100 - 20.400);

    let opacity;

    if(p < 0.5){
        opacity = p * 2;
    }else{
        opacity = (1 - p) * 2;
    }

    flash.css('opacity', opacity);

}else if(t >= 31.136 && t <= 33.900){

    const p = 1 - (
        (t - 31.136) /
        (33.900 - 31.136)
    );

    flash.css('opacity', p);

}else if(t >= 51.900 && t <= 52.200){

    const p = 1 - (
        (t - 51.900) /
        (52.200 - 51.900)
    );

    flash.css('opacity', p);

}else if(t >= 72.450 && t <= 73.800){

    const p = 1 - (
        (t - 72.450) /
        (73.800 - 72.450)
    );

    flash.css('opacity', p);

}else{

    flash.css('opacity',0);

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

        // Atualiza apenas quando trocar a lyric
        if(lastLyric !== lyrics[found].l){

            lyricText.text(lyrics[found].l);
            lastLyric = lyrics[found].l;

            // animação de entrada
            lyricText.css({
                opacity:0,
                transform:'translateY(15px) scale(0.95)'
            });

            setTimeout(()=>{

    lyricText.css({
        opacity:1,
        transform:'translateY(0px) scale(1)'
    });

},1);

        }

        if(!shouldHide){

            lyricBox.css('opacity',1);

            if(lyrics[found].l === "SHOUT!"){

                const progress =
                    Math.min(
                        Math.max(
                            (t - 29.635) /
                            (31.136 - 29.635),
                            0
                        ),
                        1
                    );

                lyricText.css({
                    fontSize:(32 + progress * 120) + "px"
                });

            }else{

                lyricText.css({
                    fontSize:'32px'
                });

            }

        }else{

            // animação de saída
            lyricText.css({
                opacity:0,
                transform:'translateY(15px) scale(0.95)'
            });

            lyricBox.css('opacity',1);

            setTimeout(()=>{
                lyricBox.css('opacity',0);
            },250);

        }

    }else{

        lyricText.css({
            opacity:0,
            transform:'translateY(15px) scale(0.95)'
        });

        lyricBox.css('opacity',1);

        setTimeout(()=>{
            lyricBox.css('opacity',0);
        },250);

    }

} // fecha if(!audio.paused && !audio.ended)

    /* ================= VIDEO ================= */

    if(video){

        if(t >= 0 && t <= 20.500){

            if(!videoActive){

                videoActive = true;

                video.style.opacity = 0.65;
                video.currentTime = 0;

                video.play().catch(()=>{});

            }

            if(
                Math.abs(
                    video.currentTime - t
                ) > 0.25
            ){
                video.currentTime = t;
            }

        }else if(videoActive){

            videoActive = false;

            video.pause();
            video.style.opacity = 0;

        }

    }

} // fecha loop()

/* ================= INIT ================= */

hookAudio();

setInterval(
    hookAudio,
    1500
);

}); // ready

}); // loader