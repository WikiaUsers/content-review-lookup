
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