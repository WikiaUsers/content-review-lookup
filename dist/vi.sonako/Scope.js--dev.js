/*global WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Find and Replace 3.0 Alpine
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
(function (w, $) {
	//Base for functions
	var Scope = {
		version: "3.69.1 Alpine",
		lib: [
				{ name: 'Dialog', url: '/index.php?title=Mediawiki:Dialog.js&action=raw&ctype=text/javascript&maxage=0&smaxage=0' },
				{ name: 'Bootstrap', url: '/index.php?title=MediaWiki:Bootstrap.js&action=raw&ctype=text/javascript&maxage=0&smaxage=0' },
				{ name: 'Rangy', url: '/index.php?title=MediaWiki:Textinputs_jquery.js&action=raw&ctype=text/javascript&maxage=0&smaxage=0' }
			]
	};
 
	//Meta Vars
	var scfind, sctxt, matches = [], hmatches = [], nTrav = 0, sch = -1;
 
	/* Logs stuff */
	var log = (w.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope:');
		return w.console.log.apply(w.console, args);
	}) || $.noop;
 
	/* Load libraries first */
	function load () {
		var lib = [];

		for (var i = 0; i < Scope.lib.length; i++) {
			log('loading ', Scope.lib[i].name, '...');
			lib.push(Scope.lib[i].url);
		}

		mw.loader.implement('Scope.lib', lib, {}, {});
		mw.loader.using(['Scope.lib'], editor);
	}
 
	/* Check if editor has loaded after libraries have */
	function editor () {
		log('doc');
		if (w.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') setup();
			else if(RTE.getInstance().mode === 'wysiwyg') hide();
			else log('Cannot detect editor');
		} else if (w.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', hide);
				RTE.getInstance().on('sourceModeReady', setup);
			});
		} else if (w.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') setup();
				else hide();
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', setup);
			else log('Cannot detect editor');
		} else log('Cannot detect editor');
	}
 
	/* Load script */
	function setup () {
		log('Editor Loaded');
		sctxt = WikiaEditor.getInstance().getEditbox();
		if (!$('#sc-start').length) $('span.cke_toolbar_expand').before('<img title="Scope" id="sc-start" src="https://vignette.wikia.nocookie.net/sonako/images/7/71/Replace.png/revision/latest?cb=20170616144638"/>');
		$('#sc-start').click(show);
		log('Loaded: Scope', Scope.version);
	}
 
	/* Opens and sets up gui */
	function show () {
		log('opening dialog');
		if (!$('#sc-ui').length) {
			$('span.cke_toolbar_expand').after(Scope.dialog);
			$('#sc-replace-button').click(replace);
			$('#sc-rall-button').click(function () {
				replace(true);
			});
			$('#sc-down').click(next);
			$('#sc-cog').dropdown();
			$('#sc-find-text, #sc-replace-text').keydown(function (e) {
				if(e.which === 13) {
					e.preventDefault();
					replace(true);
				}
			});
			scfind = $('#sc-find-text');
			$('#sc-cs, #sc-reg, #sc-ww').click(function (e) {
				e.preventDefault();
				if($(this).hasClass('scactive')) $(this).removeClass('scactive');
				else $(this).addClass('scactive');
				synch();
			});
			$('#sc-find-text, #sc-cs').on('keyup paste click', synch);
			sctxt.on('keyup paste click', synch).scroll(function () {
				$('#sc-shadow').scrollTop(sctxt.scrollTop());
			});
			$('#sc-find-text').val(sctxt.getSelection().text).focus();
			var cCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			sctxt.css({position: 'relative', zIndex: '1', backgroundColor: 'transparent'}).after('<div id="sc-shadow"></div>');
			$('#sc-shadow').css(cCSS).css({'font-size': sctxt.css('font-size'), height:sctxt.height(), 'line-height': sctxt.css("line-height")});
			sctxt.css(cCSS);
			synch();
		} else hide();
	}
 
	/* Hides gui */
	function hide () {
		var height = sctxt.css('height');
		$('#sc-shadow, #sc-ui').remove();
		sctxt.removeAttr('style').css({height:height});
	}
 
	/* Evaluates the regex to be used */
	function evaluate (rall, shadow) {
		var mod = rall ? 'g' : '', ww = false;
		if (!$('#sc-cs').hasClass('scactive')) mod += 'i';
		if ($('#sc-ww').hasClass('scactive')) ww = true;
		if ($('#sc-reg').hasClass('scactive')) {
			return shadow ? {'mod': mod, 'reg': scfind.val()} : new RegExp(scfind.val(), mod);
		} else {
			//escaping: courtesy of http://stackoverflow.com/questions/3446170/
			var regex = scfind.val().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			if (ww) regex = "\\b" + regex + "\\b";
			return shadow ? {'mod': mod, 'reg': regex} : new RegExp(regex, mod);
		}
	}
 
	/* Does the replace */
	function replace (rall) {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = sctxt.val();
		if (scfind.val() === '') return;
		if (rall === true) {
			var count, ctest = s.match(evaluate(true)).length, plural;
			count = ctest === 1 ? "One" : ctest;
			plural = count === "One" ? "" : "s";
			sctxt.val(s.replace(evaluate(true), rtxt));
			synch();
			$("#sc-count").html('Done!').attr('title', count + ' replacement'+ plural +' made!');
		} else {
			var sel = sctxt.getSelection(), reg = evaluate();
			if (sel.text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else if (reg.test(s.substring(sel.start, sel.end))) sctxt.val(s.substring(0, sel.start) + rtxt + s.substring(sel.end));
			next();
			synch();
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="https://vignette.wikia.nocookie.net/sonako/images/8/8b/Undo.png/revision/latest?cb=20170616144641"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			synch();
			$("#sc-count").html('Undone!').attr('title', '');
		});
	}

	/*** START SHADOW ***/
 
	var T_TEXT = 1, T_ENTITY = 2;
	
	function tokenize (text) {
		var start = 0, tokens = text.split(/([<&>])/);

		var ENTITIES = {
			'<': '&lt;', '&': '&amp;', '>': '&gt;'
		};

		for (var t, i = 0; i < tokens.length; i++) {
			t = tokens[i];
			tokens[i] = {
				text: t,
				type: T_TEXT,
				start: start,
				length: t.length
			};
			start += t.length;
			if (t.length === 1 && ENTITIES[t]) {
				tokens[i].type = T_ENTITY;
				tokens[i].alt  = ENTITIES[t];
			}
		}
		return tokens;
	}
	
	function render (tokens) {
		var out = '';
		for (var t, i = 0; i < tokens.length; i++) {
			t = tokens[i];
			if (t.type === T_TEXT) {
				out += t.text;
			} else if (t.type === T_ENTITY) {
				out += t.alt;
			}
		}
		return out;
	}
	
	function synch () {
		var s = render(tokenize(sctxt.val())),
			hs = sctxt.val(),
			regex,
			hregex,
			m,
			n,
			postfix = { "\r":1,"\n":1 }[s[s.length - 1]] ?  '&nbsp;' : '';

		if (scfind.val() === '') regex = null;
		else {
			var r = evaluate(true, true);
			regex = new RegExp(render(tokenize(r.reg)), r.mod);
			hregex = new RegExp(r.reg, r.mod);
		}
		matches = [];
		hmatches = [];

		if (regex instanceof RegExp) {
			while ((m = regex.exec(s))) matches.push({'index':m.index, 'phrase':m[0]});
			while ((n = hregex.exec(hs))) hmatches.push({'index': n.index, 'phrase':n[0]});

			var countxt = matches.length === 1 ? " match" : " matches";
			$('#sc-count').html(matches.length + countxt);
			log(matches);
		} else $('#sc-count').html('&nbsp;');

		if (matches.length) $('#sc-down').css({cursor: 'pointer'});
		else $('#sc-down').css({cursor: 'default'});

		$('#sc-shadow').css('height', sctxt.height()); 
		$('#sc-shadow').css('width', sctxt.width());

		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i].index - start);
				start = matches[i].index + matches[i].phrase.length;
				r += '<span id="sc' + i + '"class="sc-match">' + matches[i].phrase + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return (r.length ? r : s)  + postfix;
		});
	}
 
	//Highlight a certain match
	function highlight (h) {
		sctxt.setSelection(hmatches[h].index, hmatches[h].index + hmatches[h].phrase.length);
		$('#sc' + sch).removeAttr('style');
		$('#sc' + h).css({backgroundColor:'#0000FF'});
		sch = h;
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of '  + matches.length).attr('title', '');
	}

	//Highlights next match
	function next () {
		log(nTrav);
		if (!hmatches.length) {
			$('#sc-count').html('No matches found').attr('title', '');
			return;
		}
		sctxt.focus();
		var n = 0, sel = sctxt.getSelection();
		if (!sel || sel.end >= sctxt.val().length) {
			sctxt.setSelection(0, 0);
			sel = sctxt.getSelection();
		}
		for (var i = 0; i < hmatches.length; i++) {
			if (sel.end < hmatches[i].index + hmatches[i].phrase.length) {
				n = i;
				break;
			}
		}
		highlight(n);
	}
 
	//Load on edit
	if (({edit:1, submit:1})[mw.config.get('wgAction')] === 1) $(load);
 
	//Expose to the world
	w.Scope = Scope;
}(window, jQuery));