importScriptPage('MediaWiki:RelocateEditDiscussionButtons/code.js', 'dev');

// Adds a button linking to the talk page.
/**
 * Notice: this script was entirely obscured as of May 19th, 2015. It may need updating.
 **/

;( function ( mw ) {
'use strict';
	// Adds a button linking to the talk page.
	var config = mw.config;
	if ( document.getElementsByClassName( 'comments' ) &&
		config.get( 'wgNamespaceNumber' ) === 0 &&
		config.get( 'wgAction' ) === 'view' &&
		!config.get( 'wgIsMainPage' )
	) {
		var tpbutton = document.createElement( 'a' );
		tpbutton.accessKey = 't';
		tpbutton.href = mw.config.get( 'wgServer' ) + '/wiki/Talk:' +
			mw.config.get( 'wgPageName' );
		tpbutton.className = 'wikia-button secondary talk';
		tpbutton.rel = 'nofollow';
		tpbutton.setAttribute( 'data-id', 'comment' );
		tpbutton.textContent = 'Talk page';
		document.getElementById( 'WikiaPageHeader' ).appendChild( tpbutton );		
	}
}( mediaWiki ) );

$('#WikiaArticle').prepend('<div id="mp-footer">Welcome to Wikipool! <b><a href="http://8ballpool.wikia.com/wiki/Wikipool:Policies">Please read the policies before joining.</a></b></div>');
$('#WikiaArticle').prepend('<div id="ma-article-type"{{Articletype}}</div>');

// Add [[Template:TalkMessage]] when creating a new edit section
 
if ( mw.config.get("wgNamespaceNumber") == 3 && mw.config.get("wgPageName") != "User_talk:"+mw.config.get("wgUserName") ) {
	$('#WikiaMainContent nav.wikia-menu-button > a').attr("href",$('#WikiaMainContent nav.wikia-menu-button > a').attr("href")+"&preload=Template:TalkMessage");
} else {
	$('body.ns-talk #WikiaPageHeader nav.wikia-menu-button > a[data-id="addtopic"]').attr("href",$('nav.wikia-menu-button > a[data-id="addtopic"]').attr("href")+"&preload=Template:TalkMessage");
}

// Add CANCEL Button for new RTE
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
// END Add CANCEL Button for new RTE
 
// Minor edits button help link (discluding wide mode)
$(document).ready(function() {
	if ($("body.editor #EditPage .module_content .checkboxes label.wpMinoredit").length > 0) { // check whether a an older revision exists
		$("body.editor #EditPage .module_content .checkboxes").append('<a id="minor-edit-help" href="/wiki/Help:Minor_edits" title="What is this?" target="_blank" style="font-size: 11px;">(help)</a>');
		$("body.editor #EditPage .module_content .checkboxes .wpMinoredit").css("display","inline-block");
	}
});

// AJAX
/**
 * Side script: MediaWiki:AjaxRC.js
 **/
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages", "Special:NewFiles"];

/** UTC clock - from the RuneScape Wiki <http://runescape.wikia.com/wiki/MediaWiki:Gadget-Timer.js>
 * Side script: <http://runescape.wikia.com/wiki/MediaWiki:Gadget-Timer.css>
 * Adds a UTC clock to oasis (global nav) or monobook (user links)
 *
 * @author Poke <http://bulbapedia.bulbagarden.net/wiki/User:Poke>
 * @author Suppa chuppa
 * @author Ryan PM
 * @author Cqm
 */

