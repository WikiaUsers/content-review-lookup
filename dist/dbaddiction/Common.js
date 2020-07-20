/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        'u:dev:LastEdited/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'MediaWiki:Common.js/gridfiltering.js',
        'MediaWiki:Common.js/gridfixer.js',
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};


gridContainer = '#champion-grid';
gridFilters = {
    'name': 'search',
    'role': [ '- Role  -',
        ['Healer', 'Healer'],
        ['DPS', 'DPS'],
        ['Tank', 'Tank'],
    ],
    'type': [ '- Type -',
        ['Magical', 'Magical'],
        ['Physical', 'Physical'],
        ['Dual', 'Dual'],
        ['Non-Elemental', 'Non-Elemental'],
    ],
    'range': [ '- Range -',
        ['Melee', 'Melee'],
        ['Ranged', 'Ranged'],
    ],
};