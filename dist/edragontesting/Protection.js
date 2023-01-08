/*
---------------------------
 Protection Icon Indicator
---------------------------

---------
 AUTHORS 
---------
- Spottra: original version
- E12Dragon: new automated version with template options
*/
$(function () {
	var config = mw.config.get([
	    'wgRestrictionEdit',
	    'wgCanonicalNamespace',
	    'wgSiteName',
	    'wgArticleId',
	    'wgAction'
	]);
	//Where the protection icon will be added
	var parent = '.page-header__contribution-buttons .wds-button-group, .page-header__bottom .page-header__actions';
	//Define image file location (src)
	var file;
	if ($('.protection-image-options > img').length) {
		file = $('.protection-image-options > img').attr('src').split('/revision/')[0];
	}else if (config.wgRestrictionEdit == 'sysop' || config.wgCanonicalNamespace == 'MediaWiki') { 
		file = 'https://static.wikia.nocookie.net/clashofclans/images/a/a5/Protection-3.png';
	}else if (config.wgRestrictionEdit == 'autoconfirmed') {
		file = 'https://static.wikia.nocookie.net/clashofclans/images/2/21/Protection-2.png';
	}else if (config.wgCanonicalNamespace == 'User') {
		file = 'https://static.wikia.nocookie.net/e12dragon_testing/images/0/08/Protection-U.png';
	}else {
		file = 'https://static.wikia.nocookie.net/clashofclans/images/9/96/Protection-1.png';
	}
	//Define alt for the image
	var alt;
	if ($('.protection-image-options > img').length) {
		alt = $('.protection-image-options > img').attr('alt');
	}else if (config.wgRestrictionEdit == 'sysop' || config.wgCanonicalNamespace == 'MediaWiki') { 
		alt = 'Protection-3.png';
	}else if (config.wgRestrictionEdit == 'autoconfirmed') {
		alt = 'Protection-2.png';
	}else if (config.wgCanonicalNamespace == 'User') {
		alt = 'Protection-U.png';
	}else {
		alt = 'Protection-1.png';
	}
	//Define tooltip text
	var text;
	if ($('.protection-image-options > .text').length) {
		text = $('.protection-image-options > .text').text();
	}else if (config.wgRestrictionEdit == 'sysop' || config.wgCanonicalNamespace == 'MediaWiki') { 
		text = 'This page is locked. Only administrators may make changes to this page.';
	}else if (config.wgRestrictionEdit == 'autoconfirmed') {
		text = 'This page is protected. New accounts cannot edit this page.';
	}else if (config.wgCanonicalNamespace == 'User') {
		text = 'This is a user page and should or may only be able to be edited by its owner.';
	}else {
		text = 'This page is open for anyone with a Fandom account to edit.';
	}
	//Define the width
	var width;
	if ($('.protection-image-options > .width').length) {
		width = $('.protection-image-options > .width').text();
	}else {
		width = '28px';
	}
	//Add protection icon with set vars
	function addProtectionIcon() {
		$(parent).prepend('<div class="protection-image hidden titleAlert protection-image-visible" style="margin:-2px 10px 0 0; top:4px; position:relative;" title="' + text + '">' +
						 '<img alt="'+ alt +'" width="' + width + '" src="'+ file +'" />' +
						 '</div>'
		);
	}
	//If the template sets it not display, or page has not been created, or a page is being edited, do not run.
	if (!$('.protection-image-options > .none').length && config.wgArticleId !== 0 && config.wgAction !== 'edit') {
		if (config.wgCanonicalNamespace == '' ||
			config.wgCanonicalNamespace == 'Project' ||
			config.wgCanonicalNamespace == 'User' ||
			config.wgCanonicalNamespace == 'MediaWiki' ||
			config.wgCanonicalNamespace == 'File' ||
			config.wgCanonicalNamespace == 'Template' ||
			config.wgCanonicalNamespace == 'Category' ) {
				addProtectionIcon();
		}
	}
});