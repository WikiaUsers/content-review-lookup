/* AddNukeLink by Sophiedp */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    if (!document.body.classList.contains('mw-special-Contributions') || window.AddNukeLinkLoaded) {
        return;
    }
    window.AddNukeLinkLoaded = true;
    new mw.Api().get({
        action: 'query',
        meta: 'userinfo|allmessages',
        uiprop: 'rights',
        ammessages: 'nuke',
        format: 'json'
    }).done(function (d) {
        if (d && d.query && d.query.userinfo && d.query.allmessages && d.query.userinfo.rights && /nuke/.test(d.query.userinfo.rights)) {
            var link = document.querySelector('#contentSub > a:last-child');
            var user = document.querySelector('.UserProfileMasthead .masthead-info h1').textContent;
            var el = ' | <a href="' + mw.util.getUrl('Special:Nuke/' + user ) + '">' + d.query.allmessages[0]["*"].toLowerCase() + '</a>';
            link.insertAdjacentHTML('afterend', el);
        }
    });
});