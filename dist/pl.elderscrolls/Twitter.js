$(function() {
	if(skin == "oasis"&& mw.config.get('wgPageName') === 'Elder_Scrolls_Wiki') {
			var $sidebar = $('#ESW_Twitter');
			var comboString ='<div style="background:none!important;margin-top:20px;max-width:330px"><a class="twitter-timeline"  href="https://twitter.com/TES_Wiki" data-widget-id="635547899305295872">Tweety użytkownika @TES_Wiki</a></div>' +
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
 
			if ($sidebar.size()) {
				if (!$('.twitter-timeline').size()) {
					$sidebar.append(comboString);
				}
			}
	}
});

function addFanBox() {
   $('#MESW_Twitter').append('<div id="twitter-box"></div><script>var tw_user = "TES_Wiki";var tw_width = 380;var tw_height = 90;var no_face = 9;(function() {var tw_box = document.createElement("script"); tw_box.type = "text/javascript"; tw_box.async = true;tw_box.src = "//www.twitter-fanbox.com/tw.js";(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(tw_box);})();</script>');
}
$(addFanBox);