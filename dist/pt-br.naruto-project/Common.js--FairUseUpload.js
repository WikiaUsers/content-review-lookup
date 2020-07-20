/**
 * 14:30, 13 de Maio, 2015 (UTC)
 * <source lang = "JavaScript">
 * http://pt-br.naruto-project.wikia.com/wiki/MediaWiki:Common.js/FairUseUpload.js
 * Cria um formulário para facilitar o upload de imagens
 * e para garantir a justificativa adequada e licenciamento
 * @author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
 * @License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
*/
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
    jQuery(function ($) {
        'use strict';
        var $desc = $('#wpUploadDescription');
        if ($desc.val()) {
            return; // If not empty then don't do anything (i.e. error message confirm page)
        } 
        $desc.val(
                  '{{Informação do Arquivo\n' 
                + '|Descrição = \n' 
                + '|Fonte = \n' 
                + '|Porção = \n' 
                + '|Personagens na Imagem = \n' 
                + '|Jutsu na Imagem = \n' 
                + '|Propósito = \n' 
                + '|Substitubilidade = \n' 
                + '|Resolução = \n' 
                + '|Outra Informação = \n' + '}}'
        );
    });
}
 
/**
 * Start upload form customisations
 */
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload')) {
        jQuery(function ($) {
            'use strict';
            var $description = $('#wpUploadDescription'),
                customRows = '',
                $customRows;
 
            if ($description.val()) {
                return; // error message confirm page
            }
 
            function fromTemplate(name, id, required, title, elem) {
                elem = elem || '<textarea style="resize:none; overflow:auto;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                return '<tr>\n'
                     + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + ':</label></td>\n'
                     + '<td class="mw-input">' + elem + '</td>\n'
                     + '</tr>\n';
            }
            customRows += fromTemplate('Descrição', 'descriptionBox', true, '[OBRIGATÓRIO] Descreva o que está acontecendo e por que é importante.');
            customRows += fromTemplate('Fonte', 'sourceBox', true, '[OBRIGATÓRIO] Descreva o número exato do capítulo ou episódio.');
            customRows += fromTemplate('Personagens na Imagen', 'characterBox', false, '[SE HOUVER] Lista de caracteres separados por vírgula.');
            customRows += fromTemplate('Jutsu na imagem', 'jutsuBox', false, '[SE HOUVER] Lista de Jutsu separados por vírgula.');
            customRows += fromTemplate('Propósito', 'purposeBox', false, '[OPCIONAL] Propósito desta imagem.');
            customRows += fromTemplate('Porção Usada', 'portionBox', false, '[OPCIONAL] Porção usada de direitos autorais.');
            customRows += fromTemplate('Substituível?', 'replaceBox', false, '[OPCIONAL] Está imagem é substituível?');
            customRows += fromTemplate('Resolução', 'resolutionBox', false, '[OPCIONAL] Resolução desta imagem.');
            customRows += fromTemplate('Outra Informação', 'otherinfoBox', false, '[OPCIONAL] Qualquer outra informação para a imagem.');
 
            // To real DOM
            $customRows = $(customRows);
            $description.closest('tr').hide().after($customRows);
            $customRows.find("textarea").tooltip({trigger: 'focus'});
 
            function verifySummary() {
                if (!$('#wpLicense').val()) {
                    window.alert('O licenciamento deve ser completo');
                    return false;
                }
 
                if (!$.trim($customRows.find('#descriptionBox').val()).length) {
                    window.alert('Por favor insira uma descrição adequada para sua imagem.');
                    return false;
                }
 
                if (!$.trim($customRows.find('#sourceBox').val()).length) {
                    window.alert('Por favor insira a fonte de sua imagem (o número exato do capítulo ou episódio).');
                    return false;
                }
 
                var template = '',
                    resolution = $.trim($customRows.find('#resolutionBox').val());
                if (/1080p/i.test(resolution)) {
                    template = '{{1080p upload}}\n';
                } else if (/720p/i.test(resolution)) {
                    template = '{{720p upload}}\n';
                }
 
                var strBuilder = template;
                strBuilder += '{{Informação do Arquivo\n';
                strBuilder += '|Descrição = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                strBuilder += '|Fonte = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                strBuilder += '|Propósito = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                strBuilder += '|Personagens na Imagem = ' + $.trim($customRows.find('#characterBox').val()).replace(/(\[\[)|(\]\])/g, '').replace(/\sand\s/g, ', ') + '\n';
                strBuilder += '|Jutsu na imagem = ' + $.trim($customRows.find('#jutsuBox').val()).replace(/(\[\[)|(\]\])/g, '').replace(/\sand\s/g, ', ') + '\n';
                strBuilder += '|Porção = ' + $.trim($customRows.find('#portionBox').val()) + '\n';
                strBuilder += '|Substituibilidade = ' + $.trim($customRows.find('#replaceBox').val()) + '\n';
                strBuilder += '|Resolução = ' + resolution + '\n';
                strBuilder += '|Outra Informação = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
                strBuilder += '}}';
                $description.val(strBuilder);
                return true;
            }
 
            // Bind submit to verify function
            $description.closest('form').submit(verifySummary);
 
            // Autocomplete links
            $.getScript(
                '/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts', function () {
                dev.minicomplete.load(
                    $customRows.find('#descriptionBox'), $customRows.find('#sourceBox')
                );
            });
        });
    }
}
// </source>