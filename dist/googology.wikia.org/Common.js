// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (mw.config.get("wgCanonicalNamespace") !== "Special") && (mw.config.get("wgCanonicalNamespace") !== "MediaWiki");

// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (mw.config.get("wgCanonicalSpecialPageName") === "Undelete");

$(function () {
    if (enableMathJax) {
        importScriptURI("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});

$(function () {
    var name = 'googol giggol grangol gongulus triakulus bongulus googocci greagol golapulus colossol tridecal'.split(' ');
    name = name[Math.floor(name.length * Math.random())] + '...';
    $('#chatbox-ctr').append('<iframe src="https://webchat.freenode.net?nick=' + name + '&channels=%23%23googology&prompt=1&uio=MTE9MTEzcf" width="100%" height="400"></iframe>');
});

//Adding page jumping for blog post listings (click the #)
function trimPageToken(str){
	return (str.indexOf("?page=")==-1)?str:str.split("?page=")[0];
}
document.getElementsByClassName("paginator-spacer")[0].innerHTML='...&nbsp;<a onclick="var pageToScrollTo=prompt(\'Page number?\');window.location=trimPageToken(window.location+\'\')+\'?page=\'+pageToScrollTo;">#</a>&nbsp;...';