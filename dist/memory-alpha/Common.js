// <pre>

// Configuration for [[MediaWiki:ImportJS]]

window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{subst:newuser}}',
		3: '{{subst:welcome}}',
	},
	summary: 'Script: Creating user+talkpage on first edit'
};

$(function(){
	var api = new mw.Api();
	
	// Custom theme-dependent CSS
	
	(function(){
		if ($(':root > .theme-fandomdesktop-light').length === 1){
			$('head').prepend('<link rel="stylesheet" href="/load.php?mode=articles&only=styles&articles=MediaWiki:LightTheme.css">');
		} else {
			$('head').prepend('<link rel="stylesheet" href="/load.php?mode=articles&only=styles&articles=MediaWiki:DarkTheme.css">');
		}
	})();
	
	// WikiEditor styling on protected pages
	
	(function(){
		if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1){
			mw.hook( 'wikiEditor.toolbarReady' ).add(function(){
				$('head').prepend('<link rel="stylesheet" href="/load.php?modules=ext.fandom.wikiEditorFandomDesktop.css&only=styles">');
			});
		}
	})();
	
	// Title heading cleanup
	
	(function(){
		var id = (mw.config.get('wgArticleId') === 0) ? '-1' : mw.config.get('wgArticleId');
		
		api.get({
			action:'query',
			prop:'info',
			titles:mw.config.get('wgPageName'),
			inprop:'displaytitle',
			format:'json',
		}).done(function(data){
			$('#firstHeading').html(data.query.pages[id].displaytitle);
			$('.ns-102.page-Portal_Main #firstHeading').html('Welcome to Memory Alpha');
		});
	})();
	
	// Tabs in sidebars
	
	(function(){
		var localImageHeights = [];
		
		$('.pi-item.wds-tabber').each(function(){
			var localImages = $(this).find('.pi-image-thumbnail');
			
			localImages.each(function(){
				localImageHeights.push($(this).attr('height'));
			});
			
			var height = Math.min.apply(this, localImageHeights);
			
			localImages.each(function(){
				$(this).css({'height':height, 'width':'auto'});
			});
			
			localImageHeights = [];
		});
	})();
	
	// Correcting link behavior
	
	(function(){
		$('.internal-external-link [href^="https://memory-alpha.fandom.com/"]').removeAttr('target rel class');
	})();
	
	// Remove "talk" link from forums
	
	(function(){
		var talkLink = $('.ns-110 #ca-talk');
		
		if (talkLink.length === 0){
			return;
		}
		
		talkLink.parent().remove();
	})();
	
	// Number of MA users
	
	(function(){
		if ($('.number-of-users').length === 0){
			return;
		}
		
		api.get({
			action:'listuserssearchuser',
			contributed:'1',
			limit:'0',
			order:'ts_edit',
			sort:'desc',
			offset:'0',
		}).done(function(result){
			$('.number-of-users').text(result.listuserssearchuser.result_count);
		});
	})();
});

// </pre>