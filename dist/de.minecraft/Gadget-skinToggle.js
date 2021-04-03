$(function() {
	var $changeSkinButton = $(document.createElement('div'));
	$changeSkinButton.attr('id','skinchange-button').attr('title','Ändere das Aussehen').html('<div class="skinchange-button-dark"></div><div class="skinchange-button-light"></div>');
	var sidebar = document.getElementById('p-Minecraft_Wiki');
	$changeSkinButton.insertAfter(sidebar);
	
	function tempToggleClasses() {
		if ( $('.skin-hydra').length ) $('<link/>', {rel: 'stylesheet', id: 'hydradark-skin-file', href: '/load.php?lang=de&modules=skins.z.hydra.dark.styles%7Cskins.z.hydra.dark.syntaxhighlight.monokai.styles&only=styles&skin=hydradark'}).insertAfter('#hydra-skin-file');
		if ( $('.skin-hydradark').length ) $('#hydradark-skin-file').remove();
		$('body').toggleClass('skin-hydra');
		$('body').toggleClass('skin-hydradark');
	}
	
	$changeSkinButton.click(function() {
		var $alertScreen = $(document.createElement('div'));
		$alertScreen.attr('id', 'skinchange-alert')
			.attr('draggable', 'true');
		if (mw.config.get('wgUserId')) {
			$alertScreen.html('<div class="skinchange-header">Ändere das Aussehen des Wikis!</div><div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice" title="Dunkles Aussehen verwenden"></div><div id="skinchange-light" class="skinchange-choice" title="Helles Aussehen verwenden"></div></div><div id="skinchange-x">×</div><div class="skinchange-suppress-outer"><div class="skinchange-suppress-inner"><input type="checkbox" id="skinchange-suppress"> <label for="skinchange-suppress">Verstecke den Schalter in der Seitenleiste</label></div></div>');
			$alertScreen.insertAfter(sidebar);
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
		}
		else {
			var curURL = window.location.href;
			var loginURL = "https://fandomauth.gamepedia.com/signin?redirect=" + curURL;
			$alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice"></div><div id="skinchange-light" class="skinchange-choice"></div></div><div id="skinchange-x"></div><div class="skinchange-nouser">Du musst <a href="' + loginURL + '">angemeldet</a> sein um das Aussehen permanent zu ändern, aber du kannst eine Vorschau sehen!</div>');
			$alertScreen.insertAfter(sidebar);
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
		}
		$(document.getElementById('skinchange-x')).click(function() {
			$alertScreen.remove();
		});
		
		$('.skin-hydra #skinchange-dark, .skin-hydradark #skinchange-light').hover(tempToggleClasses, tempToggleClasses);
		if ( !( $('#hydra-skin-file').length || $('#hydradark-skin-file').length ) ) {
			var skinFile = $('link[href*="skins.z.hydra.light.styles"]');
			if ( skinFile.attr('href').includes('skins.z.hydra.dark') ) {
				skinFile.attr('id', 'hydradark-skin-file');
				$('<link/>', {rel: 'stylesheet', id: 'hydra-skin-file', href: skinFile.attr('href').replace('%7Cskins.z.hydra.dark.styles%7Cskins.z.hydra.dark.syntaxhighlight.monokai.styles','')}).insertBefore('#hydradark-skin-file');
			} else skinFile.attr('id', 'hydra-skin-file');
		}
	});
});