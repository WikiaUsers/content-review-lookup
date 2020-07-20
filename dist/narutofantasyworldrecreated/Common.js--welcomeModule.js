// Moduł "Witaj na wiki"
// oryginał by Vuh

function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}

function showUserMessage() {
    if (hasGroup('user')) {
        $('.WikiaRail .WikiaSearch').after(
            $('<section />').css({'text-align':'center'}).addClass("module")
            .append(
                $('<h1 style="text-align:left !important;">Welcome on BlazBlue Wiki!</h1>').css({'margin-bottom':'10px'}),
                $('<div />')
                .append(
                    $('<a />', {'href':'/wiki/BlazBlue Wiki:Rules'}).text('Terms of Use'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/BlazBlue Wiki:FAQ'}).text('FAQ'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Category:Help'}).text('Help'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<br />'),
                    $('<a />', {'href':'/wiki/Special:RecentChanges'}).text('Recent Changes'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/BlazBlue Wiki:Sandbox'}).text('Sandbox'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Special:Forum'}).text('Forum')
                ),
                $('<div class="createbox" style="margin-top: 1em; margin-left: auto; margin-right: auto; text-align:center"><p></p><form name="createbox" action="/index.php" method="get" class="createboxForm"><input type="hidden" name="action" value="create"><input type="hidden" name="prefix" value=""><input type="hidden" name="preload" value=""><input type="hidden" name="editintro" value=""><input class="createboxInput" placeholder="New article name" name="title" type="text" value="" size="24"><input type="submit" name="create" class="createboxButton" value="Create article"><p></p></form></div>'),
                $('<table />', {'id':'WelcomeButtons'})
                .append(
                    $('<tr />')
                    .append(
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Special:Contributions','title':'Contributions'}).text('Contributions').addClass("wikia-button secondary").css({'font-size':'11px','margin':'8px 4px'})
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Special:Following','title':'Following pages.','class':'wikia-button secondary'}).text('Following pages').css({'font-size':'11px','margin':'8px 4px'})
                        )
                    )
                )
            )
        );
    };
}
 
addOnloadHook(showUserMessage);