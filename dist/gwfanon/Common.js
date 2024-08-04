// Marked as patroled, based on a Dev Wiki script, Polish version
function ajaxPatrolLinks() {
	$( 'body' ).on( 'click', '.patrollink', function ( e ) {
		e.preventDefault();
		var	$patrolLink = $( this ).children( 'a' ),
			$url = $patrolLink.attr( 'href' );
		$patrolLink.html( '<img src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="oznaczanie edycji jako „sprawdzoną”" />' );
		$.get( $url, function () {
			$patrolLink.removeAttr( 'href' ).css( 'color', 'grey' ).text( 'oznaczono edycję jako „sprawdzoną”' );
		} );
	} );
}
$( ajaxPatrolLinks );

$('.inputbox-force-source form').each(function() { $('<input type="hidden" name="useeditor" value="source">').appendTo(this); });

// Backgrounds (src: w:c:pl.dreamworks)

$(function() {
if($('#dostosujTlo').length > 0) {
var cl = $($('#dostosujTlo').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('tlo-' + cl);
}
}
});

// Add border if exceed 300px
$(document).ready(function() {
    var maxHeight = 299; // Height threshold here

    // For elements with class "scrollBorder"
    $('.scrollBorder').each(function() {
        if ($(this).height() > maxHeight) {
            $(this).addClass('scrollBordered');
        }
    });
});