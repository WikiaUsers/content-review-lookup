var article = ".page-content";

var Tooltips = {
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
function showTipFromCacheEntry(e, url, tag, n, ref,tags) { 
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
                $tfb.html($tfb.html() + "<div style='display:inline-block;' class='tooltip-content" + n2+" tooltip-contentX'>"+h.html()+"</div>");
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
            $tfb.html('<div class="tooltip-contentX"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>'); 
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
            tagOutput = 'div[class*="tooltip-content' + n + '"]';
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
                if (n == "-multiple") {
                	retarr2 = [];
	            	multiTagOutput = "-";
	            	tags = $(f).data("tt-tags");
	            	for (var tag in tags) {
	            		if (tag > 0) multiTagOutput += '"],div[class*="tooltip-content-';
	            		multiTagOutput += tags[tag].replace(/[ ()]/g,'_');
	            		retarr[tag] = 'X';
	            		retarr2[tag] = "div.tooltip-content-"+tags[tag].replace(/[ ()]/g,'_');
	            	}
	            	tagOutput = 'div[class*="tooltip-content' + multiTagOutput + '"]';
                }
                if ($t.hasClass("versionsttlink")) tooltipIdentifier += Tooltips.activeVersion;
                else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
                var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&redirect=no&action=render " + tagOutput;
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
    $ttfb.html('<div class="tooltip-content"><div class="mainbordercolor1px main-tooltip" style="padding: 5px;">' + $(this).next().html() + '</div></div>');
    displayTip(e);
}

function bindTT() {
    var $t = $(this),
        $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
        
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
    root.find("span.ajaxttlink,img.ajaxttimg").each(bindTT);
    root.find(".character-icon a, .panel-icon a").removeAttr("title");
    root.find("span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip).find("a").removeAttr("title");
}

$(function() {
	$('#bodyContent').addClass('page-content');
    tooltipsInit($(article));
});