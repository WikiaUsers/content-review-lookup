newPageContent = 'Testpost [[Hermine Granger]] [[Datei:Hedwig.jpg]][[Severus Snape]]';
$.getJSON('/api.php?action=query&prop=revisions&pageids=' + wgArticleId + '&rvprop=timestamp|user|size|content&rvdiffto=cur&rvdifftotext=' + newPageContent + '&indexpageids&format=json', function(res) {
	console.log(res.query.pages[res.query.pageids[0]]);
	revs = [];
	dc = _.after(2,detailedCompare);
	parsedPreview = $.getJSON('/api.php?action=parse&text=' + newPageContent + '&title=' + wgPageName + '&format=json',function(_res) {
		revs.push(_.omit(_res.parse,'title','text','displaytitle'));
		dc.apply(window,revs);
    });
	parsedPage = $.getJSON('/api.php?action=parse&pageid=' + wgArticleId + '&title=' + wgPageName + '&format=json',function(_res) {
		revs.push(_.omit(_res.parse,'title','text','revid','displaytitle'));
		dc.apply(window,revs);
    });
	$.when(parsedPreview,parsedPage).then(function(res1,res2) {
		console.log(arguments);
    });
});

function detailedCompare(rev1,rev2) {
	totals = {};
	props = ["langlinks", "categories", "links", "templates", "images", "externallinks", "sections"];
	imagesTotal = 90;
    imagesAdded = 5;
	console.log('detailedCompare',Object.keys(rev1),Object.keys(rev2));
	props.forEach(function(prop) {
		totals[prop] = {
			prev: rev1[prop].length,
			cur: rev2[prop].length,
			difference: rev1[prop].length - rev2[prop].length,
			percentage: Math.round(((((rev2[prop].length + rev1[prop].length) * 100) / rev2[prop].length) - 100) * 100) / 100
        }
    });
	console.log('totals',totals);
}