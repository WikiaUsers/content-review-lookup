/* Any JavaScript here will be loaded for all users on every page load. */
/* See also: [[MediaWiki:Wikia.js]] */

/* Main Code - Start */
$(document).ready(function(){
    
    /* START Infobox Code - Only runs if there are infoboxes */
    if($('.infobox').length || $('.portable-infobox').length) {
        
        /* Hide Infobox Spoiler link *****************************************
         *
         * Hides the URL for spoilers. See [[w:c:layton:Template:IS]]
         * By [[User:Tjcool007]] from [[w:c:layton]]
         */
        $('.infobox_spoiler a').each( function() {
            var href = $(this).attr('href');
            $(this).attr('href','#').click( function(e) { e.preventDefault(); window.location = href; });
        });
        
    }
    /* END Infobox Code */
            
});
/* Main Code - End */