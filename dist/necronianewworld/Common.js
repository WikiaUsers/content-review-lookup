var jQueryImport = document.createElement("script"),
	firstScriptInPage = document.getElementsByTagName("script")[0];
jQueryImport.type="text/javascript";
jQueryImport.src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
firstScriptInPage.parentNode.insertBefore(jQueryImport, firstScriptInPage);

/* Null Edit */
importArticle({
    type: 'script',
    article: 'u:dev:NullEditButton/code.js'
});

/* Npc color chat */
addOnloadHook(function () {
    $('table.npc_chat_div_r div.m3, table.npc_chat_div div.m3').each(function () {
        $(this).html('<span>' + ($(this).html().replace(/<br \/>|<br\/>|<br>/gi, '</span><br /><span>').replace(/''player'':|<i>player<\/i>:|player:/gi, '</span><span class="pl">-:pL:-').replace(/-:pL:-/g, '<span class="i">Player</span>:').replace(/::/g, ':').replace(/\{/g, '<b>').replace(/\}/g, '</b>')) + '</span>');
    });
});

/* Show/Hide Toggle */
$(document).ready(function(){
	$(".showhide-header").click(function() {
	    $(".showhide-body").toggleClass("displaynone");
	});
});

/* Mapper */
addOnloadHook(function () {
    if (wgPageName === 'Mapper' || $('a[href*="http://necronianewworld.wikia.com/wiki/Mapper"]').size()) {
        $.ajax({
            url: '/index.php?title=Mapper/Code&action=raw',
            success: function (text) {
                text = text.slice(text.search('id="pre_mapper">') + 16, text.search('<\/pre>'));
                $('body:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    }
});
/* End Mapper */


/* Moving DiscordIntegratorModule to 1st position in WikiaRail 
    This method checks the class of WikiaRail div every 200ms until the class becomes "loaded".
    Then, after next 200ms the Discord module is detached from its original place and prepended to WikiaRail. 
    This causes all the other modules to move slightly down but they are still perfectly visible.
    
    Once the module is moved none of the operations will trigger again until page is reloaded, 
    so it shouldn't cause any performance troubles.
    */
addOnloadHook(function () {
    var timer = setInterval(function() {
        if ($("#WikiaRail").attr("class")=='loaded') {
            setTimeout(function() {
                $(".DiscordIntegratorModule").detach().prependTo("#WikiaRail");
                clearInterval(timer);
                }, 200)
            }
        }, 200);
});
/* End of DiscordItegrator alternations */