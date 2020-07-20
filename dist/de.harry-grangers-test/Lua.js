//Hack to enable Module documentation pages
if (wgNamespaceNumber == 828) {
    $('#mw-content-text').find('pre.lua.source-lua').first().each(function (idx, elem) {
        var $doc = $(elem).prev('.doc-lua');
        if ($doc.length === 0) {
            $doc = $('<div />').addClass("doc-lua").insertBefore(elem);
        }
        var url = window.location.href.replace('/' + getNamespaceName(828) + ':', '/Harry_granger%27s_Test_Wiki:Lua-Module/');
        $doc.load(url + (url.indexOf('?') === -1 ? '?' : '&') + 'action=render', function () {
            $doc.prepend('<h2 />').append(
                $('<a />').attr("href",url).text('Module Documentation')
            );
           $doc.append('<h2 />').text('Module Source');
        });
    });
    if($('#mw-content-text').find('pre.lua.source-lua').text().match(/\[\[Kategorie:([A-Za-z0-9_\- ]+)\]\]/g)) {
        matches = $('#mw-content-text').find('pre.lua.source-lua').text().match(/\[\[Kategorie:([A-Za-z0-9_\- ]+)\]\]/g);
        categories = [];
        for(category in matches) {
            categories.push(matches[category].replace('[[Kategorie:','').replace(']]',''));
        }
        for(category in categories) {
            if(!$('.mw-normal-catlinks#mw-normal-catlinks').length) {
                nav = $('<nav />').addClass('article-categories').attr('id','articleCategories').appendTo($('.WikiaMainContentContainer#WikiaMainContentContainer'));
                catlinksWrapper = $('<div />').addClass('catlinks').attr('id','catlinks').appendTo(nav);
                catlinks = $('<div />').addClass('mw-normal-catlinks').attr('id','mw-normal-catlinks').appendTo(catlinksWrapper);
                cattitle =$('<a />').attr({
                    href: "/wiki/Spezial:Kategorien",
                    title: "Spezial:Kategorien",
                    rel: "nofollow"
                }).text('Kategorien').appendTo(catlinks);
                catlinks.append(':');
                catlist = $('<ul />').appendTo(catlinks);
            }
            else {
                catlist = $('.mw-normal-catlinks#mw-normal-catlinks ul');
            }
            li = $('<li />').appendTo(catlist);
            a = $('<a />').attr({
                'title': categories[category],
                'href': '/wiki/Kategorie:' + categories[category]
            }).text(categories[category]).appendTo(li);
            console.log(a,li,catlist)
        }
    }
}