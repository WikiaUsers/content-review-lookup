/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// Изменение описания чата
importScript('MediaWiki:Chat-headline');
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});
// WRITTEN BY User:Rappy_4187
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["RGZV"]       = ["Основатель"],
    rights["TheImperios"]       = ["Переводчик"],
    rights["GeloMor"]       = ["Советник"];

  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js', /* Автообновление на страницах активности */
/*если есть ещё какие-то статьи, то можно писать их сюда*/
    ]
});

AjaxRCRefreshText = 'Автообновление';
AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

/*tooltip*/
var tooltips_config = {
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
}