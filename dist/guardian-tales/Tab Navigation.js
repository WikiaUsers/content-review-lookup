/* script for [[Template:Tab navigation]] animation */

const $tabNavs = $('.tab-navigation');

// used explicit iteration, since implicit variant attempts to group
// all tabnav instances into single variable which introduces unexpected behavior
$tabNavs.each(function() {
	const $tabNav = $(this);
	const $tabNavList = $tabNav.children('ul');
	const $tabNavListItems = $tabNavList.children('li');
	const $tabNavListItemDefault = $tabNavListItems.filter('.active-tab');

	// early exit case
	const hasActiveTab = $tabNavListItemDefault.length !== 0;
	if (!hasActiveTab) return;

	// dummy <li> element to manipulate tab highlight
	const $tabHoverObj = $('<li>', {
		html: '<div>&nbsp;</div>', // trigger intrinsic self-defined height
		class: 'tab-hover-object',
		role: 'presentation'
	});

	$tabNav.addClass('is-js');
	$tabNavList.append($tabHoverObj);

	/*
	  On initialization, set active tab's coords on <ul> (global parent)
	  On any tab hover, set hovered tab's coords on the dummy element <li> (local child)
	  The effect:
		when  hovering, CSS inherits the local child's coord variables
		when !hovering, CSS inherits the global parent's coord variables
	*/
	var currentActive = $tabNavListItemDefault[0];
	setProps(currentActive, $tabNavList);

	// retain highlight on clicked tab by delegating the active tab to it
	$tabNavListItems.on('click', function() {
		$(currentActive).removeAttr('class');
		currentActive = this;
		setProps(this, $tabNavList);
		$(this).addClass('active-tab');
	});

	$tabNavListItems.on('mouseenter focusin', function() {
		setProps(this, $tabHoverObj);
	});
	$tabNavListItems.on('mouseleave focusout', function() {
		$tabHoverObj.removeAttr('style');
	});

	// finds coordinates of {context}, and applies them as CSS variables to {$target}
	function setProps(context, $target) {
		const bounds = {
			tab_x: context.offsetLeft,
			tab_y: context.offsetTop,
			tab_w: context.offsetWidth
		};
		for (const prop in bounds) {
			$target.css('--' + prop, bounds[prop] + 'px');
		}
	}
});