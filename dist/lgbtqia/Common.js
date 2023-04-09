/* Any JavaScript here will be loaded for all users on every page load. */
/* WHM toolbar advertisement */
var toolbarLabel = 'WHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomWHMFinalGirls', label: 'Final Girls: The Trading Cards*'},
    {link: 'https://bit.ly/FandomWHMFinalGirlsPlaylist', label: 'Final Girls: The Playlist'},
    {link: 'https://bit.ly/FandomWHMBlog-toolbar', label: 'Fandom blog'},
    {link: 'https://lgbtqia.fandom.com/f/p/4400000000000055219', label: 'Discussions post'},
    {link: 'https://spoti.fi/3loZ1Nu', label: 'WHM spotify playlist'},
    {link: 'https://bit.ly/FandomWHMGamers', label: 'Gaming Stories: meet RinasaurusRex <br/>and Jessica Howard'},
    {link: 'https://bit.ly/FandomWHMGamers2', label: 'Gaming Stories: meet Minnichi and<br/>LucyKuranSKYDOME'},
    {link: 'https://bit.ly/FandomWHMGamers3', label: 'Gaming Stories: meet Miranda Phaal<br/>and Tiffany Tse'},
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
    '<h2 style="margin-left: 16px">Women\'s History Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* WHM logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Meet the Women\'s History Month Final Girls')
        )
        .attr('href', 'https://bit.ly/FandomWHMFinalGirls')
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