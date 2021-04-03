var wmCantWork = 'Викификатор не может работать в вашем браузере',
	wmFullText = 'Викификатор обработает ВЕСЬ текст на этой странице. Продолжить?',
	wmTalkPage = 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nВыделите ваше сообщение — обработано будет только оно';
window.wfPlugins = window.wfPlugins || [];
window.wfPluginsT = window.wfPluginsT || [];

function Wikify() {
	'use strict';
	var txt = '',
		hidden = [],
		wpTextbox1 = document.editform.wpTextbox1,
		winScroll = document.documentElement.scrollTop;


	// FUNCTIONS

	function r( r1, r2 ) {
		txt = txt.replace( r1, r2 );
	}

	function hide( re ) {
		r( re, function ( s ) {
			return '\x01' + hidden.push( s ) + '\x02';
		} );
	}

	function hideTag ( tag ) {
		hide( new RegExp( '<' + tag + '( [^>]+)?>[\\s\\S]+?<\\/' + tag + '>', 'gi' ) );
	}

	function hideTemplates() {
		var pos = 0,
			stack = [],
			tpl,
			left,
			right;
		while ( true ) {
			left = txt.indexOf( '{{', pos );
			right = txt.indexOf( '}}', pos );
			if ( left === -1 && right === -1 && !stack.length ) {
				break;
			}
			if ( left !== -1 && ( left < right || right === -1 ) ) {
				stack.push( left );
				pos = left + 2;
			} else {
				left = stack.pop();
				if ( typeof left === 'undefined' ) {
					if ( right === -1 ) {
						pos += 2;
						continue;
					} else {
						left = 0;
					}
				}
				if ( right === -1 ) {
					right = txt.length;
				}
				right += 2;
				tpl = txt.substring( left, right );
				txt = txt.substring( 0, left ) +
					'\x01' + hidden.push( tpl ) + '\x02' +
					txt.substr( right );
				pos = right - tpl.length;
			}
		}
	}

	function processLink(link, left, right) {
		left = $.trim(left.replace(/[ _\u00A0]+/g, ' '));
		if (left.match(/^(?:Категория|Файл) ?:/)) {
			return '[[' + left + '|' + right + ']]';
		}
		right = $.trim(right.replace(/ {2,}/g, ' '));
		var inLink = right.substr(0, left.length);
		var afterLink = right.substr(left.length);
		var uniLeft = left.substr(0, 1).toUpperCase() + left.substr(1);
		var uniRight = (right.substr(0, 1).toUpperCase() + right.substr(1)).replace(/[_\u00A0]/g, ' ');
		if (uniRight.indexOf(uniLeft) === 0 && afterLink.match(/^[a-zа-яё]*$/)) {
			return '[[' + inLink + ']]' + afterLink;
		} else {
			return '[[' + left + '|' + right + ']]';
		}
	}

	function processText() {
		var i,
			u = '\u00A0'; // non-breaking space
		if ( mw.config.get( 'wgNamespaceNumber' ) % 2 || mw.config.get( 'wgNamespaceNumber' ) === 4 ) { // is talk page
			var sigs = txt.match( /\d\d:\d\d, \d\d? \S{3,8} 20\d\d \(UTC\)/g );
			if ( sigs && sigs.length > 1 ) {
				alert( wmTalkPage );
				return;
			}
		}
 
		hideTag( 'nowiki' );
		hideTag( 'pre' );
		hideTag( 'source' );
		hideTag( 'syntaxhighlight' );
		hideTag( 'templatedata' );

		hideTag( 'code' );
		hideTag( 'kbd' );
		hideTag( 'tt' );

		hideTag( 'graph' );
		hideTag( 'hiero' );
		hideTag( 'math' );
		hideTag( 'timeline' );
		hideTag( 'chem' );
		hideTag( 'score' );
		hideTag( 'categorytree' );
		hideTag( 'inputbox' );
		hideTag( 'mapframe' );
		hideTag( 'maplink' );

		r( /\{\{(?:подст|subst):(?:[уУ]дар(?:ение)?|')\}\}/g, '\u0301' ); // замена шаблона ударение на символ
		r( /( |\n|\r)+\{\{(·|•|\*)\}\}/g, '{' + '{$2}}' ); // before { {·/•/*}}, usually in templates
		r( /\{\{\s*[Шш]аблон:([\s\S]+?)\}\}/g, '{' + '{$1}}' ); // «Шаблон:» в вызове шаблона не нужен
		r( /(\{\{\s*)(?:reflist|список примечаний)(\s*[\|\}])/ig, '$1примечания$2' );
		r( /(\{\{\s*)примечания\s*\|\s*height=[0-9]*(\s*[\|\}])/ig, '$1примечания$2' );
		r( /<[\/\\]?(hr|br)( [^\/\\>]+?)?? *[\/\\]?>/gi, '<$1$2>' );

// Пользовательские замены перед скрытием шаблонов
		for ( i in window.wfPluginsT ) {
			if ( window.wfPluginsT.hasOwnProperty( i ) ) {
				window.wfPluginsT[i]( txt, r );
			}
		}

		hideTemplates();
		hide( /^[ \t].*/mg );
		hide( /(https?|ftp|news|nntp|telnet|irc|gopher):\/\/[^\s\[\]<>"]+ ?/gi );
		hide( /^#(redirect|перенапр(авление)?)/i );
		hideTag( 'gallery' );

		r( / +(\n|\r)/g, '$1' ); // spaces at EOL
		txt = '\n' + txt + '\n';

		// LINKS
		r( /(\[\[:?)(category|категория):( *)/ig, '$1Категория:' );
		r( /(\[\[:?)(module|модуль):( *)/ig, '$1Модуль:' );
		r( /(\[\[:?)(template|шаблон):( *)/ig, '$1Шаблон:' );
		r( /(\[\[:?)(image|изображение|file|файл):( *)/ig, '$1Файл:' );

		// Nice links
		r( /(\[\[[^|[\]]*)[\u00AD\u200E\u200F]+([^\[\]]*\]\])/g, '$1$2' ); // Soft Hyphen & DirMark
		r( /\[\[ *([^|[\]]+?) *\| *('''''|'''|'')([^'|[\]]*)\2 *]]/g, '$2[[$1|$3]]$2' ); // move fomatting & quotes out of link text
		r( /\[\[ *([^|[\]]+?) *\| *«([^»|[\]]*)» *\]\]/g, '«[[$1|$2]]»' );
		r( /\[\[ *([^|[\]]+?) *\| *„([^“|[\]]*)“ *\]\]/g, '„[[$1|$2]]“' );
		r( /\[\[ *([^|[\]]+?) *\| *"([^"|[\]]*)" *\]\]/g, '"[[$1|$2]]"' );
		r( /\[\[([^|[\]\n]+)\|([^|[\]\n]+)\]\]/g, processLink );  // link shortening
		r( /\[\[ *([^|[\]]+)([^|\[\]()]+?) *\| *\1 *\]\]\2/g, '[[$1$2]]' ); // text repetition after link
		r( /\[\[ *(?!Файл:|Категория:)([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-—.\/0-9:;=?\\@\^_`’~]+) *\| *([^\|\[\]]+) *\]\]([a-zа-яё]+)/g, '[[$1|$2$3]]' ); // "
		hide( /\[\[[^\]|]+/g); // only link part
 
		// TAGS
		r( /<<(\S.+\S)>>/g, '"$1"' ); // << >>
		r( /(su[pb]>)-(\d)/g, '$1−$2' ); // ->minus
		r( /<(b|strong)>(.*?)<\/(b|strong)>/gi, "'''$2'''" );
		r( /<(i|em)>(.*?)<\/(i|em)>/gi, "''$2''" );
		r( /^<hr ?\/?>/gim, '----' );
		r( /<[\/\\]?(hr|br)( [^\/\\>]+?)? ?[\/\\]?>/gi, '<$1$2 />' );
		r( /[\u00A0 \t]*<ref(?:\s+name="")?(\s|>)/gi, '<ref$1' );
		r( /(\n== *[a-zа-я\s\.:]+ *==\n+)<references *\/>/ig, '$1{' + '{Примечания}}' );
		r(/<references\s?([\w\sа-яА-ЯёЁ]+=?)*"?([\w\sа-яА-ЯёЁ]+)*"?\/>/, '{' + '{Примечания|$1$2}}');
		r(/<br\s?\/>/gi, '<br>');
		hide( /<[a-z][^>]*?>/gi);
 
		hide( /^(\{\||\|\-).*/mg); // table/row def
		hide( /(^\||^!|!!|\|\|) *[a-z]+=[^|]+\|(?!\|)/mgi); // cell style
		hide( /\| +/g); // formatted cell
 
		r( /[ \t\u00A0]+/g, ' ' ); // double spaces
 
		// Entities etc. → Unicode chars
		if ( mw.config.get( 'wgNamespaceNumber' )!== 10 ) {
			r( /&(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});/gi, function ( s ) {
				var t = document.createElement( 'textarea' );
				t.innerHTML = s;
				var c = t.value;
				if ( c.length === 1 && c.charCodeAt( 0 ) > 127 ) {
					return c;
				}
				return s;
			});
		}
		r( /\(tm\)/gi, '™' );
		r( /\.\.\./g, '…' );
		r( /(^|[^+])\+-(?!\+|-)/g, '$1±' );
		r( /~=/g, '≈' );
		r( /\^2(\D)/g, '²$1' );
		r( /\^3(\D)/g, '³$1' );
		r( /(\s)кв\.\s*(дм|см|мм|мкм|нм|км|м)(\s)/g, '$1' + u + '$2²$3' );
		r( /(\s)куб\.\s*(дм|см|мм|мкм|нм|км|м)(\s)/g, '$1' + u + '$2³$3' );
		r( /((?:^|[\s"])\d+(?:[\.,]\d+)?)\s*[xх]\s*(\d+(?:[\.,]\d+)?)\s*([мm]{1,2}(?:[\s"\.,;?!]|$))/g, '$1×$2' + u + '$3' );
		r( /\s+×\s+/g, u + '×' + u );
		r( /([\wа-яА-ЯёЁ])'(?=[\wа-яА-ЯёЁ])/g, '$1’' ); /* 'апостроф */
		r( /№№/g, '№' );
 
		// Headings
		r( /^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1' ); // add spaces inside
		r( /([^\r\n])(\r?\n==.+==\r?\n)/g, '$1\n$2' ); // add empty line before
		r( /(==.+==)[\r\n]{2,}(?!=)/g, '$1\n' ); // remove empty line after
		r( /^== см(\.?|отри|отрите) ?также ==$/gmi, '== См. также ==' );
		r( /^== сноски ==$/gmi, '== Примечания ==' );
		r( /^== внешние\sссылки ==$/gmi, '== Ссылки ==' );
		r( /^== (?:(.+[^.])\.|(.+):) ==$/gm, '== $1$2 ==' );
		r( /^== '''(?!.*'''.*''')(.+)''' ==$/gm, '== $1 ==' );
 
		r( /«|»|“|”|„/g, '"' ); // temp
 
		// Hyphens and en dashes to pretty dashes
		r( /–/g, '-' ); // &ndash; -> hyphen
		r( /(\s)-{1,3} /g, '$1— ' ); // hyphen -> &mdash;
		r( /(\d)--(\d)/g, '$1—$2' ); // -> &mdash;
		r( /(\s)-(\d)/g, '$1−$2' ); // hyphen -> minus
 
		// Year and century ranges
		r( /(\(|\s)([12]?\d{3})[\u00A0 ]?(-{1,3}|—) ?([12]?\d{3})(?![\wА-ЯЁа-яё]|-[^ех]|-[ех][\wА-ЯЁа-яё])/g, '$1$2—$4' );
		r( /([12]?\d{3}) ?(гг?\.)/g, '$1' + u + '$2' );
		r( /(\(|\s)([IVX]{1,5})[\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\w\-])/g, '$1$2—$4' );
		r( /([IVX]{1,5}) ?(вв?\.)/g, '$1' + u + '$2' );
 
		// Reductions
		r( /(Т|т)\.\s?е\./g, '$1о есть' );
		r( /(Т|т)\.\s?к\./g, '$1ак как' );
		r( /(В|в)\sт\. ?ч\./g, '$1 том числе' );
		r( /(И|и)\sт\.\s?д\./g, '$1' + u + 'т.' + u + 'д.' );
		r( /(И|и)\sт\.\s?п\./g, '$1' + u + 'т.' + u + 'п.' );
		r( /(Т|т)\.\s?н\./g, '$1.' + u + 'н.' );
		r( /(И|и)\.\s?о\./g, '$1.' + u + 'о.' );
		r( /с\.\s?ш\./g, 'с.' + u + 'ш.' );
		r( /ю\.\s?ш\./g, 'ю.' + u + 'ш.' );
		r( /в\.\s?д\./g, 'в.' + u + 'д.' );
		r( /з\.\s?д\./g, 'з.' + u + 'д.' );
		r( /л\.\s?с\./g, 'л.' + u + 'с.' );
		r( /а\.\s?е\.\s?м\./g, 'а.' + u + 'е.' + u + 'м.' );
		r( /а\.\s?е\./g, 'а.' + u + 'е.' );
		r( /мм\sрт\.\s?ст\./g, 'мм' + u + 'рт.' + u + 'ст.' );
		r( /н\.\s?э(\.|(?=\s))/g, 'н.' + u + 'э.' );
		r( /(Д|д)(о|\.)\sн\.\s?э\./g, '$1о' + u + 'н.' + u + 'э.' );
		r( /(\d)[\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\.?(?=[,;.]| "?[а-яё\-])/g, '$1' + u + '$2' );
		r( /(\d)[\u00A0 ](тыс)([^\.А-Яа-яЁё])/g, '$1' + u + '$2.$3' );
		r( /ISBN:\s?(?=[\d\-]{8,17})/, 'ISBN ' );
 
		// Insert/delete spaces
		r( /^([#*:]+)[ \t\f\v]*(?!\{\|)([^ \t\f\v*#:;])/gm, '$1 $2' ); // space after #*: unless before table
		r( /(\S)[\u00A0 \t](-{1,3}|—)[\u00A0 \t](\S)/g, '$1' + u + '— $3' );
		r( /([А-ЯЁ]\.) ?([А-ЯЁ]\.) ?([А-ЯЁ][а-яё])/g, '$1' + u + '$2' + u + '$3' );
		r( /([А-ЯЁ]\.)([А-ЯЁ]\.)/g, '$1 $2' );
		r( /([а-яё]"?\)?[\.\?!:])((?:\x01\d+\x02\|)?[A-ZА-ЯЁ])/g, '$1 $2' ); // word. word
		r( /([)"a-zа-яё\]²³])\s*([,:])([\[(a-zа-яё])/g, '$1$2 $3' ); // "word, word", "word: word"; except ":"
		r( /([)a-zа-яё\]²³])\s*([,:])"/g, '$1$2 "' );
		r( /([)"a-zа-яё\]²³])\s([,;])\s([\[("a-zа-яё])/g, '$1$2 $3' );
		r( /([^%\/\wА-Яа-яЁё]\d+?(?:[\.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, '$1' + u + '$2' ); //5 %
		r( /(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2' ); //5%-й
		r( /([№§])(\s*)(\d)/g, '$1' + u + '$3' );
		// inside ()
		r( /\( +/g, '(' );
		r( / +\)/g, ')' );
 
		// Temperature
		r( /([\s\d=≈≠≤≥<>—("'|])([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °\^*]| [°\^*])(C|F))(?=[\s"').,;!?|\x01])/gm, '$1$2' + u + '°$5' );
 
		// Dot → comma in numbers
		r( /(\s\d+)\.(\d+[\u00A0 ]*[%‰°×])/gi, '$1,$2' );
 
		// Plugins
		for ( i in window.wfPlugins ) {
			if ( window.wfPlugins.hasOwnProperty( i ) ) {
				window.wfPlugins[i]( txt, r );
			}
		}
 
		// "" → «»
		for ( i = 1; i <= 2; i++ ) {
			r( /([\s\x02!|#'"\/([{;+\-])"([^"]*)([^\s"([{|])"([^a-zа-яё])/ig, '$1«$2$3»$4' ); // "
		}
		while ( /«[^»]*«/.test( txt ) ) {
			r( /«([^»]*)«([^»]*)»/g, '«$1„$2“' );
		}
 
		if ( '0'.replace( '0', '$$' ) === '$' ) { ////$ in replacing string is special, except in IE
			for ( i = 0; i < hidden.length; i++ ) {
				hidden[i] = hidden[i].replace( /\$/g, '$$$$' );
			}
		}
		while ( hidden.length > 0 ) {
			r( '\x01' + hidden.length + '\x02', hidden.pop());
		}
		txt = txt.substr( 1, txt.length - 2 );
	}
 
	function processAllText() {
		txt = wpTextbox1.value;
		processText();
		r( /^[\n\r]+/, '' );
		wpTextbox1.value = txt;
		txt = '';
		if ( window.auto_comment &&
			window.insertSummary &&
			!document.editform.wpSection.value
		) {
			window.insertSummary( 'викификатор' );
		}
	}
 
 
	// Check regexp support
	try {
		txt = 'ая'.replace( /а/g, 'б' ).replace( /б(?=я)/, 'в' );
	} catch ( e ) {}
	if ( txt !== 'вя' ) {
		alert( wmCantWork );
		return;
	}
 
	wpTextbox1.focus();
 
	// Modern browsers
	if ( typeof wpTextbox1.selectionStart !== 'undefined' ) {
		var textScroll = wpTextbox1.scrollTop,
			startPos = wpTextbox1.selectionStart,
			endPos = wpTextbox1.selectionEnd;
		txt = wpTextbox1.value.substring( startPos, endPos );
		if ( txt === '' ) {
			processAllText();
		} else {
			processText();
			wpTextbox1.value = wpTextbox1.value.substring( 0, startPos ) +
				txt + wpTextbox1.value.substring( endPos );
		}
		wpTextbox1.selectionStart = startPos;
		wpTextbox1.selectionEnd = startPos + txt.length;
		wpTextbox1.scrollTop = textScroll;
 
	// IE
	} else if ( document.selection && document.selection.createRange ) {
		var range = document.selection.createRange();
		txt = range.text;
		if ( txt === '' ) {
			processAllText();
		} else {
			processText();
			range.text = txt;
			if ( range.moveStart ) {
			range.moveStart( 'character', -txt.length );
			}
			range.select();
		}
 
	// Other browsers
	} else if ( confirm( wmFullText ) ) {
		processAllText();
	}
 
	document.documentElement.scrollTop = winScroll; // scroll back, for IE/Opera
}
 
 
// Toolbar buttons
 
var addOldToolbarButton = function() {
	var $toolbar = $( '#gadget-toolbar' );
	if ( !$toolbar.length ) {
		$toolbar = $( '#toolbar' );
	}
	$( '<div>' )
		.addClass( 'mw-toolbar-editbutton' )
		.attr( 'id', 'mw-editbutton-wikify' )
		.attr( 'alt', 'Викификатор' )
		.attr( 'title', 'Викификатор — автоматический обработчик текста' )
		.css( {
			'width': '69px',
			'backgroundImage': 'url(//upload.wikimedia.org/wikipedia/commons/3/38/Button_wikify.png)'
		} )
		.appendTo( $toolbar )
		.on( 'click', Wikify );
};
 
var addNewToolbarButton = function() {
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'main',
		'group': 'format',
		'tools': {
			'wikif': {
				label: 'Викификатор — автоматический обработчик текста',
				type: 'button',
				icon: '//upload.wikimedia.org/wikipedia/commons/0/06/Wikify-toolbutton.png',
				action: {
					type: 'callback',
					execute: function() {
						Wikify();
					}
				}
			}
		}
	} );
};
 
if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
	mw.loader.using( [ 'user.options', 'jquery.textSelection' ], function () {
		if ( mw.user.options.get( 'usebetatoolbar' ) === 1 || mw.user.options.get( 'usebetatoolbar' ) === true ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor' ),
				$.ready
			).then( addNewToolbarButton );
			console.log('MediaWiki:Wikificator.js — addNewToolbarButton');
		} else {
			mw.loader.using( 'mediawiki.action.edit', function() {
				$( addOldToolbarButton );
				console.log('MediaWiki:Wikificator.js — addOldToolbarButton');
			});
		}
	} );
}