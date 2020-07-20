importArticles({
    type: "script",
    articles: [
        'u:dev:ReferencePopups/code.js',
        'u:dev:ReferencePopups/custom.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:VisualSpellCheck/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:TwittWidget/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:AjaxEmoticons/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:GalleryButtonCustomText/code.js',
        'u:dev:View_Source/code.js',
        'u:dev:CacheCheck/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:DisableArchiveEdit/code.js', /* Discourage/disable the editing of talk page archives */
        'u:dev:Countdown/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:SkinSwitchButton/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:DisableArchiveEdit/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:CategoryRenameAuto-update/code.js'
    ]
});


/* ############################################# */
/* ##          CUSTOM EDIT BUTTONS            ## */
/* ############################################# */

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/godzilla/images/f/fa/Wikia_Button_-_Politically_Correct_Gallery.png",
            "speedTip": "Standard Gallery",
            "tagOpen": "<gallery widths='120' position='center' captionalign='center' spacing='small'>\r",
            "tagClose": "\r</gallery>",
            "sampleText": ""
    };

}

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/0/05/Wikia_Button_-_Kaiju_Infobox.png",
            "speedTip": "Role-Play Character Infobox",
            "tagOpen": "{{Role-Play Kaiju Infobox \r|type1            =White\r|type2            =White\r|name             =\r|image            =\r|caption          =\r|used             =[[\r|allies           =\r|enemies          =\r|height           = meters\r|length           = meters\r|faction          =\r|category         =\r}}",
            "tagClose": "",
            "sampleText": ""
    };