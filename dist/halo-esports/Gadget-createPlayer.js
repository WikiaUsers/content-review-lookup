$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	var ns = mw.config.get("wgCanonicalNamespace");
	var infoboxP = document.getElementById('infoboxPlayer');
	var infoboxT = document.getElementById('infoboxTeam');
	if (ns == "" && (infoboxP || infoboxT)) {
			var summary;
			var a;
			var thistitle;
			var i;
			var summary;
			var tag;
			var titles;
			var texts;
			function makePage() {
				if (i == titles.length) {
					displayColor(statuscolor);
					console.log('Done!');
					return;
				}
				var title = titles[i];
				a.get({action:"query",prop:"pageprops",titles:title}).done(function (data){
					if (data.query.pages["-1"] != undefined) {
						var text = texts[i].replace('%s', thistitle);
						a.postWithToken("csrf",{
							action:"edit",
							title:title,
							text:text,
							summary:summary,
							tags:tag
						}).done(function (data){
							i++;
							makePage();
						}).fail(function (code, data){
							console.log("Creating concept failed, code: " + code);
							statuscolor = "gadget-action-fail";
							i++;
							makePage();
						});
						return;
					}
					else {
						i++;
						statuscolor = "gadget-action-incomplete";
						makePage();
					}
					return;
				}).fail(function (code, data){
					console.log("Couldn't determine if page " + title + " exists, moving on. Code: " + code)
					statuscolor = "gadget-action-fail";
					i++;
					makePage();
					return;
				});
		}
		if (infoboxP) {
			$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Create Player', 'ca-create-player', 'Create player subpages')).click(function() {
				clearDisplayColor();
				if (!confirm('Create Player?')) {
					return;
				}
				statuscolor = "gadget-action-success";
				tag = "create_player"
				i = 0;
				a = new mw.Api();
				thistitle = mw.config.get("wgTitle");
				summary = "Automatically creating player subpages via CreatePlayer";
				titles = [ thistitle + '/Tournament Results', 
					thistitle + '/Tournament Results/Online', 
					thistitle + '/Tournament Results/Offline',
					'Tooltip:' + thistitle ];
				texts = [ "{{PlayerTabsHeader}}\n{{PlayerResults|%s|show=everything}}",
					"{{PlayerTabsHeader}}\n{{PlayerResults|%s|show=everything|type=online}}",
					"{{PlayerTabsHeader}}\n{{PlayerResults|%s|show=everything|type=offline}}",
					"{{PlayerTooltip}}"
				];
				makePage();
			});
		}
		if (infoboxT) {
			$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Create Team', 'ca-create-team', 'Create team subpages')).click(function() {
				clearDisplayColor();
				statuscolor = "gadget-action-success";
				tag = "create_team"
				i = 0;
				a = new mw.Api();
				thistitle = mw.config.get("wgTitle");
				summary = "Automatically creating player subpages via CreateTeam";
				tag = "create_team"
				titles = [ thistitle + '/Tournament Results',
					thistitle + '/Tournament Results/Online',
					thistitle + '/Tournament Results/Offline',
					thistitle + '/Schedule History',
					'Tooltip:' + thistitle ];
				texts = [ "{{TeamTabsHeader}}\n{{TeamResults|%s|show=everything}}",
					"{{TeamTabsHeader}}\n{{TeamResults|%s|show=everything|type=online}}",
					"{{TeamTabsHeader}}\n{{TeamResults|%s|show=everything|type=offline}}",
					"{{TeamTabsHeader}}\n{{TeamSchedule|%s}}",
					"{{RosterTooltip}}"
				];
				if (!confirm("Create team?")) {
					return;
				}
				makePage();
			});
		}
	}
});