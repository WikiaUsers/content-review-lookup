/* 1. Динамичный фон, время */
/* 2. Какие-то функции */
/* 3. Блок «Новые статьи» */

/* Динамичный фон, время */
$(function () {
 var d = new Date();
 if (d.getHours() < 5) {
 document.body.className += ' BG4';
 }
 else if (d.getHours() < 10) {
 document.body.className += ' BG1';
 }
 else if (d.getHours() < 17) {
 document.body.className += ' BG2';
 }
 else if (d.getHours() < 22) {
 document.body.className += ' BG3';
 }
 else if (d.getHours() < 24) {
 document.body.className += ' BG4';
 }
});

/* Какие-то функции */
/*** Functions **************************************************************
 * Small functions for Oasis that are used within other functions
 ****************************************************************************/
function newSidebarSection(idName, title, content)//creates sidebar and returns element control
{
  var topSS = getFirstSidebarElement();
  if(!topSS) return;
  var sSec = document.createElement("section");
  sSec.id = idName;
  sSec.className = idName + " module";
  sSec.innerHTML = '<h1 class="activity-heading">' + title + '</h1>\n' + (content.tagName ? "" : content);
  if(content.tagName) sSec.appendChild(content);
  topSS.parentNode.insertBefore(sSec,topSS);
  return document.getElementById("idName");
}
 
function getFirstSidebarElement()
{
 var afterBox = document.getElementById("ArticleInformationBox");
  if(!afterBox){
    afterBox = document.getElementById("LatestPhotosModule");
    for(var i = 0; i < wgUserGroups.length; i++)
    {
      if(wgUserGroups[i] == "user")
      {
         afterBox = document.getElementById("WikiaRecentActivity");
         break;
      }
    }
  }
  if(!afterBox){afterBox = document.getElementById("ircBox");}
  if(!afterBox)
  {
    if(rail){rail.innerHTML = rail.innerHTML + '\n<div id="lastSidebarModule"></div>';
    afterBox = document.getElementById("lastSidebarModule");}
  }
  return afterBox;
}

//============================================================
// Блок «Новые статьи» с [[Шаблон:NewPagesModule]] внутри.

$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});