adminLinks = {
    recentChanges: true,
    activityPage: true,
    activityBox: true
}
console.log(adminLinks);

addOnloadHook(function() {
    if (!!$('ul.special li a[title^="Benutzer:"].mw-userlink').length) {
        console.log('special');
    }
    if(adminLinks.recentChanges && !!$('table.mw-enhanced-rc td a[title^="Benutzer:"].mw-userlink').length) {
        console.log('recentChanges');
    }
    if(!!$('ul.activityfeed li cite a[href^="/wiki/Benutzer:"].mw-userlink').length) {
        console.log('letzte Änderungen');
    }
    if(adminLinks.activityPage && !!$('.subtle > a[href^="/wiki/Benutzer:"]').length) {
        console.log('letzte Änderungen');
    }
    if(adminLinks.activityBox && !!$('.edited-by a[href^="/wiki/Benutzer:"]').length) {
        console.log('letzte Änderungen Box');
        $('.edited-by a[href^="/wiki/Benutzer:"]').each(function(key,val) {
            getUserGroup('sysop',function(data) {
                var currentUser = /\/wiki\/Benutzer:(.*)/.exec($(val).attr('href'))[1].replace('_',' ');
                if($.inArray(currentUser,_.pluck(data.query.allusers,'name')) !== -1) {
                    $(val).after(
                        ' (',
                        $('<a />').attr('href','/wiki/Hilfe:Administratoren').text('Admin'),
                        ')'
                    );
                }
            });
        });
    }
});

/* Taken from: http://youtube.wikia.com/MediaWiki:Wikia.js */
addOnloadHook(function() {
    $.getJSON('/api.php?action=parse&text={{Footer}}&format=json', function(data) {
        $('.WikiaFooter section').before(
            $('<div />').attr('id','footer').append(data.parse.text['*'])
        );
    });
});