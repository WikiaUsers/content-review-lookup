// Show Wiki Manager in toolbar
;(function($, mw) {
    $.get(mw.config.get('wgScriptPath') + '/api.php', {
        action:'parse', 
        text: '{{int:Custom-Wiki Manager}}',
        format: 'json'
    }).done(function(d) {
        var wikiManager = d.parse.text['*'].split('\n')[0].replace('<p>', '');
        if (wikiManager.indexOf('Custom-Wiki Manager') > -1) {
            return;
        } else {
            $('#WikiaBarWrapper .tools').append('<li class="custom overflow"><a href="' + mw.config.get('wgScriptPath') + '/wiki/Special:Contribs/' + encodeURIComponent(wikiManager) + '" rel="nofollow">WM: ' + mw.html.escape(wikiManager) + '</a></li>');
        }
    });
})(jQuery, mediaWiki);