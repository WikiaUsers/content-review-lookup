/* User Tags */
window.UserTagsJS = {
    tags: {
        discordmod: { u: 'Discord Moderator' },
        imagecontrol: { u: 'Image Control' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
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

/* Adds icons to page header
 * by: The 888th Avatar, adapted to new header by Thailog
 */
$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#icons' ) );
        $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
    }
});

/*Keeps staff blogs from locking after 30 days of no commenting */
window.LockOldBlogs = {
    nonexpiryCategory: "Staff Blogs"
};

/* Randomize wiki word-marks */
$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/lady-bug/images/e/ee/Ladybug_Logo.png/revision/latest?cb=20190524070545',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/12/Chat_Logo.png/revision/latest?cb=20190524070620',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/4a/Fox_Logo.png/revision/latest?cb=20190524072049',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/1a/Bee_Logo.png/revision/latest?cb=20190524154346',
        'https://vignette.wikia.nocookie.net/lady-bug/images/8/80/Turtle_Logo.png/revision/latest?cb=20190524154414',
        'https://static.wikia.nocookie.net/lady-bug/images/6/66/Peacock_Logo.png/revision/latest?cb=20210621113042',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/43/Butterfly_Logo.png/revision/latest?cb=20190524072147'
      ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

if ($('body').hasClass('theme-fandomdesktop-dark')) {
    $('.fandom-community-header__image > img').attr('src', 'https://static.wikia.nocookie.net/lady-bug/images/5/5b/Night_theme_icon.png/revision/latest?cb=20210625114314');
}

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