;( function ( $, mw ) {

    'use strict';

    var self = {
        /**
         * Placeholder for element to update with the new time
         */
        $timer: null,

        /**
         * Initial loading function
         */
        init: function () {
            var $elem = $( '#WikiHeader > .buttons, #p-personal ul:first-child' ),
                $li;

            if ( !$elem.length ) {
                return;
            }
          
            // don't load twice
            if ( $( '#display-timer' ).length ) {
                return;
            }

            $li = $( '<li>' )
                .attr( 'id', 'display-timer' )
                .append(
                    $( '<a>' )
                        .attr( {
                            'id': 'show-date',
                            'title': 'Purge the server cache and update the contents of this page.',
                            'href': mw.util.wikiGetlink() + '?action=purge'
                        } )
                );

            if ( mw.config.get( 'skin' ) === 'oasis' ) {
                $elem.append(
                    $li.attr( 'class', 'oasis-timer' )
                );
            } else {
                $elem.prepend( $li );
            }

            // store reference to element which we update the time with
            self.$timer = $( '#show-date' );
            // set initial time
            self.update();
            // and update every 1 sec
            setInterval( self.update, 1000 );
        },

        /**
         * Updates the time
         */
        update: function () {
            var time = ( new Date() )
                .toUTCString()
                .replace( 'GMT', '(UTC)' )
                .substring( 5 );

            self.$timer.text( time );
        }

    };

    $( self.init );

}( jQuery, mediaWiki ) );

/**
 * Reference tooltips
 *
 * Adds a tooltip to references when hovering over or clicking them
 * Based on [[mw:Reference tooltips]]
 *
 * @author Cqm
 *
 * @todo Add fade in/fade out animations for config form and tooltip
 * @todo Find some way to detect of user has keyboard/mouse
 *       as windows 8 supports touchscreens and a mouse
 *       so allow hover activation if that's the case
 */

