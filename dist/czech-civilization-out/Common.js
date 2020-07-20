/* Any JavaScript here will be loaded for all users on every page load. */
/* Main page */
if (wgPageName === 'Civilization_Games_Wiki') {
	$(function() {
		/** Hide tabbers until the entire system is ready - 
            works with MediaWiki:Mainpage_Box_Content **/
		var tabberInterval = setInterval(waitForChange, 250);
		function waitForChange() {
			if ($('.mainpage-box-content .tabbernav').length > 0) {
				$('.mainpage-box-content .tabbertab').css('display','');
				clearInterval(tabberInterval);
			}
		}
		
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