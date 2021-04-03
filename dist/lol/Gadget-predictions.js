// <nowiki>
$(function() {	
	var i18n = {
		alert_wrong_user : "This is another user's predictions page. Go to yours?",
		alert_overview_page : "Go to create or edit your predictions?",
		alert_log_in : 'You must be logged in to enter predictions. Log in?',
		confirm_new_page : 'Create page?',
		draw : 'TIE',
		error_already_in_group : 'Error! You are already a member of this group',
		highlight_start : 'Turn On Team Highlighting',
		highlight_stop : 'Turn Off Team Highlighting',
		intro : 'To enter predictions, click the team you think will win. If matches are BO2, click the center to predict a tie. To exit, refresh the page.',
		launch_predictions : 'Launch Predictions',
		no_user_page : "You don't have predictions for this event!",
		prompt_create_group_name : 'Enter group name (case sensitive!)',
		please_confirm_email : 'It looks like you haven\'t confirmed your email yet. Please do that and try again!',
		relaunch_predictions : 'Resume Editing',
		reload_page : 'This will reload the page. Continue?',
		save_disallowed : "Sorry, you can't save, predictions expired.",
		save_predictions : 'Save Predictions',
		save_predictions_done : 'Predictions Saved! Reload the page to reset the UI.',
		success_joining_group : 'Successfully joined group! Reload the page to update.',
		success_joining_group_now_creating_page : 'Sucessfully joined group! Your predictions page will now be created and you will be redirected.',
		success_creating : 'Successfully created! View?'
	};
	
	function initPredictions() {
		window.saveFileLocation = getSaveFileLocation();
		window.currentPageName = mw.config.get('wgPageName').replace(/_/g, ' ');
		if (!verifyLogin()) return;
		if (currentPageName !== saveFileLocation) {
			window.startSpinner(this);
			redirectToUserPage()
		}
		else {
			launchPredictions.bind(this)();
		}
	}
	
	function launchPredictions() {
		addStartMessages();
		$('.matchlist-time-cell').html('');
		$('.ml-team').off('click');
		$('.ml-team').hover(toggleTeamHover, toggleTeamHover);
		removeLockedRowsFromEditing();
		doReloadTasks(this);
		console.log('1');
		eventFire(document.getElementById('toggle-highlighting-button'), 'click');
		
		$('.ml-prediction-2 .matchlist-team2, .ml-prediction-1 .matchlist-team1, .ml-prediction-0 .matchlist-time-cell' ).each(function() {
			console.log('2');
			eventFire(this, 'click');
		});
	}
	
	function doReloadTasks(startButton) {
		eventFire(document.getElementById('matchlist-show-all'), 'click');
		// eventFire(document.getElementById('matchlist-show-schedule'), 'click');
		$(startButton).off('click');
		$(startButton).click(savePredictions);
		$(startButton).html(i18n.save_predictions);
		
		$('.ml-row-tbd .matchlist-team1').click(function(event) {
			makePrediction(this, event, 1);
		});
		$('.ml-row-tbd .matchlist-team2').click(function(event) {
			makePrediction(this, event, 2);
		});
		
		$('.user-predictions-allow-draws .ml-row-tbd .matchlist-time-cell').click(function(event) {
			makePrediction(this, event, 0);
		});
	}
	
	function relaunchPredictions() {
		doReloadTasks(this);
	}
	
	function verifyLogin() {
		if (! mw.config.get('wgUserId')) {
			if (confirm(i18n.alert_log_in)) {
				var curURL = window.location.href;
				if (! curURL.endsWith('#Match_Schedule')) curURL = curURL + '#Match_Schedule';
				var loginURL = "https://www.gamepedia.com/twitch-login?returnUrl=" + curURL;
				window.location.href = loginURL;
			}
		}
		else {
			return true
		}
	}
	function redirectToUserPage() {
		var alertText = currentPageName.includes('/User/') ? 'alert_wrong_user' : 'alert_overview_page';
		if (confirm(i18n[alertText])) {
			return verifyPageExistsOrCreate(false).then(goToUserPage);
		}
		window.endSpinner();
		return false;
	}
	function verifyPageExistsOrCreate(returnOnExists) {
		console.log('finding existing predictions');
		return new mw.Api().get({
			action : 'query',
			prop: 'revisions',
			titles: saveFileLocation,
			rvprop : 'ids'
		}).then(function(data) {
			if (data.query.pages[-1]) {
				return createBlankUserpage();
			}
			return returnOnExists;
		});
	}
	function createBlankUserpage() {
		console.log('creating blank user page');
		return new mw.Api().postWithToken('csrf', {
			action : 'edit',
			title : saveFileLocation,
			text : '{{UserPredictions}}',
			tags : 'prediction_edit'
		}).then(function() { return false; });
	}
	function goToUserPage() {
		// If a user without email confirmed tried to create a user page then
		// it will have failed silently
		// so we need to re-verify that the page exists here
		// before navigating there
		console.log('kittens');
		new mw.Api().get({
			action : 'query',
			prop: 'revisions',
			titles: saveFileLocation,
			rvprop : 'ids'
		}).then(function(data) {
			if (data.query.pages[-1]) {
				alert(i18n.please_confirm_email);
				window.endSpinner();
				return false;
			}
			window.location.href = mw.config.get('wgServer') + '/' + saveFileLocation;
			return false;
		});
	}
	function eventFire(el, etype){
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}
	function addStartMessages() {
		var sectionStart = document.getElementById('matchlist-section-start');
		var elHTML = '<div class="predictions-instructions">' + i18n.intro + '</div><div class="toggle-button prediction-action" id="toggle-highlighting-button">' + i18n.highlight_stop + '</div>';
		$(document.createElement('div')).css('clear','left').html(elHTML).attr('id', 'predictions-intro').insertAfter(sectionStart);
		$('#toggle-highlighting-button').click(toggleHighlighting);
		$('#toggle-styling-button').click(togglePredictionVsRealResultsStyling);
	}
	function removeLockedRowsFromEditing() {
		var nowTime = Date.now() / 1000;
		$('.ml-row-tbd').each(function() {
			var thenTime = $(this).attr('data-prediction-expire');
			if (!thenTime) return;
			if (nowTime + (30 * 60) > parseInt(thenTime)) { // 30 minutes expiration for now
				lockRow.bind(this)();
			}
		});
		// $('.ml-row-unknown-team, .matchlist-flex').each(lockRow);
		// as of july 2, we are creating & checking initialorder via MSHash so shouldn't need to lock that anymore
		$('.ml-row-unknown-team').each(lockRow);
	}
	function lockRow() {
		$(this).removeClass('ml-row-tbd');
		$(this).find('.matchlist-time-cell').html('<div class="prediction-locked"></div>');
	}
	function toggleHighlighting() {
		$('.ml-team, .matchlist-score').toggleClass('teamhighlighter').toggleClass('teamhighlight');
		var newHTML = $(this).html() == i18n.highlight_stop ? i18n.highlight_start : i18n.highlight_stop;
		$(this).html(newHTML);
	}
	function toggleTeamHover() {
		$(this).toggleClass('ml-team-hovered');
	}
	
	function togglePredictionVsRealResultsStyling() {
		$('#matchlist-content-wrapper').toggleClass('ml-reverse-pred-and-results');
		$('#matchlist-content-wrapper').toggleClass('ml-normal-pred-and-results');
	}
	
	function makePrediction(el, event, n) {
		event.stopPropagation();
		var $el = $(el);
		var $tr = $el.closest('tr');
		$tr.removeClass('ml-prediction-0').removeClass('ml-prediction-1').removeClass('ml-prediction-2');
		$tr.addClass('ml-prediction-' + n);
		var $middle = $tr.find('.matchlist-time-cell');
		$middle.attr('data-winner', n);
		if (n == 0) {
			$middle.html(i18n.draw).addClass('ml-prediction-0');
		}
		else {
			$middle.removeClass('ml-prediction-0');
			$middle.html($el.find('.teamimage-left, .teamimage-right').html());
		}
		
	}
	
	function savePredictions() {
		var startButton = this;
		return validatePredictions().then(function(result) {
			if (result === false) {
				alert(i18n.save_disallowed);
				return;
			}
			var data = getPredictions();
			var matchOrder = getMatchOrder();
			var tabOrder = getTabOrder();
			console.log('saving data');
			window.startSpinner(startButton);
			return new mw.Api().postWithToken('csrf', {
				action : 'edit',
				title : saveFileLocation,
				text : concatDataForSave(data, matchOrder, tabOrder),
				tags : 'prediction_edit'
			})
			.then(restoreUI.bind(startButton));
		});
	}
	
	function validatePredictions() {
		var linesToCheck = [];
		$('.ml-verify-prediction-expire.ml-prediction-0, .ml-verify-prediction-expire.ml-prediction-1, .ml-verify-prediction-expire.ml-prediction-2').each(function() {
			linesToCheck.push($(this).attr('data-game-id'));
		});
		if (linesToCheck.length === 0) {
			return $.Deferred().resolve(true);
		}
		var queryString = linesToCheck
			.map(function(x) { return 'UniqueMatch="' + x + '"' })
			.join(' OR ');
		console.log(queryString);
		return new mw.Api().get({
			action: 'cargoquery',
			tables: 'MatchSchedule',
			where: queryString,
			fields: 'OverrideAllowPredictions'
		}).then(function(data) {
			for (i in data.cargoquery) {
				if (data.cargoquery[i].title.OverrideAllowPredictions !== "1") {
					return false;
				}
			}
			return true;
		});
	}
	
	function getPredictions() {
		var data = [];
		$('table.matchlist').each(function() {
			data.push([]);
			$(this).find('.ml-row').each(function() {
				var result;
				if ($(this).hasClass('ml-prediction-1')) result = 1;
				if ($(this).hasClass('ml-prediction-2')) result = 2;
				if ($(this).hasClass('ml-prediction-0')) result = 0;
				data[data.length-1].push(result);
			});
		});
		return data;
	}
	
	function getMatchOrder() {
		var data = [];
		$('table.matchlist').each(function() {
			data.push([]);
			var i = 1;
			$(this).find('.ml-row').each(function() {
				var order = $(this).attr('data-initial-order');
				data[data.length-1].push(order ? order : false);
				i++;
			});
		});
		return data;
	}
	
	function getTabOrder() {
		var data = [];
		$('table.matchlist').each(function() {
			data.push([]);
			var i = 1;
			$(this).find('.ml-row').each(function() {
				var order = $(this).attr('data-initial-pageandtab');
				data[data.length-1].push(order ? order : false);
				i++;
			});
		});
		return data;
	}
	
	function getSaveFileLocation() {
		var user = mw.config.get('wgUserName');
		var title = mw.config.get('wgTitle').replace('/Group/', '/User/').replace(/\/Leaderboard.*/, '');
		console.log(title);
		var titleTable = title.split('/');
		if (titleTable[titleTable.length-2] == 'User' && mw.config.get('wgCanonicalNamespace') == 'Predictions') {
			titleTable[titleTable.length-1] = user;
		}
		else {
			titleTable.push('User');
			titleTable.push(user);
		}
		return 'Predictions:' + titleTable.join('/')
	}
	
	function concatDataForSave(data, matchOrder, tabOrder) {
		var dataConcat = concatDataTypeForSave(data, '');
		var orderConcat = concatDataTypeForSave(matchOrder, '_order');
		var tabConcat = concatDataTypeForSave(tabOrder, '_tab');
		console.log(orderConcat);
		console.log('printing tabConcat:');
		console.log(tabOrder);
		return '{{UserPredictions' + dataConcat + orderConcat + tabConcat + '}}';
	}
	
	function concatDataTypeForSave(data, suffix) {
		var tbl = [];
		for (tab in data) {
			var luaTab = parseInt(tab) + 1;
			for (row in data[tab]) {
				if (typeof data[tab][row] !== 'undefined' && (data[tab][row] || data[tab][row] === 0)) {
					var luaRow = parseInt(row) + 1;
					tbl.push('|t' + luaTab + '_r' + luaRow + suffix + '=' + data[tab][row]);
				}
			}
		}
		return tbl.join('');
	}
	
	function restoreUI() {
		alert(i18n.save_predictions_done);
		$(this).off('click');
		$(this).html(i18n.relaunch_predictions);
		$(this).click(relaunchPredictions);
		$('.ml-team').off('click');
		$('.matchlist-time-cell').off('click');
		window.endSpinner();
	}
	
	$('#matches-prediction-begin').click(initPredictions);
	
	$('#predictions-join-group').click(function() {
		window.startSpinner(this);
		window.saveFileLocation = getSaveFileLocation();
		console.log(saveFileLocation);
		window.currentPageName = mw.config.get('wgPageName').replace(/_/g, ' ');
		var memberList = $(this).attr('data-current-member-list');
		var user = mw.config.get('wgUserName');
		var re = new RegExp('(^|,)' + user + '($|,)')
		if (memberList.match(re)) {
			alert(i18n.error_already_in_group);
			return;
		}
		return new mw.Api().postWithToken('csrf', {
			action : 'edit',
			title : mw.config.get('wgPageName'),
			text : '{{UserPredictionsGroup|members=' + memberList + ',' + user + '}}',
			tags : 'prediction_edit'
		}).then(function(data) {
			return verifyPageExistsOrCreate(true).then(function (result) {
				if (result) {
					alert(i18n.success_joining_group);
					window.endSpinner();
				}
				else {
					alert(i18n.success_joining_group_now_creating_page);
					return createBlankUserpage().then(goToUserPage);
				}
			})
		});
	});
	
	$('.predictions-create-page').each(function() {
		$(this).click(function() {
			window.startSpinner(this);
			var targetTitle = $(this).attr('data-target-title');
			if (! confirm(i18n.confirm_new_page)) {
				window.endSpinner();
				return;
			}
			var a = new mw.Api()
			return a.postWithToken('csrf', {
				action : 'edit',
				title : targetTitle,
				text : '{{' + $(this).attr('data-target-text') + '}}',
				tags : 'prediction_edit'
			}).then(function(data) {
				a.postWithToken('csrf', {
					action: 'purge',
					titles : mw.config.get('wgPageName')
				});
				if (confirm(i18n.success_creating)) {
					window.location.href = mw.config.get('wgServer') + '/' + targetTitle;
				}
				window.endSpinner();
			});
		});
	});
	
	$('#predictions-join-or-create').click(function() {
		window.startSpinner(this);
		var groupName = prompt(i18n.prompt_create_group_name);
		if (!groupName) {
			window.endSpinner();
			return;
		}
		var title = mw.config.get('wgPageName');
		var groupTitle = title.replace(/User\/.*/, 'Group') + '/' + groupName;
		var a = new mw.Api();
		return a.get({
			action : 'query',
			prop: 'revisions',
			titles: groupTitle,
			rvprop : 'ids'
		}).then(function(data) {
			if (data.query.pages[-1]) {
				return createNewGroup(groupTitle);
			}
			window.location.href = mw.config.get('wgServer') + '/' + groupTitle
			window.endSpinner();
		});
	});
	
	$('#predictions-reload-data').click(function() {
		purgeWithConfirmationAndReload();
	});
	
	function createNewGroup(groupTitle) {
		var user = mw.config.get('wgUserName');
		return new mw.Api().postWithToken('csrf', {
			action : 'edit',
			title : groupTitle,
			text : '{{UserPredictionsGroup|members=' + user + '}}',
			tags : 'prediction_edit'
		}).then(function() {
			window.location.href = mw.config.get('wgServer') + '/' + groupTitle;
		});
	}
	
	
	$('#predictions-reload-user-data').click(function() {
		if (! confirm(i18n.reload_page)) return;
		window.startSpinner(this);
		return blankEditWithReload();
	});
	
	$('#predictions-reload-user-data-from-leaderboard').click(function() {
		var title = getSaveFileLocation();
		var el = this;
		return doesPageExist(title).then(function(result) {
			if (! result) {
				alert(i18n.no_user_page);
				return;
			}
			if (! confirm(i18n.reload_page)) return;
			window.startSpinner(el);
			return blankEdit(title).then(purgeWithReload);
		});
	});
	
	$('.predictions-refresh-target').each(function() {
		$(this).click(function() {
			var target = $(this).attr('data-refresh-target');
			window.startSpinner(this);
			if (! confirm(i18n.reload_page)) {
				window.endSpinner();
				return;
			}
			return blankEdit(target).then(purgeWithReload);
		});
	});
	
});
// </nowiki>