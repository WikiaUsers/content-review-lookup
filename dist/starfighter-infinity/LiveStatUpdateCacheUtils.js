//*** Javascript caching utility functions, meant to be used by other scripts.
//***
//***
//*** Contributors:
//***   Michael T. Mosier <mtmosier@gmail.com>
//***


//*** JSON-P FUNCTIONS - MUST EXIST IN THE GLOBAL NAMESPACE
var loadShipData = null;
var loadWeaponData = null;
var loadWeaponRangeAndVariantData = null;
var loadGalaxyData = null;

var constants = null;


statUpdateCacheUtils = {};
statUpdateCacheUtils.debugEnabled = false;
statUpdateCacheUtils.defaultCacheTimeInSeconds = 60 * 60 * 24;  //*** 24 hours  (sec * min * hours)
statUpdateCacheUtils.wikiPageListCacheTimeInSeconds = 60 * 15;  //*** 15 minutes
statUpdateCacheUtils.itemDataCacheTimeInSeconds = 60 * 60 * 6;  //*** 6 hours
statUpdateCacheUtils.galaxyDataCacheTimeInSeconds = 60 * 60 * 24;  //*** 24 hours
statUpdateCacheUtils.shipDataCacheTimeInSeconds = 60 * 60 * 6;  //*** 6 hours
statUpdateCacheUtils.constantsDataCacheTimeInSeconds = 60 * 60 * 6;  //*** 6 hours

statUpdateCacheUtils.dataDate = false;
$.ajax({
    type: "HEAD",
    async: true,
    url: "https://darty11.github.io/WeaponData.json-p",
}).done(function(message,text,jqXHR){
    try {
        lastModified = jqXHR.getResponseHeader('last-modified');
        if (lastModified) {
            dateObj = new Date(lastModified);
            statUpdateCacheUtils.dataDate = dateObj.toISOString().split("T")[0];
        }
    } catch (e) {}
});


$.ajaxPrefilter(function( options, original_Options, jqXHR ) {
    options.async = true;
});


//***  Known namespace list
//***  0 = Page Names
//***  1 = Page Discussions
//***  2 = Usernames
//***  4 = About / Copyright pages
//***  6 = Images
//***  8 = Customer js / css pages
//***  10 = Templates
//***  14 = Categories
statUpdateCacheUtils.getWikiFileList = function(namespace, cb, cacheKey) {
	var fileList = [];
	var t0 = performance.now();

	mw.loader.using('mediawiki.api').then(function() {
		var api = new mw.Api();
		function apiCall(apfrom) {
			api.get({
				action: "query",
				list: "allpages",
				apnamespace: namespace,
				apfrom: apfrom,
				aplimit: 5000, // if you don't have bot rights this will get interpreted as 500 by the API
			 // apfilterredir: 'nonredirects' // uncomment this if you don't want to list redirects
			}).done(function(d) {
				if(d.error) {
					// this means an API error happened
					console.log('API error: ' + d.error.code);
				} else {
					// the request was successful, add the pages to the fileList
					fileList = fileList.concat(d.query.allpages.map(function(el) { return el.title; }));
					if(d['query-continue']) {
						// there are more requests to make to get all pages
						apiCall(d['query-continue'].allpages.apfrom);
					} else {
						// all requests finished, your data is now in the fileList
						if (statUpdateCacheUtils.debugEnabled) {
							var t1 = performance.now();
							console.log("Call to statUpdateCacheUtils.getWikiFileList took " + (t1 - t0) + " milliseconds.");
						}

						if (cacheKey) {
							var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
							if ("wikiPageListCacheTimeInSeconds" in statUpdateCacheUtils) {
								expirationTS = Date.now() + (1000 * statUpdateCacheUtils.wikiPageListCacheTimeInSeconds);
							}

							statUpdateCacheUtils.saveCacheData(cacheKey, fileList, expirationTS);
						}
						cb(fileList);
					}
				}
			}).fail(function() {
				// this is what happens when your internet connection
				// throws up and you can't execute the API request
			});
		}
		// Let the maddness begin!
		apiCall();
	});
};



