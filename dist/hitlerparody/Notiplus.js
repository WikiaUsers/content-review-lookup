///*<source lang="javascript" style="tab-size:4;-moz-tab-size:4">*/
/* notiplus beta 2.0
 *  Adds support for localized notifications on Wikia wikis
 *  Copyright (c) 2015 M. Faiz Syahmi [[User:mfaizsyahmi]]
 *  This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
/* TODO:
 * -add support for monobook
 */

// namespace
window.notiplus = window.notiplus || {};

// default values
notiplus.url = notiplus.url || '/wiki/Project:Notiplus?action=render';
//  Use your local wiki abbreviations plox
//  also runs quick in place validity check
notiplus.cookiePrefix = (/[,;=\s]/g.test(notiplus.cookiePrefix || 'notiplus'))? 'notiplus' : notiplus.cookiePrefix;
notiplus.consentRequired = (notiplus.consentRequired === undefined)? true: notiplus.consentRequired;
//  WikiaNotifications orders from left to right (last item rightmost)
notiplus.reverseOrder = (notiplus.reverseOrder === undefined)? false: notiplus.reverseOrder;
notiplus.lang = notiplus.lang || 'en';
//DEBUG
notiplus.DEBUG = true;

// UI strings ( accessed with notiplus.str() )
notiplus.i18n = {
	en: {
		consent_text: 'To enhance your experience, this wiki would like to display wiki-specific notifications.',
		consent_allow: 'Allow',
		consent_deny: 'Deny',
		or: 'or'
	}
};

// internal data variables
notiplus.$N = $("#WikiaNotifications"); // holds a reference to Wikia Notification jquery object
notiplus._notidata = null; // holds the html of returned notification page
notiplus.log = function() { if (notiplus.DEBUG) console.log([].slice.call(arguments)) };

// HELPER FUNCTIONS
/* format - formats strings (from stackoverflow/610406)
 * zero based, placeholders formatted as {0}, {1}, ...
 * returns formatted string
 */
notiplus.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(match, number) { 
		return (args[number] === undefined) ? match : args[number];
	});
};
/* cookieName - generates a formatted cookie name
 */
notiplus.cookieName = function(type, id) {
	switch(type) {
		case 'consent':
			return notiplus.format('{0}-notiplus-consented', notiplus.cookiePrefix);
			break;
		case 'dismiss':
			return notiplus.format('{0}-{1}-dismissed', notiplus.cookiePrefix, id);
			break;
	}
};

/* str - returns UI string according to the specified language
 * if string str is not in specified lang set it falls back to the str in english set
 * if str not in english set will return an error string
 */
notiplus.str = function(str) {
	return notiplus.i18n[notiplus.lang][str] || notiplus.i18n.en[str] || 'unknown string';
};

/* _addnoti - adds the individual notiplus
 * Args: id 
 *       exp - cookie expiration
 *       linkDismiss - whether all links should dismiss the notification
 *       html - content
 * directly adds the notification, returns nothing
 */
notiplus._addnoti = function(id, exp, linkDismiss, html) {
	notiplus.log('Adding item ' + id);
	
	var $content = $('<div></div>').addClass('notiplus').attr('id',id).html(html);
	var $dismiss = $('<a class="sprite close-notification"></a>');
	$content.prepend($dismiss);
	if (linkDismiss) {
		$dismiss.add(':link',$content);
	}
	
	$dismiss.on('click.notiplus', function(e) {
		$.cookie( notiplus.cookieName('dismiss', id), "1", { path:"/", expires:exp });
		$content.parent().remove();
	});
	
	if (notiplus.reverseOrder) {
		notiplus.$N.prepend( $('<li/>').append($content) );
	} else {
		notiplus.$N.append( $('<li/>').append($content) );
	}
};

