/*
Конфигурационный файл для скрипта, хранящийся на [[MediaWiki:Gadget-StaffColorsUpdater.json]]
Страница CSS для цветов персонала, хранящаяся на [[MediaWiki:Custom-common.less/staff-colors.less]]

Methods/Properties loaded to the mw.util object
- (#M1) mw.util.StaffUtil.fetchStaffList() : Добавляет/обновляет данные следующих свойств:
	- (#P1) mw.util.StaffUtil.jsonData : Хранит данные из конфигурационного файла
	- (#P2) mw.util.StaffUtil.groupsList : Хранит необработанные данные пользователей в каждой группе пользователей
	- (#P3) mw.util.StaffUtil.membersList : Хранит информацию о пользователях каждого ранга персонала
- (#M2) mw.util.StaffUtil.printStaffList() : То же, что и fetchStaffList, но выводит результаты на консоль
- (#M3) mw.util.StaffUtil.updateStaffColors(cb, thisArg) : То же, что и fetchStaffList, но также обновляет страницу CSS; Загружается только для CE+
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
		$this.text("Обновление цвета персонала");
		$this.removeAttr("disabled");
		alert("Программа обновления цвета персонала: Успешно обновлено LESS для цветов персонала.\n\n" +
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
					ICONS: {},
					LINKS: {},
					TAGS: {},
				};

				forKeys(overrides, function (state, v) {
					forKeys(v, function (rank_, list) {
						list.forEach(function (user) {
							overridesList[state][user] = rank_;
						});
					});
				});

				function eachState(state, i) {
					var temp = [];
					var done = {};

					for (var j in mw.util.StaffUtil.membersList) { // for each rank
						if (mw.util.StaffUtil.membersList[j].parse) {
							var rank = mw.util.StaffUtil.membersList[j].rank,
								validusers = mw.util.StaffUtil.membersList[j].users;

							var userList = [];
							var hidden = [];
							var ruleType = [];
							temp.push("\n/* " + rank + "*/");

							function each(isOverride, user) {
								if (!user)
									console.error("NO USER?", isOverride, user);
								if (data.ignore.includes(user)) return;
								if (user.includes(" ")) each(isOverride, user.replace(/ /g, "_"));
								var sel = data.selectors[state].replace(/\$1/g, user);

								if (isOverride) { // no need to check "done"
									if (overridesList[state][user] === rank) {
										ruleType.push("override");
										userList.push(sel);
										// note: "done" is not applied here; only applied when "crossing" the highest actual rank
									}
									// else: do not do anything
								} else if (!done[user] && !overridesList[state][user]) {
									ruleType.push("normal");
									userList.push(sel);
									done[user] = true;
								} else if (!done[user] && overridesList[state][user]) {
									ruleType.push("overridden");
									userList.push("/* " + sel + " */");
									done[user] = true;
								} else {
									// equivalent to done[user] && !isOverride
									hidden.push("  " + sel); // showed as "with higher ranks removed"
								}
							}

							validusers.forEach(each.bind(null, false));
							Object.keys(overridesList[state]).forEach(each.bind(null, true));

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

				var ret = ["/* Цвета персонала\n\nЭта таблица стилей содержит css для раскрашивания имен сотрудников. \nОна обновляется автоматически, любые внесенные вами изменения будут \nперезаписан при следующем обновлении этой таблицы стилей. \n*/"];
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
								rank: "Пропущенные временные звания",
								users: bypassn,
								parse: false,
							});
						}

						console.log("Обновленные списки персонала.");
						mw.util.StaffUtil.membersList = obj;
						def.resolve();
					}).catch(console.warn);
				}).catch(console.warn);
			}).catch(console.warn);

			return def;
		};

		mw.util.StaffUtil.printStaffList = function () {
			mw.util.StaffUtil.fetchStaffList().then(function () {
				console.log("[StaffUtil] Отображение значений...");
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
						summary: "Обновление цвета персонала (StaffColorsUpdater)",
						minor: 1,
					}).then(function (r) {
						if (cb) cb.call(thisArg, css, r);
					}, console.warn);
					console.log("Обновлены цвета персонала (Less).");
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
						if (!$this.is("[disabled]")) {
							$this.text("Обновление...");
							$this.attr({
								disabled: true
							});
							mw.util.StaffUtil.updateStaffColors(finalAlert.bind(null, $this));
						}
					},
					text: "Обновление цвета персонала",
					title: "Обновление цвета персонала",
				}),
				title: "Обновление цвета персонала",
				href: "#",
				css: {
					cursor: "pointer",
					"margin": "0 0 5px 5px",
				}
			}));
		}

	}());
});