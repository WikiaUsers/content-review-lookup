/* Recent Activity */
if ( mediaWiki.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity') {
$(document).ready(function() {
    var TopSection = '<section id="TopPageModule" class="TopPageModule module"></section>';
    $('#WikiaArticle').prepend(TopSection);
    $.getJSON('/api.php?action=parse&text={{Higashi-RC}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#TopPageModule').append(code);
	$('#TopPageModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
    });
});
}
/* Another Pages */
if ((mw.config.get('wgAction') === 'view') && (mediaWiki.config.get('wgPageName') !== 'New_Page') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Active Projects') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Idle Projects') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Stalled Projects') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Inactive Projects ') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Hoàn thành') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Teaser') === -1) && (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Original Light Novel') === -1)) {
    $(document).ready(function() {
        var TopSection = '<section id="TopPageModule" class="TopPageModule module"></section>';
        $('#WikiaArticle').prepend(TopSection);
        $.getJSON('/api.php?action=parse&text={{Higashi}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('section#TopPageModule').append(code);
            $('#TopPageModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
        });
    });
}