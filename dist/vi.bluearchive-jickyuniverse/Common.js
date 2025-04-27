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
// THE BELOW CODE randomly changes text above top navigation from "Jicky Universe Wiki" to one from the list
//////////////////////////////////////////////////////////////////// */

var number_of_wiki_names = 6;
var wiki_name_number = 0;

while (wiki_name_number < 1 || wiki_name_number > number_of_wiki_names) {
  wiki_name_number = Math.random().toFixed(2) * 100;
};
var wiki_name_text=["Tất cả đã nằm trong kế hoạch của tao 👽", "tôi thật là tà ma khi mà stream xuyên đêm 10 tiếng đồng hồ 🐧", "I love blast people head with my revolver.", "Thk Simp lỏ Hanako :) Wiki", "Jick Universe - Ngân hà hạnh phúc", "Vanitas Vanitatum Et Omnia Vanitas"][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

/* còn lại các code javascript mà wiki này sử dụng đều đã sử dụng hợp lý ở MediaWiki:ImportJS */