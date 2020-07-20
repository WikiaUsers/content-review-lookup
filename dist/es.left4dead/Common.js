/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
//Importando JavaScript externos
importArticles({
   type: 'script',
   articles: [
       'u:dev:ArchiveTool/code.js',
       'u:dev:Countdown/code.js',
       'u:dev:PurgeButton/code.js',
       'u:dev:SignatureCheck/code.js',
       'u:dev:WallGreetingButton/code.js',
       'u:dev:WikiaNotification/code.js',
   ]
});
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
// Refrescar automáticamente la WikiActividad y los Cambios Recientes
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
importScriptPage('AjaxRC/code.js', 'dev');
//Diff de ediciones en la misma página
(function ($, mw) {
    'use strict';

    if (window.quickDiffLoaded) {
        return;
    }
    window.quickDiffLoaded = true;

    var msg = {
        en: {
            error: 'No se ha podido abrir la diferencia entre revisiones de "%url".',
            loading: 'Cargando…',
            title: 'Diferencia entre revisiones: %pagename'
        }
    };
    msg = $.extend(msg.en, msg[mw.config.get('wgUserLanguage')]);

    function showModal() {
        var $modalDiv = $('<div>').attr({
            'class': 'WikiaArticle AdminDashboardChromedArticle',
            'id': 'quickdiff'
        }).css({
            'min-height': '150px',
            'max-height': 'calc(100vh - 175px)',
            'overflow-y': 'auto',
            'font-size': '13px',
            'line-height': '21px',
            'position': 'relative'
        });

        var $modal = $modalDiv.makeModal({
            width: $(window).width() - 100
        });

        if (mw.config.get('skin') === 'monobook') {
            $modal.css({
                'top': $(window).scrollTop() + $modal.data('settings').topOffset,
                'background-color': $('#content').css('background-color')
            });
        }
    }

    function updateModal(content, title) {
        if (!$('#quickdiffWrapper').length) {
            if (!title) {
                title = msg.loading;
            }
            showModal();
        }

        if (typeof title === 'string') {
            $('#quickdiffWrapper > h1').text(msg.title.replace('%pagename', title));
        }
        $('#quickdiff').html(content);
    }

    function loadDiff(url) {
        updateModal('<div class="wikiaThrobber">&nbsp;</div>');

        url.extend({
            action: 'render',
            diffonly: '1'
        });

        var urlString = url.toString();
        $.get(urlString)
            .done(function (content) {
                if ($(content).hasClass('diff')) {
                    var title = $(content).find('#mw-diff-ntitle1 > strong > a').attr('title');
                    mw.loader.using('mediawiki.action.history.diff', function () {
                        updateModal(content, title);
                    });
                    return;
                }
                updateModal(msg.error.replace('%url', urlString));
            })
            .fail(function () {
                updateModal(msg.error.replace('%url', urlString));
            });
    }

    function init() {
        mw.util.addCSS('#positioned_elements .blackout{height:100%;width:100%;position:fixed}');

        $('body').on('click', 'a', function (event) {
            var url = new mw.Uri(event.currentTarget.href);
            if (
                url.host === location.hostname &&
                url.query.diff &&
                !url.fragment
            ) {
                event.preventDefault();
                loadDiff(url);
            }
        });
    }
    $(init);

}(jQuery, mediaWiki));
//YouTube Player
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            playertype = esc('' + $this.data('playertype')),
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay')),
            args = esc('' + $this.data('args'));
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>');
    });
});