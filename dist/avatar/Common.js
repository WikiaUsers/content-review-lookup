/* To replace the now dead "welcome bot" */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:New user}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};

/* "Temporary" fix for {{#dpl:execandexit=geturlargs}} by User:MarkusRost */
$( function() {
	/* Make the confirmation on action=purge keep DPL arguments */
	if ( mw.config.get('wgAction') === 'purge' ) {
	     var purgeForm = $('#mw-content-text form.mw-htmlform');
	     var purgeParams = purgeForm.find('input[name="redirectparams"]').val().split('&').filter( function (param) {
	         return param.startsWith('DPL_');
	     } );
	     if ( purgeParams.length ) {
	         purgeForm.attr('action', purgeForm.attr('action') + '&' + purgeParams.join('&') );
	     }
	 }
	/* Avoid the purge confirmation all together, restoring legacy behaviour until extension is fixed */
	 $('.DPL-purge a.external, a.external[href^="https://avatar.fandom.com/"][href*="&action=purge"]').on( 'click', function( e ) {
		var $form = $( '<form>' ).attr( {
			method: 'POST',
			action: this.href,
		} ).appendTo( document.body );
		$form.submit();
		e.preventDefault();
	} );
} );

/* Auto-refreshing recent changes */
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

/* Standard edit summaries
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny - taken from Wookieepedia */
function fillEditSummaries() {
	if ( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$summaryOptionsList,
			$summaryLabel = $( '#wpSummaryLabel' ),
			lines = data.split( '\n' ),
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
			var editSummary = $( this ).val();
			if ( editSummary !== '' ) {
				$( '#wpSummary' ).val( editSummary );
			}
		} );
		for ( var i = 0; i < lines.length; i++ ) {
			var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
		}
		$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
	} );
}

/* User profile header custom tags */
window.UserTagsJS = {
modules: {},
tags: {
sysop: { link:'Project:Administrators' },
rollback: { link:'Project:Rollback' }
}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];

/* 
/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Insert character infobox template",
		"tagOpen": "\{\{Character infobox\r| nation         = ",
		"tagClose": "\r| image          = \r| alsoknown      = \r| nationality    = \r| ethnicity      = \r| age            = \r| birth          = \r| death          = \r| gender         = \r| height         = \r| eyes           = \r| hair           = \r| skincolor      = \r| skintype       = \r| loveinterest   = \r| allies         = \r| enemies        = \r| weapon         = \r| fightingstyle  = \r| profession     = \r| position       = \r| reign          = \r| pred           = \r| success        = \r| affiliation    = \r| appearance     = \r| lastappearance = \r| voice          = \r| actor          = \r| more           = \r\}\}",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Episode/issue reference tag",
		"tagOpen": "<ref name=\"\">{{Cite episode|2|4",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| film        = \r| series      = \r| season      = \r| episode     = \r| source      = \r| origin      = \r| cats        = \r| license     = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Uncredited image tag",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Vote to keep",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Vote to delete",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Vote to merge",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Done",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Not done",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};
}

//* Forum Reply Reverse Chronological Order And Highlight Certain Threads *//
var reverseForumPageNames = ['Thread:1282421'];
if (reverseForumPageNames.indexOf(wgPageName) !== -1) {
	$('.replies > li').not('.replies .new-reply').not('.replies li:last-child').each(function() {
		$(this).prependTo(this.parentNode);
	});

	var forumNameArray = ['Mike.DiMartino','Bryan.Konietzko'];
	$('.replies .message').each(function() {
		var that = this;
		$.each(forumNameArray, function(key,value) {
			var url = 'a[href="http://avatar.wikia.com/wiki/Message_Wall:' + value + '"]';
			if ($(that).children().find(url).length) {
				$(that).css('background','#A6D785');
			}
		});
	});
}