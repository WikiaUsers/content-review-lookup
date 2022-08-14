/*************
Title        :   CategoryPageListing
Description  :   Listing pages of a requested category in a bullet-point, in-line block manner.
Author       :   Vastmine1029
Version      :   1.0
*************/

mw.loader.using('mediawiki.api', function() {
	var config = mw.config.get([
		'wgRelevantPageName',
		'wgServer',
		'wgContentLanguage'
	]);
	var lang = config.wgContentLanguage;
	if(lang !== "en") {
		lang = "/" + lang;
	}
	else {
		lang = "";
	}
	var wiki_url = config.wgServer + lang;
	var page = config.wgRelevantPageName;
	var api = new mw.Api(), data, data1;
	var wikitext;
	var categories = api.get({
		action: 'parse',
		page: page,
		disablelimitreport: true
	}).then(function(d) {
		data = d.parse.text;
		wikitext = data["*"];
		regex = /<(div|span) id="Category_.*"/g;
		category_match = (wikitext.match(regex));
		
		for(i=0; i < category_match.length; i++) {
			category_match[i] = category_match[i].replace(/"/g, '');
			category_match[i] = category_match[i].replace(/<(div|span) id=Category_/, '');
		}
		for(i=0; i < category_match.length; i++) {
			main(category_match[i]);
		}
		
		function main(category) {
			api.get({
				action: 'query',
				list: 'categorymembers',
				cmtitle: "Category:" + category,
				cmlimit: 'max'
			}).then(function(d) {
				temp = [];
				data = d.query.categorymembers;
				for(i=0; i < data.length; i++) {
					temp.push(data[i].title);
				}
				elementId = "#" + category;
				the_HTML = "<div>";
				for(i=0; i < temp.length; i++) {
					page_name_url = temp[i].replace(/ /g, '_');
					if(i < temp.length-1) {
						the_HTML += "<a href=\"" + wiki_url + "/wiki/" + page_name_url + "\">" + temp[i] + "</a>";
						the_HTML += " &bull; ";
					}
					else {
						the_HTML += "<a href=\"" + wiki_url + "/wiki/" + page_name_url + "\">" + temp[i] + "</a>";
					}
				}
				the_HTML += "</div>";
				elementID = "#Category_" + category;
				mw.hook("wikipage.content").add(function($content) {
					document.querySelector(elementID).innerHTML = the_HTML;
				});
			});
		}
	});
});