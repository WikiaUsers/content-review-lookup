/* Pride toolbar advertisement */
var toolbarLabel = 'Pride';
var toolbarLinks = [
	{link: 'https://bit.ly/FandomDragRaceTournament', label: 'June 29: Drag Race Bracket Tournament'},
    {link: 'https://bit.ly/PrideEditorStory-Kurt', label: 'June 28: Pride Highlight: Meet Kurt'},
    {link: 'https://bit.ly/PrideEditorStory-Vinny', label: 'June 27: Pride Highlight: Meet Vinny'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'June 23: Pride Highlight: Meet Sam/Lemon Skweezy'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'June 20: How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'June 15: Pride Stories: Celebrate with Bart'},
    {link: 'https://lgbtqia.fandom.com/f/p/44000000000000611833', label: 'June 10: Discussions post'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'June 6: Pride blog with Drag Queens interview'},
    {link: 'https://lgbtqia.fandom.com/f/p/4400000000000060499', label: 'June 2: Pride art thread'},
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'June 1: Pride spotify playlist'}
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
    '<h2 style="margin-left: 16px">Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Pride Month')
        )
        .attr('href', 'https://bit.ly/FandomPrideBlog-header')
);

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