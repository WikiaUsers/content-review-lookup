( function ( HanAssist ) {
	if ( $( '.page-header__variants' ).length > 0 ) {
		var variantZhHansLink = $( '#ca-varlang-1 a' ).attr( 'href' );
		var variantZhLink = variantZhHansLink.replace( 'variant=zh-hans', 'variant=zh' );
		$( '#ca-varlang-1' ).before( '<li id="ca-varlang-0">\n\t\t\t\t\t\t\t<a href="' + variantZhLink + '" data-tracking-label="variant-zh">不转换</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t\t\t\t\t\t\t' );
		var variantDropdownLabelText = HanAssist.vary( {
			zh: '不转换',
			hans: '简体',
			hant: '繁體',
			cn: '大陆简体',
			hk: '香港繁體',
			mo: '澳門繁體',
			my: '大马简体',
			sg: '新加坡简体',
			tw: '臺灣正體'
		} );
		$( '.page-header__variants .wds-dropdown__toggle' ).html( '\n\t\t\t' + variantDropdownLabelText + '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>\t\t' );
	}
} ( mw.libs.HanAssist ) );