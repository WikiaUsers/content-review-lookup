// Basic script to collapse nested thread quotes and add a button on each to uncollapse them
// cobbled together from various sources by Mooziq

(function ($, mw) {
    //cancel if page is not a thread
    if (mw.config.get("wgCanonicalNamespace") != "Thread") {
        return;
    }
    //build "Show Nested Quote" button ahead of time
    var collapsedbutton = $.parseHTML("<span class='jq-thread-collapser mw-collapsible-toggle'><button class='secondary'>Show&nbsp;Nested&nbsp;Quote</button></span>");
    //find nested quotes
    var nqlist = $(".msg-body > .quote > .quote");
    //cancel if we can't find nested quotes
    if (!nqlist || nqlist.length < 1) {
        return;
    }
    //hide nested quotes
    nqlist.slideUp();
    //add reference class and button
    nqlist.addClass("jq-collapsed-quote");
    nqlist.before(collapsedbutton);
    //add one-time click to unhide and remove button
    nqlist.parent().one(
        "click",
        ".jq-thread-collapser",
        function() {
            //locate hidden nested quote and unhide it
            var hnqchild = $(this).parent().find(".jq-collapsed-quote");
            if (hnqchild && hnqchild.length > 0){
                hnqchild.slideDown();
            }
            //locate button and remove it
            var cbchild = $(this).parent().find(".jq-thread-collapser");
            if (cbchild && cbchild.length > 0){
                cbchild.remove();
            }
        }
    );
}(jQuery, mediaWiki));