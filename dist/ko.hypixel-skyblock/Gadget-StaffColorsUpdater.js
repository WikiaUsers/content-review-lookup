/*
Config File for script stored at [[MediaWiki:Gadget-StaffColorsUpdater.json]]
The CSS Page for staff colors stored at [[MediaWiki:Custom-common.less/staff-colors.less]]

Methods/Properties loaded to the mw.util object
- (#M1) mw.util.StaffUtil.fetchStaffList() : Adds/Updates data of the following properties:
	- (#P1) mw.util.StaffUtil.jsonData : Stores data from the Config File
	- (#P2) mw.util.StaffUtil.groupsList : Stores unprocessed data of users in each usergroup
	- (#P3) mw.util.StaffUtil.membersList : Stores information about users of each staff rank
- (#M2) mw.util.StaffUtil.printStaffList() : Same as fetchStaffList but prints results to console
- (#M3) mw.util.StaffUtil.updateStaffColors(cb, thisArg) : Same as fetchStaffList but also updates the CSS Page; Only loaded for CE+
*/

/* jshint
	esversion: 5, forin: false, 
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

mw.loader.using(["mediawiki.api"]).then(function () {

	function forKeys(o, cb, thisArg) {
		var count = 0;
		Object.keys(o).forEach(function (key) {
			var value = o[key];
			cb.call(thisArg, key, value, o, count);
			count++;
		});
	}

	function objectToRule(o) {
		var ret = [];
		forKeys(o, function (k, v) {
			ret.push("\t" + k + ": " + v + ";");
		});
		return "{\n" + ret.join("\n") + "\n}";
	}

	function finalAlert($this) {
		$this.text("Update Staff Colors");
		alert("Staff Color Updater: Successful updated LESS for staff colors.\n\n" +
			Object.keys(mw.util.StaffUtil.membersList).map(function (i) {
				return mw.util.StaffUtil.membersList[i].rank + ": " + mw.util.StaffUtil.membersList[i].users.length;
			}).join("\n") + "\n\n" +
			"File Updated: Custom-common.less/staff-colors.less\n" +
			"Script: Gadget-StaffColorsUpdater.js\n" +
			"Configs: Gadget-StaffColorsUpdater.json\n\n" +
			"Remark: To see the changes, you still have to update CSS."
		);
	}

	function parse() {
		var def = new $.Deferred();

		mw.util.StaffUtil.fetchStaffList().then(function () {
			var data = mw.util.StaffUtil.jsonData;
			new mw.Api().get({
				action: "query",
				list: "allusers",
				augroup: Object.keys(data.ids).join("|"),
				auprop: "groups",
				aulimit: 500,
			}).then(function (d) {
				var states = ["LINKS", "ICONS", "TAGS"];
				d = d.query.allusers
					.map(function (v) {
						return {
							name: v.name,
							groups: v.groups
								.filter(function (v) {
									return !data.implicitGroups.includes(v);
								})
								.map(function (v) {
									return data.ids[v];
								}),
						};
					});

				var overrides = data.overrides;
				var overridesList = {
					ICONS: [],
					LINKS: [],
					TAGS: [],
				};

				forKeys(overrides, function (state, v) {
					forKeys(v, function (rank_, list) {
						list.forEach(function (user) {
							overridesList[state].push(user);
							if (!mw.util.StaffUtil.groupsList[rank_].includes(user)) mw.util.StaffUtil.groupsList[rank_].push(user);
						});
					});
				});

				function eachState(state, i) {
					var temp = [];
					var done = {};

					for (var j in mw.util.StaffUtil.membersList) {
						if (mw.util.StaffUtil.membersList[j].parse) {
							var rank = mw.util.StaffUtil.membersList[j].rank,
								validusers = mw.util.StaffUtil.membersList[j].users;

							var userList = [];
							var hidden = [];
							var ruleType = [];
							temp.push("\n/* " + rank + "*/");

							function each(user) {
								if (data.ignore.includes(user)) return;
								if (user.includes(" ")) each(user.replace(/ /g, "_"));
								var sel = data.selectors[state].replace(/\$1/g, user);

								if (!done[user] && !overridesList[state].includes(user)) {
									ruleType.push("normal");
									userList.push(sel);
								} else if (overrides[state][rank].includes(user) && !done[user]) {
									ruleType.push("override");
									userList.push(sel);
								} else if (!done[user] && overridesList[state].includes(user)) {
									ruleType.push("overridden");
									userList.push("/* " + sel + " */");
								}

								if (done[user]) hidden.push("  " + sel);

								if (!overridesList[state].includes(user)) done[user] = true;
							}

							validusers.forEach(each);

							var lastElem = -1;
							for (var index = ruleType.length - 1; index >= 0; index--) {
								if (ruleType[index] === "normal" || ruleType[index] === "override") {
									lastElem = index;
									break;
								}
							}
							for (index = 0; index < ruleType.length; index++) {
								if (index === lastElem) userList[index] = userList[index].replace(/,(\s*)$/, "$1");
								if (ruleType[index] === "override") userList[index] += " /* This selector is an override */";
								if (ruleType[index] === "overridden") userList[index] += " /* This selector is overridden */";
							}

							temp.push("/* " + data.abbr[rank] + "\'s with higher ranks are removed\n" + hidden.join("\n") + "\n*/");
							temp.push(userList.join("\n"));

							var rule = objectToRule(data.styles[state]);
							if (i === 0) rule = rule.replace(/\$1/, data.colors[rank][0]).replace(/\$2/, data.colors[rank][1]);
							else if (i === 1) rule = rule.replace(/\$1/, data.imageUrls[rank]);
							else if (i === 2) rule = rule.replace(/\$1/, data.wallText[rank]);

							if (lastElem === -1) rule = "/*\n" + rule + "\n*/";
							temp.push(rule);
						}
					}
					return "\n/*** " + state + " ***/\n" + temp.join("\n");
				}

				var allstates = states.map(function (state, i) {
					return eachState(state, i);
				});

				var ret = ["/* Staff Colors\n\nThis stylesheet contains the css to color staff member\'s names. \nIt is automatically updated, any changes you make will be \noverwritten next time this stylesheet gets updated. \n*/"];
				for (var i in allstates)
					ret.push(allstates[i]);

				def.resolve(ret.join("\n"));
			}).catch(console.warn);
		}).catch(console.warn);

		return def;
	}

	(function init() {
		mw.util.StaffUtil = mw.util.StaffUtil || {};

		mw.hook("hsw.gadget.staffColorsUpdater").fire(mw.util.StaffUtil.updateStaffColors);

		if (window.StaffColorsUpdaterLoaded) return;
		window.StaffColorsUpdaterLoaded = true;

		mw.util.StaffUtil.fetchStaffList = function () {
			var def = new $.Deferred();

			$.getJSON(new mw.Title("Gadget-StaffColorsUpdater.json", 8).getUrl({
				action: "raw",
				ctype: "text/json"
			})).then(function (data) {
				mw.util.StaffUtil.jsonData = data;

				var bypassn = [];
				var staffn = {};

				function waitTill(rank, users) {
					return new mw.Api().get({
						action: "query",
						list: "users",
						ususers: users.join("|"),
						usprop: "groupmemberships",
						aulimit: 500,
					}).then(function (dt) {
						function searchid(rank) {
							var rankid;

							function cb(k, v) {
								if (v === rank) rankid = k;
							}
							forKeys(data.ids, cb);
							return rankid;
						}

						dt = dt.query.users;
						var valid = {};
						for (var k in dt) {
							valid[dt[k].name] = true;
							if (dt.hasOwnProperty(k) && dt[k].hasOwnProperty("groupmemberships")) {
								var arr = dt[k].groupmemberships;
								for (var i in arr) {
									if (arr[i].group === searchid(rank)) {
										var name = dt[k].name;
										valid[name] = arr[i].expiry === "infinity";
										if (!valid[name] && !bypassn.includes(name))
											bypassn.push(name);
									}
								}
							}
						}
						staffn[rank] = users.filter(function (user) {
							return valid[user];
						});
						return {
							"rank": rank,
							"users": staffn[rank],
						};
					});
				}

				new mw.Api().get({
					action: "query",
					list: "allusers",
					augroup: Object.keys(data.ids).join("|"),
					auprop: "groups",
					aulimit: 500,
				}).done(function (d) {
					d = d.query.allusers
						.map(function (v) {
							return {
								name: v.name,
								groups: v.groups
									.filter(function (v) {
										return !data.implicitGroups.includes(v);
									})
									.map(function (v) {
										return data.ids[v];
									}),
							};
						});

					var groupsList = {};
					data.ranks.forEach(function (rank) {
						groupsList[rank] = [];
						d.forEach(function (v) {
							if (v.groups.includes(rank)) {
								groupsList[rank].push(v.name);
							}
						});
					});
					mw.util.StaffUtil.groupsList = groupsList;

					var allwaits = [];

					forKeys(groupsList, function (rank, users) {
						allwaits.push(waitTill(rank, users));
					});

					return $.when.apply($, allwaits).then(function () {
						var obj = [];
						if (Object.keys(staffn).length) {
							Object.keys(data.order).sort(function (a, b) {
								data.order[a] > data.order[b];
							}).forEach(function (k) {
								obj.push({
									rank: k,
									users: staffn[k],
									parse: true,
								});
							});
							obj.push({
								rank: "Skipped Temporary Ranks",
								users: bypassn,
								parse: false,
							});
						}

						console.log("Staff Lists Updated.");
						mw.util.StaffUtil.membersList = obj;
						def.resolve();
					}).catch(console.warn);
				}).catch(console.warn);
			}).catch(console.warn);

			return def;
		};

		mw.util.StaffUtil.printStaffList = function () {
			mw.util.StaffUtil.fetchStaffList().then(function () {
				console.log("[StaffUtil] Showing values...");
				console.log("Showing mw.util.StaffUtil.jsonData");
				console.log(mw.util.StaffUtil.jsonData);
				console.log("Showing mw.util.StaffUtil.groupsList");
				console.log(mw.util.StaffUtil.groupsList);
				console.log("Showing mw.util.StaffUtil.membersList");
				console.log(mw.util.StaffUtil.membersList);
			});
		};

		if (/sysop|codeeditor|staff|util|soap|wiki-manager|content-team-member|content-reviewer|content-volunteer/
			.test(mw.config.get("wgUserGroups").join("\n").toLowerCase())) { // In one of these usergroups
			mw.util.StaffUtil.updateStaffColors = function (cb, thisArg) {
				parse().then(function (css) {
					new mw.Api().postWithEditToken({
						action: "edit",
						text: css,
						title: "MediaWiki:Custom-common.less/staff-colors.less",
						summary: "Updating Staff Colors (StaffColorsUpdater)",
						minor: 1,
					}).then(function (r) {
						if (cb) cb.call(thisArg, css, r);
					}, console.warn);
					console.log("Staff Colors (Less) Updated.");
				});
			};
		}

		var allowedPages = ["Custom-common.less", "Common.css"].map(function (p) {
			return mw.config.get("wgFormattedNamespaces")[8] + ":" + p;
		});

		if (allowedPages.includes(mw.config.get("wgPageName")) && mw.config.get("wgAction") === "view") {
			$("#mw-content-text").prepend($("<a>", {
				class: "wds-button",
				html: $("<div>", {
					click: function () {
						var $this = $(this);
						$this.text("Updating...");
						$this.attr({
							disabled: true
						});
						mw.util.StaffUtil.updateStaffColors(finalAlert.bind(null, $this));
					},
					text: "Update Staff Colors",
					title: "Update Staff Colors",
				}),
				title: "Update Staff Colors",
				css: {
					cursor: "pointer",
					"margin": "0 0 5px 5px",
				}
			}));
		}

	}());
});