/* WHM toolbar advertisement */
var toolbarLabel = 'AAPI';
var toolbarLinks = [
    {link: 'https://avatar.fandom.com/f/p/4400000000000419951', label: 'Discussions post for AAPI'},
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">AAPI Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* WHM logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating AAPI month on Avatar Wiki')
        )
        .attr('href', 'https://avatar.fandom.com/f/p/4400000000000419951')
);

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
$(fillEditSummaries);

/* Custom block message send with dev script MessageBlock */
window.MessageBlock = {
  title : 'Blocked',
  message : 'You have violated Avatar Wiki policy. As a preventative measure, you have been blocked from editing for $2 due to $1. If you believe this block is unjustified or that there has been a mistake, you may contest this block here or on my wall on Community Central.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

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