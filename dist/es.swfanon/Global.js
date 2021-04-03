// *****************************************************************
// &bot=1 on contribs pages. 
// *****************************************************************
function hiderollback() {
  var botlink = document.location.href;
  if(botlink.indexOf('?')==-1) {
    botlink += '?bot=1';
  } else {
    botlink += '&bot=1';
  }
  addPortletLink('p-cactions', botlink, '&bot=1', 'ca-bot');
}
if((skin == "monobook")&&(wgCanonicalSpecialPageName == 'Contributions')) addOnloadHook(hiderollback)