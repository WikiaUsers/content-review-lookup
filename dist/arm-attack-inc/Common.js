/* Any JavaScript here will be loaded for all users on every page load. */

// our config is stored in an array
window.lessOpts = window.lessOpts || [];

window.lessOpts.push( {
	// this is the page that has the compiled CSS
	target: 'MediaWiki:Common.css',
	// this is the page that lists the LESS files to compile
	source: 'MediaWiki:Custom-common.less',
	// these are the pages that you want to be able to update the target page from
	// note, you should not have more than one update button per page
	load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
	// target page header
	header: 'MediaWiki:Custom-css-header/common',
	// allowed groups
	allowed: [ 'codeeditor' ],
} );