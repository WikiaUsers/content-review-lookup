$( function () {
	if (! document.getElementById('gcd-signup-links')) {
		return;
	}
	var currentUser = mw.config.get('wgUserName');
	var submitButton = document.getElementById('submit-preferences-button');
	var selectAllBox = document.getElementById('select-all-box');
	
	function printError(text, disableButton) {
		var notice = document.createElement('div');
		notice.innerHTML = text;
		$(notice).addClass('unimportant-notice');
		$(notice).insertAfter(submitButton);
		submitButton.disabled = disableButton;
	}
	
	if (! currentUser) {
		printError('Cannot watch pages. Please log in with your Twitch account!', true);
		return;
	}
	
	// passive things on page load
	
	var $signupList = $(document.getElementById('gcd-signup-links'));
	var a = new mw.Api();	
	
	function applyCurrentSelection(regions) {
		$signupList.find('input').each(function() {
			if (regions.includes(this.getAttribute('name'))) {
				this.checked = true;
			}
		});
	}
	
	function selectcurrentList() {
		a.get({
			action:'query',
			list:'watchlistraw',
			wrnamespace:'10004',
			wrlimit:'max'
		}).done(function(data) {
			var pages = data.watchlistraw;
			var regions = [];
			for (p in pages) {
				var title = pages[p].title;
				var matches = title.match(/Global Contract Database\/(.*)\/Current/);
				if (matches && matches[1]) {
					regions.push(matches[1]);
				}
			}
			applyCurrentSelection(regions);
			return;
		}).fail(function(code, data) {
			console.log(code);
			return;
		});
	}
	
	selectcurrentList();
	
	// active things on user action
	
	function selectAllEvent(e) {
		selectAll(this.checked);
	}
	
	function selectAll(newstate) {
		$signupList.find('input').each(function() {
			this.checked = newstate;
		});
	}
	
	// signup stuff
	
	function getWatchlist() {
		return a.get({
			action:'query',
			list:'watchlistraw',
			wrlimit:500
		}).then(function(data) {
			if (data.watchlistraw.length >= 500) {
				if (! confirm('Your watchlist is too big for us to fully back up. Are you SURE you want to overwrite it? You CANNOT UNDO this!')) {
					return $.Deferred().reject('Watchlist too big');
				}
			}
			var titles = [];
			for (p in data.watchlistraw) {
				titles.push(data.watchlistraw[p].title);
			}
			return titles;
		},function(code, data) {
			return 'Could not back up watchlist. Reason: ' + code;
		});
	}
	
	function backupWatchlist(titles) {
		var text = titles.join('\n');
		return a.postWithToken('csrf', {
			action:'edit',
			title:'User:' + currentUser + '/Watchlist Backup',
			text:text,
			summary:'Backing up watchlist'
		}).then(function(data) {
			return titles;
		}, function(code, data) {
			return 'Could not save watchlist. Reason: ' + code;
		});
	}
	
	function removeWatchlist(titles) {
		return a.postWithToken('watch', {
			action:'watch',
			unwatch:1,
			titles:titles.join('|')
		}).then(null, function (code, data) {
			return 'Could not remove pages from watchlist. Reason: ' + code;
		});
	}
	
	function turnEmailsOn() {
		return a.postWithToken('csrf', {
			action:'options',
			optionname:'enotifwatchlistpages',
			optionvalue:1
		}).then(null, function (code, data) {
			return 'Could not turn on email notifs. Reason: ' + code;
		});
	}
	
	function saveWatchlist() {
		var regions = [];
		$signupList.find('input').each(function() {
			if (this.checked) {
				regions.push(this.getAttribute('name'));
			}
		});
		var titles = [];
		for (r in regions) {
			titles.push('Archive:Global Contract Database/' + regions[r] + '/Current');
		}
		titles.push('User:' + currentUser);
		titles.push('User talk:' + currentUser);
		return a.postWithToken('watch', {
			action:'watch',
			titles:titles.join('|')
		}).then(null, function (code, data) {
			return 'Could not watch pages from watchlist. Reason: ' + code;
		});
	}
	
	function makeSignup(e) {
		e.preventDefault();
		var spinner = startSpinner();
		getWatchlist()
		.then(backupWatchlist)
		.then(removeWatchlist)
		.then(saveWatchlist)
		.then(turnEmailsOn)
		.then(function() {
			spinner.remove();
			var notice = document.createElement('div');
			notice.innerHTML = 'Done!';
			$(notice).insertAfter(submitButton);
		}).fail(function(error) {
			printError(error);
			spinner.remove();
		});
	}
	
	function startSpinner() {
		var spinner = document.createElement('div');
		$(spinner).addClass('gcd-loading-circle');
		$(spinner).insertAfter(submitButton);
		return spinner;
	}
	
	selectAllBox.addEventListener('change',selectAllEvent);
	submitButton.addEventListener('click',makeSignup);
});