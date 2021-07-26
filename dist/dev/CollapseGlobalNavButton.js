/* jshint
	esversion: 5
*/
/**
 * CollapseGlobalNavButton.js - For UCX only
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 * @license CC-BY-SA 3.0
 */
(function() {
	if (mw.config.get('skin') !== 'fandomdesktop') return console.warn('[CollapseGlobalNavButton] [WARN]: Script was loaded on a skin other than UCX, exiting...');
	if ($('.global-navigation__collapse').length) return console.warn('[CollapseGlobalNavButton] [WARN]: Script was double loaded, exiting...');
	
	var $notifs = $('.global-navigation__bottom');
	var $nav = $notifs.parent();
	var $main = $('.main-container');
	var $localNav = $('.fandom-sticky-header');
	var collapsed = localStorage.getItem('CGNB-Collapsed') === 'collapsed';
	
	function resizeEditors() {
		var aceEditors = document.querySelectorAll('.ace_editor');
		
		if (mw.config.get('wgCodeEditorCurrentLanguage') || aceEditors.length) {
			aceEditors.forEach(function(e) {
				ace.edit(e).resize();
			});
		} else if (window.WikiEditorCodeMirror) {
			window.WikiEditorCodeMirror.refresh();
		}
	}
	
	function createInterval(callback, ms) {
		var interval;
		var $promise = new $.Deferred();
		
		return {
			then: $promise.then,
			start: function() {
				interval = setInterval(callback, ms);
				return $promise;
			},
			end: function() {
				clearInterval(interval);
				$promise.resolve();
				return $promise;
			},
		};
	}

	mw.hook('dev.i18n').add(function (i18nJS) { i18nJS.loadMessages('CollapseGlobalNavButton').done(function (i18n) {
		$('.global-navigation__bottom').addClass('button-added').prepend($('<div>', {
			class: "global-navigation__collapse",
			title: i18n.msg('hide').plain(),
			data: {
				collapsed: false,
			},
			click: function() {
				var $this = $(this);
		
				if ($this.data('collapsed')) {
					// Remove collapsed classes
					$(document.body).removeClass('global-navigation-collapsed');
		
					// Refresh editors if there are any with animation
					var interval = createInterval(function() {
						resizeEditors();
					}, 0);
						
					// Stage 1 of animation
					$notifs.addClass('collapsing')
						.removeClass('notifs-in')
						.one('animationend', function(e) {
							e.stopPropagation(); // To prevent duplicate events with global nav
							$notifs.removeClass('collapsing')
								.removeClass('open');
		
							$nav.addClass('uncollapsing');
							$([ $main[0], $localNav[0] ]).addClass('collapsing');
							
							$this.attr('title', i18n.msg('hide').plain());
							// Cache state
							localStorage.setItem('CGNB-Collapsed', 'uncollapsed');
							// Start refreshing editors
							interval.start();
						});
						
					// Stage 2 of animation
					$nav.one('animationend', function() {
						$nav.removeClass('nav-out uncollapsing');
						$([ $main[0], $localNav[0] ]).removeClass('collapsing uncollapsed');
	
						// End Refreshing of editors
						interval.end();
						mw.hook('dev.cgnb.changeend').fire(false);
					});
		
					$this.data('collapsed', false);
					mw.hook('dev.cgnb.change').fire(false); // Fire event
				} else {
					// Add collapsing classes
					$nav.addClass('collapsing');
					$(document.body).addClass('global-navigation-collapsed');
					$([ $main[0], $localNav[0] ]).addClass('uncollapsing');
					
					// Refresh editors if there are any with animation
					var interval = createInterval(function() {
						resizeEditors();
					}, 0);
						
					// Start refreshing editors
					interval.start();
	
					// On stage 1 of animation
					$nav.one('animationend', function() {
						$nav.removeClass('collapsing')
							.addClass('nav-out');
						$([ $main[0], $localNav[0] ]).removeClass('uncollapsing').addClass('uncollapsed');
					
						$notifs.addClass('uncollapsing open');
						$this.attr('title', i18n.msg('show').plain());
						
						localStorage.setItem('CGNB-Collapsed', 'collapsed'); // Cache state
						// End Refreshing of editors
						interval.end();
						mw.hook('dev.cgnb.changeend').fire(true);
					});
					
					// On Stage 2 of animation
					$notifs.one('animationend', function() {
						$notifs.removeClass('uncollapsing')
							.addClass('notifs-in');
					});
		
					$this.data('collapsed', true);
					mw.hook('dev.cgnb.change').fire(true); // Fire event
				}
			},
			html: '<svg class="wds-icon wds-icon-tiny" style="transform: rotate(90deg);"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>'
		}));
		
		if (collapsed) $('.global-navigation__collapse').click();
		mw.hook('dev.cgnb.loaded').fire();
	})});

	// Import CSS/I18n
	importArticles({
		type: 'style',
		articles: [
			'u:dev:MediaWiki:CollapseGlobalNavButton.css',
			'u:dev:MediaWiki:I18n-js/code.js',
		],
	});
}());