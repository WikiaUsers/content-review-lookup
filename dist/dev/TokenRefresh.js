/**
 * Name:        TokenRefresh
 * Description: Automatically refreshes tokens
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.2
 */
(function() {
    if (window.TokenRefreshLoaded) {
        return;
    }
    window.TokenRefreshLoaded = true;
    var TokenRefresh = {
        init: function() {
            this.api = new mw.Api();
            this.interval = setInterval(
                $.proxy(this.fetch, this),
                window.TokenRefreshInterval || 600000
            );
        },
        fetch: function() {
            mw.log('[TokenRefresh] Refreshing tokens...');
            this.api.get({
                action: 'query',
                titles: '#',
                prop: 'info',
                intoken: 'edit|watch'
            }).done($.proxy(this.callback, this));
        },
        callback: function(d) {
            var info = d.query.pages[-1],
                edit = info.edittoken;
            if (edit) {
                $('[name="wpEditToken"]').val(edit);
                mw.user.tokens.set('editToken', edit);
                mw.user.tokens.set('watchToken', info.watchtoken);
                mw.log('[TokenRefresh] Tokens successfully refreshed!');
            } else {
                console.error('[TokenRefresh] An error occurred while fetching tokens');
            }
        }
    };
    mw.loader.using('mediawiki.api').then($.proxy(TokenRefresh.init, TokenRefresh));
})();