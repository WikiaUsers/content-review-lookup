var config = mw.config.get([
    'wgUserName',
]);

function apiRequest(queryParams, fetchOptions) {
    var urlParams = new URLSearchParams(Object.assign(queryParams, {
		//formatversion: 2,
		format: 'json',
	}));
	return new Promise(function(resolve, reject) {
		return fetch(mw.util.wikiScript('api') + '?' + urlParams.toString(), fetchOptions)
			.then(function(res) {
				return res.json();
			}).then(resolve)
			.catch(reject);
	});
}

function getTotalEpisodeCount() {
	return new Promise(function(resolve, reject) {
		return apiRequest({
			action: 'query',
			prop: 'transcludedin',
			titles: 'Template:Infobox Episode',
			tilimit: 500, // @todo when results are expected to be over 500, this must be improved
			indexpageids: '',
		})
			.then(function(res) {
				return res.query.pages[res.query.pageids[0]].transcludedin.length;
			}).then(resolve)
			.catch(reject);
	});
}

function getEpisodeProgress() {
	var pageName = 'Benutzer:' + config.wgUserName + '/MediaWiki:Watch_Progress.json';
	return new Promise(function(resolve, reject) {
		return apiRequest({
			action: 'parse',
			prop: 'wikitext',
			page: pageName,
			formatversion: 2,
		})
			.then(function(jsonString) {
				if (typeof jsonString.error !== 'undefined' && jsonString.error.code === 'missingtitle') {
					//console.log(`Page "${pageName}" not found`);
					return reject('Page "' + pageName + '" not found');
				}
				var watchProgressData = JSON.parse(jsonString.parse.wikitext);
				return watchProgressData;
				//return new Set(watchProgressData.episodes);
			}).then(resolve)
			.catch(reject);
	});
}

function showEpisodeList(episodesProgress, evt) {
	evt.preventDefault();
	mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function() {
		OO.ui
			.alert($('<ul>' + Array.from(episodesProgress).map(function(episode) {
				return '<li><a href="' + mw.util.getUrl(episode) + '" target="_blank">' + episode + '</a></li>';
			}).join('') + '</ul>'))
			.done(function () {
	    		console.log( 'User closed the dialog.' );
			});
	});
}

function renderProfilePage(profileEl) {
	Promise.all([
		getTotalEpisodeCount(),
		getEpisodeProgress()
	]).then(function(res) {
		var totalEpisodeCount = res[0];
		//var episodesProgress = res[1];
		var episodesProgress = new Set(res[1].episodes);
		var percentage = episodesProgress.size / totalEpisodeCount;
		var formatter = new Intl.NumberFormat('de-DE', {
			style: 'percent',
		    minimumFractionDigits: 2,
		    maximumFractionDigits: 2
		});
	
		var progressContainer = Object.assign(document.createElement('div'), {
			title: episodesProgress.size + ' of ' + totalEpisodeCount + ' (' + formatter.format(percentage) + ')',
		});
		var progressLabel = Object.assign(document.createElement('p'), {
			id: 'watch-progress-profile-label',
		});
		var valueLink = Object.assign(document.createElement('a'), {
			href: '',
			textContent: episodesProgress.size,
		});
		valueLink.addEventListener('click', showEpisodeList.bind(window, episodesProgress));
		var maxLink = Object.assign(document.createElement('a'), {
			href: mw.util.getUrl('Kategorie:Episode nach Staffel'),
			textContent: totalEpisodeCount,
		});
		progressLabel.append(
			valueLink,
			document.createTextNode(' of '),
			maxLink
		);
		var progressBar = Object.assign(document.createElement('meter'), {
			max: totalEpisodeCount,
			value: episodesProgress.size,
		});
		progressBar.setAttribute('aria-labelledby', 'watch-progress-profile-label');
		progressBar.style.width = '200px';
		progressContainer.append(progressBar);
		progressContainer.append(progressLabel);
		profileEl.after(progressContainer);
	});
}

/**
 * @param {String} episode
 * @param {'add'|'delete'} action
 */
function setWatchStatus(episode, action) {
	var pageName = 'Benutzer:' + config.wgUserName + '/MediaWiki:Watch_Progress.json';
	return new Promise(function(resolve, reject) {
		getEpisodeProgress().then(function(res) {
			var episodes = new Set(res.episodes);
			episodes[action](episode);
			res.episodes = Array.from(episodes);
			var body = new FormData();
			body.append('token', mw.user.tokens.get('csrfToken'));
			apiRequest({
				action: 'edit',
				text: JSON.stringify(res, null, '\t'),
				title: pageName,
				formatversion: 2,
				summary: action + ' episode "' + episode + '"',
			}, {
				method: 'POST',
				body: body
			}).then(resolve);
		});
	});
}

function renderWatchButton(container) {
	getEpisodeProgress().then(function(res) {
		container.textContent = '';
		var episodes = new Set(res.episodes);
		var btn = Object.assign(document.createElement('button'), {
			textContent: episodes.has(container.dataset.name) ? 'Angesehen' : 'Noch nicht angesehen',
			title: 'Episode "' + container.dataset.name + '" als ' + (episodes.has(container.dataset.name) ? 'noch nicht angesehen' : 'angesehen') + ' markieren',
			className: 'wds-button wds-is-secondary'
		});
		btn.addEventListener('click', toggleWatchButton.bind(window, btn, container.dataset.name, episodes.has(container.dataset.name) ? 'delete' : 'add'));
		container.append(btn);
	});
}

function toggleWatchButton(btn, episode, action) {
	btn.textContent = 'Speichern …';
	btn.setAttribute('disabled', true);
	setWatchStatus(episode, action)
		.then(function(res) {
			btn.removeAttribute('disabled');
			if (res.edit.result !== 'Success') {
				return;
			}
			renderWatchButton(btn.closest('div'));
		});
}

//mw.hook("wikipage.content").add(function($content) {
document.addEventListener('DOMContentLoaded', function() {
    var profileEl = document.querySelector('.user-identity-stats');
    
    if (profileEl !== null) { // We are on a profile page
    	renderProfilePage(profileEl);
    }
    
    var watchBtns = document.getElementsByClassName('watch-progress-button');
    for (var i = 0; i < watchBtns.length; i++) {
    	renderWatchButton(watchBtns[i]);
    }
});