(function() {
    var conf = mw.config.get([
        'wgCanonicalSpecialPageName'
    ]);
    if (
        conf.wgCanonicalSpecialPageName !== 'Block' ||
        $('#mw-input-wpMessage').exists()
    ) {
        return;
    }
    var i18n,
    talkpage,
    config = $.extend({
        title: 'Blocked',
        message: 'You have been blocked for $2 because you have $1. If you wish to get unblocked, please read [[Rules and guidelines|our rules]] before continue editing on our wiki.'
    }, window.MessageBlock),
    token = mw.user.tokens.get('editToken');
    function init(i18nd) {
        i18n = i18nd;
        $('tbody').append('<tr class="mw-htmlform-field-HTMLCheckField"><td class="mw-label"><label for="mw-input-wpMessage">&#160;</label></td><td class="mw-input"><input name="wpMessage" type="checkbox" value="1" id="mw-input-wpMessage" />&#160;<label for="mw-input-wpMessage">' + i18n.msg('button').escape() + '</label></td></tr>');
        if (config.autocheck) {
            $('#mw-input-wpMessage').attr('checked', true);
        }
        $('.mw-htmlform-submit').click(click);
    }
    function click(e) {
        if (!$('#mw-input-wpMessage').attr('checked')) {
            return;
        }
        e.preventDefault();
        var duration = $('#mw-input-wpExpiry-other').css('display') === 'none' ?
            $('#mw-input-wpExpiry option:selected').text() :
            $('#mw-input-wpExpiry-other').val(),
            blockmessage = prompt(i18n.msg('blockreason').plain(), $('#mw-input-wpReason option:selected').text() +
                ($('#mw-input-wpReason-other').val() ?
                    ': ' + $('#mw-input-wpReason-other').val() :
                    '')
            ),
            messages = config.message
                .replace('$1', blockmessage)
                .replace('$2', duration);
        if (talkpage) {
            $.post(mw.util.wikiScript('api'), {
                action       : 'edit',
                title        : 'User_talk:' + $('#mw-bi-target').val(),
                section      : 'new',
                sectiontitle : config.title,
                text         : messages,
                token        : token
            }, callback);
        } else {
            $.post(mw.util.wikiScript('wikia'), {
                controller    : 'WallExternal',
                method        : 'postNewMessage',
                pagenamespace : 1200,
                pagetitle     : $('#mw-bi-target').val(),
                messagetitle  : config.title,
                body          : messages,
                format        : 'json',
                token         : token
            }, callback);
        }
    }
    function callback(d) {
        // TODO: Check if the result is actually successful
        alert(i18n.msg('success').plain());
        $('#mw-content-text > form').submit();
    }
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
    $.nirvana.getJson('WikiFeaturesSpecial', 'index', function(d) {
        talkpage = d.features.filter(function (t) {
            return t.name === 'wgEnableWallExt' && t.enabled;
        }).length === 0;
        mw.hook('dev.i18n').add(function(i18no) {
            i18no.loadMessages('MessageBlock').done(init);
        });
    });
})();