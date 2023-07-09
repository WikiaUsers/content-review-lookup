/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Any JavaScript here will be loaded for all users on every page load. */
// *********************************************************
// Dead Videos via Special:BlankPage?blankspecial=deadvideos
// *********************************************************
 
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'deadvideos'
) {
    window.deadVideosCategories = ['Videos'];
 
    importArticle({
        type: 'script',
        article: [
            'w:c:mlp:MediaWiki:Common.js/DeadVideos.js'
        ]
    });
}
/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});
/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE randomly changes text above top navigation from "Marvel Database" to one from the list
//////////////////////////////////////////////////////////////////// */

var number_of_wiki_names = 6;
var wiki_name_number = 0;

while (wiki_name_number < 1 || wiki_name_number > number_of_wiki_names) {
  wiki_name_number = Math.random().toFixed(2) * 100;
};
var wiki_name_text=["Mỗi ngày trở nên tươi sáng hơn", "Ngươi cũng không phải là chính mình...", "Không có lý do gì để chạy. Bạn đang chạy trốn khỏi ai?", "Bạn đã đến Hiệp hội huyền bí Bythorne, tôi có thể giúp gì cho bạn?", "Tôi đang ở trong nhà của bạn.", "Dậy đi Joseph"][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

/* còn lại các code javascript mà wiki này sử dụng đều đã sử dụng hợp lý ở MediaWiki:ImportJS */