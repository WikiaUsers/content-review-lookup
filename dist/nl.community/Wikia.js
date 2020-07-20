whenRailReadyStop = 1;
$(function whenRailReady() {
        if ($('#WikiaRail section').length > 0) {
                $('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="facebookmodule"><iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fwikia.nl&amp;width=250&amp;height=65&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=161574360578181" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:65px;" allowTransparency="true"></iframe></section>');

$('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="twittermodule"><a class="twitter-timeline"  href="https://twitter.com/wikia_nl"  data-widget-id="420572119806656512">Tweets by @wikia_nl</a></section>');

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

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

//CDINT-200
$(function(){
	if ($('#forum-display').length ){
		$('#forum-display').insertBefore('#WikiaFooter');
	}
});