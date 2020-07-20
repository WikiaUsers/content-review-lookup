/* Any JavaScript here will be loaded for all users on every page load. */

// hack to show debug info and if server has refreshed common.js
$("#WikiaPage").prepend('<div id="mydbg"><span style="white-space:pre-wrap;"><code>JS:  \
16:12, March 19, 2013 (UTC) \
<br />CSS: </code></span></div>');

function fix_chrome_rowspan($parent) 
{
    // hack to fix table height bug in chrome
    if (Boolean(window.chrome))
    {
        var mainsel = ".item .null_row";
        var imagesel = "#item_image";
        var slotsel = "#item_slot_row";
        var carriablesel = "#item_carriable_row";
        var titlesel = "#item_title_row";
        var $main;
        var $image;
        var $slot;
        var $carriable;
        var $title;
        var newHeight;
        
        if (!($parent))
        {
            $parent = $doc;
        }
        
        $main = $parent.find(mainsel);
        $image = $parent.find(imagesel);
        $slot = $parent.find(slotsel);
        $carriable = $parent.find(carriablesel);
        $title = $parent.find(titlesel);
        if ($main.length > 0) 
        {
            /* DOM offsetHeight used, since jquery height() is broken */
            newHeight = $image[0].offsetHeight -
                        $slot[0].offsetHeight - 
                        $carriable[0].offsetHeight;
            if ($title.length > 0) 
            {
                newHeight = newHeight - $title[0].offsetHeight;
            }
            $main.height(newHeight);
        }
    }
}

/* AJAX tooltips - START */

// hide tooltip function
function hideTip() 
{
    $ttm.hide();
    // restore link title
    $le.attr("title", tit); 
    // unbind hide handler
    $doc.off(hideev, hidehandl);
}

// set tooltip position
function moveTip() 
{
    // parent element = body content
    $pe = $bc;
    $w = $(window);
    lo = $le.offset();
    po = $pe.offset();
    // scrollbar position
    sl = $w.scrollLeft();
    st = $w.scrollTop();
    // coordinates of link element sides
    ll = lo.left - sl;
    lr = ll + $le.outerWidth();
    lt = lo.top - st;
    lb = lt + $le.outerHeight();
    // coords of parent sides
    pl = po.left - sl;
    pr = pl + $pe.outerWidth();
    pt = po.top - st;
    pb = pt + $pe.outerHeight();
    // coords of window sides
    wr = $w.width();
    wb = $w[0].offsetHeight;
    // dims of tooltip
    tw = $ttm.outerWidth();
    th = $ttm.outerHeight();
    // extra space
    ds = 10;
    
    function floatCoord(ttdim, link1, link2, par1, par2, winlim) {
    // 1/2: top/bottom or left/right coords
    // tt: tooltip
    // par: parent
    // winlim: window right/bottom limit
        
        /* coords of "edge" sides (tooltip should be inside window and 
        parent - see stacking context) */
        edge1 = Math.max(0, par1);
        edge2 = Math.min(winlim, par2);
        // available space
        avail1 = Math.max(0, link1-edge1);
        avail2 = Math.max(0, edge2-link2);
        availdim = Math.abs(edge2- edge1);
        // needed space
        need = ttdim + ds;
        // margin space
        marg = Math.ceil((availdim - ttdim)/2);
        
        // try to locate tooltip at one of link sides
        if (need < avail1) 
        {
            return link1 - need;
        }
        else if (need < avail2) 
        {
            return link2 + ds;
        }
        // if tooltip can't be located on one link side
        else 
        {
            // if there's no room in safe space, starts from one edge
            if (ttdim > availdim)
            {
                if (par2 < winlim) 
                {
                    return edge1;
                }
                else
                {
                    return edge2 - ttdim;
                }
            }
            // if there's room in safe space
            else
            {
                // if there's less margin space than hoped
                if (marg <= ds) 
                {
                    return edge1 + marg;
                }
                // if there's margin space enough, place where it's more nice
                else 
                {
                    if (avail1 < avail2)
                    {
                        return edge2 - need;
                    }
                    else
                    {
                        return edge1 + ds;
                    }
                }
            }
        }
    }
    
    tleft = floatCoord(tw, ll, lr, pl, pr, wr);
    ttop  = floatCoord(th, lt, lb, pt, pb, wb);
    
    $ttm.css({
        "position": "fixed",
        "left": tleft + "px",
        "top": ttop + "px"
    });
}