;(function ($, mw) {

    'use strict';

    function tooltips() {

        var i,
            settings,
            timer;

        /**
         * Cookie functions
         */
        function createCookie() {

            $.cookie('ref-tooltips', 'on-200-hover', {
                path: '/',
                expires: 90
            });

            return 'on-200-hover';

        }

        function getCookie() {

            var cookie = $.cookie('ref-tooltips') || createCookie(),
                storedVars = cookie.split('-'),
                touchscreen = 'ontouchstart' in document.documentElement;

            settings = {
                on: storedVars[0],
                delay: storedVars[1],
                delayNo: parseInt(storedVars[1], 10),
                action: storedVars[2]
            };

            if (settings.action === 'hover') {
                settings.hover = true;
                settings.click = false;
            }

            if (settings.action === 'click') {
                settings.hover = false;
                settings.click = true;
            }

            if (touchscreen === true) {
                settings.action = 'click';
                settings.hover = false;
                settings.click = true;
            }

            mw.log(settings);

        }

        function modifyCookie() {

            var inputs = document.getElementById('rsw-config-action').getElementsByTagName('input');

            for (i = 0; i < inputs.length; i += 1) {
                if (inputs[i].checked) {
                    settings.action = inputs[i].value;
                }
            }

            settings.delay = $('#rsw-config-delay input').first().val();

            // in case someone sets a greater value manually
            if (parseInt(settings.delay, 10) > 1000) {
                settings.delay = '1000';
            }

            $.cookie('ref-tooltips', 'on' + '-' + settings.delay + '-' + settings.action, {
                path: '/',
                expires: 90
            });

            window.location.reload(false);

        }

        function disableTooltips() {

            // just use defaults for delay and action as no one really cares
            $.cookie('ref-tooltips', 'off-200-hover', {
                path: '/',
                expires: 90
            });

            window.location.reload(false);

        }

        /**
         * Create and remove functions
         */
        function removeConfig() {

            $('#rsw-config').remove();
            $('#rsw-config-background').remove();

        }

        function createConfig() {

            var body,
                form,
                formBackground,
                formLeft,
                formTop;

            // use this for formBackground height/width        
            body = document.body;

            // for config positioning
            formTop = ($(window).height() / 4) + 'px';
            formLeft = (($(window).width() - 510) / 2) + 'px';

            // create form container
            form = $('<div/>', {
                'id': 'rsw-config'
            }).css({
                'top': formTop,
                'left': formLeft
            }).append(
                $('<div/>', {
                    'id': 'rsw-config-header'
                }).append(
                    $('<span/>', {
                        'id': 'rsw-config-title',
                        'html': 'Reference Tooltip Settings'
                    }),

                    $('<span/>', {
                        'id': 'rsw-config-close',
                        'title': 'Close settings',
                        'click': function () {
                            removeConfig();
                        }
                    })
                ),

                $('<div/>', {
                    'id': 'rsw-config-body'
                }).append(
                    $('<form/>').append(
                        $('<input>', {
                            'id': 'rsw-config-disable',
                            'type': 'button',
                            'value': 'Disable reference tooltips',
                            'click': function () {
                                disableTooltips();
                            }
                        }),

                        $('<div/>', {
                            'id': 'rsw-config-note',
                            'html': 'Once disabled, reference tooltips can be re-enabled using the link at the bottom of the page.'
                        }),

                        $('<label/>', {
                            'id': 'rsw-config-delay',
                            'html': 'Delay before the tooltip appears (in milliseconds): '
                        }).append(
                            $('<input>', {
                                'type': 'number',
                                'step': '50',
                                'min': '0',
                                'max': '1000',
                                'value': settings.delay
                            })
                        ),

                        $('<br>'),

                        $('<span/>', {
                            'id': 'rsw-config-action',
                            'html': 'Tooltip is activated by: '
                        }).append(
                            $('<label/>', {
                                'html': 'Hover'
                            }).prepend(
                                $('<input>', {
                                    'type': 'radio',
                                    'name': 'tooltip-action',
                                    'checked': settings.hover,
                                    'value': 'hover'
                                })
                            ),

                            $('<label/>', {
                                'html': 'Click'
                            }).prepend(
                                $('<input>', {
                                    'type': 'radio',
                                    'name': 'tooltip-action',
                                    'checked': settings.click,
                                    'value': 'click'
                                })
                            )
                        )
                    )
                ),

                $('<div/>', {
                    'id': 'rsw-config-footer'
                }).append(
                    $('<button/>', {
                        'id': 'rsw-config-save',
                        'type': 'button',
                        'html': 'Save settings',
                        // 'class': '', in case it needs a wikia class to blend in
                        'click': function () {
                            modifyCookie();
                        }
                    })
                )
            );

            formBackground = $('<div/>', {
                'id': 'rsw-config-background',
                'click': function () {
                    removeConfig();
                }
            }).css({
                'height': body.clientHeight + 'px',
                'width': body.clientWidth + 'px'
            });

            $('body').append(form);
            $('body').append(formBackground);

        }

        function removeTooltip() {

            $('.rsw-tooltip').remove();

        }

        function createTooltip(event) {

            var offset,
                refId,
                ref,
                openSettings,
                tooltip,
                tooltipHeight,
                tooltipWidth,
                top,
                left;

            if ($('.rsw-tooltip').length) {
                removeTooltip();
            }

            offset = $(event.target).offset();

            // use native js for most of this as it's easier to debug
            refId = event.target.href.split('#')[1];

            ref = $('#' + refId).children('.reference-text').clone();


            openSettings = $('<span/>', {
                'id': 'rsw-tooltip-settings',
                'click': function () {
                    createConfig();
                }
            });


            tooltip = $('<div/>', {
                'class': 'rsw-tooltip'
            }).append(
                openSettings,
                ref
            );

            $('body').append(tooltip);

            tooltipHeight = $('.rsw-tooltip').height();
            tooltipWidth = $('.rsw-tooltip').width();

            top = offset.top - tooltipHeight - 25;
            left = offset.left - 7;

            // if above the top of the page
            if (top < window.pageYOffset) {
                top = window.pageYOffset;
            }

            // if too far right
            // only an issue in monobook
            if ((tooltipWidth + left) > $('body').width()) {
                left = $('body').width() - tooltipWidth;
            }

            $('.rsw-tooltip').css({
                'top': top + 'px',
                'left': left + 'px'
            });

        }

        /**
         * Functions for each tooltip activation action
         */
        function tooltipHover() {

            function hide() {

                timer = window.setTimeout(function () {
                    removeTooltip();
                }, 500);

            }

            $('.reference').mouseover(function (event) {
                window.clearTimeout(timer);
                window.setTimeout(function () {
                    createTooltip(event);
                }, settings.delayNo);
            });

            $('body').mouseover(function (event) {

                var hoverTarget;

                if ($('.rsw-tooltip').length) {

                    mw.log(event.target);
                    hoverTarget = $(event.target);

                    if (hoverTarget.is('.rsw-tooltip, .rsw-tooltip *')) {
                        window.clearTimeout(timer);
                        return;
                    }

                    hide();

                }
            });

        }

        function tooltipClick() {

            $('body').on('click', function (event) {

                var clickTarget;

                clickTarget = $(event.target);

                if (clickTarget.is('.reference') || clickTarget.is('.reference a')) {
                    event.preventDefault();
                    window.setTimeout(function () {
                        createTooltip(event);
                    }, settings.delayNo);
                }

                if ($('.rsw-tooltip').length) {
                    if (clickTarget.is('.rsw-tooltip, .rsw-tooltip *')) {
                        return;
                    }

                    removeTooltip();

                }

            });

        }

        /**
         * Functions to run straight away
         */
        function accessConfig() {

            var settingsLink;

            settingsLink = $('<span/>', {
                'id': 'rsw-config-open',
                'title': 'Configure reference tooltips'
            }).append(
                $('<a/>', {
                    'html': '[Reference Tooltip Settings]',
                    'click': function () {
                        createConfig();
                    }
                })
            );

            // after categories module in oasis
            if (mw.config.get('skin') === 'oasis' && $('#WikiaArticleCategories').length) {
                $('#WikiaArticleCategories').after(settingsLink);
            } else {
                $('#mw-content-text').append(settingsLink);
            }

        }

        function tooltipAction() {

            getCookie();

            if (settings.on === 'off') {
                return;
            }

            if (settings.action === 'click') {
                tooltipClick();
            }

            if (settings.action === 'hover') {
                tooltipHover();
            }

        }

        /**
         * Function invocation
         */
        accessConfig();
        tooltipAction();

    }

    $(function () {

        var namespace = mw.config.get('wgNamespaceNumber');

        if (namespace === 0 || namespace === 4) {

            if ($('.references').length === 0) {
                mw.log('no references');
                return;
            }

            if (mw.config.get('wgAction') !== 'view') {
                return;
            }

            tooltips();

        }

    });

}(jQuery, mediaWiki));

