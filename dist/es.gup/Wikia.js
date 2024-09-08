// *******************************************************************************
// Añade el tagline de forma manual - Créditos a Soul Eater Wiki
// *******************************************************************************
$(function(){
     if ($('#WikiaPageHeader').length ) {
            $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Cuidado:</span> Los artículos pueden desvelar detalles importantes de la trama.</div>');
     }
});

/* JS del Chat de Discord */
$('.discordmola').append('<iframe src="https://discordapp.com/widget?id=217063685409996811&theme=dark" width="300" height="300" allowtransparency="true" frameborder="0"></iframe>');

/* RailModule */
$(function() {
    $('<section class="module railModule"></section>').appendTo('#WikiaRail').load('/index.php?title=Template:RailModule&action=render');
});