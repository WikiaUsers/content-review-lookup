/* 
en-English Any JavaScript here will be loaded for all users on every page load. 
ja-Japanese ここにあるすべてのJavaScriptは、すべての利用者のどのページに対しても読み込まれます
*/

//------------------------------------------------------------
/* hrefButton */
function attachHandlers(){
    var e = document.getElementsByClassName('hrefButton');
    for (i = 0; i < e.length; i++){
      e[i].addEventListener('click', handleExternalLinkButton, false);
    }
}
function handleExternalLinkButton(){
    window.location.replace(this.getAttribute('data-href'));
}
 
attachHandlers();

//------------------------------------------------------------
/* AddRailModule */
window.AddRailModule = [
    {page: 'Template:RailModule/prepend', prepend: true},
    'Template:RailModule',
];

//------------------------------------------------------------
/*  */


//------------------------------------------------------------
/*  */


//------------------------------------------------------------
/*  */