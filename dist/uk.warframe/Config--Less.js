// Налаштування для https://dev.fandom.com/wiki/Less

// Our config is stored in an array
window.lessOpts = window.lessOpts || [];

// Each target page needs separate configuration
window.lessOpts.push( {
    // This is the page that has the compiled CSS
    target: 'MediaWiki:Test.css',
    // This is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-test.less',
    // These are the pages that you want to be able to update the target page from
    // Note, you should not have more than one update button per page
    load: [
        'MediaWiki:Test.css',
        'MediaWiki:Custom-test.less'
    ],
    // This is the page that contains the comment header for the target page
    // All other comments are stripped during compilation
    //header: 'MediaWiki:Custom-Css-header/common'
} );