//Back to Top arrow
window.BackToTopModern = true;
window.BackToTopSpeed = 700;
window.BackToTopStart = 890;

//AddRailModule Config
window.AddRailModule = [{prepend: true}];

//Less Config
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
	header: 'MediaWiki:Custom-css-header/common'
} );