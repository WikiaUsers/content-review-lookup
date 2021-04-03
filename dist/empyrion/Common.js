/* Any JavaScript here will be loaded for all users on every page load. */


//Below is imported from the wowpedia wiki, courtesy of PCJ. Adapted by [[User:Empexa|Empexa]] ([[User talk:Empexa|talk]]) 22:35, 24 October 2018 (UTC)
//It will allow to make links hoverable, with embedded content, from the page. See Template:Itemtip
//Implemented to support 'multi-referencing' : On links, you may specify 1-many classes, for it to work. One class must be 'ajaxttlink'. If none others are specified, it will import only the one on the target page, with class 'tooltip-content'. If two is supplied, 'ajaxttlink 2', it will attempt to import from target page 'tooltip-content2'. If you wish to import the 'unnamed' together with others, you can use 'X', as 'ajaxttlink 2 X', this will import 'tooltip-content' and 'tooltip-content2'. You may specify anything, and it will be ''+what you specified (2 = 'tooltip-content2', asdf = 'tooltip-contentasdf', etc). You may specify an unlimited amount, although the result might be questionable ;). Each result will be appended under the last, in its own box.

var article = "#bodyContent";

var Tooltips = {
    hideClasses: [],
    cache: {},
    activeHover: false,
    enabled: true,
    activeVersion: ''
};
var Linktips = {
    hideClasses: [],
    cache: {},
    activeHover: false,
    enabled: true,
    activeVersion: ''
};
var $tfb, $ttfb, $htt;

function hideTip() {
    $tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    $tfb.children().remove();
    if ($(this).data('ahl-id') == Tooltips.activeHover) Tooltips.activeHover = null;
}

function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    PrependImagesToLinks($htt.not(":empty"));
    moveTip(e);
}

function moveTip(e) {
    var $ct = $htt.not(":empty");
    var eh = $ct.innerHeight() + 20,
        wh = $(window).height();
    var newTop = e.clientY + ((e.clientY > (wh / 2)) ? -eh : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 20) : 20);
    newTop = Math.max(105, Math.min(wh - eh, newTop));
    $ct.css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips
function showTipFromCacheEntry(e, url, tag, n, ref) { 
    var h;
    var foundone = false; 
    $tfb.html("");
    for (var i = 0; i < tag.length; i++) {
        var n2 = n[i]; 
        if (n2) { 
            if (n[i] == "X" || n[i] == "") { 
                n2 = "X"; 
            } 
            var h = Tooltips.cache[url + " " + tag[i]];
            if (!h) {
                h = Tooltips.cache[url].find(tag[i]);
                if (h.length) Tooltips.cache[url + " " + tag[i]] = h;
            }
            if (h.length) {
                foundone = true;
                h.css("display", "").addClass("tooltip-content" + n2).addClass("tooltip-contentX"); 
                $tfb.html("<div class='tooltip-content" + n2+" tooltip-contentX'>"+h.html()+"</div>" + $tfb.html());
            }
        }
    }
    if (foundone == false) {
        $tfb.html('<div class="tooltip-contentX"><b>Notice</b><br />Trying backup-target</div>'); 
        var founddefault = false;
        for(var i=0;i<tag.length;i++){
            if(tag[i]=="div.tooltip-content"){
                 founddefault = true;
            }
        }
        if(founddefault==false){ //Should prevent looping, incase nothing is found at all
             showTip(e,ref); //Try to fallback on 'default'
        }else{
            $tfb.html('<div class="tooltip-contentX"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one. [' + n[0] + ']</div>'); 
        }
    }
    displayTip(e);
}

function showTip(e,f) { 
    var special=false;
    if(!f){
        f=$(this);
    }else{
        special=true;
    }

    var a = $(f).attr("class").split(" "),
        i;

    if(special==true){ //Fallback
        a=[];
        a[0]="";
    }
    if (!a) {
        a[0] = "";
    }
    var retarr = [];
    var retarr2 = []; 
    var ref=$(f);
    var cc = 0;
    if (a.length > 1) {
        cc = 1;
    }
    for (i = 0; i < a.length; i++) {
        var n = a[i];
        var n2 = n;
        if (i == 0 && a.length != 1) {} else {
            if (a[i] == "ajaxttlink" || a[i] == "X" || a[i] == "") {
                n = "";
                n2 = "X";
            }
            retarr[i] = n2; 
            if (!Tooltips.enabled) return;
            var $t = $(f),
                ks = Tooltips.hideClasses,
                $p = $t.parent();
            if ($p.hasClass("selflink") == false) {
                for (var j = 0; j < ks.length; j++) {
                    if ($t.hasClass(ks[j])) return;
                }
                var tooltipIdentifier = "div.tooltip-content" + n,
                    tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/);
                retarr2[i] = tooltipIdentifier;
                if ($t.hasClass("versionsttlink")) tooltipIdentifier += Tooltips.activeVersion;
                else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
                var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip-content' + n + '"]';
                var tipId = url + " " + tooltipIdentifier;
                Tooltips.activeHover = tipId;
                $t.data('ahl-id', tipId); 
                if (!Tooltips.cache[url]) { 
                    $('<div style="display: none"/>').load(url, function(text) {  
                        cc++;
                        if (!text) return; // Occurs when navigating away from the page cancels the XHR
                        Tooltips.cache[url] = $(this); 
                        if (tipId != Tooltips.activeHover) return;
                        if (cc == retarr.length) { 
                            showTipFromCacheEntry(e, url, retarr2, retarr,ref);
                        }

                    });
                } else {  
                    cc++;
                    if (cc == retarr.length) { 
                        showTipFromCacheEntry(e, url, retarr2, retarr,ref);
                    }
                }
            }
        }
    }
}

