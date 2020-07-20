if([2,500,3,1200].indexOf(wgNamespaceNumber) >= 0) {
    for(subpage in userSubpages) {
        $('.WikiaUserPagesHeader#WikiaUserPagesHeader .tabs-container ul.tabs').append(
            $('<li />').data('id','pages').append(
                $('<a />').attr({
                    title: 'Benutzer:Agent Zuri/' + userSubpages[subpage], //  'Benutzer:' + wgUserName + '/' + 
                    href: '/wiki/Benutzer:Agent Zuri/' + userSubpages[subpage]
                }).text(userSubpages[subpage])
            )
        );
    }
}