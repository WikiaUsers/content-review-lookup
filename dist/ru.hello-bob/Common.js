window.railWAM = {
    logPage:"Project:WAM Log"
};
var username = wgUserName;
if (username) {$('.InsertTheUsername').text(username);}
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Обновлять страницу автоматически';
window.UserTagsJS = {
    modules: {
        inactive: 10,
        newuser: {
            days: 5,
            edits: 15
        },
        metafilter: {
            'sysop': ['bureaucrat']
        }
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:ThreadIndicator/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:UserTags/code.js',

    ]
});