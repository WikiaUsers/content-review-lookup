/*
* NotabilityMove v2 (rev 3/17/2022)
* @description Allows for quick moving of pages deemed non-notable.
* @authors "Joritochip", "The JoTS", "Ozuzanna"
*
* Based off of [[w:c:dev:AjaxRedirect]] by Ozuzanna
*/

mw.loader.using(['mediawiki.api', 'mediawiki.notify']).then(function() {
    var config = mw.config.get([
        'skin',
        'wgUserGroups',
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgPageName',
    ]);
    var token = mw.user.tokens.get('editToken');
    var api = new mw.Api();

    if (
        $('#ca-ncu').length ||
        config.skin != 'fandomdesktop' ||
        ['Thread', 'File', 'MediaWiki'].includes(config.wgCanonicalNamespace) ||
        config.wgCanonicalSpecialPageName
    ) return;
      
    function respHandler (res, type, msg) {
        if (res === true) {
            mw.notify(type + ' successful!', {
                type: 'success'
            });
            
            //if (type === "Protect")
                //setTimeout((function() { window.location.reload(); }), 3000);
        } else {
            var errors = {
                // Move failures
                articleexists: 'A page already exists in the target location.'
            };
            mw.notify(errors[msg] || (type + ' failed.'), {
                type: 'error'
            });
        }
    }

    $('<a>', {
        id: 'ca-ncu',
        href: '#',
        html: 'NCU Move',
        prependTo: $('<li>').appendTo($('#p-cactions .wds-list'))
    }).click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        var targUser = prompt('Please enter the target user:');
        if (!targUser) return;

        var oldPageName = mw.config.get('wgPageName');
        var basePageName = /^(?:[A-Za-z]*:)?(.+)/.exec(oldPageName)[1];
        var newPageName  = 'User:' + targUser + '/' + basePageName;

        // Prompt confirmation
        if (!confirm('"'
            + oldPageName.replace(/_/g, ' ') + '" will be moved to\n"'
            + newPageName.replace(/_/g, ' ') + '".')) return;

        api.post({
            action: 'move',
            from: oldPageName,
            to: newPageName,
            noredirect: '',
            reason: '[[RW:NCU|Does not meet notability policies]]. ([[Help:Why was the page I created deleted?|why?]])',
            token: token
        }).then(function(d) {
            respHandler(!d.error, "Move");
            
            // Temporarily protect page
            api.post({
                format: 'json',
                action: 'protect',
                expiry: '1 hour',
                protections: 'create=sysop',
                watchlist: 'nochange',
                title: oldPageName,
                reason: 'Automatically protected page when moving to user space.',
                token: token
            }).then(function(d) {
                respHandler(!d.error, "Protect");
            }).catch(function(err) {
                respHandler(false, "Protect", err);
            });
            
        }).catch(function(err) {
            respHandler(false, "Move", err);
        });

    });
});