
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