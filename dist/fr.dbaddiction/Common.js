/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        'u:dev:LastEdited/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
        'w:c:dev:ReferencePopups/code.js',
        'MediaWiki:Common.js/gridfiltering.js',
        'MediaWiki:Common.js/gridfixer.js'
    ]
});


gridContainer = '#champion-grid';
gridFilters = {
    'name': 'search',
    'role': [ '- R�le  -',
        ['Soigneur', 'Soigneur'],
        ['DPS', 'DPS'],
        ['Tank', 'Tank'],
    ],
    'type': [ '- Type -',
        ['Magique', 'Magique'],
        ['Physique', 'Physique'],
    ],
    'range': [ '- Port�e -',
        ['Courte port�e', 'Courte'],
        ['Longue port�e', 'Longue'],
    ],
};