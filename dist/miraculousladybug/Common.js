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
        ],
        custom: {
            'Zsotroav': ['discordmod'],
            'Amir999990': ['discordmod']
        }
    }
};

/* Link to Discussions Feed */
mw.loader.using('mediawiki.util').then(function () {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity' ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Recentchanges'
    ) {
        return;
    }
    
    $('<li>', {
        id: 'discussrclink',
        prependTo: $('#WikiaBar .toolbar .tools'),
        append: $('<a>', {
            text: 'Discussions Feed',
            href: mw.util.getUrl('Special:DiscussionsFeed')
        })
    });
});

/* For [[Template:Icons]] */
$(function () {
	var icons = $('#icons');
    if (icons.length) {
        $('.page-header__meta').after(icons);
        icons.show();
    }
});

/* Randomize wiki word-marks */
/*$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/lady-bug/images/e/ee/Ladybug_Logo.png',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/12/Chat_Logo.png',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/4a/Fox_Logo.png',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/1a/Bee_Logo.png',
        'https://vignette.wikia.nocookie.net/lady-bug/images/8/80/Turtle_Logo.png',
        'https://static.wikia.nocookie.net/lady-bug/images/6/66/Peacock_Logo.png',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/43/Butterfly_Logo.png'
      ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});*/

if (mw.config.get('isDarkTheme')) {
    $('.fandom-community-header__image > img').attr('src', 'https://static.wikia.nocookie.net/lady-bug/images/5/5b/Night_theme_icon.png');
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

/* Episode Guide International hides headings on Desktop */
$(function () {
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
});

// Template:Stext JS
$('.spoiler_on').click(function () {
    if ($(this).hasClass('spoiler_on')) {
        $(this).switchClass('spoiler_on', 'spoiler_off');
    } else {
        $(this).switchClass('spoiler_off', 'spoiler_on');
    }
});

/* Clock Configuration */ 
window.UTCClockConfig = {
    format: '%2I:%2M:%2S %p %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w,  %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (UTC)',
}