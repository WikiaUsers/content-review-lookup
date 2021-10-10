/* Any JavaScript here will be loaded for all users on every page load. */
/* credit to Among Us wiki for the config */
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central.',
	autocheck : true
};



window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Wantedpages", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 20000;

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;

InactiveUsers = { text: 'Inactive Editor' };
window.RollbackWikiDisable = true;

// our config is stored in an array
window.lessOpts = window.lessOpts || [];

// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Custom-common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Custom-Css-header/common'
} );