function showTip(e) 
{
    // only if left button, if you want to open directly with middle click
    if (e.which == 1)
    {
        // click don't follow page, but load tooltip
        e.preventDefault();
        
        // link element
        $le = $(this);
        tit = $le.attr("title");
        link = $le.attr("href");
        i = llist.indexOf(link);
        // fragment selector
        sel = "";
        
        fpos = link.search("#");
        if (fpos > -1) 
        {
            newLink = link.slice(0, fpos);
            sel = link.slice(fpos) + " ";
        }
        else 
        {
            newLink = link;
        }
        sel += "." + ttc;
        
        ttm_selector = "#" + ttmbase + i.toString();
        $ttm = $(ttm_selector);
        // tooltip wrapper
        $ttw = $ttm.find(".ttw");
        // go link
        $ttgo = $ttm.find("." + ttgo + " a");
        // loading... message
        $ttl = $ttm.find("." + ttl);
        // no tooltip content message
        $ttn = $ttm.find("." + ttn);
        
        
        // hide tooltip event
        hideev = "mouseup";
        // hide handler: hide tooltip if you click outside, but not on link. Hide 
        // also if you click inside empty part of $ttgo.
        hidehandl = function (e) {
                // clicked element
                $ce = $(e.target);
                // div containing "go to page" link
                $gd = $ttgo.parent();
                
                if (!($ttm.has($ce).length || $le.has($ce).length) || $ce.is($gd))
                {
                    hideTip();
                }
            }
        
        // show only if hidden, else hide
        if ($ttm.is(":hidden")) 
        {
            $le.removeAttr("title");
            
            // load only if not loaded already
            if (!(loaded[i])) 
            {
                // show tooltip with loading... message
                $ttm.show();
                moveTip();
                // link to page at the end of tooltip
                $ttgo.attr("href", link);
                console.log("console.log works");
                
                // manipulate tooltip after loading
                $ttw.on("load", function (change_event) {
                    moveTip();
                    fix_chrome_rowspan($ttm);
                    console.log("event binded and fired!");
                    $(this).off(change_event);
                });
                
                $ttw.load(newLink + "?action=render " + sel, function() {
                    loaded[i] = true;
                    $ttl.hide();
                    if ( !($(this).html()) ) 
                    {
                        // signal there's no tooltip content
                        $ttn.show();
                    }
                    else 
                    {
                        $ttc = $ttw.find("." + ttc);
                        // add tooltip style hack
                        if (!($ttc.has("."+tts).length)) 
                        {
                            $ttc.addClass(tts);
                        }
                        $ttc.css("display", "block");
                        // center if only text, link or span nodes
                        $ttc.not(":has(:not(a):not(span))").css("text-align", "center");
                    }
                });
            }
            else 
            {
                $ttm.show();
                moveTip();
            }
        }
        else 
        {
            hideTip();
        }
        
        // bind hide tooltip handler to document
        $doc.on(hideev, hidehandl);
    }
}

// MAIN FUNCTION
$doc = $(document);
$doc.ready( function() {
    
    fix_chrome_rowspan();
    
    // id of body content
    if (skin == "oasis") { 
        $bc = $("#WikiaArticle");
    }
    else 
    {
    // show/hide tooltip event
    hideev = "click";
        $bc = $("#bodyContent");
    }
    
    // tooltip style class
    tts = "itemtooltip";
    // class for identifying tooltip content
    ttc = "tooltip-content";
    // class for identifying ajax links
    alc = "ajaxttlink";
    // class for identifying "loading" message
    ttl = "ttl";
    // class for identifying "no content" message
    ttn = "ttn";
    // class for identifying "go to page" div
    ttgo = "ttgo";
    // start of id name of tooltip main divs
    ttmbase = "ttm";
    // class to make tooltips floating
    ttf = "tooltip-float";
    
    // ajax class elements
    $alist = $("." + alc);
    // ajax parent elements object - for normal link
    $aplist = $alist.parent().filter("a[href]");
    // ajax parent elements object - for links with images
    $aclist = $alist.children("a[href]");
    // total ajax elements
    $atlist = $aplist.add($aclist).filter(function(index) {
        // avoid external links
        re = new RegExp("^\/wiki\/")
        return re.test($(this).attr("href"));
    });
    // ajax links list
    llist = [];
    // list of loaded statuses of tooltips
    loaded = [];
    
    i = 0;
    $atlist.each(function() {
        l = $(this).attr("href");
        if (llist.indexOf(l) < 0) 
        {
            llist.push(l);
            loaded.push(false);
            
            // one div per tooltip with different content
            $bc.append(
                '<div id="' + ttmbase + i.toString() + '" class="' + ttf + '"> \
                    <div class="ttw"></div> \
                    <div class="' + ttl + ' ' + tts + '"> \
                        Loading... \
                    </div> \
                    <div class="' + ttn + ' ' + tts + '"> \
                        No content yet, you could add it! \
                    </div> \
                    <div class="' + ttgo + '"> \
                        <a href="">Go to page</a> \
                    </div> \
                </div>'
            );
            
            i += 1;
        }
    });
    
    // show tooltip on clik
    $atlist.on("click", showTip);
});

/* AJAX tooltips - END */

/* Fixed table headers - START */

// activate fixed table headers
$('#tablediv').scroll(fnScroll);

//function to support scrolling of first row and first column
function fnScroll() {
 $('#firstRow').scrollLeft($('#tablediv').scrollLeft());
 $('#firstCol').scrollTop($('#tablediv').scrollTop());
}

/* Fixed table headers - END */