window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    target: 'MediaWiki:Common.css',
    source: 'MediaWiki:Common.less',
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Common.less'
    ],
    header: 'MediaWiki:Css-header/common'
} );

importArticles( {
    type: 'script',
    articles: [
        'u:dev:Less/code.2.js'
    ]
} );