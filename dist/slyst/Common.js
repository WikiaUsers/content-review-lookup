/* Any JavaScript here will be loaded for all users on every page load. */

// Template:JS
if ($('#js').length) $('head').append('<script type="text/javascript">' + $('#js').html() + '</script>');

//Templat:I
if ($('#import').length) importScript($('#import').html());

$(function() {
    if (mw.config.get('wgNamespaceNumber') == 0 && (/\.js/g).test(mw.config.get('wgPageName')) && $.getUrlVar('action') !== 'edit') {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'content',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                text: '//<syntaxhighlight lang="javascript">\n' + data.query.pages[i].revisions[0]['*'] + '\n//</syntaxhighlight>',
                format: 'json'
            }, function(data) {
                $('#mw-content-text').html(data.parse.text['*']);
            });
        });
    }
});