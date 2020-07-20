$(document).ready(function(){
    texttip();
});

function texttip(){
    $('.tt-text.line, .tt-text.mobile').on('touchend',function(e){
        if($(this).hasClass('tt-active')) return true;
        $('.tt-active').removeClass('tt-active');
        $('.tt-tip').remove();
        $(this).addClass('tt-active');
        
        var c = e.originalEvent.changedTouches[0], x = c.pageX, w = document.body.clientWidth, p = {top: c.pageY};
        if(x > w/2) p.right = w-x;
        else p.left = x;
        
        $('<div>').addClass('tt-tip').css(p).text($(this).attr('title')).appendTo('body');
        e.stopPropagation();
        return false;
    });

    $(document).on('touchend',function(){$('.tt-tip').remove(); $('.tt-active').removeClass('tt-active');});
}