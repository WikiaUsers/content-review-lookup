/* Any JavaScript here will be loaded for all users on Routers page load. */
/* Does not serve phones */

// JavaScript Document
// Changes some content of the Router Poll page to customize the polls and tables. 
// Last edited 2014-01-10 by SouthpawKB

var pollContent=document.getElementById('WikiaArticle');
var formCount=pollContent.getElementsByTagName("form").length;
    for (var eachForm=0;eachForm<formCount;eachForm++){
	var list=pollContent.getElementsByTagName("form")[eachForm];
	list.getElementsByTagName("input")[3].setAttribute("type","image");
	list.getElementsByTagName("input")[3].setAttribute("src","https://images.wikia.nocookie.net/republic-wireless/images/3/39/VoteBtn4.jpg");
        list.getElementsByTagName("input")[3].setAttribute("alt","Register mine");
        list.getElementsByTagName("input")[3].setAttribute("value","Register mine");
        list.getElementsByTagName("input")[3].setAttribute("name","Register mine");
        list.getElementsByTagName("input")[3].setAttribute("title","Register mine");
 	list.children[1].children[0].children[1].children[1].style.backgroundColor="#75c36d";
	list.children[1].children[1].children[1].children[1].style.backgroundColor="#cf7053";
// get value of vote count
var yesCount=list.children[1].children[0].children[1].children[0].innerHTML;
var noCount=list.children[1].children[1].children[1].children[0].innerHTML;
// replace mouseover percentage value with the same number that's already there.
list.children[1].children[0].children[1].children[0].setAttribute('title', yesCount);
list.children[1].children[1].children[1].children[0].setAttribute('title', noCount);

// replace "Y" with checkmark image

var oldYRadio=list.getElementsByTagName("label")[0].innerHTML;
var truncYRadio=oldYRadio.substring(0, oldYRadio.length - 4);
var newYRadio=truncYRadio+"<img src=\"https://images.wikia.nocookie.net/republic-wireless/images/0/04/Check.gif\" alt=\"Y\" />";
list.getElementsByTagName("label")[0].innerHTML=newYRadio;

// replace "N" with x image
var oldNRadio=list.getElementsByTagName("label")[1].innerHTML;
var truncNRadio=oldNRadio.substring(0, oldNRadio.length - 4);
var newNRadio=truncNRadio+"<img src=\"https://images.wikia.nocookie.net/republic-wireless/images/2/29/X.gif\" alt=\"N\" />";
list.getElementsByTagName("label")[1].innerHTML=newNRadio;

}

// Control width of poll column, despite fluid layout 2014/01/09

var tableCount=pollContent.getElementsByTagName("table").length;

for (var eachTable=0;eachTable<tableCount;eachTable++){

	var routerCells=pollContent.getElementsByTagName("table")[eachTable];
	routerCells.children[0].children[0].children[4].style.width="195px";
	var routerCellsWidth=routerCells.children[0].children[0].children[4].style.width;
	 
}