statUpdateCacheUtils.getCachedData = function(cacheKey) {
	var expDate = localStorage.getItem("expirationTS_" + cacheKey);
	if (expDate && expDate >= Date.now()) {
		try {
			var data = localStorage.getItem(cacheKey);
			if (typeof LZString !== 'undefined' && !$.isEmptyObject(LZString)) {
				var uncompressedData = null;
				try {
					uncompressedData = LZString.decompressFromUTF16(data);
				} catch (err) {
					uncompressedData = null;
				}
				if (uncompressedData !== null) {
					data = uncompressedData;
				}
			}
			return JSON.parse(data);
		} catch (err) {
			console.log("Failed to read item from cache (" + cacheKey + ") : " + err.message);
		}
	}
	return null;
};

statUpdateCacheUtils.saveCacheData = function(cacheKey, data, expirationTS) {
	if (!expirationTS) {
		expirationTS = Date.now() + (1000 * 60 * 60 * 24);
	}
	try {
		var stringData = JSON.stringify(data);
		if (typeof LZString !== 'undefined' && !$.isEmptyObject(LZString)) {
			stringData = LZString.compressToUTF16(stringData);
		}
		localStorage.setItem(cacheKey, stringData);
		localStorage.setItem("expirationTS_" + cacheKey, expirationTS);
	} catch (err) {
		console.log("Failed to write item to cache (" + cacheKey + ") : " + err.message);
		//*** Cleanup
		try { localStorage.removeItem(cacheKey); } catch(err) {}
		try { localStorage.removeItem("expirationTS_" + cacheKey); } catch(err) {}
	}
};






statUpdateCacheUtils.loadConstantsData = function() {
	if (statUpdateCacheUtils.debugEnabled) {
		console.log("Entering loadConstantsData...");
	}

	if (!("cacheKey" in this) || !this.cacheKey) {
		console.log ("loadConstantsData cacheKey information missing.");
		if (statUpdateCacheUtils.loadConstantsDataIntervalId)  clearInterval(statUpdateCacheUtils.loadConstantsDataIntervalId);
		return;
	}
	if (!("expirationTS" in this) || !this.expirationTS) {
		console.log ("loadConstantsData cache expiration timestamp information missing.");
		if (statUpdateCacheUtils.loadConstantsDataIntervalId)  clearInterval(statUpdateCacheUtils.loadConstantsDataIntervalId);
		return;
	}

	if (!$.isEmptyObject(constants) && !$.isEmptyObject(constants.effectDamages)) {
		if (statUpdateCacheUtils.loadConstantsDataIntervalId)  clearInterval(statUpdateCacheUtils.loadConstantsDataIntervalId);
		if ("cb" in this && this.cb) {
			this.cb(constants);
		}
		statUpdateCacheUtils.saveCacheData(this.cacheKey, constants, this.expirationTS);
	}
};


statUpdateCacheUtils.loadConstantsDataIntervalId = null;
statUpdateCacheUtils.getCachedConstantsData = function(cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "dartyGithubConstantsData";
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedConstantsData (cached): " + (t1 - t0) + "ms");
		}

		constants = data;
		if (cb) {
			cb(data);
		}
		return true;
	}

	var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
	if ("constantsDataCacheTimeInSeconds" in statUpdateCacheUtils) {
		expirationTS = Date.now() + (1000 * statUpdateCacheUtils.constantsDataCacheTimeInSeconds);
	}

	$.ajax({url: "https://darty11.github.io/smallConstants.min.js", dataType: "script"});

	var loadConstantsDataFunc = statUpdateCacheUtils.loadConstantsData.bind({ cb: cb, cacheKey: cacheKey, expirationTS: expirationTS });
	statUpdateCacheUtils.loadConstantsDataIntervalId = setInterval(loadConstantsDataFunc, 25);

	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("constantsDataCacheTimeInSeconds (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};



statUpdateCacheUtils.loadJSonPData = function(data, data2, data3) {
	if (!("cb" in this) || !this.cb) {
		console.log ("loadJSonPData callback information missing.");
		return false;
	}
	if (!("cacheKey" in this) || !this.cacheKey) {
		console.log ("loadJSonPData cacheKey information missing.");
		return false;
	}
	if (!("expirationTS" in this) || !this.expirationTS) {
		console.log ("loadJSonPData cache expiration timestamp information missing.");
		return false;
	}

    data1 = data;
	if (typeof data2 !== 'undefined' || typeof data3 !== 'undefined') {
		data = [ data ];
		if (typeof data2 !== 'undefined')  data.push(data2);
		else  data.push(null);
		if (typeof data3 !== 'undefined')  data.push(data3);
	}

	this.cb(data1, data2, data3);
	statUpdateCacheUtils.saveCacheData(this.cacheKey, data, this.expirationTS);
};

statUpdateCacheUtils.getCachedGalaxyData = function(cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "dartyGithubGalaxyData";
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedGalaxyData (cached): " + (t1 - t0) + "ms");
		}

		var data2 = null;
		if (Array.isArray(data)) {
			data2 = data[1];
			data = data[0];
		}

		cb(data, data2);
		return true;
	}

	var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
	if ("galaxyDataCacheTimeInSeconds" in statUpdateCacheUtils) {
		expirationTS = Date.now() + (1000 * statUpdateCacheUtils.galaxyDataCacheTimeInSeconds);
	}

	loadGalaxyData = statUpdateCacheUtils.loadJSonPData.bind({ cb: cb, cacheKey: cacheKey, expirationTS: expirationTS });
	$.ajax({url: "https://darty11.github.io/GalaxyData.json-p", dataType: "script"});

	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("getCachedGalaxyData (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};

statUpdateCacheUtils.getCachedShipData = function(cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "dartyGithubShipData";
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedShipData (cached): " + (t1 - t0) + "ms");
		}

		cb(data);
		return true;
	}

	var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
	if ("shipDataCacheTimeInSeconds" in statUpdateCacheUtils) {
		expirationTS = Date.now() + (1000 * statUpdateCacheUtils.shipDataCacheTimeInSeconds);
	}

	loadShipData = statUpdateCacheUtils.loadJSonPData.bind({ cb: cb, cacheKey: cacheKey, expirationTS: expirationTS });
	$.ajax({url: "https://darty11.github.io/ShipData.json-p", dataType: "script"});
