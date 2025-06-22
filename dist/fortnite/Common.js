/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'unit-tooltip',
        parse: '{'+'{<#unit#>|rank=<#rank#>|size=<#size#>|upgrade=<#upgrade#>|upgrades=<#upgrades#>|upgraded=<#upgraded#>|race=<#race#>|tt=<#tt#>|show=no}}',
        //onShow: function() { if ((this).getElementsByClassName('template-unit')[0]) {Unit = (this).getElementsByClassName('template-unit')[0]; console.info("Onshow var =",Unit); processunit (Unit);} },
    }, {
        classname: 'spell-tooltip',
        parse: '{'+'{<#spell#>|magnitude=<#magnitude#>|tt=<#tt#>}}',
    }, {
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }, {
        classname: 'structure-tooltip',
        parse: '{'+'{<#structure#>}}',
    }, {
        classname: 'building-tooltip',
        parse: '{'+'{<#building#>}}',
    }, {
        classname: 'damageability-tooltip',
        parse: '{'+'{<#ability#>|physical=<#physical#>|spirit=<#spirit#>|blight=<#blight#>|fire=<#fire#>|frost=<#frost#>|shock=<#shock#>|tt=<#tt#>|show=no}}',
        onShow: function(handle) { a = handle; writeloc = (this).getElementsByClassName('writedamage')[0]; damagesource = a.parentElement; unitloc = damagesource.parentElement.parentElement; damageCalc (writeloc, damagesource, unitloc); },
    }, {
        classname: 'protection-tooltip',
        parse: '{'+'{Prottable|<#magnitude#>|<#element#>}}',
    }, {
        classname: 'weakness-tooltip',
        parse: '{'+'{Weaktable|<#magnitude#>|<#element#>}}',
    }
];

window.LockForums = {
    expiryDays: 14,
    expiryMessage: 'This thread is considered archived because it hasn\'t been commented on <expiryDays> days, please don\'t bump this thread!'
};

window.MessageBlock = {
	title : 'You have been blocked',
	message : 'You have received a $2 block with the reason being $1',
	autocheck : true
};

/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 * Animations with the "animated-paused" class will be skipped each interval.
 *
 * Requires some styling from [[MediaWiki:Gadget-site-styles.css]].
 */
 $( function() {
 	
( function() {
    var $content = $( '#mw-content-text' );
    var advanceFrame = function( parentElem, parentSelector ) {
        var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
        $( curFrame ).removeClass( 'animated-active' );
        var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
        return $nextFrame.addClass( 'animated-active' );
    };

    // Set the name of the hidden property
    var hidden; 
    if ( typeof document.hidden !== 'undefined' ) {
        hidden = 'hidden';
    } else if ( typeof document.msHidden !== 'undefined' ) {
        hidden = 'msHidden';
    } else if ( typeof document.webkitHidden !== 'undefined' ) {
        hidden = 'webkitHidden';
    }

    setInterval( function() {
        if ( hidden && document[hidden] ) {
            return;
        }
        $content.find( '.animated' ).each( function() {
            if ( $( this ).hasClass( 'animated-paused' ) ) {
                return;
            }

            var $nextFrame = advanceFrame( this, '.animated' );
            if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
                advanceFrame( $nextFrame[0], '.animated-subframe' );
            }
        } );
    }, 2000 );
}() );

} );

/**
 * Sound button functionality (for Sound, ItemSound and AudioButton templates)
 * JS required to provide the functionality to add a button to play short sound
 * effects
 * Adapted from https://minecraft.fandom.com/wiki/MediaWiki:Gadget-sound.js
 */
'use strict';
mw.hook('wikipage.content').add(function ($content) {
	var i18n = {
		playTitle: 'Click to play',
		stopTitle: 'Click to stop',
		openFilePage: 'Open file page'
	};
	
	var $contextmenu = $('#sound-contextmenu');
	
	$content.find('.sound, .audio-button')
		.prop('title', i18n.playTitle )
		.on('contextmenu', function (e) {
			// Ignore links or selection
			if (e.target.tagName === 'A' || window.getSelection().toString()) return;
			
			e.preventDefault();
			$contextmenu.remove();
			
			let fileHref = $(this).find('a[href*="/File:"]').attr('href');
			let mwtitle = null;
			
			if (fileHref) {
				let match = fileHref.match(/\/File:(.+)$/);
				if (match) {
					mwtitle = decodeURIComponent(match[1]);
				}
			}
			
			if (!mwtitle) return;
			
			$contextmenu = $('<a id="sound-contextmenu">')
				.attr('href', mw.Title.makeTitle(6, mwtitle).getUrl())
				.attr('title', mwtitle)
				.css( {top: e.pageY, left: e.pageX} )
				.text( i18n.openFilePage )
				.appendTo( 'body' );
		})
		.on('click', function (e) {
			if (e.target.tagName === 'A') return;
			
			var audio = $(this).find('.sound-audio audio')[0];
			if (audio) {
				audio.paused ? audio.play() : audio.pause();
			}
		});
		
	$content.find('.sound .sound-audio audio')
		.on('play', function () {
			var playing = $('.sound-playing .sound-audio audio')[0];
			if (playing) playing.pause();

			$(this).closest('.sound')
				.addClass('sound-playing').prop('title', i18n.stopTitle);
		})
		.on('pause', function () {
			this.currentTime = 0;
			$(this).closest('.sound')
				.removeClass('sound-playing').prop('title', i18n.playTitle);
		});
	
	// Remove context menu if clicking elsewhere
	$(window).on('click', function (e) {
		if ($contextmenu.length && !$.contains($contextmenu[0], e.target)) {
			$contextmenu.remove();
			$contextmenu = $();
		}
	});
});