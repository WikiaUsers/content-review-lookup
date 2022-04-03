/* Any JavaScript here will be loaded for all users on every page load. */

/*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		joshbiased: { u:'Josh Biased'},
		pablobiased: { u:'Pablo Biased'},
		stellbiased: { u:'Stell Biased'},
		kenbiased: { u:'Ken Biased'},
		justinbiased: { u: 'Justin Biased'},
	}
};

/* Adds icons to page header bottom border
 * credits to https://avatar.fandom.com/wiki/MediaWiki:Common.js/icons.js
 */

$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );

/*Welcome Module (Sia Wiki)*/
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:NewUser',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('rail-module')
                    .attr('id', 'welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('has-icon')
                            .text('Welcome to the SB19 Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('wds-button-group')
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('#welcome-module .anons').show();
            }
            $('#welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('#welcome-module').fadeOut('slow');
            });
            $('#welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('#welcome-module').fadeOut('slow');
            });
        });
    }
});