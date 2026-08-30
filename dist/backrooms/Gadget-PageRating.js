mw.loader.using('mediawiki.api').then(function() {
	mw.hook('wikipage.content').add(function() {
		const api = new mw.Api();
		const page = mw.config.get('wgPageName');
		const localRatingsPage = `User:${mw.config.get('wgUserName')}/ratings.json`;
		const lastVoted = x => $('.rating-'+ x).hasClass('voted');
		const inc = x => x[page] ? x[page]++ : x[page] = 1;
		const dec = x => x[page] && x[page] > 1 ? x[page]-- : delete x[page];
		const sort = x => Object.keys(x).sort((a, b) => x[b] - x[a]).reduce((newX, key) => (newX[key] = x[key], newX), {});
		var up = [];
		var down = [];
		var globalUp, globalDown, deleted, deletedInLocal, deletedInGlobal, vote;
		
		Promise.all([
			fetch(`/wiki/${localRatingsPage}?action=raw`).then(response => response.ok && response.json()),
			fetch('/wiki/Backrooms_Wiki:Ratings.json?action=raw').then(response => response.json())
		]).then(ratings => (ratings[0] && (up = ratings[0].up, down = ratings[0].down), (globalUp = ratings[1].globalUp, globalDown = ratings[1].globalDown)))
		.then(() => {
			
			$('.ns-0 .page-header__meta').append(`<div class="page-rating">Rating:
				<span class="rating-up${up.includes(page) ? ' voted' : ''}">${+globalUp[page] || 0}</span>
				<span class="rating-down${down.includes(page) ? ' voted' : ''}">${+globalDown[page] || 0}</span>
			</div>`);
			
			$('.ns-0 [class*="rating-"]').click(function() {
				const votedUp = this.className.includes('up');
				if ($('.page-rating').hasClass('busy')) return;
				$('.page-rating').addClass('busy');
				setTimeout(() => $('.page-rating').removeClass('busy'), 1500);
				
				fetch('/wiki/Backrooms_Wiki:Ratings.json?action=raw')
					.then(response => response.json())
					.then(ratings => ratings && (globalUp = ratings.globalUp, globalDown = ratings.globalDown))
					.then(() => {
						deleted = '';
						Promise.all([...Object.keys(globalUp), ...Object.keys(globalDown)].join('|').match(/([^|]*\|){1,50}/g).map(chunk => fetch(`/api.php?action=query&titles=${chunk.slice(0, -1)}&format=json`)
							.then(response => response.json())
							.then(json => Object.entries(json.query.pages).flat().filter(entry => entry.missing == '').map(entry => entry.title.replace(/\s/g, '_')))))
							.then(titles => { titles.flat().length && (
								deleted = 'and removed ratings for deleted pages ',
								titles.flat().forEach(title => {
									if (up.includes(title) || down.includes(title)) deletedInLocal = true;
									if (globalUp[title] || globalDown[title]) deletedInGlobal = true;
									up = up.filter(entry => entry != title);
									down = down.filter(entry => entry != title);
									delete globalUp[title];
									delete globalDown[title];
									deleted += `“[[${title.replace(/_/g, ' ')}]]”, `;
								}),
								deleted = deleted.slice(0, -2)
							);
						})
					.then(() => {
						
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
							summary: `PageRating: ${vote} “[[${page.replace(/_/g, ' ')}]]” ${deletedInLocal ? deleted : ''} locally`,
							tags: 'page-rating'
						});
						api.postWithEditToken({
							action: 'edit',
							format: 'json',
							title: 'Backrooms_Wiki:Ratings.json',
							text: JSON.stringify({globalUp: sort(globalUp), globalDown: sort(globalDown)}, null, '\t'),
							summary: `PageRating: ${vote} “[[${page.replace(/_/g, ' ')}]]” ${deletedInGlobal ? deleted : ''} globally\u200b`,
							tags: 'page-rating'
						});
					});
				});
			});
		});
	});
});