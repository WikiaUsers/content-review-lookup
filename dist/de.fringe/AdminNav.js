// ================================================================== //
// Spezial-Styles
// ================================================================== //
/* if($("#paralleluniversum").length) { //Prüft die Existenz eines Paralelluniversumscontainers auf einer entsprechenden Seite
    //alert('Paralleluniverum');
    importArticle({
        type: "style",
        article: "MediaWiki:Paralleluniversum.css"
    });
}
else if($("#regUniversum").length) { //Prüft die Existenz eines regUniversum-Containers auf einer entsprechenden Seite
    //alert('Seite aus dem regulären Universum');
    importArticle({
        type: "style",
        article: "MediaWiki:Reguläres Universum.css"
    });
}
else {
    alert('Ganz normale Seite, kein Spezial-Style');
} */

var chevron =  $('<img />').attr('src','data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D').addClass('chevron');

if($.inArray("sysop", wgUserGroups)) {
    $('nav.WikiNav ul.nav').append(
        $('<li />').addClass('nav-item js-admin-nav-item').html(
            $('<a />').attr('href','/wiki/Spezial:AdminDashboard?tab=general').text('Admin')
        ).append(
            $('<ul />').addClass('subnav-2').append(
                /* Tab CSS */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />').addClass('subnav-2a').attr('href','#').text('CSS').append(
                        chevron.clone()
                    )
                ).append(
                    $('<ul />').addClass('subnav-3 subnav').append(
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/wiki/Spezial:CSS')
                                .attr('data-canonical','oasis-css')
                                .text('OasisCSS bearbeiten')
                        ),
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/wiki/MediaWiki:Monobook.css')
                                .attr('data-canonical','monobook-css')
                                .text('MonobookCSS bearbeiten')
                        )
                    )
                ),
                /* Tab JS */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />').addClass('subnav-2a').attr('href','#').text('JS').append(
                        chevron.clone()
                    )  
                ).append(
                    $('<ul />').addClass('subnav-3 subnav').append(
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/wiki/MediaWiki:Wikia.js')
                                .attr('data-canonical','oasis-js')
                                .text('WikiaJS bearbeiten')
                        ),
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/wiki/MediaWiki:Common.js')
                                .attr('data-canonical','monobook-js')
                                .text('MonobookJS bearbeiten')
                        )
                    )
                ),
                /* Tab Wiki-Navigation */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />')
                        .addClass('subnav-2a')
                        .attr('href','/wiki/MediaWiki:Wiki-navigation?action=edit')
                        .text('Wiki-Navigation')  
                ),
                /* Tab Kategorien */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />')
                        .addClass('subnav-2a')
                        .attr('href','Kategorie:!Hauptkategorie')
                        .text('Kategorien')
                        .append(
                            chevron.clone()
                        )
                ).append(
                    $('<ul />').addClass('subnav-3 subnav').append(
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/wiki/Spezial:Kategorien')
                                .text('Alle Kategorien')
                        ),
                        $('<li />').addClass('subnav-3-item').append(
                            $('<a />')
                                .addClass('subnav-3a')
                                .attr('href','/index.php?title=Spezial%3AKategorienbaum&target=%21Hauptkategorie&mode=categories&dotree=Laden')
                                .text('Kategoriebaum')
                        )
                    )
                ),
                /* Tab Spezialseiten */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />')
                        .addClass('subnav-2a')
                        .attr('href','/wiki/Spezial:Spezialseiten')
                        .text('Alle Spezialseiten')    
                ),
                /* Tab Logbuch */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />')
                        .addClass('subnav-2a')
                        .attr('href','/wiki/Spezial:Logbuch')
                        .text('Logbuch')    
                ),
                /* Tab Insights */
                $('<li />').addClass('subnav-2-item').html(
                    $('<a />')
                        .addClass('subnav-2a')
                        .attr('href','/wiki/Spezial:Insights')
                        .text('Insights')    
                )
            )
        )
    );

    /*$('nav.WikiNav ul.nav li:first-child').addNavItem('js-admin-nav-item',{
        external: false,
        href:   'Die Serie',
        text:   'Die Serie',
        alt:    'about',
        title:  'Die Serie'
    });*/
}

$('nav.WikiNav ul.nav').init.prototype.addNavItem = function(navItemClass,link) {
    $(this).append(newNavItem(1,navItemClass,link));
    return $(this);
};

$('nav.WikiNav ul.nav li.nav-item,\
    nav.WikiNav ul.nav li.nav-2-item').init.prototype.addSubNavItem = function(navItemClass,link) {
    level = 1
    if($(this).hasClass('nav-item')) {
        level = 2;
    }
    else if($(this).hasClass('subnav-2-item')) {
        level = 3;
    }
    if(!$(this).find('ul.subnav-' + level).length) {
        $('<ul />').addClass('subnav subnav-' + level).appendTo($(this));
        $(this).find('a').append(chevron.clone());
    }
    $(this).find('ul.subnav-' + level).append(newNavItem(level,navItemClass,link));
    return $(this);
};

function newNavItem(level,navItemClass,link) {
    li = $('<li />');
    isSub = (level === 2 || level == 3);
    _navItemClass = (isSub ? 'sub' : '') + 'nav-' + (isSub ? level + '-' : '') + 'item';
    li.addClass(_navItemClass);
    if(navItemClass && navItemClass !== '') {
        li.addClass(navItemClass);
    }
    a = $('<a />')
            .attr('href',(link.external ? link.href : '/wiki/' + link.href))
            .text(link.text);
    if(isSub) {
        a.addClass('subnav-' + level + 'a');
    }
    a.appendTo(li);
    return li;
}

$('nav.WikiNav ul.nav li:first-child ul.subnav-2').prepend(
    $('<li />').addClass('subnav-2-item').html(
        $('<a />').addClass('subnav-2a').attr('href','/wiki/Die_Serie').attr('data-canonical','about').text('Die Serie')
    )
);

$('li.nav-item.js-admin-nav-item').siblings().hover(function() {
    $('li.nav-item.js-admin-nav-item').find('ul.subnav-2').hide();
    $('li.nav-item.js-admin-nav-item').removeClass('marked');
});
$('li.nav-item.js-admin-nav-item li.subnav-2-item').mouseleave(function() {
    $(this).find('.subnav-3').hide(); 
});