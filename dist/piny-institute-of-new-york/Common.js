/* User Tags */
window.UserTagsJS = {
    tags: {
        chatmoderator: { u: 'Discord Moderator' },
        imagecontrol: { u: 'Image control' },
        sysop: { u: 'Administrator' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
            'sysop',
            'rollback',
            'bot'
        ]
    }
};

/* Link to Discussions Feed */
if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity' || mw.config.get('wgCanonicalSpecialPageName') == 'Recentchanges') {
    $('<li>', {
        id: 'discussrclink',
    }).html('<a href="/wiki/Special:DiscussionsFeed">Discussions Feed</a>')
    .prependTo('.toolbar .tools');
}

/*For [[Template:Icons]] */
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );

/*Keeps staff blogs from locking after 30 days of no commenting */
window.LockOldBlogs = {
    nonexpiryCategory: "Staff Blogs"
};

/* Massscript limits */
window.MassCategorizationGroups = ['sysop', 'imagecontrol', 'bot'];

/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

/* Episode Guide International hides headings on Desktop */
const
    epgPages = "Episode_guide/International/",
    epgTabber = "wds-tabber",
    epgTabContent = "wds-tab__content";

if (mw.config.get('wgPageName').startsWith(epgPages)) {
    const tabs = document.getElementsByClassName(epgTabber);
    if (tabs) {
        Array.prototype.forEach.call(document.getElementsByClassName(epgTabContent), function(tab) {
            Array.prototype.forEach.call(tab.getElementsByTagName("h2"), function(i) {
                i.remove();
            });
        });
    }
}

/* Clock Configuration */ 
window.UTCClockConfig = {
    format: '%2I:%2M:%2S %p %{Monday;Tuesday;Wednesday;Thursday;Friday;Saturday;Sunday}w,  %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (UTC)',
}