/** <pre>
 * Article Ratings script
 *
 * @author Cqm
 *
 * @notes Requires abusefilters to work
 */

;( function ( $, mw ) {

    'use strict';

        /**
         * Cache mw.config values
         */
    var conf = mw.config.get( [
            'skin',
            'wgNamespaceNumber',
            'wgMainPageTitle',
            'wgPageName',
            'wgTitle',
            'wgUserName'
        ] ),
        self = {
            /**
             * Checks we can continue
             */
            init: function () {
                // check we're in mainspace and not on the main page
                if ( conf.wgNamespaceNumber === 0 && conf.wgTitle !== conf.wgMainPageTitle ) {
                    // don't load twice
                    if ( $( '#RatingsModule' ).length ) {
                        return;
                    }

                    // only load for oasis
                    if ( ['oasis', 'wikia'].indexOf( conf.skin ) === -1 ) {
                        return;
                    }

                    // @todo checks
                    // check for redirect
                    // check for charm log
                    // check for disambig
                    // check for blocked user (how?)

                    // wait for sidebar to load before adding anything to it
                    if ( $( '#WikiaRail > .module' ).length ) {
                        self.loadForm();
                    } else {
                        setTimeout( self.init, 500 );
                    }
                }
            },

            /**
             * Creates the ratings form
             *
             * Form currently in the sidebar
             * @todo explore other places we can use it (a/b testing)
             */
            loadForm: function () {

                var $form = $( '<section>' )
                    .attr( 'id', 'RatingsModule' )
                    .addClass( 'module' )
                    .addClass( 'RatingsModule' )
                    .append(
                        $( '<h1>' )
                            .attr( 'id', 'ar-header' )
                            .text( 'Rate this page' ),
                        $( '<form>' )
                            .attr( {
                                'action': '#',
                                'id': 'ar-form'
                            } )
                            .on( 'submit', self.submitFeedback )
                            .append(
                                $( '<div>' )
                                    .attr( 'id', 'ar-rating' )
                                    .append(
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' )
                                    ),
                                $( '<div>' )
                                    .attr( 'id', 'ar-extras' )
                                    .append(
                                        $( '<textarea>' )
                                            .attr( {
                                                'id': 'ar-comment',
                                                'placeholder': 'Add any comments or suggestions here.',
                                                'maxlength': 2000
                                            } ),
                                        $( '<input>' )
                                            .attr( {
                                                'id': 'ar-submit',
                                                'type': 'submit'
                                            } )
                                            .val( 'Submit rating' )
                                    )
                            ),
                        $( '<div>' )
                            .attr( 'id', 'ar-info' )
                            .append(
                                'For issues with adverts, see ',
                                $( '<a>' )
                                    .attr( {
                                        href: mw.util.wikiGetlink( 'Wikipool:Advertisements' ),
                                        title: 'Advertisements'
                                    } )
                                    .text( 'here' ),
                                '.'
                            )
                    );

                if ( !!conf.wgUserName ) {
                    $( '#WikiaRecentActivity' ).after( $form );
                } else {
                    $( '#WikiaRail .module' ).first().before( $form );
                }

                $( '.star' ).on( 'click', function () {
                    var $this = $( this ),
                        $rating = $( '#ar-rating' );

                    // show textarea for further comment
                    // and submit button
                    $( '#ar-extras' ).show( 400 );

                    // increase margin-top on info div
                    // caused by something weird in the default module styling/structure
                    $( '#ar-info' ).css( 'margin-top', '40px' );

                    // select the star
                    $rating.children( '.star' ).removeClass( 'selected' );
                    $this.addClass( 'selected' );

                    // store the rating
                    // $.fn.data desn't update the DOM
                    $rating.attr( 'data-rating', $this.nextAll().length + 1 );
                } );
            },

            /**
             * 'Submits' the feedback to the page
             */
            submitFeedback: function () {
                
                    // default to -1 rating
                    // this can only ever happen of someone messes with browser dev tools
                var rating = $( '#ar-rating' ).attr( 'data-rating' ) || '-1',
                    // trim whitespace/newlines on the comments
                    comment = $( '#ar-comment' ).val().trim(),
                    // limit comment to 2k characters
                    // fix for non HTML5 browsers - IE8/9
                    comment2 = comment.length > 2000 ? comment.substring( 0, 2000 ) : comment,
                    toSubmit = JSON.stringify( {
                        rating: rating,
                        comment: comment2
                    } ),
                    api = new mw.Api(),
                    params = {
                        action: 'edit',
                        title: 'RuneScape:Feedback/' + mw.util.wikiUrlencode( conf.wgPageName ),
                        text: toSubmit,
                        // token should be last
                        token: mw.user.tokens.get( 'editToken' )
                    };

                api
                    .post( params )
                    .done( function ( data ) {
                        mw.log( data )
                    } )
                    .always( function () {
                        $( '#ar-form' ).remove();
                        $( '#ar-header' ).after(
                            $( '<div>' )
                                .attr( 'id', 'ar-submitted' )
                                .text( 'Thanks for your feedback.' )
                        );
                        // do something else here, edit link?
                    } );

                return false;
            }
        };

    mw.loader.using( ['mediawiki.util', 'mediawiki.api'], function () {
        $( self.init );
    } );

}( this.jQuery, this.mediaWiki ) );

