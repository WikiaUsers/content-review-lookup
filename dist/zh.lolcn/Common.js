$(function() {
  if ($.isArray(wgUserGroups) && !(0 > $.inArray("autoconfirmed", wgUserGroups))) {
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px" value="招聘管理员" />');
    $("header#WikiaPageHeader").children("a.comments").after(a);
    a.click(function() {
      window.open().location.href = "http://zh.lolcn.wikia.com/wiki/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F_%E7%BB%B4%E5%9F%BA:%E7%AE%A1%E7%90%86%E5%91%98%E7%94%B3%E8%AF%B7";
    });
  }
});


$(function() {
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px" value="强制刷新页面" />');
    $("header#WikiaPageHeader").children("a.comments").after(a);
    a.click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge";
    });
});

$(function Copyright() {
    $("header#WikiaPageHeader").append("<div style='text-align:center;font-weight:bold;'>© 2016 Riot Games, Inc. All rights reserved.</div>");
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

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/*
$(function(){
    var x = document.createElement('x');
    x.style.cssText = 'pointer-events:auto;'
    if(x.style.pointerEvents === 'auto') importStylesheet('User:Ericwong99/frames1pe.css');
    else importStylesheet('User:Ericwong99/frames1.css');
})
*/