if (mwCustomEditButtons) {
   
mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
"speedTip": "Insert a comment visible only by editors",
"tagOpen": "<!-- ",
"tagClose": " -->",
"sampleText": "Insert comment here"
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/a/a0/Button_references_alt.png",
"speedTip": "Insert a list of references",
"tagOpen": "=== Sources ===\n<references />",
"tagClose": "",
"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png",
"speedTip": "Insert a reference",
"tagOpen": "<ref>",
"tagClose": "</ref>",
"sampleText": "Insert reference"
};

}

// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");

// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete");

$(function () {
    if (enableMathJax) {
        importScriptURI("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});

/*
$(function () {
    if (~'Cloudy176 FB100Z LittlePeng9'.split(' ').indexOf(wgUserName) && !SteveUrkelCovenant) {
        document.body.style.backgroundImage = 'url("http://netdna.tvovermind.com/wp-content/uploads/2012/11/steve-urkel-gif-15.gif")';
    }
});
*/

$(function () {
    var name = 'googol giggol grangol gongulus triakulus bongulus googocci greagol golapulus colossol tridecal'.split(' ');
    name = name[Math.floor(name.length * Math.random())] + '...';
    $('#chatbox-ctr').append('<iframe src="https://webchat.freenode.net?nick=' + name + '&channels=%23%23googology&prompt=1&uio=MTE9MTEzcf" width="100%" height="400"></iframe>');
});