/* Custom "NewFilesModule" by 452 - displays [[Special:NewFiles]] in the right rail
   There are three ways to use this, by setting the NewFilesModuleCompact variable
   0 - Normal, width is 212, hovering over each displays the uploader info.
   1 - Compact, width is 106, hovering does nothing.
   2 - Random, if you're not sure which version you like best.
 
   NewFilesModuleCount can be used to specify the number of displayed images.
*/
var NewFilesModuleCompact = 0; //must be 0, 1, or 2.
var NewFilesModuleCount = 13; //any integer
 
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h2>New Files<a class='wikia-button' href='/Special:Upload'>Upload</a></h2>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 0) NewFilesModuleCompact = Math.floor(Math.random()*0);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
    $('head').append('<style type="text/css">\n#gallery- { overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em; height:150px; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; padding: 5px; margin-top: 0;}\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
} /* End of custom "NewFilesModule " */

/** <nowiki>
 * Standard edit summaries
 * 
 * @author Sikon    <http://starwars.wikia.com/wiki/User:Sikon>
 * @author Ryan PM  <http://rs.wikia.com/wiki/User:Ryan_PM>
 * @author Quarenon <http://rs.wikia.com/wiki/User:Quarenon>
 * @author Eladkse  <http://casualty.wikia.com/wiki/User:Eladkse>
 * @author Cqm      <http://rs.wikia.com/wiki/User:Cqm>
 */

