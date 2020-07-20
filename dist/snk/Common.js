// Ajax Batch Delete 
importScriptPage('AjaxBatchDelete/code.js', 'dev');

//AjaxRC
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
//

//Back To the Top
window.BackToTopModern = true;
window.BackToTopStart = 200;
//



//table cells background color by value: Yes / No
var tds = document.querySelectorAll('.tableCond td');
 
tds.forEach(tableCondition);
 
function tableCondition(i){
	if(i.innerText == "No")
		i.style.cssText = 'background-color: rgb(255, 192, 192); text-align: center';
	if(i.innerText == "Yes")
		i.style.cssText = 'background-color: rgb(192, 255, 192); text-align: center';
}
//