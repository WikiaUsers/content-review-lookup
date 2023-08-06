/**
 * This is currently maintained by the admins of this wiki and Fandom.
 * Please request any changes on MediaWiki talk:Common.js
 * 
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 *
 * To see which scripts this has loaded, see `ftb.loaded` (from your js console)
 */
 
 /*jshint bitwise:true, browser:true, curly:true, devel:false, eqeqeq:true,
  forin:true, jquery:true, latedef:true, noarg:true, nonew:true,
	plusplus:false, undef:true, unused:true, strict:true
*/

mw.hook('wikipage.content').add(function(){
	'use strict';

	/**
	 * Versioning handler. Good for debugging.
	 */
	var ftb = { version: '1.1' };

	/**
	 * Cache mw.config values
	 *
	 * These are used in conditionals for checking various mediawiki settings
	 * For a full list of available variables see <https://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config>
	 */
	var conf = mw.config.get([
		'wgAction',
		'wgCanonicalSpecialPageName',
		'wgNamespaceNumber'
	]);

	/**
	 * Settings of each script run/imported
	 *
	 * This is where each script on the wiki is imported
	 * To import a new script see the example just below
	 *
	 * When adding new scripts, please keep them in alphabetical order
	 */
	var includes = {
		/*
		example: {
			// {function|boolean} Conditional to pass for exec to run
			// Can be something that evaluates to a boolean if required
			// If it should always load, set to true
			conditional: true,

			// {function} Function to run
			exec: function(){
				console.log('loaded');
			}
		}
		*/

		/**
		 * Lazy loading
		 */
		lazy: {
			conditional: function(){return $('.load-page').length;},
			exec: function(){
				$('.load-page-button > a').click(function(e){
					e.preventDefault();
					var button = $(this).parent(),
						body = button.closest('.load-page');
					$(this).html('Loading');
					new mw.Api().get({
						action: 'parse',
						prop: 'text',
						page: body.data('page')
					}).done(function(data){
						console.log('Loaded data!');
						body.html(data.parse.text['*']);
						mw.hook('wikipage.content').fire(body);
					}).fail(function(){
						console.log('Failed to load data!');
					});
					console.log('Firing request to load data!');
				});
			}
		},

		tooltips: {
			conditional: function(){return $('.minetip').length || $('.grid').length;},
			exec: function(){
				var tooltip,
					escapeChars = {
						'\\&': '&#38;',
						'<': '&#60;',
						'>': '&#62;'
					},
					escape = function(text){
						// '\' must be escaped first
						return text.replace(/\\\\/g, '&#92;')
							.replace(/\\&|[<>]/g, function(char){
								return escapeChars[char];
							});
					},
					win = $(window), winWidth, winHeight, width, height;
				$('#mw-content-text').on({
					'mouseenter.minetip': function(e){
						var elem = $(this),
							title = elem.attr('data-minetip-title');
						// No title or title only contains formatting codes
						if(title === undefined || title && title.replace(/&([0-9a-fl-or])|\s+/g, '') === ''){
							// Find deepest child title
							var childElem = elem[0], childTitle;
							do {
								if(childElem.hasAttribute('title')){
									childTitle = childElem.title;
								}
								childElem = childElem.firstChild;
							}while(childElem && childElem.nodeType === 1);
							if(childTitle === undefined){
								return;
							}
							// Append child title as title may contain formatting codes
							if(!title){
								title = '';
							}
							title += childTitle;
							// Set the retrieved title as data for future use
							elem.attr('data-minetip-title', title);
						}
						if(!elem.data('minetip-ready')){
							// Remove title attributes so the native tooltip doesn't get in the way
							elem.find('[title]').addBack().removeAttr('title');
							elem.data('minetip-ready', true);
						}
						if(title === ''){
							return;
						}
						// Apply normal escaping
						title = escape(title);
						var text = '<span class="minetip-title">' + title + '&r</span>';
						var description = elem.attr('data-minetip-text');
						if(description){
							// Apply normal escaping plus '/'
							description = escape(description).replace(/\\\//g, '&#47;');
							text += '<span class="minetip-description">' + description.replace(/\//g, '<br>') + '&r</span>';
						}
						// Add classes for minecraft formatting codes
						while(/&[0-9a-fl-o]/.test(text)){
							text = text.replace(/&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r');
						}
						// Add classes for blinking text
						while(/&z[0-9a-f]/.test(text)){
							text = text.replace(/&z([0-9a-f])(.*?)(&r|$)/g, '<span class="blink-$1">$2</span>&r');
						}
						// Remove reset formatting
						text = text.replace(/&r/g, '');
						// Unescape '&' so HTML entities work
						text = text.replace(/&#38;/g, '&');
						tooltip = $('#minetip-tooltip');
						if(!tooltip.length){
							tooltip = $('<div id="minetip-tooltip">').appendTo('body');
						}
						tooltip.html(text);
						// Cache current window and tooltip size
						winWidth = win.width();
						winHeight = win.height();
						width = tooltip.outerWidth(true);
						height = tooltip.outerHeight(true);
						// Trigger a mouse movement to position the tooltip
						elem.trigger('mousemove', e);
					},
					'mousemove.minetip': function(e, trigger){
						if(!$('#minetip-tooltip').length){
							$(this).trigger('mouseenter');
							return;
						}
						// Get event data from remote trigger
						e = trigger || e;
						// Get mouse position and add default offsets
						var top = e.clientY - 34,
							left = e.clientX + 14;
						// If going off the right of the screen, go to the left of the cursor
						if(left + width > winWidth){
							left -= width + 36;
						}
						// If now going off to the left of the screen, resort to going above the cursor
						if(left < 0){
							left = 0;
							top -= height - 22;
							// Go below the cursor if too high
							if(top < 0){
								top += height + 47;
							}
						// Don't go off the top of the screen
						}else if(top < 0){
							top = 0;
						// Don't go off the bottom of the screen
						}else if(top + height > winHeight){
							top = winHeight - height;
						}
						// Apply the positions
						tooltip.css({
							top: top,
							left: left
						});
					},
					'mouseleave.minetip': function(){
						if(!tooltip){
							return;
						}

						tooltip.remove();
					}
				}, '.minetip, .grid');
			}
		},

		/**
		 * Grid tank container handler
		 */
		gridTank: {
			conditional: function(){return $('.gridTankContainer').length;},
			exec: function(){
				$('.gridTankContainer').each(function(){
					var max = $(this).data('tank-max') || 10000;
					$(this).children('.tankLiquidImageContainer.minetip').children('.tankLiquidImage').each(function(){
						$(this).css({
							backgroundImage: 'url(' + $(this).children('img').hide().attr('src') + ')',
							backgroundRepeat: 'repeat',
							backgroundPosition: 'bottom',
							height: ($(this).data('tank-usage') || 5000) / max * 100 + '%'
						});
					});
				});
			}
		},

		/**
		 * Special page reporting
		 */
		specialPage: {
			conditional: function(){return $('specialMaintenance').length || conf.wgCanonicalSpecialPageName === 'Specialpages';},
			exec: function(){
				var pages = [
					'BrokenRedirects',
					'DoubleRedirects',
					'Unusedcategories',
					'Unusedimages',
					'Wantedcategories',
					'Wantedfiles',
					'Wantedpages',
					'Wantedtemplates'
				];

				function getPages(page){
					$.getJSON('/api.php?action=query&list=querypage&qppage=' + page + '&qplimit=100&format=json', function(data){
						$('#' + page).text(data.query.querypage.results.length);
					});
				}

				function apiQuery(){
					for (var i = 0; i < pages.length; i++){
						getPages(pages[i]);
					}
				}

				if($('specialMaintenance').length){
					apiQuery();
				}

				if(conf.wgCanonicalSpecialPageName === 'Specialpages'){
					$('#mw-content-text').before('<div id=\'spreport\'> \
						<div><a href=\'/Special:BrokenRedirects\' title=\'Special:BrokenRedirects\' target=\'_blank\'>Broken redirects (<span id=\'BrokenRedirects\'></span>)</a> &bull; <a href=\'/Special:DoubleRedirects\' title=\'Special:DoubleRedirects\' target=\'_blank\'>Double redirects (<span id=\'DoubleRedirects\'></span>)</a> &bull; <a href=\'/Special:Unusedcategories\' title=\'Special:Unusedcategories\' target=\'_blank\'>Unused categories (<span id=\'Unusedcategories\'></span>)</a> &bull; <a href=\'/Special:Unusedimages\' titl =\'Unusedimages\' target=\'_blank\'>Unused images (<span id=\'Unusedimages\'></span>)</div> \
						<div><a href=\'/Special:Wantedcategories\' title=\'Special:Wantedcategories\' target=\'_blank\'>Wanted categories (<span id=\'Wantedcategories\'></span>)</a> &bull; <a href=\'/Special:Wantedfiles\' title=\'Special:Wantedfiles\' target=\'_blank\'>Wanted files (<span id=\'Wantedfiles\'></span>)</a> &bull; <a href=\'/Special:Wantedpages\' title=\'Special:Wantedpages\' target=\'_blank\'>Wanted pages (<span id=\'Wantedpages\'></span>)</a> &bull; <a href=\'/Special:Wantedtemplates\' titl =\'Special:Wantedtemplates\' target=\'_blank\'>Wanted templates (<span id=\'Wantedtemplates\'></span>)</a></div> \
					</div>');
					apiQuery();
				}
			}
		},

		/**
		 * Pausing crafting grids
		 */
		pauseGrid: {
			conditional: function(){return $('.grid').length;},
			exec: function(){
				$('.grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand').hover(function(){
					$(this).children('.grid .animated').removeClass('animated').addClass('paused');
				}, function(){
					$(this).children('.grid .paused').removeClass('paused').addClass('animated');
				});
				$('#bodyContent').children('span.pops, div.pops, table.pops, td.pops, th.pops').each(function(){
					$(this).children('a').each(function(){
						$(this).attr('target', '_blank');
					});
				});
			}
		},

		/**
		 * Element animator
		 */
		animated: {
			conditional: function(){return $('.animated').length;},
			exec: function(){
				// Remove from animated class if only one child
				$('.animated').each(function(){
					if($(this).children('span, div').length === 1){
						$(this).removeClass('animated');
					}
				});
				// Add the active class to all of the first child of .animated
				$('.animated > span:first-child, .animated > div:first-child').addClass('active');
				if($('.animated').length){
					setInterval(function(){
						$('.animated').each(function(){
							var current = $(this).children('.active').removeClass('active'), next;
							if($(this).hasClass('random')){
								next = $(this).children().eq(Math.floor(Math.random() * $(this).children().length));
							}else if(current.next().length){
								next = current.next();
							}else{
								next = $(this).children().eq(0);
							}
							next.addClass('active');
						});
					}, 2000);
				}
			}
		},

		/**
		 * Crafting grid handler
		 */
		craftingGrid: {
			conditional: function(){return $('.CraftingGrid').length;},
			exec: function(){
				$('.CraftingGrid').each(function(){
					if($(this).hasClass('JSRan')){
						return;
					}
					$(this).addClass('JSRan');
					var maxFrames = 0;
					$(this).children('.CraftingGridCell').each(function(){
						var frames = $(this).children('span:not(.ignore), div.GridTank:not(.ignore)').length;
						if(frames > maxFrames){
							maxFrames = frames;
						}
						// Initialize cell states
						$(this).children('span:first-child:not(.ignore), div.GridTank:first-child:not(.ignore)').addClass('ActiveSlide');
					});
					if(maxFrames <= 1){
						return;
					}
					// Create crafting grid controls
					$(this).append('<div class=\'CraftingGridControls\' style=\'position:absolute; bottom:0; width:100%; text-align:center;\'> \
										<input type=\'button\' value=\'<\' class=\'prevPage\'> \
										<span class=\'pageNum\'>1</span>/<span class=\'pageCount\'>' + maxFrames + '</span> \
										<input type=\'button\' value=\'>\' class=\'nextPage\'> \
									</div>');
					$(this).height($(this).height() + $(this).children('.CraftingGridControls').height());
					// Implement controls
					$(this).find('.nextPage').click(function(){
						$(this).parents('.CraftingGrid').children('.CraftingGridCell').each(function(){
							if($(this).children(':not(.ignore)').length === 1){
								$(this).removeClass('.CraftingGridCell');
								return;
							}
							var cur = $(this).children('.ActiveSlide'), next = cur.next('span:not(.ignore), div.GridTank:not(.ignore)');
							if(next.length === 0){
								next = cur.siblings('span:not(.ignore), div.GridTank:not(.ignore)').first();
							}
							cur.removeClass('ActiveSlide');
							next.addClass('ActiveSlide');
						});
						var pageNum = parseInt($(this).siblings('span.pageNum').html(), 10) + 1;
						if(pageNum > parseInt($(this).siblings('span.pageCount').html(), 10)){
							pageNum = 1;
						}
						$(this).siblings('span.pageNum').html(pageNum);
					});
					$(this).find('.prevPage').click(function(){
						$(this).parents('.CraftingGrid').children('.CraftingGridCell').each(function(){
							if($(this).children(':not(.ignore)').length === 1){
								$(this).removeClass('.CraftingGridCell');
								return 0;
							}
							var cur = $(this).children('.ActiveSlide'),
								next = cur.prev('span:not(.ignore), div.GridTank:not(.ignore)');
							if(next.length === 0){
								next = cur.siblings('span:not(.ignore), div.GridTank:not(.ignore)').last();
							}
							cur.removeClass('ActiveSlide');
							next.addClass('ActiveSlide');
						});
						var pageNum = parseInt($(this).siblings('span.pageNum').html(), 10) - 1;
						if(pageNum === 0){
							pageNum = parseInt($(this).siblings('span.pageCount').html(), 10);
						}
						$(this).siblings('span.pageNum').html(pageNum);
					});
				});
			}
		},

		/**
		 * Infobox collapsing
		 */
		infobox: {
			conditional: function(){return $('.infobox').length;},
			exec: function(){
				$('.infobox:not(.infoboxNoCollapse) td').each(function(){
					if($(this).html().match(/{{{[^}]+}}}/) || (!$(this).html().trim() && !$(this).parent('tr').hasClass('infoboxSubsectionBreak'))){
						$(this).parent('tr').hide();
					}
				});
				$('.infobox:not(.infoboxNoCollapse) .infoboxSubsectionBreak, .infobox:not(.infoboxNoCollapse) tr.infoboxSectionHeader').each(function(){
					var next = $(this).next();
					while(next !== undefined && next.html() !== undefined && !next.is('.infoboxSectionHeader')){
						if(next.is('.infoboxSubsectionBreak')){
							if($(this).is('.infoboxSectionHeader')) {
								next.hide();
							} else {
								break;
							}
						}
						if(next.is(':visible')){
							return;
						}
						next = next.next();
					}
					$(this).hide();
				});
			}
		},

		/**
		 * Autosorting sortable tables
		 */
		autosort: {
			conditional: function(){return $('.sortable').length;},
			exec: function(){
				mw.loader.using('jquery.tablesorter', function(){
					$('.sortable[class*="autosort="]').each(function(i){
						var matched = /(?:^|)autosort=(\d+)(?:,|-)(a|d)(?: |$)/.exec($(this).attr('class')),
							$sortCol = $($(this).children('> thead th:nth-child(' + matched[1] + ')')[i]);
						if(matched[2] === 'd'){
							$sortCol.click().click();
						}else{
							$sortCol.click();
						}
					});
				});
			}
		},
 
		/**
		 * Remove the fade animation from mw-collapsible
		 */
		/*instantCollapsible: {
			conditional: $('.mw-collapsible').length,
			exec: function(){
				// @TODO: Fix? MediaWiki:Common.js/collapsible.js
			}
		},*/

		/**
		 * Collapses navboxes under certain conditions
		 */
		navbox: {
			conditional: function(){return conf.wgNamespaceNumber === 0 && $('.navbox').length;},
			exec: function(){
				function collapseNavbox(navbox){
					$(navbox).children('> tbody > tr > td > table').addClass('mw-collapsed').children('> tbody > tr').each(function(i){
						if(i === 0){
							$(this).children('.mw-collapsible-toggle').addClass('mw-collapsible-toggle-collapsed').children('a').text('show');
							return;
						}
						$(this).hide();
					});
				}
				var $navbox = $('.navbox');
				$navbox.each(function(){
					if($(this).height() > 300 || $navbox.length > 1){
						collapseNavbox(this);
					}
				});
			}
		},

		/**
		 * Signature reminder on talk pages
		 */
		sigReminder: {
			conditional: ['edit', 'submit'].indexOf(conf.wgAction) > -1 && (conf.wgNamespaceNumber % 2 === 1),
			exec: function(){
				$('#wpSave').on('click', function(e){
					if($('#wpMinoredit').prop('checked') || $('#wpTextbox1').val().replace(/(<nowiki>.*?<\/nowiki>)/g, '').match('~' + '~~')){
						return;
					}
					if(!confirm('It looks like you forgot to sign your comment. You can sign by placing 4 tildes (~~' + '~~) to the end of your message.\nAre you sure you want to post it?')){
						e.preventDefault();
					}
				});
			}
		},
		
		/**
		 * Accessibility button on silly pages like [[Feed The Beast Wiki:Extremely Scary Editathon]]
		 */
		spookyFont: {
			conditional: function(){return $('#spookyfont').length;},
			exec: function(){
				$('#spookyfont').on('click', function(){
					$('#spookytext').attr('style', '');
				});
			}
		}
	};

	var loaded = [];

	/**
	 * Used to detect incorrectly spelt keys for each include
	 *
	 * @param obj {object}
	 * @param key {string}
	 */
	function checkKeys(obj, key){
		var inclKeys = Object.keys(obj);

		['conditional', 'exec'].forEach(function(elem){
			var index = inclKeys.indexOf(elem);

			if(index > -1){
				inclKeys.splice(index, 1);
			}
		});

		if(inclKeys.length){
			console.warn('Error in MediaWiki:Common.js: `includes.' + key + '` contains unknown key(s): ' + inclKeys.toString());
		}
	}

	/**
	 * Loading method
	 *
	 * Iterates over each entry in `includes` to check if the script should be executed
	 */
	function init(){
		console.log("Running Common.js init()");
		$.each(includes, function(k, v){
			if($.isFunction(v.conditional) ? v.conditional() : v.conditional){
				loaded.push('common.' + k);
				v.exec();
			}

			checkKeys(v, k);
		});

		ftb.loaded = (ftb.loaded || []).concat(loaded);

		// add `ftb` an an alias for `ftbwiki`
		window.ftb = ftb;
	}

	window.setTimeout(init, 0);

});