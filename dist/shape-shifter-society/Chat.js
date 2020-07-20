/* SCRIPT SETTINGS
   Due to how these scripts work, variable-type settings should be set before import */
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */
 
/* IMPORTS */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tabinsert.js', // Tab Insert
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js'
    ]
});