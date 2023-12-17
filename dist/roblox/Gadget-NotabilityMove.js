/*
* NotabilityMove v2.2.1 (rev 12/11/2023)
* @description Allows for quick moving of pages deemed non-notable.
* @authors "Joritochip", "The JoTS", "Ozuzanna"
*
* Based off of [[w:c:dev:AjaxRedirect]] by Ozuzanna
*/

mw.loader.using(['mediawiki.api']).then(function() {
    var config = mw.config.get([
        'skin',
        'wgUserGroups',
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgPageName',
    ]);
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

        var targUser = prompt('Please enter the target user:', window.getSelection().toString());
        if (!targUser) return;

        var oldPageName = mw.config.get('wgPageName');
        var basePageName = /^(?:[A-Za-z]*:)?(.+)/.exec(oldPageName)[1];
        var newPageName  = 'User:' + targUser + '/' + basePageName;

        // Prompt confirmation
        if (!confirm('"'
            + oldPageName.replace(/_/g, ' ') + '" will be moved to\n"'
            + newPageName.replace(/_/g, ' ') + '".')) return;

        api.postWithEditToken({
            action: 'move',
            from: oldPageName,
            to: newPageName,
            noredirect: '',
            reason: '[[RW:NOTABLE|Does not meet notability policies]]. ([[Help:Why was the page I created deleted?|why?]])'
        }).then(function(d) {
            respHandler(!d.error, "Move");
            
            // Temporarily protect page
            api.postWithEditToken({
                format: 'json',
                action: 'protect',
                expiry: '2 weeks',
                protections: 'create=sysop',
                watchlist: 'nochange',
                title: oldPageName,
                reason: 'Automatically protected page when moving to user space.'
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