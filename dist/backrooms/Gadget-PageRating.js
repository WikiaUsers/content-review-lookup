mw.hook('wikipage.content').add(function() {
	const page = mw.config.get('wgPageName');
	const localRatingsPage = `User:${mw.config.get('wgUserName')}/ratings.json`;
	var up, down, vote, globalUp, globalDown;
	
	fetch('https://backrooms.fandom.com/api.php?action=query&prop=revisions&titles=Backrooms_Wiki:Ratings.json&rvprop=timestamp|comment|content&rvlimit=50&format=json&formatversion=2').then(response => response.json())
		.then(json => JSON.parse(Object.entries(json.query.pages[0].revisions).flat().find(rv => rv.comment && rv.comment.includes('\0') || Date.parse(rv.timestamp) < Date.parse('2026/8/22 UTC')).content))
		.then(ratings => ratings && (globalUp = ratings.up, globalDown = ratings.down))
		.then(() => {
			$('.ns-0 .page-header__meta').append(`<div class="rating">Rating:
				<span class="rating-up">${globalUp.page || 0 }</span>
				<span class="rating-down">${globalDown.page || 0}</span>
			</div>`);
			
			mw.loader.using('mediawiki.api').then(function() {
				const api = new mw.Api();
				$('.ns-0 [class*="rating-"]').click(function() {
					$(this).toggleClass('voted');
					const clickedUp = this.className.includes('up');
					
					fetch(`https://backrooms.fandom.com/wiki/${localRatingsPage}?action=raw`).then(response => {
						if (!response.ok) api.postWithEditToken({action: 'edit', format: 'json', title: localRatingsPage, text: JSON.stringify({'up':[],'down':[]}, null, '\t'), summary: 'PageRating: Created local ratings page'});
						return response.json();
					}).then(ratings => {
						up = ratings.up;
						down = ratings.down;
						
						switch (true) {
							case clickedUp && down.includes(page):
								this.textContent++;
								down.splice(down.indexOf(page), 1);
								up.push(page);
								$('.rating-down')[0].textContent--;
								vote = 'upvoted';
								break;
							case !clickedUp && up.includes(page):
								this.textContent++;
								up.splice(up.indexOf(page), 1);
								down.push(page);
								$('.rating-up')[0].textContent--;
								vote = 'downvoted';
								break;
							case clickedUp && up.includes(page):
								this.textContent--;
								up.splice(up.indexOf(page), 1);
								vote = 'revoked upvote from';
								break;
							case !clickedUp && down.includes(page):
								this.textContent--;
								down.splice(down.indexOf(page), 1);
								vote = 'revoked downvote from';
								break;
							default:
								this.textContent++;
								clickedUp ? (up.push(page), vote = 'upvoted') : (down.push(page), vote = 'downvoted');
								break;
						}
						api.postWithEditToken({action: 'edit', format: 'json', title: localRatingsPage, text: JSON.stringify({up,down}), summary: `PageRating: ${vote} “${page}” locally`});
						api.postWithEditToken({action: 'edit', format: 'json', title: 'Backrooms_Wiki:Ratings.json', text: JSON.stringify({globalUp,globalDown}), summary: `PageRating: ${vote} “${page}” globally\0`});
					});
				});
			});
		});
});