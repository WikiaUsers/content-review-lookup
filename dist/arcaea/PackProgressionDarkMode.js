// __NOWYSIWYG__
/**
 * PackProgressionDarkMode
 * 
 * @version 1.0
 * 
 * @author Jono99 <https://arcaea.fandom.com/wiki/User:Jono99>
 * 
 * This script replaces the image used for pack progression imagemaps to a more
 * dark mode friendly version when the user is using dark mode.
 */

(function (window, $, mw) {
	var replace_darkmode_progression_graphs = function() {
		$($("body.theme-fandomdesktop-dark .progression-graph img").get()).each(function(i) {
			var src_base = this.src;
			this.src = src_base.split("Progression_Light.png")[0] + "Progression_Dark.png/revision/latest";
		});
	};
	
	mw.hook("wikipage.content").add(replace_darkmode_progression_graphs);
}(this, jQuery, mediaWiki));