var customFont = {
	default: 'TeamMeat',
	/**
	 * @type {JQuery}
	 */
	elements: null,
	/**
	 * @type {{[k: string]: string}}
	 */
	specialCharacters: {
		/* ! */ '\u0021': "emark",
		/* " */ '\u0022': "oquote",
		/* # */ '\u0023': "hash",
		/* $ */ '\u0024': "dol",
		/* % */ '\u0025': "percent",
		/* & */ '\u0026': "and",
		/* ' */ '\u0027': "apos",
		/* ( */ '\u0028': "oparen",
		/* ) */ '\u0029': "cparen",
		/* * */ '\u002A': "star",
		/* + */ '\u002B': "plus",
		/* . */ '\u002E': "point",
		/* / */ '\u002F': "slash",
		/* : */ '\u003A': "colon",
		/* ; */ '\u003B': "scolon",
		/* < */ '\u003C': "lthan",
		/* = */ '\u003D': "equal",
		/* > */ '\u003E': "gthan",
		/* ? */ '\u003F': "qmark",
		/* @ */ '\u0040': "at",
		/* [ */ '\u005B': "obrkt",
		/* \ */ '\u005C': "bslash",
		/* ] */ '\u005D': "cbrkt",
		/* { */ '\u007B': "obrace",
		/* | */ '\u007C': "vbar",
		/* } */ '\u007D': "cbrace",
		/* ~ */ '\u007E': "tilde",
		/* ¢ */ '\u00A2': "cent",
		/* £ */ '\u00A3': "pound",
		/* ¤ */ '\u00A4': "curren",
		/* § */ '\u00A7': "ss",
		/* © */ '\u00A9': "copy",
		/* ® */ '\u00AE': "regtm",
		/* ° */ '\u00B0': "degree",
		/* ± */ '\u00B1': "pm",
		/* ¶ */ '\u00B6': "pilcrow",
		/* “ */ '\u201C': "oquote",
		/* ” */ '\u201D': "cquote",
		/* † */ '\u2020': "dagger",
		/* ‡ */ '\u2021': "diesis",
		/* € */ '\u20AC': "euro"
	},

	init: function () {
		customFont.elements = $( '.custom-font' )
			.each( customFont.initElement )
			.addClass( 'custom-font-enabled' );
	},

	/**
	 * @this HTMLElement
	 */
	initElement: function () {
		var $this = $( this ),
			char  = '',
			str   = $this.text(),
			str2  = '<span style="white-space:nowrap">',
			name  = customFont.getFontTitle( $this ),
			font  = 'font-' + name,
			intro = '<div class="' + font + ' ' + font + '-',
			i     = 0,
			len   = 0;
		while ( i < str.length ) {
			len   = customFont.getUnicodeCharLength( str, i );
			char  = str.substr( i, len );
			str2 += ( char === ' ' ? '</span> &nbsp;<span style="white-space:nowrap">' : intro + ( customFont.specialCharacters[ char ] || char ) + '">' + char + '</div>' );
			i    += len;
		}
		$this.html( str2 + '</span>' );
	},

	/**
	 * @param {JQuery} $elem
	 */
	getFontTitle: function ( $elem ) {
		var classList = $elem.get( 0 ).classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].substring( 0, 12 ) === 'custom-font-' ) {
				return classList[ i ].substr( 12 );
			}
		}
		return customFont.default;
	},

	/**
	 * @param {string} str
	 * @param {number} i
	 */
	getUnicodeCharLength: function ( str, i ) {
		// TODO : Add support for 3 and 4 bytes.
		var charCode = str.charCodeAt( i );
		return charCode >= 0xD800 && charCode <= 0xDBFF ? 2 : 1;
	}
};

$( customFont.init );