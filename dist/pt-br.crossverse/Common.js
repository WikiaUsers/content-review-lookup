
/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
// Aplica glitch na primeira palavra de cada div com .fandom-glitchbox
$(document).ready(function() {
  $('.fandom-glitchbox').each(function() {
    var $box = $(this);
    var text = $box.attr('data-text'); // primeira palavra que vai ter glitch
    if (!text) return;

    // Cria os elementos internos
    var $shadow1 = $('<span class="glitch-shadow1"></span>').text(text);
    var $shadow2 = $('<span class="glitch-shadow2"></span>').text(text);
    var $main = $('<span class="glitch-main"></span>').text(text);

    // Wrapper da primeira palavra
    var $wrapper = $('<span class="glitch-word"></span>').append($shadow1, $shadow2, $main);

    // Substitui a primeira palavra no HTML original
    var html = $box.html();
    var rest = html.replace(text, '').trim();
    $box.empty().append($wrapper).append(' ' + rest);
  });
});

/* ===== ALL FICTION ===== */
(function retry(){var trigger=document.getElementById("all-fiction-trigger");var line=document.getElementById("all-fiction-line");if(!trigger||!line){setTimeout(retry,200);return;}if(trigger.dataset.afInit)return;trigger.dataset.afInit="1";var AUDIO_URL="https://static.wikia.nocookie.net/animeverso/images/5/50/All..._Fiction..._-_Armando_%28youtube%29.mp3/revision/latest?cb=20260316004755&format=original&path-prefix=pt-br";var erased=false;function activate(){if(erased)return;erased=true;try{new Audio(AUDIO_URL).play();}catch(e){}trigger.classList.add("af-hovered");line.classList.add("af-expanded");setTimeout(function(){document.body.classList.add("af-active");},500);}trigger.addEventListener("click",activate);trigger.addEventListener("touchend",activate);trigger.addEventListener("mouseenter",function(){trigger.classList.add("af-hovered");line.classList.add("af-expanded");});trigger.addEventListener("mouseleave",function(){if(erased)return;trigger.classList.remove("af-hovered");line.classList.remove("af-expanded");});})();
/* ===== FIM ALL FICTION ===== */

function getpar(object)
{
var par = $(object)[0].parentNode;
var el = par;
while (el.parentNode) {
if (el.classList.contains("tab") || el.classList.contains("mw-parser-output")) {
return el;
}
el = el.parentNode;
}
return null;
}
mw.loader.using('mediawiki.util').then(function() {
var IndexClick = 0;
function zselector( $content ) {
$(function () {
$('[class|="hh"]').mouseenter(function () {
var cn = $(this).attr('class');
if (typeof cn !== 'undefined') {
ZContent(cn, '1', $(this));
}
});
$('[class|="hh"]').mouseleave(function () {
var cn = $(this).attr('class');
if (typeof cn !== 'undefined') {
ZContent(cn, '2', $(this));
}
});
$('[class|="zz"]').each(function (i, elem) {
if ($(this).css('display') == 'none') {
$(this).css('opacity', 0);
}
});
});
function ZContent(classValue, effect, object) {
if (classValue.split) {
var ID = '';
var par = getpar(object);
var elemClasses = classValue.split(' ');
for (var i = elemClasses.length-1; i >= 0; i--) {
var elemClass = elemClasses[i];
if (elemClass.substring(0, 3) == 'hh-') {
ID = elemClass.substring(3);
if (effect == '1') {
ZEffect(ID,par);
} else if (effect == '2') {
ZEffect('',par);
}
}
}
}
}
function ZEffect(ID,par) {
$('[class|="zz"]').each(function (i, elem) {
var par1= getpar(this);
if(par1 == par)
{
if ($(this).hasClass('zz-' + ID)) {
$(this).css('display', 'block');
$(window).trigger('scroll');
$(this).stop();
$(this).animate({
opacity: 1,
queue: false
}, 10);
} else {
$(this).css('display', 'none');
$(this).stop();
$(this).animate({
opacity: 0,
queue: false
}, 0);
}
}
});
}
}
mw.hook( 'wikipage.content' ).add( zselector );
zselector( mw.util.$content );
});
$(document).ready(function() {
  // Executa só na página Dying Light
  if (mw.config.get('wgPageName') === 'Dying_Light') {
    $('.ayoText').on('click', function() {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      fetch('https://files.catbox.moe/x2bztl.mp3')
        .then(r => r.arrayBuffer())
        .then(b => ctx.decodeAudioData(b))
        .then(buf => {
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.connect(ctx.destination);
          src.start(0);
        })
        .catch(e => console.error('Erro ao reproduzir áudio:', e));
    });
  }
});

// Configuração do AddRailModule para Discord
window.AddRailModule = ['Template:RailModule'];

// Conversor de texto invertido e de cabeça para baixo
function upsideDownText(text) {
    const map = {
        a:'ɐ', b:'q', c:'ɔ', d:'p', e:'ǝ', f:'ɟ', g:'ƃ', h:'ɥ',
        i:'ᴉ', j:'ɾ', k:'ʞ', l:'l', m:'ɯ', n:'u', o:'o', p:'d',
        q:'b', r:'ɹ', s:'s', t:'ʇ', u:'n', v:'ʌ', w:'ʍ', x:'x',
        y:'ʎ', z:'z',
        A:'∀', B:'𐐒', C:'Ɔ', D:'◖', E:'Ǝ', F:'Ⅎ', G:'פ', H:'H',
        I:'I', J:'ſ', K:'⋊', L:'˥', M:'W', N:'N', O:'O', P:'Ԁ',
        Q:'Ό', R:'ᴚ', S:'S', T:'┴', U:'∩', V:'Λ', W:'M', X:'X',
        Y:'⅄', Z:'Z',
        '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9',
        '7':'ㄥ','8':'8','9':'6',
        '.':'˙',',':"'",'?':'¿','!':'¡',
        "'":',','"':',,','(' : ')',')':'(',
        '[':']',']':'[','{':'}','}':'{'
    };

    return text
        .split('')
        .reverse()
        .map(char => map[char] || char)
        .join('');
}

// Aplica automaticamente em elementos com a classe
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".upside-auto").forEach(el => {
        el.innerText = upsideDownText(el.innerText);
    });
});
/* Fim do Texto Invertido */

/* ============================================================
 * BAHLAVAN - Slideshow dos Mandamentos (opcional, melhora os controles)
 * Instalar em: MediaWiki:Common.js  (requer direitos de admin na wiki)
 * Escopo: age APENAS em .bahlavan-box .bahlavan-content .bv-slideshow
 * - autoplay desativado (o leitor controla)
 * - botoes prev/next e pontos reais e sincronizados
 * - ponto ativo atualiza tambem ao arrastar/rolar (IntersectionObserver)
 * - navegacao por teclado (setas) quando o slideshow esta focado
 * - respeita prefers-reduced-motion
 * Sem autoplay, sem variaveis globais, sem conflito com outras areas.
 * SE A WIKI NAO PERMITIR JS: o slideshow continua funcional por
 * rolagem nativa com scroll-snap (arrastar / trackpad / shift+roda).
 * ============================================================ */
( function () {
  'use strict';
  function init() {
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var shows = document.querySelectorAll(
      '.bahlavan-box .bahlavan-content .bv-slideshow');
    Array.prototype.forEach.call(shows, function (show) {
      var track = show.querySelector('.bv-track');
      if (!track) return;
      var slides = track.querySelectorAll('.bv-slide');
      var dots = show.querySelectorAll('.bv-dot');
      var prev = show.querySelector('.bv-prev');
      var next = show.querySelector('.bv-next');
      if (!slides.length) return;

      function go(i) {
        if (i < 0) i = 0;
        if (i > slides.length - 1) i = slides.length - 1;
        var left = slides[i].offsetLeft - track.offsetLeft;
        try {
          track.scrollTo({ left: left, behavior: reduce ? 'auto' : 'smooth' });
        } catch (e) { track.scrollLeft = left; }
      }
      function current() {
        var min = Infinity, idx = 0;
        Array.prototype.forEach.call(slides, function (s, k) {
          var d = Math.abs(s.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (d < min) { min = d; idx = k; }
        });
        return idx;
      }
      function paint(idx) {
        Array.prototype.forEach.call(dots, function (d, k) {
          d.classList.toggle('is-active', k === idx);
          d.setAttribute('aria-selected', k === idx ? 'true' : 'false');
        });
      }

      if (prev) prev.addEventListener('click', function () { go(current() - 1); });
      if (next) next.addEventListener('click', function () { go(current() + 1); });
      Array.prototype.forEach.call(dots, function (d, k) {
        d.addEventListener('click', function () { go(k); });
        d.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(k); }
        });
      });
      show.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      });

      var raf;
      track.addEventListener('scroll', function () {
        if (raf) window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(function () { paint(current()); });
      });
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              paint(Array.prototype.indexOf.call(slides, en.target));
            }
          });
        }, { root: track, threshold: 0.6 });
        Array.prototype.forEach.call(slides, function (s) { io.observe(s); });
      }
      paint(0);
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
} )();
/* Fim SlideShow Bahlavan */

