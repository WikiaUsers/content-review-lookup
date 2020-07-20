/**
 * Blendet eine „Auto-Format“-Funktion in der Werkzeugleiste ein, die viele typische Wikifizierungs-Fehler
 * automatisch korrigiert. Eine ausführliche Beschreibung ist auf der Diskussionsseite zu finden.
 * (<nowiki> zur Umgehung von [[bugzilla:8761]].)
 */
if (mediaWiki.config.get('wgAction') == 'edit' || mediaWiki.config.get('wgAction') == 'submit') (function($, mw)
{
	var autoFormatter = {
		click: function(a)
		{
			if (window.wikEd && window.wikEd.useWikEd) wikEd.UpdateTextarea();
			var e = document.forms['editform'].elements, textbox = e['wpTextbox1'], summary = e['wpSummary'];
			if (!textbox) return;
			this.clickedElement = a;
			this.isAll = false;
			this.isDisambiguation = /\{\{\s*[Bb]egriffsklärung\s*\}\}/.test(textbox.value);
			this.lang = mw.config.get('wgContentLanguage');
			this.localisation = typeof window.autoFormatLocalisation === 'undefined' ||
				window.autoFormatLocalisation === true ? this.lang : window.autoFormatLocalisation;
			this.cleanElement(textbox);
			summary.value = this.cleanInternalLinks(summary.value);
			if (window.wikEd && window.wikEd.useWikEd) wikEd.UpdateFrame();
			return false;
		},
		isChanged: function(oldValue, newValue)
		{
			/* Entfernte Leerräume am Textende zählen nie als Änderung */
			oldValue = oldValue.replace(/\s+$/, '');
			newValue = newValue.replace(/\s+$/, '');
			/* Entfernte Leerräume am Zeilenende nicht als Änderung anzeigen, aber trotzdem ersetzen */
			var changed = oldValue.replace(/[\t\r ]+\n/g, '\n') !== newValue;
			var a = this.clickedElement;
			if (!a || !a.nodeType || a.nodeName === 'IMG')
			{
				var e = $(a && a.nodeType ? a : 'img[rel=autoFormatter]');
				e.css('backgroundColor', changed ? '#DEF740' : '');
				e.css('borderRadius', changed ? '3px' : '');
				e.css('opacity', changed ? '' : '.4');
			}
			else if (a) a.style.color = changed ? 'green' : 'silver';
			/* Normalisierte Zeilenumbrüche nie als Änderung werten, das vermeidet Flackern */
			return changed || oldValue.replace(/\r+\n/g, '\n') !== newValue;
		},
		cleanElement: function(e)
		{
			e.focus();
			if (typeof e.selectionStart === 'number')
			{
				var scroll = e.scrollTop, s1 = e.selectionStart, s2 = e.selectionEnd;
				if (s2 > s1 && (s1 > 0 || s2 < e.value.length))
				{
					var t = this.cleanText(e.value.substring(s1, s2));
					if (t === false) return;
					var newValue = e.value.substr(0, s1) + t + e.value.substr(s2);
					e.value = newValue;
					s2 = s1 + t.length + (e.value.length - newValue.length); /* Fix for Opera */
				}
				else if (!this.cleanAll(e)) return;
				e.selectionStart = s1;
				e.selectionEnd = s2;
				e.scrollTop = scroll;
			}
			else if (typeof document.selection === 'object') /* Internet Explorer */
			{
				var range = document.selection.createRange();
				if (range.text.length > 0)
				{
					var t = this.cleanText(range.text);
					if (t !== false) range.text = t;
				}
				else this.cleanAll(e);
			}
			else this.cleanAll(e);
		},
		cleanAll: function(e)
		{
			this.isAll = true;
			var t = this.cleanText(e.value);
			if (t !== false) e.value = t.replace(/^\s*\n/, '').replace(/\s+$/, '');
			return t !== false;
		},
		cleanText: function(t)
		{
			var oldValue = t;
			t = t.replace(/[ \r\t\xA0\xAD\u2000-\u200B\u202F]+\n/g, '\n');

			/* Steuerzeichen, undefinierte Unicode-Nummern und BOM entfernen */
			t = t.replace(/[\x00-\x08\x0C\x0E-\x1F\x7F-\x9F\uFEFF]+/g, '');
			/* Unsichtbares weiches Trennzeichen sichtbar machen, egal wo */
			t = t.replace(/(?:\xAD|&#*(?:shy|x0*AD|0*173);?)+/gi, '&shy;');
			/* ZERO WIDTH SPACE nur im Lateinischen entfernen */
			t = t.replace(/([\x00-\u024F])\u200B+(?=[\x00-\u024F])/g, '$1');
			/* LRM ist wirkungslos, wenn es neben einem LR-Zeichen steht */
			t = t.replace(/\u200E+(?=[A-Z\]ªµºÀ-ÖØ-öø-\u02B8])/gi, '');
			t = t.replace(/([A-ZªµºÀ-ÖØ-öø-\u02B8])\u200E+/gi, '$1');
			t = t.replace(/\u200E+/g, '&lrm;');

			t = this.backupNowikis(t);

			/* Mehrfache Leerzeilen auf einzelne reduzieren */
			t = t.replace(this.isDisambiguation ? /\n{3,}(?=\n)/g : /\n{3,}/g, '\n\n');
			t = this.cleanCharacterEntities(t);

			t = this.backupFilenames(t);

			t = this.cleanHeadlines(t);
			if (this.localisation === 'de')
			{
				/* Einheitliche Schreibweisen für Schlüsselwörter incl. Leerzeichenausgleich */
				t = t.replace(/\{\{\s*(?:SEITENTITEL|DISPLAYTITLE):\s*/gi, '{{SEITENTITEL:');
				t = t.replace(/#(?:WEITERLEITUNG|REDIRECT)[\s:=]*\[+\s*([^[\]|]*[^\s[\]|])(?:\s*\|[^[\]]*)?\]+/gi,
					'#WEITERLEITUNG [[$1]]');
				t = t.replace(/\[\[\s*[KC]ategor[iy]e?\s*:\s*([^[\]|]*[^\s[\]|])\s*(?=[\]|])/gi, '[[Kategorie:$1');
				/* Unnötiges "rechts" kürzen */
				t = t.replace(
					/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:(?:mini|miniatur|thumb)\s*\|+\s*r(?:echts|ight)|r(?:echts|ight)\s*\|+\s*(?:mini|miniatur|thumb))\s*\|+\s*/gi,
					'$1|thumb|');
				/* Set the order to "thumb|upright" if one isn't localized */
				t = t.replace(
					/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:upright([\s=_\d.]*)\|+\s*(?:mini|miniatur|thumb)|(?:hochkan|uprigh)t([\s=_\d.]*)\|+\s*thumb)\s*\|+\s*/gi,
					'$1|mini|hochkant$2$3|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:mini|thumb)\s*\|+\s*/gi,
					'$1|mini|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*r(?:echts|ight)\s*\|+\s*/gi,
					'$1|rechts|');
				/* Änderung von "miniatur" in "mini" nur zusammen mit anderen Änderungen */
				t = t.replace(
					/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:((?:left|none|center|centre|framed|enframed|frame|frameless|upright)\s*\|+)\s*miniatur|miniatur\s*(\|+\s*(?:left|none|center|centre|framed|enframed|frame|frameless|upright)))\s*\|+\s*/gi,
					'$1|$2mini$3|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*l(?:inks|eft)\s*\|+\s*/gi,
					'$1|links|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:oh|no)ne\s*\|+\s*/gi,
					'$1|ohne|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:zentriert|center|centre)\s*\|+\s*/gi,
					'$1|zentriert|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:gerahmt|framed|enframed|frame)\s*\|+\s*/gi,
					'$1|gerahmt|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:rahmenlo|frameles)s\s*\|+\s*/gi,
					'$1|rahmenlos|');
				t = t.replace(/(\[\[Datei:[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:hochkan|uprigh)t[\s=_]*([\d.]*)\s*\|+\s*/gi,
					function($0, $1, $2) { return $1 + '|hochkant' + ($2 ? '=' + $2 : '') + '|'; });
			}
			/* vertical-align values from the CSS standard */
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:grundlinie|baseline)\s*\|+\s*/gi,
				'$1|baseline|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:tief(?:gestellt)?|sub)\s*\|+\s*/gi,
				'$1|sub|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:hoch(?:gestellt)?|sup|super)\s*\|+\s*/gi,
				'$1|super|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:oben|top)\s*\|+\s*/gi,
				'$1|top|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*text-(?:oben|top)\s*\|+\s*/gi,
				'$1|text-top|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*mi(?:tt|ddl)e\s*\|+\s*/gi,
				'$1|middle|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*(?:unten|bottom)\s*\|+\s*/gi,
				'$1|bottom|');
			t = t.replace(/(\[\[(?:Datei|File):[^\n[\]]*[^\s[\]|])\s*\|+\s*text-(?:unten|bottom)\s*\|+\s*/gi,
				'$1|text-bottom|');

			t = this.cleanTemplates(t);
			t = t.replace(/\bclass\s*=\s*(?:(") *([ \w-]*? ?))? *\bprettytable\b/g, 'class=$1$2wikitable');

			t = this.cleanReferences(t);
			t = this.cleanTags(t);
			t = this.cleanExternalLinks(t);
			t = this.cleanInternalLinks(t);

			/* Unnötige Leerzeichen bei HTML-Attributen, wichtig vor den Anführungszeichen */
			while (/[!<|][ \w"-;=?[\]]*\b *= +"/i.test(t))
				t = t.replace(/([!<|][ \w"-;=?[\]]*)\b *= +"/gi, '$1="');

			/* Ersten Interlanguage-Link suchen; 9 wegen [[zh-classical:…]] */
			var i = t.search(/^\[\[ *[a-z]{2,3}(?:-[a-z-]{2,9})? *:/m), slice;
			if (i > 0)
			{
				i = Math.max(i, t.indexOf('<references', i));
				slice = t.slice(i);
				t = t.slice(0, i);
			}
			t = this.cleanTypography(t);
			t = this.cleanDates(t);
			if (slice) t += slice;

			t = this.cleanDuplicateLinks(t);
			t = this.cleanUnits(t);
			t = this.cleanISBNs(t);
			t = this.cleanCategories(t);
			/* Paragraf, Abs. und Satz mit geschützten Leerzeichen */
			t = t.replace(/§(?: *|&nbsp;)(\d\w* +A[bsatz.]+)(?: *|&nbsp;)(\d+ +S[atz.]+) *(?=\d)/gi,
				'§&nbsp;$1&nbsp;$2&nbsp;');
			t = t.replace(/§(?: *|&nbsp;)(\d\w* +A[bsatz.]+) *(?=\d)/gi,
				'§&nbsp;$1&nbsp;');
			t = t.replace(/§ *(?=\d)/gi,
				'§&nbsp;');

			t = this.cleanRedundantTemplateParameters(t);
			t = this.cleanTemplatesByRules(t);
			t = this.executeUserReplacements(t);

			t = this.restoreFilenames(t);
			t = this.restoreNowikis(t);
			return this.isChanged(oldValue, t) ? t : false;
		},
		cleanCharacterEntities: function(t)
		{
			var entities = {
				'acute': '´', 'ap': '≈', 'approx': '≈', 'asymp': '≈', 'bdquo': '„', 'bull': '•', 'bullet': '•',
				'cent': '¢', 'centerdot': '·', 'Dagger': '‡', 'dagger': '†', 'ddagger': '‡', 'deg': '°', 'div': '÷',
				'divide': '÷', 'euro': '€', 'frac12': '½', 'frac14': '¼', 'frac34': '¾', 'ge': '≥', 'geq': '≥',
				'grave': '`', 'half': '½', 'harr': '↔', 'hellip': '…', 'infin': '∞', 'laquo': '«', 'ldquo': '“',
				'ldquor': '„', 'le': '≤', 'leq': '≤', 'lsaquo': '‹', 'lsquo': '‘', 'lsquor': '‚', 'mdash': '—',
				'middot': '·', 'minus': '−', 'mldr': '…', 'ndash': '–', 'ne': '≠', 'permil': '‰', 'plusmn': '±',
				'pm': '±', 'pound': '£', 'Prime': '″', 'prime': '′', 'raquo': '»', 'rarr': '→', 'rdquo': '”',
				'rdquor': '”', 'rsaquo': '›', 'rsquo': '’', 'rsquor': '’', 'sbquo': '‚', 'sect': '§', 'sup2': '²',
				'sup3': '³', 'times': '×', 'yen': '¥'
			};
			/* Limit to U+FFFF because of compatibility reasons, keep &#x1000F; intact */
			t = t.replace(/&#*(x([\dA-F]{2,})|(\d{3,})|[a-z]{4,9});?/gi, function($0, $1, $2, $3)
			{
				if ($2) $3 = parseInt($2, 16);
				/* Don't decode spaces and control characters */
				if ($3 > 160 && $3 < 8191 || $3 > 8207 && $3 < 8232 || $3 > 8239 && $3 < 8287 || $3 > 8303 && $3 < 55296)
					return String.fromCharCode($3);
				return entities[$1] || entities[$1.toLowerCase()] || $0;
			});
			t = t.replace(/ +&#*(?:amp|x0*26|0*38);? +/gi, ' & ');
			/* Geschützte Leerzeichen einheitlich als "&nbsp;", vereinfacht viele folgende Suchmuster */
			return t.replace(/&#*(?:nbsp|x0*A0|0*160);?/gi, '&nbsp;');
		},
		cleanTags: function(t)
		{
			/* Drop default font attributes */
			t = t.replace(
				/(<font\b[^<>]*?)\s+fa\w+(?:[\s"',=]*(?:Arial|Helvetica(?:\W?N\w*)?|sans\W?serif)\b)+[\s"';]*(?=\s\w+\s*=|>)/gi,
				'$1');
			t = t.replace(/(<font\b[^<>]*?)\s+size[\s"',=]*(?:-1\b|2\b|100\b[ ,.]*\d*%|1(?:\.0*)?em\b)["';]*/gi, '$1');
			/* Remove tags with no content */
			t = t.replace(/<(\w+)\s*(\s\w[^<>]*)?>\s*<\/\1\b[^<>]*>/gi, function($0, $1, $2)
			{
				if (/^[bh]r$/i.test($1)) return '<' + $1.toLowerCase() + ($2 || '') + ' />';
				return $2 && /\bclear:/i.test($2) ? $0 : '';
			});
			/* Remove inline elements with no attributes */
			while (/<(font|span)\s*>\s*(?:<(?!\1)|[^<])*?\s*<\/\1[^<>]*>/i.test(t))
				t = t.replace(/<(font|span)\s*>\s*((?:<(?!\1)|[^<])*?)\s*<\/\1[^<>]*>/gi, '$2');
			t = t.replace(
				/<font\s+color[\s"',=]*(#[\dA-F]{3,6}|[a-z]{3,20})[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
				'<span style="color:$1;">$2</span>');
			t = t.replace(/<font\s+size[\s"',=]*(?:-[2-9]|[01])[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
				'<small>$1</small>');
			t = t.replace(/<font\s+size[\s"',=]*(?:[+-]0|3)[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
				'<span style="font-size:larger;">$1</span>');
			/* Merge nested inline tags */
			t = t.replace(
				/<(abbr|cite|mark|s|small)\s*><(font|span)\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*>([^<>]*)<\/\2\s*>\s*(?=<\/\1\s*>)/gi,
				'<$1 style="$3;">$4');
			t = t.replace(
				/(<span\b[^<>]*?)\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*><span\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*>([^<>]*)<\/span\s*>\s*(?=<\/span\s*>)/gi,
				'$1 style="$2;$3;">$4');

			t = t.replace(/(<\/?s)trike\b/gi, '$1');
			/* Verschiedenste Formen von HTML-Zeilenumbrüchen durch einheitliche ersetzen */
			t = t.replace(/<(?:[\s\/\\]*br\b)+\s*(\s\w[^<>]*?)?[\s.\/\\]*>/gi, '<br$1 />');
			/* Unnötige HTML-Zeilenumbrüche entfernen, wenn sowieso ein Absatz folgt */
			t = t.replace(/ *<br \/>(?=\n[\n#*:;])/gi, '');
			t = t.replace(/<(ref|small|su[bp])\b\s*(\s\w[^<>]*?)?\s*><small\s*>([^<>]*)<\/small\s*><\/\1\s*>/gi,
				'<$1$2>$3</$1>');
			t = t.replace(/<small\s*><(ref|su[bp])\b\s*(\s\w[^<>]*?)?\s*>([^<>]*)<\/\1\s*><\/small\s*>/gi,
				'<$1$2>$3</$1>');
			/* Drop old navigation bar wrapper, see [[Template:NaviBlock]] */
			t = t.replace(/<div\s+class[^<>\w]*BoxenVerschmelzen[^<>\w]*>\s*(\{\{[^<>{}]*\}\})\s*<\/div>/gi, '$1');
			return t;
		},
		cleanHeadlines: function(t)
		{
			/* Keine geschützten Leerzeichen in Überschriften */
			while (/^=.*&nbsp;.*=$/im.test(t))
				t = t.replace(/^(=.*)&nbsp;(?=.*=$)/gim, '$1 ');
			/* Fettung zumindest kompletter Überschriften ist unerwünscht */
			t = t.replace(/^(=+) *'''([^\n']+)''' *(?==+$)/gm, '$1 $2 ');
			/* Repariert kaputte Überschriften, entfernt Doppelpunkte, setzt Leerzeichen */
			t = t.replace(/^(=+) *(.*[^\s=:]) *:? *\1$/gm, '$1 $2 $1');
			/* Always normalize "External links" headlines, use "Weblinks" in German */
			return t.replace(/^== *(?:Externer?|External)? *(?:Weblinks?|Links?|Webseiten?|Websites?) *=+/gim,
				this.lang === 'de' ? '== Weblinks ==' : '== External links ==');
		},
		cleanExternalLinks: function(t)
		{
			/* Doppelte eckige Klammern um Weblinks vereinfachen */
			t = t.replace(/\[+ *(https?:\/\/[^\n[\]]*?) *\]+/gi, '[$1]');
			/* Weblinks mit senkrechtem Strich reparieren */
			t = t.replace(/(\[https?:\/\/[^\s[\]|]*?) *\| *(?=[^\s=[\]|]+\])/gi, '$1 ');
			/* Schrägstriche am Ende einfacher Domains ergänzen */
			t = t.replace(/(\[https?:\/\/\w[\w.-]*\w\.\w+) +/gi, '$1/ ');
			/* Domains klein schreiben, egal ob beschriftet oder nicht */
			t = t.replace(/\bhttps?:\/\/[a-z.-]*[A-Z][\w.-]*/g, function($0) { return $0.toLowerCase(); });
			/* Verbliebene projektinterne Weblinks protokollrelativ machen */
			return t.replace(/\[ *https?:\/+(?=[a-z-]+\.wikipedia\.org\b)/gi, '[//');
		},
		cleanInternalLinks: function(t)
		{
			/* Works for "dewiki" and "enwiki" as well as "metawiki" */
			var wiki = mw.config.get('wgDBname').slice(0, -4);
			var ns = mw.config.get('wgFormattedNamespaces')[-1];

			/* Permanente Weblinks in Spezialseiten-Syntax umwandeln */
			var permaLinkReplace = function($0, $1, $2, $3)
			{
				/* Auf Alternative ausweichen, wenn zwischen ID und Anker noch Parameter stehen */
				var m = /^(\d*([^#]*))(.*)$/.exec($2);
				return m && m[2] ? '[{{fullurl:' +
					($1 === wiki ? '' : $1) + ':|oldid=' + m[1] + '}}' + m[3] +
					(typeof $3 === 'string' ? ' ' + $3 : '') + ']' :
					'[[:' + $1 + ':' +
					($1 === wiki ? ns : 'Special') + ':Permanent' +
					($1 === 'de' ? 'er ' : '') + 'Link/' + $2 +
					(typeof $3 === 'string' ? '|' + $3 : '') + ']]';
			};
			/* Weblinks auf Sprachversionen (auch auf die eigene) in Wikilinks umwandeln */
			var interWikiReplace = function($0, $1, $2, $3)
			{
				/* Auf Alternative ausweichen, wenn Parameter enthalten wind */
				var m = /^([^?]*)\?([^#]*)(.*)$/.exec($2);
				try
				{
					return m ? '[{{fullurl:' +
						($1 === wiki ? '' : $1 + ':') +
						decodeURIComponent(m[1]).replace(/_/g, ' ') + '|' + m[2] + '}}' + m[3] +
						(typeof $3 === 'string' ? ' ' + $3 : '') + ']' :
						'[[:' + $1 + ':' + $2.replace(/_/g, ' ') +
						(typeof $3 === 'string' ? '|' + $3 : '') + ']]';
				} catch (ex) { return $0; }
			};
			/* Schreibweise [[Weblink#Anker mit Leerzeichen|Beschriftung]] reparieren */
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/w\/[\w.]*\?(?:title=[^\s&[\]|]*&)?oldid=([^\n?[\]|]+?) *\|+ *([^\n[\]|]*?) *\]+/gi,
				permaLinkReplace);
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/wiki\/([^\n[\]|]*?) *\|+ *([^\n[\]|]*?) *\]+/gi,
				interWikiReplace);
			/* Schreibweise [Weblink#Anker Beschriftung] umwandeln */
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/w\/[\w.]*\?(?:title=[^\s&[\]|]*&)?oldid=([^\s?[\]|]+) +([^\n[\]|]+?) *\]+/gi,
				permaLinkReplace);
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/wiki\/([^\s[\]|]*) +([^\n[\]|]+?) *\]+/gi,
				interWikiReplace);
			/* Schreibweise [Weblink#Anker] umwandeln */
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/w\/[\w.]*\?(?:title=[^\s&[\]|]*&)?oldid=([^\s?[\]|]+) *\]+/gi,
				permaLinkReplace);
			t = t.replace(
				/\[+ *(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/wiki\/([^\s[\]|]*) *\]+/gi,
				interWikiReplace);
			/* Verbliebene projektinterne Weblinks ohne eckige Klammern ebenfalls umwandeln */
			t = t.replace(
				/(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/w\/[\w.]*\?(?:title=[^\s&[\]|]*&)?oldid=([^\s?<>[\]{|}]*[^\s!"),.:;<>?[\\\]{|}])/gi,
				permaLinkReplace);
			t = t.replace(
				/(?:https?:)?\/\/([a-z-]+)\.wikipedia\.org\/wiki\/([^\s<>[\]{|}]*[^\s!"),.:;<>?[\\\]{|}])/gi,
				interWikiReplace);

			/* Unnötig gewordene Vorlage in Spezialseiten-Syntax umwandeln */
			t = t.replace(/\{\{\s*Permalink\s*\|[^{|}]*\|\s*(\d+)\s*(?:(\|)\s*([^{|}]*?))?\s*\}\}/gi,
				'[[' + ns + ':Permanent' + (wiki === 'de' ? 'er ' : '') + 'Link/$1$2$3]]');
			/* Ausgewählte {{fullurl:…|…}} kompakter formulieren */
			t = t.replace(/\{\{\s*fullurl:\s*([^\n{|}]+)\|\s*(?:diff=prev&oldid=(\d+)|oldid=(\d+)&diff=prev)\s*\}\}/gi,
				'{{fullurl:$1|diff=$2$3}}');

			/* Wikilinks mit unnötigem Präfix ":w:de:", "w:de:" oder ":de:" vereinfachen */
			t = t.replace(new RegExp('\\[\\[ *(?::? *w *)?: *' + wiki +
				' *: *(([KC]ategor[iy]e? *:)?[^\\n[\\]]*\\S) *\\]\\]', 'gi'), function($0, $1, $2)
			{
				return '[[' + ($2 ? ':' : '') + $1 + ']]';
			});

			/* Anker in internen Links dekodieren */
			t = t.replace(/(\[\[[^\n#[\]{|]*#)([^\n#[\]|]+)(?=\|?[^\n#[\]|}]*\]\])/g, function($0, $1, $2)
			{
				try
				{
					/* Kodierung einiger Zeichen beibehalten (%25, %5B, %5D, %7B-%7D) */
					return $1 + decodeURIComponent($2.replace(/\.(?=[289A-E][\dA-F]|[357][B-F]|40|60)/g, '%')).
						replace(/[%[\]{|}]/g, function($0)
						{
							return '%' + $0.charCodeAt(0).toString(16).toUpperCase();
						});
				} catch (ex) { return $0; }
			});
			/* Sonstige kodierte Linkziele dekodieren */
			t = t.replace(/\[\[([^\n#%[\]{|}]*%[2-9A-E][^\n#[\]{|}]*)(?=#?[^\n[\]{|}]*\|?[^\n[\]{|}]*\]\])/gi,
				function($0, $1)
				{
					try
					{
						/* Kodierung einiger Zeichen beibehalten (%25, %3C, %3E, %5B, %5D, %7B-%7D) */
						return '[[' + decodeURIComponent($1).replace(/[%<>[\]{|}]/g, function($0)
						{
							return '%' + $0.charCodeAt(0).toString(16).toUpperCase();
						});
					} catch (ex) { return $0; }
				});
			/* Verbliebene Unterstriche aus Links entfernen */
			t = t.replace(/\[\[[^\n[\]_{|}]+_[^\n[\]{|}]+(?=\|?[^\n[\]{|}]*\]\])/g, function($0)
			{
				return $0.replace(/_/g, ' ');
			});

			/* [[Link|Die]]s wird zu [[Link|Dies]] weil besser lesbar;
			   MediaWiki akzeptiert hier wirklich nur Kleinbuchstaben, ä, ö, ü und ß */
			t = t.replace(/\[\[ *([^\n[\]|]+?) *(\|[^\n[\]|]+)\]\]([a-zßäöü]+)/g, '[[$1$2$3]]');
			/* [[Link|Link]]s werden zu [[Link]]s weil kürzer und besser lesbar */
			return t.replace(/\[\[ *([^\n[\]|]+?) *\|\1([^\n[\]|]*)\]\]/g, '[[$1]]$2');
		},
		cleanDuplicateLinks: function(t)
		{
			/* Remove links from dates that start with a year (e.g. ISO) */
			t = t.replace(/\[+([12]\d{3}\W+[0-3]?\d\W+[0-3]?\d)\]+/g, '$1');

			/* Never link dates and years in Persondata templates */
			var re = /\{\{\s*P(erson(?:endaten|data)\b[^{}]*\|\s*(?:GEBURTSD|STERBED|DATE)[\s\w]*=[^\n=[\]{|}]*)\[+([^\n=[\]{|}]+)\]+/i;
			while (re.test(t)) t = t.replace(re, '{{P$1$2');

			/* Doppelte Jahreszahlen entlinken */
			re = /\[\[ *([12]\d{3}) *\]\]/g;
			/* Infoboxen am Artikelanfang ausnehmen */
			var m = /^(?:\s*\{(?:\{[^}]*\}\}|[^}])*\}\})*/.exec(t);
			var start = m ? m[0].length : 0, found = [], a = [];
			/* Jeweils ersten Fund eines Jahres merken, danach entlinken */
			while (m = re.exec(t))
				if (m.index >= start)
					found[m[1]] ? a.push(m) : found[m[1]] = true;
			var r = '', p = 0;
			for (var i = 0; i < a.length; i++)
			{
				r += t.slice(p, a[i].index) + a[i][1];
				p = a[i].index + a[i][0].length;
			}
			return p ? r + t.slice(p) : t;
		},
		cleanDates: function(t)
		{
			var months = mw.config.get('wgMonthNames') || ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
				'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

			/* No non-breaking space between month and year */
			t = t.replace(new RegExp('(\\b[0-3]?\\d\\.?(?:&nbsp;|\\s)+(?:' + months.slice(1).join('|') +
				'))(?:\xA0|&nbsp;)(?=[12]\\d{3}\\b)', 'g'), '$1 ');
			/* Missverständliches deutsches Datumsformat durch Langform ersetzen */
			var separator = this.lang === 'en' ? ' ' : '. ';
			t = t.replace(
				/([\s'(\/>„])(3[01]|[12]\d|0?[1-9])\. *(1[012]|0?[1-9])\. *(?=[12]\d{3}[!,.:;?]?[\s')\/<\]“])/g,
				function($0, $1, $2, $3)
				{
					return $1 + ($2 | 0) + separator + months[$3 | 0] + ' ';
				});
			/* In "1850–14. Januar" immer "bis" einsetzen */
			separator = this.lang === 'de' ? ' bis ' : ' to ';
			t = t.replace(/(\s[12]\d{3}'*) *[–-] *('*(?:3[01]|[12]\d|0?[1-9])\.?) *([A-S][a-zä]+\b)/g,
				function($0, $1, $2, $3)
				{
					for (var i = months.length; --i; )
						if ($3 === months[i]) return $1 + separator + $2 + ' ' + $3;
					return $0;
				});
			/* Bis-Striche in 4-stellige Jahreszahlenbereiche einsetzen */
			t = t.replace(
				/([\s!'(>|„])(?:\[\[ *([12]\d{3}) *\]\]|([12]\d{3})) *[–-] *(?:\[\[ *([12]\d{3}) *\]\]|([12]\d{3}))(?=[!,.:;?]?[\s!')\/<\]|}“])/g,
				function($0, $1, $2, $3, $4, $5)
				{
					return ($2 || $3) < ($4 || $5) ? $1 + ($2 || $3) + '–' + ($4 || $5) : $0;
				});
			/* Bis-Striche in 2-stellige Jahreszahlenbereiche einsetzen */
			t = t.replace(/([\s!'(>|„][12]\d(\d\d)) *- *(?=(1[3-9]|[2-9]\d)[!,.:;?]?[\s!')\/<\]|“])/g,
				function($0, $1, $2, $3) { return $2 < $3 ? $1 + '–' : $0; });
			/* "1980–90" becomes "1980–1990" */
			t = t.replace(/([\s!'(>|„]([12]\d)(\d\d)) *– *(?=(\d\d)[!,.:;?]?[\s!')\/<\]|“])/g,
				function($0, $1, $2, $3, $4) { return $3 < $4 ? $1 + '–' + $2 : $0; });
			/* ISSNs aber ohne Bis-Striche, wichtig nach den Jahreszahlen */
			return t.replace(/(IS\wN\W*\d+)–(?=\d)/g, '$1-');
		},
		cleanTypography: function(t)
		{
			/* Double quotes */
			if (this.lang === 'de')
				t = t.replace(/([\s!#'(*+\/:;>[|-])(?:"|,,)([^\s"“”„][^\n"“”„]*)"(?=[\s!'),.\/:;<?\]}-])/g, '$1„$2“');
			t = t.replace(/(\{\{(?:Zitat|")\s*\|\s*(?:(?:1|Text)\s*=)?[^={|}„]*)„([^\n{|}‘‚“”„]+)“/gi, '$1‚$2‘');
			/* Auslassungspunkte */
			t = t.replace(/([ '(>[|„])\.\.\.(?=[ '),<?\]}“])/g, '$1…');
			t = t.replace(/[,;](?: |&nbsp;)*†(?: |&nbsp;)*(?=[\w[])/gi, '; † ');
			/* Bis-Striche bei Seitenzahlen */
			t = t.replace(/\b(Sp?\.|Seiten?|Spalten?) *(\d+) *[–-] *(?=\d+[\s!),.\/:;<?\]|}“])/g, '$1 $2–');
			/* English Wikipedia also uses en dashes */
			t = t.replace(/([\w'\)>\]\xC0-\u024F“]) +-(,?) +(?=[\w'\(\[\xC0-\u024F„])/g, '$1 –$2 ');
			return t;
		},
		cleanUnits: function(t)
		{
			/* Maßeinheiten immer mit Leerzeichen */
			t = t.replace(
				/([ '(*+\/:;„][−-]?\d+(?:[,–]\d+)?) ?(k[Bgm]|Ki?B|[MGT](?:i?B|Hz)|[mc]m|k?Hz|EUR|Euro|CHF|US[D$]|JPY|[gm€¥])(?=[ !'),.\/:;<?²³“])/g,
				'$1&nbsp;$2');
			/* Prozentwerte erhalten seit Mitte 2007 automatisch ein geschütztes Leerzeichen */
			if (this.lang === 'de')
				t = t.replace(/([\s'(*+\/:;„][−-]?\d+(?:[,–]\d+)?)(?:\xA0|&nbsp;)?(?=%[\s!'),.\/:<?\]|“])/gi, '$1 ');
			return t;
		},
		cleanISBNs: function(t)
		{
			/* ISBNs mit Bindestrichen gliedern, Gruppennummern 0 und 1 für englischsprachige Bücher */
			t = t.replace(/\b(?:ISBN(?:-?1[03])?:?\s*|(ISBN\s*=\s*))((?:9-?7-?[89]-?)?0)([\d-]{8,}[\dX]\b)/gi,
				function($0, $1, $2, $3) {
					return ($1 ? $1 : 'ISBN ') + $2.replace(/^9\D*7\D*([89])\D*0/, '97$1-0') + '-' +
						$3.replace(/[^\dX]/gi, '').
						replace(/^([01]\d)(\d{6})\B/, '$1-$2-').
						replace(/^([2-6]\d\d)(\d{5})\B/, '$1-$2-').
						replace(/^(7\d{3}|8[0-4]\d\d)(\d{4})\B/, '$1-$2-').
						replace(/^(8[5-9]\d{3})(\d{3})\B/, '$1-$2-').
						replace(/^(9[0-4]\d{4})(\d\d)\B/, '$1-$2-').
						replace(/^(9[5-9]\d{5})(\d)\B/, '$1-$2-');
				});
			t = t.replace(/\b(?:ISBN(?:-?1[03])?:?\s*|(ISBN\s*=\s*))((?:9-?7-?[89]-?)?1)([\d-]{8,}[\dX]\b)/gi,
				function($0, $1, $2, $3) {
					return ($1 ? $1 : 'ISBN ') + $2.replace(/^9\D*7\D*([89])\D*1/, '97$1-1') + '-' +
						$3.replace(/[^\dX]/gi, '').
						replace(/^(0\d)(\d{6})\B/, '$1-$2-').
						replace(/^([1-3]\d\d)(\d{5})\B/, '$1-$2-').
						replace(/^(4\d{3}|5[0-4]\d\d)(\d{4})\B/, '$1-$2-').
						replace(/^(5[5-9]\d{3}|[67]\d{4}|8[0-5]\d{3}|86[0-8]\d\d|869[0-7]\d)(\d{3})\B/, '$1-$2-').
						replace(/^(869[89]\d\d|8[7-9]\d{4}|9[0-8]\d{4}|99[0-8]\d{3})(\d\d)\B/, '$1-$2-').
						replace(/^(999\d{4})(\d)\B/, '$1-$2-');
				});
			/* Gruppennummer 3 für deutschsprachige Bücher */
			t = t.replace(/\b(?:ISBN(?:-?1[03])?:?\s*|(ISBN\s*=\s*))((?:9-?7-?[89]-?)?3)([\d-]{8,}[\dX]\b)/gi,
				function($0, $1, $2, $3) {
					return ($1 ? $1 : 'ISBN ') + $2.replace(/^9\D*7\D*([89])\D*3/, '97$1-3') + '-' +
						$3.replace(/[^\dX]/gi, '').
						replace(/^(0[0-24-9]|1\d)(\d{6})\B/, '$1-$2-').
						replace(/^(03[0-3]|[2-6]\d\d)(\d{5})\B/, '$1-$2-').
						replace(/^(03[4-6]\d|7\d{3}|8[0-4]\d\d)(\d{4})\B/, '$1-$2-').
						replace(/^(03[7-9]\d\d|8[5-9]\d{3}|95[4-9]\d\d|9[69]\d{3})(\d{3})\B/, '$1-$2-').
						replace(/^(9[0-4]\d{4})(\d\d)\B/, '$1-$2-').
						replace(/^(95[0-3]\d{4}|9[78]\d{5})(\d)\B/, '$1-$2-');
				});
			return t;
		},
		cleanReferences: function(t)
		{
			t = t.replace(/<\s*references\s*(\s\b[^<\/>]*?)?\s*(?:\/|>\s*<\s*\/\s*references)\s*>/gi, '<references$1 />');
			t = t.replace(/<\s*references\s*(\s\b[^<\/>]*?)?\s*>/gi, '<references$1>');
			t = t.replace(/<\s*\/\s*references\s*>/gi, '</references>');
			if (this.isAll)
			{
				var re = /(<references[^<\/>]*)>/g, m;
				while (m = re.exec(t))
					if (t.indexOf('</references>', m.index) < 0)
						t = t.slice(0, m.index) + m[1] + ' />' + t.slice(m.index + m[0].length);
			}
			/* Keine Leerzeile vor einzeiligen <references /> */
			t = t.replace(/(==\n)\n+(?=<references[^\n<>]*\/>\n\n)/gi, '$1');
			/* Leerzeile nach Einzelnachweisen */
			t = t.replace(
				/(<\/?references[^\n<>]*>)\s*(?=\{\{Navi(?:gationsleiste |Block)|\{\{SORTIERUNG:|\{\{DEFAULT\w*SORT\w*:|\[\[[KC]ategor[iy]e?:)/gi,
				'$1\n\n');
			t = t.replace(/<\s*ref\s*(\s\b[^<\/>]*?)\s*(?:\/|>\s*<\s*\/\s*ref)\s*>/gi, '<ref$1 />');

			/* Zeilenumbrüche in Einzelnachweisen nur oben im Artikel entfernen */
			var i = t.indexOf('<references'), slice;
			if (i > 0)
			{
				slice = t.slice(i);
				slice = slice.replace(/<\s*ref\s*(\s\b[^<\/>]*?)?\s*>[\t ]*/gi, '<ref$1>');
				slice = slice.replace(/(?:(\n[\t ]*)|[\t ]*)<\s*\/\s*ref\s*>/gi, '$1</ref>');
				t = t.slice(0, i);
			}
			t = t.replace(/<\s*ref\s*(\s\b[^<\/>]*?)?\s*>\s*/gi, '<ref$1>');
			t = t.replace(/\s*<\s*\/\s*ref\s*>/gi, '</ref>');
			if (slice) t += slice;

			/* Leerzeichen zwischen Satzende und <ref> oder zwei <ref> entfernen */
			t = t.replace(/([!,.;?]|<ref\b[^<\/>]*(?:\/|>[^<>]*<\/ref)>) +(?=<ref[ >])/gi, '$1');
			/* Zwei gleiche Satzzeichen vor und nach einem <ref> auf eins kürzen */
			return t.replace(/([!,.:;?])(<ref\b[^<\/>]*(?:\/|>[^<>]*<\/ref)>)\1/gi, '$1$2');
		},
		cleanCategories: function(t)
		{
			t = t.replace(/\{\{\s*(SORTIERUNG|DEFAULT ?\w*SORT\w*)\s*[:|]\s*/gi,
				this.localisation === 'de' ? '{{SORTIERUNG:' : this.localisation ? '{{DEFAULTSORT:' : '{{$1:');

			/* Unicodeblock Basis-Lateinisch (U+0000 bis U+007F) */
			var sortSrc = '"\'./?';
			var sortDst = '     ';
			/* Unicodeblock Lateinisch-1, Ergänzung (U+0080 bis U+00FF) */
			sortSrc += '¢£¥©ª®²³¹ºÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðñòóôõöøùúûüýÿ';
			sortDst += 'cLYCaR231oAAAAAACEEEEIIIIDNOOOOOOUUUUYaaaaaaceeeeiiiidnoooooouuuuyy';
			/* Unicodeblock Lateinisch, erweitert-A (U+0100 bis U+017F) */
			sortSrc += 'ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ';
			sortDst += 'AaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGgGgGgHhHhIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnnNnOoOoOoRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUuWwYyYZzZzZzs';
			/* Unicodeblock Kyrillisch (U+0400 bis U+04FF) */
			sortSrc += '\u0400ІЈ\u040DЎАБВГДЕЗИЙКЛМНОПРСТУФЦЪЫЭабвгдезийклмнопрстуфцъыэѐіј\u045DўҐґҚқҰұҺһ';
			sortDst += 'EIJIUABWGDESIJKLMNOPRSTUFZAYEabwgdesijklmnoprstufzayeeijiuGgQqUuHh';
			/* Unicodeblock Allgemeine Interpunktion (U+2000 bis U+206F) */
			sortSrc += '–—‘‚‛“”„\u201F';
			sortDst += '         ';
			var sortMap = { '&': 'und', '+': 'und',
				'Æ': 'AE', 'Þ': 'TH', 'ß': 'ss', 'æ': 'ae', 'þ': 'th', 'Ĳ': 'IJ', 'ĳ': 'ij', 'Œ': 'OE', 'œ': 'oe',
				'Α': 'Alpha', 'Β': 'Beta', 'Γ': 'Gamma', 'Δ': 'Delta', 'Ε': 'Epsilon', 'Ζ': 'Zeta', 'Η': 'Eta',
				'Θ': 'Theta', 'Ι': 'Iota', 'Κ': 'Kappa', 'Λ': 'Lambda', 'Μ': 'My', 'Ν': 'Ny', 'Ξ': 'Xi', 'Ο': 'Omikron',
				'Π': 'Pi', 'Ρ': 'Rho', 'Σ': 'Sigma', 'Τ': 'Tau', 'Υ': 'Ypsilon', 'Φ': 'Phi', 'Χ': 'Chi',
				'Ψ': 'Psi', 'Ω': 'Omega',
				'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon', 'ζ': 'zeta', 'η': 'eta',
				'θ': 'theta', 'ι': 'iota', 'κ': 'kappa', 'λ': 'lambda', 'μ': 'my', 'ν': 'ny', 'ξ': 'xi', 'ο': 'omikron',
				'π': 'pi', 'ρ': 'rho', 'ς': 'sigma', 'σ': 'sigma', 'τ': 'tau', 'υ': 'ypsilon', 'φ': 'phi', 'χ': 'chi',
				'ψ': 'psi', 'ω': 'omega',
				'Ё': 'Jo', 'Є': 'Je', 'Ї': 'Ji', 'Ж': 'Sch', 'Х': 'Ch', 'Ч': 'Tsch', 'Ш': 'Sch', 'Щ': 'Schtsch',
				'Ю': 'Ju', 'Я': 'Ja', 'ж': 'sch', 'х': 'ch', 'ч': 'tsch', 'ш': 'sch', 'щ': 'schtsch', 'ю': 'ju',
				'я': 'ja', 'ё': 'jo', 'є': 'je', 'ї': 'ji', 'Ғ': 'Gh', 'ғ': 'gh', 'Ң': 'Ng', 'ң': 'ng' };
			t = t.replace(/\{\{(?:SORTIERUNG|DEFAULT\w*SORT\w*):[^\n{}]*\}\}/g, function($0)
			{
				return $0.replace(/&#?\w+;/g, ' ').replace(
					/["&'+\-.\/?¢£¥©ª®²³¹ºÀ-ÖØ-öø-ſΑ-ΡΣ-Ωα-ω\u0400ЁЄІ-Ј\u040DЎА-ёєі-ј\u045DўҐ-ғҚқҢңҰұҺһ–—‘-\u201F]/g,
					function($0)
					{
						return sortMap[$0] || sortDst.charAt(sortSrc.indexOf($0));
					}).replace(/ +(?=[ }])/g, '');
			});
			/* Groß-/Kleinschreibung wird seit dem 8. März 2011 ignoriert */
			var title = mw.config.get('wgTitle').replace(/(?=[$()*+.?^[\\\]{|}])/g, '\\') + '\\s*';
			t = t.replace(new RegExp('\\{\\{(?:SORTIERUNG|DEFAULT\\w*SORT\\w*):\\s*' + title + '\\}\\}\\s*', 'gi'), '');
			if (!/\{\{(?:SORTIERUNG|DEFAULT\w*SORT\w*):/.test(t))
				t = t.replace(new RegExp('(\\[\\[[KC]ategor[iy]e?:[^[\\]|]*)\\|' + title + '(?=\\]\\])', 'gi'), '$1');
			t = t.replace(/(\[\[[KC]ategor[iy]e?:)([a-z])/g, function($0, $1, $2) { return $1 + $2.toUpperCase(); });

			/* Leerzeile zwischen bestimten Vorlagen und Kategorienblock */
			t = t.replace(
				/(\{\{(?:Begriffsklärung|Navi(?:gationsleiste |Block)|Normdaten)[^{}]*\}\})\s*(?=\{\{SORTIERUNG:|\{\{DEFAULT\w*SORT\w*:|\[\[[KC]ategor[iy]e?:)/gi,
				'$1\n\n');
			/* Split categories into separate lines (don't make this a look-ahead, it's slow!) */
			t = t.replace(/([^\s>-]) *(\[\[[KC]ategor[iy]e?:[^\n[\]]*\]\])/gi, '$1\n$2');
			t = t.replace(/(\[\[[KC]ategor[iy]e?:[^\n[\]]*\]\]) *(?![\s<-]|$)/gi, '$1\n');
			t = t.replace(/(\[\[[KC]ategor[iy]e?:[^\n[\]]*\]\]\n) *(?!\[\[[KC]ategor[iy]e?:|[\s<-]|$)/gi, '$1\n');
			/* Keine Leerzeile zwischen SORTIERUNG und Kategorie */
			return t.replace(/(\{\{(?:SORTIERUNG|DEFAULT\w*SORT\w*):[^\n{}]*\}\})\s*(?=\[\[[CK]ategor[iy]e?:)/gi, '$1\n');
		},
		cleanTemplates: function(t)
		{
			t = t.replace(/\{\{\s*:?\s*(?:Vorlage|Template)\s*:\s*/gi, '{{');
			/* Unterstriche aus allen Vorlagennamen entfernen */
			while (/(?:^|[^{])\{\{[ 0-9a-z\xC0-\u024F-]+_/i.test(t))
				t = t.replace(/((?:^|[^{])\{\{[ 0-9a-z\xC0-\u024F-]+)_+/gi, '$1 ');
			/* Wirkungslose Leerzeilen aus Vorlagen entfernen */
			while (/^\{\{(?:<(?:br|file>)[^>]*>|[^<>{}])*\n\n+ *[|}]/m.test(t))
				t = t.replace(/^(\{\{(?:<(?:br|file>)[^>]*>|[^<>{}])*\n)\n+(?= *[|}])/gm, '$1');

			/* Use a {{Commons category|…}} template instead of {{Commons|Category:…}} */
			t = t.replace(/\{\{\s*Commons *(?:cat|category)?\s*\|\s*[KC]ategor[iy]e?\s*:\s*/gi,
				this.lang === 'de' ? '{{Commonscat|' : '{{Commons category|');

			/* Projektweit einheitliche Schreibweisen für häufig verwendete Vorlagen */
			t = t.replace(/\{\{\s*(?:Artikel über lebende Pe\w*|BLP)[\s|]*(?=\}\})/gi, '{{Artikel über lebende Person');
			t = t.replace(/\{\{\s*(?:Belege|Quellen?)(?: *fehlen)?(?:[\s|]*(?=\}\})| *(?=\s*\|))/gi, '{{Belege fehlen');
			t = t.replace(/\{\{\s*(?:Benutzer(?:in)?|IP|User|Vandale)\s*\|\s*/gi, '{{Benutzer|');
			t = t.replace(/\{\{\s*cite\s+(?=\w+\s*\|)/gi, '{{cite ');
			t = t.replace(/\{\{\s*Commons(?:[\s|]*(?=\}\})|\s*(\|)\s*)/gi, '{{Commons$1');
			t = t.replace(/\{\{\s*Commons *cat(?:egory)?(?:[\s|]*(?=\}\})|\s*(\|)\s*)/gi,
				this.lang === 'de' ? '{{Commonscat$1' : '{{Commons category$1');
			t = t.replace(/\{\{\s*Dieser *Artikel\s*\|\s*/gi, '{{Dieser Artikel|');
			t = t.replace(/\{\{\s*DOI\s*\|\s*/gi, '{{DOI|');
			t = t.replace(/\{\{\s*dts(x?)\s*\|\s*/gi, '{{dts$1|');
			t = t.replace(/\{\{\s*Erledigt[\s|~]*\}\}/gi, '{{Erledigt|~~~~}}');
			t = t.replace(/\{\{\s*(?:Gefallen|Fallen|Verlust|Verschlechtert|Decrease|Down|Loss)[\s|]*(?=\}\})/gi,
				this.lang === 'de' ? '{{Gefallen' : '{{decrease');
			t = t.replace(/\{\{\s*(?:Gestiegen|Steigen|Gewinn|Profit|Verbessert|Increase|Gain)[\s|]*(?=\}\})/gi,
				this.lang === 'de' ? '{{Gestiegen' : '{{increase');
			t = t.replace(/\{\{\s*(?:Hauptartikel|Hauptseite|Main|Main *articles?|See *main)\s*\|\s*/gi,
				this.lang === 'de' ? '{{Hauptartikel|' : '{{Main|');
			t = t.replace(/\{\{\s*(?:Internetquelle|Weblink)(?=\s*\|)/gi, '{{Internetquelle');
			t = t.replace(/\{\{\s*(?:In *TeX *konvertieren|TeX)(?:[\s|]*(?=\}\})|\s*(\|)\s*)/gi, '{{In TeX konvertieren$1');
			t = t.replace(/\{\{\s*lang\s*\|\s*/gi, '{{lang|');
			t = t.replace(/\{\{\s*Link *([FG]A)\s*\|\s*/gi, '{{Link $1|');
			t = t.replace(/\{\{\s*nts\s*\|\s*/gi, '{{nts|');
			t = t.replace(/\{\{\s*(?:Nur *Liste|Liste)(?:[\s|]*(?=\}\})| *(?=\s*\|))/gi, '{{Nur Liste');
			t = t.replace(/\{\{\s*Okina[\s|]*\}\}/gi, '\u02BB');
			t = t.replace(/\{\{\s*Rotten *Tomatoes\s*\|\s*/gi, '{{Rotten Tomatoes|');
			t = t.replace(/\{\{\s*S(?:iehe *auch|ee[ -]*also)\s*\|\s*/gi,
				this.lang === 'de' ? '{{Siehe auch|' : '{{See also|');
			t = t.replace(/\{\{\s*Sort(Date|Key|KeyName)\s*\|\s*/gi, '{{Sort$1|');
			t = t.replace(/\{\{\s*(?:(?:Toter|Bad|Broken|Dead)[ -]*Link|404|Dead|DL)[\s|]*(?=[|}])/gi,
				this.lang === 'de' ? '{{Toter Link' : '{{dead link');
			t = t.replace(/\{\{\s*(u)nsign?(?:iert|ed)?\s*\|\s*/gi,
				this.lang === 'de' ? '{{$1nsigniert|' : '{{$1nsigned|');
			t = t.replace(/\{\{\s*(?:Unverändert|Stabil|Steady|Nochange|Unchanged)[\s|]*(?=\}\})/gi,
				this.lang === 'de' ? '{{Unverändert' : '{{steady');
			t = t.replace(/\{\{\s*(?:Vorlage|Tl?1?|Temp|Template(?: *link)?)\s*\|\s*/gi,
				this.lang === 'de' ? '{{Vorlage|' : '{{tl|');
			t = t.replace(/\{\{\s*Wik(ibooks|inews|iquote|isource|ivoyage|tionary)[\s|]*(?=\||\}\})/gi, '{{Wik$1');

			/* Einheitliche Kleinschreibung für Sprachvorlagen wie {{enS|…}} */
			t = t.replace(/\{\{\s*([A-Za-z])([a-z]+S)(?:[\s|]*(?=\}\})|\s*(\|)\s*)/g, function($0, $1, $2, $3)
			{
				return '{{' + $1.toLowerCase() + $2 + ($3 || '');
			});
			t = t.replace(/\{\{\s*IMDb *([a-z])(\w+)\s*\|\s*/gi, function($0, $1, $2)
			{
				return '{{IMDb ' + $1.toUpperCase() + $2 + '|';
			});

			t = t.replace(/\(\{\{\s*B\s*((?:\|[^\n{|}]*){2,4})\}\}\)/gi, '{{Bibel$1}}');
			/* Remove navigation bar wrapper if it contains a single navigation bar only */
			t = t.replace(/\{\{\s*NaviBlock\s*\|[\s|]*([^\n<>{|}]+)[\s|]*(?=\}\})/gi, '{{$1');
			t = t.replace(/\{\{\s*Normdaten\s*\|\s*PND\s*=\s*/g, '{{Normdaten|TYP=p|GND=');
			t = t.replace(/\{\{\s*WBA\s*\|\s*/gi, '{{Waybackarchiv|');
			t = t.replace(
				/\[ *\{\{\s*Wayback\w*\s*\|\s*url\s*=\s*[^\s\d{|}]*(\d{1,14})\/(\w+:[^\s{|}]*)[^{}]*\}\}\s+([^[\]|]*)\]/gi,
				'{{Webarchiv | url=$2 | wayback=$1 | text=$3}}');

			return t.replace(/(\|\s*(?:Breit|Läng)engrad\s*=\s*[\d.\/]*?)\/[\/0]*(?=[\n|}])/g, '$1');
		},
		cleanRedundantTemplateParameters: function(t)
		{
			var parameters = window.redundantTemplateParameters || [
				'(?:IMDb Name|IMDb Titel|OFDb|Rotten Tomatoes)|2',
				'Infobox (?:Arcade|Computer- und Videospiel|Musikalbum)|Titel',
				'Infobox (?:Band|Burg|Chemikalie|Eishockeyspieler|Flughafen|Flugzeug|Gemeinde in (?:Deutschland|Österreich)|Gemeindeverband in Deutschland|Landkreis|Ort in den (?:Niederlanden|Vereinigten Staaten)|Schiff|Schutzgebiet|Software|Stadion|Unternehmen)|Name',
				'Infobox (?:Berg|Fluss|Insel|See)|NAME',
				'Infobox Fußballspieler|kurzname',
				'Infobox Gemeinde in Italien|nomeComune',
				'Infobox Nationalpark|title',
				'Infobox Ort in der Schweiz|NAME_ORT',
				'Infobox Ort in (?:Polen|Tschechien)|Ort',
				'Infobox Ortsteil einer Gemeinde(?: in Deutschland)?|Ortsteil',
				'Infobox PKW-Modell|Modell',
				'Infobox Publikation|titel'];
			var title = '\\s*(?:' +
				mw.config.get('wgTitle').replace(/(?=[$()*+.?^[\\\]{|}])/g, '\\').replace(/\s+/g, '\\s+') +
				'|\\{+\\w*\\}+)?\\s*';
			for (var i = parameters.length; i--; )
			{
				var m = /^(.+)\|(\d+)$/.exec(parameters[i]);
				var re = m ? m[1] + '\\s*(?:\\|[^{|}]*){' + (m[2] - 1) + '})\\|' + title + '(?=\\})' :
					parameters[i].replace(/[\s_]+/g, '[\\s_]+').replace(/\|(?=[^|]*$)/, '\\s*(?:\\|[^{}]*)?)\\|\\s*') +
					'\\s*=' + title + '(?=[|}])';
				t = t.replace(new RegExp('(\\{\\{\\s*' + re, 'g'), '$1');
			}
			return t;
		},
		cleanTemplatesByRules: function(t)
		{
			var rules = window.autoFormatTemplates || [ { name: 'Personendaten', format: '|_=_\n' } ];
			for (var rule in rules)
			{
				if (!rules[rule] || !rules[rule].name) continue;
				rule = rules[rule];
				/* Format muss minimalst |_=_ lauten */
				if (!rule.format) rule.format = '';
				if (rule.format.indexOf('|') < 0) rule.format = '|' + rule.format;
				if (rule.format.indexOf('_') < 0) rule.format = rule.format.replace('|', '|_');
				if (rule.format.indexOf('=') < 0) rule.format += '=';
				if (rule.format.match(/_+/g).length < 2) rule.format += '_';
				var re = new RegExp('\\{\\{\\s*' + rule.name.replace(/[ _]+/g, '[ _]+') + '\\s*\\|', 'gi'), m, a = [];
				while (m = re.exec(t)) a.push(m);
				for (var i = a.length; i--; ) t = this.cleanTemplateByRule(t, rule, a[i].index + 2);
			}
			return t;
		},
		cleanTemplateByRule: function(t, rule, start)
		{
			var parameters, p = '', pos = start - 1;
			var nesting = { '[': 0, '{': 0 };
			while (++pos < t.length)
			{
				var c = t.charAt(pos);
				if (c === '[' || c === '{') nesting[c]++;
				else if (c === ']' && nesting['[']-- <= 0) return t;
				/* Parsing hatte nach den öffnenden {{ begonnen, also vor den schließenden }} aufhören */
				else if (c === '}' && nesting['{']-- <= 0)
				{
					if (t.charAt(pos + 1) !== '}') return t;
					parameters.push(p);
					break;
				}
				else if (c === '|' && nesting['['] <= 0 && nesting['{'] <= 0)
				{
					parameters ? parameters.push(p) : parameters = [];
					p = '';
				}
				p += c;
			}
			if (pos >= t.length || nesting['['] > 0) return t;

			var m = /((_+)#*)( *)[^_]*((_+)#*)( *)/.exec(rule.format);
			var kMax = m ? m[1].length : 0, kMin = m ? m[2].length : 0, kFix = m ? m[3].length : 0;
			var vMax = m ? m[4].length : 0, vMin = m && m[5].length > 1 ? m[5].length : 0, vFix = m ? m[6].length : 0;
			var result = rule.name + (/\n$/.test(rule.format) ? '\n' : '');
			for (var i = 0; i < parameters.length; i++)
			{
				p = parameters[i];
				if (!(m = /^\s*\|\s*(([^=|]*?) *)\s*=[\t \xA0]*([\s\S]*? *)\s*$/.exec(p)))
				{
					/* Leere unbenannte Parameter verwerfen, wenn ein benannter folgt */
					if (!/^\s*\|\s*$/.test(p) || (parameters[i + 1] && parameters[i + 1].indexOf('=') < 1))
						result += p;
					continue;
				}
				p = rule.parameters && typeof rule.parameters[m[2]] !== 'undefined' ? rule.parameters[m[2]] : m[1];
				/* Parameter verwerfen, die in den Regeln mit false oder ähnlich markiert sind */
				if (!p) continue;
				for (var f = 0; (f < kFix || kMax && p.length > kMax) && /\s$/.test(p); f++)
					p = p.slice(0, -1);
				for (var f = 0; (f < vFix || vMax && m[3].length > vMax) && /\s$/.test(m[3]); f++)
					m[3] = m[3].slice(0, -1);
				while (p.length < kMin) p += ' ';
				while (m[3].length < vMin) m[3] += ' ';
				result += rule.format.replace(/_+#*([^_]*)_+#*/, p.replace(/\$/g, '$$$$') + '$1' +
					m[3].replace(/\$/g, '$$$$'));
			}
			if (rule.format.indexOf('\n') >= 0)
			{
				if (typeof rule.trim === 'undefined' || rule.trim) result = result.replace(/[\t\r ]+$/gm, '');
				/* Schließendes }} immer auf eine eigene Zeile, wenn irgendein Umbruch im Spiel ist */
				result = result.replace(/\n+\s*$/, '') + '\n';
			}
			return t.slice(0, start) + result + t.slice(pos);
		},
		executeUserReplacements: function(t)
		{
			var from, replacements = window.autoFormatReplacements || {};
			for (from in replacements)
			{
				var to = replacements[from];
				/* Wenn die Ersetzungen kein assoziatives Objekt sondern ein 2-dimensionales Array sind */
				if (typeof to === 'object' && to.length > 1) from = to[0], to = to[1];
				/* If the search pattern is a regular expression already, 'function' is for older Chrome */
				if (typeof from === 'object' || typeof from === 'function')
				{
					t = t.replace(from, to);
					continue;
				}
				/* Leere Suchmuster sicherheitshalber nicht zulassen */
				if (/^\s*$/.test(from) || typeof to !== 'string') continue;

				/* Die meisten Regex-Zeichen maskieren, außer Zeichenklassen */
				from = from.replace(/(?=[$()*+.?^{|}])/g, '\\');
				to = to.replace(/\$/g, '$$$$');
				/* Wortgrenzen beachten */
				from = from.replace(/^(?=\w|\\d)/, '\\b').replace(/(\w)$/, '$1\\b');
				var a = [];
				for (var re = /\\[dw]/g, m, i = 1; m = re.exec(from); a.push(m))
					to = to.replace(m[0], '$' + i++);
				for (var i = a.length; i--; )
					from = from.slice(0, a[i].index) + (a[i][0] === '\\d' ? '(\\d+)' :
						'([A-Za-z\xB5\xC0-\xD6\xD8-\xF6\xF8-\u024F]+)') +
						from.slice(a[i].index + 2);
				/* Look-ahead verwenden, wenn ein Platzhalter in Suchmuster und Ersatz am Ende steht */
				if (/\+\)\\b$/.test(from) && new RegExp('\\$' + a.length + '$').test(to))
				{
					from = from.replace(/([^()]+)\)\\b$/, '?=$1\\b)');
					to = to.replace(/\$\d+$/, '');
				}
				/* Allow optional spaces after dots in the search pattern */
				from = from.replace(/\\\.(?=[(\w\xC0-\u024F])/g, '\\.(?:[ \xA0]|&nbsp;)*');
				t = t.replace(new RegExp(from, 'g'), to);
			}
			return t;
		},
		backupNowikis: function(t)
		{
			this.nowikis = [];
			var re = /<(nowiki|includeonly|syntaxhighlight|source|html|pre|code|score|timeline|hiero|math)\b(?! *\/>)[\s\S]*?<\/\1\s*>/gi;
			var m;
			while (m = re.exec(t))
			{
				delete m.input;
				this.nowikis.push(m);
			}
			for (var i = this.nowikis.length; i--; )
			{
				var placeholder = '<nowiki>' + i + '</nowiki>';
				t = t.slice(0, this.nowikis[i].index) + placeholder +
					t.slice(this.nowikis[i].index + this.nowikis[i][0].length);
				if (this.nowikis[i][1] === 'nowiki')
					this.nowikis[i][0] = this.nowikis[i][0].replace(/^<\w+\s*>\s*<\/\w+\s*>$/g, '<nowiki />');
				else if (this.nowikis[i][1] === 'source')
					this.nowikis[i][0] = this.nowikis[i][0].replace(/^(<)\w+|\w+\s*(?=>$)/g, '$1syntaxhighlight');
				this.nowikis[i][1] = placeholder;
				delete this.nowikis[i].index;
			}
			return t;
		},
		restoreNowikis: function(t)
		{
			for (var i = 0, len = this.nowikis.length, index = 0; i < len; i++)
			{
				index = t.indexOf(this.nowikis[i][1], index);
				if (index >= 0)
					t = t.slice(0, index) + this.nowikis[i][0] +
						t.slice(index + this.nowikis[i][1].length);
			}
			delete this.nowikis;
			return t;
		},
		backupFilenames: function(t)
		{
			/* Dateinamen retten incl. Vereinheitlichung als "Datei:" */
			this.files = [];
			/* Match <gallery> lines, [[File:Thumbnails]] and {{Template|Parameters.jpg}} */
			var re = /(\n|\[\[:?)\s*(Bild|Datei|File|Image) *: *([^\n[\]|]*?) *([\n\]|])|(\|(?:[^=[\]{|}]*=)?\s*)([^\n\/[\]{|}]*\.(?:gif|jpe?g|ogg|pdf|png|svg))(?=\s*[|\}])/gi;
			var m;
			while (m = re.exec(t))
			{
				if (m[6]) { m.index += m[5].length; m[0] = m[6]; }
				/* Einheitliche Schreibweise und Leerzeichenausgleich */
				m[1] = m[1] ? m[1] + (this.localisation === 'de' ? 'Datei' : this.localisation ? 'File' : m[2]) + ':' : '';
				/* Multiple underscores and spaces never have a meaning in filenames */
				m[2] = (m[3] || m[6]).replace(/(?:[ _\xA0]|%20|%5F|%C2%A0|&nbsp;)+/gi, ' ');
				m[3] = m[4] || '';
				this.files.push(m);
			}
			var r = '', p = 0;
			for (var i = 0; i < this.files.length; i++)
			{
				this.files[i][4] = this.files[i][6] ? '<file>' + i + '</file>' :
					this.files[i][1] + 'FILE' + i + this.files[i][3];
				r += t.slice(p, this.files[i].index) + this.files[i][4];
				p = this.files[i].index + this.files[i][0].length;
			}
			return p ? r + t.slice(p) : t;
		},
		restoreFilenames: function(t)
		{
			/* Gerettete Dateinamen wieder einsetzen */
			var r = '', p = 0;
			for (var index, i = 0; i < this.files.length; i++)
			{
				if ((index = t.indexOf(this.files[i][4], p)) < 0) continue;
				r += t.slice(p, index) + this.files[i][1] + this.files[i][2] + this.files[i][3];
				p = index + this.files[i][4].length;
				delete this.files[i];
			}
			if (p) t = r + t.slice(p);
			/* Fehlschläge nochmal versuchen, passiert bspw. bei umsortierten Galeriezeilen */
			for (var i = this.files.length; i--; )
			{
				if (this.files[i])
					t = t.replace(this.files[i][4], this.files[i][1] + this.files[i][2] + this.files[i][3]);
			}
			delete this.files;
			return t;
		}
	};

	/* mw.loader.using('user.options') notwendig? */
	if (typeof $ === 'function' && typeof mw === 'object' && mw.user.options.get('usebetatoolbar'))
	{
		mw.loader.using('ext.wikiEditor.toolbar', function()
		{
			$(document).ready(function()
			{
				$('#wpTextbox1').wikiEditor('addToToolbar', {
					'section': 'main',
					'group': 'format',
					'tools': {
						'autoFormatter': {
							'label': 'Auto-Format',
							'type': 'button',
							'icon': '//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Broom_icon.svg/22px-Broom_icon.svg.png',
							'action': {
								'type': 'callback',
								'execute': function() { return autoFormatter.click(this); }
							}
						}
					}
				});
			});
		});
	}
	else if (typeof $ === 'function' && typeof mw === 'object' && mw.user.options.get('showtoolbar'))
	{
		mw.loader.using('mediawiki.action.edit', function()
		{
			mw.toolbar.addButton('//upload.wikimedia.org/wikipedia/commons/2/2e/Button_broom.png',
				'Auto-Format', '', '', '', 'mw-customeditbutton-autoFormatter');
			$(document).ready(function()
			{
				$('#mw-customeditbutton-autoFormatter').click(function() { return autoFormatter.click(this); });
			});
		});
	}
	else if (typeof hookEvent === 'function')
	{
		hookEvent('load', function()
		{
			/* Notfalls als Link unter dem Bearbeitungsfenster */
			var e = document.getElementById('editform');
			if (!e) return;
			e = e.getElementsByTagName('SPAN');
			for (var i = e.length; i--; )
				if (e[i].className === 'editHelp')
				{
					var a = document.createElement('A');
					a.href = '#';
					a.onclick = function() { return autoFormatter.click(this); };
					a.appendChild(document.createTextNode('Auto-Format'));
					e[i].appendChild(document.createTextNode(' | '));
					e[i].appendChild(a);
					break;
				}
		});
	}
})(jQuery, mediaWiki);