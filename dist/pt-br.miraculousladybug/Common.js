
/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Mostrar spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Esconder spoilers');
        }
    }

    button.text('Mostrar spoilers');

	button.click(toggleText);
});

window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 100;

window.lockOldComments.addNoteAbove = true;

window.lockOldComments.namespaceNumbers = [0, 500];

window.lockOldComments.noteMessage =
    "⚠️ Esta discussão foi automaticamente bloqueada após 100 dias sem atividade para evitar respostas em tópicos antigos. Caso necessário, crie uma nova discussão relacionada ao assunto.";

/* For [[Template:Ícones]] */
$(function () {
	var ícones = $('#ícones');
    if ([ícones].length) {
        $('.page-header__meta').after(ícones);
        ícones.show();
    }
});