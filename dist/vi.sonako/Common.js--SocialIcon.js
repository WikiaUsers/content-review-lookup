if (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201) {
    $(window).load(function() {
            $('<span class="FBLike"><iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FSonakoWiki%2F&width=139&layout=button_count&action=like&size=small&show_faces=true&share=true&height=21&appId=952193671491839" width="150" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></span>').insertAfter('.WikiaPageHeader > .comments');
    });
}
if (wgCanonicalNamespace === 'User_blog') {
    $(window).load(function() {
            $('#WikiaUserPagesHeader .author-details').prepend('<div class="FBLike"><iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FSonakoWiki%2F&width=139&layout=button_count&action=like&size=small&show_faces=true&share=true&height=21&appId=952193671491839" width="150" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>');
    });
}