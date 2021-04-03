
// TopicBlockLog (test)
//    Creates an interwiki block report from wikis of similar topic.
//    This allows an administrator to more easily identify editors who may be
//    making edits with ill intent or identify topic "raiders".
	
// to fix: this will render on "Block Succesful" page
	
// Run only on [[Special:Block]] w/ valid user permissions (...via CSS).
if (mw.config.get('wgCanonicalSpecialPageName') === 'Block'
		&& !$(".permissions-errors").length)

	
// Script body		
(function($, mw, window) {
	"use strict";
	if (window.TBL_DEBOUNCE || !(window.TBL_DEBOUNCE=true)) return;
	
	
	///************/
	//* "Consts" *//
	/************///
	var DELAY = 40,         // 25 requests per sec
	REQS_BEFORE_PAUSE = 60, // tbh, I don't know how much rps is too much.
	PAUSE_DELAY = 80,
	DEBUG_MSGS = {
		// These messages are (mostly) not user facing.

		// Debug warnings (not all are stored here)
		HAD_LOCAL_BLOCK: "Target user had been blocked on local wiki. Pre-existing logs available.",
		NO_LOCAL_BLOCK:  "Target user has never been blocked on local wiki. Create log.",
		NOT_BLOCK_PAGE:
			"Page is not [[Special:Block]] or user does not have permission to view it.",
			
		// Script errors
		STATIC_USED_IN_INSTANCE:
			"Attempt to call a class static function on a class instance",
			
		// User configuration errors
		EXEC_ERR:
			"An error occurred before ajax requests were sent.\n" +
			"Did you set TBL_GROUP or TBL_WIKIS? If used, is TBL_GROUP a valid topic?"
	}/*, msg={}*/;
	
	//
	/*msg.log = function(msg, type) {
		
	}*/
	
	///********/
	//* Data *//
	/********///
	var
	config = mw.config.get([
		"wgPageName",
		"wgUserLanguage",
		"wgDBname"
//		"wgServer"
	]),
	requestMessages = [
		// general
		"pipe-separator",
		"word-separator",
		// user
		"wall-message-wall-shorten",
		"contribslink",
		// block
		"blocklog-showlog",
		"blocklogentry",
		"unblocklogentry"
	];
	config = $.extend(config, {
		usingLang: mw.util.getParamValue("uselang")
			|| config.wgUserLanguage.split('-')[0],
		targetUser: config.wgPageName.split("/")[1]
	});
	
	// No target (no /Username nor wpTarget=Username)
	if (!(config.targetUser = config.targetUser
		|| mw.util.getParamValue("wpTarget"))) return;
		
	/* Load system messages */
	mw.loader.using('mediawiki.api').done(function() {
		function loadMessages( messages ) {
			return (new mw.Api()).get( {
				action:     'query',
				meta:       'allmessages',
				ammessages:  messages.join('|'),
				amlang:      config.usingLang
			} ).then( function (data) {
				$.each( data.query.allmessages, function ( i, message ) {
					if ( message.missing !== '' ) {
						mw.messages.set( message.name, message['*'] );
					}
				} );
			} );
		}
		loadMessages(requestMessages).then(function() {
			$(blockedNotice).text(mw.message("blocklog-showlog").text());
		});
	});

	
	
	///*******************/
	//* Element Factory *//
	/*******************///
	function Make(tag, classes) {
		// I found out too late that I cannot use the class declaration for JS on wikia
		// So... here's a class of different syntax with fake static methods.
		
		this.e = document.createElement(tag); // even if a class declaration could be used, cannot extend the class from DOM elements, yet.
		
		if (typeof classes !== "undefined")
			this.setClass(classes);
	}
	Make.prototype.isObject = true;  // for static function checking
	
	// Static class constructors
	// todo: apparently __proto__ is legacy, use the getter method instead.
	Make.prototype.link = function(index, page, ltext, DANGER_TRUST) {
		// todo? DANGER_TRUST will assume sanitized input is provided.
		if (this.__proto__.isObject) throw STATIC_USED_IN_INSTANCE;
		
		var a = new Make('a');
		
		a.e.setAttribute("href", encodeURI(index+page));
//		a.e.setAttribute("title", escape(page));
		if (ltext) a.e.innerHTML = ltext;
		else a.e.innerHTML = page;
		
		return a;
	}
		
	Make.prototype.toolLinks = function(mlinks) {
		if (this.__proto__.isObject) throw STATIC_USED_IN_INSTANCE;
		
		var tools = new Make('span', 'mw-usertoollinks')
			.contains('(');
		
		for (i = 0; i < mlinks.length;)
			tools.append(mlinks[i] +
				(++i !== mlinks.length ? (' '+mw.message("pipe-separator")+' ') : ')'));
				
		return tools;
	}
		
	Make.prototype.comment = function(wiki, _comment) {
		if (this.__proto__.isObject) throw STATIC_USED_IN_INSTANCE;
		
		return new Make('i')
			.contains('('
				+ _comment.replace(/\[\[(.+?)(\|(.+?))?\]\]/g, function(full, wlink, _, wtext) {
					return Make.prototype.link(wiki, wlink, wtext)})
				+ ')');
	}
	
	// Object methods
	// Should only be used with sanitized html content
	Make.prototype.setClass = function(classes) {
		this.e.setAttribute("class", classes);
		return this;
	}
	
	Make.prototype.contains = function(content) {
		this.e.innerHTML = content;
		return this;
	}
	
	Make.prototype.append = function(content) {
		this.e.innerHTML += content;
		return this;
	}
	
	// @override
	Make.prototype.toString = function() { return this.e.outerHTML; }
	
	
	
	///****************************/
	//* Report Container & Flags *//
	/****************************///
	var $blockLog = $(".mw-warning-with-logexcerpt"), $loading,
		blockedNotice,
		hadAnyBlock,
		nWikisParsed = 0,  // # of wikis finished parsing
		nFinalParsed = 0;  // # of wikis to be parsed at finish
//		currParseIntv;
		
	if($blockLog.length) {
		// Target user had been blocked on local wiki. Pre-existing logs available.
		mw.log(DEBUG_MSGS.HAD_LOCAL_BLOCK);
		$blockLog.append(document.createElement("hr"));
		hadAnyBlock = true;
	} else {
		// Target user has never been blocked on local wiki. Create log.
		mw.log(DEBUG_MSGS.NO_LOCAL_BLOCK);
		$("#mw-content-text").append(
			$blockLog = $(document.createElement("div"))
				.addClass("mw-warning-with-logexcerpt")
				.append(blockedNotice = document.createElement("p"))
		);
			hadAnyBlock = false;
	}
	
	$loading = $(
		// http://fandomdesignsystem.com/#/components/progress-indicators
		'<svg xmlns="http://www.w3.org/2000/svg" class="wds-spinner wds-spinner__block" width="45" height="45" viewBox="0 0 45 45"> \
			<g transform="translate(22.5, 22.5)"> \
				<circle class="wds-spinner__stroke" fill="none" stroke-linecap="round" stroke-width="5" stroke-dasharray="125.66370614359172" stroke-dashoffset="125.66370614359172" r="20"></circle> \
			</g> \
		</svg>')
		.appendTo("#mw-content-text");
	$blockLog.hide(); // while loading
	
	
	
	///*****************/
	//* Log Retrieval *//
	/*****************///
	function getInterwikiLog(wiki, callback) {
		// e.g. http://campcamp.wikia.com/api.php?action=query&list=logevents&letype=block&letitle=User:The_JoTS&format=json
		if (wiki === config.wgDBname) {
			// No need to request and re-render what is already rendered.
			recordRenderedWiki();
			return;
		}
		
		mw.log("Checking user's block log at wiki " + wiki);
		
		$.get("http://" + wiki + ".wikia.com/api.php", {
			action: "query",
			format: "json",
			// Block logs
			list:   "logevents",
			letype: "block",
			letitle: "User:" + config.targetUser,
			// SiteInfo
			meta:   "siteinfo",
			siprop: "general"
		}, function(result) {
			if (result !== null
					&& result.query.logevents.length !== 0)
				callback(result.query, recordRenderedWiki);
			else recordRenderedWiki();
			
			if (result === null)
				// I'm not sure if this result is a possible case?
				mw.log("Null result returned from query. Sending in queries too quickly?");
		}, "jsonp");
	}
	
	
	
	///********************/
	//* Make log entries *//
	/********************///
	function makeWikiEntries(result, callback) {
		var $localLogs,
		indexURL = result.general.server + "/index.php?title=";
		
		mw.log("Creating block entries for current user from " + result.general.server);
		
		// New wiki section
		$blockLog.append($(document.createElement("div"))
			.prepend($localLogs = $(document.createElement("ul")))
			.prepend(new Make("h4")
				.contains( Make.prototype.link(result.general.server, '', result.general.sitename) ).e
			)
		);
		
		// Log entry
		result.logevents.reverse().forEach(function(entry) {
			hadAnyBlock = true;
			var liEntry = new Make("li"),
			
			blocked = entry.action !== "unblock", // there's a "change block" or something apparently
			blockedOn  = new Date(entry.timestamp);
			blockedOn = $.extend(blockedOn, {
				// this would've been a *great* time for toLocaleFormat() to be supported...
				hour:   String(blockedOn.getHours()).padStart(2,'0'),
				minute: String(blockedOn.getMinutes()).padStart(2,'0'),
				date:   blockedOn.getDate(),
				month:  mw.config.get("wgMonthNames")[blockedOn.getMonth() + 1], // the lazy way, result can differ from uselang url param
				year:   blockedOn.getFullYear()
			});
			
			//
			var target = entry.title.replace(/^.+?:/,''),
			targetUserLinks = Make.prototype.link(indexURL, entry.title, target) + ' '
				+ Make.prototype.toolLinks([
					Make.prototype.link(indexURL, "Message Wall:"+target, mw.message("wall-message-wall-shorten")),
					Make.prototype.link(indexURL, "Special:Contributions/"+target, mw.message("contribslink"))
				]);
			liEntry.contains(
				// Note: mw.message(loadedmsg).parse() didn't seem to work on my end and thus was not used in this script.
				// Because of this, some languages' messages may have some formatting errors.
				blockedOn.hour + ':' + blockedOn.minute + ', '
				+ blockedOn.month + ' ' + blockedOn.date + ", " + blockedOn.year + ' '
				+ Make.prototype.link(indexURL, "User:"+entry.user, entry.user) + ' '
				+ Make.prototype.toolLinks([
					Make.prototype.link(indexURL, "Message Wall:"+entry.user, mw.message("wall-message-wall-shorten")),
					Make.prototype.link(indexURL, "Special:Contributions/"+entry.user, mw.message("contribslink"))
				]) + ' ' + (blocked
					? mw.message("blocklogentry", targetUserLinks, entry.block.duration, '')
						.plain().replace(/\[|\]/g,'')
					: mw.message("unblocklogentry", targetUserLinks)
				) + ' ' + Make.prototype.comment(indexURL, entry.comment)
			);
			
			$(liEntry.e)
				.addClass("mw-logline-block")
				.prependTo($localLogs);
		});
		
		callback();
	}
	
	
	
	///***************/
	//* Async Tasks *//
	/***************///
	function recordRenderedWiki() {
		if (++nWikisParsed !== nFinalParsed)
			// Incremented, now be on our merry way~
			mw.log("A parse task (" + nWikisParsed + "/" + nFinalParsed + ") finished.");
		else {
			// Finished rendering!
			mw.log("A parse task (Last/" + nFinalParsed + ") finished.");
			
			if (hadAnyBlock) $blockLog.show();
			else $blockLog.remove();
			$loading.remove();
			
			mw.log("TopicBlockLog render tasks completed.");
			mw.log(hadAnyBlock
				? "Target user was blocked locally and/or blocked on sister wikis."
				: "Target user does not have any block history on wikis of this topic.");
		}
	}
	
	function getAndRenderLogs(wikiIter, finalParseCount) {
		nFinalParsed = finalParseCount;
		getAndRenderLogF(wikiIter)();
	}
	
	function getAndRenderLogF(wikiIter) {
		return function() {
			var reqSent = 0,
			requestIntv = setInterval(function() {
				var wiki = wikiIter.next();
				
				if (!wiki.done) {
					// Send out another log request.
					getInterwikiLog(wiki.value, makeWikiEntries);
					
					if (++reqSent % REQS_BEFORE_PAUSE === 0) {
						mw.log("Pausing TopicBlockLog ajax requests for " + REQS_BEFORE_PAUSE + "ms.");
						setTimeout(getAndRenderLogF(wikiIter), PAUSE_DELAY);
						clearInterval(requestIntv);
					}
				} else {
					// Last ajax request sent. Terminate interval.
					mw.log("Last ajax query sent for TopicBlockLog.");
					clearInterval(requestIntv);
					return;
				}
			}, DELAY);
		};
	}
	
	
	
	///*********/
	//* Start *//
	/*********///
	$.get(mw.util.wikiScript('load'), {
		mode: 'articles',
		articles: 'u:dev:MediaWiki:Custom-TopicBlockLog-topics',
		only: 'styles'
	}, function(data) {
		var TOPICS = JSON.parse(data.replace(/\/\*.*?\*\//g, '')),
			userDefWikiList  =  window.TBL_WIKIS,
			userSelWikiTopic =  window.TBL_GROUP;
			
		if (typeof userDefWikiList !== "undefined"
				&& Array.isArray(userDefWikiList))
			// Get logs from user defined list of wikis
			getAndRenderLogs(
				userDefWikiList[Symbol.iterator](),
				userDefWikiList.length );
		else if (typeof userSelWikiTopic === "string"
				&& typeof TOPICS !== "undefined"
				&& TOPICS[userSelWikiTopic.toLowerCase()])
			// Get logs from wikis of a predefined topic group
			getAndRenderLogs(
				TOPICS[userSelWikiTopic][Symbol.iterator](),
				TOPICS[userSelWikiTopic].length );
		// todo: else automatically search for wiki w/in "TOPICS", maybe?
		else {
			// Something's gone wrong. Likely no setup vars were provided by user.
			// ... or invalid topic group.
			$loading.remove();
			$blockLog.show();
			console.warn(DEBUG_MSGS.EXEC_ERR);
		}
	});
	
	
})(jQuery, mediaWiki, this);


else mw.log(DEBUG_MSGS.WARN_NOT_BLOCK_PAGE);