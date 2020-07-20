/* Herramientas para falicitar el uso Chat-Tag
 * @Autor: Drake Blackhit
 * Aviso: Está prohibido utilizar este código para sus wikis
 * sin el permiso del autor @Drake_Blackhit. 
 *
 * Sección 1: Importando CSS.
 * Sección 2: Agregando los botones de Chat-Tag en el textarea del chat.
 * Sección 3: Funcionalidades.
*/
 
// Sección 1: Importando CSS.
 
importArticles({
	type: "style",
	articles: [
		"MediaWiki:ChatTags.css"
	]
});
 
// Sección 2: Agregando los botones del Chat-Tag en el textarea del chat.
$(function(){
    $('<div class="form form-stacked"> <div class="form-block"> <div class="form-controls"> <span class="button1" title="Texto en negrita" data-button-type="addBold"><i class="fa fa-bold"></i></span> <span class="button1" title="Texto en cursiva" data-button-type="addCursiva"><i class="fa fa-italic"></i></span> <span class="button1" title="Texto Tachado" data-button-type="addTachado"><i class="fa fa-strikethrough"></i></span> <span class="button1" title="Texto subrayaro" data-button-type="addSubrayaro"><i class="fa fa-underline"></i></span> <span class="button1" title="Texto grande" data-button-type="addGrande"><i class="fa fa-header"></i></span> <span class="button1" title="Color del texto" data-button-type="addColor"><i class="fa fa-font" style="color: red;"></i></span> <span class="button1" title="Superíndice" data-button-type="addSup"><i class="fa fa-superscript"></i></span> <span class="button1" title="Subíndice" data-button-type="addSub"><i class="fa fa-subscript"></i></span> <span class="button1" title="Texto achicado" data-button-type="addSmall"><i class="fa fa-font" style="font-size: 12px;"></i></span> <span class="button1" title="Texto monospace" data-button-type="addCode"><i class="fa fa-code"></i></span> <span class="button1" title="Cambiar fuente del texto" data-button-type="addFuente"><i class="fa fa-font"></i></span> <span class="button1" title="Subir imagen" data-button-type="addImage"><i class="fa fa-picture-o"></i></span> <span class="button1" title="Subir vídeo" data-button-type="addVideo"><i class="fa fa-youtube-play"></i></span> </div> <textarea name="message" maxlength="1000" placeholder="Escribe un mensaje..." class="textarea-tall" id="board_content"></textarea> </div> </div>')
    .appendTo('body.ChatWindow .Write .message')
});
 
// Sección 3: Funcionalidades.
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
    var addMarkdown, buttonFunctions, buttonTypes, generateUrlImage, generateUrlVideo, matchString;
    buttonTypes = {
        addCode: 'Texto monospace',
        addFuente: 'Fuentes',
        addTachado: 'Texto tachado',
        addBold: 'Texto en negrita',
        addCursiva: 'Texto en cursiva',
        addSubrayaro: 'Texto subrayaro',
        addSup: 'Texto superíndice',
        addSub: 'Texto subíndice',
        addSmall: 'Texto achicado',
        addGrande: 'Texto grande',
        addColor: 'Color del texto'
    };
    buttonFunctions = {
        addCode: '[code]' + buttonTypes.addCode + '[/code]',
        addFuente: '[font="Comic Sans Ms"]' + buttonTypes.addFuente + '[/font]',
        addTachado: '[s]' + buttonTypes.addTachado + '[/s] ',
        addSmall: '[small]' + buttonTypes.addSmall + '[/small] ',
        addBold: '[b]' + buttonTypes.addBold + '[/b] ',
        addGrande: '[big]' + buttonTypes.addGrande + '[/big] ',
        addColor: '[c="#FFF"]' + buttonTypes.addColor + '[/c] ',
        addSup: '[sup]' + buttonTypes.addSup + '[/sup] ',
        addSub: '[sub]' + buttonTypes.addSub + '[/sub] ',
        addCursiva: '[i]' + buttonTypes.addCursiva + '[/i] ',
        addSubrayaro: '[u]' + buttonTypes.addSubrayaro + '[/u] '
    };
    matchString = function (target, textAreaElement, limit) {
        var highlight, textArea;
        textArea = document.getElementById(textAreaElement.attr('id'));
        highlight = textArea.value.lastIndexOf(target, limit);
        if (highlight >= 0) {
            textArea.focus();
            textArea.selectionStart = highlight;
            return textArea.selectionEnd = highlight + target.length;
        }
    };
    generateUrlVideo = function (link) {
        var embed, url, urlVideo;
        urlVideo = /.*\/url\//;
        url = link.replace(urlVideo, '');
        embed = '[yt=\"' + url + '\"]';
        return embed;
    };
  generateUrlImage = function (link) {
        var embed, url, urlImage;
        urlImage = /.*\/url\//;
        url = link.replace(urlImage, '');
        embed = '[img=\"' + url + '\"]';
        return embed;
    };
    addMarkdown = function (buttonType, textArea) {
        var caretPosition, penLink, text;
        text = textArea.val();
        caretPosition = document.getElementById(textArea.attr('id')).selectionStart;
        if (buttonType === 'addImage') {
            penLink = prompt('Antes de enviar una imagen recuerde quitarle el https://');
            if (penLink) {
                generateUrlImage(penLink);
                textArea.val(text.substring(0, caretPosition) + generateUrlImage(penLink) + text.substring(caretPosition, text.length - 1));
            }
        }
      if (buttonType === 'addVideo') {
            penLink = prompt('Para enviar un vídeo debes dejar el ID del Youtube.');
            if (penLink) {
                generateUrlVideo(penLink);
                textArea.val(text.substring(0, caretPosition) + generateUrlVideo(penLink) + text.substring(caretPosition, text.length - 1));
            }
        }
        if (buttonType in buttonTypes) {
            textArea.val(text.substring(0, caretPosition) + buttonFunctions[buttonType] + text.substring(caretPosition, text.length - 1));
            return matchString(buttonTypes[buttonType], textArea, caretPosition + buttonTypes[buttonType].length - 1);
        }
    };
    $('.form-controls .button1').on('click', function () {
        var buttonType, textArea;
        buttonType = $(this).data('button-type');
        textArea = $(this).parent().parent().find('textarea');
        return addMarkdown(buttonType, textArea);
    });
});