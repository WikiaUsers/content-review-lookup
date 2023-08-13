/* Any JavaScript here will be loaded for all users on every page load. */
/* Main page */
if (mw.config.get('wgIsMainPage')) {
	$(function() {
		/** Hide tabbers until the entire system is ready - 
            works with MediaWiki:Mainpage_Box_Content **/
		/**var tabberInterval = setInterval(waitForChange, 250);
		function waitForChange() {
			if ($('.mainpage-box-content .tabbernav').length > 0) {
				$('.mainpage-box-content .tabbertab').css('display','');
				clearInterval(tabberInterval);
			}
		}**/
		
		/** Ensure both news & blogs boxes are the same size **/
		var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts-resizer').height();
		var newsFeedHeight = parseInt(communityPostsHeight) - 3 + 'px';
		$('.mainpage-box-newsandblogs .newsfeed-container').css('height',newsFeedHeight);
	 
		$(window).on('resize',function() {
			var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts-resizer').height();
			var newsFeedHeight = parseInt(communityPostsHeight) - 3 + 'px';
			$('.mainpage-box-newsandblogs .newsfeed-container').css('height',newsFeedHeight);
		});
	});
}

/* Starships Viewer */
if ( mw.config.get('wgPageName').match(/(Supremacy|Purity|Harmony)_\(Starships\)/) ) {
    importArticle({type: 'script', article: 'MediaWiki:Starshipmenu.js'});
}

/* CivBE Expedition highlighting */
$(function() {
	function ApplyHoverFunctions(s) {
		
		$("." + s + "-icon").hover(function () {
			$(this).parent().parent().parent().siblings("." + s).find("td").css("background","linear-gradient(#1f2a35, #171d27)");
		}, function () {
			$(this).parent().parent().parent().siblings("." + s).find("td").css("background","#13161d");
		});
	}
	
	
	ApplyHoverFunctions("sponsor");
	ApplyHoverFunctions("colonist");
	ApplyHoverFunctions("spacecraft");
	ApplyHoverFunctions("cargo"); 
});

/* Changing red image links to placeholder icons */
$(function ApplyPlaceholderImages() {
    $(".testtable a.new[href*='/wiki/Special:Upload?wpDestFile=20x'][href*='BE.png']").html("<img src=\"https://vignette.wikia.nocookie.net/civilization/images/2/2f/20xMissingBE.png/revision/latest?cb=20151017234631\" alt=\"Missing image\"/>");
});