
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


// Importação do script (se já tiver no ImportJS, não precisa repetir aqui)