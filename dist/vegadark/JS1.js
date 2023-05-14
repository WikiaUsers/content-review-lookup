var linktarget="_blank" //Specify link target added to links when set to open in new window

var formcache=document.targetmain

function applywindow(){
if (typeof targetlinks=="undefined") return
if (!formcache || (formcache && formcache.targetnew.checked)){
for (i=0; i<=(targetlinks.length-1); i++)
targetlinks[i].target=linktarget
}
else
for (i=0; i<=(targetlinks.length-1); i++)
targetlinks[i].target=""
}


function collectElementbyClass(){
if (!document.all && !document.getElementById) return
var linksarray=new Array()
var inc=0
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++){
if (alltags[i].className=="nwindow")
linksarray[inc++]=alltags[i]
if (alltags[i].className=="nwindowcontainer"){
var alldivlinks=document.all? alltags[i].all.tags("A") : alltags[i].getElementsByTagName("A")
for (t=0; t<alldivlinks.length; t++)
linksarray[inc++]=alldivlinks[t]
}
}
return linksarray
}
if (formcache && formcache.targetnew.checked) //overcome IE bug, manually check checkbox that has "checked" attribute
setTimeout("document.targetmain.targetnew.checked=true",100)
var targetlinks=collectElementbyClass()
applywindow()