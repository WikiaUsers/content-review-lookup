function appendLink(nav, position, page, text) {
    var navigation;
    switch(nav) {
        case 'mitmachen':
            navigation = $('#WikiHeader > .buttons > nav > .WikiaMenuElement > li');
            break;
        case 'user':
            navigation = $('.user-menu.subnav.global-nav-dropdown > li');
            break;
    }
    re = new RegExp(/http:\/\//);
    if (navigation.length >= position) {
        navigation.slice(position-1, position).before(
            $('<li />').html(
                $('<a />').attr({
                    'alt': text,
                    'title': text,
                    'href': re.test(page) ? encodeURI(page) : '/wiki/' + encodeURI(page)
                }).text(text)
            )
        )
    } else {
        navigation.parent().append(
            $('<li />').html(
                $('<a />').attr({
                    'alt': text,
                    'title': text,
                    'href': re.test(page) ? encodeURI(page) : '/wiki/' + encodeURI(page)
                }).text(text)
            )
        )
    }
}