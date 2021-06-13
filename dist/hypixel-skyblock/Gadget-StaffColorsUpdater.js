/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw */
/* Config File for script stored at [[MediaWiki:Gadget-StaffColorsUpdater.js/staff-colors.json]] */
mw.loader.using(['mediawiki.api']).then(function() {
	function forKeys(o, cb, thisArg) {
		var count = 0;
		Object.keys(o).forEach(function(key) {
			var value = o[key];
			cb.call(thisArg, key, value, o, count);
			count++;
		});
	}
	
	function parse() {
		var def = new $.Deferred();
		
		$.getJSON("https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Gadget-StaffColorsUpdater.js/staff-colors.json?action=raw&ctype=text/json").then(function(data) {
			new mw.Api().get({
				action: "query",
				list: "allusers",
				augroup: Object.keys(data.ids).join('|'),
				auprop: "groups",
				aulimit: 500,
			}).done(function(d) {
				console.log(d);
				var ret = ['/* Staff Colors\n\nThis stylesheet contains the css to color staff member\'s names. \nIt is automatically updated, any changes you make will be \noverwritten next time this stylesheet gets updated. \n*/'];
		
				var states = ['LINKS', 'ICONS', "TAGS"];
				d = d.query.allusers
					.map(function(v) {
						return { 
							name: v.name,
							groups: v.groups
								.filter(function(v) { return !data.implicitGroups.includes(v); })
								.map(function(v) { return data.ids[v]; }),
						};
					});
	
				var groupsList = {};
				data.ranks.forEach(function(rank) {
					groupsList[rank] = [];
					d.forEach(function(v) {
						if (v.groups.indexOf(rank) !== -1) {
							groupsList[rank].push(v.name);
						}
					});
				});
				
				function objectToRule(o) {
					var ret = [];
					forKeys(o, function(k, v) {
						ret.push('\t' + k + ': ' + v + ';');
					});
					return '{\n' + ret.join('\n') + '\n}';
				}
				
				var overrides = data.overrides;
				var overridesList = {
					ICONS: [],
					LINKS: [],
					TAGS: [],
				};
				
				forKeys(overrides, function(state, v) {
					forKeys(v, function(rank_, list) {
						console.log(list);
						list.forEach(function(user) {
							overridesList[state].push(user);
							if (groupsList[rank_].indexOf(user) === -1) groupsList[rank_].push(user);
						});
					});
				});
				
				states.forEach(function(state, i) {
					ret.push("/*** " + state + " ***/\n");
					
					var temp = [];
					var done = {};
					
					forKeys(groupsList, function(rank, users) {
						var userList = [];
						var hidden = [];
						var ruleType = [];
						temp.push("\n/* " + rank + "*/");
						
						function each(user) {
							if (data.ignore.indexOf(user) !== -1) return;
							if (user.includes(' ')) each(user.replace(/ /g, '_'));
							var sel = data.selectors[state].replace(/\$1/, user);
							
							if (!done[user] && overridesList[state].indexOf(user) === -1) {
								ruleType.push("normal");
								userList.push(sel);
							}
							else if (overrides[state][rank].indexOf(user) !== -1 && !done[user]) {
								ruleType.push("override");
								userList.push(sel);
							}
							else if (!done[user] && overridesList[state].indexOf(user) !== -1) {
								ruleType.push("overridden");
								userList.push('/* ' + sel + ' */');
							}
							
							if (done[user]) hidden.push('  ' + sel);
							
							if (overridesList[state].indexOf(user) === -1) done[user] = true;
						}
						
						users.forEach(each);
						
						var lastElem = -1;
						for (var index = ruleType.length-1; index >= 0; index--) {
							if (ruleType[index] === "normal" || ruleType[index] === "override") {
								lastElem = index;
								break;
							}
						}
						for (index = 0; index < ruleType.length; index++) {
							if (index === lastElem) userList[index] = userList[index].replace(/,(\s*)$/, '$1');
							if (ruleType[index] === "override") userList[index] += " /* This selector is an override */";
							if (ruleType[index] === "overridden") userList[index] += " /* This selector is overridden */";
						}
						
						temp.push('/* ' + data.abbr[rank] + '\'s With higher ranks are removed\n' + hidden.join('\n') + '\n*/');
						temp.push(userList.join('\n'));
						
						var rule = objectToRule(data.styles[state]);
						if (i === 0) rule = rule.replace(/\$1/, data.colors[rank][0]).replace(/\$2/, data.colors[rank][1]);
						else if (i === 1) rule = rule.replace(/\$1/, data.imageUrls[rank]);
						else if (i === 2) rule = rule.replace(/\$1/, data.wallText[rank]);
						
						temp.push(rule);
					});
					ret.push(temp.join('\n'));
				});
				
				def.resolve(ret.join('\n'));
			}).catch(console.warn);
		}).catch(console.warn);
		
		return def;
	}

	(function init() {
		window.updateStaffColors = function(cb, thisArg) {
			parse().then(function(css) {
				new mw.Api().postWithEditToken({
					action: "edit",
					text: css,
					title: 'MediaWiki:Custom-common.less/staff-colors.less',
					summary: "Updating Staff Colors (StaffColorsUpdater)",
					minor: 1,
				}).then(function(r) {
					if (cb) cb.call(thisArg, css, r);
				}, console.warn);
			});
		};
		
		mw.hook('hsw.gadget.staffColorsUpdater').fire(window.updateStaffColors);
		if (
			window.StaffColorsUpdaterLoaded 
			|| (
				mw.config.get('wgPageName') !== 'MediaWiki:Custom-common.less/staff-colors.less' 
				&& mw.config.get('wgPageName') !== 'MediaWiki:Gadget-StaffColorsUpdater.js/staff-colors.json' 
				&& mw.config.get('wgPageName') !== 'MediaWiki:Custom-common.less' 
			)
			|| mw.config.get('wgAction') !== 'view'
			|| !/sysop|codeeditor|staff|util|soap|wiki-manager|content-team-member|content-reviewer|content-volunteer/.test(mw.config.get('wgUserGroups').join('\n').toLowerCase())
		) return;
		window.StaffColorsUpdaterLoaded = true;
		
		$('#mw-content-text').prepend($('<div>', {
			class: "wds-button",
			html: $('<div>', {
				click: function() {
					var $this = $(this);
					$this.text("Updating...");
					$this.attr({ disabled: true });

					window.updateStaffColors(function() {
						$this.text("Update Staff Colors");
						alert('Done!');
					});
				},
				text: "Update Staff Colors",
				title: "Update Staff Colors",
			}),
			title: "Update Staff Colors",
			css: {
				cursor: "pointer",
			}
		}));
	}());
});