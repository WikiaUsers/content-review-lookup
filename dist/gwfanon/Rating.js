// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint smarttabs:true laxbreak:true jquery:true browser:true bitwise:false devel:true */
/*global mediaWiki */

window.dev = window.dev || {};
/*global dev */
dev.StarRatings = dev.StarRatings || {};
dev.StarRatings.ui = dev.StarRatings.ui || {};

// importArticles wrapper that returns a promise
dev.StarRatings.load = function(what) {
	"use strict";
	return jQuery.ajax({
		url: mediaWiki.config.get('wgLoadScript'),
		data: {
			mode: 'articles',
			only: 'scripts',
			articles: (jQuery.isArray(what) ? what.join('|') : what)
		},
		dataType: 'script',
		cache: true
	});
};

// Data Model
// Represents a known and active Poll data source
(function(window, $, mw, module) {
	"use strict";
	var STORE_KEY = 'StarRatingsPoll'/*,
	    onStorageChanged = $.Callbacks()*/;
	// Storage tracking to keep this in-sync across tabs
	// DISABLED: This will keep poll object instances alive indefinitely due to the
	//	lack of useful features like weak references in JS. If we're going to keep
	//	alive forever then we may as well singleton-ise all of the instances which
	//	I don't want to do for cache management/complexity reasons.
	/*$(window).on('storage', function(ev) {
		if (ev.originalEvent.key !== STORE_KEY) { return; }
		onStorageChanged.fire(ev.originalEvent);
	});*/
	// Convert fetched data to a cooked poll object.
	function Poll(raw) {
		this.onUpdate = $.Callbacks();
		this._data = cookPollData(raw);
		this.NUM_ITEMS = this._data.votes.length;
		this.LAST_ITEM = this.NUM_ITEMS - 1;
		this._ajaxParams = {
			title: mw.config.get('wgPageName'),
			action: 'ajax',
			rs: 'axAjaxPollSubmit',
			wpPollId: this._data.pollId,
			wpVote: 'Vote!'
		};
		this._userVote = null;
		this._readStorage();
		//onStorageChanged.add($.proxy(this._readStorage, this));
	}
	module.Poll = Poll;
	//
	// Class definition
	//
	Poll.prototype = {
		constructor: Poll,

		_readStorage: function() {
			try {
				var store = JSON.parse(window.localStorage.getItem(STORE_KEY));
				this._userVote = store[this._data.pollId] || null;
			} catch(e) {}
		},
		// Submit a vote on the users behalf.
		// which is the item number.
		submit: function(which) {
			which = which | 0;
			if (!(which > -1 && which < this._data.votes.length)) {
				throw new RangeError('value out of range');
			}
			// Select the option that was chosen and post it
			this._ajaxParams['wpPollRadio' + this._ajaxParams.wpPollId] = which + 2;
			var me = this;
			return $.ajax({
				url: mw.config.get('wgScript'),
				data: this._ajaxParams,
				type: 'POST',
				dataType: 'json'
			})
			.done(function(json) {
				me._userVote = which;
				// Update the store
				try {
					var store = JSON.parse(window.localStorage.getItem(STORE_KEY) || '{}');
					store[me._data.pollId] = which;
					window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
				} catch(e) {}
				// Update our stats
				var data = {
					votes: [],
					items: me._data.items,
					pollName: me._data.pollName,
					pollId: me._data.pollId
				};
				// WARN: The for will only set values to items which have >0 votes
				for (var x in json.votes) {
					if (json.votes.hasOwnProperty(x)) {
						data.votes[x - 2] = json.votes[x].value;
					}
				}
				me._data = cookPollData(data);
				me.onUpdate.fire(me);
			});
		},
		// Update this poll by requerying the server
		// NOTE: This only works on polls created directly via APIs,
		//	polls created via createFromTag may or may not work depending on
		//	the use of whitespace inside the original poll tag wikitext.
		refresh: function() {
			var me = this;
			this._readStorage();
			return createFromDescriptors([{ name: this._data.pollName, items: this._data.items }])
			.done(function(raw) {
				me._data = cookPollData(raw[0]);
				me.onUpdate.fire(me);
			});
		},
		// Returns the user's current vote in this poll
		// May be a number corresponding to an item index, or null if they haven't voted
		usersVote: function() {
			return this._userVote;
		},
		// Returns a copy of the array of names of items to vote on in the poll
		// Unless the poll was created via createFromTag or createCustom then this will
		// probably just be an array of number strings in array order ['0', '1', ...]
		items: function() {
			return this._data.items.slice();
		},
		// Returns a copy of the computed statistical values relating to this poll
		// i.e. mean, median and mode
		stats: function() {
			return {
				mean: this._data.mean,
				median: this._data.median,
				mode: this._data.mode.slice(),
				totalVotes: this._data.total
			};
		},
		// Drill down function to inspect data directly
		votes: function() {
			return this._data.votes.slice();
		},
		voteFractions: function() {
			return this._data.fracs.slice();
		},
		// Returns the poll's name (title/heading line value) [string]
		// Polls created by createFromPage will not be human readable as they're just
		// wgPageName + '#' + customName
		name: function() {
			return this._data.pollName;
		},
		// Returns a string holding the poll's associated MD5 ID hash value
		// This isn't particularly useful except as a wiki-wide universally unique ID for it
		idHash: function() {
			return this._data.pollId;
		},
		// If this poll was created from a page instead of being custom then this can be used
		// to extract the wgPageName component of the name. [String]
		// Useless or nonsensical for polls that are not page polls.
		associatedPageName: function() {
			var r = /^([^#]+).*/.exec(this._data.pollName);
			return (r && r[0]) || '';
		},
		pagePollName: function() {
			var r = /^[^#]+#(.*)/.exec(this._data.pollName);
			return (r && r[0]) || '';
		}
	};
	//
	// Static functions
	//
	// Converts raw poll data into something actually useful by eliminating quirks
	// It also produces mean, median and mode averages.
	// raw format: {
	//   votes: [],
	//   items: [],
	//   pollName: string,
	//   pollId: 'hash'
	// }
	function cookPollData(raw) {
		var cooked = {
			pollName: raw.pollName,
			pollId: raw.pollId,
			total: 0,
			votes: [],
			fracs: [],
			items: [],
			mode: [],
			mean: 0,
			median: 0
		};
		// Fix the data, the raw polls start from 2 instead of something normal like 0 or 1
		var i = 0, len = raw.items.length, sum = 0, modeCnt = 1;
		for ( ; i < len ; ++i) {
			cooked.votes[i] = +raw.votes[i] || 0; // may be undefined
			cooked.items[i] = raw.items[i];
			cooked.total += cooked.votes[i];
			// Mean
			sum += i * cooked.votes[i];
			// Mode
			if (cooked.votes[i] === modeCnt) {
				cooked.mode.push(i);
			} else if (cooked.votes[i] > modeCnt) {
				cooked.mode = [i];
				modeCnt = cooked.votes[i];
			}
		}
		cooked.mean = sum / cooked.total || 0; // NaN if 0 votes

		// Median
		// We also need the total to calculate the fractionals, so do that in the second pass
		// as well
		var middle = (cooked.total / 2) | 0,
		    middle2 = (cooked.total & 1) ? middle : middle + 1,
		    m1,
		    m2;
		for (i = 0, sum = 0 ; i < len ; ++i) {
			cooked.fracs[i] = cooked.votes[i] / cooked.total || 0;
			sum += cooked.votes[i];
			if (m1 === void 0 && sum >= middle) {
				m1 = i;
			}
			if (m2 === void 0 && sum >= middle2) {
				m2 = i;
			}
		}
		cooked.median = (m1 + m2) / 2 || 0;
		return cooked;
	}
	Poll.cookPollData = cookPollData;
	// Create a poll instance from the HTML code generated from a poll tag by MediaWiki
	function createFromTag($this) {
		var $poll = $this.find('form').eq(0);
		if (!$poll.length) {
			throw new Error('Invalid poll tag html');
		}

		// Parse the poll for the values we need
		// NOTE: span.total is controlled by a MediaWiki message so we can't rely on it
		var raw = {
			votes: [],
			items: [],
			// IMPORTANT: Whitespace IS significant but this does not include it properly
			//   so it's too inaccurate to reproduce the poll. The trim is necessary due
			//   to added whitespace from the poll template.
			pollName: $.trim($poll.find('.header').eq(0).text()),
			pollId: $poll.find('input[name="wpPollId"]').val()
		};
		$poll.find('.pollAnswer > .pollAnswerVotes > span').each(function() {
			var $this = $(this),
			    ansNum = +this.id.substr(this.id.lastIndexOf('-') + 1) - 2;
			// NOTE: This is NOT localised, it's the raw integer.
			raw.votes[ansNum] = $this.text();
			// Get the text for the hover message from the item title
			raw.items[ansNum] = $.trim($this.closest('.pollAnswer').find('.pollAnswerName > label').text());
		});
		return raw;
	}
	Poll.createFromTag = function($this) {
		return new Poll(createFromTag($this));
	};
	// Create a poll instance from the page name
	// All polls created this way have a fixed pattern so that they can be accessed by
	// just the page name. More than one poll can exist on the page if there is a pollName.
	// Polls are unique by their contents (between the poll tag open/close) so that needs to
	// be kept consistent for this to work.
	function describeFromPage(wgPageName, pollName) {
		wgPageName = wgPageName || mw.config.get('wgPageName');
		return describeFromRange(wgPageName + (pollName ? '#' + pollName : ''), 0, 11);
	}
	Poll.describeFromPage = describeFromPage;
	Poll.createFromPage = function(wgPageName, pollName) {
		return Poll.createFromDescriptors(describeFromPage(wgPageName, pollName));
	};
	function canonicaliseWikitext(text) {
		// Replace all '<' with &lt; and all '{' with &#123; to avoid templates and magic word
		// expansions. Newlines are semantic so we don't want any of those either.
		return (text + '').replace(/\n/g, '\\n').replace(/</g, '&lt;').replace(/\{/g, '&#123;');
	}
	// Create an arbitrary poll containing whatever you want.
	// Takes an array of descriptors of the form: {
	//    name: 'poll heading',
	//    items: ['poll', 'items']
	// }
	function createFromDescriptors(descriptors) {
		// Canonicalise descriptors (eliminate invalid characters like newlines)
		// and build the wikitext fragment we need in order to request from the server
		var pollWikitext = '', i = 0, len = descriptors.length, j, len2,
		    canonical = [], canon;
		for ( ; i < len ; ++i) {
			canonical[i] = canon = {
				items: [],
				name: canonicaliseWikitext(descriptors[i].name)
			};
			for (j = 0, len2 = descriptors[i].items.length ; j < len2 ; ++j) {
				canon.items[j] = canonicaliseWikitext(descriptors[i].items[j]);
			}
			pollWikitext += '<poll>\n' +
				canon.name + '\n' + // Title row
				canon.items.join('\n') + // Content rows
				'\n</poll>\n';
		}

		// Now that we have the canonical data, we need to post it
		// We do a GET if it's small, POST if it's big (URLs tend to be mishandled when too long)
		return $.ajax({
			url: mw.config.get('wgScriptPath') + '/api' + mw.config.get('wgScriptExtension'),
			data: {
				format: 'json',
				action: 'parse',
				prop: 'text',
				title: mw.config.get('wgPageName'),
				text: pollWikitext
			},
			type: pollWikitext.length < 400 ? 'GET' : 'POST' // Aiming for < 1000 (remember URL encoding will blow up size)
		}).then(function(json) {
			if (!json || !json.parse || !json.parse.text || !json.parse.text['*']) {
				return $.Deferred().reject('Server returned garbage', json);
			}
			var raws = [], raw,
			    $polls = $('<div>').html(json.parse.text['*']).find('.ajax-poll');
			for (var i = 0, len = $polls.length ; i < len ; ++i) {
				raw = createFromTag($polls.eq(i));
				raw.items = canonical[i].items;
				raw.pollName = canonical[i].name;
				raws[i] = raw;
			}
			return raws;
		});
	}
	Poll.createFromDescriptors = function(descriptors) {
		return createFromDescriptors($.isArray(descriptors) ? descriptors : [descriptors]).then(function(raws) {
			for (var i = 0, len = raws.length ; i < len ; ++i) {
				raws[i] = new Poll(raws[i]);
			}
			return $.isArray(descriptors) ? raws : raws[0];
		});
	};
	function describeFromRange(fullName, rangeStart, rangeEnd) {
		var s = rangeStart < rangeEnd ? rangeStart : rangeEnd,
		    e = rangeStart < rangeEnd ? rangeEnd : rangeStart,
		    arr = [];
		for (var i = 0 ; s < e ; ++i, ++s) {
			arr[i] = s;
		}
		return {
			name: fullName,
			items: arr
		};
	}
	Poll.describeFromRange = describeFromRange;
	Poll.createCustom = function(fullName, items, rangeEnd) {
		var descriptor;
		if (typeof(options) !== 'object') {
			descriptor = describeFromRange(fullName, +items || 0, +rangeEnd || 10);
		} else {
			if (!$.isArray(items)) {
				throw new Error('Invalid poll items');
			}
			descriptor = {
				name: fullName,
				items: items
			};
		}
		return Poll.createFromDescriptors(descriptor);
	};
})(window, jQuery, mediaWiki, dev.StarRatings);


// Simple UI module
// This is a debugging module that exists for testing purposes.
// It should not be used on an actual site (lacks robustness).
dev.StarRatings.ui.simple = function($this, callbacks/*, conf*/) {
	"use strict";
	var $stars = jQuery(new Array(12).join('<span class="rating-star" style="padding:0 0.5ex; font-weight:bold; cursor: pointer">\u2605</span>')),
	    $status = jQuery('<span class="rating-submit"></span>');
	$stars.eq(0).html('&#x1F44E;').css('fontFamily', '"Segoe UI", Emoji, sans-serif');
	$stars.each(function(index) {
		this.title = index + ' out of 10';
	});
	$this
	.append($stars, document.createTextNode(' '), $status)
	.css('display', 'inline-block')
	.on({
		mouseenter: function() {
			var target = $stars.index(this);
			$stars.slice(0, target + 1).css('color', 'red');
		},
		mouseleave: function resetColors() {
			$stars.each(function() {
				var $this = $(this);
				$this.css('color', $this.data('color'));
			});
		},
		click: function() {
			callbacks.submit($stars.index(this));
			$status.text('Submitting...');
		}
	}, '.rating-star');
	return {
		set: function(data) {
			console.log(data);
			var avg = Math.round(data.mean);
			$stars.each(function(index) {
				var col = index <= avg ? 'orange' : '';
				$(this).css('color', col).data('color', col);
			});
			$status.text('(' ' Głosów: '+ data.total + data.mean.toFixed(2) + ' średnio, najbardziej popularny: ' + (data.mode + '' || '?') + ')');
			return $this;
		},
		onAjaxFail: function() {
			$status.text('Failed. Server Error.');
		}
	};
};
// Pecoes' Star rating UI (Default)
dev.StarRatings.ui.pecoesSvg = function($this, callbacks) {
	"use strict";
	var $ = jQuery,
	    ui = {},
	    ready,
	    initialValueReady = $.Deferred();
	if (!$.fn.rateable) {
		ready = dev.StarRatings.load('w:dev:StarRatings/ui.js');
	}
	ui.set = initialValueReady.resolve;
	ui.onAjaxError = $.proxy($this.stopThrobbing, $this);
	$.when(ready, initialValueReady).done(function onReady(a, data) {
		function apply() {
			$this.rateable({
				votes: data.total,
				avg: data.mean,
				rating: data.userVote
			});
		}
		// TODO: Set images using configuration data
		$this.rateable({
			submit: function(val) {
				$this.startThrobbing();
				callbacks.submit(val);
			}
		})
		.on('mouseleave.StarRatings', apply) // Reset when mouse exits instead of sticking
		.find('.rateable-avg, .rateable-votes')
		.css('cursor', 'pointer')
		.click($.proxy(callbacks.showStats, callbacks));

		ui.set = function(newData) {
			data = newData;
			$this.stopThrobbing();
			apply();
		};
		apply();
	});
	return ui;
};
// Thumb version of the widget
// Modelled after Youtube like-bar
// TODO: Use images instead of text. Make width configurable.
// TODO: Mode switch to hide like-bar and just use counter, also offer to hide dislike counter
dev.StarRatings.ui.thumb = function($this, callbacks) {
	"use strict";
	// Image sprite: 2x2 grid (like, dislike columns; normal, hover states)
	var $ = jQuery,
	    $thumbDown = $('<span style="padding: 0 0.5ex; font-weight:bold; cursor:pointer; font-family: \'Segoe UI\', Emoji, sans-serif">&#x1F44E;</span>'),
	    $thumbUp = $thumbDown.clone().html('&#x1F44D;'),
	    $bar = $('<span style="display:inline-block; width: 10em; height: 5px; border-radius:1ex; overflow:hidden; vertical-align: middle"><span style="background-color:green; border-right:1px solid white; height: 100%; display: block; float: left"></span><span style="background-color:red; margin-right:-1px; height: 100%; display: block; float: left"></span></span>');
	$this
	.append($thumbUp, $bar, $thumbDown)
	.css('display', 'inline-block');
	$thumbUp
	.prop('title', 'Dislike')
	.click($.proxy(callbacks.submit, callbacks, 10))
	.mouseenter($.proxy($thumbDown.css, $thumbUp, 'color', '#0B0')).mouseleave($.proxy($thumbUp.css, $thumbUp, 'color', ''));
	$thumbDown
	.prop('title', 'Like')
	.click($.proxy(callbacks.submit, callbacks, 0))
	.mouseenter($.proxy($thumbDown.css, $thumbDown, 'color', 'red')).mouseleave($.proxy($thumbDown.css, $thumbDown, 'color', ''));
	return {
		set: function(data) {
			var total = data.votes[0] + data.votes[10];
			$bar.children()
			.first().css('width', (data.votes[10] / total * 100 || 0).toFixed(2) + '%').end()
			.last().css('width', (data.votes[0] / total * 100 || 0).toFixed(2) + '%');
			$thumbDown.html('&#x1F44E; ' + data.votes[0]);
			$thumbUp.html('&#x1F44D; ' + data.votes[10]);
		},
		onAjaxError: $.noop
	};
};

// Core module
// This code deals with the obtuse interfacing between the widget and the poll tag
// The actual UI is above, this is just the business logic grind.
(function(module, window, $, mw) {
	"use strict";

	var DEFAULT_UI = 'pecoesSvg',
	    POLL_REFRESH_INTERVAL = 30 * 60 * 1000;

	// Configuration canonicalise
	module.settings = $.extend({
		ui: DEFAULT_UI,
		templates: ['Template:StarRating']
	}, module.settings);
	if (!module.ui.hasOwnProperty(module.settings.ui)) {
		module.settings.ui = DEFAULT_UI;
	}

	// TODO: Custom special page (another .load())
	if (mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgTitle') === 'StarRatings') {
		//return module.load('w:dev:StarRatings/special.js');
	}

	// Shows the in-page UI for viewing the stats for the clicked poll
	function showStats(poll) {
		if (!module.showStats) {
			module.load('w:dev:StarRatings/stats.js').done(function() {
				showStats(poll);
			});
			return;
		}
		module.showStats(poll, true);
	}

	// Poll objects are singletons, there is one per identifying name
	// The nameless (empty string) is the "page poll", the one that will be
	// considered in the list-of-all-polls site analysis UI.
	var pagePolls = {}, refreshTimeouts = {};

	// Helper function for binding the UI modules to the poll object
	// This is split to reduce the depth of the closure, and for readability
	function bindUi($this, poll) {
		// The user can select different UI modules depending on the use case.
		// Generally only the default will be needed but other variants like
		// thumb up/down are possible
		var uiDesign = $this.data('ui');
		if (!uiDesign || !module.ui.hasOwnProperty(uiDesign)) {
			uiDesign = module.settings.ui;
		}
		var ui = module.ui[uiDesign](
			$this,
			{
				submit: function doSubmit(val) {
					poll.submit(val).fail($.proxy(ui.onAjaxFail, ui));
				},
				showStats: $.proxy(showStats, null, poll)
			},
			module.settings
		);
		var callback = function(poll) {
			var oldCooked = $.extend(poll.stats(), { votes: poll.votes(), fracs: poll.voteFractions(), userVote: poll.usersVote() });
			oldCooked.total = oldCooked.totalVotes;
			ui.set(oldCooked);

			// Reset the refresh interval on the poll since it was just refreshed
			var name = poll.pagePollName();
			window.clearInterval(refreshTimeouts[name]);
			refreshTimeouts[name] = window.setInterval($.proxy(poll.refresh, poll), POLL_REFRESH_INTERVAL);
		};
		callback(poll);
		poll.onUpdate.add(callback);
		$this.data('StarRatings', poll).trigger('StarRatingsInit', poll);
	}

	// Core function, find rating widgets and initialise them with UI instances.
	// Multiple UIs will share the same poll unless a custom name is offered.
	function processPolls() {
		var pollDfds = [], names = [];

		// Pass 1 build the poll
		// Iterate the widgets and create the appropriate poll instances for each
		// NOTE: Walls are excluded because wgPageName is inconsistent ('Message Wall:User', 'Thread:Number')
		$('#mw-content-text .star-ratings-poll-widget').not('#Wall *').each(function() {
			var $this = $(this), pollName = $this.data('vote-for') || '', dfd;
			if (!pagePolls.hasOwnProperty(pollName)) {
				names.push(pollName);
				pollDfds.push(dfd = pagePolls[pollName] = $.Deferred());
				dfd.done(function(poll) {
					refreshTimeouts[pollName] = window.setTimeout($.proxy(poll.refresh, poll), POLL_REFRESH_INTERVAL);
				});
			} else {
				dfd = pagePolls[pollName];
			}
			$.when(dfd).done(function(poll) {
				bindUi($this, poll);
				$this.show();
			});
		});

		// Pass 2 build descriptors for all the damn poll instances
		var polls = [], i = 0, len = names.length;
		for ( ; i < len ; ++i) {
			polls[i] = module.Poll.describeFromPage(null, names[i]);
		}

		// Pass 3 fetch and resolve
		module.Poll.createFromDescriptors(polls).done(function(polls) {
			for (var i = 0, len = polls.length ; i < len ; ++i) {
				pollDfds[i].resolve(pagePolls[names[i]] = polls[i]);
			}
		}).fail(function() {
			if (window.console) {
				window.console.error('STAR-RATINGS: Failed to initialise due to internal/network error', arguments);
			}
			for (var i = 0, len = polls.length ; i < len ; ++i) {
				pollDfds[i].reject();
				delete pagePolls[names[i]];
			}
		});
	}

	// Run on DOM ready
	$(processPolls);
	module.processPolls = processPolls;

	// If we're on an edit page then we'll hook the "AJAX Preview is ready" event that is
	// helpfully provided. This means that ratings widgets will work in previews like polls.
	if (mw.config.get('skin') === 'oasis' && mw.config.get('wgAction') === 'edit') {
		// NOTE: /extensions/wikia/EditPageLayout/js/plugins/PageControls.js
		$(window).on('EditPageAfterRenderPreview.StarRatings', processPolls);
	}
})(dev.StarRatings, window, jQuery, mediaWiki);

// </syntaxhighlight>