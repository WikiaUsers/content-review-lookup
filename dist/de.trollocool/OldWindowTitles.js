var title=document.getElementsByTagName("TITLE")[0];
var titletext=title.innerHTML;
var titletexts=titletext.split('|')
var newtitletext=titletexts[0]+'-'+titletexts[1];
title.innerHTML=newtitletext;