window.gnWikiLinks = ['//dev.wikia.com|Dev'];
$(function () {
    var $menu = $('.wds-global-navigation__link-group .wds-list'),
        links = window.gnWikiLinks || [];
    if (!$menu.length || !links.length) return;
    links.forEach(function (v) {
        var link = v.replace(/\[|\]/g, ''),
            $a = $('<a>', {
                href: (/(.*?)\||$/.exec(link) || {})[1] || link,
                text: (/\|(.*)/.exec(link) || {})[1] || link,
                title: link
            });
        $menu.prepend($('<li>').append($a));
    });
});
window.gnWikiLinks = ['//elenaofavalor.wikia.com|Elena of Avalor'];
$(function () {
    var $menu = $('.wds-global-navigation__link-group .wds-list'),
        links = window.gnWikiLinks || [];
    if (!$menu.length || !links.length) return;
    links.forEach(function (v) {
        var link = v.replace(/\[|\]/g, ''),
            $a = $('<a>', {
                href: (/(.*?)\||$/.exec(link) || {})[1] || link,
                text: (/\|(.*)/.exec(link) || {})[1] || link,
                title: link
            });
        $menu.prepend($('<li>').append($a));
    });
});
window.gnWikiLinks = ['//paladins.wikia.com|Paladins'];
$(function () {
    var $menu = $('.wds-global-navigation__link-group .wds-list'),
        links = window.gnWikiLinks || [];
    if (!$menu.length || !links.length) return;
    links.forEach(function (v) {
        var link = v.replace(/\[|\]/g, ''),
            $a = $('<a>', {
                href: (/(.*?)\||$/.exec(link) || {})[1] || link,
                text: (/\|(.*)/.exec(link) || {})[1] || link,
                title: link
            });
        $menu.prepend($('<li>').append($a));
    });
});
window.gnWikiLinks = ['//calvinandhobbes.wikia.com|Calvin and Hobbes'];
$(function () {
    var $menu = $('.wds-global-navigation__link-group .wds-list'),
        links = window.gnWikiLinks || [];
    if (!$menu.length || !links.length) return;
    links.forEach(function (v) {
        var link = v.replace(/\[|\]/g, ''),
            $a = $('<a>', {
                href: (/(.*?)\||$/.exec(link) || {})[1] || link,
                text: (/\|(.*)/.exec(link) || {})[1] || link,
                title: link
            });
        $menu.prepend($('<li>').append($a));
    });
});