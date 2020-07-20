/*成員列表*/
$("#iframeClass").replaceWith('<iframe src="https://docs.google.com/spreadsheets/d/1a3YuAnWCBYsaCqPub5AloPTisNNhK1ffJItYSSJEgSY/edit#gid=0" width=80% height=1500 frameborder=0 scrolling=auto></iframe>');
/*時鐘*/
importArticle({
    type: 'script',
    article: [        
        'MediaWiki:DisplayClock.js'
    ]
});
/*要求登入以及自動執行js*/
$(function(){
    var x = document.createElement('x');
    x.style.cssText = 'pointer-events:auto;'
    if(x.style.pointerEvents === 'auto') importStylesheet('MediaWiki:Frames1pe.css');
    else importStylesheet('MediaWiki:Frames1.css');
    if($('#monsterCalc').length) monsterCalc();
    if(wgUserGroups.indexOf('sysop') == -1) $('.admin').remove();
    if(wgUserName === null) $('#WikiaArticleComments').on('DOMSubtreeModified',function(){
        $('#article-comments-minieditor-newpost').replaceWith('<p>請登陸以發表留言</p><br/>');
        $('.article-comm-reply').remove();
    });
    events();
    setInterval(function(){$('.eventTimerFlash').css({visibility:new Date().getSeconds()%2?'hidden':'visible'})},1000);
    $('#eventsButton').on('click',function(){eventsSwitch(1000);});
    if ((typeof wgIsMainpage !== 'undefined') && (wgIsMainpage)) MainPage();
});
/*襲來時間表*/
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
/*判定網頁*/
    if ($.isArray(wgUserGroups) && !(0 > $.inArray("autoconfirmed", wgUserGroups))) {
        var a = $('<input type="button" id="ReportButton" style="vertical-align:top;margin-top:3px" value="\u56de\u5831\u9801\u9762\u932f\u8aa4" /><input type="button" id="PurgeButton" style="vertical-align:top;margin-top:3px" value="\u986f\u793a\u6700\u65b0\u9801\u9762" /><span style="float:right;font-weight:bold;">Copyright © 2017 MHXR_繁中維基 All rights reserved</span>');
        $("header#WikiaPageHeader").children("a.comments").after(a);
        $("#ReportButton").click(function() {
            window.open().location.href = "http://zh.tos.wikia.com/wiki/Project:回報?page=" + wgPageName.replace(/%/g, '%25');
            console.log(wgPageName);
        });
        $("#PurgeButton").click(function() {
            var locary = (location.href.indexOf('?') !== -1)?"&"+location.href.split('?')[1]:"";
            location.href = "/wiki/" + wgPageName + "?action=purge" + locary;
        });
    }

wgPageName === '裝備圖鑒' && importScript('MediaWiki:Search.js');