/*
* htmlentities.js by 452, incorporating licensed functions (credited below)
*
* This script adds a button to the edittoolbar, which looks like: &;
* When pressed, this button either:
*    replaces htmlentities in the selected text, or 
*    prompts for input, replaces htmlentities, and inserts at cursor location
*
*  v1.1 - supports visual editor being enabled in preferences.
*/

function htmlentities() {
	if ($("#HTMLencoder").hasClass("HTMLencoder")) { //this is a redundant check
		$('#EditPageToolbar').unbind('DOMNodeInserted.htmlentities'); 
		return;
	}
	if (!$("#HTMLencoder").size()) { 
		//button not found, RTE enabled, add listener
		$('#EditPageToolbar').unbind('DOMNodeInserted.htmlentities'); //unbind to avoid duplication
		$('#EditPageToolbar').bind('DOMNodeInserted.htmlentities', function(event) { //listen for mode switch
			htmlentities();
		});
		return;
	} else {
		$("#HTMLencoder").off('click'); //this shouldn't be necessary.
		$("#HTMLencoder").click(function( event ) { event.preventDefault(); convertEntities(); });
		$("#HTMLencoder").addClass("HTMLencoder"); //add class to avoid duplication
		$('#EditPageToolbar').unbind('DOMNodeInserted.htmlentities'); //unbind to avoid duplication
	}
}
	addOnloadHook(htmlentities);
	
	function convertEntities(input) {
		//set the textbox
		var el = document.getElementById("cke_contents_wpTextbox1");
		if (el == undefined) el = document.getElementById("wpTextbox1");
		else el = el.childNodes[0];
		if (input == undefined) input = getSelectedText(el);	//get selected text	
		if (input == "") input = prompt("Text to convert to HTMLentities");	//if nothing selected, prompt for input
		if ((input != undefined) && (input != null)) {		//cancelling prompt returns null.
			var encode = he.encode(input);	//if input, encoded entities
			replaceSelectedText(el, encode);		//replace selection with encoded string
		}
	}

	function replaceSelectedText(el, text) {
		var sel = getInputSelection(el), val = el.value;
		el.value = val.slice(0, sel.start) + text + val.slice(sel.end);
		el.focus();
	}
	
	function getSelectedText(el) { //this function by 452
		var sel = getInputSelection(el), val = el.value;
		return el.value.substr(sel.start, sel.end-sel.start);
	}

    // getInputSelection by "Tim Down" https://stackoverflow.com/questions/3964710/replacing-selected-text-in-the-textarea
	function getInputSelection(el) {
		var start = 0, end = 0, normalizedValue, range,
			textInputRange, len, endRange;

		if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
			start = el.selectionStart;
			end = el.selectionEnd;
		} else {
			range = document.selection.createRange();

			if (range && range.parentElement() == el) {
				len = el.value.length;
				normalizedValue = el.value.replace(/\r\n/g, "\n");

				// Create a working TextRange that lives only in the input
				textInputRange = el.createTextRange();
				textInputRange.moveToBookmark(range.getBookmark());

				// Check if the start and end of the selection are at the very end
				// of the input, since moveStart/moveEnd doesn't return what we want
				// in those cases
				endRange = el.createTextRange();
				endRange.collapse(false);

				if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
					start = end = len;
				} else {
					start = -textInputRange.moveStart("character", -len);
					start += normalizedValue.slice(0, start).split("\n").length - 1;

					if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
						end = len;
					} else {
						end = -textInputRange.moveEnd("character", -len);
						end += normalizedValue.slice(0, end).split("\n").length - 1;
					}
				}
			}
		}

		return {
			start: start,
			end: end
		};
	}
	
