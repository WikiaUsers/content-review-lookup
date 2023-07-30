// NoLicenseWarning config
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop'
    ]
};

// override default msg of NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'You are uploading a file without proper licensing. If you wanted to use a file from Wikimedia Commons, please link the filename directly instead of uploading duplicates. Files in content to this rule will be deleted under admin\'s discretion.';

// convert files defined to <div>s including
// the correlating background-image
(function() {
	'use strict';
	var fd = ({
		conf: [],
		api: new mw.Api(),
		apiGetter: function() {
			this.api.get({
			    action: 'query',
			    meta: 'allmessages',
			    ammessages: 'Custom-CountryCollectors-config-horizimg'
			}).done($.proxy(function(d) {
			    if (!d.error) {
			    	d.query.allmessages.forEach(function(el) {
						if (el['*']) el['*'].split("\n").forEach(function(e) {
    						if (e.includes(".") && e != "") this.conf.push(e.split("|"));
						}, this);
			    	}, this);
			    }
			}, this));
			return this.conf;
		}
	}).apiGetter();
	
	setTimeout($.proxy(function() {
		this.d.forEach(function(el) {
			[].forEach.call(document.querySelectorAll('img[data-image-name="' + el[0] + '"]:not(a img)'), function(img) {
				var div = $("<div>", {
					class: "cc-imghoriz",
					style: "background-image: url('" + img.getAttribute("src") + "')"
				});
				div.css("background-position", (
					(!this.pos || isNaN(parseInt(this.pos)))
					? "50" : this.pos
				) + "%");
				div.css("width", img.height);
				div.css("height", img.height);
			    $(img).replaceWith(div);
			}, {pos: el[1]});
		});
	}, {d: fd}), 250);
})();