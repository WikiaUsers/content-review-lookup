$(function() {
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px;background-color:blue" value="Force Refresh" />');
    $("header#WikiaPageHeader").children("a.comments").after(a);
    a.click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge";
    });
});
 
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