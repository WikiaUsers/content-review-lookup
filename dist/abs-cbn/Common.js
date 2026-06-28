/* Any JavaScript here will be loaded for all users on every page load. */

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__actions').prepend( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '15px', 'margin-top' : '5px' } ).show();

/*
 * Modified JS based on rearrangeCategories and accompanying functions 
 * from https://starwars.fandom.com/wiki/MediaWiki:Common.js
 */

// Categories to match for maintenance tagging (case-insensitive)
const MAINTENANCE_CATS = {
	match: ['Article stubs'], // Match these exactly
	contains: ['Protected'], // If category contains these values
	starts_with: ['Articles', 'Pages'], // If category starts with these values
	ends_with: ['sources', 'expansion', 'deletion'], // If category ends with these values
	// excludes: ['Hello'], // Ignore these categories
};

function isMaintenanceCategory(t) {
	if (!t) return false;
	const txt = t.toLowerCase();

	// Check excludes first
	if (MAINTENANCE_CATS.excludes.some(function(v) { return txt === v.toLowerCase(); }))
		return false;
	// Exact matches
	if (MAINTENANCE_CATS.match.some(function(v) { return txt === v.toLowerCase(); }))
		return true;
	// Contains
	if (MAINTENANCE_CATS.contains.some(function(v) { return txt.includes(v.toLowerCase()); }))
		return true;
	// Starts with
	if (MAINTENANCE_CATS.starts_with.some(function(v) { return txt.startsWith(v.toLowerCase() + ' '); }))
		return true;
	// Ends with
	if (MAINTENANCE_CATS.ends_with.some(function(v) { return txt.endsWith(' ' + v.toLowerCase()); }))
		return true;

	return false;
}


function buildNewCategoryLine(node, cats, prefix) {
	if (!cats.length) return;

	// Add prefix
	node.append('<span class="page-header__categories-in">' + prefix + ' </span>');

	if (cats.length <= 4) {
		// Append all categories with commas
		for (let i = 0; i < cats.length; i++) {
			node.append(cats[i]);
			if (i < cats.length - 1) node.append(', ');
		}
	} else {
		// Append first 3 categories with commas
		for (let i = 0; i < 3; i++) {
			node.append(cats[i]);
			node.append(', ');
		}

		// Build dropdown for remaining categories
		const remainingCount = cats.length - 3;
		node.append(
			'<div class="wds-dropdown page-header__categories-dropdown">' +
				'<span>and </span>' +
				'<a class="wds-dropdown__toggle" data-tracking="categories-more">' + remainingCount + ' more</a>' +
				'<div class="wds-dropdown__content page-header__categories-dropdown-content wds-is-left-aligned">' +
					'<ul class="wds-list wds-is-linked"></ul>' +
				'</div>' +
			'</div>'
		);
		const $ul = node.find('.page-header__categories-dropdown-content > ul.wds-list');
		const items = [];

		for (let i = 3; i < cats.length; i++)
			items.push($('<li></li>').append(cats[i]));

		$ul.append(items);

	}
}

function rearrangeCategories() {

	const $catHeader = $('.page-header__categories');

	if (!$catHeader.length)
		return;

	const $links = $catHeader.find('a[data-tracking-label^="categories-top-more"]');

	let normalCats = [],
		maintenanceCats = [];

	$links.each(function(i,el) {
		if( isMaintenanceCategory( el.text ) )
			maintenanceCats.push(el);
		else
			normalCats.push(el);
	});

	if (normalCats.length === $links.length) return;

	$catHeader.empty();

	const $cats = $('<div>', { id: 'normal-category-header' });
	const $mcats = $('<div>', { id: 'maintenance-category-header' });

	$catHeader.append($cats,$mcats);

	buildNewCategoryLine( $cats, normalCats, 'in:');
	buildNewCategoryLine( $mcats, maintenanceCats, 'also in:');
}

if( mw.config.get('wgAction') === 'view' )
	rearrangeCategories();