/*! https://mths.be/he v0.4.1 by @mathias | MIT license 
Copied from https://github.com/mathiasbynens/he/blob/master/he.js
License: https://github.com/mathiasbynens/he/blob/master/LICENSE-MIT.txt 
*/
	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// http://whatwg.org/html/tokenization.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// http://whatwg.org/html/tokenization.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;

	var encodeMap = {'\xC1':'Aacute','\xE1':'aacute','\xC2':'Acirc','\xE2':'acirc','\xB4':'acute','\xC6':'AElig','\xE6':'aelig','\xC0':'Agrave','\xE0':'agrave','\u2135':'alefsym','\u0391':'Alpha','\u03B1':'alpha','\u2227':'and','\u2220':'ang','\xE5':'aring','\xC5':'Aring','\u2248':'asymp','\xC3':'Atilde','\xE3':'atilde','\xC4':'Auml','\xE4':'auml','\u201E':'bdquo','\u0392':'Beta','\u03B2':'beta','\xA6':'brvbar','\u2022':'bull','\u2229':'cap','\xC7':'Ccedil','\xE7':'ccedil','\xB8':'cedil','\xA2':'cent','\u03A7':'Chi','\u03C7':'chi','\u02C6':'circ','\u2663':'clubs','\u2245':'cong','\xA9':'copy','\u21B5':'crarr','\u222A':'cup','\xA4':'curren','\u2021':'Dagger','\u2020':'dagger','\u21D3':'dArr','\u2193':'darr','\xB0':'deg','\u0394':'Delta','\u03B4':'delta','\u2666':'diams','\xF7':'divide','\xC9':'Eacute','\xE9':'eacute','\xCA':'Ecirc','\xEA':'ecirc','\xC8':'Egrave','\xE8':'egrave','\u2205':'empty','\u2003':'emsp','\u2002':'ensp','\u0395':'Epsilon','\u03B5':'epsilon','\u2261':'equiv','\u0397':'Eta','\u03B7':'eta','\xD0':'ETH','\xF0':'eth','\xCB':'Euml','\xEB':'euml','\u20AC':'euro','\u2203':'exist','\u0192':'fnof','\u2200':'forall','\xBD':'frac12','\xBC':'frac14','\xBE':'frac34','\u2044':'frasl','\u0393':'Gamma','\u03B3':'gamma','\u2265':'ge','\u2194':'harr','\u21D4':'hArr','\u2665':'hearts','\u2026':'hellip','\xCD':'Iacute','\xED':'iacute','\xCE':'Icirc','\xEE':'icirc','\xA1':'iexcl','\xCC':'Igrave','\xEC':'igrave','\u2111':'image','\u221E':'infin','\u222B':'int','\u0399':'Iota','\u03B9':'iota','\xBF':'iquest','\u2208':'isin','\xCF':'Iuml','\xEF':'iuml','\u039A':'Kappa','\u03BA':'kappa','\u039B':'Lambda','\u03BB':'lambda','\u27E8':'lang','\xAB':'laquo','\u21D0':'lArr','\u2190':'larr','\u2308':'lceil','\u201C':'ldquo','\u2264':'le','\u230A':'lfloor','\u2217':'lowast','\u25CA':'loz','\u200E':'lrm','\u2039':'lsaquo','\u2018':'lsquo','\xAF':'macr','\u2014':'mdash','\xB5':'micro','\xB7':'middot','\u2212':'minus','\u039C':'Mu','\u03BC':'mu','\u2207':'nabla','\xA0':'nbsp','\u2013':'ndash','\u2260':'ne','\u220B':'ni','\xAC':'not','\u2209':'notin','\u2284':'nsub','\xD1':'Ntilde','\xF1':'ntilde','\u039D':'Nu','\u03BD':'nu','\xD3':'Oacute','\xF3':'oacute','\xD4':'Ocirc','\xF4':'ocirc','\u0152':'OElig','\u0153':'oelig','\xD2':'Ograve','\xF2':'ograve','\u203E':'oline','\u03C9':'omega','\u03A9':'Omega','\u039F':'Omicron','\u03BF':'omicron','\u2295':'oplus','\u2228':'or','\xAA':'ordf','\xBA':'ordm','\xD8':'Oslash','\xF8':'oslash','\xD5':'Otilde','\xF5':'otilde','\u2297':'otimes','\xD6':'Ouml','\xF6':'ouml','\xB6':'para','\u2202':'part','\u2030':'permil','\u22A5':'perp','\u03A6':'Phi','\u03C6':'phi','\u03A0':'Pi','\u03C0':'pi','\u03D6':'piv','\xB1':'plusmn','\xA3':'pound','\u2033':'Prime','\u2032':'prime','\u220F':'prod','\u221D':'prop','\u03A8':'Psi','\u03C8':'psi','\u221A':'radic','\u27E9':'rang','\xBB':'raquo','\u21D2':'rArr','\u2192':'rarr','\u2309':'rceil','\u201D':'rdquo','\u211C':'real','\xAE':'reg','\u230B':'rfloor','\u03A1':'Rho','\u03C1':'rho','\u200F':'rlm','\u203A':'rsaquo','\u2019':'rsquo','\u201A':'sbquo','\u0160':'Scaron','\u0161':'scaron','\u22C5':'sdot','\xA7':'sect','\xAD':'shy','\u03A3':'Sigma','\u03C3':'sigma','\u03C2':'sigmaf','\u223C':'sim','\u2660':'spades','\u2282':'sub','\u2286':'sube','\u2211':'sum','\u2283':'sup','\xB9':'sup1','\xB2':'sup2','\xB3':'sup3','\u2287':'supe','\xDF':'szlig','\u03A4':'Tau','\u03C4':'tau','\u2234':'there4','\u0398':'Theta','\u03B8':'theta','\u03D1':'thetasym','\u2009':'thinsp','\xDE':'THORN','\xFE':'thorn','\u02DC':'tilde','\xD7':'times','\u2122':'trade','\xDA':'Uacute','\xFA':'uacute','\u21D1':'uArr','\u2191':'uarr','\xDB':'Ucirc','\xFB':'ucirc','\xD9':'Ugrave','\xF9':'ugrave','\xA8':'uml','\u03D2':'upsih','\u03A5':'Upsilon','\u03C5':'upsilon','\xDC':'Uuml','\xFC':'uuml','\u2118':'weierp','\u039E':'Xi','\u03BE':'xi','\xDD':'Yacute','\xFD':'yacute','\xA5':'yen','\u0178':'Yuml','\xFF':'yuml','\u0396':'Zeta','\u03B6':'zeta','\u200D':'zwj','\u200C':'zwnj'};	

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	var hexEscape = function(symbol) {
		return '&#x' + symbol.charCodeAt(0).toString(16).toUpperCase() + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var he = {};
	he.encode = function(string, options) {
		options = merge(options, he.encode.options);
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return hexEscape(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					if (has(encodeMap, string)) return '&' + encodeMap[string] + ';';
                                        return hexEscape(string);
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				if (has(encodeMap, string)) return '&' + encodeMap[string] + ';';
                                return hexEscape(string);
			});
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return '&#x' + codePoint.toString(16).toUpperCase() + ';';
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, hexEscape);
	};
	he.encode.options = {
		'encodeEverything': false,
		'useNamedReferences': true
	}