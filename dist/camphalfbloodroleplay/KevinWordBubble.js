$(function() {
	var edenWB = {
		verifyBackgroundImage: function(url) {
			return new Promise(function(resolve, reject) {
				if (!(/^http(?:s)?:\/\/(?:static|vignette)\.wikia\.nocookie\.net\/[A-Za-z0-9-]+\/images\/(?:[A-Za-z0-9]+\/){2}[^\/]+\.[A-Za-z]+(?:\/revision\/latest(?:\/scale-to-width-down\/\d+)?(?:\?cb=\d+)?)?(?:\/)?$/.test(url))) {
					reject();
				}
				
				var img = new Image();
				img.src = url;
				img.onload = function() {
					resolve();
				};
				img.onerror = img.onabort = function() {
					reject();
				};
			});
		},
		setAttr: function($this) {
			$($this).find(".misc-links a").attr("target", "_blank");
		},
		events: function() {
			$("body").on("click", ".eden-wb .content-toggle", function() {
				$(this).toggleClass("roleplay");
				$(this).parent().next().children(".roleplay-content-container").toggleClass("active");
				$(this).parent().next().children(".about-content-container").toggleClass("active");
			});
		},
		setBackgroundImages: function($this) {
			var background = mw.html.escape($($this).data("background")),
				accentBackground = mw.html.escape($($this).data("accent-background"));
			
			edenWB.verifyBackgroundImage(background).then(function() {
				$($this).css("--main-background-image", "url('" + background + "')");
			}, function() {});
			
			edenWB.verifyBackgroundImage(accentBackground).then(function() {
				$($this).css("--accent-background-image", "url('" + accentBackground + "')");
			}, function() {});
		},
		init: function() {
			$(".eden-wb").each(function() {
				edenWB.setAttr(this);
				edenWB.setBackgroundImages(this);
			});
		}
	};
	
	edenWB.events();
	mw.hook("wikipage.content").add(edenWB.init);
	mw.hook("ve.activationComplete").add(edenWB.init);
});