// This is a modification of http://animaljam.wikia.com/wiki/MediaWiki:CollapseThreadQuote.js
// It is meant to add a toggle button on nested quotes so that they can be revealed or collapsed at the user's discretion.
// cobbled together from various sources by Mooziq
 
(function ($, mw) {
    //cancel if page is not a thread
    if (mw.config.get("wgCanonicalNamespace") != "Thread") {
        return;
    }
    //build "Show/Hide Nested Quote" button ahead of time
    var collapsedbutton = $.parseHTML("<span class='jq-thread-collapser mw-collapsible-toggle'><button class='secondary'>Show Nested Quote</button></span>");
    //find nested quotes
    var nqlist = $(".msg-body > .quote > .quote");
    //cancel if we can't find nested quotes
    if (!nqlist || nqlist.length < 1) {
        return;
    }
    //hide nested quotes
    nqlist.slideUp();
    //add reference class and button
    nqlist.addClass("jq-collapsible-quote");
    nqlist.before(collapsedbutton);
    
    //build reusable function for revealing nested quotes
    function nqreveal() {
        //cancel if we can't find parent node
        var nqparent = $(this).parent();
        if (!nqparent || nqparent.length < 1){
            return;
        }
        //locate collapsible nested quote and unhide it
        var hnqchild = nqparent.find(".jq-collapsible-quote");
        if (hnqchild && hnqchild.length > 0){
            hnqchild.slideDown();
        }
        //locate button and change text
        var cbchild = $(this).find("button");
        if (cbchild && cbchild.length > 0){
            cbchild.text("Hide Nested Quote");
        }
        //add click handler to hide the quote
        nqparent.one(
            "click",
            ".jq-thread-collapser",
            nqcollapse
        );
    }
    
    //build reusable function for collapsing nested quotes
    function nqcollapse() {
        //cancel if we can't find parent node
        var nqparent = $(this).parent();
        if (!nqparent || nqparent.length < 1){
            return;
        }
        //locate collapsible nested quote and hide it
        var hnqchild = nqparent.find(".jq-collapsible-quote");
        if (hnqchild && hnqchild.length > 0){
            hnqchild.slideUp();
        }
        //locate button and change text
        var cbchild = $(this).find("button");
        if (cbchild && cbchild.length > 0){
            cbchild.text("Show Nested Quote");
        }
        //add click handler to show the quote
        nqparent.one(
            "click",
            ".jq-thread-collapser",
            nqreveal
        );
    }
    
    //add click handler to show the quote initially
    nqlist.parent().one(
        "click",
        ".jq-thread-collapser",
        nqreveal
    );
}(jQuery, mediaWiki));