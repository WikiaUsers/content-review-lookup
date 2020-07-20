// Zusammenfassungen
importScriptPage("MediaWiki:Standard_Edit_Summary/code.js", "dev");
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: false,
    select: [
        '(Wählen)',
        'Vandalismus/Spam', [
            'Reverting [[w:help:vandalism|vandalism]]',
            '[[w:help:spam|Spam]]',
            'Reverting [[w:help:vandalism|vandalism]] or [[w:help:spam|Spam]]',
            'Adding default profile',
            '[http://www.wikia.com/Terms_of_Use ToU Violation]'
         ],
        'VSTF-Wiki', [
            'Adding spam reports',
            'Adding spam wikis',
            'Adding vandalism reports',
            'Removing duplicates'
         ]
    ]
};