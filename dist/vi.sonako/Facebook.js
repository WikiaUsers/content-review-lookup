//$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/vi_VN/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
//$(document).ready(function(){
        $("<div id='FacebookWnd'></div>").css({
                background:'url(https://vignette.wikia.nocookie.net/sonako/images/e/e8/Facebookpanel.png/revision/latest?cb=20150120151949)',
                width:359,
                height:459,
                position:'fixed',
                top:110,
                right:-330,
                zIndex:300}).appendTo("body");
        //Zawartość
        //$('<div class="fb-like-box" data-href="https://www.facebook.com/SonakoWiki" show_faces="false" border_color="#2b53b5" width="300" height="420" stream="true" header="false"></div>').css({marginTop:"10px", marginLeft:"46px", marginRight:"11px"}).appendTo("#FacebookWnd");
        //$("#FacebookWnd").click(function(){
                toggleFacebookWnd();
        });
});
 
//function toggleFacebookWnd() {
        if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
        else $("#FacebookWnd").animate({right:"-330px"}, 700);
}
//load.js
//$(function() {
    var javascript = $('.loadjs').text();
    $('.loadjs').html('<script>'+javascript+'</script>');
});
//$(function() {
    var lecss = $('.loadcss').text();
    $('.loadcss').html('<style type="text/css">' + lecss + '</style>');
});