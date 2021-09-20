/**
 * Name:        SkinSwitcher
 * Version:     v1.0
 * Author:      Caburum
 * Description: Adds a dropdown to switch between available skins and some variants
 * <nowiki>
**/

mw.loader.using(['mediawiki.Uri', 'mediawiki.template.mustache'], function() {
	if (window.SkinSwitcherLoaded) return;
	window.SkinSwitcherLoaded = true;

	var data = [
		{ n: 'FandomDesktop', s: 'fandomdesktop' },
		{ n: 'FandomMobile', s: 'fandommobile' },
		{ n: 'Mobile app', s: 'fandommobile', p: { 'mobile-app': 'true' } },
		{ n: 'Mobile app (dark)', s: 'fandommobile', p: { 'mobile-app': 'true', 'theme': 'dark' } }
	],
	template = '<li class="wds-dropdown-level-nested">' +
		'<a class="wds-dropdown-level-nested__toggle">' +
			'<span>Skins</span>' +
			'<svg class="wds-icon wds-icon-tiny wds-dropdown-chevron"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>' +
		'</a>' +
		'<div class="wds-is-not-scrollable wds-dropdown-level-nested__content" style="top: 50%; right: 94%; left: unset;">' +
			'<ul class="wds-list wds-is-linked">' +
				'{{#data}}' +
					'<li><a href="{{{link}}}">{{n}}</a></li>' +
				'{{/data}}' +
			'</ul>' +
		'</div>' +
	'</li>';

	$('.wiki-tools > .wds-dropdown .wds-list').append(Mustache.render(template, {
		data: data,
		link: function() {
			return new mw.Uri().extend(Object.assign({ useskin: this.s }, this.p || {})).toString();
		}
	}));
});