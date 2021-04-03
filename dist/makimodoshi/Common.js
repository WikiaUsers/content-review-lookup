(function () {
	
/* set strict mode */
	
	"use strict";
	
/* get MediaWiki configuration values */
	
	var config = mw.config.get([
		"wgDBname"
	]);
	
/* double-run protection */
	
	if (window[config.wgDBname] && window[config.wgDBname].common
		&& window[config.wgDBname].common.has_run) return;
	
	if (!window[config.wgDBname]) {
		window[config.wgDBname] = {
			common: {
				has_run: true
			}
		};
	} else if (!window[config.wgDBname].common) {
		window[config.wgDBname].common = {
			has_run: true
		};
	} else {
		window[config.wgDBname].common.has_run = true;
	}
	
/* randomized community header background */
	
	/*
	 * This is an array of category names from which images will be chosen.
	 * To add another category, just add it to this array. 
	*/
	
	var chb_cats = [
		"QWERTY"
	];
	
	function getCHBImage(api, images, cont) {
		var request = {
			action: "query",
			list: "categorymembers",
			cmtype: "file",
			cmlimit: 500,
			cmtitle: "Category:" + chb_cats.join("|Category:")
		};
		if (cont) request.cmcontinue = cont;
		return api.get(request).then(function (data) {
			if (data && data.query && data.query.categorymembers) Array.prototype.push
				.apply(images, data.query.categorymembers);
			if (data && data.continue && data.continue.cmcontinue)
				return getCHBImage(api, images, data.continue.cmcontinue);
			return {
				image: images[Math.floor(images.length * Math.random())],
				api: api
			};
		});
	}
	
	mw.loader.using("mediawiki.api").then(function () {
		return getCHBImage(new mw.Api(), []);
	}).then(function (obj) {
		return obj.api.get({
			action: "query",
			indexpageids: true,
			prop: "imageinfo",
			iiprop: "url",
			titles: obj.image.title
		});
	}).then(function (data) {
		if (!data || !data.query || !data.query.pageids || !data.query.pageids.length)
			return;
		var pageid = data.query.pageids[0];
		if (!data.query.pages || !data.query.pages[pageid]) return;
		var page = data.query.pages[pageid];
		if (!page.imageinfo || !page.imageinfo.length || !page.imageinfo[0].url)
			return;
		var url = page.imageinfo[0].url;
		var idx = url.lastIndexOf("?");
		var header = document.querySelector(".WikiaPage > .wds-community-header");
		if (!header) return;
		header.style.backgroundImage = "url(" + url.substring(0, idx)
			+ "/zoom-crop/width/471/height/115" + url.substring(idx) + ")";
	});
	
})();