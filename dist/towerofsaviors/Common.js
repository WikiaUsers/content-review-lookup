importArticles({
    type: "script",
    articles: [
        "MediaWiki:Timer.js",
        "MediaWiki:Slideshow.js",
        "u:dev:BackToTopButton/code.js",
/*        "u:dev:FloatingToc/code.js", */
        "u:dev:Tooltips/code.js",
        "u:dev:OggPlayer.js"
        ]
}, {
    type: "style",
    articles: [
        "MediaWiki:Tooltip.css",
        "MediaWiki:Slideshow.css",
    ]
});

function events(){
    $('.event').each(function(){
        if($(this).is('[data-start]')) var start = $(this).data('start')*1000, end = $(this).data('end')*1000;
        else var start = $(this).closest('[data-start]').data('start')*1000, end = $(this).closest('[data-end]').data('end')*1000;
        var cur = new Date()*1;
        if(cur < start) $(this).removeClass('eventDuring eventAfter').addClass('eventBefore');
        else if(start <= cur && cur < end) $(this).removeClass('eventBefore eventAfter').addClass('eventDuring');
        else if(end <= cur) $(this).removeClass('eventBefore eventDuring').addClass('eventAfter');
 
        if(!$(this).hasClass('eventTimer')) return true;
 
        var text = '';
        if($(this).hasClass('eventBefore')) var diff = start-cur;
        else if($(this).hasClass('eventDuring')) var diff = end-cur;
        else if($(this).hasClass('eventAfter')) var diff = cur-end;
        if(temp = Math.floor(diff/86400000)) text = temp + 'Day';
        text += ('0'+Math.floor(diff%86400000/3600000)).slice(-2);
        $(this).empty().append(
            document.createTextNode(text),
            $('<span>').addClass('eventTimerFlash').text(':'),
            document.createTextNode(('0'+Math.floor(diff%3600000/60000)).slice(-2))
        );
 
    });
 
    $('.eventDisplayBefore, .eventDisplayDuring, .eventDisplayAfter').hide();
    $('.eventDisplayBefore.eventBefore, .eventDisplayDuring.eventDuring, .eventDisplayAfter.eventAfter').show();
 
    setTimeout(events,5000);
}

function eventsSwitch(dl){
    if($('#Timetable').is(':visible'))
        var from = $('#Timetable'), to = $('#CurrentEvents');
    else
        var from = $('#CurrentEvents'), to = $('#Timetable');
    $('#EventsModule').delay(dl).animate({height: to.height()},dl);
    from.fadeOut(dl);
    to.delay(dl*2).fadeIn(dl);
}

function alternate(){
    $('.alternate > :first-child').show();
    $('.alternate > :last-child').hide();
 
    $('.alternate')
        .delay(1500)
        .queue(function(n){$(this).children(':first-child').fadeOut(750,n);})
        .queue(function(n){$(this).children(':last-child').fadeIn(750,n);})
        .delay(1500)
        .queue(function(n){$(this).children(':last-child').fadeOut(750,n);})
        .queue(function(n){$(this).children(':first-child').fadeIn(750,n);});
 
    setTimeout(alternate,6000);        
}

$(document).ready( function() {
    $('.suppress a').removeAttr('title');
    stageData();
});

function stageData(){
    $('.stageData td.special').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.specspan))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',t.length+1);
        t.each(function(){$(this).children().eq(1).remove();});
    });
    $('.stageData td.stage').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.span))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',t.length+1);
        t.each(function(){$(this).children().eq(0).remove();});
    });
 
    $('.stageDataDropPlus').mouseenter(function(){
        $(this).hide();
        $(this).parent().prev().css({background:'rgba(0,0,0,.7)', zIndex:1});
        $(this).parent().parent().css({overflow:''});
    });
    $('.stageDataDrop').mouseleave(function(){
        $(this).next().find('.stageDataDropPlus').show();
        $(this).css({background:'', zIndex:0});
        $(this).parent().css({overflow:'hidden'});
    });
}
 
var tooltips_config = {
    waitForImages: true,
}
 
var tooltips_list = [
    {
        classname: 'basic-tooltip',
        onHide: function(handle) { $(this).html($(handle).html()) },
    },{
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    },{
        classname: 'imgsrc-tooltip',
        parse: '['+'[File:<#imgsrc#>i.png|link=<#link#>]]',
    }
]
 
/*
$().ready(function(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    createLeftMenu();
});

function createLeftMenu(){
    var div = document.createElement("div");
	$(div).attr("class", "leftMenu");
	$("#mw-content-text").prepend(div);
 
	var handBookDiv = document.createElement("div");
	$(handBookDiv).attr("class", "psearch");
	$(handBookDiv).appendTo(div);
 
	var questDiv = document.createElement("div");
	$(questDiv).attr("class", "fsearch");
	$(questDiv).appendTo(div);
 
	getMenuImage("CardSearch.png", "Card Search", "psearch");
	getMenuImage("LeaderFinder.png", "Leader Finder", "fsearch");
}

function getMenuImage(fileName, link, node) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile%3A' + fileName + '%7Clink=' + link + '%5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$(content).children().attr('width', '').attr('height', '');
		$("div.leftMenu ." + node).append(content);
	}, 'json');
}
*/
$(function commentHint() {
    $("#WikiaArticleComments").before("<div style='font-weight:bold; font-size:10.5pt; background: rgba(212,200,139,.7); border-radius: 5px; padding: 5px;'><img style='vertical-align:middle' src='https://images.wikia.nocookie.net/__cb20131122002606/tos/zh/images/thumb/c/c7/Attention.png/20px-Attention.png'> Please do not post <span style='color: red'>Looking for Ally</span> messages in the comments. Use the <a href='http://towerofsaviors.wikia.com/wiki/Leader_Finder'>Leader Finder</a> instead.</div>");
});
 
$(function() {
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px" value="Force Refresh" />');
    var locurl = location.href;
    if (locurl.indexOf('?') != -1) {
    var locary = "&" + locurl.split('?')[1];
    } else var locary = '';
    $("header#WikiaPageHeader").children("a.comments").after(a);
    a.click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge" + locary;
    });
});
 
window.texttip = function(){
    var tt = $('.tt-text');
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        $('<div>').addClass('tt-tip').css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.tt-tip').remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};
texttip();

// Pages need to import script
wgPageName === 'Card_Search' && importScript('MediaWiki:PetSearch.js');
wgPageName === 'Craft_Search' && importScript('MediaWiki:CraftSearch.js');
wgPageName === 'Card_Drops_Search' && importScript('MediaWiki:DropSearch.js');
wgPageName === 'Titles_System' && importScript('MediaWiki:TitleSearch.js');
wgPageName === 'Past_Stages' && importScript('MediaWiki:PastStages.js');
/*wgPageName === 'Category:Crafts Gallery' && importScript('MediaWiki:GalleryFilter.js');
wgPageName === 'Tower_of_Saviors_Wiki:Report' && importScript('MediaWiki:Report.js');
$.inArray('Monster', wgCategories) !== -1 && importScript('MediaWiki:PetGallery.js');

importScript('MediaWiki:Snow.js');*/