;( function ( $, mw ) {

    'use strict';

    var conf = mw.config.get( [
            'skin',
            'wgAction'
        ] ),
        sums = [
            // lines that begin with -- are summaries to be selected
            // lines that don't are un-selectable headers
            'Refactoring',
            '-- Cleanup',
            '-- Corrected spelling/grammar',
            '-- Corrected template usage',
            '-- Factual correction',
            '-- Formatting',
            '-- HTML tidying',
            '-- Template tidying',
            '-- Wikifying', 
            '-- Repaired redlink(s)', 
            '-- Repaired template(s) Content',
            '-- Added image(s) to gallery',
            '-- Added sources/appearances',
            '-- Added category/categories',
            '-- Added cite note(s)',
            'Expanded',
            '-- Neutral Point of View (NPOV)', 
            '-- Replaced duplicate image(s)',
            '-- Revised',
            '-- Updated with new information',
            '-- Added template(s)',
            '-- Created new article',
            '-- Removal/Reversion',
            '-- Reverted spam',
            '-- Reverted test edit',
            '-- Reverted vandalism',
            '-- Reverted libel',
            'Minor Edits',
            '-- Corrected grammar',
            '-- Corrected spelling mistake',
            '-- Corrected code',
            '-- Corrected punctuation',
            'Complex entries',
            '-- +',
            '-- -',
            '-- sp',
            '-- gr',
            '-- rewrite',
            '-- redir',
            '-- -dupe(s)',
            '-- NPOV',
            '-- NPV',
            '-- cleaning',
            '-- overhaul',
            '-- temp',
        ],
        self = {
            /**
             * Loading function
             */
            init: function () {
                if ( ['edit', 'submit'].indexOf( conf.wgAction ) > -1 ) {
                    self.parseSummaries();
                }
            },

            /**
             * Load the summaries
             */
            parseSummaries: function () {
                
                var opts ='<option value="(browse)">(Browse standard summaries)</option>',
                    val,
                    i;

                for ( i = 0; i < sums.length; i++ ) {
                    switch ( 0 ) {
                        case sums[i].indexOf( '--' ):
                            val = sums[i].substring( 2 ).trim();
                            opts += '<option value="' + val + '">&nbsp;&nbsp;' +
                            val + '</option>';
                            break;

                        default:
                            val = sums[i].trim();
                            opts += '<option disabled="disabled">' + val + '</option>';
                            break;
                    }
                }

                self.insertModule( opts );

            },

            /**
             * Inserts the module into the edit area
             */
            insertModule: function ( list ) {

                var $module = $( '<div>' )
                    .attr( 'id', 'stdSummaries' )
                    .append(
                        $( '<select>' )
                            .attr( 'id', 'stdSummaries-dropdown' )
                            .append( list )
                            .change( function () {
                                var val = $( this ).val();
                                if ( val === '(browse)' ) {
                                    return;
                                }
                                $( '#wpSummary' ).val( val );
                            } )
                    ),
                    $label = $( '#wpSummaryLabel' );

                if ( ['oasis', 'wikia'].indexOf( conf.skin ) > -1 ) {
                    $label.after( $module );
                } else if ( conf.skin === 'monobook' ) {
                    $label.before( $module );
                }
            }

        };

    $( self.init );

}( jQuery, mediaWiki ) );

