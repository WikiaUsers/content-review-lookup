var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");

enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete");
 
addOnloadHook(function () {
    if (enableMathJax) {
        importScriptURI("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});
 
 
addOnloadHook(function () {
    if (~'Cloudy176 FB100Z LittlePeng9'.split(' ').indexOf(wgUserName) && !SteveUrkelCovenant) {
        document.body.style.backgroundImage = 'url("http://netdna.tvovermind.com/wp-content/uploads/2012/11/steve-urkel-gif-15.gif")';
    }
});
 
addOnloadHook(function () {
    var name = 'googol giggol grangol gongulus triakulus bongulus googocci greagol golapulus colossol tridecal'.split(' ');
    name = name[Math.floor(name.length * Math.random())] + '...';
    $('#chatbox-ctr').append('<iframe src="http://webchat.freenode.net?nick=' + name + '&channels=%23%23googology&prompt=1&uio=MTE9MTEzcf" width="100%" height="400"></iframe>');
});