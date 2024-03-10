$(function() {
	var $changeSkinButton = $(document.createElement('div'));
	$changeSkinButton.attr('id','skinchange-button').html('<div class="skinchange-button-dark"></div><div class="skinchange-button-light"></div>');
	var logo = document.getElementById('p-logo');
	$changeSkinButton.insertBefore(logo);
	
	function tempToggleClasses() {
		$('body').toggleClass('skin-hydra');
		$('body').toggleClass('skin-hydradark');
	}
	
	$changeSkinButton.click(function() {
		var $alertScreen = $(document.createElement('div'));
		$alertScreen.attr('id', 'skinchange-alert')
			.attr('draggable', 'true');
		if (mw.config.get('wgUserId')) {
			$alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice"></div><div id="skinchange-light" class="skinchange-choice"></div></div><div id="skinchange-x"></div><div class="skinchange-suppress-outer"><div class="skinchange-suppress-inner"><input type="checkbox" id="skinchange-suppress"> <label for="skinchange-suppress">Suppress sidebar button</label></div></div>');
			$alertScreen.insertBefore(logo);
			var checkbox = document.getElementById('skinchange-suppress');
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
			var loginURL = "https://www.fandom.com/twitch-login?returnUrl=" + curURL;
			$alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice"></div><div id="skinchange-light" class="skinchange-choice"></div></div><div id="skinchange-x"></div><div class="skinchange-nouser">You must <a href="' + loginURL + '">log in</a> to permanently change skins, but you can preview!</div>');
			$alertScreen.insertBefore(logo);
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
		});
	});
});