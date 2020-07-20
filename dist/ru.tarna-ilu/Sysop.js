function addContentSubLink(url, name){
 var cSub = document.getElementById('contentSub')
 if (!cSub) return
 if (cSub.lastChild && cSub.lastChild.nodeName == 'A') 
   cSub.appendChild(document.createTextNode(' · '))
 var aa=document.createElement('a')
 aa.href=url
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Edit-clear.svg/10px-Edit-clear.svg.png'
 i.style.marginRight = '3px'
 aa.appendChild(i)
 aa.appendChild(document.createTextNode(name))
 cSub.appendChild(document.createTextNode(' '))
 cSub.appendChild(aa)
}


function sysopHideRevDel(){
 sysRevDelCSS = appendCSS('span.mw-revdelundel-link {display:none}')
 sysRevDelCSS = sysRevDelCSS.sheet || sysRevDelCSS
 addContentSubLink('javascript:sysRevDelCSS.disabled=!sysRevDelCSS.disabled;void 0','Скрытие правок')
} 


function sysopStart(){
 switch (wgAction){
  case 'edit': case 'submit': break
  case 'delete': importScript_('MediaWiki:SysopDelete.js'); break
  case 'history': importScript_('MediaWiki:SysopHistory.js'); break
  case 'protect': case 'unprotect': importScript_('MediaWiki:SysopProtect.js'); break
  case 'view':
   if (/Contributions|Log|Undelete/.test(wgCanonicalSpecialPageName) && wgTitle!='AbuseLog') sysopHideRevDel(); break
 }
}

addOnloadHook(sysopStart)