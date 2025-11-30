// <nowiki>
$( function () {
	// Note: mainModule must contain a `local PREFIX = prefixname_01_`
	var supportedCaches = {
		invslot: { type:"tooltips", dataModule:"Inventory_slot/Datasheet", mainModule:"Cache", prefixVar:["INVSLOT_1_PREFIX", "INVSLOT_2_PREFIX"] },
		slot_aliases: { type:"simple", dataModule:"Inventory_slot/Aliases", mainModule:"Cache", prefixVar:["SLOT_ALIASES_PREFIX"] },
		item_variants: { type:"simple", dataModule:"Item/Variants", mainModule:"Cache", prefixVar:['ITEM_VARIANTS_PREFIX'] },
		item_api_data: { type:"simple", dataModule:"Item/ApiData/AsCacheTable", mainModule:"Cache", prefixVar:['ITEM_API_DATA_PREFIX'] },
		item_api_aliases: { type:"simple", dataModule:"Item/ApiAliases", mainModule:"Cache", prefixVar:['ITEM_API_ALIASES_PREFIX'] },
		crafting_aliases: { type:"simple", dataModule:"Crafting/Aliases", mainModule:"Cache", prefixVar:['CRAFTING_ALIASES_PREFIX'] },
		minion_data: { type:"simple", dataModule:"Minion/Data", mainModule:"Cache", prefixVar:['MINION_DATA_PREFIX'] }
	},
	BUTTON_ID = ".refresh-lua-cache";
	
	// Don't run script unless a button for it to run exists
	if (!$(BUTTON_ID).length) return;
	
	$(BUTTON_ID).show().click(function() {
		var $bttn = $(this), cacheId = $bttn.data('cache-id');
		if( !cacheId || !supportedCaches[cacheId] ) {
			mw.notify("Refresh button is missing a valid cache id", { title: "Cache ID Missing or Invalid", type: "error" });
			$bttn.attr("disabled", true).text('Please fix cache ID');
		}
		var cacheInfo = supportedCaches[ cacheId ];
		
		$bttn.attr("disabled", true).text("Refreshing cache for '" + cacheInfo.dataModule + "'...");
	
		function reEnableButton() {
			$bttn.attr("disabled", false).text("Try Again");
		}
	
		function errorHandler(err) {
			mw.notify("See the web console for details", { title: "Uncaught Error", type: "error" });
			console.error(err);
			reEnableButton();
		}
		
		var api = new mw.Api();
		console.log('Starting...');
		api.get({
			action : 'query',
			prop : 'revisions',
			titles : 'Module:' + cacheInfo.mainModule,
			rvprop : 'content'
		}).then(function(data) {
			for (var p in data.query.pages) {
				content = data.query.pages[p].revisions[0]["*"];
			}
			var prefix = [];
			for (let i = 0; i < cacheInfo.prefixVar.length; i++) {
				var prefixMatch = content.match(new RegExp((cacheInfo.prefixVar[i] || 'PREFIX')+" = '(.+?)'"));
				if(!prefixMatch) {
					mw.notify("'Module:" + cacheInfo.mainModule + "' is missing variable "+(cacheInfo.prefixVar[i] || 'PREFIX'), { title: "Prefix Missing", type: "error" });
					reEnableButton();
					return;
				}
				prefix[i] = prefixMatch[1];
				console.log(prefix);
			}

			var moduleCall = '';
			if (cacheInfo.type === "simple") {
				moduleCall = '{{#invoke:CacheUtil|resetAllSimple|' + cacheInfo.dataModule + '|prefix=' + prefix[0] + '}}';
			} else if (cacheInfo.type === 'tooltips') { 
				moduleCall = '{{#invoke:CacheUtil|resetTooltips|' + cacheInfo.dataModule + '|module=' + cacheInfo.mainModule + '|prefix1=' + prefix[0] + '|prefix2=' + prefix[1] + '}}';
			} else {
				moduleCall = '{{#invoke:CacheUtil|resetAll|' + cacheInfo.dataModule + '|module=' + cacheInfo.mainModule + '|f=' + cacheInfo.f + '|prefix=' + prefix[0] + '}}';
			}
			
			api.get({
				action : 'parse',
				text : moduleCall
			}).then(function(data) {
				if (data.parse.text['*'].includes('scribunto-error')) {
					console.log('Error!', data);
					mw.notify("Contact staff to resolve the issue", { title: "Error Refreshing Cache!", type: "info" });
					$bttn.attr("disabled", true).text("Error!");
				} else {
					console.log('Done!', data);
					mw.notify("Cache has been updated", { title: "Cache Refreshed Successfully!", type: "info" });
					$bttn.attr("disabled", true).text("Success!");
				}
			})
			// Fandom doesn't like catch as a method name
			["catch"](errorHandler);
		})
		// Fandom doesn't like catch as a method name
		["catch"](errorHandler);
	});
});
// </nowiki>