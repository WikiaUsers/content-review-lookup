window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/subnautica/images/d/de/Ajax-loader.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.UserTagsJS = {
    modules: {},
    tags: {
        rollback: { u: 'Rollback', order: 100 }
    }
};

UserTagsJS.modules.custom = {
   'Mesmerized': ['rollback'],
   'MorphGuy': ['rollback'],
   'Squidy_Frykas': ['rollback'],
};

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

var tooltips_list = [
    {
        classname: 'fauna-tooltip',
        parse: '{' + '{FaunaTable/<#fauna#>}}'
    },
    {
        classname: 'flora-tooltip',
        parse: '{' + '{FloraTable/<#flora#>}}'
    },
    {
        classname: 'coral-tooltip',
        parse: '{' + '{CoralTable/<#coral#>}}'
    },
    {
        classname: 'clade-tooltip',
        parse: '{' + '{CladeInfo/<#info#>}}'
    },
    {
        classname: 'databank-tooltip',
        parse: '{' + '{Databank2|<#info#>}}'
    },
    {
        classname: 'biome-tooltip',
        parse: '{' + '{BiomeTable/<#biome#>}}'
    }
];