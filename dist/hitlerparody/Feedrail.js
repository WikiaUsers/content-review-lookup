$('#WikiaRailWrapper').append('<div id="HPWrail" style="display: none;"></div>')
.prepend('<aside class="rail-module"><a class="toggle-hpw active">Main</a><a class="toggle-hpw">Feeds</a></aside>');
 
$('#HPWrail').load('/wiki/Template:Feedrail?action=render');
 
$('.toggle-hpw').click(function(){
    if (!$(this).hasClass('active')) {
        $('#WikiaRail').toggle();
        $('#HPWrail').toggle();
        $('.toggle-hpw.active').removeClass('active');
        $(this).addClass('active');
    }
});