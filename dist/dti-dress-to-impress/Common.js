/* Any JavaScript here will be loaded for all users on every page load. */

/*
 Element animator
 
 Cycles through a set of elements (or "frames") on a 2 second timer per frame
 Add the "animated" class to the frame containing the elements to animate.
 Optionally, add the "animated-active" class to the frame to display first.
 Optionally, add the "animated-subframe" class to a frame, and the
 "animated-active" class to a subframe within, in order to designate a set of
 subframes which will only be cycled every time the parent frame is displayed.
 
 Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );

// NoLicenseWarning script
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
    ]
};

// VIP Tag Module
$(function() {
    if ($('.page-header__categories a[title="Category:VIP Items"]').length) {
        $('.page-header__title').append(' <img src="https://static.wikia.nocookie.net/dti-dress-to-impress/images/8/85/VIP_Display_Tag_-_Icon.png/revision/latest?cb=20251110180002&format=original" width="50" height="22" alt="VIP Item">');
    }
});

// VIP Tag Module
$(function() {
    if ($('.page-header__categories a[title="Category:WDFCD Items"]').length) {
        $('.page-header__title').append(' <img src="https://static.wikia.nocookie.net/dti-dress-to-impress/images/9/91/Cultural_Graphic_Hands_%28GLOW%29_-_Icon.png/revision/latest?cb=20250519021945&format=original" width="42" height="40" alt="VIP Item">');
    }
});

// Auto Message for Blocks
window.MessageBlock = {
	title: 'Blocked!',
	message: 'Hello user, you have been blocked for the following reason:'
};

// Welcome Module
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
                            .text('Welcome to the Dress to Impress Wiki!')
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
                                            .text('Close')
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