// **********************************************************************
// **                 ***WARNING GLOBAL GADGET FILE***                 **
// **             changes to this file affect many users.              **
// **           please discuss on the talk page before editing         **
// **                                                                  **
// **********************************************************************
// Imported from [[User:Alex Smotrov/edittop.js]], version as of: 2007-06-19T04:28:52
// Updated from [[User:TheDJ/Gadget-edittop.js]], version as of: 2009-04-28T11:54:22
if ((wgAction == 'view' || wgAction == 'purge') && wgNamespaceNumber >=0)
addOnloadHook(function edittop_hook(){
 var localtitles = {
   en: 'Edit lead section',
   fr: 'Modifier le résumé introductif',
   it: 'Modifica della sezione iniziale',
   ja: '導入部を編集'
 };
 var our_content = document.getElementById('content') || document.getElementById('mw_content') || document.body;
 var editspans = getElementsByClassName( our_content, "span", "editsection");
 var span1;
 for( es_count = 0; editspans && es_count < editspans.length; es_count++ )
 {
  span1 = editspans[es_count];
  if( span1.className.indexOf( "plainlinks" ) == -1 )
    break;
 }  
 if (!span1) return;
 var span0 = span1.cloneNode(true);
 var editwidth = span1.offsetWidth + 10;

 var topicons = getElementsByClassName( our_content, 'div', "topicon" );
 for( el=0; topicons && el < topicons.length; el++ )
 {
  topicons[el].style.marginRight  = editwidth+"px";
 }

 our_content = document.getElementById('mw_header') || document.getElementById('content') || document.body;
 var parent = our_content.getElementsByTagName('H1')[0];
 parent.insertBefore(span0, parent.firstChild);
 var a = span0.getElementsByTagName('A')[0];
 if (a.href.indexOf('&section=T') == -1){
   a.title = a.title.replace(/:.*$/,': 0')
   a.setAttribute('href', a.href.replace(/&section=\d+/,'&section=0'));
 }else{//transcluded
   a.title = localtitles['en']
   a.setAttribute('href', wgScript+'?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0')
 }
 if (localtitles[wgUserLanguage]) a.title = localtitles[wgUserLanguage]
})