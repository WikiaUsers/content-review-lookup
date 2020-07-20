//fires mw.hook('jsspecialpage.ready').(JSSpecialPage) when ready to work (document is loaded, function is exists)
//chainable. backward compatible with direct JSSpecialPage calls
//hook:
//mw.hook('jsspecialpage.ready').add(function(e){e(pageName, content)});
//example:
//mw.hook('jsspecialpage.ready').add(function(e){e('myspecialpage', 'my content')('mypage2', 'mypage2 content')});
(function($) {

    function JSSpecialPage (pageName, content) {
        //page array. safe copy of - direct call protected from reassign in common.js and vice versa
        var pages = (window.JSSpecialPagePages || []).concat();
        
        //add data from direct call
        if (pageName && (typeof(pageName) == 'string')) {
            //nullified content allowed is
            //this is direct call with params, so whole array is not needed
            pages = [];
            pages.push({t: pageName, c: content});
        }//if pagename
        
        //is there smth to do
        if (!(pages.length && (wgNamespaceNumber == wgNamespaceIds.special))) return JSSpecialPage;
        //get settings
        if(wgCanonicalSpecialPageName == 'Specialpages') {
            //faster block, do it 1st
            lastGroup = $(mw.util.$content).find('#mw-specialpagesgroup-other + table > tbody');
            $.each(pages, function(i, v){
                lastGroup.find('tr:first-of-type td:first-of-type ul').append(
                    $('<li />').append(
                        $('<a />')
                            .attr('href','/wiki/Special:' + v.t)
                            .text(wgFormattedNamespaces[wgNamespaceIds.special] + ':' + v.t)
                    )
                );//append
            });//each pages
            return JSSpecialPage;//there is nothing to do anymore
        }//if specialpages

        //find title
        $.each(pages, function(i,v){
            //capitalize title
            v.t = v.t.slice(0, 1).toUpperCase() + v.t.slice(1);
            if (v.t == wgTitle) {
                pageName = v.t;
                content = v.c;
                return false;
            }//if t==title
            return true;
        });//each pages
        
        //no title found
        if (!pageName) return JSSpecialPage;
        
        if(wgNamespaceNumber == wgNamespaceIds.special && wgTitle == pageName) {
            //set content
            $('.page-header h1').text(wgTitle);
            document.title = wgTitle;
            $(mw.util.$content).html(content);
        }//if page
        return JSSpecialPage; //chaining
    }//jsspecialpage
    
    function init() {
        //heyoo, we are loaded yet
        mw.hook('jsspecialpage.ready').fire(JSSpecialPage);
        //build special pages if any
        //race condition between direct call(page1) and page2 from array where page1=page2 is intended by design
        JSSpecialPage();
    }//init
    
    //export function. backward compatibility
    window.JSSpecialPage = JSSpecialPage;
    //doc.ready
    $(init);
}(jQuery));