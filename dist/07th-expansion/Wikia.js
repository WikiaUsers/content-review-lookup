/* --- Display appearance images on right rail (Template:Appearances) --- */
 
$(function(){
    var icons = document.getElementsByClassName('appicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="apprail"><h2>Appears in:</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("apprail");
        var j = icons.length;
        for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
    }
 
    $(".appicon").show();
    });