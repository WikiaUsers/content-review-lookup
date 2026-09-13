mw.hook('wikipage.content').add(function() {
	const api = new mw.Api();
	const page = mw.config.get('wgTitle');
	const localRatingsPage = `User:${mw.config.get('wgUserName')}/ratings.json`;
	const lastVoted = x => $('.rating-'+ x).hasClass('voted');
	const inc = x => x[' ' + page] ? x[' ' + page]++ : x[' ' + page] = 1;
	const dec = x => x[' ' + page] && x[' ' + page] > 1 ? x[' ' + page]-- : delete x[' ' + page];
	const sort = x => Object.fromEntries(Object.entries(x).sort((a, b) => b[1] - a[1]));
	var up = [];
	var down = [];
	var deleted = '';
	var globalUp, globalDown, deletedInLocal, deletedInGlobal, vote;
	
	Promise.all([
		fetch(`/wiki/${localRatingsPage}?action=raw`).then(response => response.ok && response.json()),
		fetch('/wiki/Backrooms_Wiki:Ratings.json?action=raw').then(response => response.json())
	]).then(ratings => {
		if (ratings) {
			up = ratings[0].up;
			down = ratings[0].down;
			globalUp = ratings[1].globalUp;
			globalDown = ratings[1].globalDown;
		}
	})
	.then(() => {
		// Temporary converter to new entry format for old ratings.json pages
		up = up.map(entry => entry.replace(/_/g, ' '));
		down = down.map(entry => entry.replace(/_/g, ' '));
		globalUp = Object.fromEntries(Object.entries(globalUp).map(([key, value]) => [' ' + key.replace(/_/g, ' '), value]));
		globalDown = Object.fromEntries(Object.entries(globalDown).map(([key, value]) => [' ' + key.replace(/_/g, ' '), value]));
		// ----
		$('.page-header__meta').append(`<div class="page-rating">Rating:
			<span class="rating-up${up.includes(page) ? ' voted' : ''}">${+globalUp[' ' + page] || 0}</span>
			<span class="rating-down${down.includes(page) ? ' voted' : ''}">${+globalDown[' ' + page] || 0}</span>
		</div>`);
		
		$('[class*="rating-"]').click(function() {
			const votedUp = this.className.includes('up');
			if ($('.page-rating').hasClass('busy')) return;
			$('.page-rating').addClass('busy');
			setTimeout(() => $('.page-rating').removeClass('busy'), 1500);
			
			fetch('/wiki/Backrooms_Wiki:Ratings.json?action=raw')
				.then(response => response.json())
				.then(ratings => {
					if (ratings) {
						globalUp = ratings.globalUp;
						globalDown = ratings.globalDown;
					}
					
					// Temporary converter to new entry format for old ratings.json pages
					globalUp = Object.fromEntries(Object.entries(globalUp).map(([key, value]) => [' ' + key.replace(/_/g, ' '), value]));
					globalDown = Object.fromEntries(Object.entries(globalDown).map(([key, value]) => [' ' + key.replace(/_/g, ' '), value]));
					// ----
					return Promise.all([...Object.keys(globalUp), ...Object.keys(globalDown)].join('|').match(/([^|]*\|){1,50}/g)
						.map(chunk => fetch(`/api.php?action=query&titles=${chunk.slice(0, -1)}&format=json`)
						.then(response => response.json())
						.then(json => Object.entries(json.query.pages).flat().filter(entry => entry.missing == '').map(entry => entry.title))));
				})
				.then(titles => {
					if (titles.flat().length) {
						deleted = 'and removed ratings for deleted pages ';
						titles.flat().forEach(title => {
							if (up.includes(title) || down.includes(title)) deletedInLocal = true;
							if (globalUp[' ' + title] || globalDown[' ' + title]) deletedInGlobal = true;
							up = up.filter(entry => entry != title);
							down = down.filter(entry => entry != title);
							delete globalUp[' ' + title];
							delete globalDown[' ' + title];
							deleted += `“[[${title}]]”, `;
						});
						deleted = deleted.slice(0, -2);
					}
					
					switch (true) {
						case votedUp && lastVoted('down'):
							$('.rating-down').removeClass('voted');
							$('.rating-down')[0].textContent--;
							this.textContent++;
							down.splice(down.indexOf(page), 1);
							up.push(page);
							vote = 'upvoted';
							dec(globalDown);
							inc(globalUp);
							break;
						case !votedUp && lastVoted('up'):
							$('.rating-up').removeClass('voted');
							$('.rating-up')[0].textContent--;
							this.textContent++;
							up.splice(up.indexOf(page), 1);
							down.push(page);
							vote = 'downvoted';
							dec(globalUp);
							inc(globalDown);
							break;
						case votedUp && lastVoted('up'):
							this.textContent--;
							up.splice(up.indexOf(page), 1);
							vote = 'revoked upvote from';
							dec(globalUp);
							break;
						case !votedUp && lastVoted('down'):
							this.textContent--;
							down.splice(down.indexOf(page), 1);
							vote = 'revoked downvote from';
							dec(globalDown);
							break;
						default:
							this.textContent++;
							if (votedUp) {
								up.push(page);
								vote = 'upvoted';
								inc(globalUp);
							} else {
								down.push(page);
								vote = 'downvoted';
								inc(globalDown);
							} break;
					}
					
					$(this).toggleClass('voted');
					api.postWithEditToken({
						action: 'edit',
						format: 'json',
						title: localRatingsPage,
						text: JSON.stringify({up, down}, null, '\t'),
						summary: `PageRating: ${vote} “[[${page}]]” ${deletedInLocal ? deleted : ''} locally`,
						tags: 'page-rating'
					});
					api.postWithEditToken({
						action: 'edit',
						format: 'json',
						title: 'Backrooms_Wiki:Ratings.json',
						text: JSON.stringify({globalUp: sort(globalUp), globalDown: sort(globalDown)}, null, '\t'),
						summary: `PageRating: ${vote} “[[${page}]]” ${deletedInGlobal ? deleted : ''} globally\u200b`,
						tags: 'page-rating'
					});
				});
			});
		});
});