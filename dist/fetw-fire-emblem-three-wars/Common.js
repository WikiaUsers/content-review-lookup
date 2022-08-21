/* Any JavaScript here will be loaded for all users on every page load. */
var iframes = document.getElementsByClassName("iframe");
for (var i=0; i<iframes.length; i++) {
    iframes[i].innerHTML='<iframe width="' + iframes[i].getAttribute("data-width") + '" height="' + iframes[i].getAttribute("data-height") + '" src="' + iframes[i].getAttribute("data-src") + '" frameborder="'+iframes[i].getAttribute("data-frameborder") +'"></iframe>';
}