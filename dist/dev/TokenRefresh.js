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
                meta: 'tokens',
                type: 'csrf|patrol|watch'
            }).done($.proxy(this.callback, this));
        },
        callback: function(d) {
            var t = d.query.tokens,
                csrf = t.csrftoken;
            if (csrf) {
                $('[name="wpEditToken"]').val(csrf);
                mw.user.tokens.set('csrfToken', csrf);
                mw.user.tokens.set('watchToken', t.watchtoken);
                mw.user.tokens.set('patrolToken', t.patroltoken);
                mw.log('[TokenRefresh] Tokens successfully refreshed!');
            } else {
                console.error('[TokenRefresh] An error occurred while fetching tokens');
            }
        }
    };
    mw.loader.using('mediawiki.api').then($.proxy(TokenRefresh.init, TokenRefresh));
})();