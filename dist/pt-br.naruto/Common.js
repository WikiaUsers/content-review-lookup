console.log('TESTE: Common.js carregado com sucesso');
alert('Common.js rodando!');

window.BackToTopText = "Retornar";
// $(".tooltip").tooltip(); // Tooltips — DESATIVADO pois quebra o Common.js

// Horário
 // Thanks to KockaAdmiralac
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function() {
    $('time.timeago').timeago();
});

// Botão de Expandir
(function() {
    // injeta CSS se ainda não existir
    if (typeof mw !== 'undefined' && mw.util && !document.getElementById('expandir-inline-css')) {
        var css = '\
.expandir-botao { cursor:pointer; font-weight:bold; display:inline-block; margin:0 6px; } \
.expandir-conteudo { display:none; } \
';
        mw.util.addCSS(css);
        // marca para não injetar novamente
        var s = document.createElement('style');
        s.id = 'expandir-inline-css';
        document.head.appendChild(s);
    }

    // delegação de evento para garantir funcionamento
    $(document).on('click', '.expandir-botao', function(e) {
        e.preventDefault();
        var $botao = $(this);
        var $conteudo = $botao.next('.expandir-conteudo');

        if ($conteudo.length === 0) {
            console.warn('Expandir: elemento .expandir-conteudo não encontrado após o botão.', $botao);
            return;
        }

        if ($conteudo.is(':visible')) {
            $conteudo.hide();
            $botao.text('[ + ]');
        } else {
            $conteudo.show();
            $botao.text('[ – ]');
        }
    });

    // debug: confirma que o script carregou
    if (window.console) console.log('Expandir inline: Common.js carregado.');
})();

// Imagens externas sendo linkadas
$('.eximagem').each(function() {
var $this = $(this),
data = $this.data();
$this.find('img').css({
width: data.width,
height: data.height
});
});