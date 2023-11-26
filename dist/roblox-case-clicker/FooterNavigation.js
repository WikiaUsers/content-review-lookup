/*************
Title        :   FooterNavigation
Description  :   Displays navigation at the footer of a page. If the category on a page has a navigation template, it will display it at the bottom of the page. It will select the first category that has an existing navigation template. Nav template: "Template:Navigation_<Category_name>"
Author       :   Vastmine1029
Version      :   1.0
Attribution  :   MediaWiki:FooterNavigation.js from Adopt Me! Wiki on Fandom (https://adoptme.fandom.com/wiki/MediaWiki:FooterNavigation.js) is licensed under CC BY-SA 3.0.
*************/

mw.loader.using('mediawiki.api', function() {
	var api = new mw.Api(), data;
	var categories = [];
	var config = mw.config.get([
		'wgRelevantPageName'
	]);
	
	if (window.FooterNavigation)
		return;
	window.FooterNavigation = true;
	
	api.get({
		action: 'parse',
		page: config.wgRelevantPageName,
		prop: 'categories',
		disablelimitreport: true
	}).then(function(d) {
		data = d.parse.categories;
		for(i=0; i < data.length; i++) {
			category = data[i]["*"];
			nav_page = category.replace(/ /g, '_');
			categories.push(nav_page);
			
		}
	}).then(function() {
		for (i=0; i < categories.length; i++) {
			api.get({
			action: 'parse',
			page: "Template:Navigation_" + categories[i],
			disablelimitreport: true
			}).then(function(d) {
				data = d['parse']['text']['*'];
				console.log('data:', data);
				var interval = setInterval(function() {
					if ($('.mw-body-content')) {
						clearInterval(interval);
						$(".mw-body-content").eq(0).after(data);
					}
				});
			});
		}
	});
});