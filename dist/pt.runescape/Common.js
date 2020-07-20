(function (window, $, mw) {
	'use strict';

	var scripts = [],
		styles = [],
		mwConfig = mw.config.values,
		// for use with GED errors - See [[RuneScape:Exchange namespace]] for usage
		manualExchange = [],
		setCookie,
		getCookie,
		callAPI,
		addCommas;


	/**
	* Define uma cookie
	*/
	setCookie = window.setCookie = function(c_name, value, expiredays) {
		var options = {};

		if(expiredays)
			options.expires = expiredays;

		/*if(path)
			options.path = path;*/

		$.cookie(c_name, value, options);
	}

	/**
	* Obtém uma cookie
	*/
	getCookie = window.getCookie = function(c_name) {
		var cookie = $.cookie(c_name);
		return cookie === null ? '' : cookie;
	}


	/**
	* Collapses navboxes under certain conditions
	*/
	function navbox() {
		var expand = 'mostrar',
		navboxes = $('.navbox'),
		maxShow = 2,     // maximum number of navboxes before they all get collapsed
		maxHeight = 300, // maximum allowable height of navbox before it gets collapsed
		i;
 
		// @param elem - navbox to be collapsed
		function collapseNavbox(elem) {
			var rows, j, toggle;

			if($(elem).hasClass('mw-collapsed'))
				return;
 
			// add the collapsed class
			$(elem).addClass('mw-collapsed');
 
			// make sure we aren't selecting any nested navboxes
			rows = $(elem).children('tbody').children('tr');

			// rows[0] is the header
			for (j = 1; j < rows.length; j++)
				$(rows[j]).css({'display': 'none'});

			// toggle is always in header
			toggle = $(rows[0]).find('.mw-collapsible-toggle');
 
			// this class is required to make expand work properly
			$(toggle).addClass('mw-collapsible-toggle-collapsed');
			$(toggle).children('a').text(expand);
		}

		// collapse if more than maxShow
		if(navboxes.length > (maxShow - 1))
			for(i = 0; i < navboxes.length; i += 1)
				collapseNavbox(navboxes[i]);
 
		// collapse if taller than maxHeight
		for(i = 0; i < navboxes.length; i += 1)
			if($(navboxes[i]).height() > maxHeight)
				collapseNavbox(navboxes[i]);
	}

	/**
	* Autosort sortable tables
	*/
	function autosort() {
		$('table.sortable[class*="autosort="]').each(function() {
			var $this = $(this),
			matched = /(?:^| )autosort=([0-9]+),(a|d)(?: |$)/.exec($this.attr('class'));

			$this.tablesorter({
				sortList: [[matched[1] - 1, ((matched[2] === 'd') ? 1 : 0)]]
			});
		});
	}

	$(function() {
		/**
		* Imports
		*/
		if (mwConfig.wgAction === 'edit' || mwConfig.wgAction === 'submit') {
			scripts.push('MediaWiki:Common.js/standardeditsummaries.js'); // Standard edit summaries
		} else if (mwConfig.wgAction === 'view') {
			// Insert username / Inserir nome de utilizador (usado na predefinição USERNAME)
			if(mwConfig.wgUserName !== null)
				$('.insertusername').text(mwConfig.wgUserName);
		}

		if($('.countdown').length)
			scripts.push('MediaWiki:Common.js/countdowntimer.js'); // Countdown timer

		if($('.embedMe').length)
			scripts.push('MediaWiki:Common.js/embedding.js'); // Embed audio

		if($('.jcConfig').length) {
			scripts.push('MediaWiki:Common.js/calc.js'); // Dynamic Templates
			styles.push('MediaWiki:Common.css/calc.css');
		}
		
		if($('.eventos-embed').length)
			scripts.push('MediaWiki:Common.js/eventos.js'); // Embed events iframe
			
		if($('.topright-icon').length) {
			// insert container next to tally in pageheader
			$('<div>').attr('id', 'rs-header-icons').insertAfter($('.page-header__languages'));

			var $icons = $('#rs-header-icons');

			$('.topright-icon').each(function () {
				$icons.append($(this).html());
			});
		}

		mw.log(scripts, styles);

		// Large script imports
		window.importArticles({
			type: 'script',
			articles: scripts
		}, {
			type: 'style',
			articles: styles
		});

		/**
		 * Function invocations
		 * Run conditionals before invoking functions to improve pageload
		 */
		if(mwConfig.wgNamespaceNumber === 0 && $('.navbox').length)
			navbox(); // collapses navboxes under certain conditions

		if ($('.sortable').length)
			autosort(); // autosort tables

		/*
		 * Esconde resutado das enquetes antes do utilizador votar
		 */
		if($('.ajax-poll').length) {
			$('.pollAnswerVotes').hide();

			var cookieName = 'rs-poll',
				pollId = $('.ajax-poll').attr('id').split('-')[2];
	
			function showPoll() {
				if ($.cookie(cookieName) === pollId) {
					$('.pollAnswerVotes').show();
				}
			}

			$('.ajax-poll input[type="submit"]').click(function () {
				$.cookie(cookieName, pollId, {expires: 365});
				showPoll();
			});

			showPoll();
		}
	});
}(this, this.jQuery, this.mediaWiki));