// MAIN SUBROUTINE
// parses the returned ajax and displays notifications
// (won't check if noti already exists on page)
// (id validity check by Justin Klemm from ghostinspector.com)
notiplus.parse = function() {
	// abort if no data
	if (notiplus._notidata == null) return false;
	
	var now = new Date(),
		$data = $(notiplus._notidata).not('script').filter('div[id]');
	notiplus.log('Parsing ' + $data.length + ' items');
	
	// go through each div and decide whether to display it
	$data.each( function(e) {
		$item = $(this);
		
		// get the basic data
		var id = $item.attr('id'),
			starts = new Date($item.attr('data-start')),
			expires = Number($item.attr('data-expires')) || 30;
		
		// validity check
		//  id regex combines both id and cookie validations
		if (id === undefined || !/^[A-Za-z]+([\w-:.]|[^,;=\s])*$/.test(id) || isNaN( starts.getTime() ) ) {
			notiplus.log('one or more of the main fields for "' + id + '" are invalid.');
			return false;
		}
		
		// get the other variables
		var ends = new Date( 
				($item.attr('data-end') === undefined )
				? starts.getTime() + expires * 86400000
				: $item.attr('data-end') ),
			linkDismiss = ($item.attr('data-linkdismiss') || false),
			html = $item.remove('script').html()
				.replace(/on\w+="[\s\S'][^"]*"/ig, '')
				.replace(/(javascript:)+[\s\S'][^"]*/ig, '');
			// ^my best attempt at removing onX event attributes
		
		// check if already dismissed
		var dismissed = $.cookie(notiplus.cookieName('dismiss',	id )) || false;
		
		notiplus.log(id,linkDismiss,dismissed);
		// display if not dismissed and within time frame
		if (dismissed == false && now >= starts && now < ends) {
			notiplus._addnoti( id, expires, linkDismiss, html )
		}
	});
};

// MAIN INITIALIZATION CODE
// check consent and ajax load the page containing the notifications
notiplus.init = function() {
	notiplus.log('Initializing notiplus...');
	// creates the notification container
	if ($('body').hasClass('skin-oasis') && $("#WikiaNotifications").length==0) {
		$("body").append('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
	} else if ( $('body').hasClass('skin-monobook') && $('#siteNotice').length==0 ) {
		$('#top').after('<div id="siteNotice"></div>');
	}
	notiplus.$N = $("#WikiaNotifications");
	
	// consent
	var consent = $.cookie( notiplus.cookieName('consent') );
	notiplus.log('consent value is ',consent);
	if (notiplus.consentRequired && consent == null) {
		// Need consent, display consent notification
		// todo: look into using the _addnoti function which can adapt to different skins
		var allowLink = $('<a>').attr('src','#').text(notiplus.str('consent_allow'))
				.on('click.notiplus', function(e) {
					$.cookie( notiplus.cookieName('consent'), true, {expires: 365, path: '/'})
					$('#notiplus-consent').parent().remove();
					notiplus.init(); // run through initialization code again, this time consent check would have been cleared
				}),
			denyLink = $('<a>').attr('src','#').text(notiplus.str('consent_deny'))
				.on('click.notiplus', function(e) {
					$.cookie( notiplus.cookieName('consent'), false, {expires: 365, path: '/'})
					$('#notiplus-consent').parent().remove();
				}),
			dismiss = $('<a>').addClass("sprite close-notification").on('click.notiplus', function(e) {
					// not sure whether to imply consent denial or just dismissal
					//$.cookie(notiplus.cookiePrefix + "consented", false, {expires: 365, path: '/'})
					$('#notiplus-consent').parent().remove();
				}),
			$consent = $('<div id="notiplus-consent"></div>')
				.prepend(dismiss)
				.prepend($('<p>').text(notiplus.str('consent_text')))
				.append( $('<p>')
					.append(allowLink)
					.append(' ' +notiplus.str('or')+ ' ')
					.append(denyLink)
				);
			notiplus.$N.append( $('<li/>').append($consent) );
		return; // exit the function
		
	} else if (notiplus.consentRequired && consent == 'false') {
		// Consent required but denied, abort
		return false;
		
	} // Consent granted or not required past this point
	
	// loads the page containing notiplus
	notiplus.log('Loading notifications...');
	$.ajax({
		url: notiplus.url,
		success: function(data) {
			notiplus._notidata = data;
			notiplus.parse();
		}, error: function(obj,str) {
			notiplus.log('error loading notiplus\'s notifications.', str);
		}
	});
};
// FOR DEBUG
notiplus.reset = function() {
	$.cookie( notiplus.cookieName('consent'), -1, {expires:-1});
	$.cookie( notiplus.cookieName('consent'), -1, {expires:-1, path:'/'});
	if (notiplus._notidata !== null) {
		$(notiplus._notidata).filter('div[id]').each( function() {
			$.cookie( notiplus.cookieName('dismiss', $(this).attr('id') ), -1, {expires:-1});
			$.cookie( notiplus.cookieName('dismiss', $(this).attr('id') ), -1, {expires:-1, path:'/'});
		});
	}
};
//notiplus.reset();

// Starts the script main routine
notiplus.init();

///*</source>*/