/*
 * AjaxDiff
 * Allows you to see diff in WikiActivity page
 * Scripts used :
 * http://dev.wikia.com/wiki/WHAM/code.js
 * http://dev.wikia.com/wiki/QuickComments/code.js
 * By Gguigui1
 */;
(function ($, mw) {
    AjaxDiff = $.extend(AjaxDiff, {});
    AjaxDiff.expiry = AjaxDiff.expiry || '3 days';
    AjaxDiff.reason = AjaxDiff.reason || 'Vandalism';
    console.log(AjaxDiff);
    var lng = {
        // Deutsch
        de: {
            expiry: 'Sperrdauer: ',
            reason: 'Sperrgrund: ',
            success: 'Benutzer wurde gesperrt.',
            emptyvariables: 'Du musst den zu sperrenden Benutzer und die Sperrdauer angeben.',
            blockbutton: 'Sperre den Benutzer',
            cancelbutton: 'Abbrechen',
            rollbacksuccess: 'Bearbeitung wurde zurückgesetzt',
            loading: 'Wird geladen, bitte warten...',
            errorapi: 'Fehler: die API gab einen Fehlercode zurück'
        },
        // English
        en: {
            expiry: 'Block duration: ',
            reason: 'Block reason: ',
            success: 'User has been blocked',
            emptyvariables: 'You have to enter block\'s expiry and user to block.',
            blockbutton: 'Block the user',
            cancelbutton: 'Cancel',
            rollbacksuccess: 'Edit has been rollbacked',
            loading: 'Loading, please wait...',
            errorapi: 'Error: API returned error code'
        },
        // Français
        fr: {
            expiry: 'Durée du blocage :',
            reason: 'Motif du blocage :',
            success: 'L\'utilisateur a été bloqué avec succès.',
            emptyvariables: 'Merci de rentrer la durée du blocage ainsi que l\'utilisateur à bloquer',
            blockbutton: 'Bloquer l\'utilisateur',
            cancelbutton: 'Annuler',
            rollbacksuccess: 'La modification a été révoqué',
            loading: 'Chargement, merci de patienter...',
            errorapi: 'Erreur: l\'API a retourné le code d\'erreur'
        }
    };
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
 
    function blockuser(user, expiry, reason) {
        if (!expiry) {
            var expiry = prompt(lng.expiry, AjaxDiff.expiry);
        }
        if (!reason) {
            var reason = prompt(lng.reason, AjaxDiff.reason);
        }
        if (!user || !expiry) {
            alert(lng.emptyvariables);
            return false;
        }
        var url = wgServer + '/api.php?action=query&prop=info&intoken=block&titles=User:' + user + '&format=json';
        $.getJSON(url, function (data) {
            var p;
            for (var p in data.query.pages) {
                break;
            };
            var token = data.query.pages[p].blocktoken;
            var url = wgServer + '/api.php?action=block&user=' + user + '&expiry=' + expiry + '&reason=' + reason + '&nocreate&autoblock&format=json&token=' + encodeURIComponent(token);
            $.post(url, function (data) {
                if (data.error) {
                    alert(lng.errorapi + data.error.info);
                    return false;
                } else {
                    alert(lng.success);
                    $('#blockbutton').addClass('disabled');
                }
            });
        });
    }
 
    function DiffAjax(content) {
        if ($('#diff-preview').length == 0) {
            var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="DiffPreview"/> \
  </form>';
            $.showCustomModal('Diff preview', ajaxform, {
                id: 'diff-preview',
                width: 900,
                buttons: [{
                    message: lng.cancelbutton,
                    handler: function () {
                        $('#diff-preview').closeModal();
                    }
                }, {
                    id: 'blockbutton',
                    message: lng.blockbutton,
                    defaultButton: true,
                    handler: function () {
                        if (!$(this).hasClass('disabled')) {
                            blockuser($('#mw-diff-ntitle2 > .mw-userlink').html());
                        }
                    }
                }]
            });
            $('#DiffPreview').html(content);
 
        } else {
            $('#DiffPreview').html(content);
        }
        $('#blockbutton').html(lng.blockbutton + ' (' + $('#mw-diff-ntitle2 > .mw-userlink').html() + ')');
        $('#mw-diff-otitle4').find('a').replaceWith('<a id="diffprev" href="javascript:void(0)" links="' + $('#mw-diff-otitle4').find('a').attr('href') + '">' + $('#mw-diff-otitle4').find('a').html() + '</a>');
        $('#mw-diff-ntitle4').find('a').replaceWith('<a id="diffnext" href="javascript:void(0)" links="' + $('#mw-diff-ntitle4').find('a').attr('href') + '">' + $('#mw-diff-ntitle4').find('a').html() + '</a>');
        $('#diffprev, #diffnext').click(function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('#DiffPreview').html('<img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif">' + lng.loading);
            var url = wgServer + $(this).attr("links");
            setTimeout(getdiffcontent(url), 1000);
        });
        $('.mw-rollback-link > a').replaceWith('<a class="rollbackbutton" title="' + $('.mw-rollback-link > a').attr('title') + '" href="' + $('.mw-rollback-link > a').attr('href') + '">' + $('.mw-rollback-link > a').html() + '</a>');
        $('.rollbackbutton').click(function (event) {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            event.preventDefault();
            $.post($(this).attr('href'));
            alert(lng.rollbacksuccess);
            $(this).removeAttr('href');
            $(this).addClass('disabled');
        });
        importArticle({
            type: "style",
            article: "w:c:dev:AjaxDiff/code.css"
        });
    }
    $('.activityfeed-diff').click(function (event) {
        event.preventDefault();
        var url = wgServer + $(this).attr("href");
        getdiffcontent(url);
    });
 
    function getdiffcontent(url) {
        console.log(url);
        $.get(url, function (content) {
            var content = $(content).find('table.diff').html();
            DiffAjax(content);
        });
    }
})(this.jQuery, this.mediaWiki);