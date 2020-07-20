//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true curly:false smarttabs:true laxbreak:true laxcomma:true */
/*global mediaWiki */

// Development Notes:
// This is a placeholder. It provides the basic functionality I want but it's basically just a
// "I needed to get this done" version. That means it isn't very good, it has zero flexibility.

if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
jQuery(function($) {
	"use strict";
	var $desc = $('#wpUploadDescription');
	if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
	$desc.val(
		  '{{Information\n'
		+ '|description = \n'
		+ '|featuring   = \n'
		+ '|alterations = \n'
		+ '|source      = <!-- DeviantArt Permalink or other URL -->\n'
		+ '|alternatives = \n'
		+ '|related     = \n'
		+ '|notes       = \n'
		+ '|issues      = \n'
		+ '}}'
	);
});
}

// The wpForReUpload test is attempting to reimplement the PHP boolean type-cast
// Boolean is [from string]: empty string, "0" = false, anything else = true
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'Upload') {
if (!(/(?:^\?|&)wpForReUpload=(?:[^0&]|0[^&])/).test(window.location.search)) {
jQuery(function($) {
	"use strict";
	var $description = $('#wpUploadDescription')
	  , $submit = $('input[type="submit"][name="wpUpload"]')
	  , $form = $description.closest('form')
	  , $descriptionRow = $description.closest('tr')
	  , mw = mediaWiki
	  , customRows = ''
	  , $customRows
	  ;

	// TODO: load jquery.mustache and figure out how to use it
	// TODO: Design a form builder syntax and pull this from a MediaWiki page instead of hard coding
	function fromTemplate(id, name, required, placeholder, elem) {
		elem = elem || '<textarea rows="3" cols="80" id="' + id + (required ? '" required="required' : '') + (placeholder ? '" placeholder="' + placeholder : '') + '"></textarea>';
		return '<tr>\n'
			+ '<td class="mw-label"><label for="' + id + (placeholder ? '" title="' + placeholder : '') + '">' + name + ':</label></td>\n'
			+ '<td class="mw-input">' + elem + '</td>\n'
			+ '</tr>\n'
			;
	}
	function fromTextTemplate(id, name, required, placeholder) {
		return fromTemplate(id, name, required, placeholder, '<input size="80" id="' + id + (required ? '" required="required' : '') + (placeholder ? '" placeholder="' + placeholder : '') + '">');
	}

	customRows += fromTemplate('sdwDescription', 'Image Description', true, 'Describe what is happening and why it\'s important');
	customRows += fromTemplate('sdwAlterations', 'Alterations', false, '[OPTIONAL] If you have altered this image, describe and list what you did. [Cropping does not count]');
	customRows += fromTextTemplate('sdwSource', 'Source', true, 'Where this is from, either a Slightly Damned comic number or a website URL');
	customRows += fromTemplate('sdwFeaturing', 'Featuring', false, '[OPTIONAL] A semi-colon list of characters, objects and places in the image, e.g. &quot;Rhea Snaketail; Buwaro Elexion; Thadius; Kieri Suizahn; St. Curtis&quot;. Try to use left-&gt;right order.');
	customRows += fromTemplate('sdwNotes', 'Annotations', false, '[OPTIONAL] Use this space to write anything else you think is important');
	//customRows += fromTemplate('sdwRelated', 'Related', false, 'If this image is part of a set then you can list the related images here');
	//customRows += fromTemplate('sdwAlternatives', 'Alternatives', false, 'If there are multiple version of this file then you can list the other versions here');

	// To real DOM
	$customRows = $(customRows);

	// Helper function for creating throttled/debounced functions
	function makeThrottled(f, delay, flags) {
		var params, that, counter = 0;
		flags = (flags && (flags + '').split(/\s+/)) || [];
		// Valid combinations table
		// start | trail | debounce |
		//   F   |   X   |    F     = fires at the end of every interval
		//   F   |   X   |    T     = blocks until calls stop then fires once in last interval only
		//   T   |   F   |    F     = fires immediately then at every interval after additional calls
		//   T   |   T   |    F     = fires immediately then blocks additional calls for 1 interval
		//   T   |   X   |    T     = fires immediately only, then blocks until calls stop
		flags = {
			atStart: $.inArray('start', flags) !== -1,
			noTrail: $.inArray('noTrail', flags) !== -1,
			debounce: $.inArray('debounce', flags) !== -1
		};
		// Canonicalise noTrail to false in !atStart
		flags.noTrail = flags.noTrail && flags.atStart;
		// counter must remain >= 0. counter must never become < 1 whilst timeout
		// is active. Rescheduling happens if counter is >= 2 since that means an
		// additional call to the base function was made during the interval.
		function callback() {
			var t = that,
			    p = params,
			    run = false,
			    resched = (counter !== 1); // equiv to > 1
			if (flags.debounce) {
				// Debounce executes at end of last interval, last interval is
				// when there were no additional calls during the interval.
				// (Except in atStart mode, since the call was already made)
				run = !resched && !flags.atStart;
			} else {
				// In at end mode, we run every time and reschedule if there were
				// additional calls.
				// In atStart mode, we run if there were additional calls during
				// the interval, unless noTrail is active then we just block calls for
				// one interval and terminate to allow the base function to make
				// the call the next time it's called.
				run = !flags.atStart || (resched && !flags.noTrail);
				resched = resched && !flags.noTrail;
			}
			if (resched) {
				counter = 1;
				window.setTimeout(callback, delay);
			} else {
				counter = 0;
				that = params = null;
			}
			if (run) {
				f.apply(t, p);
			}
		}

		return function() {
			that = this;
			params = arguments;
			if (++counter !== 1) return;

			window.setTimeout(callback, delay);
			if (flags.atStart) {
				f.apply(this, arguments);
			}
		};
	}
	// The source row needs an additional analysis space plus the verifier logic
	function parseSource(str) {
		// Either all numbers or URL
		var ret = false, m;
		str = $.trim(str);
		if ((m = (/^(?:SD)?(\d+)$/i).exec(str))) {
			ret = { type: 'SDComic', val: +m[1] };
		} else if((m = (/^SoT(\d+)$/i).exec(str))) {
			ret = { type: 'SoTComic', val: +m[1] };
		} else if ((/^[A-Za-z\.+\-]+:\/\//).test(str)) {
			ret = { type: 'URL', val: str };
			// Strip garbage from the end of DeviantArt Permalinks
			m = (/^[^:]+:\/\/.*?\.deviantart\.com\/art\/[^\?]+/i).exec(str);
			if (m) ret.val = m[0];
		}
		return ret;
	}
	$customRows.find('#sdwSource')
		.after('<div id="sdwSourceAnalysis" style="position:relative; overflow:hidden">' +
			'<span class="error" style="font-family: Open Sans, \'Segoe UI\', Helvetica, sans-serif">No source specified (Use "SD123", "SoT16" or paste an URL)</span></div>')
		.on('keyup.CustomUpload.Verify', makeThrottled(function() {
			// NOTE: Change events on Text Inputs only fire when it loses focus
			var $this = $(this), val = $.trim($this.val()), prevVal = $this.data('prevVal');
			if (val === prevVal) return;
			var out = $('#sdwSourceAnalysis'), source = parseSource(val), disabled = false;
			if (({SDComic:1, SoTComic:1})[source.type] === 1) {
				if (out.startThrobbing) out.startThrobbing();
				$.ajax({
					url: mw.util.wikiScript('api'),
					data: {
						action: 'parse',
						prop: 'text',
						text: '{{' + source.type + '|' + source.val + '}}',
						format: 'json'
					},
					dataType: 'json'
				}).done(function(json) {
					out.html(json.parse.text['*']);
					// Technically pointless, the throbber child DIV is killed by the above line anyway
					if (out.stopThrobbing) out.stopThrobbing();
				});
			} else if (source.type === 'URL') {
				out.empty().append($(document.createElement('a')).prop('href', source.val).text(source.val));
			} else {
				out.html('<span class="error" style="font-family: Open Sans, \'Segoe UI\', Helvetica, sans-serif">' + (val.length ? 'Invalid source' : 'No source specified') + '<br>'
					+ 'Try: "SD123", "SoT16" or "http://raizy.deviantart.com/art/image"</span>');
				disabled = true;
			}
			$submit.prop('disabled', disabled);
			$this.data('prevVal', val);
		}, 333, 'debounce'))
		;

	// Code to flatten the form into the information template
	function flattenForm(force) {
		// NOTE: Pipe characters need to be converted to {{!}}
		var src = parseSource($customRows.find('#sdwSource').val());
		if (!force) {
			if (!src) {
				window.alert('You haven\'t enterred a valid source. Please enter the comic number or the URL.');
				return false;
			} else if (!$.trim($customRows.find('#sdwDescription').val()).length) {
				if (!window.confirm('You haven\'t entered a description, are you sure you want to submit this?')) {
					return false;
				}
			}
		} else if (force && !src) {
			src = { type: 'URL', val: $.trim($customRows.find('#sdwSource').val()) };
		}
		var srcRow = 'source', subtempl = '';
		if (src.type !== 'URL') {
			subtempl = '/' + ({SDComic: 'SD', SoTComic: 'SoT'})[src.type];
			srcRow = 'comic ';
		}
		var templ = '{{Information' + subtempl + '\n'
			+ '|description = ' + $.trim($customRows.find('#sdwDescription').val()) + '\n'
			+ '|featuring   = ' + $.trim($customRows.find('#sdwFeaturing').val()) + '\n'
			+ '|alterations = ' + $.trim($customRows.find('#sdwAlterations').val()) + '\n'
			+ '|' + srcRow + '      = ' + src.val + '\n'
			+ '|alternatives = \n'
			+ '|related     = \n'
			+ '|notes       = ' + $.trim($customRows.find('#sdwNotes').val()) + '\n'
			+ '|issues      = \n'
			+ '}}'
			;
		$description.val(templ);
		return true;
	}
	function dismissForm() {
		flattenForm(true);
		$customRows.detach();
		$descriptionRow.show();
		$('#sdwFlattenForm').text('Restore Form (Cancels manual edit)').off('click').click(function(evt) {
			evt.preventDefault();
			restoreForm();
		});
		$form.off('.CustomUpload');
		$submit.prop('disabled', false);
		$('.special-upload-no-javascript-instructions').show();
		// Unknown glitch fix
		$description.prop('disabled', false);
	}
	function restoreForm() {
		$descriptionRow.hide().after($customRows);
		$form.on('submit.CustomUpload', onFormSubmit);
		$submit.prop('disabled', !parseSource($customRows.find('#sdwSource').val()));
		$('#sdwFlattenForm').text('Flatten Form').off('click').click(function(evt) {
			evt.preventDefault();
			dismissForm();
		});
		$('.special-upload-no-javascript-instructions').hide();
	}

	// Attach the flatten button to the form
	$submit.after(
	'<button id="sdwPreviewForm" style="margin-left: 1ex" class="secondary" type="button">Preview</button> ' +
	'<button id="sdwFlattenForm" style="margin-left: 5ex" class="secondary" type="button">Flatten Form</button>'
	);

	// Attach the submit handler
	function onFormSubmit() {
		/*jshint validthis:true */
		if (!$('#wpLicense').val()) {
			window.alert(
				'You haven\'t selected the Copyright license. You must only upload files that you are legally permitted to.\n\n' +
				'If this is an unmodified comic panel or DeviantArt image then the correct license is probably "CC-BY-NC-ND".\n' +
				'If you have modified it in any way other than cropping the surrounding panels away then you should select "Fairuse".\n'
			);
			return false;
		}
		if (!flattenForm()) return false;
		$customRows.remove();
		$descriptionRow.fadeIn();
		$(this).off('.CustomUpload');
	}
	function onPreview() {
		var $modal = $.showModal(
			'Form Preview',
			'<div style="overflow: auto; border: 1px inset; min-height: 5em; padding: 10px">' +
			'<div class="WikiaArticle" style="box-shadow: none; border: 0">' + // Admin dashboard adds crap to WikiaArticle
			'<div class="wikiaThrobber"></div>' +
			'</div>',
			{ width: 'auto' } // Default is $('#WikiaMainContent').width()
		);
		var $content = $modal.find('.modalContent .WikiaArticle');
		$content.parent().css({
			maxHeight: $(window).height() * 0.75,
			paddingRight: (function($, d) { // Leave room for scroll bar to avoid causing horizontal scroll because of it
				var $x = $('<div style="width:100px;height:100px;overflow:scroll;position:relative">' +
					'<div style="position:absolute;top:0;right:0;bottom:0;left:0"></div>' +
					'</div>')
				.appendTo(d.body);
				var w = (100 - $x.children().width()) + 'px';
				$x.remove();
				return w;
			})($, document)
		});
		if ($descriptionRow.is(':hidden')) { // Only flatten in guided form mode, otherwise corruption
			flattenForm(true);
		}
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'parse',
				prop: 'text',
				// Ripped from includes/specials/SpecialUpload.php
				// We aren't doing the no license=no headings at all check though.
				text: '== {{int:filedesc}} ==\n' +
					$description.val() +
					'\n== {{int:license-header}} ==\n' +
					'{{' + ($('#wpLicense').val() || 'No license') + '}}\n' +
					'__NOEDITSECTION__'
			},
			dataType: 'json',
			type: 'POST'
		})
		.done(function(json) {
			$content.html(json.parse.text['*']);
		})
		.fail(function(xhr, status, err) {
			$content.empty().append('<p class="error">Server Error: ' + xhr.status + ' ' + err + ' (' + status + ')</p>');
		});
		return false;
	}
	$('#sdwPreviewForm').click(onPreview);

	// Default state
	// Don't run on an error page since we can't parse the info template back in.
	//if ($('input[name="wpDestFileWarningAck"]').val()) return;
	if ($description.val()) {
		customRows = $description.val();
		dismissForm();
		$('#sdwFlattenForm').text('Reset Form (Start Over)');
		$description.val(customRows);
		customRows = null;
	} else {
		restoreForm();
	}
});
} else {
	jQuery('.special-upload-no-javascript-instructions').hide();
}
}

// </syntaxhighlight>