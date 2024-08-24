//<pre>
console.log("[HypixelItemDataFetcher] Script Loading..");

(function(mw) {
	var mdns = mw.config.get("wgFormattedNamespaces")[828];
	var LUA_DATA_PAGE = mdns + ":Item/ApiData";
	var LUA_ALIASES_PAGE = mdns + ":Item/ApiAliases";
	var HYPIXEL_ITEMS_API_URL = "https://api.hypixel.net/resources/skyblock/items";

	var allowedPages = [ LUA_DATA_PAGE, LUA_ALIASES_PAGE ];
	if (!allowedPages.includes(mw.config.get("wgPageName"))) return;

	console.log("[HypixelItemDataFetcher] Entering Hypixel Item Data Fetcher");

	function start() {
		Promise.all([
			fetchHypixelItems(),
			fetchLuaDataAsJson(LUA_DATA_PAGE),
			fetchLuaDataAsJson(LUA_ALIASES_PAGE)
		])
		.then(function(responses) {
			var hypixelData = responses[0], oldLuaData = responses[1], luaAliases = responses[2];
			if (hypixelData.lastUpdated <= oldLuaData.lastUpdated) {
				mw.notify("Skipping update", { title: "No new updates", type: "info" });
				reEnableButton();
				return;
			}

			var newItemsMap = hypixelData.items.reduce(function(obj, item) { obj[item.id] = item; return obj; }, {});
			var oldItemsMap = "items" in oldLuaData && oldLuaData.items || {};

			// Detect new items and set dates
			var newItemDate = hypixelData.lastUpdated, newCount = 0, newAliases = 0;
			Object.keys(newItemsMap).forEach(function(key) {
				if (!oldItemsMap[key]) {
					newCount++;
					newItemsMap[key].date = newItemDate;
				} else {
					newItemsMap[key].date = oldItemsMap[key].date;
				}
				var name = newItemsMap[key].name.toUpperCase().replaceAll(/ /g, "_").replaceAll(/§\w/g, "");
				if (!luaAliases[name]) {
					newAliases++;
					luaAliases[name] = key;
				}
			});

			mw.notify("Saving " + newCount + " new items and aliases", { title:"Fetch Successful", type:"info" });

			// Save fetched data and aliases
			var sortedLuaAliases = Object.keys(luaAliases).sort().reduce(function (obj, key) {
					obj[key] = luaAliases[key]; return obj;
				}, {}
			);

			saveToWikiMulti([{
				json: { lastUpdated: hypixelData.lastUpdated, items: newItemsMap },
				newCount: newCount,
				page: LUA_DATA_PAGE,
			}, {
				json: sortedLuaAliases,
				newCount: newAliases,
				page: LUA_ALIASES_PAGE,
			}]);
		})
		// Fandom doesn't like catch as a method name
		["catch"](errorHandler);
	}

	function fetchHypixelItems() {
		return fetch(HYPIXEL_ITEMS_API_URL).then(function(response){ return response.json(); });
	}

	function fetchLuaDataAsJson(page) {
		return luaTableDataModuleToJson(page);
		// return api().parse("{{" + LUA_DATA_PAGE + "}}").then(function(response){
		// 	 var luastr = response.match(new RegExp("<pre>(.*)<\/pre>", "ms"))[1];
		// 	 return luaTableToJson(luastr);
		// });
	}

	function saveToWikiMulti(arr) {
		var promises = arr.map(function (obj) {
			var lua = "-- <pre>\nreturn " + jsonToLuaTable(obj.json);
			console.log(lua);

			return api().postWithEditToken({
				action: "edit",
				text: lua,
				title: obj.page,
				summary: "Updating data" + (obj.newCount > 0 ? " - adding " + obj.newCount + " new items" : ""),
				minor: true,
			});
		});

		Promise.all(promises).then(function(responses) {
			mw.notify("Refreshing page..", { title: "Saved Successful!", type: "info" });
			window.location.reload();
		})
		// Fandom doesn't like catch as a method name
		["catch"](errorHandler);
	}

	function saveToWiki(json, newCount, page) {
		var lua = "-- <pre>\nreturn " + jsonToLuaTable(json);
		console.log(lua);

		api().postWithEditToken({
			action: "edit",
			text: lua,
			title: page,
			summary: "Updating data" + (newCount > 0 ? " - adding " + newCount + " new items" : ""),
			minor: true,
		})
		.then(function() {
			mw.notify("Refreshing page..", { title: "Save Successful!", type: "info" });
			window.location.reload();
		})
		// Fandom doesn't like catch as a method name
		["catch"](errorHandler);
	}

	/////////////////////
	// Helper Functions
	/////////////////////

	var _api;
	function api() {
		return _api ? _api : (_api = new mw.Api());
	}

	// Recursive json to lua conversion function
	function jsonToLuaTable(json, space, depth) {
		space = typeof space === "undefined" ? "\t" : space;
		depth = typeof depth === "undefined" ? -1 : depth;
		depth++;
		if (Array.isArray(json)) {
			return "{ " + json.map(function(o) { return jsonToLuaTable(o, space, depth) }).join(", ") + " }";
		}
		else if (typeof json === "object") {
			var indent = "\t".repeat(depth);
			return "{\n"
				+ Object.entries(json).map(function(data) {
					return indent + space + "['" + data[0].replaceAll("\'", "\\\'") + "']=" + jsonToLuaTable(data[1], space, depth);
				}).join(",\n")
				+ "\n" + indent + "}";
		}
		// Otherwise seems to be normal value; done on this branch!
		else {
			return typeof json === "string" ? "\"" + json.replaceAll("\"", "\\\"") + "\"" : json;
		}
	}

	// function luaTableToJson(lua) {
	// 	return api().post({
	// 		action: "scribunto-console",
	// 		title: mw.config.get("wgPageName"),
	// 		question: "=mw.text.jsonEncode(p)",
	// 		content: lua,
	// 	})
	// 	.then(function(response){ return response.return })
	// 	.then(function(data){
	// 		return JSON.parse(data);
	// 	});
	// }

	function luaTableDataModuleToJson(moduleName) {
		return api().post({
			action: "scribunto-console",
			title: mw.config.get("wgPageName"),
			question: "=mw.text.jsonEncode(require('" + moduleName + "'))"
		})
		.then(function(response) { return response.return })
		.then(function(data) {
			return JSON.parse(data);
		});
	}

	function reEnableButton() {
		$("#hswUpdateItemData").attr("disabled", false).text("Try Again");
	}

	function errorHandler(err) {
		mw.notify("See the web console for details", { title: "Uncaught Error", type: "error" });
		console.error(err);
		reEnableButton();
	}

	$("#hswUpdateItemData").on("click", function() {
		$(this).attr("disabled", true).text("Fetching Data...");
		start();
	});

})(mediaWiki);

//</pre>