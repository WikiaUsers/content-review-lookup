/* Some wiki wide js stuff. Everything's by Kangaroopower if not otherwise mentioned */
$(document).ready(function () {
	/* Allows selective CSS addition */
	//$('head').append('<style type="text/css">' + $('#css').html() + '</style>');
 
	/* Auto refreshing quotes for main page */
	function qloadPageData () {
		if ((typeof mw.config.get('wgIsMainPage') !== "undefined" && mw.config.get('wgIsMainPage') === true) && mw.config.get('wgAction') === 'view') {
			var cC = "#mw-content-text";
			$.postJSON(mw.util.wikiScript('api') + '?action=purge&titles='+ mw.config.get('wgPageName') +'&format=json', function () {
				$(cC).load( location.href + " " + cC + " > *", function () {
					$('#refreshquotelink').click(function(e) {
						e.preventDefault();
						$('#refreshquote').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" />');
						qloadPageData();
					});
				});
			});	
		}
	}
 
	//we don't want to call it immediately
	$('#refreshquotelink').click(function(e) {
		e.preventDefault();
		$('#refreshquote').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" />');
		qloadPageData();
	});
 
	//UserTags (Lunarity from dev wiki)
	window.UserTagsJS = {
		modules: {
			mwGroups: ['bureaucrat', 'rollback']
		},
		tags: {}
	};
 
	//Imports
	importArticles({
		type:'script',
		articles: [
			'w:c:dev:UserTags/code.js',
			'w:c:dev:Countdown/code.js'
		]
	});
 
	//change collapse/expand links to be white to be better visible
	$('.mw-collapsible a').each(function(){
		if($(this).text() === 'Collapse' || $(this).text() === 'Expand') $(this).css("color", "white");
	});

	//Show the new message bubble on the command center only for admins
	if(mw.config.get('wgPageName') === "Board:Cahill_Command_Center" && $.inArray('sysop', mw.config.get('wgUserGroups')) === -1) {
		$('#ForumNewMessage').css('display', 'none');
	}
});