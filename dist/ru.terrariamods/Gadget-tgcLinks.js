var alreadyHandled = [];

$('#mw-content-text a.mw-redirect, #mw-content-text a.extiw').each(handleALink);

function handleALink(index, thislink) {
    // modify the title and href attributes of a link
    // and add the class for coloring;
    // thislink is our link element to handle
    thislink = $(thislink);

    // a direct interwiki link is e.g. "[[tgc:Foo]]";
    // an indirect interwiki link is e.g. "[[Foo]]" where the page "Foo"
    // contains the interwiki redirect: "#REDIRECT [[tgc:Foo]]"
    if (thislink.attr('title').slice(0, 4) === 'tgc:') {
        handleDirectInterwikiLink(thislink);
    } else {
        handleIndirectInterwikiLink(thislink);
    }
}

function handleDirectInterwikiLink(link) {
    // the link is a direct interwiki link, its href attribute is correct already,
    // and it doesn't need coloring, so simply modify its title attribute

    var newHovertext = makeNewHovertext(link.attr('title').slice(4)); // strip the 'tgc:' part
    link.attr('title', newHovertext);
}

function handleIndirectInterwikiLink(link) {
    // the link is an indirect interwiki link, so its href and title attributes
    // must be modified and it needs coloring

    // get the link target of the link
    var linkTargetRaw = link.attr('href');
    // and format it, i.e. convert it to the plaintext page title
    var linkTarget = decodeURIComponent(linkTargetRaw
        .replace(/_/g, ' ')
        .replace(/^\/(wiki\/)?/, '') // strip "/" and "/wiki/" at the beginning
    );

    if ($.inArray(linkTargetRaw, alreadyHandled) > -1) {
        // the link was already handled, do not handle it again
        return;
    }
    alreadyHandled.push(linkTargetRaw);

    // find the direct URL to the redirect target
    findRedirectTarget(linkTarget).done(function(url) {
        if (url === undefined) {
            // the redirect is not a valid Terraria Wiki link,
            // don't modify this link
            return;
        }
        $('a.mw-redirect[href="' + linkTargetRaw + '"]')
            .attr('href', url) // modify the URL of this link
            .attr('title', makeNewHovertext(linkTarget)) // modify the hovertext of this link
            .addClass(['extiw', 'tgclink']); // apply coloring to this link
    });
}

function findRedirectTarget(pagename) {
    // make an API call to get the URL of the pagename's redirect target,
    // and return a promise that resolves to that URL if the pagename is a valid
    // Terraria Wiki redirect and resolves to undefined otherwise

    var deferred = new $.Deferred();
    new mw.Api().get({
        action: 'query',
        format: 'json',
        titles: pagename,
        redirects: true,
        iwurl: true
    }).done(function(data) {
        var url;
        // example data for [[Mount]]: https://terrariamods.fandom.com/api.php?action=query&redirects=&iwurl=&titles=Mount
        if (data.query.redirects !== undefined && data.query.interwiki !== undefined) {
            var redir = data.query.redirects[0];
            var inter = data.query.interwiki[0];
            if (redir.tointerwiki === 'tgc' && inter.iw === 'tgc' && redir.to === inter.title) {
                // the redirect is a valid link to the Terraria Wiki
                url = inter.url;
            }
        }
        deferred.resolve(url);
    }).fail(function() {
        deferred.resolve();
    });
    return deferred;
}

function makeNewHovertext(title) {
    return 'Terraria Wiki: ' + title + ' (эта ссылка является перенаправлением на основную вики-страницу Terraria)';
}