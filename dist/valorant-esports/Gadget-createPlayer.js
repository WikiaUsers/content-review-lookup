// <nowiki>
$( function () { 
	var ns = mw.config.get("wgCanonicalNamespace");
	var infoboxP = document.getElementById('infoboxPlayer');
	var infoboxTeam = document.getElementById('infoboxTeam');
	var infoboxTournament = document.getElementById('infoboxTournament');
	if (ns != "" || (! infoboxP && ! infoboxTeam && ! infoboxTournament)) return;
	var summary;
	var a;
	var thistitle;
	var summary;
	var tag;
	var titles;
	var texts;
	function makePages(titles, texts) {
		if (titles.length == 0) {
			console.log('no pages left');
			return $.Deferred().resolve();
		}
		console.log(title);
		var title = titles.shift();
		var text = texts.shift();
		return a.get({action:"query",prop:"pageprops",titles:title}).then(function (data){
			if (data.query.pages["-1"] != undefined) {
				text = text.replace('%s', thistitle);
				return a.postWithToken("csrf",{
					action:"edit",
					title:title,
					text:text,
					summary:summary,
					tags:tag
				}).then(function (data){
					console.log('Created ' + title);
					return makePages(titles, texts);
				}, function (code, data){
					console.log("Creating " + title + " failed, code: " + code);
					statuscolor = "gadget-action-fail";
					return makePages(titles, texts);
				});
			}
			else {
				statuscolor = "gadget-action-incomplete";
				return makePages(titles, texts);
			}
		}, function (code, data){
			console.log("Couldn't determine if page " + title + " exists, moving on. Code: " + code)
			statuscolor = "gadget-action-fail";
			return makePages(titles, texts);
		});
	}
	
	function printSuccess() {
		displayColor(statuscolor);
		console.log('Done!');
	}
	
	function createPlayer() {
		var form = document.createElement('form');
		$(form).html('<input id="create-player-makestats" type="checkbox"> <label for="create-player-makestats">Make Stats?</label><br><input type="submit" id="create-player-submit" value="Create">');
		$(form).insertAfter('#firstHeading');
		$(document.getElementById('create-player-submit')).click(function(e) {
			e.preventDefault();
			clearDisplayColor();
			statuscolor = "gadget-action-success";
			tag = "create_player"
			a = new mw.Api();
			thistitle = mw.config.get("wgTitle");
			summary = "Automatically creating player subpages via CreatePlayer";
			var makeStats = document.getElementById('create-player-makestats').checked;
			titles = [
				thistitle + '/Tournament Results',
				'Tooltip:' + thistitle,
			];
			texts = [
				"{{PlayerTabsHeader}}\n{{PlayerResults|show=everything}}",
				"{{PlayerTooltip}}",
			];
			if (makeStats) {
				titles.push(thistitle + '/Match History');
				texts.push('{{PlayerTabsHeader}}\n{{MatchHistoryPlayer}}');
				titles.push(thistitle + '/Statistics');
				texts.push('{{PlayerTabsHeader}}\n{{CareerPlayerStats}}');
			}
			return makePages(titles, texts).then(printSuccess);
		});
		
	}
	
	function createTeam() {
		var form = document.createElement('form');
		$(form).html('<input id="create-team-makestats" type="checkbox"> <label for="create-team-makestats">Make Stats?</label><br><input type="submit" id="create-team-submit" value="Create">');
		$(form).insertAfter('#firstHeading');
		$(document.getElementById('create-team-submit')).click(function(e) {
			e.preventDefault();
			clearDisplayColor();
			statuscolor = "gadget-action-success";
			tag = "create_team"
			a = new mw.Api();
			thistitle = mw.config.get("wgTitle");
			summary = "Automatically creating team subpages via CreateTeam";
			var makeStats = document.getElementById('create-team-makestats').checked;
			titles = [
				thistitle + '/Tournament Results',
				thistitle + '/Schedule History',
				'Tooltip:' + thistitle
			];
			texts = [
				"{{TeamTabsHeader}}\n{{TeamResults|%s|show=everything}}",
				"{{TeamTabsHeader}}\n{{TeamScheduleHistory}}",
				"{{RosterTooltip}}"
			]
			if (makeStats) {
				titles.push(thistitle + '/Match History');
				texts.push('{{TeamTabsHeader}}\n{{MatchHistoryTeam|%s}}');
			}
			return makePages(titles, texts).then(printSuccess);
		});
	}
	
	// create tournament
	function getTabsTemplate(input) {
		return a.get({
			action : 'query',
			prop:'revisions',
			rvprop: 'content',
			rvlimit: 1,
			titles: thistitle
		}).then(function(data) {
			for (var p in data.query.pages) {
				var text = data.query.pages[p].revisions[0]['*'];
				var lines = text.split('\n');
				input.value = lines[0];
				return lines[0].replace(/\|.*\}\}/,'}}');
			}
		});
	}
	
	function getTournamentName(input) {
		return a.get({
			action: 'cargoquery',
			tables: 'Tournaments',
			where : 'OverviewPage = "' + thistitle + '"',
			fields: 'StandardName'
		}).then(function(data) {
			var result = data.cargoquery[0].title.StandardName;
			input.value = result;
			return result;
		});
	}
	
	function createTournament() {
		a = new mw.Api();
		var form = document.createElement('form');
		$(form).html('If the Tournament Name says [Loading] you may need to edit CCMT first and/or create a redirect. Otherwise type the CCMT-style unique name for this event. If you aren\'t sure what this means join our Discord (linked in the sidebar).<br><input id="create-tournament-makerosters" type="checkbox" checked> <label for="create-tournament-makerosters">Make Rosters?</label><br><input id="create-tournament-makestats" type="checkbox" checked> <label for="create-tournament-makestats">Make Stats?</label><br><input id="create-tournament-makepickbans" type="checkbox" checked> <label for="create-tournament-makepickbans ">Make Pick-Bans?</label><br>Tabs Text: <input id="create-tournament-tabsname" value="[Loading]"> Tabs Template<br>Tabs Text: <input id="create-tournament-tournamentname" value="[Loading]"> Tournament Name<br><textarea id="create-tournament-sbtext" style="height:100px;width:300px;">{{TOCFlat}}</textarea> Scoreboard Text<br><input type="submit" id="create-tournament-submit" value="Create">');
		$(form).insertAfter('#firstHeading');
		thistitle = mw.config.get("wgTitle");
		var statsCheck = document.getElementById('create-tournament-makestats');
		var pbCheck = document.getElementById('create-tournament-makepickbans');
		var rostersCheck = document.getElementById('create-tournament-makerosters');
		var tabsField = document.getElementById('create-tournament-tabsname');
		var nameField = document.getElementById('create-tournament-tournamentname');
		getTabsTemplate(tabsField).then(function() {
			return getTournamentName(nameField)
		});
		$(document.getElementById('create-tournament-submit')).click(function(e) {
			e.preventDefault();
			var tabsText = tabsField.value ? tabsField.value.replace(/\|.*/, '}}') : undefined;
			var nameText = nameField.value;
			console.log('Tabs template: ' + tabsText);
			if ( tabsText == '[Loading]' || nameText == '[Loading]' ) {
				prompt("Values aren't loaded, please retry. You may enter values manually if you want.");
				return;
			}
			function getSBPages(title, check, tabs) {
				console.log('getting contents of tabs template');
				if (!check.checked) return $.Deferred().resolve();
				var template = tabs.replace(/[\{\}]/g,'');
				console.log(template);
				return a.get({
					action: 'query',
					prop: 'revisions',
					titles: template,
					rvprop: 'content'
				}).then(function(data) {
					console.log('querying module for list of pages')
					var content;
					for (p in data.query.pages) {
						console.log(data.query.pages);
						content = data.query.pages[p].revisions[0]["*"];
					}
					content = content.replace('TournamentTabs', '#invoke:GetSubSubpageList|main|subpage=Scoreboards|page=' + title);
					return a.get({
						action: 'parse',
						text: content,
						prop: 'text'
					}).then(function(data) {
						var str = data.parse.text['*'];
						console.log(str);
						var splitStr = str.split('*****');
						str = splitStr[1];
						return str.split(',');
					}, function(code, data) {
						console.log('Failed to parse the module');
					});
				}, function(code, data) {
					console.log('Failed to get template content');
				});
			}
			
			function makeStatsPages(title, tabs, name, sbPageList) {
				console.log('making stats pages');
				var titles = [
					thistitle + '/Match History',
					thistitle + '/Champion Statistics',
					thistitle + '/Player Statistics'
				];
				var texts = [
					tabs + '\n{{MatchHistoryTournament}}',
					tabs + '\n{{OverallChampionStats}}',
					tabs + '\n{{OverallPlayerStats}}'
				];
				var scoreboardExtraText = $('#create-tournament-sbtext').val();
				var scoreboardText = tabs + (scoreboardExtraText ? scoreboardExtraText : '');
				for (var i in sbPageList) {
					titles.push(sbPageList[i]);
					texts.push(scoreboardText);
				}
				return makePages(titles, texts);
			}
			
			function makePBPages(title, tabs) {
				console.log('making pick-ban pages');
				var titles = [
					title + '/Picks and Bans'
				];
				var texts = [
					tabs + "\n\{\{PBHistoryTournament\}\}",
				];
				return makePages(titles, texts);
			}
			
			function makeRosterPages(title, tabs) {
				console.log('making rosters');
				var titles = [title + '/Team Rosters'];
				var texts = [tabs]
				return makePages(titles, texts);
			}
			statuscolor = "gadget-action-success";
			tag = "create_tournament";
			return getSBPages(thistitle, statsCheck, tabsText).then(function(sbPageList) {
				if (!statsCheck.checked) return $.Deferred().resolve();
				return makeStatsPages(thistitle, tabsText, nameText, sbPageList);
			}).then(function() {
				if (!pbCheck.checked) return $.Deferred().resolve();
				return makePBPages(thistitle, tabsText);
			}).then(function() {
				if (!rostersCheck.checked) return $.Deferred().resolve();
				return makeRosterPages(thistitle, tabsText);
			}).then(printSuccess);
		});
	}
	
	if (infoboxP) {
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Create Player', 'ca-create-player', 'Create player subpages')).click(createPlayer);
	}
	if (infoboxTeam) {
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Create Team', 'ca-create-team', 'Create team subpages')).click(createTeam);
	}
	if (infoboxTournament) {
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Create Tournament', 'ca-create-tournament', 'Create tournament subpages')).click(createTournament);
	}
});
// </nowiki>