Tooltips.toggleTooltipClassDisplay = function(className, setTo) {
    var ci = this.hideClasses.indexOf(className);
    if (setTo === undefined) setTo = ci < 0;
    if (ci < 0 && setTo === false) {
        this.hideClasses.push(className);
    } else if (ci >= 0 && setTo === true) {
        this.hideClasses.splice(ci, 1);
    }
};
Tooltips.setActivePageVersion = function(versionName) {
    this.activeVersion = versionName;
};

// quick tooltips
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
    displayTip(e);
}

function bindTT() {
    var $t = $(this),
        $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
        $t.removeAttr("title");
	$p.removeAttr("title");
    }
}

function tooltipsInit(root) {
    if ($tfb == null) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
    }
    root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
    root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
        var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
        if (cn) $(this).find("span.ajaxttlink").addClass(cn);
    });
    root.find("span.ajaxttlink").each(bindTT);
    root.find("span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip).children("a").removeAttr("title");
}

// [[Template:ajax]]
function addAjaxDisplayLink() {
    $("table.ajax").each(function(i) {
        var table = $(this).attr("id", "ajaxTable" + i);
        table.find(".nojs-message").remove();
        var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
        var cell = table.find("td").first(),
            needLink = true;
        cell.parent().show();
        if (cell.hasClass("showLinkHere")) {
            var old = cell.html(),rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
            if (old!=rep) {
                cell.html(rep);
                needLink = false;
            }
        }
        if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
        table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
            event.preventDefault();
            var sourceTitle = table.data('ajax-source-page'),
                baseLink = mw.config.get('wgScript') + '?';
            cell.text('Please wait, the content is being loaded...');
            $.get(baseLink + $.param({
                action: 'render',
                title: sourceTitle
            }), function(data) {
                if (data) {
                    cell.html(data);
                    cell.find('.ajaxHide').remove();
                    cell.find('.darktable').removeClass('darktable');
                    if (cell.find("table.sortable").length) {
                        mw.loader.using('jquery.tablesorter', function() {
                            cell.find("table.sortable").tablesorter();
                        });
                    }
                    headerLinks.text('[');
                    headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({
                        action: 'edit',
                        title: sourceTitle
                    })));
                    headerLinks.append(document.createTextNode(']\u00A0['));
                    var shown = true;
                    $("<a href='javascript:;'>hide</a>").click(function() {
                        shown = !shown;
                        shown ? cell.show() : cell.hide();
                        $(this).text(shown ? "hide" : "show");
                    }).appendTo(headerLinks);
                    headerLinks.append(document.createTextNode(']'));
                    tooltipsInit(cell);
                }
            }).error(function() {
                cell.text('Unable to load table; the source article for it might not exist.');
            });
        });
    });
}

$(function() {
    PrependImagesToLinks($("#bodyContent"));
    tooltipsInit($(article));
    addAjaxDisplayLink();
});

/* Take all links, and transform them with a prepended icon, if the linked page contains an appropriate one, and the link is visible upon load. Written by [[User:Empexa|Empexa]] ([[User talk:Empexa|talk]]) 22:35, 24 October 2018 (UTC) */


function PrependImagesToLinks(element){  
$(element).find("a").each(function(){
if($(this).is(":visible") && $(this).css("opacity")>0 && $(this).parent().css("opacity")>0 && !$(this).hasClass("image") && !$(this).hasClass("gamepedia_pro_user") && !$(this).hasClass("gamepedia_user") && $(this).length==1 && !$(this).attr("accesskey")){
  
  if($(this).attr("href")&&$(this).attr("href")!=""){
    var thishref=$(this).attr("href");
    if(thishref.indexOf("https://")==0){
        thishref=thishref.replace("https://empyrion.gamepedia.com","");
    }else if(thishref.indexOf("http://")==0){
        thishref=thishref.replace("http://empyrion.gamepedia.com","");
    }
  
        if(thishref&&thishref!=""&&thishref.indexOf("/")==0&&!thishref.indexOf("/Category")==0){
            if($(this).text().length>3&&!$(this).find("img").length){ 
                //It's visible, it's not an image wrapper, it shouldn't be user related, it is in the body, it contains exactly one hit, it have a href, that is a gamepedia link, and isn't a category. And it have a text of more than 3 characters. And it does not contain an image already

                var tl=thishref.replace("/","");
                var ref=$(this);
                if(ref.prev().text()!=""||!ref.prev().html()){
                    //The previous element is not just an image
                    //Try resolve the link
                    var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent(tl)) + "&action=render " + 'table[class*="infobox"]'; 
                    if (!Linktips.cache[tl]) {
                        $('<div style="display: none"/>').load(url, function(text) {
                            if (!text) return; // Occurs when navigating away from the page cancels the XHR
                            Linktips.cache[tl] = $(this);   
                            showLinktipFromCacheEntry(url,tl,ref); 
                        });
                    } else {
                        showLinktipFromCacheEntry(url,tl,ref); 
                    }
                }
            }
        }
    }
    }
});
}

function showLinktipFromCacheEntry(url,tl,ref){
    //Prepend it  
    if(Linktips.cache[tl]){  
        var h = Linktips.cache[tl];
        if(h.length){ 
            var result=$('<div style="display:none;"/>').html($(h).html()).find("a.image:first").find("img");
            if(result.length){ 
                result=result.css({"width":"25px","height":"25px"});
                $(ref).prepend(result);
            }
        }
    } 
}