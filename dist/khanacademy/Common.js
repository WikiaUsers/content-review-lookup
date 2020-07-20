/***** JavaScript placed here will be loaded for all users on every page load. *****/

/** [JS] Goals | http://codepen.io/rbobrowski/pen/likvA | [[:User:Cyan Wind]] **/
var headers = ["H1", "H2", "H3", "H4", "H5", "H6"];

$(".accordion").click(function(e) {
  var target = e.target,
    name = target.nodeName.toUpperCase();
  if ($.inArray(name, headers) > -1) {
    var subItem = $(target).next();

    //slideUp all elements (except target) at current depth or greater
    var depth = $(subItem).parents().length;
    var allAtDepth = $(".accordion p, .accordion div").filter(function() {
      if ($(this).parents().length >= depth && this !== subItem.get(0)) {
        return true;
      }
    });
    $(allAtDepth).slideUp("fast");

    //slideToggle target content
    subItem.slideToggle("fast");
  }
});

/** [Template] USERNAME | http://templates.wikia.com/wiki/Template:USERNAME | [[:User:TibetPrime]] **/
$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});

/** Opens chat in a new window for homepage **/
$(".openchat a").click(function() {
  window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
  return false;
});



importArticles({
    type: 'script',
    articles: [
        'u:dev:WallGreetingButton/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserTags/code.js'

    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});

importScriptPage('ListAdmins/code.js', 'dev');

window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

importScriptPage('ChatAnnouncements/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditPages/code.js'
    ]
});

nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');

pageNames = [
    'PAGENAMEWITHOUTPREFIX',
    'ANOTHERPAGENAMEWITHOUTPREFIX'
];
pageData = [
    'DATAFORFIRSTPAGEINABOVELIST',
    'DATAFORSECONDPAGEINABOVELIST'
];
pagePurpose = [
    'PURPOSEOFFIRSTPAGE',
    'PURPOSEOFSECONDPAGE'
];
importScriptPage('Mediawiki:CreateSpecialPage/code.js','dev');