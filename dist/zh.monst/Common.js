/* 此处的JavaScript将加载于所有用户每一个页面。 */
$(function() {
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px;background-color:blue" value="\u986f\u793a\u6700\u65b0\u9801\u9762" />');
    $("header#WikiaPageHeader").children("a.comments").after(a);
    a.click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge";
    });
});
function moveModule(){
	if($(".page-怪物彈珠維基").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}
function layoutButton(){
	if ($(".page-怪物彈珠維基").length==0 && $("#fullForce").length == 0){
		$(".tally:first-child").append($("<button class='wikia-menu-button' id='switchLayoutButton'>切換成寬頁面</button>"));
		switchLayout();
		$("#switchLayoutButton").click(function(){
			if ($.cookie("layout")=="wide"){
				$.cookie("layout", "narrow");
			}else{
				$.cookie("layout", "wide");
			}
			switchLayout();
		});
	}
	if ($("#fullForce").length > 0){
		switchLayout();
	}
	$(".move").show();
}
function switchLayout(){
	if ($.cookie("layout")=="wide" || $("#fullForce").length > 0){
		$("#switchLayoutButton").html("切換成窄頁面");
		$("#WikiaPage").css("width","auto").css("margin-left","25px").css("margin-right","25px").css("max-width","none");
		$("#WikiaMainContent").css("width","100%");
		$("#WikiaArticle").css("margin-right","20px");
	}else{
		$("#switchLayoutButton").html("切換成闊頁面");
		$("#WikiaPage").css("width","").css("margin-left","").css("margin-right","").css("max-width","");
		$("#WikiaMainContent").css("width","");
		$("#rightPanel").remove();
		$("#WikiaArticle").css("margin-right","");
	}
}
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
        if(temp = Math.floor(diff/86400000)) text = temp + '日';
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
window.texttip = function(){
    var tt = $('.tt-text'),tl;
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom'), l = $(this).hasClass('line');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        tl = l ?'tt-tip-stage':'tt-tip';
        $('<div>').addClass(tl).css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.' + tl).remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};
texttip();
wgPageName === 'Template:經驗龜時間表' && importScript('MediaWiki:GroupCalculator.js');