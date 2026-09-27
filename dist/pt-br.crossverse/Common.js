
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

        jpBox.innerHTML = '';
        ptBox.innerHTML = '';
        instrucaoBox.classList.remove('visivel');

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