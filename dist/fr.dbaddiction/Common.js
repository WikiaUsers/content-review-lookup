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
    'role': [ '- Rôle  -',
        ['Soigneur', 'Soigneur'],
        ['DPS', 'DPS'],
        ['Tank', 'Tank'],
    ],
    'type': [ '- Type -',
        ['Magique', 'Magique'],
        ['Physique', 'Physique'],
    ],
    'range': [ '- Portée -',
        ['Courte portée', 'Courte'],
        ['Longue portée', 'Longue'],
    ],
};