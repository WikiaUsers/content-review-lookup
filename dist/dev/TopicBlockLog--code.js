// TopicBlockLog (v1.3.0)
// @author: The JoTS, Gabonnie
//    Creates an interwiki block report from wikis of similar topic.
//    This allows an administrator to more easily identify editors who may be
//    making edits with ill intent or identify topic "raiders".
    
// Run only on [[Special:Block]] w/ valid user permissions & not post-blocking.
if (
  (
    mw.config.get('wgCanonicalSpecialPageName') === 'Block' &&
    ($("#mw-content-text form").length || window.TBL_PATROL)
  ) ||
  (
    mw.config.get('wgCanonicalSpecialPageName') === 'Contributions' &&
    window.TBL_CONTRIBS
  ) ||
  (
    mw.config.get('wgCanonicalSpecialPageName') === 'UserProfileActivity' &&
    window.TBL_ACTIVITY
  )
)
    
// Script body		
(function($, mw, window) {
    "use strict";
    if (window.TBL_DEBOUNCE || !(window.TBL_DEBOUNCE=true)) return;
    
    
    ///************/
    //* "Consts" *//
    /************///
    const DELAY = 40;         // 25 requests per sec
    const REQS_BEFORE_PAUSE = 60; // tbh, I don't know how much rps is too much.
    const PAUSE_DELAY = 80;
    const DEBUG_MSGS = {
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
    };
    
    ///********/
    //* Data *//
    /********///
    let api;
    let config = mw.config.get([
        "wgPageName",
        "wgUserLanguage",
        "wgServer"
    ]);
    const requestMessages = [
        // general
        "pipe-separator",
        "word-separator",
        // user
        "messagewall-contributiontools-label",
        "contribslink",
        // block
        "blocklog-showlog",
        "blocklogentry",
        "unblocklogentry"
    ];
    config = $.extend(config, {
        usingLang: mw.util.getParamValue("uselang")
            || config.wgUserLanguage.split('-')[0],
        targetUser: config.wgPageName.split("/")[1],
        wiki: /(?=(?:[a-z]+\.)?(\w+)\.(?:wikia|fandom)\.com)/
            .exec(config.wgServer)[1]
    });
    
    // No target (no /Username nor wpTarget=Username)
    if (!(config.targetUser = config.targetUser
        || mw.util.getParamValue("wpTarget"))) return;

    ///*******************/
    //* Element Factory *//
    /******************///
	function Make(tag, classes) {
		this.e = document.createElement(tag);
		if (classes) this.e.className = classes;
	}

	Make.link = (base, page, text, trust = false) => {
		const a = new Make('a');
		a.e.href = encodeURI(base + page);
		if (trust) a.e.innerHTML = text || page;
		else a.e.textContent = text || page;
		return a;
	};

	Make.toolLinks = (links) => {
		const span = new Make('span', 'mw-usertoollinks').contains('(');
		for (let i = 0; i < links.length; i++)
			span.append(links[i] + (i < links.length - 1 ? ` ${mw.message("pipe-separator")} ` : ')'));
		return span;
	};

	Make.comment = (wiki, c) => new Make('i').contains(
		'(' + c.replace(/\[\[(.+?)(\|(.+?))?\]\]/g, (_, link, __, txt) => Make.link(wiki, link, txt)) + ')'
	);

	Make.prototype.contains = function (html) { this.e.innerHTML = html; return this; };
	Make.prototype.append = function (html) { this.e.innerHTML += html; return this; };
	Make.prototype.toString = function () { return this.e.outerHTML; };
    
    ///****************************/
    //* Report Container & Flags *//
    /****************************///
    let $blockLog = $(".mw-warning-with-logexcerpt");
    let $loading;
    let blockedNotice;
    let hadAnyBlock;
    let nWikisParsed = 0;  // # of wikis finished parsing
    let nFinalParsed = 0;  // # of wikis to be parsed at finish
//		currParseIntv;
        
    if($blockLog.length) {
        // Target user had been blocked on local wiki. Pre-existing logs available.
        mw.log(DEBUG_MSGS.HAD_LOCAL_BLOCK);
        $blockLog.append(document.createElement("hr"));
        hadAnyBlock = true;
    } else {
        mw.log(DEBUG_MSGS.NO_LOCAL_BLOCK);

        let $targetContainer = $("#mw-content-text");
        if (["Block", "Contributions", "UserProfileActivity"].includes(mw.config.get('wgCanonicalSpecialPageName'))) {
            const $existingBlock = $("#mw-content-text .cdx-message--block").last();
            if ($existingBlock.length) $targetContainer = $existingBlock.parent();
        }

        $targetContainer.append(
            $blockLog = $('<div>')
                .addClass("mw-contributions-blocked-notice")
                .append(
                    $('<div>')
                        .addClass("cdx-message cdx-message--block cdx-message--warning mw-warning-with-logexcerpt")
                        .append('<span class="cdx-message__icon"></span>')
                        .append(
                            $('<div>')
                                .addClass('cdx-message__content')
                                .append(
                                    $('<div>')
                                        .addClass('mw-content-ltr')
                                        .attr({ dir: 'ltr', lang: mw.config.get('wgUserLanguage') })
                                        .append(blockedNotice = document.createElement("p"))
                                )
                        )
                )
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
        const wikiParts = wiki.split('.');
        if (wikiParts[wikiParts.length - 1] === config.wiki) {
            // No need to request and re-render what is already rendered.
            recordRenderedWiki();
            return;
        }
        
        mw.log(`Checking user's block log at wiki ${wiki}`);
        
        $.get(`https://${wiki}.fandom.com/api.php`, { // does not support wikia.org at this time, todo
            action: "query",
            format: "json",
            // Block logs
            list:   "logevents",
            letype: "block",
            letitle: `User:${config.targetUser}`,
            // SiteInfo
            meta:   "siteinfo",
            siprop: "general"
        }, (result) => {
            if (result !== null
                    && result.query.logevents.length !== 0)
                callback(result.query, recordRenderedWiki);
            else recordRenderedWiki();
            
            if (result === null)
                // I'm not sure if this result is a possible case?
                mw.log("Null result returned from query. Sending in queries too quickly?");
        }, "jsonp")
        .fail(() => {
            mw.log(`Failed to retrieve block logs at wiki ${wiki}`);
            recordRenderedWiki();
        });
    }

    
    ///********************/
    //* Make log entries *//
    /********************///
    function makeWikiEntries(result, callback) {
        const indexURL = `${result.general.server}/index.php?title=`;
        const $content = $blockLog.find(".cdx-message__content > .mw-content-ltr");
    
        mw.log(`Creating block entries for current user from ${result.general.server}`);
    
	    const $wikiSection = $('<div>')
	        .append($('<h4>').append(
	            Make.link(result.general.server, '', result.general.sitename).e
	        ))
	        .append($('<ul class="mw-logevent-loglines"></ul>'))
	        .appendTo($content);
    	
    	const $logList = $wikiSection.find(".mw-logevent-loglines");
    	
        // Log entry
        result.logevents.reverse().forEach((entry) => {
            hadAnyBlock = true;
            const liEntry = new Make("li");
    
            const blocked = entry.action !== "unblock"; // there's a "change block" or something apparently
            let blockedOn = new Date(entry.timestamp);
            blockedOn = $.extend(blockedOn, {
                // this would've been a *great* time for toLocaleFormat() to be supported...
                hour: String(blockedOn.getHours()).padStart(2, '0'),
                minute: String(blockedOn.getMinutes()).padStart(2, '0'),
                date: blockedOn.getDate(),
                month: mw.config.get("wgMonthNames")[blockedOn.getMonth() + 1], // todo: respect uselang url param
                year: blockedOn.getFullYear()
            });
    
            //
            const target = entry.title.replace(/^.+?:/, '');
            const targetUserLinks = Make.link(indexURL, entry.title, target) + ' ' +
                Make.toolLinks([
                    Make.link(indexURL, `User talk:${target}`, mw.message("messagewall-contributiontools-label")),
                    Make.link(indexURL, `Special:Contributions/${target}`, mw.message("contribslink"))
                ]);
    
            liEntry.contains(
                // Note: mw.message(loadedmsg).parse() didn't seem to work on my end and thus was not used in this script.
                // Because of this, some languages' messages may have some formatting errors.
                `${blockedOn.hour}:${blockedOn.minute}, ${blockedOn.month} ${blockedOn.date}, ${blockedOn.year} ` +
                Make.link(indexURL, `User:${entry.user}`, entry.user) + ' ' +
                Make.toolLinks([
                    Make.link(indexURL, `User talk:${entry.user}`, mw.message("messagewall-contributiontools-label")),
                    Make.link(indexURL, `Special:Contributions/${entry.user}`, mw.message("contribslink"))
                ]) + ' ' + (blocked
                    ? mw.message("blocklogentry", targetUserLinks, entry.params.duration, '').plain().replace(/\[|\]/g, '')
                    : mw.message("unblocklogentry", targetUserLinks)
                ) + ' ' + Make.comment(indexURL, entry.comment)
            );
    
            $(liEntry.e).addClass("mw-logline-block").appendTo($logList);
        });
    
        callback();
    }
    
    ///***************/
    //* Async Tasks *//
    /***************///
    function recordRenderedWiki() {
        if (++nWikisParsed !== nFinalParsed) {
            // Incremented, now be on our merry way~
            mw.log(`A parse task (${nWikisParsed}/${nFinalParsed}) finished.`);
        } else {
            // Finished rendering!
            mw.log(`A parse task (Last/${nFinalParsed}) finished.`);
            
            // Plug script on Dev Wiki
            $(`<div style='text-align:right; font-size:80%;'>${Make.link("http://dev.fandom.com/wiki/TopicBlockLog", '', "Interwiki block report by TopicBlockLog")}</div>`)
                .appendTo($blockLog);
            
            // Show log and stop load animation
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
        return () => {
            let reqSent = 0;
            const requestIntv = setInterval(() => {
                const wiki = wikiIter.next();
                
                if (!wiki.done) {
                    // Send out another log request.
                    getInterwikiLog(wiki.value, makeWikiEntries);
                    
                    if (++reqSent % REQS_BEFORE_PAUSE === 0) {
                        mw.log(`Pausing TopicBlockLog ajax requests for ${REQS_BEFORE_PAUSE}ms.`);
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
    
    function init() {
        api.get({
            action: 'parse',
            prop: 'wikitext',
            formatversion: '2',
            page: 'MediaWiki:Custom-TopicBlockLog-topics.json'
        }).then((data) => {
            if (data.parse) {
                const TOPICS = JSON.parse(data.parse.wikitext.replace(/\/\*(.|\s)*?\*\//g, ''));
                const userDefWikiList  =  window.TBL_WIKIS;
                const userSelWikiTopic =  window.TBL_GROUP;
                    
                if (typeof userDefWikiList !== "undefined"
                        && Array.isArray(userDefWikiList)) {
                    // Get logs from user defined list of wikis
                    getAndRenderLogs(
                        userDefWikiList[Symbol.iterator](),
                        userDefWikiList.length );
                } else if (typeof userSelWikiTopic === "string"
                        && typeof TOPICS !== "undefined"
                        && TOPICS[userSelWikiTopic.toLowerCase()]) {
                    // Get logs from wikis of a predefined topic group
                    getAndRenderLogs(
                        TOPICS[userSelWikiTopic][Symbol.iterator](),
                        TOPICS[userSelWikiTopic].length );
                }
                // todo: else automatically search for wiki w/in "TOPICS", maybe?
                else {
                    // Something's gone wrong. Likely no setup vars were provided by user.
                    // ... or invalid topic group.
                    $loading.remove();
                    $blockLog.show();
                    console.warn(DEBUG_MSGS.EXEC_ERR);
                }
            }
        });
    }
    
    ///*********/
    //* Start *//
    /*********///
    mw.loader.using('mediawiki.api').then(() => {
        api = new mw.Api({
            ajax: {
                url: 'https://dev.fandom.com/api.php',
                xhrFields: {
                    withCredentials: true
                },
                dataType: 'JSONP',
                crossDomain: true
            }
        });
        
        function loadMessages(messages) {
            return (new mw.Api()).get({
                action:     'query',
                meta:       'allmessages',
                ammessages:  messages.join('|'),
                amlang:      config.usingLang
            }).then((data) => {
                $.each(data.query.allmessages, (i, message) => { // does 'i' even work?
                    if (message.missing !== '') {
                        mw.messages.set(message.name, message['*']);
                    }
                });
            });
        }
        loadMessages(requestMessages).then(() => {
            $(blockedNotice).text(mw.message("blocklog-showlog").text());
        });
        
        init();
    });
})(jQuery, mediaWiki, this);