/* Entrada Light Death Note */
/*
- DEATH NOTE — PROTÓTIPO CINEMATOGRÁFICO MASTER · REVISÃO 3 (MIX)
- Alvo EXCLUSIVO: Blog_de_usuário:MAUBRUTO/Comandos_legais
-
- O que foi feito:
- O 3D EXATO da Versão 2 (estrutura física de bloco, animações de capa, glow) 
- foi restaurado e injetado na base de dados e escrita vetorial definitiva. 
- O restante permanece estritamente intocado.
*/
(function () {
  'use strict';

  if (typeof mw === 'undefined' || !mw.config) return;

  function normalizedPageName(value) {
    var out = String(value || '').replace(/ /g, '_');
    try { if (out.normalize) out = out.normalize('NFC'); } catch (e) {}
    return out;
  }

  var TARGET_PAGE = 'Blog_de_usuário:MAUBRUTO/Comandos_legais';
  var pageName = normalizedPageName(mw.config.get('wgPageName'));
  var action = String(mw.config.get('wgAction') || 'view').toLowerCase();

  // Trava de Segurança Máxima
  if (pageName !== TARGET_PAGE) return;
  if (action !== 'view') return;
  if (window.top !== window.self) return;
  if ((window.location.search || '').length > 1) return; 
  
  if (window.__DN_MASTER_PROTOTYPE__) return;
  window.__DN_MASTER_PROTOTYPE__ = true;

  var CONFIG = {
    audioUrl: 'https://static.wikia.nocookie.net/animeverso/images/5/5e/Death-note-kira-s-laugh-original-4k_zZpDN5lI.mp3/revision/latest?cb=20261014134745&path-prefix=pt-br',
    eyeOpenMs: 1250,
    eyeCloseMs: 1050,
    bookEnterMs: 1350,
    bookOpenMs: 2200,
    countdownStepMs: 72,
    audioVolume: 0.82,
    reducedMotion: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  };
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var timers = [];
  var rafIds = [];
  var alive = true;
  var phase = 'initializing';
  var root = null;
  var bookRef = null;
  var audio = null;
  var previousOverflow = '';
  var createdStyle = null;
  var audioButton = null;
  var entered = false;
  var profileRevealed = false;
  var eyeTweenToken = 0;

  var CSS = `
@font-face{font-family:"Death Note";font-style:normal;font-weight:400;font-display:swap;src:local("Death Note"),url("https://db.onlinewebfonts.com/t/64bbc93a264bc54a4bc758b555e00074.woff2") format("woff2");}
#dn-master-root{position:fixed;inset:0;z-index:2147483000;overflow:hidden;isolation:isolate;background:#020102;color:#f4e9e9;opacity:0;pointer-events:auto;transition:opacity .85s ease;font-family:Georgia,"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;user-select:none;-webkit-user-select:none;touch-action:manipulation;}
#dn-master-root.is-visible{opacity:1}
#dn-master-root.is-fading{opacity:0;pointer-events:none;transition:opacity 1.55s cubic-bezier(.4,0,.2,1)}
#dn-master-root *{box-sizing:border-box}
#dn-master-root .dn-bg{position:absolute;inset:-5%;background:radial-gradient(ellipse at 50% 48%,#260505 0%,#100203 38%,#050304 70%,#000 100%);transform:scale(1.03);}
#dn-master-root .dn-grain{position:absolute;inset:0;opacity:.09;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.34'/%3E%3C/svg%3E");mix-blend-mode:screen;}
#dn-master-root .dn-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.45) 72%,#000 120%);pointer-events:none;}
#dn-master-root .dn-red-haze{position:absolute;inset:0;background:radial-gradient(ellipse 44% 35% at 50% 49%,rgba(220,0,22,.24),rgba(105,0,11,.11) 55%,transparent 80%);mix-blend-mode:screen;animation:dn-haze-breathe 4.2s ease-in-out infinite alternate;pointer-events:none;}
#dn-master-root .dn-ring{position:absolute;left:50%;top:49%;transform:translate(-50%,-50%);border:1px solid rgba(255,32,45,.22);border-radius:50%;box-shadow:0 0 30px rgba(195,0,18,.10),inset 0 0 35px rgba(195,0,18,.08);pointer-events:none;}
#dn-master-root .dn-ring.r1{width:min(94vw,1000px);height:min(84vh,750px)}
#dn-master-root .dn-ring.r2{width:min(80vw,830px);height:min(72vh,630px);border-color:rgba(255,40,50,.14)}
#dn-master-root .dn-ring.r3{width:min(66vw,680px);height:min(58vh,510px);border-color:rgba(255,40,50,.09)}
#dn-master-root .dn-eye-title{position:absolute;left:4%;right:4%;top:8.5vh;text-align:center;font-size:clamp(30px,6.6vw,78px);font-weight:700;letter-spacing:.18em;color:#fff;text-shadow:0 0 4px #fff,0 0 14px #ff2939,0 0 30px #b60011,0 0 65px #62000a;transition:opacity .55s ease,transform .55s ease;}
#dn-master-root .dn-eye-title span{display:inline-block;opacity:0;animation:dn-inscription-in .62s cubic-bezier(.2,.75,.2,1) forwards;animation-delay:var(--d,0ms)}
#dn-master-root .dn-eye-title.is-out{opacity:0;transform:translateY(-15px);}
#dn-master-root .dn-eyes{position:absolute;left:50%;top:49%;width:min(87vw,930px);transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;gap:clamp(8px,2.5vw,38px);opacity:0;transition:opacity .7s ease;}
#dn-master-root .dn-eyes.is-visible{opacity:1}
#dn-master-root .dn-eyes.is-out{opacity:0;transition:opacity .48s ease}
#dn-master-root .dn-eye{width:calc((100% - clamp(8px,2.5vw,38px))/2);max-width:420px;filter:drop-shadow(0 0 12px rgba(255,0,24,.58)) drop-shadow(0 0 30px rgba(170,0,18,.36));}
#dn-master-root .dn-eye svg{display:block;width:100%;height:auto;overflow:visible;}
#dn-master-root .dn-inscriptions{position:absolute;inset:0;transition:opacity .45s ease;}
#dn-master-root .dn-inscriptions.is-out{opacity:0}
#dn-master-root .dn-data{position:absolute;max-width:37vw;font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;color:#ffe2e2;font-size:clamp(12px,1.55vw,20px);line-height:1.8;letter-spacing:.12em;text-shadow:0 0 5px rgba(255,0,25,.9),0 0 14px rgba(255,0,18,.5);opacity:0;animation:dn-data-appear .7s ease forwards;animation-delay:var(--wait,0ms);white-space:normal;overflow-wrap:anywhere;}
#dn-master-root .dn-data .lab{display:block;font-size:.74em;letter-spacing:.2em;color:rgba(255,150,160,.82);}
#dn-master-root .dn-data .val{display:block;color:#fff;}
#dn-master-root .dn-data:after{content:"";position:absolute;left:0;bottom:-3px;width:36%;height:1px;background:linear-gradient(90deg,rgba(255,25,45,.9),transparent);}
#dn-master-root .dn-data.d1{left:7%;top:28%;transform:rotate(-7deg);--rot:-7deg}
#dn-master-root .dn-data.d2{right:7%;top:29%;text-align:right;transform:rotate(6deg);--rot:6deg}
#dn-master-root .dn-data.d3{left:12%;bottom:18%;transform:rotate(5deg);--rot:5deg}
#dn-master-root .dn-data.d4{right:10%;bottom:18%;text-align:right;transform:rotate(-6deg);--rot:-6deg}
#dn-master-root .dn-data.d2:after,#dn-master-root .dn-data.d4:after{left:auto;right:0;background:linear-gradient(270deg,rgba(255,25,45,.9),transparent)}
#dn-master-root .dn-char{display:inline-block;opacity:0;animation:dn-char-burn .58s linear var(--d,0ms) forwards;}
#dn-master-root .dn-prompt{position:absolute;left:0;right:0;bottom:5.5vh;text-align:center;color:rgba(255,220,220,.64);font:10px/1.4 Arial,sans-serif;letter-spacing:.36em;text-transform:uppercase;opacity:0;animation:dn-prompt-in .8s ease 1.8s forwards;text-shadow:0 0 8px rgba(255,0,22,.6);}
#dn-master-root .dn-prompt:after{content:"";display:block;width:42px;height:1px;background:rgba(255,65,75,.6);margin:10px auto 0;animation:dn-prompt-line 1.6s ease-in-out infinite alternate;}
#dn-master-root .dn-flash{position:absolute;inset:0;background:#f5d5d5;opacity:0;pointer-events:none;}
#dn-master-root .dn-flash.is-flashing{animation:dn-flash .27s ease-out;}

/* 
==== ESTRUTURA DO CADERNO 3D DA VERSÃO 2 (RESTAURADA E ADAPTADA) ==== 
*/
#dn-master-root .dn-book-stage{position:absolute;inset:0;perspective:1400px;perspective-origin:50% 42%;opacity:0;transition:opacity .9s ease;--w:min(40vw,300px);--h:calc(var(--w) * 1.42);--lh:calc(var(--w) * .078)}
#dn-master-root .dn-book-stage.is-visible{opacity:1}
#dn-master-root .dn-book-glow{position:absolute;left:50%;top:50%;width:calc(var(--w) * 2.6);height:calc(var(--h) * .95);transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(255,30,30,.34),rgba(120,0,0,.12) 70%,transparent);filter:blur(6px)}
#dn-master-root .dn-book{position:absolute;left:50%;top:50%;width:var(--w);height:var(--h);margin:calc(var(--h) / -2) 0 0 calc(var(--w) / -2);transform-style:preserve-3d;transform:translateZ(-340px) rotateX(64deg) rotateY(-30deg) scale(.7);transition:transform 1.6s cubic-bezier(.16,1,.3,1)}
#dn-master-root .dn-book.is-arrived{transform:translateZ(0) rotateX(12deg) rotateY(-16deg) scale(1)}
#dn-master-root .dn-book.is-open{transform:translateX(calc(var(--w) * .5)) rotateX(6deg) rotateY(-3deg) scale(1.04);transition:transform 2.2s cubic-bezier(.65,0,.35,1)}
#dn-master-root .dn-book.is-closing{transform:translateX(0) rotateX(12deg) rotateY(-16deg) scale(.98);transition:transform 1.05s cubic-bezier(.65,0,.35,1)}

#dn-master-root .dn-board{position:absolute;left:-3px;top:-3px;width:calc(100% + 8px);height:calc(100% + 8px);transform:translateZ(-12px);background:#060606;border-radius:6px}
#dn-master-root .dn-pages{position:absolute;left:0;top:0;width:100%;height:100%;transform:translateZ(-5px);border-radius:2px 4px 4px 2px;background-color:#fbfbf8;background-image:linear-gradient(90deg,rgba(0,0,0,.2),rgba(0,0,0,0) 9%),repeating-linear-gradient(to bottom,transparent 0,transparent calc(var(--lh) - 1px),#111 calc(var(--lh) - 1px),#111 var(--lh));background-position:0 0,0 calc(var(--lh) * 2);box-shadow:2px 2px 0 #e4e4df,4px 4px 0 #cfcfc9,6px 6px 0 #bdbdb6}

#dn-master-root .dn-cover{position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:0 50%;transform-style:preserve-3d;will-change:transform;}
#dn-master-root .dn-cover.is-open{animation:dn-cover-open 2.2s cubic-bezier(.65,0,.35,1) both}
#dn-master-root .dn-book.is-closing .dn-cover{transform:rotateY(0deg);animation:none;transition:transform .95s cubic-bezier(.65,0,.35,1)}
@keyframes dn-cover-open{0%{transform:rotateY(0deg)}18%{transform:rotateY(-9deg)}100%{transform:rotateY(-164deg)}}

#dn-master-root .dn-face{position:absolute;left:0;top:0;width:100%;height:100%;box-sizing:border-box;border-radius:4px;backface-visibility:hidden;-webkit-backface-visibility:hidden}
#dn-master-root .dn-cover-front{background:linear-gradient(115deg,#2b2b2b 0%,#0d0d0d 26%,#040404 62%,#121212 100%);box-shadow:inset 9px 0 12px -9px rgba(255,255,255,.14),0 28px 44px -12px rgba(0,0,0,.85); display:flex;justify-content:center;align-items:flex-start;}
#dn-master-root .dn-cover-back{transform:rotateY(180deg);background:#f3f2ed}
#dn-master-root .dn-cover-logo{position:relative;margin-top:20%;width:84%;height:auto;filter:drop-shadow(0 1px 0 rgba(255,255,255,.16));overflow:visible;}

/* 
==== ELEMENTOS DA ESCRITA VETORIAL (MANTIDOS INTACTOS) ==== 
*/
#dn-master-root .dn-write-svg{position:absolute;left:3%;top:5%;width:94%;height:90%;overflow:visible;filter:drop-shadow(0 0 1.6px rgba(158,0,15,.42));}
#dn-master-root .dn-hand-path{fill:none;stroke:#79000a;stroke-width:4.8;stroke-linecap:round;stroke-linejoin:round;opacity:0;visibility:hidden;stroke-dasharray:var(--path-length,1);stroke-dashoffset:var(--path-length,1);}
#dn-master-root .dn-hand-path.is-drawing{opacity:.98;visibility:visible;}
#dn-master-root .dn-fallback-glyph{font-family:"Brush Script MT","Segoe Script","URW Chancery L",cursive;font-weight:700;fill:transparent;stroke:#79000a;stroke-width:2.1;stroke-linejoin:round;paint-order:stroke;opacity:0;visibility:hidden;}
#dn-master-root .dn-fallback-glyph.is-drawing{opacity:1;visibility:visible;}

#dn-master-root .dn-ink-flourish{fill:none;stroke:#79000a;stroke-width:2;stroke-linecap:round;opacity:.45;}
#dn-master-root .dn-blood-drop{fill:#79000a;opacity:0;filter:drop-shadow(0 0 2px rgba(120,0,0,.45));}
#dn-master-root .dn-blood-drop.is-falling{opacity:.9;animation:dn-drop-fall 1.45s ease-in forwards;}
#dn-master-root .dn-pen{position:absolute;z-index:12;width:20px;height:210px;left:5%;top:58%;opacity:0;transform:rotate(-135deg) translateZ(20px);transform-origin:10px 200px;transition:opacity .25s ease;filter:drop-shadow(7px 7px 4px rgba(0,0,0,.34));pointer-events:none;will-change:left,top;}
#dn-master-root .dn-pen.is-visible{opacity:1;}
#dn-master-root .dn-pen-body{position:absolute;left:5px;top:15px;width:10px;height:145px;border-radius:5px;background:linear-gradient(90deg,#444,#eee 18%,#a7a7a7 36%,#f8f8f8 54%,#8b8b8b 82%,#333);border:1px solid rgba(35,35,35,.5);box-shadow:inset 0 0 2px #fff;}
#dn-master-root .dn-pen-body:before{content:"";position:absolute;left:1px;right:1px;top:13px;height:2px;background:rgba(30,30,30,.65);box-shadow:0 5px 0 rgba(255,255,255,.35),0 10px 0 rgba(30,30,30,.35),0 15px 0 rgba(255,255,255,.25);}
#dn-master-root .dn-pen-cap{position:absolute;left:4px;top:0;width:12px;height:26px;border-radius:3px 3px 1px 1px;background:linear-gradient(90deg,#282828,#eee 24%,#969696 60%,#292929);border:1px solid #565656;}
#dn-master-root .dn-pen-clip{position:absolute;left:14px;top:5px;width:5px;height:50px;border:2px solid #bababa;border-left:0;border-radius:0 6px 6px 0;transform:skewY(-8deg);}
#dn-master-root .dn-pen-grip{position:absolute;left:4px;top:151px;width:12px;height:24px;border-radius:1px;background:repeating-linear-gradient(to bottom,#222 0,#222 2px,#9b9b9b 3px,#333 5px);}
#dn-master-root .dn-pen-nib{position:absolute;left:7px;top:172px;width:7px;height:28px;background:linear-gradient(90deg,#252525,#e9e9e9 44%,#5a5a5a);clip-path:polygon(0 0,100% 0,50% 100%);}
#dn-master-root .dn-pen-nib:after{content:"";position:absolute;left:3px;top:2px;bottom:0;width:1px;background:rgba(0,0,0,.8);}
#dn-master-root .dn-countdown{position:absolute;top:7.5%;left:0;right:0;text-align:center;font:700 clamp(30px,6vw,68px)/1 Georgia,serif;letter-spacing:.12em;color:#8d000e;text-shadow:0 0 4px #ff1529,0 0 18px rgba(255,0,24,.82),0 0 45px rgba(140,0,15,.65);opacity:0;transition:opacity .4s ease;z-index:15;}
#dn-master-root .dn-countdown.is-visible{opacity:1;}
#dn-master-root .dn-countdown small{display:block;margin-top:8px;font:10px Arial,sans-serif;letter-spacing:.55em;color:rgba(120,0,10,.78);}
#dn-master-root .dn-book-caption{position:absolute;left:0;right:0;bottom:4vh;text-align:center;font:10px Arial,sans-serif;letter-spacing:.42em;color:rgba(255,220,220,.45);opacity:0;transition:opacity .5s ease;}
#dn-master-root .dn-book-caption.is-visible{opacity:1;}
#dn-master-root .dn-screen-flare{position:absolute;inset:0;z-index:30;background:#e8d7d7;opacity:0;pointer-events:none;}
#dn-master-root .dn-screen-flare.is-active{animation:dn-screen-flare .45s ease-out;}
#dn-audio-button{position:fixed;z-index:2147483001;right:18px;bottom:18px;border:1px solid rgba(178,0,18,.65);background:rgba(8,3,4,.9);color:#f3dede;padding:10px 14px;font:11px Arial,sans-serif;letter-spacing:.12em;cursor:pointer;box-shadow:0 0 18px rgba(130,0,12,.22);}
#dn-audio-button:hover{background:#260408;}
@keyframes dn-haze-breathe{from{opacity:.55;transform:scale(.97)}to{opacity:1;transform:scale(1.04)}}
@keyframes dn-inscription-in{0%{opacity:0;transform:translateY(9px);filter:blur(5px)}40%{opacity:1;text-shadow:0 0 2px #fff,0 0 28px #ff172a}65%{opacity:.52}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes dn-data-appear{0%{opacity:0;filter:blur(4px);transform:translateY(8px) rotate(var(--rot,0deg))}65%{opacity:.8}100%{opacity:1;filter:blur(0);transform:translateY(0) rotate(var(--rot,0deg))}}
@keyframes dn-char-burn{0%{opacity:0;color:#fff;filter:blur(4px)}22%{opacity:1;color:#fff;text-shadow:0 0 4px #fff,0 0 18px #ff1529}43%{opacity:.25}70%{opacity:1;color:#ffe4e4}100%{opacity:1;color:#ffe5e5}}
@keyframes dn-prompt-in{to{opacity:1}}
@keyframes dn-prompt-line{from{width:18px;opacity:.35}to{width:68px;opacity:1}}
@keyframes dn-flash{0%{opacity:0}23%{opacity:.75}100%{opacity:0}}
@keyframes dn-drop-fall{0%{transform:translateY(0) scaleY(.6);opacity:.8}75%{opacity:.9}100%{transform:translateY(36px) scaleY(1.25);opacity:0}}
@keyframes dn-screen-flare{0%{opacity:0}18%{opacity:.22}100%{opacity:0}}
@media(max-width:650px){
#dn-master-root .dn-eye-title{top:10vh;font-size:clamp(25px,8vw,46px);letter-spacing:.1em}
#dn-master-root .dn-eyes{top:43%;width:96%;gap:5px}
#dn-master-root .dn-data{max-width:43vw;font-size:clamp(11px,3vw,15px);letter-spacing:.04em;line-height:1.6}
#dn-master-root .dn-data.d1{left:3%;top:25%}#dn-master-root .dn-data.d2{right:3%;top:26%}#dn-master-root .dn-data.d3{left:5%;bottom:17%}#dn-master-root .dn-data.d4{right:5%;bottom:17%}
#dn-master-root .dn-book-stage{--w:min(60vw,240px);} /* Ajuste para o caderno modelo antigo no celular */
#dn-master-root .dn-pen{transform:rotate(43deg) scale(.75);}
#dn-master-root .dn-countdown{top:9%;}
}
@media(prefers-reduced-motion:reduce){
#dn-master-root .dn-red-haze,#dn-master-root .dn-prompt:after{animation:none!important}
#dn-master-root .dn-char,#dn-master-root .dn-eye-title span{animation-duration:.01ms!important;animation-delay:0ms!important}
}
`;

  function later(ms, fn) {
    var id = window.setTimeout(function () {
      if (alive) fn();
    }, CONFIG.reducedMotion ? Math.min(ms, 140) : ms);
    timers.push(id);
    return id;
  }

  function make(tag, attrs, parent, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'className') n.className = attrs[k];
      else if (k === 'textContent') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  function svg(tag, attrs, parent) {
    var n = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(n);
    return n;
  }

  function scheduleFrame(fn) {
    var id = requestAnimationFrame(function (t) { if (alive) fn(t); });
    rafIds.push(id);
    return id;
  }

  function textLetters(text, parent, start, step, className) {
    var time = start || 0;
    Array.from(String(text)).forEach(function (ch) {
      var span = make('span', { className: className || 'dn-char' }, parent, ch === ' ' ? '\u00a0' : ch);
      span.style.setProperty('--d', time + 'ms');
      time += step || 40;
    });
    return time;
  }

  function getProfile() {
    var username = mw.config.get('wgUserName');
    if (!username) return Promise.resolve({ name: 'Visitante', created: null, edits: null, anonymous: true });
    var fallback = { name: String(username), created: null, edits: null, anonymous: false };
    return new Promise(function (resolve) {
      var done = false;
      var finish = function (obj) { if (!done) { done = true; resolve(obj); } };
      var fallbackTimer = setTimeout(function () { finish(fallback); }, 2200);
      try {
        mw.loader.using('mediawiki.api').then(function () {
          return new mw.Api().get({
            action: 'query',
            meta: 'userinfo',
            uiprop: 'editcount|registrationdate',
            format: 'json'
          });
        }).then(function (data) {
          clearTimeout(fallbackTimer);
          var info = data && data.query && data.query.userinfo ? data.query.userinfo : {};
          var dt = info.registrationdate ? new Date(info.registrationdate) : null;
          finish({
            name: String(username),
            created: dt && !isNaN(dt.getTime()) ? dt : null,
            edits: typeof info.editcount === 'number' ? info.editcount : null,
            anonymous: false
          });
        }).catch(function () {
          clearTimeout(fallbackTimer);
          finish(fallback);
        });
      } catch (e) {
        clearTimeout(fallbackTimer);
        finish(fallback);
      }
    });
  }

  function dateJapanese(date) {
    return date.getFullYear() + '年' + String(date.getMonth() + 1).padStart(2, '0') + '月' + String(date.getDate()).padStart(2, '0') + '日';
  }

  function createEye(uid) {
    var wrap = make('div', { className: 'dn-eye' });
    var s = svg('svg', { viewBox: '0 0 420 220', role: 'img', 'aria-label': '目の紋様', focusable: 'false' }, wrap);
    var defs = svg('defs', {}, s);
    function gradient(id, type, attrs, stops) {
      var g = svg(type, Object.assign({ id: uid + id }, attrs), defs);
      stops.forEach(function (st) { svg('stop', { offset: st[0], 'stop-color': st[1], 'stop-opacity': st[2] == null ? 1 : st[2] }, g); });
      return 'url(#' + uid + id + ')';
    }
    var sclera = gradient('-white', 'radialGradient', { cx: '50%', cy: '49%', r: '65%' }, [[0, '#fff9f8'], [.46, '#e6d4d0'], [.78, '#b38c87'], [1, '#301313']]);
    var iris = gradient('-iris', 'radialGradient', { cx: '48%', cy: '44%', r: '58%' }, [[0, '#ffaaaa'], [.22, '#ed2739'], [.54, '#b60018'], [.82, '#65000c'], [1, '#210006']]);
    var topShade = gradient('-top', 'linearGradient', { x1: '0', y1: '0', x2: '0', y2: '1' }, [[0, '#050203'], [.6, '#150305', .94], [1, '#2b080a', .96]]);
    var lowShade = gradient('-low', 'linearGradient', { x1: '0', y1: '0', x2: '0', y2: '1' }, [[0, '#1a0305', .95], [1, '#010102', 1]]);
    var eyePath = 'M12 110 C85 15 335 15 408 110 C335 205 85 205 12 110 Z';
    svg('path', { d: eyePath, fill: sclera, stroke: '#100305', 'stroke-width': 5 }, s);
    svg('path', { d: 'M18 110 C90 34 330 34 402 110 C330 183 90 183 18 110 Z', fill: 'none', stroke: 'rgba(35,0,4,.6)', 'stroke-width': 3 }, s);
    svg('circle', { cx: 210, cy: 110, r: 64, fill: iris, stroke: '#220006', 'stroke-width': 4 }, s);
    [54, 45, 35, 24].forEach(function (r, i) {
      svg('circle', { cx: 210, cy: 110, r: r, fill: 'none', stroke: i % 2 ? '#ff636f' : '#45000a', 'stroke-width': i % 2 ? 1.4 : 2.8, 'stroke-opacity': i % 2 ? .55 : .8 }, s);
    });
    for (var i = 0; i < 20; i++) {
      var a = i * Math.PI * 2 / 20;
      var r1 = 34, r2 = 57;
      svg('line', { x1: 210 + Math.cos(a) * r1, y1: 110 + Math.sin(a) * r1, x2: 210 + Math.cos(a) * r2, y2: 110 + Math.sin(a) * r2, stroke: '#ffb1b1', 'stroke-width': 1.2, 'stroke-opacity': .34 }, s);
    }
    svg('circle', { cx: 210, cy: 110, r: 18, fill: '#050103', stroke: '#3d0008', 'stroke-width': 3 }, s);
    svg('ellipse', { cx: 190, cy: 88, rx: 12, ry: 7, fill: '#fff', 'fill-opacity': .94 }, s);
    svg('circle', { cx: 232, cy: 131, r: 3, fill: '#fff', 'fill-opacity': .58 }, s);
    var clip = svg('clipPath', { id: uid + '-clip' }, defs);
    svg('path', { d: eyePath }, clip);
    var lids = svg('g', { 'clip-path': 'url(#' + uid + '-clip)' }, s);
    var lower = svg('path', { fill: lowShade }, lids);
    var lowerEdge = svg('path', { fill: 'none', stroke: '#090103', 'stroke-width': 5, 'stroke-linecap': 'round' }, lids);
    var upper = svg('path', { fill: topShade }, lids);
    var crease = svg('path', { fill: 'none', stroke: '#e75a61', 'stroke-width': 2.2, 'stroke-opacity': .30 }, lids);
    var edge = svg('path', { fill: 'none', stroke: '#050103', 'stroke-width': 5, 'stroke-linecap': 'round' }, lids);
    var lashes = [];
    for (var j = 0; j < 15; j++) lashes.push(svg('line', { stroke: '#030102', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, lids));
    function curveY(x, y0, yc, y1) {
      var t = (x - 12) / (408 - 12);
      return (1-t)*(1-t)*y0 + 2*(1-t)*t*yc + t*t*y1;
    }
    function draw(closed) {
      var e = Math.max(0, Math.min(1, closed));
      var topY = 45 + 65 * e;
      var topControl = -70 + 180 * e;
      var bottomY = 175 - 65 * e;
      var bottomControl = 290 - 180 * e;
      upper.setAttribute('d', 'M-20 ' + topY + ' L12 ' + topY + ' Q210 ' + topControl + ' 408 ' + topY + ' L440 ' + topY + ' L440 -40 L-20 -40 Z');
      edge.setAttribute('d', 'M12 ' + topY + ' Q210 ' + topControl + ' 408 ' + topY);
      crease.setAttribute('d', 'M23 ' + (topY-22) + ' Q210 ' + (topControl-18) + ' 397 ' + (topY-22));
      lower.setAttribute('d', 'M-20 ' + bottomY + ' L12 ' + bottomY + ' Q210 ' + bottomControl + ' 408 ' + bottomY + ' L440 ' + bottomY + ' L440 260 L-20 260 Z');
      lowerEdge.setAttribute('d', 'M12 ' + bottomY + ' Q210 ' + bottomControl + ' 408 ' + bottomY);
      lashes.forEach(function (ln, idx) {
        var x = 70 + idx * 20;
        var y = curveY(x, topY, topControl, topY);
        var dx = (x - 210) * .045;
        ln.setAttribute('x1', x); ln.setAttribute('y1', y-1);
        ln.setAttribute('x2', x+dx); ln.setAttribute('y2', y+7+Math.abs(dx)*.08);
      });
    }
    draw(1);
    return { element: wrap, draw: draw };
  }

  function createCoverLogo(parent) {
    var s = svg('svg', { class: 'dn-cover-logo', viewBox: '0 0 520 190', role: 'img', 'aria-label': 'Death Note' }, parent);
    var defs = svg('defs', {}, s);
    var shadow = svg('filter', { id: 'dn-logo-shadow', x: '-10%', y: '-10%', width: '120%', height: '120%' }, defs);
    svg('feGaussianBlur', { stdDeviation: '.8' }, shadow);
    var logoText = svg('text', {
      x: '260', y: '119', 'text-anchor': 'middle',
      'font-family': '"Death Note", Georgia, serif', 'font-size': '75',
      'font-weight': '400', 'letter-spacing': '.5', fill: '#e7e4e0',
      stroke: '#f8f6f0', 'stroke-width': '.45', 'paint-order': 'stroke',
      transform: 'rotate(-4 260 100)'
    }, s);
    logoText.textContent = 'DEATH NOTE';
    svg('path', { d: 'M43 76 L55 63 M76 145 L88 132 M438 57 L450 44 M459 146 L472 132', fill: 'none', stroke: '#e7e4e0', 'stroke-width': '2.2', 'stroke-linecap': 'square', 'stroke-opacity': '.82' }, s);
    return s;
  }

  function makeRoot(profile) {
    createdStyle = make('style', { id: 'dn-master-style' }, document.head, CSS);
    root = make('div', { id: 'dn-master-root', role: 'presentation', 'aria-label': 'Introdução Death Note' }, document.body);
    make('div', { className: 'dn-bg' }, root);
    make('div', { className: 'dn-red-haze' }, root);
    ['r1','r2','r3'].forEach(function (r) { make('div', { className: 'dn-ring ' + r }, root); });
    make('div', { className: 'dn-grain' }, root);
    make('div', { className: 'dn-vignette' }, root);
    make('div', { className: 'dn-flash' }, root);

    var title = make('div', { className: 'dn-eye-title' }, root);
    textLetters('死神の眼', title, 350, 150, '');
    var eyes = make('div', { className: 'dn-eyes' }, root);
    var leftEye = createEye('dn-eye-left');
    var rightEye = createEye('dn-eye-right');
    eyes.appendChild(leftEye.element);
    eyes.appendChild(rightEye.element);

    var infoLayer = make('div', { className: 'dn-inscriptions' }, root);
    function field(cls, label, value, delay) {
      var f = make('div', { className: 'dn-data ' + cls }, infoLayer);
      f.style.setProperty('--wait', delay + 'ms');
      make('span', { className: 'lab' }, f, label);
      make('span', { className: 'val' }, f, value);
      return f;
    }
    field('d1', '名前', profile.name, 500);
    field('d2', '訪問者情報', profile.anonymous ? '訪問者' : '認証済み', 780);
    field('d3', '登録日', profile.created ? dateJapanese(profile.created) : (profile.anonymous ? '記録なし' : '記録を取得できません'), 1020);
    field('d4', '編集数', profile.edits == null ? '---' : Number(profile.edits).toLocaleString('ja-JP'), 1260);

    var prompt = make('div', { className: 'dn-prompt' }, root, 'ENTER  /  クリックで進む');
    return { title: title, eyes: eyes, leftEye: leftEye, rightEye: rightEye, info: infoLayer, prompt: prompt };
  }

  function tweenEyes(refs, from, to, duration, done) {
    var token = ++eyeTweenToken;
    if (CONFIG.reducedMotion) { refs.leftEye.draw(to); refs.rightEye.draw(to); if (done) done(); return; }
    var start = null;
    function frame(ts) {
      if (!alive || token !== eyeTweenToken) return;
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = from + (to - from) * eased;
      refs.leftEye.draw(val); refs.rightEye.draw(val);
      if (t < 1) scheduleFrame(frame); else if (done) done();
    }
    scheduleFrame(frame);
  }

  // >>> ESTRUTURA DO CADERNO EM 3D DA VERSÃO 2 INSERIDA AQUI <<<
  function createBookScene() {
    var stageEl = make('div', { className: 'dn-book-stage' }, root);
    make('div', { className: 'dn-book-glow' }, stageEl);
    var book = make('div', { className: 'dn-book' }, stageEl);
    make('div', { className: 'dn-board' }, book);
    
    // Onde a mágica acontece: o papel do caderno de fundo
    var pages = make('div', { className: 'dn-pages' }, book);

    var cover = make('div', { className: 'dn-cover' }, book);
    var front = make('div', { className: 'dn-face dn-cover-front' }, cover);
    createCoverLogo(front); // Logo mantido como pedido
    make('div', { className: 'dn-face dn-cover-back' }, cover);

    // Sistema de escrita, vetores e caneta mantidos EXATAMENTE da versão final
    // (injetados no bloco pages do caderno antigo)
    var writeSvg = svg('svg', { class: 'dn-write-svg', viewBox: '0 0 380 460', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, pages);
    var pen = make('div', { className: 'dn-pen' }, pages);
    make('div', { className: 'dn-pen-cap' }, pen);
    make('div', { className: 'dn-pen-clip' }, pen);
    make('div', { className: 'dn-pen-body' }, pen);
    make('div', { className: 'dn-pen-grip' }, pen);
    make('div', { className: 'dn-pen-nib' }, pen);

    var counter = make('div', { className: 'dn-countdown' }, stageEl);
    make('div', {}, counter, '40');
    make('small', {}, counter, '秒');
    var caption = make('div', { className: 'dn-book-caption' }, stageEl, '名前は記された');
    
    bookRef = { stage: stageEl, book: book, cover: cover, writeSvg: writeSvg, pen: pen, counter: counter, counterNumber: counter.firstChild, caption: caption };
    return bookRef;
  }

  function bloodDrops(svgParent, x, y, seed) {
    for (var j = 0; j < 2; j++) {
      var drop = svg('path', { class: 'dn-blood-drop', d: 'M0 0 C-3 5 -3 8 0 10 C3 8 3 5 0 0 Z', transform: 'translate(' + (x + j * 5) + ' ' + (y + j * 2) + ') scale(' + (0.55 + ((seed + j) % 3) * .12) + ')' }, svgParent);
      later(80 + j * 110, function (d) { return function () { d.classList.add('is-falling'); }; }(drop));
    }
  }

  // ALFABETO INTOCADO
  var HAND_STROKES = {
    A:{w:104,s:['M8 92 C25 61 42 27 54 8 C66 34 81 65 94 92','M28 62 C44 57 62 57 79 62']},
    B:{w:101,s:['M18 92 C20 63 21 35 21 10','M22 11 C49 4 80 12 78 31 C77 45 51 50 22 49','M22 49 C53 44 85 51 82 72 C79 92 43 97 18 92']},
    C:{w:101,s:['M86 18 C66 3 39 6 22 27 C3 50 11 81 37 91 C56 100 77 86 89 73']},
    D:{w:105,s:['M18 92 C20 63 21 35 21 10','M22 11 C72 2 91 29 87 54 C84 81 55 99 18 92']},
    E:{w:94,s:['M23 11 C22 37 21 64 19 92','M23 12 C45 9 67 10 86 12','M22 49 C40 47 56 47 72 49','M20 91 C43 89 65 90 87 91']},
    F:{w:92,s:['M22 92 C22 63 23 35 23 11','M23 12 C45 9 67 10 86 12','M22 49 C40 47 56 47 72 49']},
    G:{w:106,s:['M86 19 C67 4 38 7 21 28 C4 49 11 80 36 91 C57 100 82 83 84 61 C70 61 60 62 49 64']},
    H:{w:105,s:['M20 10 C20 36 18 64 18 92','M84 10 C82 37 82 64 82 92','M20 52 C40 48 62 48 82 52']},
    I:{w:68,s:['M18 12 C29 10 39 11 50 12','M34 12 C32 39 32 65 31 91','M17 91 C29 89 41 90 52 91']},
    J:{w:98,s:['M25 12 C44 10 62 11 82 12','M67 12 C66 41 70 67 57 84 C44 102 17 91 14 75']},
    K:{w:101,s:['M20 10 C20 37 18 64 18 92','M80 12 C63 29 43 47 22 60','M43 49 C56 66 69 80 86 92']},
    L:{w:90,s:['M22 10 C22 37 19 65 20 92 C40 92 63 91 84 90']},
    M:{w:122,s:['M13 92 C14 62 15 34 16 10 C31 34 43 54 59 69 C74 50 88 29 105 10 C105 39 106 65 108 92']},
    N:{w:109,s:['M18 92 C19 63 20 36 20 10 C40 37 63 67 86 92 C86 64 87 36 89 10']},
    O:{w:107,s:['M55 9 C32 7 15 26 15 51 C14 76 31 93 53 92 C77 92 91 72 91 48 C91 24 76 9 55 9 Z']},
    P:{w:98,s:['M19 93 C20 64 21 36 22 10','M23 11 C51 5 79 13 78 32 C78 51 49 54 21 50']},
    Q:{w:108,s:['M55 9 C32 7 15 26 15 51 C14 76 31 93 53 92 C77 92 91 72 91 48 C91 24 76 9 55 9 Z','M62 69 C71 81 82 90 96 98']},
    R:{w:102,s:['M19 93 C20 64 21 36 22 10','M23 11 C51 5 79 13 78 32 C78 51 49 54 21 50','M43 51 C56 66 69 80 87 93']},
    S:{w:98,s:['M82 17 C65 5 35 6 25 22 C13 41 40 48 58 55 C83 65 78 85 56 91 C39 96 22 88 14 78']},
    T:{w:105,s:['M10 13 C35 10 66 11 93 12','M53 12 C51 40 50 66 49 92']},
    U:{w:108,s:['M18 11 C18 36 15 65 27 82 C40 101 66 95 79 78 C90 62 88 34 88 11']},
    V:{w:104,s:['M13 11 C28 38 41 67 54 92 C68 66 81 37 94 11']},
    W:{w:136,s:['M10 11 C19 39 27 67 38 91 C51 66 61 41 68 20 C75 43 83 68 94 91 C108 64 119 37 128 11']},
    X:{w:103,s:['M17 12 C35 38 62 67 86 92','M85 11 C62 38 39 67 16 92']},
    Y:{w:103,s:['M14 11 C30 32 43 47 54 58 C67 43 80 27 91 11','M54 58 C53 70 52 82 51 93']},
    Z:{w:101,s:['M17 12 C40 10 63 11 86 12 C63 38 40 66 16 91 C39 90 62 91 87 90']},
    a:{w:85,s:['M70 38 C61 17 35 21 23 42 C8 67 32 87 51 72 C64 61 69 42 66 27 C64 47 63 72 76 81']},
    b:{w:83,s:['M29 13 C27 38 24 63 22 85','M27 54 C40 33 63 34 73 51 C84 72 57 88 39 80 C31 77 26 67 27 54']},
    c:{w:81,s:['M71 39 C59 22 34 24 22 43 C7 66 33 86 63 67']},
    d:{w:86,s:['M70 38 C58 18 33 22 22 42 C8 65 32 87 51 72 C64 61 69 42 66 26 C64 48 64 73 77 82']},
    e:{w:82,s:['M21 54 C39 53 67 44 64 34 C60 18 34 28 23 45 C8 68 35 87 66 66']},
    f:{w:65,s:['M30 85 C38 60 42 31 55 14 C63 4 77 15 69 29','M16 44 C32 42 50 41 65 40']},
    g:{w:85,s:['M68 42 C59 23 34 24 22 43 C8 65 32 82 51 69 C64 59 68 38 65 26 C64 53 64 77 50 91 C40 102 24 94 22 85']},
    h:{w:84,s:['M28 13 C25 38 22 64 20 85','M27 57 C39 36 53 32 62 39 C72 47 63 70 61 84']},
    i:{w:52,s:['M28 43 C25 56 23 71 24 83','M34 24 L35 22']},
    j:{w:57,s:['M43 43 C39 61 38 81 29 93 C23 101 12 95 17 86','M49 24 L50 22']},
    k:{w:82,s:['M28 13 C25 38 22 64 20 85','M65 37 C52 48 39 58 27 65','M43 56 C54 67 65 77 75 84']},
    l:{w:54,s:['M35 13 C28 38 23 63 30 77 C36 88 50 80 58 69']},
    m:{w:112,s:['M18 43 C16 57 15 71 14 84','M20 54 C32 35 42 37 42 51 L39 83','M42 52 C54 34 65 37 64 51 L62 83','M64 52 C75 36 87 39 86 53 L84 83']},
    n:{w:82,s:['M19 43 C17 57 15 71 14 84','M21 55 C35 33 52 37 51 53 L49 84']},
    o:{w:82,s:['M46 29 C28 27 15 44 20 63 C25 84 51 87 64 67 C78 46 64 29 46 29 Z']},
    p:{w:83,s:['M20 43 C17 66 14 86 10 101','M23 52 C39 33 62 36 68 52 C75 74 45 84 23 69']},
    q:{w:83,s:['M68 42 C59 23 34 24 22 43 C8 65 32 82 51 69 C64 59 68 38 65 26','M65 39 C63 63 62 82 60 101']},
    r:{w:64,s:['M19 43 C17 57 15 71 14 84','M22 54 C31 40 44 35 51 43']},
    s:{w:78,s:['M65 36 C52 24 28 29 26 43 C24 55 52 54 58 66 C65 82 36 88 19 74']},
    t:{w:70,s:['M39 20 C34 40 28 63 31 77 C34 86 48 80 54 74','M20 44 C34 42 49 42 62 41']},
    u:{w:84,s:['M21 43 C18 58 14 76 26 81 C38 86 49 65 55 44 C51 59 49 78 61 82 C69 84 76 75 80 68']},
    v:{w:80,s:['M20 42 C29 59 36 74 44 83 C53 66 62 50 72 39']},
    w:{w:112,s:['M15 43 C23 59 29 72 36 83 C44 69 51 55 56 43 C61 59 66 72 72 82 C84 65 92 50 100 40']},
    x:{w:80,s:['M19 42 C34 55 55 70 72 83','M68 39 C51 55 35 69 18 83']},
    y:{w:82,s:['M20 43 C17 58 18 75 30 80 C42 84 52 64 58 43 C54 64 49 83 41 94 C34 101 21 95 22 86']},
    z:{w:80,s:['M22 42 C40 40 55 39 70 38 C55 52 37 69 20 82 C38 81 55 80 73 78']},
    '0':{w:86,s:['M48 12 C27 12 18 34 19 54 C19 75 31 91 49 89 C68 88 76 64 75 43 C74 24 63 12 48 12 Z']},
    '1':{w:58,s:['M17 29 C27 23 34 17 42 10 C41 36 40 63 39 91','M24 91 C35 90 46 90 54 91']},
    '2':{w:83,s:['M18 30 C25 12 54 7 68 22 C83 39 58 57 43 68 C32 76 24 84 19 91 C39 90 58 90 74 91']},
    '3':{w:82,s:['M19 22 C34 9 58 10 68 24 C77 37 59 48 43 49','M42 49 C62 45 77 57 72 74 C67 94 39 98 19 83']},
    '4':{w:86,s:['M60 91 C61 62 61 34 63 10 C48 34 32 55 14 67 C34 66 55 66 77 67']},
    '5':{w:82,s:['M67 13 C49 12 34 12 22 13 L20 45 C36 35 58 37 69 51 C84 71 64 91 42 91 C31 91 22 86 16 79']},
    '6':{w:84,s:['M65 15 C45 8 27 29 22 49 C16 70 27 91 47 91 C67 91 77 71 67 56 C58 43 36 45 22 60']},
    '7':{w:82,s:['M15 13 C36 11 57 12 76 13 C61 37 42 65 27 91']},
    '8':{w:84,s:['M46 48 C25 43 23 25 35 15 C47 5 66 13 66 27 C66 40 54 47 41 51 C22 58 20 78 35 88 C53 100 73 85 69 69 C67 59 57 52 46 48 Z']},
    '9':{w:84,s:['M65 52 C52 68 28 62 24 45 C19 26 34 11 50 13 C71 15 76 38 70 58 C65 75 53 87 34 92']},
    ' ':{w:55,s:[]},
    '_':{w:82,s:['M11 94 C33 92 57 93 78 92']},
    '-':{w:59,s:['M14 57 C27 55 42 55 54 56']},
    '.':{w:38,s:['M20 83 L21 80']},
    ',':{w:40,s:['M24 81 C24 89 20 95 16 100']},
    '!':{w:48,s:['M23 12 C22 34 22 57 23 66','M23 84 L24 82']},
    '?':{w:76,s:['M16 28 C22 10 51 6 64 23 C77 42 51 50 42 63','M41 83 L42 81']},
    '@':{w:105,s:['M77 65 C63 81 38 80 27 63 C13 41 32 18 55 22 C76 25 82 43 74 61 C68 76 53 67 54 52 C55 38 65 34 76 40']},
    '#':{w:90,s:['M35 15 C29 38 24 63 19 87','M64 15 C58 38 53 63 48 87','M14 43 C36 41 58 41 79 42','M10 64 C32 62 55 62 75 63']},
    '+':{w:78,s:['M42 26 C41 44 40 63 39 82','M17 55 C34 54 52 54 68 55']},
    '=':{w:78,s:['M15 44 C34 43 54 43 70 44','M15 65 C34 64 54 64 70 65']},
    '/':{w:62,s:['M51 10 C40 37 28 65 16 92']},
    '\\':{w:62,s:['M16 10 C28 37 40 65 51 92']},
    ':':{w:42,s:['M22 39 L23 37','M22 81 L23 79']},
    ';':{w:42,s:['M22 39 L23 37','M23 77 C23 86 19 93 15 98']},
    "'":{w:34,s:['M20 12 C21 20 20 27 17 32']},
    '"':{w:50,s:['M17 12 C18 20 17 27 15 31','M35 12 C36 20 35 27 33 31']},
    '(': {w:48,s:['M35 8 C14 30 13 70 35 94']},
    ')': {w:48,s:['M15 8 C36 30 37 70 15 94']},
    '[': {w:48,s:['M34 9 L17 9 L17 93 L34 93']},
    ']': {w:48,s:['M15 9 L32 9 L32 93 L15 93']},
    '&':{w:94,s:['M68 90 C46 71 26 50 28 32 C30 14 54 10 61 25 C68 39 48 57 32 69 C16 83 34 96 52 86 C64 79 73 65 81 51']}
  };

  function getHandSpec(character) {
    if (HAND_STROKES[character]) return HAND_STROKES[character];
    var decomposed = character;
    try { if (character.normalize) decomposed = character.normalize('NFD'); } catch (e) {}
    var base = Array.from(decomposed)[0] || character;
    var baseSpec = HAND_STROKES[base];
    var marks = Array.from(decomposed).slice(1);
    if (baseSpec) {
      var extra = [];
      marks.forEach(function (mark) {
        if (mark === '\u0301') extra.push('M48 1 C54 -5 59 -11 63 -17');
        else if (mark === '\u0300') extra.push('M39 -15 C43 -9 48 -3 53 1');
        else if (mark === '\u0302') extra.push('M35 0 L49 -13 L64 0');
        else if (mark === '\u0303') extra.push('M30 -5 C40 -13 48 3 58 -5 C64 -9 69 -7 74 -4');
        else if (mark === '\u0308') extra.push('M38 -3 L39 -6','M59 -3 L60 -6');
        else if (mark === '\u0327') extra.push('M43 94 C51 101 44 108 39 111');
        else if (mark === '\u030a') extra.push('M43 -4 C32 -13 46 -22 54 -13 C61 -5 47 0 43 -4');
      });
      return { w: baseSpec.w, s: baseSpec.s.concat(extra) };
    }
    return null;
  }

  function svgPointInWriteArea(book, element, x, y) {
    try {
      var pt = book.writeSvg.createSVGPoint();
      pt.x = x; pt.y = y;
      var screenPoint = pt.matrixTransform(element.getScreenCTM());
      return screenPoint.matrixTransform(book.writeSvg.getScreenCTM().inverse());
    } catch (e) {
      return { x: x, y: y };
    }
  }

  function setPenPoint(book, point) {
    var leftPct = 3 + (point.x / 380) * 94;
    var topPct = 5 + (point.y / 460) * 90;
    book.pen.style.left = 'calc(' + leftPct.toFixed(3) + '% - 10px)';
    book.pen.style.top = 'calc(' + topPct.toFixed(3) + '% - 200px)';
  }

  function animatePenTravel(book, from, to, duration) {
    return new Promise(function (resolve) {
      if (!alive) { resolve(); return; }
      if (!from) { setPenPoint(book, to); resolve(); return; }
      var start = null;
      function frame(ts) {
        if (!alive || phase !== 'writing') { resolve(); return; }
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / duration);
        var eased = k * k * (3 - 2 * k);
        setPenPoint(book, { x: from.x + (to.x - from.x) * eased, y: from.y + (to.y - from.y) * eased });
        if (k < 1) scheduleFrame(frame); else resolve();
      }
      scheduleFrame(frame);
    });
  }

  function animateHandStroke(book, step) {
    return new Promise(function (resolve) {
      if (!alive || phase !== 'writing') { resolve(); return; }
      var path = step.node;
      path.classList.add('is-drawing');
      book.pen.classList.add('is-visible');
      var start = null;
      function frame(ts) {
        if (!alive || phase !== 'writing') { resolve(); return; }
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / step.duration);
        var eased = k * k * (3 - 2 * k);
        var progress = step.length * eased;
        if (step.fallback) {
          path.style.strokeDashoffset = String(step.length * (1 - eased));
          var fallbackPoint = {
            x: step.from.x + (step.to.x - step.from.x) * eased,
            y: step.from.y + (step.to.y - step.from.y) * eased
          };
          setPenPoint(book, fallbackPoint);
        } else {
          path.style.strokeDashoffset = String(step.length - progress);
          var raw = path.getPointAtLength(progress);
          setPenPoint(book, svgPointInWriteArea(book, path, raw.x, raw.y));
        }
        if (k < 1) scheduleFrame(frame);
        else {
          path.style.strokeDashoffset = '0';
          var endPoint = step.fallback ? step.to : svgPointInWriteArea(book, path, path.getPointAtLength(step.length));
          resolve(endPoint);
        }
      }
      scheduleFrame(frame);
    });
  }

  function drawName(book, name) {
    return new Promise(function (resolve) {
      var clean = Array.from(String(name || 'Visitante'));
      var specs = clean.map(function (ch) {
        var spec = getHandSpec(ch);
        return { ch: ch, spec: spec, advance: spec ? spec.w : 90 };
      });
      var gapUnits = 8;
      var totalUnits = specs.reduce(function (sum, item) { return sum + item.advance; }, 0) + Math.max(0, specs.length - 1) * gapUnits;
      var scaleX = Math.min(.42, 318 / Math.max(1, totalUnits));
      var scaleY = scaleX * 1.45;
      var totalWidth = totalUnits * scaleX;
      var x = (380 - totalWidth) / 2;
      var yTop = 246;
      var writingGroup = svg('g', { transform: 'rotate(-13 190 310)' }, book.writeSvg);
      var steps = [];
      
      specs.forEach(function (item, charIndex) {
        var glyphGroup = svg('g', { transform: 'translate(' + x.toFixed(3) + ' ' + yTop + ') scale(' + scaleX.toFixed(5) + ' ' + scaleY.toFixed(5) + ')' }, writingGroup);
        var paths = item.spec ? item.spec.s : null;
        if (paths && paths.length) {
          paths.forEach(function (d, strokeIndex) {
            var node = svg('path', { class: 'dn-hand-path', d: d }, glyphGroup);
            var len = 1;
            try { len = Math.max(1, node.getTotalLength()); } catch (e) { len = 100; }
            node.style.setProperty('--path-length', String(len));
            node.style.strokeDasharray = String(len);
            node.style.strokeDashoffset = String(len);
            var duration = Math.max(155, Math.min(560, len * scaleX * 1.45 * 7.5));
            steps.push({ node: node, length: len, duration: duration, charIndex: charIndex, lastForChar: strokeIndex === paths.length - 1, fallback: false });
          });
        } else {
          var nodeText = svg('text', { class: 'dn-fallback-glyph', x: 0, y: 91, 'font-size': 90, 'font-family': 'serif', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, glyphGroup);
          nodeText.textContent = item.ch;
          var estimatedLength = Math.max(65, item.advance * 2.3);
          nodeText.style.strokeDasharray = String(estimatedLength);
          nodeText.style.strokeDashoffset = String(estimatedLength);
          var from = svgPointInWriteArea(book, nodeText, 0, 62);
          var to = svgPointInWriteArea(book, nodeText, item.advance, 62);
          steps.push({ node: nodeText, length: estimatedLength, duration: 430, charIndex: charIndex, lastForChar: true, fallback: true, from: from, to: to });
        }
        x += (item.advance + gapUnits) * scaleX;
      });

      void book.writeSvg.getBoundingClientRect();
      var previousPoint = null;
      var sequence = Promise.resolve();
      steps.forEach(function (step, index) {
        sequence = sequence.then(function () {
          if (!alive || phase !== 'writing') return null;
          var startPoint;
          if (step.fallback) startPoint = step.from;
          else {
            var pt = step.node.getPointAtLength(0);
            startPoint = svgPointInWriteArea(book, step.node, pt.x, pt.y);
          }
          return animatePenTravel(book, previousPoint, startPoint, previousPoint ? 75 : 0).then(function () {
            if (!alive || phase !== 'writing') return null;
            return animateHandStroke(book, step);
          }).then(function (endPoint) {
            if (endPoint) previousPoint = endPoint;
            if (alive && phase === 'writing' && step.lastForChar && (step.charIndex % 3 === 2 || step.charIndex === specs.length - 1)) {
              bloodDrops(book.writeSvg, previousPoint.x, previousPoint.y, step.charIndex);
            }
            return new Promise(function (r) { later(22, r); });
          });
        });
      });
      sequence.then(function () {
        if (alive && phase === 'writing') {
          book.pen.classList.remove('is-visible');
          book.caption.classList.add('is-visible');
        }
        resolve();
      }).catch(function () { resolve(); });
    });
  }

  function runCountdown(book) {
    return new Promise(function (resolve) {
      book.counter.classList.add('is-visible');
      var count = 40;
      book.counterNumber.textContent = String(count);
      var step = CONFIG.reducedMotion ? 25 : CONFIG.countdownStepMs;
      function next() {
        if (!alive) return resolve();
        count--;
        book.counterNumber.textContent = String(Math.max(0, count));
        book.counter.style.transform = 'scale(' + (count % 2 ? '1.035' : '1') + ')';
        if (count <= 0) {
          later(380, resolve);
        } else {
          later(step, next);
        }
      }
      later(step, next);
    });
  }

  function flash() {
    if (!root) return;
    var f = root.querySelector('.dn-flash');
    if (!f) return;
    f.classList.remove('is-flashing');
    void f.offsetWidth;
    f.classList.add('is-flashing');
  }

  function audioFailControl() {
    if ((!alive && !profileRevealed) || audioButton || !audio) return;
    audioButton = make('button', { id: 'dn-audio-button', type: 'button' }, document.body, '▶ TOCAR A RISADA DO KIRA');
    audioButton.addEventListener('click', function () {
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().then(function () { if (audioButton) audioButton.remove(); audioButton = null; }).catch(function () {});
    });
  }

  function tryPlayAudio() {
    if (!audio) return;
    audio.volume = CONFIG.audioVolume;
    audio.currentTime = 0;
    var p;
    try { p = audio.play(); } catch (e) { audioFailControl(); return; }
    if (p && typeof p.then === 'function') {
      p.then(function () { if (audioButton) { audioButton.remove(); audioButton = null; } })
       .catch(function () { audioFailControl(); });
    }
  }

  function teardown(showProfile) {
    if (!alive) return;
    alive = false;
    timers.forEach(clearTimeout);
    rafIds.forEach(cancelAnimationFrame);
    if (root) root.remove();
    if (createdStyle) createdStyle.remove();
    if (audioButton && !showProfile) audioButton.remove();
    document.documentElement.style.overflow = previousOverflow;
    document.removeEventListener('keydown', onKey, true);
    if (root) root.removeEventListener('pointerdown', onPointer);
    if (audio && !showProfile) { audio.pause(); audio.currentTime = 0; audio.remove(); audio = null; }
    window.__DN_MASTER_PROTOTYPE__ = false;
  }

  function abortIntro() {
    if (!alive) return;
    phase = 'aborted';
    if (root) {
      root.style.transition = 'opacity .25s ease';
      root.style.opacity = '0';
    }
    later(280, function () { teardown(false); });
  }

  function revealProfile() {
    if (!alive) return;
    profileRevealed = true;
    phase = 'complete';
    if (root) root.classList.add('is-fading');
    tryPlayAudio();
    later(1650, function () { teardown(true); });
  }

  function startCloseBook(book) {
    if (!alive) return;
    phase = 'closing';
    book.counter.classList.remove('is-visible');
    book.caption.classList.remove('is-visible');
    book.pen.classList.remove('is-visible');
    book.book.classList.add('is-closing');
    flash();
    later(1180, revealProfile);
  }

  function runFullSequence(book, name) {
    if (!alive) return;
    phase = 'book-enter';
    book.stage.classList.add('is-visible');
    scheduleFrame(function () { book.book.classList.add('is-arrived'); });
    later(CONFIG.bookEnterMs, function () {
      if (!alive) return;
      phase = 'opening';
      book.book.classList.add('is-open');
      book.cover.classList.add('is-open');
      flash();
      later(CONFIG.bookOpenMs, function () {
        if (!alive) return;
        phase = 'writing';
        drawName(book, name).then(function () {
          if (!alive) return;
          phase = 'countdown';
          runCountdown(book).then(function () {
            if (alive) startCloseBook(book);
          });
        });
      });
    });
  }

  var eyeRefs = null;
  var onKey = function (e) {
    if (e.key === 'Escape') { e.preventDefault(); abortIntro(); return; }
    if (e.key === 'Enter' && phase === 'eyes') {
      e.preventDefault();
      e.stopPropagation();
      enterBook();
    }
  };
  var onPointer = function (e) {
    if (phase !== 'eyes' || entered) return;
    if (e.button != null && e.button !== 0) return;
    enterBook();
  };

  function enterBook() {
    if (!alive || phase !== 'eyes' || entered) return;
    entered = true;
    phase = 'eyes-closing';
    if (eyeRefs) {
      eyeRefs.title.classList.add('is-out');
      eyeRefs.info.classList.add('is-out');
      eyeRefs.prompt.style.opacity = '0';
      tweenEyes(eyeRefs, 0, 1, CONFIG.eyeCloseMs, function () {
        eyeRefs.eyes.classList.remove('is-visible');
        eyeRefs.eyes.classList.add('is-out');
        later(260, function () {
          eyeRefs.eyes.remove(); eyeRefs.title.remove(); eyeRefs.info.remove(); eyeRefs.prompt.remove();
          var name = eyeRefs.profileName || 'Visitante';
          var book = createBookScene();
          runFullSequence(book, name);
        });
      });
    }
  }

  function run(profile) {
    if (!alive) return;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    audio = make('audio', { id: 'dn-kira-laugh', preload: 'auto', src: CONFIG.audioUrl }, document.body);
    audio.volume = CONFIG.audioVolume;
    audio.addEventListener('error', function () { });
    audio.addEventListener('ended', function () {
      if (audioButton) { audioButton.remove(); audioButton = null; }
      if (audio && audio.parentNode) audio.remove();
      audio = null;
    });

    eyeRefs = makeRoot(profile);
    eyeRefs.profileName = profile.name || 'Visitante';
    phase = 'eyes';
    root.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey, true);
    scheduleFrame(function () { root.classList.add('is-visible'); eyeRefs.eyes.classList.add('is-visible'); });
    tweenEyes(eyeRefs, 1, 0, CONFIG.eyeOpenMs);
    
    if (!CONFIG.reducedMotion) {
      var shakeStart = performance.now();
      function shake(ts) {
        if (!alive || phase !== 'eyes') return;
        var elapsed = ts - shakeStart;
        var strength = elapsed < 600 ? 1 : .22;
        var x = (Math.random() - .5) * 5 * strength;
        var y = (Math.random() - .5) * 4 * strength;
        var r = (Math.random() - .5) * .16 * strength;
        root.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + r.toFixed(3) + 'deg)';
        scheduleFrame(shake);
      }
      scheduleFrame(shake);
    }
    later(60000, function () { if (alive && phase !== 'complete') abortIntro(); });
  }

  window.addEventListener('error', function (e) {
    if (alive && root && e && /dn-master|Death_Note|createBookScene|drawName/i.test(String(e.message || ''))) abortIntro();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { getProfile().then(run); }, { once: true });
  } else {
    getProfile().then(run);
  }
})();
/* Fim entrada Death Note */

