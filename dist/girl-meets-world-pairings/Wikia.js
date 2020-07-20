/* Username Replace */
function replace(elem, text){
    var txt = text;
    var el = elem;
    $(el).html(txt);
}

$(document).ready(function(){
    replace('span.username', wgUserName);
});

/* Collapsible Tables */
$('table.collapsible tr:first-child th').on('click', function(){
    $('table.collapsible .collapsible-cell').parent().slideToggle();
});

$('table.collapsible tr:first-child th').css('cursor', 'pointer');
/* Main Page Navigation */
var m = $('.mw-content-ltr .GMWP-mainpage-navigation').find('.GMWP-navigation');

if (!m.length){
    var navHTML =
        '<section class="GMWP-navigation mainpage-navigation" id="GMWP-navigation" title="This is a JavaScript-generated main page navigation module.">' +
            '<h3>Help</h3>' +
            '<ul class="GMWP-navlist">';
    var navList = ["Wiki Activity", "Recent Changes", "Rules", "Manual of Style", "Standards"];
    var navLink = ["/wiki/Special:WikiActivity", "/wiki/Special:RecentChanges", "/wiki/Project:Rules", "/wiki/Project:Manual_of_Style", "/wiki/Project:Standards"];
    for (var n1 = 0; n1 < navList.length; n1++){
        navHTML += '<li><a href="' + navLink[n1] + '">' + navList[n1] + '</a></li>';
    }
    navHTML += '</ul>' +
               '<h3>Pages</h3>' +
               '<ul class="GMWP-navlist">';
    var navList2 = ["All Pages", "Profile", "Talk", "Help", "New Photos"];
    var navLink2 = ["/wiki/Special:AllPages", "/wiki/Special:MyPage", "/wiki/User_talk:" + encodeURI(wgUserName), "Help:Contents", "Special:NewFiles"];
    for (var n2 = 0; n2 < navList2.length; n2++){
        navHTML += '<li><a href="' + navLink2[n2] + '">' + navList2[n2] + '</a></li>';
    }
    navHTML += '</ul>' +
               '<h3>Other</h3>' +
               '<ul class="GMWP-navlist">';
    var navList3 = ["Chat", "Forum", "Random Page"];
    var navLink3 = ["/wiki/Special:Chat", "/wiki/Special:Forum", "/wiki/Special:Random"];
    for (var n3 = 0; n3 < navList3.length; n3++){
        navHTML += '<li><a href="' + navLink3[n3] + '">' + navList3[n3] + '</a></li>';
    }
    navHTML += '</ul>' +
           '</section>';
    $('.mw-content-ltr .GMWP-mainpage-navigation').append(navHTML);
}


window.MessageWallUserTags = {
    users: {
        // Bureaucrats
        'Riley-Matthews121': 'Founder',
        'Ultimate Dark Carnage': 'Bureaucrat'
        // Administrators
        // Chat Moderators
        // Rollbacks
    }
};

(function($, config) {
    //Setup configuration options, internal variables, and default values:
    var tagColor = config.tagColor || 'black',
        glow = config.glow || false, //Text-shadow effect: true/false
        glowColor = config.glowColor || '#f77',
        glowSize = config.glowSize || '20px', //Text-shadow size in pixels
        users = config.users || {}, //List of users to tag and what the tag will say
        txtShadow = ''; //Internal text shadow variable — nothing by default

    //Set the size and color of the text shadow if it's enabled
    if (glow === true) {
        txtShadow = '0 0 ' + glowSize + ' ' + glowColor;
    }

    //Main function
    function init() {
        for (var name in users) {
            $('a.subtle[href$="Message_Wall:' + name.split(' ').join('_') + '"], a.subtle[href$="User_talk:' + name.split(' ').join('_') + '"]')
                .after('<span class="MessageWallUserTag ' + users[name].toLowerCase().split(' ').join('-') + '">' + users[name] + '</span>');
            $('.MessageWallUserTag').css({
                color: tagColor,
                marginLeft: '-2px',
                fontFamily: 'arial',
                fontSize: '10px',
                textShadow: txtShadow,
                verticalAlign: 'top'
            });
        }
    }
    init();
}(jQuery, window.MessageWallUserTags));

/*
window.module = {
    content: 
};

(function($, module){
    var heading = module.heading || 'Featured Pairing',
        content = module.content || null;

    function createModule(){
        var mod = $('#WikiaRail').find('section#FeaturedModule');
        if (!mod.length){
            var module1 = 
                '<section class="FeaturedModule module" id="FeaturedModule">' +
                    '<h1>' + heading + '</h1>' +
                    '<div class="module-content">' 
                        + content +
                    '</div>'
                '</section>';
            $('#WikiaRail').append(module1);
        }
    }
    $(document).ready(createModule);
}(jQuery, window.module));
*/
/*
window.floatingTODO = 0;

if (window.floatingTODO < 1){
    window.floatingTODO = 1;
    var toDoList =
        '<nav class="FloatingToDoList">' +
            '<h1>To-Do List</h1>' +
        '</nav>';
    $.getJSON('/api.php?action=parse&text={{' + wgUserName + '/Todo}}&format=json', function(data){
        var c = data.parse.text['*'];
        $('.FloatingToDoList').append(c);
    });
    if (wgPageName == 'User:' + wgUserName){
        $('.WikiaArticle').append(todoList);
    }
}
*/

window.rulesNav = {
    navitems: [{
        label: 'General Rules',
        link: '/wiki/Project:Rules'
    }, {
        label: 'Image Rules',
        link: '/wiki/Project:Rules/Uploading_Rules'
    }, {
        label: 'Blog Rules',
        link: '/wiki/Project:Rules/Blog_Rules'
    }, {
        label: 'Chat Rules',
        link: '/wiki/Project:Rules/Chat_Rules'
    }]
};

(function($, mw, rulesNav){
    var navitems = rulesNav.navitems || [];

    function initiate(){
        var h = '<section class="GMWP-rules"></section>';
        for (var n = 0; n < navitems.length; n++){
            var itemhtml = '<li data-label="' + navitems[n].label + '"><a href="' + navitems[n].link + '">' + navitems[n].label + '</a></li>';
            $('section.GMWP-rules nav.GMWP-rules-nav ul').append(itemhtml);
        }
        $('section.GMWP-rules').prepend('<nav class="GMWP-rules-nav"><ul></ul></nav>');
        $('.GMWP-rules-wrapper').append(h);
    }

    $(document).ready(initiate());
})();