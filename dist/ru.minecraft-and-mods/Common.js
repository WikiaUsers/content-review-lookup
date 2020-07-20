/* Автосообщение о блокировке */
var MessageBlock = {
  title : 'Блокировка',
  message : 'Вы были заблокированы за нарушение правил вики.'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
/* Статусы участников */
function addMastheadTags() {
    var rights = {};
 
    rights["HETY HIKOGO"] = ["Бог криперов"],
    rights["King Of Foxes"] = ["Высший гаст"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for(var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    } 
};
 
$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});