/* Simo Haya */
(function() {
    // Verifica se é a página do Simo Häyhä (usamos 'includes' para evitar problemas com o 'ä' na URL)
    const pageName = mw.config.get("wgPageName");
    if (!pageName || !pageName.includes("Simo_H") || !pageName.includes("Shuumatsu")) {
        return;
    }

    // Evita duplicar se já estiver a rodar
    if (document.getElementById("simo-intro-overlay")) return;

    // 1. ESTILOS DA EMBOSCADA (Tiros, Fumaça e Tremores)
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
        /* Overlay que serve como o "vidro" do monitor */
        .simo-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 2147483647; /* Acima de tudo na Fandom */
            pointer-events: none; /* Deixa ver a página por trás, mas os tiros ficam em cima */
            background-color: transparent;
            overflow: hidden;
            transition: opacity 1.5s ease;
        }
        .simo-overlay.fade-out {
            opacity: 0;
        }

        /* O clarão do tiro do rifle */
        .simo-flash {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: #ffffff; opacity: 0; pointer-events: none; z-index: 5;
        }
        .simo-flash.active {
            animation: sniperFlash 0.15s ease-out;
        }
        @keyframes sniperFlash {
            0% { opacity: 0.9; }
            100% { opacity: 0; }
        }

        /* Tremor violento na tela inteira */
        body.simo-shake-active {
            animation: sniperShake 0.2s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes sniperShake {
            0% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(-15px, 15px) rotate(-1deg); }
            40% { transform: translate(15px, -15px) rotate(1.5deg); }
            60% { transform: translate(-10px, 10px) rotate(-0.5deg); }
            80% { transform: translate(10px, -10px) rotate(0.5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* O buraco e estilhaços de vidro */
        .simo-crack {
            position: absolute; transform: translate(-50%, -50%) scale(0);
            pointer-events: none; z-index: 2;
            animation: crackAppear 0.05s ease-out forwards;
            filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.8));
        }
        @keyframes crackAppear {
            to { transform: translate(-50%, -50%) scale(1); }
        }

        /* Fumaça do impacto da bala */
        .simo-smoke {
            position: absolute; transform: translate(-50%, -50%) scale(0.2);
            width: 140px; height: 140px;
            background: radial-gradient(circle, rgba(230, 235, 240, 0.9) 0%, rgba(180, 180, 180, 0.5) 40%, rgba(0,0,0,0) 70%);
            border-radius: 50%; pointer-events: none; z-index: 3;
            opacity: 1; filter: blur(5px);
            animation: smokeExpand 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        @keyframes smokeExpand {
            0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; filter: blur(2px); }
            50% { transform: translate(-50%, -70%) scale(1.5); opacity: 0.6; filter: blur(10px); }
            100% { transform: translate(-50%, -100%) scale(2.5); opacity: 0; filter: blur(20px); }
        }
    `;
    document.head.appendChild(styleEl);

    const overlay = document.createElement("div");
    overlay.id = "simo-intro-overlay";
    overlay.className = "simo-overlay";

    const flash = document.createElement("div");
    flash.className = "simo-flash";
    overlay.appendChild(flash);
    document.body.appendChild(overlay);

    // Função que gera as rachaduras em formato de teia de aranha (SVG)
    function getCrackSVG(rot) {
        return `
        <svg viewBox="0 0 200 200" style="transform: rotate(${rot}deg); width: 100%; height: 100%;">
            <!-- Buraco central da bala -->
            <circle cx="100" cy="100" r="4" fill="#000" />
            <circle cx="100" cy="100" r="8" fill="rgba(0,0,0,0.7)" />
            <circle cx="100" cy="100" r="10" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" />
            
            <!-- Rachaduras principais -->
            <path d="M100 100 L20 20 M100 100 L180 30 M100 100 L170 180 M100 100 L30 160 M100 100 L50 90 M100 100 L100 15 M100 100 L190 100" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round" fill="none" />
            
            <!-- Estilhaços secundários -->
            <path d="M100 100 L5 50 M100 100 L150 5 M100 100 L195 195 M100 100 L5 195" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round" fill="none" />
            
            <!-- Ligações transversais da teia de vidro -->
            <path d="M50 90 L20 20 M180 30 L190 100 M170 180 L30 160" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="none" />
        </svg>
        `;
    }

    // Função que executa um tiro
    function fireShot(x, y, isHeadshot) {
        // 1. Tremor na tela
        document.body.classList.remove("simo-shake-active");
        void document.body.offsetWidth; // Força o reflow do navegador para reiniciar a animação
        document.body.classList.add("simo-shake-active");

        // 2. Clarão branco
        flash.classList.remove("active");
        void flash.offsetWidth;
        flash.classList.add("active");

        // 3. Rachadura do Vidro
        const crack = document.createElement("div");
        crack.className = "simo-crack";
        crack.style.left = x + "vw";
        crack.style.top = y + "vh";
        
        // Se for o tiro final (Headshot no centro), o estrago no vidro é maior
        const size = isHeadshot ? 450 : (Math.random() * 100 + 200); 
        crack.style.width = size + "px";
        crack.style.height = size + "px";
        crack.innerHTML = getCrackSVG(Math.random() * 360);
        overlay.appendChild(crack);

        // 4. Fumaça saindo do buraco
        const smoke = document.createElement("div");
        smoke.className = "simo-smoke";
        smoke.style.left = x + "vw";
        smoke.style.top = y + "vh";
        if (isHeadshot) {
            smoke.style.width = "200px"; 
            smoke.style.height = "200px";
        }
        overlay.appendChild(smoke);
    }

    // Cronograma dos tiros (5 tiros no total)
    // Coordenadas espalhadas para simular o atirador ajustando a mira, com o último bem no centro.
    const shots = [
        { delay: 300,  x: 20 + Math.random()*15, y: 30 + Math.random()*20, final: false }, // Superior esquerdo
        { delay: 900,  x: 75 + Math.random()*10, y: 25 + Math.random()*15, final: false }, // Superior direito
        { delay: 1500, x: 80 + Math.random()*10, y: 70 + Math.random()*15, final: false }, // Inferior direito
        { delay: 2100, x: 30 + Math.random()*15, y: 75 + Math.random()*10, final: false }, // Inferior esquerdo
        { delay: 2800, x: 50, y: 50, final: true } // Tiro Final Perfeito no Centro
    ];

    // Dispara a sequência
    shots.forEach(shot => {
        setTimeout(() => {
            fireShot(shot.x, shot.y, shot.final);
        }, shot.delay);
    });

    // 2 Segundos após o ÚLTIMO tiro (2800ms + 2000ms de espera = 4800ms)
    setTimeout(() => {
        // Dissolve os estilhaços e a fumaça
        overlay.classList.add("fade-out");
        
        // Remove a classe de tremor do body por segurança
        document.body.classList.remove("simo-shake-active");
        
        // Destrói os elementos após o fade out para não pesar a página
        setTimeout(() => {
            overlay.remove();
        }, 1500);
    }, 4800);

})();
/* fim do simo */

/* Começa de Ihwa */
(function() {
    const TARGET_PAGE = "Blog_de_usuário:Whitekl/Ihwa"; 
    const TARGET_HREF = "Whitekl/Ihwa";
    const isTargetPage = mw.config.get("wgPageName") === TARGET_PAGE;

    // ==========================================
    // 1. ESTILOS GLOBAIS (EXPLOSÃO E TRANSIÇÃO)
    // ==========================================
    if (!document.getElementById("iwha-global-styles")) {
        const globalStyles = document.createElement("style");
        globalStyles.id = "iwha-global-styles";
        globalStyles.innerHTML = `
            .iwha-explosion-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                z-index: 2147483647; pointer-events: none;
                display: flex; align-items: center; justify-content: center;
                overflow: hidden; background: transparent;
            }
            .iwha-explosion-wrapper.black-bg { background: #000000; }
            
            .iwha-slash-line {
                position: absolute; height: 3px; background: #ff0033;
                box-shadow: 0 0 20px #ff0033, 0 0 40px #990000;
                top: 50%; left: 50%; transform-origin: center;
                animation: iwhaSlashDraw 0.5s ease-out forwards, iwhaSlashGather 0.6s cubic-bezier(0.8, 0, 0.2, 1) var(--delay-gather) forwards;
            }
            @keyframes iwhaSlashDraw { 
                0% { width: 0; opacity: 0; transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(0); } 
                100% { width: 150vw; opacity: 1; transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(1); } 
            }
            @keyframes iwhaSlashGather { 
                0% { transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(1); opacity: 1; } 
                100% { transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(0); opacity: 1; } 
            }
            
            .iwha-blast-core {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 0; height: 0; border-radius: 50%; background: #ffffff;
                box-shadow: 0 0 100px 50px #ff0033, 0 0 200px 100px #880015; opacity: 0;
                animation: iwhaBlastOut 0.8s ease-out 1.5s forwards;
            }
            @keyframes iwhaBlastOut {
                0% { width: 0; height: 0; opacity: 1; }
                30% { width: 80vw; height: 80vw; background: #ffffff; opacity: 1; }
                100% { width: 300vw; height: 300vw; background: #000000; box-shadow: none; opacity: 1; }
            }
        `;
        document.head.appendChild(globalStyles);
    }

    // Função que gera a Explosão Visual nas outras páginas
    function triggerExplosion(isBlackBg, callback) {
        const wrapper = document.createElement("div");
        wrapper.className = "iwha-explosion-wrapper" + (isBlackBg ? " black-bg" : "");
        
        for(let i=0; i<12; i++) {
            const slash = document.createElement("div");
            slash.className = "iwha-slash-line";
            slash.style.setProperty('--rot', (Math.random() * 180) + 'deg');
            slash.style.animationDelay = (Math.random() * 0.2) + 's';
            slash.style.setProperty('--delay-gather', (1.0 + Math.random() * 0.2) + 's');
            wrapper.appendChild(slash);
        }

        const blast = document.createElement("div");
        blast.className = "iwha-blast-core";
        wrapper.appendChild(blast);
        
        document.body.appendChild(wrapper);

        setTimeout(() => { if(callback) callback(wrapper); }, 2300);
    }

    // ==========================================
    // 2. INTERCEPTADOR GLOBAL
    // ==========================================
    if (!isTargetPage) {
        document.addEventListener("click", function(e) {
            const link = e.target.closest("a");
            if (link && link.href.includes(TARGET_HREF)) {
                if (e.button === 0 && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    e.preventDefault();
                    triggerExplosion(false, function() {
                        sessionStorage.setItem("iwha_transition_done", "true");
                        window.location.href = link.href; 
                    });
                }
            }
        });
        return; 
    }

    // ==========================================
    // 3. O PERFIL DA IHWA
    // ==========================================

    if (document.getElementById("iwha-intro-overlay")) return;

    // Remove o scroll da página enquanto a intro rola
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const eyeStyles = document.createElement("style");
    eyeStyles.innerHTML = `
        .iwha-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: #000000 !important; /* CORRIGIDO: Preto absoluto para barrar vazamento */
            z-index: 2147483646;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            overflow: hidden; transition: opacity 1.2s ease;
        }
        .iwha-overlay.fade-out { opacity: 0; pointer-events: none; }

        .iwha-eye-container::before {
            content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 150vw; height: 150vh;
            background: radial-gradient(circle at center, rgba(160, 0, 25, 0.25) 0%, rgba(50, 0, 10, 0.1) 30%, rgba(0,0,0,0) 65%);
            z-index: -1; pointer-events: none; animation: pulseMassiveAura 4s infinite alternate ease-in-out;
        }
        @keyframes pulseMassiveAura {
            0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
            100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }

        @keyframes iwhaShake {
            0%, 100% { transform: translate(0, 0); }
            15% { transform: translate(-3px, 2px); }
            30% { transform: translate(3px, -2px); }
            45% { transform: translate(-2px, -3px); }
            60% { transform: translate(3px, 3px); }
            75% { transform: translate(-3px, -1px); }
            90% { transform: translate(2px, 2px); }
        }
        .iwha-eye-container { position: relative; z-index: 3; animation: iwhaShake 0.4s infinite ease-in-out; }
        .iwha-eye-svg { width: 600px; max-width: 95vw; height: auto; overflow: visible; }

        .iwha-cut-line { animation: iwhaFlashLine 1.4s ease-in-out forwards; }
        @keyframes iwhaFlashLine {
            0% { opacity: 0; stroke-width: 1px; }
            30% { opacity: 1; stroke-width: 6px; filter: drop-shadow(0 0 20px #ff0033); }
            60% { opacity: 1; stroke-width: 3px; }
            100% { opacity: 0; stroke-width: 0; }
        }

        .iwha-eyelid-top { transform: translateY(0); transition: transform 2.5s cubic-bezier(0.8, 0, 0.2, 1); }
        .iwha-eyelid-bottom { transform: translateY(0); transition: transform 2.5s cubic-bezier(0.8, 0, 0.2, 1); }
        
        .iwha-eyelid-top.is-open { transform: translateY(-130px); }
        .iwha-eyelid-bottom.is-open { transform: translateY(130px); }
        
        .iwha-eyelid-top.is-closed { transform: translateY(0); transition: transform 0.4s cubic-bezier(0.7, 0, 0.1, 1); }
        .iwha-eyelid-bottom.is-closed { transform: translateY(0); transition: transform 0.4s cubic-bezier(0.7, 0, 0.1, 1); }

        .iwha-iris, .iwha-iris-inner { opacity: 0; animation: iwhaFadeInElement 1.5s ease 0.6s forwards; }
        .iwha-pupil { opacity: 0; transform-origin: 300px 150px; animation: iwhaFadeInElement 1.5s ease 0.6s forwards, pupilTwitch 4s infinite ease-in-out 2s; }
        @keyframes iwhaFadeInElement { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes pupilTwitch {
            0%, 100% { transform: scale(1); } 25% { transform: scale(1.15); }
            30% { transform: scale(0.9); } 50% { transform: scale(1.05); } 80% { transform: scale(0.95); }
        }

        .flare-line { stroke-dasharray: 200; stroke-dashoffset: 200; animation: shootFlares 2.5s infinite ease-out; }
        @keyframes shootFlares {
            0% { stroke-dashoffset: 200; opacity: 0; }
            20% { opacity: var(--flare-opacity, 0.8); }
            80% { stroke-dashoffset: -50; opacity: 0; }
            100% { stroke-dashoffset: -200; opacity: 0; }
        }

        .iwha-background-chaos { position: absolute; width: 100vw; height: 100vh; top: 0; left: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .chaos-text-fragment {
            position: absolute; font-family: 'Courier New', monospace; font-weight: 900;
            color: rgba(255, 0, 51, 0.15); text-shadow: 0 0 10px rgba(255, 0, 51, 0.4); white-space: nowrap; opacity: 0;
        }
        @keyframes driftAndFade {
            0% { opacity: 0; transform: translate(0, 0) scale(0.9); filter: blur(2px); }
            30% { opacity: var(--max-opacity, 0.4); filter: blur(0px); }
            70% { opacity: var(--max-opacity, 0.4); filter: blur(0px); }
            100% { opacity: 0; transform: translate(var(--move-x), var(--move-y)) scale(1.1); filter: blur(4px); }
        }

        .iwha-dialogue {
            position: absolute; bottom: 18%; z-index: 4; font-size: 2.2rem; font-weight: bold; color: #ffffff;
            text-shadow: 0 0 15px #ff0033, 0 0 30px #990011; opacity: 0; animation: iwhaDialogueShow 2.5s ease 1.5s forwards;
            font-family: sans-serif; letter-spacing: 1px;
        }
        .iwha-dialogue ruby rt { font-size: 0.85rem; color: #ff4d6d; font-weight: bold; }
        @keyframes iwhaDialogueShow {
            0% { opacity: 0; transform: translateY(25px); filter: blur(5px); }
            25% { opacity: 1; transform: translateY(0); filter: blur(0px); }
            100% { opacity: 0.9; transform: translateY(-5px); }
        }

        .iwha-prompt {
            position: absolute; bottom: 6%; z-index: 4; font-size: 0.9rem; color: rgba(255, 255, 255, 0.5);
            letter-spacing: 3px; font-family: 'Courier New', monospace; opacity: 0;
            animation: iwhaFadeInElement 0.5s ease 2s forwards, iwhaBlinkPrompt 1.5s infinite ease-in-out 2s;
        }
        @keyframes iwhaBlinkPrompt { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
    `;
    document.head.appendChild(eyeStyles);

    function startEyeSequence() {
        const overlay = document.createElement("div");
        overlay.id = "iwha-intro-overlay";
        overlay.className = "iwha-overlay";
        
        const chaosContainer = document.createElement("div");
        chaosContainer.className = "iwha-background-chaos";
        const frasesDooms = ["온몸에 식은땀이 흘러내렸다.", "그의 머릿속은 한순간 새하얗게 비어버렸다……", "불가능. 불가능. 불가능. 불가능.", "승리할 가능성: 없음 없음 없음", "오직 하나만이 떠올랐다."];
        for (let i = 0; i < 30; i++) {
            const span = document.createElement("div");
            span.className = "chaos-text-fragment";
            span.innerText = frasesDooms[Math.floor(Math.random() * frasesDooms.length)];
            span.style.top = (Math.random() * 110 - 5) + "%"; span.style.left = (Math.random() * 110 - 5) + "%";
            span.style.fontSize = (Math.random() * 1.5 + 1.2) + "rem";
            span.style.setProperty('--move-x', (Math.random() * 20 - 10) + 'vw');
            span.style.setProperty('--move-y', (Math.random() * 20 - 10) + 'vh');
            span.style.setProperty('--max-opacity', (Math.random() * 0.4 + 0.15));
            if (Math.random() > 0.6) span.style.writingMode = "vertical-rl";
            span.style.animation = `driftAndFade ${Math.random() * 6 + 5}s infinite ease-in-out ${Math.random() * 4}s`;
            chaosContainer.appendChild(span);
        }
        overlay.appendChild(chaosContainer);

        let flaresHTML = '';
        for (let i = 0; i < 24; i++) {
            flaresHTML += `<path class="flare-line" d="M 300 150 C ${300 + Math.random()*80} ${100 + Math.random()*80}, ${400 + Math.random()*50} ${200 - Math.random()*50}, 580 150" stroke="#ff0033" stroke-width="${Math.random() * 3 + 1.5}" fill="none" style="transform-origin: 300px 150px; transform: rotate(${Math.random() * 360}deg); animation-duration: ${Math.random() * 1.5 + 1.5}s; animation-delay: ${Math.random() * 2 + 1}s; --flare-opacity: ${Math.random() * 0.5 + 0.5};" />`;
        }

        const eyeWrapper = document.createElement("div");
        eyeWrapper.className = "iwha-eye-container";
        eyeWrapper.innerHTML = `
            <svg class="iwha-eye-svg" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="iwha-iris-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur2" />
                        <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="socket-shadow" cx="50%" cy="50%" r="50%">
                        <stop offset="50%" stop-color="#0a0002" /> <stop offset="85%" stop-color="#140003" /> <stop offset="100%" stop-color="#000000" />
                    </radialGradient>
                </defs>
                <g filter="url(#iwha-iris-glow)">${flaresHTML}</g>
                <ellipse cx="300" cy="150" rx="160" ry="75" fill="url(#socket-shadow)" class="iwha-eyeball" />
                <circle cx="300" cy="150" r="52" fill="#880015" class="iwha-iris" filter="url(#iwha-iris-glow)" />
                <circle cx="300" cy="150" r="42" fill="#ff1a3c" class="iwha-iris-inner" />
                <circle cx="300" cy="150" r="35" fill="#ff4d6d" opacity="0.9" />
                <circle cx="300" cy="150" r="14" fill="#000000" class="iwha-pupil" />
                
                <path d="M -3000 150 C 180 60, 420 70, 3600 150 L 3600 -3000 L -3000 -3000 Z" fill="#000000" class="iwha-eyelid-top" />
                <path d="M -3000 150 C 180 240, 420 230, 3600 150 L 3600 3000 L -3000 3000 Z" fill="#000000" class="iwha-eyelid-bottom" />
                <path d="M 120 150 C 200 145, 400 155, 480 150" stroke="#ff0033" stroke-width="5" fill="none" stroke-linecap="round" class="iwha-cut-line" />
            </svg>
        `;
        overlay.appendChild(eyeWrapper);

        const dialogue = document.createElement("div");
        dialogue.className = "iwha-dialogue";
        dialogue.innerHTML = `헬로. <ruby>헬<rt>Hell</rt></ruby>로 가라고.`;
        overlay.appendChild(dialogue);

        const prompt = document.createElement("div");
        prompt.className = "iwha-prompt";
        prompt.innerText = "[ PRESSIONE ENTER OU TOQUE NA TELA ]";
        overlay.appendChild(prompt);

        document.body.appendChild(overlay);

        setTimeout(() => {
            const topLid = document.querySelector('.iwha-eyelid-top');
            const bottomLid = document.querySelector('.iwha-eyelid-bottom');
            if(topLid) topLid.classList.add('is-open');
            if(bottomLid) bottomLid.classList.add('is-open');
        }, 900);

        function dismissOverlay() {
            const topLid = document.querySelector('.iwha-eyelid-top');
            const bottomLid = document.querySelector('.iwha-eyelid-bottom');
            if(topLid) { topLid.classList.remove('is-open'); topLid.classList.add('is-closed'); }
            if(bottomLid) { bottomLid.classList.remove('is-open'); bottomLid.classList.add('is-closed'); }
            
            setTimeout(() => {
                overlay.classList.add("fade-out");
                
                // GATILHO QUE AVISA O CSS PARA REVELAR A PÁGINA
                document.body.classList.add("reveal-ihwa-profile");
                
                document.body.style.overflow = "auto";
                document.documentElement.style.overflow = "auto";
                
                setTimeout(() => overlay.remove(), 1200);
            }, 450);
        }

        overlay.addEventListener("click", dismissOverlay);
        document.addEventListener("keydown", function(event) {
            if (event.key === "Enter") dismissOverlay();
        });
    }

    function initIhwaPage() {
        if (sessionStorage.getItem("iwha_transition_done")) {
            sessionStorage.removeItem("iwha_transition_done");
            startEyeSequence();
        } else {
            triggerExplosion(true, function(wrapper) {
                wrapper.remove(); 
                startEyeSequence();
            });
        }
    }

    if (document.body) {
        initIhwaPage();
    } else {
        document.addEventListener("DOMContentLoaded", initIhwaPage);
    }
})();
/* Fim da Ihwa */

/* Texto de Visual Novel */
mw.hook('wikipage.content').add(function($content) {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var $el = $(entry.target);
                var fullText = $el.attr('data-text');
                
                if ($el.data('timer')) {
                    clearInterval($el.data('timer'));
                }
                
                $el.empty();
                var i = 0;
                var speed = 30; 
                
                var timer = setInterval(function() {
                    if (i < fullText.length) {
                        $el.append(fullText.charAt(i));
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, speed);
                
                $el.data('timer', timer);
            }
        });
    });

    $content.find('.vn-typewriter').each(function() {
        var $el = $(this);
        if (!$el.attr('data-text')) {
            $el.attr('data-text', $el.text().trim());
        }
        $el.empty();
        observer.observe(this);
    });
});
/* fim do texto de VN */

/* Pegar imagem dos usuários na Pergunta e Respostas */
mw.hook('wikipage.content').add(function($content) {
if ($content.find('.avatar-dinamico-usuario').length === 0) return;
var userId = mw.config.get('wgUserId');
if (!userId) return;
$.getJSON('/api/v1/User/Details', { ids: userId })
.done(function(data) {
if (data && data.items && data.items.length > 0) {
var avatarUrl = data.items[0].avatar;
$content.find('.avatar-dinamico-usuario').html('<img src="' + avatarUrl + '" style="width: 100%; height: 100%; object-fit: cover;">');
}
});
});
/* Fim da Imagem Perguntas e Respostas */


/* Pergaminho interativo - ativa em qualquer página que tenha .pgm-pergaminho */
mw.hook('wikipage.content').add(function ($content) {
    $content.find('.pgm-pergaminho').each(function () {
        var pergaminho = this;
        if (pergaminho.dataset.pgmReady) return; // evita registrar 2x
        pergaminho.dataset.pgmReady = '1';

        // abrir / fechar
        pergaminho.addEventListener('click', function (e) {
            if (e.target.closest('.pgm-btn')) return;
            pergaminho.classList.toggle('pgm-aberto');
        });

        // botões internos
        var resposta = pergaminho.querySelector('.pgm-resposta');
        pergaminho.querySelectorAll('.pgm-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!resposta) return;
                resposta.textContent = btn.getAttribute('data-msg') || '';
                resposta.style.opacity = 0;
                requestAnimationFrame(function () {
                    resposta.style.transition = 'opacity .4s ease';
                    resposta.style.opacity = 1;
                });
            });
        });
    });
});
/* Fim do Pergaminho */

/* Textos Bahlavan */
(function() {
    let animacaoShuraExecutada = false;

    const dialogosShura = [
        {
            jp: '「なあ、おい貴様。自分がもっとも強いと信じるなら、なぜ戦うのだ」',
            pt: '「Ei, você aí. Se acredita ser o mais forte, por que luta?」'
        },
        {
            jp: '「出会えば殺す。誰であろうと皆殺す。しかし互いに認めなければ手を出さんのは、不意 打ちだからか? 卑怯だとでも? どちらが強いか分からなくなるなどという戯言を、自 称最強がなぜ口にする」',
            pt: '「Vê alguém, mata. Mata todos sem exceção. Mas quando não há reconhecimento mútuo, você não ataca, é por achar que seria uma emboscada? Que seria covarde? Por que um autoproclamado “mais forte” fala essa idiotice de “ficar sem saber qual dos dois é mais forte”?」'
        },
        {
            jp: '「貴様は単に殺し合うのが好きなだけだ」',
            pt: '「No fim, você só gosta do ato de matar」'
        },
        {
            jp: '「自分が最強だと謳った舌の根も乾かん内に、最強の座を掴むと言う。地位を守っている のか目指しているのかいったいどっちだ? 一貫性がないんだよ、ゆえにぶれる。正直意 味不明だったが、貴様も気付いていない戒律があるのは理解した。察するに、生まれる前の話だろう」',
            pt: '「Mal secou a língua com que você proclamou ser o mais forte, e já diz que vai conquistar o Trono do mais forte. Afinal, está defendendo essa posição ou tentando alcançá-la? Qual dos dois? Não há coerência, por isso você vacila. Para ser honesto, era algo sem sentido, mas percebi que existe um Mandamento do qual nem você mesmo tem consciência. Suponho que seja algo de antes de você nascer」'
        },
        {
            jp: '「理屈はともかく、貴様は貴様だけの世界で一度最強とやらの座を取ったようだな。そし てそれに無自覚だ。王者と挑戦者の両面がある原因はそこだと見るが、まあ勝手にしろ。 俺が言いたいのは、戦うのが好きなことと勝つのが好きなことは、必ずしも一致せんという話だ」',
            pt: '「Lógica à parte, parece que você já tomou esse tal Trono do mais forte em um mundo só seu. E nem percebeu. A causa de você carregar simultaneamente o lado do rei e o do desafiante está aí, mas faça como quiser. O que quero dizer é simples: gostar de lutar e gostar de vencer não são, necessariamente, a mesma coisa」'
        },
        {
            jp: '「 これが礼だ。貴様程度に勝てんようでは、しょせん俺も高が知れる」',
            pt: '「Isto é o meu presente. Se eu não conseguir vencer alguém do teu nível, então, no fim das contas, eu também não valho muito」'
        },
        {
            jp: '「俺は戦うのが好きなわけじゃない」',
            pt: '「Sabe, eu não gosto de lutar」'
        },
        {
            jp: '「殺しも特に好んではいない」',
            pt: '「Nem gosto especialmente de matar」'
        },
        {
            jp: '「だが負けん。俺の道は生涯不敗——」',
            pt: '「Mas não perderei. Meu caminho é invicto por toda a vida——」'
        },
        {
            jp: '「それこそ俺の不変なるもの。貴様らの無知さ無力さ愚かさを、ああ肯定しよう―――例外 なく呑み込んでやる」',
            pt: '「Isso é o meu “eu” Imutável. A ignorância, a impotência e a estupidez de vocês･･････ Eu as afirmarei, engolirei tudo sem exceção」'
        },
        {
            jp: '「一緒にするなと言ったはずだが?･･････まあいい、めでたい頭に俺が誰かをぶち込んでやる」',
            pt: '「Eu disse para não me colocar ao seu lado, não disse? ･･････Muito bem. Vou enfiar na sua cabeça dura quem eu realmente sou」'
        }
    ];

    let indiceAtual = 0;
    let podeAvancar = false;

    mw.hook('wikipage.content').add(function() {
        if (window.shuraListenerAttached) return;
        window.shuraListenerAttached = true;

        document.addEventListener('click', function(e) {
            if (!e.target.closest('#shura-tabber-wrapper')) return;

            const tab = e.target.closest('.wds-tabs__tab, .tabbernav li, a, .wds-tabs__tab-label');
            if (tab && tab.textContent.includes('O Conceito de Shura')) {
                if (!animacaoShuraExecutada) {
                    animacaoShuraExecutada = true;
                    iniciarTelaPreta();
                } else {
                    revelarAba();
                }
            }
        });
    });

    function iniciarTelaPreta() {
        let overlay = document.getElementById('shura-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'shura-overlay';
            
            overlay.innerHTML = `
                <img id="shura-img-left" class="shura-side-img" src="https://static.wikia.nocookie.net/animeverso/images/6/65/Magsarion.webp/revision/latest/scale-to-width-down/381?cb=20260929204944&path-prefix=pt-br">
                <img id="shura-img-right" class="shura-side-img" src="https://static.wikia.nocookie.net/animeverso/images/6/65/Magsarion.webp/revision/latest/scale-to-width-down/381?cb=20260929204944&path-prefix=pt-br">
                
                <div class="shura-jp-container" id="jp-box"></div>
                <div class="shura-traducao" id="pt-box"></div>
                <div class="shura-instrucao" id="instrucao-box">[ Pressione ENTER ou TOQUE NA TELA ]</div>
            `;
            document.body.appendChild(overlay);
        }

        setTimeout(() => {
            overlay.classList.add('ativo');
        }, 50);

        setTimeout(() => {
            tocarDialogo(indiceAtual);
        }, 2000); 
    }

    function tocarDialogo(index) {
        podeAvancar = false;
        const jpBox = document.getElementById('jp-box');
        const ptBox = document.getElementById('pt-box');
        const instrucaoBox = document.getElementById('instrucao-box');
        
        const imgLeft = document.getElementById('shura-img-left');
        const imgRight = document.getElementById('shura-img-right');

        jpBox.innerHTML = '';
        ptBox.innerHTML = '';
        instrucaoBox.classList.remove('visivel');

        // LÓGICA DE FADE IN E FADE OUT
        if (index >= 0 && index <= 4) {
            // Inicia o movimento e faz o Fade In na esquerda
            imgLeft.classList.add('animacao-esquerda');
            imgLeft.classList.add('visivel');
            // Garante que a direita está invisível
            imgRight.classList.remove('visivel');
        } else if (index >= 5 && index <= 9) {
            // Faz o Fade Out na esquerda (sem quebrar o movimento dela)
            imgLeft.classList.remove('visivel');
            
            // Inicia o movimento e faz o Fade In na direita
            imgRight.classList.add('animacao-direita');
            imgRight.classList.add('visivel');
        } else {
            // Frase final: Faz o Fade Out na direita lentamente
            imgLeft.classList.remove('visivel');
            imgRight.classList.remove('visivel');
        }

        const fraseJp = dialogosShura[index].jp;
        const frasePt = dialogosShura[index].pt;

        fraseJp.split('').forEach((char) => {
            let span = document.createElement('span');
            span.className = 'shura-char';
            span.textContent = char;
            jpBox.appendChild(span);
        });

        const palavrasPt = frasePt.split(' ');
        palavrasPt.forEach((palavra, pIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            palavra.split('').forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'shura-pt-char';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            });

            ptBox.appendChild(wordSpan);

            if (pIdx < palavrasPt.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'shura-pt-char';
                spaceSpan.innerHTML = '&nbsp;';
                ptBox.appendChild(spaceSpan);
            }
        });

        let tempoAtrasoJp = 0;
        jpBox.querySelectorAll('.shura-char').forEach((el) => {
            setTimeout(() => {
                el.classList.add('animar');
            }, tempoAtrasoJp);
            tempoAtrasoJp += 35; 
        });

        let tempoAtrasoPt = tempoAtrasoJp + 150; 
        ptBox.querySelectorAll('.shura-pt-char').forEach((el) => {
            setTimeout(() => {
                el.classList.add('animar');
            }, tempoAtrasoPt);
            tempoAtrasoPt += 20; 
        });

        setTimeout(() => {
            instrucaoBox.classList.add('visivel');
            podeAvancar = true;
            habilitarAvanco();
        }, tempoAtrasoPt + 500);
    }

    function habilitarAvanco() {
        const overlay = document.getElementById('shura-overlay');
        
        const avancarScript = (e) => {
            if (!podeAvancar) return;
            
            if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
                document.removeEventListener('keydown', avancarScript);
                overlay.removeEventListener('click', avancarScript);
                
                indiceAtual++;
                
                if (indiceAtual < dialogosShura.length) {
                    document.getElementById('jp-box').innerHTML = '';
                    document.getElementById('pt-box').innerHTML = '';
                    document.getElementById('instrucao-box').classList.remove('visivel');
                    
                    setTimeout(() => {
                        tocarDialogo(indiceAtual);
                    }, 400); 
                } else {
                    overlay.classList.remove('ativo');
                    revelarAba();
                    setTimeout(() => overlay.remove(), 2500);
                }
            }
        };

        document.addEventListener('keydown', avancarScript);
        overlay.addEventListener('click', avancarScript);
    }

    function revelarAba() {
        const segredo = document.getElementById('shura-conteudo-secreto');
        if (segredo) {
            segredo.style.display = 'block';
            setTimeout(() => {
                segredo.classList.add('revelado');
            }, 50);
        }
    }
})();
/* Fim de Textos Bahlavan */

/* ===== LAZY LOAD KUMAGAWA ===== */
(function(){
  if(document.body.className.indexOf('kumagawarework') === -1) return;

  /* pausa todas as animações CSS imediatamente */
  var style = document.createElement('style');
  style.textContent = '* { animation-play-state: paused !important; }';
  document.head.appendChild(style);

  /* só retoma animações quando elemento entra na tela */
  if(!('IntersectionObserver' in window)){
    style.textContent = '';
    return;
  }

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.style.animationPlayState = 'running';
        entry.target.querySelectorAll('*').forEach(function(el){
          el.style.animationPlayState = 'running';
        });
        obs.unobserve(entry.target);
      }
    });
  }, {rootMargin: '150px'});

  setTimeout(function(){
    document.querySelectorAll(
      '.scrollable-animated-screw, .scrollable-static, .wds-tab__content'
    ).forEach(function(el){ obs.observe(el); });
  }, 200);

})();
/* ===== FIM LAZY LOAD KUMAGAWA ===== */

/*Ofuscator*/
function initObfuscator() {
    const elements = document.querySelectorAll('.obfu-text');
    elements.forEach(function(el) {
        const data = {
            delay: parseInt(el.dataset.delay) || 0,
            startTime: parseInt(el.dataset.start) || 40,
            endTime: parseInt(el.dataset.end) || 40,
            dispTime: parseInt(el.dataset.disp) || 2000,
            loop: true,
            chars: "░▒▓▖▗▘▙▚▛▜▝▞▟",
            phrases: el.dataset.phrases.split('|')
        };

        let phraseIndex = 0;
        let frame = 0;
        let phase = 'scramble_in';
        let displayed = '';

        function scramble(target, progress) {
            return target.split('').map(function(ch, i) {
                if (ch === ' ') return ' ';
                if (i < Math.floor(progress * target.length)) return ch;
                return data.chars[Math.floor(Math.random() * data.chars.length)];
            }).join('');
        }

        function tick() {
            const target = data.phrases[phraseIndex];

            if (phase === 'scramble_in') {
                frame++;
                const progress = frame / data.startTime;
                el.textContent = scramble(target, progress);
                if (frame >= data.startTime) {
                    frame = 0;
                    phase = 'display';
                    el.textContent = target;
                }
            } else if (phase === 'display') {
                setTimeout(function() {
                    frame = 0;
                    phase = 'scramble_out';
                }, data.dispTime);
                return;
            } else if (phase === 'scramble_out') {
                frame++;
                const progress = 1 - frame / data.endTime;
                el.textContent = scramble(target, progress);
                if (frame >= data.endTime) {
                    frame = 0;
                    phase = 'scramble_in';
                    phraseIndex = (phraseIndex + 1) % data.phrases.length;
                }
            }

            setTimeout(tick, 1000 / 30);
        }

        setTimeout(tick, data.delay);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObfuscator);
} else {
    initObfuscator();
}

// Importação do script (se já tiver no ImportJS, não precisa repetir aqui)

/* ========================================================== */
/* ===== INÍCIO - BALANCEDTABBER (troca de abas por clique) === */
/* ========================================================== */
(function($) {
  $(function() {
    $("ul.tabs__caption").on("click", "li:not(.active)", function() {
      var $li = $(this);
      var $ul = $li.closest("ul.tabs__caption");
      var index = $li.index();
 
      $ul.children("li").removeClass("active");
      $li.addClass("active");
 
      var $shown = $ul.closest("div.tabs")
        .children("div.tabs__content")
        .removeClass("active")
        .eq(index)
        .addClass("active");
 
      /* Força o carregamento de imagens "lazyload" que ficaram
         escondidas (display:none) e por isso nunca foram carregadas
         pelo IntersectionObserver de lazy load da Fandom. */
      $shown.find("img.lazyload").each(function() {
        var $img = $(this);
        var real = $img.attr("data-src");
        if (real && $img.attr("src") !== real) {
          $img.attr("src", real);
        }
      });
 
      /* Avisa o resto da página (scroll/resize) que algo mudou de
         tamanho/visibilidade, pro lazy load geral reavaliar também. */
      $(window).trigger("scroll");
      $(window).trigger("resize");
    });
  });
})(jQuery);
/* ========================================================== */
/* ===== FIM - BALANCEDTABBER ================================ */
/* ========================================================== */

(function ($, mw) {
    'use strict';

    /* =========================================================
       CONFIGURACAO
       ========================================================= */

    var milestones = [
        '10?',
        '100?',
        '1.000?',
        '10.000?',
        '\u221E'
    ];

    var counterInterval = 2000;
    var fadeDuration = 300;


    /* =========================================================
       SPOTLIGHT
       ========================================================= */

    function updateSpotlight(element, event) {
        var rect = element.getBoundingClientRect();

        if (!rect.width || !rect.height) {
            return;
        }

        var x =
            ((event.clientX - rect.left) / rect.width) * 100;

        var y =
            ((event.clientY - rect.top) / rect.height) * 100;


        /* Limita entre 0 e 100 */

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));


        /*
         * Evita executar varias alteracoes
         * no mesmo frame durante o mousemove.
         */

        if (element.ftSpotlightFrame) {
            window.cancelAnimationFrame(
                element.ftSpotlightFrame
            );
        }


        element.ftSpotlightFrame =
            window.requestAnimationFrame(function () {

                element.style.setProperty(
                    '--ft-mx',
                    x + '%'
                );

                element.style.setProperty(
                    '--ft-my',
                    y + '%'
                );

                element.ftSpotlightFrame = null;
            });
    }


    function resetSpotlight(element) {
        element.style.setProperty(
            '--ft-mx',
            '50%'
        );

        element.style.setProperty(
            '--ft-my',
            '50%'
        );
    }


    /*
     * Event delegation.
     *
     * Isso significa que nao precisamos
     * adicionar um listener individual
     * sempre que o Fandom recarregar
     * parte do artigo.
     */

    $(document)
        .off(
            'mousemove.ftSpotlight',
            '.ft-spotlight .ft-spotlight-inner'
        )
        .on(
            'mousemove.ftSpotlight',
            '.ft-spotlight .ft-spotlight-inner',
            function (event) {
                updateSpotlight(this, event);
            }
        );


    $(document)
        .off(
            'mouseleave.ftSpotlight',
            '.ft-spotlight .ft-spotlight-inner'
        )
        .on(
            'mouseleave.ftSpotlight',
            '.ft-spotlight .ft-spotlight-inner',
            function () {
                resetSpotlight(this);
            }
        );


    /* =========================================================
       FAMILY COUNTER
       ========================================================= */

    function startCounter(element) {
        var $element = $(element);


        /*
         * Impede que o mesmo contador
         * receba varios setInterval.
         */

        if ($element.data('ftCounterBound')) {
            return;
        }


        $element.data(
            'ftCounterBound',
            true
        );


        var index = 0;


        /*
         * Define o primeiro valor.
         */

        $element.text(
            milestones[index]
        );


        var timer = window.setInterval(
            function () {

                /*
                 * Se o Fandom substituiu o conteudo
                 * durante preview/AJAX, encerramos
                 * o timer antigo.
                 */

                if (
                    !document.documentElement.contains(
                        element
                    )
                ) {
                    window.clearInterval(timer);

                    return;
                }


                $element.addClass(
                    'ft-fade'
                );


                window.setTimeout(
                    function () {

                        if (
                            !document.documentElement.contains(
                                element
                            )
                        ) {
                            return;
                        }


                        index =
                            (index + 1) %
                            milestones.length;


                        $element.text(
                            milestones[index]
                        );


                        $element.removeClass(
                            'ft-fade'
                        );

                    },
                    fadeDuration
                );

            },
            counterInterval
        );


        $element.data(
            'ftCounterTimer',
            timer
        );
    }


    /* =========================================================
       INICIALIZACAO DOS CONTADORES
       ========================================================= */

    function initFamilyCounters($content) {

        /*
         * O hook wikipage.content fornece
         * um objeto jQuery.
         *
         * Ainda assim normalizamos para evitar
         * problemas caso a funcao seja chamada
         * manualmente.
         */

        if (
            !$content ||
            !$content.jquery
        ) {
            $content = $(
                $content || document
            );
        }


        var selector =
            '.ft-family-counter-number';


        /*
         * .find() procura dentro do conteudo.
         *
         * .filter() cobre o caso em que
         * o proprio elemento recebido pelo
         * hook seja o contador.
         */

        var $counters =
            $content
                .find(selector)
                .add(
                    $content.filter(selector)
                );


        $counters.each(
            function () {
                startCounter(this);
            }
        );
    }


    /* =========================================================
       MEDIAWIKI / FANDOM
       ========================================================= */

    function initContent($content) {
        initFamilyCounters($content);
    }


    if (
        mw &&
        typeof mw.hook === 'function'
    ) {

        mw.hook(
            'wikipage.content'
        ).add(
            initContent
        );

    } else {

        /*
         * Fallback.
         *
         * Normalmente nao sera necessario
         * dentro do Fandom.
         */

        $(function () {
            initContent(
                $(document)
            );
        });

    }


}(jQuery, window.mw));