// https://starfighter-infinity.fandom.com/wiki/MediaWiki:LiveStatUpdateSettings.js?ctype=text/javascript&action=raw
	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("getCachedShipData (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};

statUpdateCacheUtils.getCachedItemData = function(cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "dartyGithubItemData";
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedItemData (cached): " + (t1 - t0) + "ms");
		}

		cb(data);
		return true;
	}

	var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
	if ("itemDataCacheTimeInSeconds" in statUpdateCacheUtils) {
		expirationTS = Date.now() + (1000 * statUpdateCacheUtils.itemDataCacheTimeInSeconds);
	}

	loadWeaponData = statUpdateCacheUtils.loadJSonPData.bind({ cb: cb, cacheKey: cacheKey, expirationTS: expirationTS });
	$.ajax({url: "https://darty11.github.io/WeaponData.json-p", dataType: "script"});

	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("getCachedItemData (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};

statUpdateCacheUtils.getCachedItemExtraData = function(cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "dartyGithubItemExtraData";
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedItemExtraData (cached): " + (t1 - t0) + "ms");
		}

		var data2 = null;
		var data3 = null;
		if (Array.isArray(data)) {
			data2 = data[1];
			data3 = data[2];
			data = data[0];
		}

		cb(data, data2, data3);
		return true;
	}

	var expirationTS = Date.now() + (1000 * statUpdateCacheUtils.defaultCacheTimeInSeconds);
	if ("itemDataCacheTimeInSeconds" in statUpdateCacheUtils) {
		expirationTS = Date.now() + (1000 * statUpdateCacheUtils.itemDataCacheTimeInSeconds);
	}

	loadWeaponRangeAndVariantData = statUpdateCacheUtils.loadJSonPData.bind({ cb: cb, cacheKey: cacheKey, expirationTS: expirationTS });
	$.ajax({url: "https://darty11.github.io/WeaponExtraData.json-p", dataType: "script"});

	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("getCachedItemExtraData (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};

statUpdateCacheUtils.getCachedWikiPageList = function(namespace, cb) {
	var t0 = performance.now();
	var t1 = false;

	var cacheKey = "wikiPageListNS" + namespace;
	var data = statUpdateCacheUtils.getCachedData(cacheKey);
	if (data !== null) {
		if (statUpdateCacheUtils.debugEnabled) {
			t1 = performance.now();
			console.log("getCachedWikiPageList (cached): " + (t1 - t0) + "ms");
		}

		cb(data);
		return true;
	}

	statUpdateCacheUtils.getWikiFileList(namespace, cb, cacheKey);

	if (statUpdateCacheUtils.debugEnabled) {
		t1 = performance.now();
		console.log("getCachedWikiPageList (not cached): " + (t1 - t0) + "ms");
	}
	return false;
};


statUpdateCacheUtils.getCachedConstantsData(null);