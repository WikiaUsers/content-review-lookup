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

//Fixing out-of-alignment ol's with high numbers
var ols=document.getElementsByTagName("ol");
for(var i=0;i<ols.length;i++){
    var maxnum=ols[i].start+ols[i].childElementCount-1;
    if(maxnum>999){
        ols[i].style.paddingLeft=(-1+Math.floor(Math.log10(maxnum)*2)/4)+"em";
    }
}

//Adding page jumping for blog post listings (click the #)
var pageLocation=window.location+'';
document.getElementsByClassName("paginator-spacer")[0].innerHTML='...&nbsp;<a onclick="var pageToScrollTo=prompt(\'Page number?\');window.location=pageLocation.split(\'?page=\')[0]+\'?page=\'+pageToScrollTo;">#</a>&nbsp;...';

//Trying to fix forums (thread creation button). So far only works for Forum:Googology
document.getElementById("forumCreateThreadBox").innerHTML='<button onclick="window.location.href=(window.location.href).replace(\':Googology\',\':\'+( (x=prompt(\'Title?\')) ==\'Googology\' ? \'Forbidden thread title\' : x ));">Create new thread</button>';