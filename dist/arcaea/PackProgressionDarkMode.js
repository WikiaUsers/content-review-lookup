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
		console.log("PPDM starting");
		$($("body.theme-fandomdesktop-dark .progression-graph img").get()).each(function(i) {
			console.log(String(i));
			var image_filename = this.src.split("/")[7];
			console.log(image_filename);
			this.src = "https://arcaea.fandom.com/wiki/Special:FilePath/" + image_filename.replace("Light.png", "Dark.png");
		});
		console.log("PPDM finished");
	};
	
	mw.hook("wikipage.content").add(replace_darkmode_progression_graphs);
}(this, jQuery, mediaWiki));