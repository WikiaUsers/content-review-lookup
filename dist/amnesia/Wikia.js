/* --- Display appearance images on right rail (Template:Appearances) --- */
 
$(function(){
    var icons = document.getElementsByClassName('appicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="apprail"><h2><span class="fandom-icons" style="color: rgba(230,230,230,0.75); font-size: 18px;">book</span>&nbsp;&nbsp;Appears in</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("apprail");
        var j = icons.length;
        for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
    }
 
    $(".appicon").show();
    });
/* --- Appearances end --- */
/* --- Discord module ---*/
$(function() {
    mw.hook('DiscordChat.added').add(function($el) {
        $('.rail-sticky-module').before($el);
    });
});
/* --- Discord module end ---*/