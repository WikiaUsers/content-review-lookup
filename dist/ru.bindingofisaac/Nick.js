intervalName = setInterval(adminname,500);
function adminname(){
if ($('.Reply_body__3woA9, #MessageWall .Reply').length){
clearInterval(intervalName);
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:TRJ-VoRoN"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #7139a2"});
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:DarkGreeD"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #2d63c7"});
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:WingdingAster0"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #7139a2"});
}
}

//template pol2
$('.tb-pol22-char-box').click(function() {
    if ($(this).hasClass('pressed')) {
        $(this).find('p').css({"display": "none"});
        $(this).removeClass('pressed');
    } else {
        $('.tb-pol22-char-box p').css({"display": "none"});
        $(this).find('p').css({"display": "block"});
        $(this).siblings('.tb-pol22-char-box').removeClass('pressed');
        $(this).addClass('pressed');
    }
});