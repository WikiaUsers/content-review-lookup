importArticles({
    type: 'script',
    articles: [
        'u:dev:NullEditButton/code.js'
        ...
  'w:c:dev:Voice_Output/code.js',
  ...
        'u:dev:Standard_Edit_Summary/code.js'
        'u:dev:CustomGalleryButton.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Voice_Dictation/voice.js"
    ]
});


PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

var ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js','dev');

importScriptPage('Category_Sorter/code.js', 'dev');