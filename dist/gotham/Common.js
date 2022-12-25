/* Any JavaScript here will be loaded for all users on every page load. */

window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'username': 'usergroup',
        'TheSonofNeptune': 'Retired Founder',
        'Devinthe66':'Bureaucrat',
        'Darkknight2149': 'System operator',
        'Kingsman28': 'System operator',
        'LukeAtkins87': 'System operator',
        'Frieza1500': 'System operator'
    }
};

/* Auto block message */
var MessageBlock = {
  title : 'Blocked',
  message : '{{Block|$2|$1}}',
  autocheck : true
};

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js'
    ]
});

 
$(function STemplateUI() {
  $(".ogg_player .image").remove();
});


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* References after */
$('ol.references > li').each(function() {
        if ($(this).children('sup').length > 0) {
                $(this).children('.reference-text').insertBefore($(this).children('sup:first'));
        }
});