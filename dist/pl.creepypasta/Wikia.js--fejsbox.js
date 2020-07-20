whenRailReadyStop = 1;
$(function whenRailReady() {
        if ($('#WikiaRail section').length > 0) {
                $('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="facebookmodule"><h2>Polub Fanpage Creepypasta Wiki!</h2><iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FCreepypastaWikiPolska&amp;width=250&amp;height=65&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=161574360578181" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:65px;" allowTransparency="true"></iframe></section>');
         } else {
                if (whenRailReadyStop < 60) {
                        setTimeout(function() {
                                whenRailReady();
setTimeout(function() {
 
},5000);
                        },1000);
                }
                whenRailReadyStop++;
        }
});