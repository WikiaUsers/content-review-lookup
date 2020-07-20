/**
 * ⚠️ WARNING ⚠️
 *
 * This script is currently being refactored, and therefore may not work as
 * intended--or at all! The last revision known to work correctly was #54522,
 * which Fandom staff reviewed and approved. To prevent breaking changes,
 * please:
 *
 * 1. DO NOT submit this script for review
 * 2. REJECT this script if you see this message
 *
 * Thank you! ^-^
 */
// <nowiki>
////////////////////////////////////////////////////////////////////////////////
// Title:                                                                     //
//     Page Formatter                                                         //
// Function:                                                                  //
//     Reformats a template to look appropriate, Replace automatically, etc.  //
// Authors:                                                                   //
//     Ditto Creeper Bot, KockaAdmiralac (Regex Lord), Andrey Andrey, and     //
//     DarthKitty (Majesty Code).                                             //
// Inspiration:                                                               //
//     Pain actually, I saw the fiasco others were going through and I had to //
//     take action. ^-^                                                       //
////////////////////////////////////////////////////////////////////////////////
// rules for the linter
// @see <https://jshint.com/>
/* jshint multistr:true */
/* globals importArticle, BannerNotification */
// SOMEONE REMIND ME TO FIX THIS STUFF AFTER I'M DONE BEING FREE CAUZ OH MY GOODNESS HOW MANY MORE TASKS DID I TAKE??????? *>w>
(function PageFormatter($, mw) {
	'use strict';
	var config = mw.config.get(['wgArticleId', 'wgIsArticle', 'wgPageName', 'wgUserGroups']);
	// run iff we're in an article
	// @FIXME that's not true
	// @TODO describe how this actually works, since the name is misleading
	if (!config.wgIsArticle) {
		return;
	}
	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:PageFormatter.css'
	});
	// @TODO these should probably be moved to window.dev
	var relocatePF = window.relocatePF;
	var CPfinal = window.CP || {
		'': ''
	};
	/**
	 * Almost every aspect of our script relies on the MediaWiki API, so make
	 * sure to grab it BEFORE doing anything else. This should also make things
	 * faster for ordinary users, since we start loading dependencies before
	 * they can try to format a given page. Even in the worst case scenario,
	 * these requests are automatically cached.
	 */
	mw.loader.using('mediawiki.api').then(function main() {
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 * @param AlterCleanVerification
		 * @param verification
		 */
		function doThingOne(revisions, AlterCleanVerification, verification) {
			// Checks whether its the nested formatting, sorry, I can't do
			// that one. My head gave up, finally after 7 days.
			var AlterCleanText;
			if (AlterCleanVerification !== undefined) {
				AlterCleanText = AlterCleanVerification;
			}
			var r = 0;
			var b = r;
			var l = 0;
			// Scans the entire template and stores it within t...
			// FUDGE THE GALLERY TAG MUST BE STORED, DARN IT! @_@
			// I'll do that later.
			for (var i = 0; i < AlterCleanText.length; i++) {
				var s = i + 1;
				if (AlterCleanText[i] + AlterCleanText[s] === '{{') {
					AlterCleanText = AlterCleanText.substr(0, s) + ':PFBF' + r + ':' + AlterCleanText.substr(i + 1);
					if (l < r) {
						l = r;
					}
					r = r + 1;
					b = r - 1;
				} else if (AlterCleanText[i] + AlterCleanText[s] === '}}') {
					AlterCleanText = AlterCleanText.substr(0, s) + ':PFFF' + b + ':' + AlterCleanText.substr(i + 2.5);
					b = b - 1;
				}
			}
			AlterCleanText = AlterCleanText.replace(/\{/g, '');
			AlterCleanText = AlterCleanText.replace(/\}/g, '');
			AlterCleanText = AlterCleanText.replace(/:PFBF0:/g, '{{');
			AlterCleanText = AlterCleanText.replace(/:PFFF1:$/, '}}');
			AlterCleanText = AlterCleanText.replace(/:PFFF0:/g, '}}');
			AlterCleanText = AlterCleanText.replace(/:PFFF-1:/g, '');
			var matches = AlterCleanText.match(/:PFFF\d:/g) || [];
			var something = AlterCleanText;
			var templates = matches.map(function(_, i) {
				var PFBF = ':PFBF' + i + ':';
				var PFFF = ':PFFF' + i + ':';
				var PFHEX = ':PFHEX' + i + ':';
				var tmp1 = something.substr(0, something.search(PFBF));
				var tmp2 = AlterCleanText.substr(something.search(PFFF) + 1).split(PFFF)[1];
				// ↓↓↓ Ewwww, side effects... 🤢 Yuck!
				something = tmp1 + PFHEX + tmp2;
				// ↑↑↑ Ewwww, side effects... 🤢 Yuck!
				return something.split(PFBF)[1].split(PFFF)[0];
			});
			AlterCleanText = something;
			var finalPrompt = 1;
			if (!AlterCleanText) {
				AlterCleanText = revisions[0]['*'];
				var message = 'There are ' + AlterCleanText.match(/\{\{/g).length + ' templates in this page, which should I re-format?';
				finalPrompt = Math.max(1, parseInt(prompt(message, '1'), 10));
			}
			// Don't judge me with this. ;v;
			var Cleansed = AlterCleanText.replace(/="/g, 'VzV"');
			Cleansed = Cleansed.replace(/ \| /g, '|');
			Cleansed = Cleansed.replace(/\| /g, '|');
			Cleansed = Cleansed.replace(/ /g, '_');
			Cleansed = Cleansed.replace(/ \| /g, ' | ');
			Cleansed = Cleansed.replace(/\|(\w*\W*\[*.\|*\])/g, function(_, match) {
				return 'XzX' + match;
			});
			Cleansed = Cleansed.split('{{')[finalPrompt];
			Cleansed = Cleansed.split('}}')[0];
			Cleansed = Cleansed.replace(/\n/g, '');
			Cleansed = Cleansed.replace(/\|/g, '\n|');
			// This creates the spacing.
			// Stores the larges spaced equal sign.
			var lastNumber = Cleansed.split('\n').reduce(function(a, b) {
				var stageTwo = b.search('=');
				return (a < stageTwo) ? stageTwo : a;
			}, 0);
			Cleansed = Cleansed.replace(/_=_/g, '=');
			Cleansed = Cleansed.replace(/=/g, ' = ');
			Cleansed = Cleansed.replace(/  /g, ' ');
			Cleansed = Cleansed.replace(/\n/g, '\n');
			Cleansed = Cleansed.split('\n');
			Cleansed = Cleansed.map(function(tmp2) {
				if (!/=/.test(tmp2)) {
					return tmp2.replace(/\n\n/g, '\n');
				}
				// @see <https://stackoverflow.com/a/1877479>
				var stageThree = new Array(lastNumber - tmp2.search(' ') + 1).join(' ');
				if (stageThree.length < 1) {
					stageThree = '';
				}
				var stageFour = tmp2.replace(/  /g, ' ').split('=');
				var stageFive = stageFour[0].replace(/ /g, '').replace(/\n\n/g, '\n');
				return stageFive + stageThree + ' = ' + stageFour[1];
			});
			Cleansed = Cleansed.join('\n');
			// Cleans out any errors.
			for (var iii = 0; iii < 90; iii++) {
				Cleansed = Cleansed.replace(/undefined/g, '');
				Cleansed = Cleansed.replace(/\n\n/g, '\n');
				Cleansed = Cleansed.replace(/=  /g, '= ');
				Cleansed = Cleansed.replace(/=      /g, '= ');
				Cleansed = Cleansed.replace(/=  /g, '= ');
				Cleansed = Cleansed.replace(/=    /g, '= ');
				Cleansed = Cleansed.replace(/=    /g, '= ');
				Cleansed = Cleansed.replace(/=  /g, '= ');
				Cleansed = Cleansed.replace(/=  /g, '= ');
				Cleansed = Cleansed.replace(/_/g, ' ');
				Cleansed = Cleansed.replace(/=  /g, '= ');
			}
			Cleansed = '{{' + Cleansed;
			var CleansedPipe = Cleansed.match(/\|/g) ? '\n}}' : '}}';
			CleansedPipe = CleansedPipe.replace(/\n\n/g, '\n');
			CleansedPipe = CleansedPipe.replace(/\}\}\n\}\}/g, '}}');
			Cleansed = Cleansed.replace(/\n\|/g, '\n | ');
			Cleansed = Cleansed.replace(/\n\|/g, '\n | ');
			Cleansed = Cleansed.replace(/  \|  /g, ' | ');
			Cleansed = Cleansed.replace(/_\|/g, '|');
			Cleansed = Cleansed.replace(/\|/g, ' | ');
			Cleansed = Cleansed.replace(/  \|  /g, ' | ');
			Cleansed = Cleansed.replace(/:PFHEX(\d):/g, function(_, i) {
				var pattern = new RegExp(':PFBF' + i + ':', 'g');
				return'{{' + templates[i].replace(pattern, '') + '}}';
			});
			Cleansed = Cleansed.replace(/XzX/g, '|');
			Cleansed = Cleansed.replace(/VzV/g, '=');
			Cleansed = Cleansed.replace(/_/g, ' ');
			Cleansed = Cleansed + CleansedPipe;
			if (verification === 1 || verification === 2) {
				return Cleansed;
			}
			$('#CleanTextArea').val(Cleansed);
			new BannerNotification('Successfully extracted from ' + config.wgPageName, 'confirm', '', 4000).show();
		}
		/**
		 * Describe the following function here.
		 */
		function doThingTwo() {
			if ($('#CleanTextArea').val() !== '') {
				$('#PFHeaders').click();
				$('#PFSymbols').click();
				$('#PFReplace').click();
				return;
			}
			$.confirm({
				title: 'Please:',
				content: 'Type in something/Dump Content into the Textarea before using this command.',
				cancelMsg: 'I\'m outta here.',
				okMsg: 'Sure thing.'
			});
		}
		/**
		 * Describe the following function here.
		 *
		 * @param clicks
		 */
		function doThingThree(clicks) {
			var texts = ['Page Formatter', 'Page Unformatter'];
			$('.PFRed, .PFblue').toggleClass('PFRed PFblue');
			$('#SekretPF').toggleClass('Secretred Secretblue').text(texts[clicks % texts.length]);
		}
		/**
		 * Describe the following function here.
		 */
		function doThingFour() {
			$('#CleanTextArea').val('');
		}
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 */
		function doThingFive(revisions) {
			var AlterCleanText = $('#CleanTextArea').val() || revisions[0]['*'];
			if (!/=/g.test(AlterCleanText)) {/*
				do nothing; this is kinda silly, but it avoids nesting
			*/} else if ($('#PFHeaders').hasClass('PFblue')) {
				AlterCleanText = AlterCleanText.replace(/(^|\n)=(=*)([^=]+)\2=/gm, function(_, s1, s2, s3) {
					return s1 + '=' + s2 + ' ' + s3.trim() + ' ' + s2 + '=';
				});
			} else {
				for (var i = 0; i < 20; i++) {
					AlterCleanText = AlterCleanText.replace(/(^|\n)=(=*|=+)\s*([^=]+)\s* \2=/gm, '$1=$2$3$2=');
				}
			}
			var matches = AlterCleanText.match(/([\[\[]+)\1\W*(\w*)(_*)(\W*\w*)( *)(\w*|\W*)\w*([\]\]]*)/g) || [];
			matches.forEach(function(match) {
				AlterCleanText = AlterCleanText.replace(match, match.replace(/_/g, ' '));
			});
			$('#CleanTextArea').val(AlterCleanText);
		}
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 */
		function doThingSix(revisions) {
			var AlterCleanText = $('#CleanTextArea').val() || revisions[0]['*'];
			var colonText = /(^|\n)((?:\*|#|\:|;)+)\s*([^$\n]+)/gm;
			var matches = AlterCleanText.match(colonText) || [];
			var sep = $('#PFSymbols').hasClass('PFblue') ? ' ' : '';
			matches.forEach(function(match) {
				AlterCleanText = AlterCleanText.replace(new RegExp(colonText.source, 'g'), '$1$2' + sep + '$3');
			});
			$('#CleanTextArea').val(AlterCleanText);
		}
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 */
		function doThingSeven(revisions) {
			var AlterCleanText = $('#CleanTextArea').val() || revisions[0]['*'];
			Object.keys(CPfinal).forEach(function(key) {
				var hasClass = $('#PFReplace').hasClass('PFblue');
				var find = hasClass ? key : CPfinal[key];
				var replace = hasClass ? CPfinal[key] : key;
				AlterCleanText = AlterCleanText.replace(new RegExp(find, 'gm'), replace);
			});
			$('#CleanTextArea').key(AlterCleanText);
		}
		/**
		 * Describe the following function here.
		 */
		function doThingEight() {
			$('#CleanTextArea').val(function(_, val) {
				return val.replace(new RegExp(prompt('Variable?'), 'gm'), prompt('Variable to be replaced by?'));
			});
		}
		/**
		 * Describe the following function here.
		 */
		function doThingNine() {
			// Secondary query to extract foreign pages as well when
			// config.wgPageName has been changes through function Eleven.
			new mw.Api().get({
				action: 'query',
				prop: 'revisions',
				rvtoken: 'rollback',
				titles: config.wgPageName,
				rvprop: 'ids|timestamp|user|userid|size|sha1|comment|content',
				rvlimit: 500,
				cb: new Date().getTime()
			}).done(function(response) {
				$('#CleanTextArea').val(response.query.pages[config.wgArticleId].revisions[0]['*']);
				new BannerNotification('Successfully extracted Content from ' + config.wgPageName, 'confirm', '', 4000).show();
			});
		}
		/**
		 * Describe the following function here.
		 *
		 * @param prop
		 * @param verb
		 */
		function doThingTen(prop, verb) {
			var query = {
				action: 'edit',
				title: config.wgPageName,
				summary: '([[w:c:dev:PageFormatter|P.F]])'
			};
			query[prop] = $('#CleanTextArea').val();
			new mw.Api().post(query).done(function() {
				new BannerNotification('Successfully ' + verb + ' content to ' + config.wgPageName, 'confirm', '', 4000).show();
			});
		}
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 */
		function doThingEleven(revisions) {
			new mw.Api().get({
				action: 'compare',
				fromrev: revisions[0].parentid,
				torev: revisions[0].revid
			}).done(function(response) {
				var height = $(window).height() - 250;
				// same as preview
				var container = '<div id="PageLD" style="height: ' + height + 'px;">\
					<h2>Page Details</h2>\
					<table style="width: 100%;">\
						<tr>\
							<th></th>\
							<th></th>\
						</tr>\
						<tr>\
							<td>Title</td>\
							<td>\
								<a href="' + config.wgPageName + '">' + config.wgPageName + '</a>\
							</td>\
						</tr>\
						<tr>\
							<td>Edited By:</td>\
							<td>\
								<a href="/User:' + revisions[0].user + '">' + revisions[0].user + '</a>\
							</td>\
						</tr>\
						<tr>\
							<td>Summary:</td>\
							<td>' + revisions[0].comment + '</td>\
						</tr>\
						<tr>\
							<td>TimeStamp:</td>\
							<td>' + revisions[0].timestamp + '</td>\
						</tr>\
						<tr>\
							<td>User\'s ID:</td>\
							<td>' + revisions[0].userid + '</td>\
						</tr>\
						<tr>\
							<td>Current ID:</td>\
							<td>' + revisions[0].parentid + '</td>\
						</tr>\
						<tr>\
							<td>Undo ID:</td>\
							<td>' + revisions[0].revid + '</td>\
						</tr>\
						<tr>\
							<td>sha1:</td>\
							<td>' + revisions[0].sha1 + '</td>\
						</tr>\
						<tr>\
							<td>Size:</td>\
							<td>' + revisions[0].size + ' Bytes</td>\
						</tr>\
						<tr>\
							<td>Content</td>\
							<td>\
								<textarea id="theme-solarized-light" style="\
									height: 429px;\
									margin: 0;\
									overflow: scroll;\
									width: 100%;\
								">' + revisions[0]['*'].replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>\
							</td>\
						</tr>\
					</table>\
					<table class="PFDiff">' + response.compare['*'] + '</table>\
				</div>';
				$.showCustomModal('', container);
				new BannerNotification('Successfully loaded content from ' + config.wgPageName, 'confirm', '', 4000).show();
			});
		}
		/**
		 * Describe the following function here.
		 */
		function doThingTwelve() {
			var target = prompt('Which page would you like to edit to or Get Content from?');
			config.wgPageName = target;
			if (target === '') {
				return;
			}
			new BannerNotification('Successfully changed editing to ' + target, 'confirm', '', 4000).show();
		}
		/**
		 * Describe the following function here.
		 *
		 * @param revisions
		 */
		function rollback(revisions) {
			var now = revisions[0];
			var then = revisions.reduce(function(a, b) {
				return a.user !== now.user ? a : b;
			});
			var canRollbackNatively = ['sysop', 'vstf', 'staff', 'helper', 'rollback', 'content-moderator', 'threadmoderator'].some(function(group) {
				return config.wgUserGroups.indexOf(group) !== -1;
			});
			if (canRollbackNatively) {
				new mw.Api().post({
					action: 'rollback',
					user: now.user,
					title: config.wgPageName,
					token: now.rollbacktoken
				});
				return;
			}
			new mw.Api().get({
				action: 'compare',
				fromtitle: config.wgPageName,
				torev: then.revid
			}).then(function(response) {
				var msg = '<p>You\'re reverting edits from <b>' + now.user + '</b> to <b>' + then.user + '</b>.</p>';
				var diffTable = '<table class="PFDiff" style="margin-top: 1em;">' + response.compare['*'] + '</table>';
				return $.Deferred(function(d) {
					$.confirm({
						title: 'Ditto\'s Rollback :3',
						cancelMsg: 'Nope',
						okMsg: 'Understood',
						content: msg + diffTable,
						onOk: d.resolve
					});
				}).promise();
			}).then(function() {
				return new mw.Api().post({
					action: 'edit',
					title: config.wgPageName,
					text: then['*'],
					summary: 'Reverted edits by ' + now.user + ' to ' + then.user + ' using PageFormatter.',
					token: mw.user.tokens.values.editToken
				});
			}).then(function() {
				new BannerNotification('Successfully reverted edits. ;3', '', 4000).show();
			});
		}
		/**
		 * Attach the activation button to the top of the page, or somewhere
		 * else if so desired.
		 *
		 * @FIXME `eval()` is evil, find a safer way to do this
		 * @TODO only attach button one time once the old header style is
		 *       completely phased out
		 */
		if (relocatePF) {
			eval(relocatePF);
		} else {
			$('.pph-dropdown-container ul.pph-dropdown').append('<li><span id="PageCleaner">Clean up!</span></li>');
			$('<nav class="wikia-menu-button" id="PageCleaner">Clean up!</nav>').insertAfter('.WikiaPageHeader h1');
		}
		/**
		 * Let's get this party started!
		 *
		 * Build the main modal window, render it, and attach an event handler
		 * to each button contained within.
		 */
		$('#PageCleaner').on('click', function init() {
			var CleanMod = '<div style="display: flex; flex-direction: column; height: 100%;">\
				<h2 id="SekretPF" class="Secretblue">Page Formatter</h2>\
				<table id="PageClean">\
					<tr>\
						<td>\
							<button id="GetPageData">View Page Details</button>\
						</td>\
						<td>\
							<button id="ChngPg">Edit Another Page</button>\
						</td>\
					</tr>\
					<tr>\
						<td>\
							<button class="TempExtr">Template Formatter</button>\
						</td>\
						<td>\
							<button id="ReversePF">All in One</button>\
						</td>\
					</tr>\
					<tr>\
						<td>\
							<button id="PFCleanse">Clean TextArea</button>\
						</td>\
						<td>\
							<button id="PageDump">Dump Content</td>\
						</td>\
					</tr>\
					<tr>\
						<td>\
							<button id="SaveDump">Submit (Replace Page)</button>\
						</td>\
						<td>\
							<button style="width: calc(50% - 2px);" id="AppendDump">Append</button>\
							<button style="width: calc(50% - 2px);" id="PrependDump">Prepend</button>\
						</td>\
					</tr>\
					<tr>\
						<td>\
							<button id="PFHeaders" class="PFblue">Headers Replacement</button>\
						</td>\
						<td>\
							<button id="PFSymbols" class="PFblue">Common Arrangement</button>\
						</td>\
					</tr>\
					<tr>\
						<td>\
							<button id="PFReplace" class="PFblue">Variable Replacement</button>\
						</td>\
						<td>\
							<button id="PFCustom" class="PFblue">Custom Replacement</button>\
						</td>\
					</tr>\
				</table>\
				<textarea id="CleanTextArea" placeholder="Make Wikia great again!"></textarea>\
			</div>';
			$.showCustomModal('', CleanMod, {
				id: 'PFVoltron',
				// Don't hurt me. I like Voltron. ;-;
				callback: function() {
					new mw.Api().get({
						action: 'query',
						prop: 'revisions',
						rvtoken: 'rollback',
						titles: config.wgPageName,
						rvprop: 'ids|timestamp|user|userid|size|sha1|comment|content',
						//
						// NOTE:
						// According to [[mw:API:Revisions]], the "content" rvprop makes
						// this 10x smaller. :(
						//
						rvlimit: 500,
						cb: new Date().getTime()
					}).done(function(response) {
						var revisions = response.query.pages[config.wgArticleId].revisions;
						var clicks = 0;
						$('.TempExtr').on('click', function() {
							doThingOne(revisions);
						});
						$('#ReversePF').on('click', function() {
							doThingTwo();
						});
						$('#SekretPF').on('click', function() {
							clicks += 1;
							doThingThree(clicks);
						});
						$('#PFCleanse').on('click', function() {
							doThingFour();
						});
						$('#PFHeaders').on('click', function() {
							doThingFive(revisions);
						});
						$('#PFSymbols').on('click', function() {
							doThingSix(revisions);
						});
						$('#PFReplace').on('click', function() {
							doThingSeven(revisions);
						});
						$('#PFCustom').on('click', function() {
							doThingEight();
						});
						$('#PageDump').on('click', function() {
							doThingNine();
						});
						$('#SaveDump').on('click', function() {
							doThingTen('text', 'saved');
						});
						$('#AppendDump').on('click', function() {
							doThingTen('appendtext', 'appended');
						});
						$('#PrependDump').on('click', function() {
							doThingTen('prependtext', 'prepended');
						});
						$('#GetPageData').on('click', function() {
							doThingEleven(revisions);
						});
						$('#ChngPg').on('click', function() {
							doThingTwelve();
						});
						$('<button class="wikia-chiclet-button boi">!</button>').on('click', function() {
							rollback(revisions);
						}).prependTo('#PFVoltron');
					});
				}
			});
		});
	});
})(this.jQuery, this.mediaWiki);