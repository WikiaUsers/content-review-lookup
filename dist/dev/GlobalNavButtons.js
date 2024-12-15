// Global Nav Buttons
// @author: Jr Mime
// @author: Caburum
// @maintainer: Aeywoo
// <pre>

mw.loader.using(["mediawiki.template.mustache"]).then(function () {
	glnbutt = {};
	glnbutt.config = $.extend({
		keepLinks: [] // tracking ids of top-level links to keep
	}, window.GlobalNavButtonsConf);

	if (mw.config.get("skin") !== "fandomdesktop") return console.error("[GlobalNavButtons] Unrecognized skin:", mw.config.get("skin"));

	glnbutt.init = function () {
		if (window.globalNavButtons) {
			//$(".global-explore-navigation__nav > * >").each(function () { // Remove Fandom links
			//	if (!glnbutt.config.keepLinks.includes(
			//		$(this).data("tracking-label") || $(this).first().data("tracking-label") // for dropdowns
			//	)) $(this).remove();
			//});
			$(".global-explore-navigation__nav").append($("<div>").addClass("global-explore-navigation__custom-links "));
			$.each(window.globalNavButtons, function(i, glnbutton) {
				if (typeof glnbutton !== "object") {} // Do nothing
				else if (!glnbutton.isMain && !glnbutton.whoIsMain) { // Normal
					$(".global-explore-navigation__nav .global-explore-navigation__custom-links").append(glnbutt.createTemplate("normal", {
						text: glnbutton.text,
						url: glnbutton.url,
						icon: glnbutton.icon,
						shortName: glnbutton.shortName,
						//hasBackground: !glnbutton.hasOwnProperty("hasBackground") || glnbutton.hasBackground
					}));
				} else if (glnbutton.isMain) { // Parent
					$(".global-explore-navigation__nav .global-explore-navigation__custom-links").append(glnbutt.createTemplate("parent", {
						text: glnbutton.text,
						url: glnbutton.url,
						icon: glnbutton.icon,
						shortName: glnbutton.shortName,
						//hasBackground: !glnbutton.hasOwnProperty("hasBackground") || glnbutton.hasBackground
					}));
				} else if (!glnbutton.isMain && glnbutton.whoIsMain) { // Child
					$("#custom-global-explore-nav-button-parent-" + glnbutton.whoIsMain + " .wds-dropdown__content ul").append(glnbutt.createTemplate("child", {
						text: glnbutton.text,
						url: glnbutton.url
					}));
				}
				i++;
			});
			mw.hook("dev.GlobalNavButtons").fire(); // for anyone needing to implement additional logic
		}
	};

	glnbutt.templates = {
		defaultIcon: "<svg class=\"wds-icon\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.15008 5.30832C6.06799 5.48263 5.90933 5.60345 5.72578 5.63141L0.4831 6.42984C0.0208923 6.50023 -0.163665 7.09555 0.170791 7.43724L3.96443 11.3129C4.09725 11.4486 4.15785 11.6441 4.1265 11.8357L3.23094 17.3082C3.15199 17.7907 3.63516 18.1586 4.04857 17.9308L8.73777 15.3471C8.90194 15.2566 9.09806 15.2566 9.26223 15.3471L13.9514 17.9308C14.3648 18.1586 14.848 17.7907 14.7691 17.3082L13.8735 11.8357C13.8421 11.6441 13.9028 11.4486 14.0356 11.3129L17.8292 7.43724C18.1637 7.09555 17.9791 6.50023 17.5169 6.42984L12.2742 5.63141C12.0907 5.60345 11.932 5.48263 11.8499 5.30832L9.50532 0.329227C9.29862 -0.109742 8.70138 -0.109742 8.49467 0.329226L6.15008 5.30832ZM9 2.99274L7.56499 6.04019C7.25307 6.70259 6.65014 7.16171 5.95267 7.26793L2.74389 7.75661L5.06579 10.1287C5.57048 10.6443 5.80078 11.3872 5.68164 12.1152L5.13351 15.4647L8.00354 13.8833C8.62737 13.5396 9.37263 13.5396 9.99646 13.8833L12.8665 15.4647L12.3184 12.1152C12.1992 11.3872 12.4295 10.6443 12.9342 10.1287L15.2561 7.75661L12.0473 7.26793C11.3499 7.16171 10.7469 6.70259 10.435 6.04019L9 2.99274Z\"/></svg>",
		normal:
			"<div class=\"global-explore-navigation__fan-central global-explore-navigation__item global-explore-navigation__item--with-icon\">" +
				"<a {{{url}}}>" +
					"<span class=\"wds-avatar wds-avatar--square\">" +
						" <span class=\"global-explore-navigation__icon\">{{{icon}}}</span>" +
						"<span class=\"global-explore-navigation__label\" {{{smallText}}}>{{text}}</span>" +
					"</span>" +
				"</a>" +
			"</div>",
		parent:
			"<div class=\"global-explore-navigation__fan-central global-explore-navigation__item global-explore-navigation__item--with-icon\">" +
				"<div class=\"wds-dropdown wds-open-to-right\" id=\"custom-global-explore-nav-button-parent-{{{shortName}}}\">" +
					"<a {{{url}}} class=\"wds-dropdown__toggle\">" +
						"<span class=\"wds-avatar wds-avatar--square\">" +
							" <span class=\"global-explore-navigation__icon\">{{{icon}}}</span>" +
							"<span class=\"global-explore-navigation__label\" {{{smallText}}}>{{text}}</span>" +
						"</span>" +
					"</a>" +
					"<div class=\"wds-dropdown__content\">" +
						"<ul class=\"wds-list wds-is-linked\">" +
							// Children here
						"</ul>" +
					"</div>" +
				"</div>" +
			"</div>",
		child: "<li><a {{{url}}}>{{text}}</a></li>"
	};

	glnbutt.createTemplate = function (template, args) {
		args = {
			text: args.text,
			url: args.url ? "href=\"" + args.url + "\"" : "",
			icon: args.icon || glnbutt.templates.defaultIcon,
			shortName: args.shortName || "",
			//hasBackground: args.hasBackground ? "has-background" : "",
			smallText: /\b\S{7,}\b/g.test(args.text) ? "style=\"font-size:8px\"" : ""
		};
		return Mustache.render(glnbutt.templates[template], args);
	};
	glnbutt.init();
});
// </pre>