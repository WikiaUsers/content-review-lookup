/** Sub navigation menus (Monobook version) *****************************
 *
 * Allows you to create dynamic sub navigation menus.
 * Can be tweaked to contain an infinite amount of submenus.
 *
 * Code by [[User:Tjcool007]] from the [http://layton.wikia.com/ Professor Layton Wiki]
 */
$.get('http://avengersalliance.wikia.com/index.php?title=MediaWiki:SuperSidebar&action=raw&templates=expand&usemsgcache=yes', function(data) {
    $('#p-Game').html(data);
 
    $(".WikiaPage .subnav li").hover(function() {
        $(this).parent().css({width: $(this).parent().innerWidth()});
 
        if (/opera/i.test(navigator.userAgent)) {
            //innerwidth instead of outerwidth, also a bit less high. 
            $(this).find('ul:first').css({visibility: "visible !important", display: "none", left: $(this).innerWidth(), top: "-25px"}).show(150);
        } else {
            if (/msie/i.test(navigator.userAgent)) {
                //Problems with :first, so let's do it the old way.
                $(this).find('ul').eq(0).css({visibility: "visible !important", display: "none", left: $(this).outerWidth()}).show(150);
            } else {
                $(this).find('ul:first').css({visibility: "visible !important", display: "none", left: $(this).outerWidth()}).show(150);
            }
        }
    }, function() {
        $(this).find('ul').css({visibility: "hidden !important"}).hide();
    });
});