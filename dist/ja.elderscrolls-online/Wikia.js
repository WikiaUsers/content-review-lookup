/* Add Elder Scrolls static page traffic driver, popular pages and recent blog listing module to right rail */
var rightRailModules = {
	config: {
		loadOnNamespaces: [0]
	},
	
	recentBlogs: {},
	checkRail: 0,
	
	getRecentBlogs: function() {
		return $.get('/api/v1/Articles/New?namespaces=500&limit=5&minArticleQuality=1');
	},
	
	addModules: function() {
		var railHasLoaded = $("#WikiaRail .module").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addStaticPageBanner();
			this.addPopularPagesModule();
			this.handleRecentBlogsAjax();
		}		
	},
	
	addClickTrackingToModule: function(category, selector) {
		var track = Wikia.Tracker.buildTrackingFunction({
			category: category,
			action: Wikia.Tracker.ACTIONS.CLICK,
			trackingMethod: 'analytics'
		});
	 
		var module = $(selector);
		module.on('mousedown', 'a', function(e) {
			var href = $(this).attr('href');
			track({
				browserEvent: e,
				label: href
			});
		});
	},

	addStaticPageBanner: function() {
		var	appendTo = $('#WikiaRail .WikiaActivityModule'), 
			bannerHTML = '<div class="es-banner"><a href="http://ja.wikia.com/superfan/eso/"><img alt="Banner" src="https://vignette.wikia.nocookie.net/elderscrolls-online/images/3/39/ESO-wikia-banner.jpg/revision/latest?cb=20160701231234&path-prefix=ja"><a></div>';
		appendTo.after(bannerHTML);
	},
	
	addPopularPagesModule: function() {
		var	appendTo = $('#WikiaRail'),
			moduleHTML = '<section class="PopularPagesModule module" id="PopularPages"><h2 class="popularpages-heading"><img src="https://vignette.wikia.nocookie.net/elderscrolls-online/images/b/bf/ESO_Ring.png/revision/latest?cb=20160701230406&amp;path-prefix=ja">特集一覧</h2><ol><li><a href="http://ja.elderscrolls-online.wikia.com/wiki/%E6%97%A5%E6%9C%AC%E4%BA%BA%E3%82%AE%E3%83%AB%E3%83%89%E7%B4%B9%E4%BB%8B%E3%83%9A%E3%83%BC%E3%82%B8">日本人ギルド紹介</a></li><li><a href="http://ja.elderscrolls-online.wikia.com/wiki/ESO_Walker">ESO Walker</a></li><li><a href="http://ja.elderscrolls-online.wikia.com/d/f?sort=latest">雑談掲示板</a></li></ol></section>';
		appendTo.append(moduleHTML);
		this.addClickTrackingToModule('ja-popularpages-module', '#WikiaRail .PopularPagesModule');		
	},
	
	addRecentBlogsModule: function() {
		var	appendTo = $('#WikiaRail .PopularPagesModule'),
			moduleHTML = $('<section id="RecentBlogPosts" class="RecentBlogPostsModule module"><a class="createnewblog wikia-button" title="ブログの記事を作成" href="/wiki/%E7%89%B9%E5%88%A5:%E3%83%96%E3%83%AD%E3%82%B0%E3%83%9A%E3%83%BC%E3%82%B8%E4%BD%9C%E6%88%90"><img width="0" height="0" class="sprite blog" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"> ブログの記事を作成</a><h2 class="recentblogs-heading">最新のブログ投稿</h2><ul></ol></section>'),
			listing = moduleHTML.find('ul'),
			data = $.parseJSON(this.recentBlogs.responseText);
			
		if(typeof data === "undefined") {
			return false;
		}	
		
		$.each(data.items, function(index, value) {
			var	dateString = value.creation_date.substring(0,4) + ' ' + value.creation_date.substring(4,6) + ' ' + value.creation_date.substring(6,8),
				date = new Date(dateString),
				day = date.getDate(),
				month = date.getMonth() + 1,
				year = date.getFullYear(),
				name = mw.html.escape(value.creator.name),
				avatar = mw.html.escape(value.creator.avatar.replace(/\/scale\-to\-width\-down\/[0-9]+/i, '')),
				url = mw.html.escape(value.url),
				title = mw.html.escape(value.title.substring(value.title.indexOf("/") + 1)),
				itemHTML = $('<li><div class="post-details"><a href="/wiki/User:' + name + '"><img class="avatar" alt="' + name + '" src="' + avatar + '"></a><div class="author-details"><div class="title"><a href="' + url + '">' + title + '</a></div><div class="date">' + year + '年 ' + month + '月 ' + day + '日 by <a href="/wiki/User:' + name + '">' + name + '</a></div></div></div></li>');
			listing.append(itemHTML);
		});
		
		appendTo.after(moduleHTML);
		this.addClickTrackingToModule('ja-recentblogs-module', '#WikiaRail .RecentBlogPostsModule');		
	},
	
	handleRecentBlogsAjax: function() {
		var thisObject = this;
		if (this.recentBlogs.readyState !== 4) {
			this.recentBlogs.done(function() {
				thisObject.addRecentBlogsModule();
			});
		}
		else {
			this.addRecentBlogsModule();
		}		
	},
	
	init: function() {
		var thisObject = this;
		this.recentBlogs = this.getRecentBlogs();

		if (($.inArray(mw.config.get('wgNamespaceNumber'), this.config.loadOnNamespaces) > -1) && !mw.config.get('wgIsMainPage')) {
			this.checkRail = setInterval(function() { thisObject.addModules(); }, 750);
		}		
	}
}

$(function() {
	rightRailModules.init();
});