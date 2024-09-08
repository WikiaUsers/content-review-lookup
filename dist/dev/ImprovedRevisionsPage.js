mw.loader.using(['mediawiki.util']).then(function () {
	window.dev = window.dev || {};
	window.dev.ImprovedRevisionsPage = true;

	if (mw.util.getParamValue('action') !== 'history') {
		return;
	}

	var utilsPageName = "MediaWiki:ImprovedRevisionsPage.js/utils.js";
	importArticle({
		type: "script",
		article: utilsPageName,
	}).then(function(require){
	    var module = require(utilsPageName);
	    
	    processRevisions(fandomContext.page.pageName).then(function(revs) {
	    	console.log('revs', revs);
	    	
	    	for (var i in revs) {
	    		var diffStatEl, diffStatBlockEl;
	    		var rev = revs[i];
	    		document.querySelector('.mw-diff-bytes').after(diffStatEl = Object.assign(document.createElement('span'), {
	    			className: 'diffstat',
	    		}));
	    		diffStatEl.append(Object.assign(document.createElement('span'), {
	    			textContent: '+35', // @TODO
	    		}), Object.assign(document.createElement('span'), {
	    			textContent: '-9', // @TODO
	    		}), diffStatBlockEl = document.createElement('span'));
	    		diffStatBlockEl.append(Object.assign(document.createElement('span'), {
	    			className: 'diffstat-block-added', // @TODO
	    		}), Object.assign(document.createElement('span'), {
	    			className: 'diffstat-block-removed', // @TODO
	    		}), Object.assign(document.createElement('span'), {
	    			className: 'diffstat-block-neutral', // @TODO
	    		}), Object.assign(document.createElement('span'), {
	    			className: 'diffstat-block-neutral', // @TODO
	    		}), Object.assign(document.createElement('span'), {
	    			className: 'diffstat-block-neutral', // @TODO
	    		}));
	    	}
	    });
	});
});