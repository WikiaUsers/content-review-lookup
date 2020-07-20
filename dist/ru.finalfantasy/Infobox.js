/*** Article info box *******************************************************
 * Creates and displays article info box (if page has something to display)
 * Adds sideicons in the given order
 ****************************************************************************/
$(function(){
    var icons = document.getElementsByClassName('sideicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="sideiconrail"><h2>Информация о статье:</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("sideiconrail");
        var j = icons.length;
        for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
    }
 
    $(".sideicon").show();
});