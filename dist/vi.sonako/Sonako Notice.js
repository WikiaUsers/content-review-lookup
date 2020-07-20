/* Recent Activity */
if ( mediaWiki.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity') {
$(document).ready(function() {
    var TopSection = '<section id="TopPageModule" class="TopPageModule module"></section>';
    $('#WikiaArticle').prepend(TopSection);
    $.getJSON('/api.php?action=parse&text={{Sonako-RC}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#TopPageModule').append(code);
	$('#TopPageModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
    });
});
}
/* Another Pages */
if ( (mediaWiki.config.get('wgPageName') !== 'New_Page') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201) ) {
    $(document).ready(function() {
        var TopSection = '<section id="TopPageModule" class="TopPageModule module"></section>';
        $('#WikiaArticle').prepend(TopSection);
        $.getJSON('/api.php?action=parse&text={{Sonako}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('section#TopPageModule').append(code);
	    $('#TopPageModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
        });
    });
}