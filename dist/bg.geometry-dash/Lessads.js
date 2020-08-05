// our config is stored in an array
window.lessOpts = window.lessOpts || [];
 
// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/common'
} );
window.lessConfig = {
    // reloads the page after the target page has successfully been updated
    // defaults to true
    reload: true,
    // wraps the parsed CSS in pre tags to prevent any unwanted links to templates, pages or files
    // defaults to true
    wrap: true,
    // for adding non-standard usergroups that can edit the mediawiki namespace
    // normally this is limited to staff, vstf, helpers and sysops/admins
    // but if there are other groups that can edit the namespace on your wiki
    // add them to the array here for the script to load for them
    allowed: []
};
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:Less/code.2.js',
        //...
    ]
} );