( function ( mw ) {
 
    /**
     * Adds link to the editing policy on Wikia rail wikiactivity module
     */
    function modalUploadImageMessage() {
        var more = $('.WikiaActivityModule').find('a.more');
        $(more).wrap('<span />');
        $('<a href=\"http://8ballpool.wikia.com/wiki/Project:Policies\#Editing_Policy\" title=\"Policies\#Editing Policy\" class=\"more\" style=\"margin-right: 5px\">Editing policy ></a>').insertAfter(more);
    }
 
    addOnloadHook(modalUploadImageMessage);
 
    function removeTouchScreenScssOverride() {
        var element = $('link[rel="stylesheet"][href*="skins/oasis/css/touchScreen.scss"]');
        element.remove();
    }
 
    addOnloadHook(removeTouchScreenScssOverride);
 
}(jQuery));
 
(function ($) {
}
);

// Last updated: 07:01, 2014 June 03
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var checkUser = "<a href='/wiki/Help:Checkuser'><span style='color:white'>Check User</span></a>";
 var founder = "<a href='/wiki/Help:Listusers/sysops'><span style='color:white'>Founder</span></a>";
 var cratTag = "<a href='/wiki/Help:Listusers/sysops'><span style='color:white'>Bureaucrat</span></a>";
 var adminTag = "<a href='/wiki/Help:Listusers/sysops'><span style='color:white'>Administrator</span></a>";
 var chatMod = "/wiki/Help:Listusers/sysops'><span style='color:white'>Chat Moderator</span></a>";
 var rollBack = "<a href='/wiki/Help:Rollback'><span style='color:white'>Rollback</span></a>";
 var botTag = "<a href='/wiki/Help:Bot'><span style='color:white'>Bot</span></a>";
 var starTag = "<a href='http://wikia.com/Stars'><span style='color:white'>Wikia Star</span></a>";
 var interfaceTag = "<span style='color:white'>Interface Editor</span>";
 var techSupport = "<span style='color:white'>Tech Support</span>";
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

   // ADMINCRATS
 
 rights["Dragonleaf5678"]                         = [adminTag, cratTag, interfaceTag, techSupport];

   // FOUNDER
 
 rights["TheRedClasher"]                          = [founder, adminTag, cratTag]; 

 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if ( wgPageName.indexOf("Special:Contributions") != -1 ) {
    userName = fbReturnToTitle.replace("Special:Contributions/", ""); 
    while (userName.search("_") > 0) {
        userName = userName.replace("_", " ");
    } 
} else {
    userName = wgTitle;
    userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});

/* Adding extra text to the navbar */
$(function() {
  if (skin == "oasis" || skin == "wikia") {
    $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Project:Policies">Policies</a></li>');
  }
});

$(function() {
  if (skin == "oasis" || skin == "wikia") {
    $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Project:About">About us</a></li>');
  }
});

// Changing Message Wall links to User links on Forum threads
$('.speech-bubble-message .edited-by > a:first-child').attr('href', function() {
    return $(this).attr('href').replace(/Message_Wall/g, 'User');
});

importScriptPage('User:KCCreations/MultipurposeCalculator.js', 'c');

// </source>