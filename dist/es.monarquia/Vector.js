/* Any JavaScript here will be loaded for users using the Vector skin */
 
// !!'''Alternate stylesheets'''!! Can select from view->page style in firefox.
 
document.write('<link type="text/css" href="http://en.wikinews.org/w/index.php?title=Wikinews:Skins/vector-newspaper-back.css&action=raw&ctype=text/css" rel="alternate stylesheet" title="Newspaper background" media="screen,projection" \/>');
 
 
//to allow adding portlets easier for the namespace tabs
function addVectorNSTab (href, text, id, tooltip, accesskey, nextnode) {
           return addPortletLink('p-namespaces', href, text, id, tooltip, accesskey, nextnode) 
}
 
//some vector specific stuff for the comment namespace.
addOnloadHook(function() {
if (wgNamespaceNumber === 102) {
 var before = document.getElementById('ca-nstab-comments') ;
 var talk = addVectorNSTab(encodeURI(wgArticlePath.replace("$1", "talk:" + wgTitle)), "Discussion", "ca-main-talk", undefined, undefined, before);
 addVectorNSTab(encodeURI(wgArticlePath.replace("$1", wgTitle)), "Article", "ca-nstab-main", undefined, undefined, talk);
}
 
if (wgNamespaceNumber === 90) {
 
 var page = wgTitle.replace(/\/.*$/, '');
 page = page.replace(/^Comments:/, '');
 var before =  document.getElementById('ca-article');
 var talk = addVectorNSTab(encodeURI(wgArticlePath.replace("$1", "Talk:" + page)), "Discussion", "ca-main-talk", undefined, undefined, before);
 addVectorNSTab(encodeURI(wgArticlePath.replace("$1", page)), "Article", "ca-nstab-main", undefined, undefined, talk);
}
});