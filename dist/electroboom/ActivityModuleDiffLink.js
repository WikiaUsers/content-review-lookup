(function() {
	var rail = document.getElementById('WikiaRail');
	var observer = new MutationObserver(function(event) {
		var record = event[0];
		var target = record.target;
		var api = new mw.Api();
		if (record.attributeName === 'class' && target.classList.contains('is-ready')) {
			var list = target.querySelector('.activity-items');
			var titles = [];
            for (var i = 0; i < list.children.length; i++) {
            	var child = list.children[i];
                titles.push(child.querySelector('.page-title-link').innerText);
            }
            titles = titles.join('|');
            api.get({
            	action: 'query',
            	prop: 'revisions',
            	titles: titles,
            	format: 'json'
            }).done(function(response) {
            	if (!response.error) {
            		var pages = response.query.pages;
            		Object.keys(pages).forEach(function(key) {
            			var page = pages[key];
            			for (var i = 0; i < list.children.length; i++) {
            				var child = list.children[i];
            				var title = child.querySelector('.page-title');
            				if (title.innerText === page.title) {
            					var link = document.createElement('a');
            					link.classList.add('diff-link');
            					link.href = '/?diff=' + page.revisions[0].revid;
            					link.innerText = '(diff)';
            					title.append(link);
            				}
            			}
            		});
            	}
            });
		}
	});
	if (rail) {
		observer.observe(rail, {
			attributes: true
		});
	}
})();