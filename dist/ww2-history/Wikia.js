// 05:34, January 3, 2013 (UTC)
// <source lang="JavaScript">

// Script imported here will affect only the default Wikia skin (Oasis)

// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// Add Inactive User Icon to MastheadProfiles
importScriptPage('InactiveUsers/code.js', 'dev');
// END Add Inactive User Icon to MastheadProfiles

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});


// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function ToprighticonOasis() {
	$( '.WikiaPageHeader' ).append( $( '#title-toprighticon' ) );
	$( '#title-toprighticon' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-1em' } ).show();
} );

/* Featured Articles Module*/
$(function() {
    var featured;
    if (localStorage.getItem('featured-' + mw.config.get('wgDBname'))) {
        featured = +localStorage.getItem('featured-' + mw.config.get('wgDBname'));
    } else {
        featured = 1;
        localStorage.setItem('featured-' + mw.config.get('wgDBname'), 1);
    }
    if (featured < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Featured Articles',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('module')
                    .addClass('featured-module')
                    .append(
                        $('<div>')
                            .addClass('featured-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.featured-module .anons').show();
            }
            $('.featured-module #remove').on('click', function() {
                localStorage.setItem('featured-' + mw.config.get('wgDBname'), 4);
                $('.featured-module').fadeOut('slow');
            });
            $('.featured-module #cancel').on('click', function() {
                localStorage.setItem('featured-' + mw.config.get('wgDBname'), ++featured);
                $('.featured-module').fadeOut('slow');
            });
        });
    }
});

// </source>