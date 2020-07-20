// <syntax type="javascript">

/* Import Articles Start */

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

var SocialMediaButtons = {
    position: "top",
    colorScheme: "color",
    buttonSize: "20px"
};

window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.MessageWallUserTags = {
    tagColor: '#01779C',
    glow: false,
    glowSize: '15px',
    glowColor: '#65AFC4',
    users: {
        'Celestetwit': 'Administrator',
        'Win1997': 'Bureaucrat, Administrator'
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:CollapsibleInfobox/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});

$('#WallNotifications .bubbles').append('<img class="envelope" src="https://images.wikia.nocookie.net/utanoprincesama/images/8/83/Envelope-pink.png">');