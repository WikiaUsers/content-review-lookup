function setWatchlistEntry(title, state) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=info&intoken=watch&titles=' + encodeURIComponent(title) + '&format=json').done(function(response) { 
        $.post('http://de.harry-grangers-test.wikia.com/api.php?action=watch&title=' + encodeURIComponent(title) + '&format=json&' + (state == 'unwatch' ? 'unwatch' : '') + '&token=' + encodeURIComponent(response.query.pages[Object.keys(response.query.pages)[0]].watchtoken)).done(function(data) {
            console.log(data.watch.message);
            notify(data.watch.message);
        });
    });
}

if(wgCanonicalSpecialPageName == "Following") {
    $('.WikiaMainContentContainer#WikiaMainContentContainer').prepend(
        $('<div />').addClass('UserProfileActionButton').append(
            $('<nav />').addClass('wikia-menu-button').append(
                $('<a />').attr({
                    'accesskey': 'e',
                    'data-id': 'edit',
                    'id': 'ca-edit',
                    'href': '/wiki/Spezial:Beobachtungsliste_bearbeiten'
                }).css('border-right','none').text('Bearbeiten').prepend(
                    $('<img />')
                               .addClass('sprite edit-pencil')
                               .height(16)
                               .width(16)
                  .attr('src','data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D')
                               .css('margin-right','5px')
                )
            )
        )
    );
}

if(wgCanonicalSpecialPageName == "EditWatchlist") {
    $('.mw-watchlist-toollinks a:first-of-type').before(
        $('<a />').attr({
            'href': '/wiki/Spezial:Verfolgen',
            'title': 'Spezial:Verfolgen'
        }).text('Ansehen')
    ).before(' | ');
}