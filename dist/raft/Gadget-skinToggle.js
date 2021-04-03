$(function() {
	/* getWindow - makes sure just 1 window appears */
	var getWindow = 0;
	var navigation = document.getElementById('p-navigation');
	function tempToggleClasses() {
		$('body').toggleClass('skin-hydra');
		$('body').toggleClass('skin-hydradark');
	}

	/** After clicking on button **/
		/* Make sure there is no window opened */
		if (getWindow == 0) {
			var $alertScreen = $(document.createElement('div'));
			$alertScreen.attr('id', 'skinchange-alert');
			getWindow = getWindow + 1;
			$alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice" title="Change to Dark Theme"></div><div id="skinchange-light" class="skinchange-choice" title="Change to Light Theme"></div></div>');
			var bottompart = document.getElementById('skinchange-bottom');
			if (mw.config.get('wgUserId')) {
				/*bottompart.html('<div class="skinchange-suppress-outer"><div class="skinchange-suppress-inner"><input type="checkbox" id="skinchange-suppress"> <label for="skinchange-suppress">Suppress sidebar button</label></div></div>');*/
				$alertScreen.insertAfter(navigation);
				var checkbox = 0 /*document.getElementById('skinchange-suppress');*/
				function changeSkin(target, suppress) {
					var a = new mw.Api();
					return a.postWithToken('csrf', {
						action : 'options',
						change : 'skin=' + target
					}).then(function() {
						if (!suppress) {
							location.reload();
							return;
						}
						return a.postWithToken('csrf', {
							action: 'options',
							change : 'gadget-skinToggle=0'
						}).then(function() {
							location.reload();
						});
					});
				}
			$(document.getElementById('skinchange-dark')).click(function() {
				return changeSkin('hydradark', checkbox.checked);
			});
			$(document.getElementById('skinchange-light')).click(function() {
				return changeSkin('hydra', checkbox.checked);
			});
			
			$('.skin-hydra #skinchange-dark, .skin-hydradark #skinchange-light').hover(tempToggleClasses, tempToggleClasses);
			}
			else {
				var curURL = window.location.href;
				var loginURL = "https://www.gamepedia.com/twitch-login?returnUrl=" + curURL;
				/*bottompart.html('<div class="skinchange-nouser">You must <a href="' + loginURL + '">log in</a> to permanently change skins, but you can preview!</div>');*/
				$alertScreen.insertAfter(navigation);
				function changeSkinTemp(target) {
					curURL = curURL.replace(/(?:\&|\?)useskin=[A-z]*/g,'');
					var sep = (curURL.indexOf("?") === -1) ? "?" : "&";
					window.location.href = curURL + sep + 'useskin=' + target;
				}
				$(document.getElementById('skinchange-dark')).click(function() {
					changeSkinTemp('hydradark');
				});
				$(document.getElementById('skinchange-light')).click(function() {
					changeSkinTemp('hydra');
				});
			
				$('.skin-hydra #skinchange-dark, .skin-hydradark #skinchange-light').hover(tempToggleClasses, tempToggleClasses);
			}
			$(document.getElementById('skinchange-x')).click(function() {
				$alertScreen.remove();
				getWindow = getWindow -1;
			});
		}
});