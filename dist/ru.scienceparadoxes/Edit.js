/* <pre> */

function addFuncButton(img, tip, func){
 var toolbar = document.getElementById('toolbar')
 if (!toolbar) return
 var i=document.createElement('img')
 i.src=img; i.alt=tip;  i.title=tip; i.onclick=func; i.style.cursor='pointer'
 toolbar.appendChild(i)
}
importScript("MediaWiki:Wikifier.js");
importScript("MediaWiki:StdSummary.js");

/* </pre> */