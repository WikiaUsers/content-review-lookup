$(function($) {
    'use strict';
 
	var newsModule = {
		config: {
			wikiUrl: 'http://fr.community.wikia.com',
			contentsPage: 'MediaWiki:Custom-NewsModuleContents',
 
			insertBeforeId: '#wikia-recent-activity',
 
			headerImage: 'https://vignette.wikia.nocookie.net/eswikia/images/f/f5/E3_2018_Module.jpg/revision/latest',
			headerImageAlt: 'E3 2018',
			headerImageLink: 'http://fr.wikia.com/E3_2018',
 
			headerText: 'Dernières infos',
			writtenBy: 'Rédacteur : '
		},
 
		observer: null,
		rawModuleContents: null,
		moduleInserted: false,
 
		init: function() {
			if (!this.hasRightRail()) {
				return;
			}
 
			this.loadModuleContents();
 
			if (!this.isRightRailLoaded()) {
				this.observeRightRail();
			}
		},
 
		hasRightRail: function() {
			return $('#WikiaRail').length !== 0;
		},
 
		isRightRailLoaded: function() {
			return $('#WikiaRail').hasClass('loaded');
		},
 
		observeRightRail: function() {
			var vanillaRightRail = document.getElementById('WikiaRail');
 
			this.observer = new MutationObserver(this.onRightRailLoaded);
			this.observer.observe(vanillaRightRail, { attributes: true })
		},
 
		onRightRailLoaded: function() {
			var isLoaded = newsModule.isRightRailLoaded();
 
			if (isLoaded) {
				newsModule.observer.disconnect();
				if (!newsModule.moduleInserted && newsModule.rawModuleContents !== null) {
					newsModule.insertModule();
				}
			}
		},		
 
		loadModuleContents: function() {
			$.ajax({
				url: '/api.php',
				data: {
					action: 'query',
					prop: 'revisions',
					rvprop: 'content',
					format: 'json',
					titles: this.config.contentsPage
				},
				type: 'GET',
				dataType: 'jsonp',
				success: function(data) {
					newsModule.rawModuleContents = newsModule.getContentsFromJson(data);
 
					if(newsModule.isRightRailLoaded() && !newsModule.moduleInserted && newsModule.rawModuleContents !== null) {
						newsModule.insertModule();
					}
				}
			});
		},
 
		getContentsFromJson: function(json) {
			var content = null;
 
			for (var page in json.query.pages) {
				var pageObject = json.query.pages[page];
 
				if (pageObject.title === this.config.contentsPage) {
					content = pageObject.revisions[0]['*'];
					break;
				}
			}
 
			return content;
		},
 
		insertModule: function() {
			this.moduleInserted = true;
 
			var $module = $('<section>')
				.attr('class', 'rail-module news-module')
				.attr('id', 'news-module');
 
			var $headerLink = $('<a>')
				.attr('href', this.config.headerImageLink)
				.attr('class', 'header-image');
			var $headerImage = $('<img>')
				.attr('src', this.config.headerImage)
				.attr('alt', this.config.headerImageAlt);
			$headerLink.append($headerImage);
			$module.append($headerLink);
 
			var $wrapper = $('<div>')
				.attr('class', 'content-wrapper');
			$module.append($wrapper);
 
			var $header = $('<h2>')
				.text(this.config.headerText);
			$wrapper.append($header);
 
			var $items = $('<div>')
				.attr('class', 'items');
 
			this.formatAndInsertItems($items);
			$wrapper.append($items);
 
			$(this.config.insertBeforeId).before($module);
		},
 
		formatAndInsertItems: function($items) {
			var splitContents = this.rawModuleContents.split('\n');
 
			for (var item in splitContents) {
				var contents = splitContents[item].split('|');
 
				var $section = $('<div>')
					.attr('class', 'item');
 
				var $titleUrl = $('<a>')
					.attr('href', contents[0]);
				var $title = $('<h3>')
					.text(contents[1]);
				$titleUrl.append($title);
 
				var $authorSection = $('<div>')
					.attr('class', 'written-by');
				var $writtenBy = $('<span>')
					.text(this.config.writtenBy);
				var $author = $('<a>')
					.attr('href', '/wiki/User:' + contents[2])
					.text(contents[2]);
				$authorSection.append($writtenBy)
					.append($author);
 
				$section
					.append($titleUrl)
					.append($authorSection)
 
				$items.append($section);
			}
		}
	};
 
	newsModule.init();
}(this.jQuery));