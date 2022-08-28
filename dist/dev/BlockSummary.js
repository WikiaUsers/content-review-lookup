/*************
Title        :   BlockSummary
Description  :   Displaying a summary of user's block on the blocked user's "User" Namespace pages
Author       :   Vastmine1029
Version      :   1.3
*************/

;(function(window, $, mw) {
	var config = mw.config.get([
		'wgRelevantUserName',
		'wgSiteName', // Wiki Name
		'wgArticlePath', // Wiki article path
		'wgContentLanguage', // Wiki Language Code
		'wgNamespaceNumber',
		'wgUserLanguage'
	]);
	
	if (config.wgNamespaceNumber !== 2) return;
	
	var wiki_name = config.wgSiteName;

	var user = config.wgRelevantUserName; // grabbing username of user blocked
	var url_user = encodeURIComponent(user);
	
	var lang_for_wiki_name = config.wgContentLanguage === 'en' ? '' : ' (' + config.wgContentLanguage + ')';
	var msg;

	function log(type, message) {
		var col = (type === 'running') ? '#F9F983' : 'limegreen';
		console.log('[BlockSummary] [%c' + type.toUpperCase() + '%c] ' + message, 'color:' + col, 'color:inherit');
	}
	function createBox(d) {
		var data = d.query.blocks;
		
		// if the user is not blocked, terminate program
		if (data === undefined || data.length < 1) { 
			return;
		}
		
		var blockr = data[0].reason, // fetching block reason
			blockID = data[0].id, // fetching block ID
			blockperformer = data[0].by, // fetching block performer
			blockperformer_url = encodeURIComponent(blockperformer),
			blocktime = data[0].timestamp, // fetching block start time
			expire = data[0].expiry; // fetching block expiration
		
		if (window.BlockSummary || !user)
			return;
		window.BlockSummary = true;
		
		
		//----------- | Main Function for Block Report | -----------//

		// Passing wikitext for parsing
		log('running', 'Parsing block reason wikitext...');
		new mw.Api().parse(blockr).done(function(textOutput) {
			log('passed', 'Parsing block reason wikitext.');
			
			var parsedBlockReason = textOutput;
			
			// console.log("[INFO] parsedBlockReason: " + parsedBlockReason);
			
			
			//----------- | Block Start Time | -----------//
			log('running', 'Block (Start) Timestamp Process...');
			
			var blockDate = new Date(blocktime);
			var blockStartDateTime = blockDate.toLocaleString(config.wgUserLanguage) + ' (UTC)';
			
			log('passed', 'Block (Start) Timestamp Process');
			// console.log("[INFO] blockStartDateTime: " + blockStartDateTime);
			
			//----------- | Time Formatting for Block End Time | -----------//
			log('running', 'Block (End) Timestamp Process...');
			
			var expireDate = new Date(expire);
			var blockEndDateTime = (expire === "infinity") ? 'infinity' : expireDate.toLocaleString(config.wgUserLanguage) + ' (UTC)';

			log('passed', 'Block (End) Timestamp Process');
			// console.log("[INFO] blockEndDateTime: " + blockEndDateTime);
			
			
			//----------- | HTML Display of Block Report | -----------//
			log('running', 'Creating HTML Display of Block Report...');
			
			var Box = document.createElement("div"); // Box
			Box.style.marginTop = "1em"; // setting top-margin for Box
			Box.style.marginBottom = "1em"; // setting bottom-margin for Box
			Box.style.paddingTop = "1em"; // setting padding-top for Box
			Box.style.paddingLeft = "1em"; // setting padding-left for Box
			Box.style.paddingRight = "1em"; // setting padding-right for Box
			Box.style.paddingBottom = "1em"; // setting padding-bottom for Box
			
			
			// adding classes for Box -- these classes are made by Fandom
			Box.classList.add("warningbox");
			Box.classList.add("mw-warning-with-logexcerpt");
			Box.classList.add("mw-content-ltr");
			
			var textParagraph = document.createElement("p"); // create a text paragraph
			
			var usernameArg = '[[' + user + ']]';
			var wikiArg = '[[' + mw.msg('mainpage') + '|' + wiki_name + lang_for_wiki_name + ']]';
			
			textParagraph.innerHTML = "<center><div style=\"font-size: 15pt; line-height: 1em\">" + msg('user-blocked', usernameArg, wikiArg).parse() + "</div></center>" + 
			"<center><span style=\"font-size: 8pt; padding: 0 0.25em 0 0.25em;\"><a href=\"" + config.wgArticlePath.replace('$1', "User:" + url_user) + "\">" + config.wgArticlePath.replace('$1', "User:" + url_user) + "</a></span></center>" + 
			"<hr style=\"border: 1px solid rgb(var(--theme-alert-color--rgb)); background-color: rgb(var(--theme-alert-color--rgb));\">" +
			"<span style=\"position: relative; float: right; border: 1.5px dotted; padding: 0 0.25em 0 0.25em\"><a href=\"" + config.wgArticlePath.replace('$1', "Special:Log?type=block&page=User:" + url_user) + "\">" + mw.msg('blocklogpage') + "</a></span>" +
			"<div style =\"font-size: 15pt; text-decoration: underline;\">" + msg('block-information').escape() + "</div>" + 
			"<b><i>" + msg('username').escape() + " </i></b>" + user +
			"<br/><b><i>" + msg('block-id').escape() + " </b></i>" + blockID +
			"<br/><b><i>" + msg('block-performer').escape() + " </b></i><a href=\"" + config.wgArticlePath.replace('$1', "User:" + blockperformer_url) + "\">" + blockperformer + "</a>" +
			"<br/><b><i>" + msg('block-start').escape() + " </b></i>" + blockStartDateTime +
			"<br/><b><i>" + msg('block-expiry').escape() + " </b></i>" + blockEndDateTime +
			"<br/><b><i>" + msg('block-reason').escape() + " </b></i><blockquote style=\"border-left: 5px solid rgba(var(--theme-alert-color--rgb), 0.5); padding-left: 0.5em;\">" + parsedBlockReason + "</blockquote>";
			
			Box.appendChild(textParagraph); // apply all text configurations into Box
			
			log('done', 'HTML Display of Block Report');
			
			//----------- | Using setInterval to ensure prepending of Box to content page | -----------//
			var interval = setInterval(function() {
				if ($('.ns-2 #content').length) {
					clearInterval(interval);
					$(".ns-2 #content").eq(0).before(Box); // prepending Box to ".ns-2 #content"
				}
			}, 1000);	
		});
	}

	function init() {
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkusers: user,
		}).then(function(d) {
			createBox(d);
		});
	}
	
	mw.loader.using(['mediawiki.api', 'jquery']).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'blocklogpage'
		]);
	}).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'mainpage'
		], {amlang: config.wgContentLanguage});
	}).then(function () {
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('BlockSummary').done(function (i18no) {
				msg = i18no.msg;
				init();
			});
		});
		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
	});
})(window, window.jQuery, window.mediaWiki);