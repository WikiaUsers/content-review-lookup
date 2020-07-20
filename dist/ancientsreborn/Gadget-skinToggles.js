/**
 * Toggles for skin cookies
 * 
 * @author Gaz Lloyd
 * @author JaydenKieran
 * 
 */
;(function($, mw, rs){
	var READER_COOKIE = 'readermode',
		DARK_COOKIE = 'darkmode',
		DARK_COOKIE_CONDITIONAL = 'darkmode_conditional',
		STICKY_HEADER_COOKIE = 'stickyheader',
		FLOORNUMBER_LS = 'floornumber_display',
		currentReader = $.cookie(READER_COOKIE) === 'true',
		currentDark = $.cookie(DARK_COOKIE) === 'true',
		currentDarkConditional = $.cookie(DARK_COOKIE_CONDITIONAL) === 'true',
		currentSticky = $.cookie(STICKY_HEADER_COOKIE) === 'true',
		currentFloornumber = '_auto',
		prompt = 'dark_prompt',
		now = new Date(),
		hour = now.getHours(),
		conditionalCheck = (hour >= 19 || hour < 7),
		popupButton,
		readerSwitch,
		darkConditionalSwitch,
		darkSwitch,
		stickySwitch,
		floorSelect,
		floorSelectAuto,
		floorSelectUK,
		floorSelectUS,
		applyButton,
		cancelButton,
		portletLink,
		$content,
		formMade = false,
		userLocale = 'UK',
		flsetting,
		browserLocale,
		floorSelectHelp;

	var self = {
		init: function () {
			if (rs.hasLocalStorage()) {
				currentFloornumber = window.localStorage.getItem(FLOORNUMBER_LS);
				if (currentFloornumber == null) {
					currentFloornumber = '_auto';
				}
			}
			flsetting = currentFloornumber;
			if (window.navigator.languages && window.navigator.languages.length) {
				browserLocale = window.navigator.languages[0];
			} else {
				browserLocale = navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
			}
			switch (browserLocale) {
				// all langs in -US or -CA
				case 'en-US':
				case 'es-US':
				case 'en-CA':
				case 'fr-CA':
					userLocale = 'US';
					break;
			}
			if (currentFloornumber == '_auto') {
				flsetting = userLocale;
			}
			switch (flsetting) {
				case 'US':
					flsetting = 'floornumber-setting-us';
					break;
				case 'UK':
				default:
					flsetting = 'floornumber-setting-gb';
					break;
			}
			$('body').addClass(flsetting);
			
			portletLink = mw.util.addPortletLink(
				'p-personal',
				'',
				'',
				'pt-skin-toggles',
				'Your appearance settings',
				null,
				$('#pt-userpage, #pt-anonuserpage')
			);
			
			$(portletLink).find('a').addClass('oo-ui-icon-advanced').add('.floor-convention').click(function(e) {
				e.preventDefault();
				if (!formMade) {
					mw.loader.using(['oojs-ui-core','oojs-ui-windows','oojs-ui-widgets']).then(self.initForm);
				} else {
					window.OOUIWindowManager.openWindow('skin');
				}
			});
			

			if (currentReader) {
				mw.util.addPortletLink(
					'p-namespaces',
					mw.util.getUrl(mw.config.get('wgMainPageTitle')),
					'Menu',
					'ca-reader-menu'
				);

				// can't use the nextnode parameter in addPortletLink
				// because the id of the first tab varies
				$('#ca-reader-menu')
					.prependTo('#p-namespaces ul');

				// move sidebar
				$('#mw-panel')
					.attr('id', 'ca-reader-dropdown')
					.appendTo('#ca-reader-menu');
			}

			if (currentDarkConditional) {
				var reloadRequired = (conditionalCheck != currentDark)
				$.cookie(DARK_COOKIE, conditionalCheck, {expires: 365, path: '/'});
				if (reloadRequired === true) {
					window.location.reload(true);
				}
			}

			if (currentSticky) {
				window.addEventListener("scroll", function() {
					var personal = $('#p-personal');
				    if (mw.config.get('wgAction') === 'edit' || window.location.search.includes('veaction')) {
				  		// We're on an edit page, do nothing and reset all the stuff
						if (personal.is(":hidden")) {
							personal.show();
							head.removeClass('sticky-hidden');
						}
				    } else {
					  	var targetEle = document.getElementById("mw-head");
					  	var head = $('#mw-head');
					  	if (window.scrollY > (targetEle.offsetTop + targetEle.offsetHeight)) {
							if (personal.is(":visible")) {
								personal.hide();
								head.addClass('sticky-hidden');
							}
					  	} else {
							if (personal.is(":hidden")) {
								personal.show();
								head.removeClass('sticky-hidden');
							}
					  	}
				  	}
				});
				// hidden by css when sticky-hidden is not on
				if (mw.config.get('wgIsMainPage') !== true) {
					mw.util.addPortletLink(
						'p-namespaces',
						mw.util.getUrl(mw.config.get('wgMainPageTitle')),
						'Main Page',
						'ca-nstab-mainpage',
						'Visit the main page'
					);
				}
			}
			
			/**
			 * Used for prompting users who have prefers-color-scheme set to dark
			 * to switch to dark mode (because doing this automatically would
			 * require setting a cookie, prompting this is best for privacy/
			 * legal reasons)
			 **/
			 
			if (rs.hasLocalStorage()) {
			 // This should always be true anyway because browsers that
			 // support prefers-color-scheme have LocalStorage API support
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					if (!currentDark) {
						// Only show if they're not currently using dark mode
						var alreadyPrompted = localStorage.getItem(prompt)
						if (alreadyPrompted === null) {
							// Only show if the localStorage key doesn't exist
							mw.loader.using(['oojs-ui-core','oojs-ui-widgets']).then(function () {
								var popup = new OO.ui.PopupWidget( {
								  $content: $( '<p style="font-size: 0.75em;">Your device is using dark mode. You can click here to enable the wiki\'s dark mode!<br /><a id="rsw-color-scheme-opt-out" href="#">Don\'t show this again</a></p>' ),
								  padded: true,
								  width: 300,
								  $floatableContainer: $('#pt-skin-toggles'),
								  autoClose: true,
								  id: 'rsw-color-scheme-prompt'
								} );
				
								$( 'body' ).append( popup.$element );
								popup.toggle( true );
								
								$( '#rsw-color-scheme-opt-out' ).click( function() {
									// Set localStorage key so we don't prompt them again
									localStorage.setItem(prompt, 'true')
									popup.toggle( false )
								} )	
							});
						}
					}
				}
			}
		},
		initForm: function() {
			readerSwitch = new OO.ui.ToggleSwitchWidget({
				value: currentReader,
				classes: ['reader-toggle'],
				align: 'right'
			});

			stickySwitch = new OO.ui.ToggleSwitchWidget({
				value: currentSticky,
				classes: ['reader-toggle'],
				align: 'right'
			});

			darkConditionalSwitch = new OO.ui.ToggleSwitchWidget({
				value: currentDarkConditional,
				classes: ['reader-toggle'],
				align: 'right'
			})

			darkSwitch = new OO.ui.ButtonSelectWidget({
				classes: ['appearance-buttons'],
				items: [
					new OO.ui.ButtonOptionWidget({
						classes: ['light-mode-button'],
						data: false,
						label: new OO.ui.HtmlSnippet('<div class="button-img"></div><div class="button-text">Light</div><div class="button-text-selected"></div>'),
					}),
					new OO.ui.ButtonOptionWidget({
						classes: ['dark-mode-button'],
						data: true,
						label:new OO.ui.HtmlSnippet('<div class="button-img"></div><div class="button-text">Dark</div><div class="button-text-selected"></div>'),
						//disabled: true
					}),
				]
			});
			
			floorSelectAuto = new OO.ui.RadioOptionWidget({
						data: '_auto',
						label: 'Auto-detect: '+userLocale
					});
			floorSelectUK = new OO.ui.RadioOptionWidget({
						data: 'UK',
						label: 'UK'
					});
			floorSelectUS = new OO.ui.RadioOptionWidget({
						data: 'US',
						label: 'US'
					});
			
			floorSelect = new OO.ui.RadioSelectWidget({
				classes: ['floornumber-select'],
				items: [
					floorSelectAuto,
					floorSelectUK,
					floorSelectUS
					]
			});
			floorSelect.selectItemByData(currentFloornumber);
			floorSelectHelp = 'Changes how floor numbers are displayed on the wiki - whether the numbering begins at 0 (ground) or 1.';
			if (!rs.hasLocalStorage()) {
				floorSelect.setDisabled(true);
				floorSelectHelp = 'This option requires local storage to be supported and enabled in your browser.';
			}
			floorSelectAuto.$element.attr('title', 'Automatically detect the type to use from your browser.');
			floorSelectUK.$element.attr('title', 'The numbering used in the UK, Europe, and many Commonwealth countries: entrance on the ground floor, then above that is 1st floor, 2nd floor, etc.');
			floorSelectUS.$element.attr('title', 'The numbering used in the USA and Canada: entrance on the 1st floor, then above that is 2nd floor, 3rd floor, etc.');

			darkSwitch.setDisabled(darkConditionalSwitch.getValue())

			darkConditionalSwitch.on('change', function() {
				darkSwitch.setDisabled(darkConditionalSwitch.getValue())
			})

			stickySwitch.setDisabled(readerSwitch.getValue())
			readerSwitch.setDisabled(stickySwitch.getValue())

			readerSwitch.on('change', function() {
				if (readerSwitch.getValue() === true) {
					stickySwitch.setValue(false)
				}
				stickySwitch.setDisabled(readerSwitch.getValue())
			})

			stickySwitch.on('change', function() {
				if (stickySwitch.getValue() === true) {
					readerSwitch.setValue(false)
				}
				readerSwitch.setDisabled(stickySwitch.getValue())
			})

			darkSwitch.selectItemByData(currentDark);

			applyButton = new OO.ui.ButtonInputWidget({
				label: 'Save',
				flags: ['primary', 'progressive'],
				classes: ['skin-save-button']
			});

			applyButton.on('click', function(){
				$.cookie(READER_COOKIE, readerSwitch.getValue(), {expires: 365, path: '/'});
				$.cookie(DARK_COOKIE_CONDITIONAL, darkConditionalSwitch.getValue(), {expires: 365, path: '/'});
				$.cookie(STICKY_HEADER_COOKIE, stickySwitch.getValue(), {expires: 365, path: '/'});
				
				var darkval = darkSwitch.findSelectedItem(),
					darkc = false,
					requireReload = false;
					
				if ((readerSwitch.getValue() !== currentReader) || (stickySwitch.getValue() !== currentSticky)) {
					requireReload = true;
				}

				if (darkConditionalSwitch.getValue() === false) {
					if (darkval !== null) {
						darkc = darkval.getData();
					}
				} else if (darkConditionalSwitch.getValue() === true) {
					darkc = conditionalCheck
				}
				
				$.cookie(DARK_COOKIE, darkc, {expires: 365, path: '/'});
				
				if (rs.hasLocalStorage()) {
					window.localStorage.setItem(FLOORNUMBER_LS, floorSelect.findSelectedItem().getData());
				}
				
				if (darkc === true) {
					mw.loader.using(['wg.darkmode']).then(function() {
					  $('body').addClass('wgl-darkmode')
					});
				} else {
					$('body').removeClass('wgl-darkmode')
				}
				
				if (requireReload === true) {
					window.location.reload(true);
				} else {
					window.OOUIWindowManager.closeWindow('skin')
				}
			});

			cancelButton = new OO.ui.ButtonInputWidget({ label: 'Cancel', flags: 'destructive'});

			$content = $('<div>');
			$content
				.addClass('appearance-modal tile')
				.append(
					$('<h2>').text('Appearance'),
					$('<div>')
						.addClass('appearance-buttons')
						.append(darkSwitch.$element),
					$('<div>')
						.addClass('reader-mode')
						.append(
							darkConditionalSwitch.$element,
							$('<div>').addClass('dark-conditional-header').text('Automatic dark mode'),
							$('<p>').addClass('dark-conditional-desc').text('Automatically switch to dark mode from 19:00 to 7:00 local time. Disables the manual setting above.'),
							readerSwitch.$element,
							$('<div>').addClass('reader-mode-header').text('Reader mode'),
							$('<p>').addClass('reader-mode-desc').text('Increase the font size and switch the wiki to a fixed-width layout. Incompatible with sticky headers.'),
							stickySwitch.$element,
							$('<div>').addClass('sticky-header-header').text('Sticky header'),
							$('<p>').addClass('sticky-header-desc').text('Pin the navigation bar and search to the top when scrolling. Incompatible with reader mode.'),
							floorSelect.$element,
							$('<div>').addClass('floornumber-header').text('Floor numbering'),
							$('<p>').addClass('floornumber-desc').text(floorSelectHelp)
						),
					$('<div>')
						.addClass('appearance-save')
						.append(
							$('<p>').addClass('save-button-desc').html('Saving these changes will reload the page and set <a href="https://weirdgloop.org/privacy">personalisation cookies</a>.'),
							$('<div>').addClass('save-button-container')
								.append(applyButton.$element)
								.append(cancelButton.$element)
						)
				);

			var initModal = function (modal) {
				modal.$body.append( $content );
				cancelButton.on('click', function(modal){window.OOUIWindowManager.closeWindow(modal);}, [modal]);
			};

			rs.createOOUIWindow('skin', 'Appearance settings', {size: 'medium', classes: ['rsw-skin-toggle-popup']}, initModal, true);
			
			formMade = true;
		}
	}

	mw.loader.using(['ext.gadget.rsw-util'], function () {
		$(self.init);
	})

}(jQuery, mediaWiki, rswiki));