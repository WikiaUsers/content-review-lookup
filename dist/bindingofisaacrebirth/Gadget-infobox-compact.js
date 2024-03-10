var infoboxCompact = {
	init: function () {
		$( '.infobox2:not( .infobox2-compact )' )
			.filter( infoboxCompact.checkInfobox )
			.addClass( 'infobox2-compact' );
	},

	checkInfobox: function () {
		return $( this ).height() >= 700;
	}
};

$( infoboxCompact.init );