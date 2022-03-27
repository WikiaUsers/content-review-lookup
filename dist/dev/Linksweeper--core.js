// <pre>
//Link sweeper v1.1d
//By Dessamator
//2016/06/15 Bug fix made sure anchors(link#anchor) are handled properly and change "_" to space in links
//add regex to clean link in articles (e.g. myarticle in "<gallery> foo.png|link=myarticle</gallery>"
//2016/05/26 Added separate localization and config file and sanitizer
//2016/05/05 Added button to find all redlinks in a page
//2016/04/01 Added custom list of categories to fetch pages
//Removes backlinks from pages, works from Special:WantedPages / Special:Whatlinkshere & Special:wantedfiles
//Ideas and some code from from https://dev.wikia.com/wiki/MediaWiki:AutoEditPages/code.js & dev.wikia.com/masscategorization
//Change log:
//2016/04/01 Added support for cleaning templates, Added category, button for batch removal in special pages
//2016/03/17 Added support for cleaning links in  galleries
//2016/03/16 Added support for removing many links at once, added show backlinks button
//2016/03/12 Added Link to Wikia oasis skin (mytools) and "?action=delete"
//2016/03/10 Bug fix (improve detection of links on pages)
/* jshint -W097 , browser:true, devel:true, jquery:true */
/*global mediaWiki */
(function (window, mw, $) {
	"use strict";
	var defaultSettings = defaultSettings || {
		"settings": {
			"linkSweepConfirmation": window.linkSweepConfirmation || true,
			"linkSweeperDelay": 1000,
			"categoryList": ["Custom"].concat(window.CategoryList || ["Candidates for deletion", "Pages with broken file links", "Article stubs"]),
			"specialpages": window.linkSweeperRedlist || {
				"wantedpages": 1,
				"whatlinkshere": 1,
				"wantedfiles": 1,
				"listredirects": 1,
				"uncategorizedpages":1
			}
		}
	};
	var i18n = window.linksweeper_i18n || {
		"en": {
			"btn_show_back_links": "Show backlinks",
			"btn_add_category_content": "Add category content",
			"btn_fetch_redlinks": "Fetch red links",
			"btn_cancel": "Exit",
			"btn_remove_backlinks": "Remove backlinks",
			"label_pagelinks": "Page links (add one per line)",
			"label_reason": "Reason",
			"label_namespace": "Namespace",
			"label_fetch_from_category": "Fetch from Category",
			"label_delete_links": "Delete link?",
			"label_report": "Report:",
			"label_submit_warning": "This action will remove links from several pages. Are you sure?",
			"label_category_fetch": "Enter a category (without 'category:' prefix):",
			"label_report_search_backlinks": "Searching for backlinks ...",
			"report_found_backlinks": "Found backlinks",
			"report_link_not_found": "link not found in page",
			"report_action_cancel": "Cancelled",
			"report_no_links_found": "No links found",
			"report_fail_request": "Failed to retrieve information",
			"label_report_nobacklinks": "No links to sweep.",
			"label_error_fetch_links": "Error: Could not fetch links",
			"label_error_fetch_links_server": "Error: Server or connectivity problem.",
			"label_success_linksremoved": "- link(s) removed",
			"label_success": "pages processed.",
			"item_dropdown_allnamespaces": "all",
			"label_fetching_backlinks": "Fetching...",
			"default_removalsummary": "Removing link(s)"
		}
	};
	var userLang = defaultSettings[mw.config.get("wgUserLanguage")] || "en";
	var allowedSpecialPage;
	var linkSweepConfirmation;
	var delay;
	var categoryList;
	var defaultRemovalMsg;
	var sweepedPages = 0;
	var sweepedLinks = 0;
	var fileNamespace = {};
	var templateNamespace = {};
	var removableLinkList = [];
	var debug = false;
	var bContinueProcess = true;
	// Gets and escapes messages
	function msg(msgString) {
		return mw.html.escape(i18n[userLang][msgString] || i18n.en[msgString] || "");
	}
	//Capitalizes string
	function ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	//escapes regExp string
	var escapeRegExp = function (text) {
		var regx = new RegExp("[-[\\]{}()*+?.,\\^$|#\\s]", "g");
		return text.replace(regx, "\\$&");
	};
	//Obtains links to clean from textarea
	function getLinksToClean() {
		var linkList = $("#pageNameId").val();
		if ($("#pageNameId").val().trim() === "") {
			return [];
		}
		var linkArray = linkList.split("\n");
		linkArray = linkArray.filter(function (n) {
			if (n && String(n).trim() !== "") {
				return true;
			}
		});
		return linkArray;
	}
	//Adds a message on actions to textarea
	function sendMsg(msg, bReplace) {
		if ($("#idReport").length) {
			if (bReplace) {
				$("#idReport").text(msg);
			} else {
				$("#idReport").append(msg + "\n");
			}
		} else {
			console.log(msg);
		}
	}
	//Adds a report on status
	function reportStatus(msg) {
		if ($("#lblReport").length) {
			$("#lblReport").text("Report:\t" + msg);
		} else {
			console.log(msg);
		}
	}
	//Gets possible file namespaces
	function setNamespaces() {
		var namespaceIds = mw.config.get("wgNamespaceIds");
		fileNamespace = {};
		Object.keys(namespaceIds).forEach(function (name) {
			if (namespaceIds[name] === 6) {
				fileNamespace[name] = true;
			}
			if (namespaceIds[name] === 10) {
				templateNamespace[name] = true;
			}
		});
	}
	// Compares two titles
	function compareTitle(title1, title2) {
		try {
			title1 = decodeURIComponent(title1);
			title2 = decodeURIComponent(title2);
			var tmpTitle1 = new mw.Title(title1);
			var tmpTitle2 = new mw.Title(title2);
			var isEqualNs = tmpTitle1.getNamespaceId() === tmpTitle2.getNamespaceId();
			return ucFirst(tmpTitle1.getName()) === ucFirst(tmpTitle2.getName()) && isEqualNs;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	//Updates progress bar
	function setProgress(action, value, max) {
		var maxProgress = $("#idProgressBar").attr("max");
		if (action === "add") {
			sweepedPages += 1;
			$("#idProgressBar").attr("value", sweepedPages);
		} else if (action === "set") {
			if (value) {
				$("#idProgressBar").attr("value", value);
			}
			if (max) {
				$("#idProgressBar").attr("max", max || maxProgress);
			}
		} else if (action === "wait") {
			$("#idProgressBar").removeAttr("value");
		} else if (action === "done") {
			$("#idProgressBar").attr("value", maxProgress);
		} else if (action === "reducemax" && maxProgress >= 2) {
			$("#idProgressBar").attr("max", maxProgress - 1);
		} else {
			$("#idProgressBar").attr("value", 0);
			$("#idProgressBar").attr("max", 1);
		}
	}
	//Gets current link to remove e.g. from special page
	function getPageLink($currItem) {
		var specialPage = mw.config.get("wgCanonicalSpecialPageName");
		var pageName = mw.config.get("wgPageName");
		if (specialPage && allowedSpecialPage[specialPage.toLowerCase()]) {
			if (specialPage.toLowerCase() === "whatlinkshere") {
				pageName = $("#mw-whatlinkshere-target").val();
			} else {
				pageName = $currItem.parent().children(":first-child").text();
			}
		}
		return pageName;
	}
	//Checks for valid namespace to remove links
	function getNamespacesFilter() {
		var objNamespace = mw.config.get("wgNamespaceIds");
		var nsNameList = $("#namespaceDropdown").val() || [];
		var nsFilters = [];
		var nsName;
		var ns;
		for (ns = 0; ns < nsNameList.length; ns += 1) {
			nsName = nsNameList[ns];
			if (nsName === "main") {
				nsFilters.push(0);
			}
			if (objNamespace[nsName]) {
				nsFilters.push(objNamespace[nsName]);
			}
		}
		return nsFilters.join("|");
	}
	//Creates a combo box with the namespace
	function createNamespaceCmbList(dropOptions) {
		var Html = mw.html;
		var cmbOutput = "";
		var objNamespace = mw.config.get("wgNamespaceIds");
		var i;
		for (i = 0; i < dropOptions.length; i += 1) {
			cmbOutput += Html.element("option", {
				"value": dropOptions[i]
			}, dropOptions[i]);
		}
		Object.keys(objNamespace).forEach(function (key) {
			if (objNamespace.hasOwnProperty(key) && key.length > 0) {
				cmbOutput += Html.element("option", {
					"value": key
				}, key);
			}
		});
		return cmbOutput;
	}

	function createCmbBox(options) {
		var Html = mw.html;
		var cmbTextOptions = "";
		options.forEach(function (main) {
			cmbTextOptions += Html.element("option", {
				"value": main
			}, main);
		});
		return new Html.Raw(cmbTextOptions);
	}
	//Creates a form and adds current page name
	function createForm(curPageName, options) {
		var Html = mw.html;
		var output = "";
		var formOutput = "";
		var dropList = createNamespaceCmbList([msg("item_dropdown_allnamespaces"), "main"]);
		var namespaceFieldset = new Html.Raw(Html.element("label", {
			"for": "namespaceDropdown"
		}, msg("label_namespace")) + Html.element("select", {
			id: "namespaceDropdown",
			style: "float:right",
			multiple: "",
			size: "3"
		}, new Html.Raw(dropList)));
		var formContent = [{
			tag: "label",
			attribs: {
				"for": "pageNameId"
			},
			content: msg("label_pagelinks")
		}, {
			tag: "textarea",
			attribs: {
				"id": "pageNameId",
				style: "height: 5em; width: 100%;"
			},
			content: curPageName
		}, {
			tag: "label",
			attribs: {
				"for": "linkRemovalReasonId"
			},
			content: msg("label_reason"),
			"newline": true
		}, {
			tag: "input",
			attribs: {
				"id": "linkRemovalReasonId",
				style: "float:right",
				type: "text",
				placeholder: "Enter a reason"
			},
			content: ""
		}, {
			tag: "fieldset",
			attribs: {},
			content: namespaceFieldset,
			generated: 1
		}, {
			tag: "label",
			attribs: {
				"for": "cmbCategories"
			},
			content: msg("label_fetch_from_category")
		}, {
			tag: "select",
			attribs: {
				"id": "cmbCategories",
				style: "max-width:60%; float: right"
			},
			content: createCmbBox(categoryList)
		}, {
			tag: "label",
			attribs: {
				"for": "chkBoxDeleteId"
			},
			content: msg("label_delete_links"),
			newline: true
		}, {
			tag: "input",
			attribs: {
				"id": "chkBoxDeleteId",
				type: "checkbox",
				value: "delete"
			},
			content: ""
		}, {
			tag: "label",
			attribs: {
				"id": "lblReport",
				"for": "idReport"
			},
			content: msg("label_report") + (options.reportStatus || ""),
			"newline": true
		}, {
			tag: "textarea",
			attribs: {
				"id": "idReport",
				style: "height: 5em; width: 100%;"
			},
			content: ""
		}, {
			tag: "progress",
			attribs: {
				"id": "idProgressBar",
				style: "width:100%",
				max: 100,
				value: (options.progress || 0)
			},
			content: ""
		}];
		var formAttribs = {
			"class": "WikiaForm"
		};
		var i;
		for (i = 0; i < formContent.length; i += 1) {
			if (formContent[i].newline) {
				formOutput += "<br>";
			}
			formOutput += Html.element(formContent[i].tag, formContent[i].attribs, formContent[i].content);
		}
		output = Html.element("form", formAttribs, new Html.Raw(formOutput));
		return output;
	}
	//https://github.com/spencermountain/wtf_wikipedia
	//Finds template transclusions in text
	function recursive_matches(opener, closer, text) {
		var out = [];
		var last = [];
		var chars = text.split("");
		var open = 0;
		var characterIndex = 0;
		var charGroup;
		var extraChars = opener.length - 1;
		var openerLocations = [];
		var lastOpener = 0;
		if (closer.length > 2) {
			return;
		}
		while (characterIndex < chars.length) {
			charGroup = chars[characterIndex];
			if (extraChars > 0) {
				charGroup = chars[characterIndex] + (chars[characterIndex + extraChars] || "");
			}
			//increment open tag
			if (charGroup === opener) {
				open += 1;
				openerLocations.push(characterIndex);
				if (extraChars > 0) {
					last.push("{");
					characterIndex += 1;
					continue;
				}
			}
			//decrement close tag
			if (charGroup === closer) {
				if (open > 0) {
					//Internal search
					lastOpener = openerLocations.pop();
					out.push(text.substring(lastOpener, characterIndex + extraChars + 1));
				}
				open -= 1;
				if (open < 0) {
					open = 0;
				}
			}
			if (open >= 0) {
				last.push(chars[characterIndex]);
			}
			characterIndex += 1;
		}
		return out;
	}
	//Performs query on wiki servers
	function processAction(type, actionConfig, successMsg, failMsg, runMethod) {
		var mwApi = (new mw.Api());
		var promise;
		if (actionConfig) {
			if (type === "post") {
				promise = mwApi.post(actionConfig);
			} else {
				promise = mwApi.get(actionConfig);
			}
			promise.then(function (data) {
				if (!runMethod) {
					if (!data.error) {
						sendMsg(successMsg);
					} else {
						failMsg = failMsg || "Failed : " + data.error.info + "<br/>";
						sendMsg(failMsg);
					}
				} else {
					runMethod(data, successMsg, failMsg);
				}
			}).fail(function (data) {
				sendMsg(data.statusText);
			});
		}
		return promise;
	}
	//Looks for backLinks and returns results
	function processBackLinks(page, runMethod, succ, fail) {
		var ns = page.split(":")[0] || "";
		var namespaceFilter = getNamespacesFilter();
		var config = {
			action: "query",
			list: "backlinks",
			bltitle: page,
			blnamespace: namespaceFilter,
			bot: true,
			bllimit: 500
		};
		if (fileNamespace[ns.toLowerCase()]) {
			config = {
				action: "query",
				list: "imageusage|backlinks",
				iutitle: page,
				bltitle: page,
				iunamespace: namespaceFilter,
				blnamespace: namespaceFilter,
				bot: true,
				iulimit: 500
			};
		}
		if (templateNamespace[ns.toLowerCase()]) {
			config = {
				action: "query",
				list: "embeddedin|backlinks",
				eititle: page,
				bltitle: page,
				einamespace: namespaceFilter,
				blnamespace: namespaceFilter,
				bot: true,
				iulimit: 500,
				eilimit: 500
			};
		}
		return processAction("post", config, succ, fail, runMethod);
	}
	//Shows backlinks to a page
	function showBackLinks() {
		var linkList = getLinksToClean();
		if (linkList.length > 0) {
			var counter = 0;
			reportStatus(msg("label_report_search_backlinks"));
			sendMsg("", true);
			setProgress("wait");
			setProgress("set", null, linkList.length);
			var i;
			var checkLinks = function (data) {
				if (data && data.query && data.query.backlinks) {
					var fullQueryResults = data.query.backlinks.concat(data.query.imageusage || data.query.embeddedin || []);
					var backLinkList = fullQueryResults.filter(function (item, pos) {
						return fullQueryResults.indexOf(item) === pos;
					});
					var listLength = backLinkList.length;
					var outputBacklinks = "";
					Object.keys(backLinkList).forEach(function (id) {
						if (backLinkList[id]) {
							outputBacklinks += backLinkList[id].title + "\n";
						}
					});
					if (listLength > 0) {
						sendMsg(outputBacklinks);
					}
					counter += 1;
					setProgress("set", counter);
					if (counter === linkList.length) {
						setProgress("done");
						reportStatus("");
					} else {
						reportStatus(msg("label_fetching_backlinks"));
					}
				} else {
					reportStatus(msg("label_error_fetch_links"));
				}
			};
			for (i = 0; i < linkList.length; i += 1) {
				processBackLinks(linkList[i], checkLinks, "", msg("label_error_fetch_links_server"));
			}
		} else {
			reportStatus(msg("label_report_nobacklinks"));
		}
	}
	//Searches for links in content
	function sweepLinks(content) {
		var linkParts;
		var targetlinkId;
		var targetLink;
		var fileLink;
		var newContent;
		var tmpTitle1;
		var titlePrefix;
		var hasColon;
		var prefixNs = "";
		var count = 0;
		var arrLinks = content.match(/\[\[(.*?)\]\]/g);
		var galLinks = content.match(new RegExp("\\<gallery.*?\\>[\\S\\s]*?<.*?\\/.*?gallery.*?\\>", "g"));
		var templateLinks = recursive_matches("{{", "}}", content);
		Object.keys(fileNamespace).forEach(function (name) {
			prefixNs += name + ":|";
		});
		var invalidTitleChars = ["#", "<", ">", "[", "]", "|", "{", "}"];
		if (templateLinks) {
			var templateName = "";
			var templateParts;
			var tmpID;
			var ns = "";
			for (tmpID = 0; tmpID < templateLinks.length; tmpID += 1) {
				for (targetlinkId = 0; targetlinkId < removableLinkList.length; targetlinkId += 1) {
					targetLink = removableLinkList[targetlinkId];
					if (targetLink) {
						templateParts = templateLinks[tmpID].split(":");
						templateName = templateParts[0];
						ns = templateParts[0].toLowerCase().substring(2);
						if (templateNamespace[ns]) {
							templateName = "{{" + templateParts[1];
						}
						templateName = templateName.substring(2, templateName.length - 2);
						templateName = templateName.split("|")[0];
						if (invalidTitleChars.indexOf(templateName.substring(0, 1)) > -1) {
							continue;
						}
						if (compareTitle("Template:" + templateName, targetLink)) {
							content = content.replace(templateLinks[tmpID], "");
							count += 1;
						}
					}
				}
			}
		}
		if (galLinks) {
			var galID;
			for (galID = 0; galID < galLinks.length; galID += 1) {
				newContent = galLinks[galID];
				for (targetlinkId = 0; targetlinkId < removableLinkList.length; targetlinkId += 1) {
					targetLink = removableLinkList[targetlinkId];
					fileLink = escapeRegExp(targetLink.split(":")[1] || targetLink);
					newContent = newContent.replace(new RegExp("(\\n)?(" + prefixNs + ")?" + fileLink + "(\\n)?", "g"), "");
					newContent = newContent.replace(new RegExp("(\\|link.*?\=.*?" + fileLink + ".*?)(\\n|\\||<)", "g"), "$2");
					count += 1;
				}
				content = content.replace(galLinks[galID], newContent);
				content = content.replace(new RegExp("\\<gallery.*\\>\\s*<\\/gallery\\>"), "");
			}
		}
		if (arrLinks && arrLinks.length) {
			var plainLink;
			var replaceText;
			var storedLinkedID;
			var linkLength;
			var isLinkRemovable = $("#chkBoxDeleteId").prop("checked");
			for (storedLinkedID = 0; storedLinkedID < arrLinks.length; storedLinkedID += 1) {
				linkParts = arrLinks[storedLinkedID].split("|");
				for (targetlinkId = 0; targetlinkId < removableLinkList.length; targetlinkId += 1) {
					targetLink = removableLinkList[targetlinkId];
					linkLength = linkParts[0].indexOf("]]");
					if (linkParts[0].indexOf("]]") < 0) {
						linkLength = linkParts[0].length;
					}
					plainLink = linkParts[0].substring(2, linkLength);
					//Account for the colon trick
					hasColon = linkParts[0].substring(2, 3) === ":";
					if (hasColon) {
						plainLink = linkParts[0].substring(3, linkLength);
					}
					if (compareTitle(plainLink, targetLink)) {
						tmpTitle1 = decodeURIComponent(plainLink);
						tmpTitle1 = new mw.Title(tmpTitle1);
						if ((tmpTitle1.getNamespaceId() === 14 && hasColon) || tmpTitle1.getNamespaceId() !== 14) {
							titlePrefix = ":";
							targetLink = targetLink.replace("_", " ");
							replaceText = targetLink;
							if (isLinkRemovable) {
								replaceText = "";
							}
							content = content.replace(arrLinks[storedLinkedID], replaceText);
							count += 1;
						}
					}
				}
			}
		}
		return [count, content];
	}
	//Performs the actual link removal using api;
	//@page string (pagename)
	function deleteInternalLinks(page, content) {
		if (content) {
			var results;
			var count;
			var replacedContent;
			var ns = page.split(":")[0] || "";
			var namespaces = mw.config.get("wgNamespaceIds");
			if (namespaces[ns.toLowerCase()] === 828) {
				replacedContent = "--<nowiki>\n" + content;
				count = 1;
			} else {
				results = sweepLinks(content);
				count = results[0];
				replacedContent = results[1];
			}
			if (count > 0) {
				var reason = $("#linkRemovalReasonId").val() || defaultRemovalMsg;
				var config = {
					minor: true,
					bot: true,
					format: "json",
					summary: reason,
					action: "edit",
					title: page,
					token: mw.user.tokens.get("editToken"),
					watchlist: "nochange",
					text: replacedContent
				};
				var saveNewContent = function (data) {
					if (data && data.edit && data.edit.result === "Success" && !data.edit.nochange) {
						sendMsg(page + msg("label_success_linksremoved"));
						sweepedLinks += 1;
						setProgress("add");
						reportStatus(sweepedPages + " " + msg("label_success"));
					} else {
						if (data.error){
							if (data.error.code === "unknownerror") {
								sendMsg("Unknown Error, links are probably in an unsupported page or namespace. Page:" + page);
							}else if (data.error.code === "protectedpage") {
								sendMsg(data.error.info + ". Page: " + page);
							}
						}
						else{
							sendMsg("Unknown error: " + JSON.stringify(data.error));
						}
					}
				};
				//Submits call to edit page and removes link
				if (!debug && bContinueProcess) {
					processAction("post", config, "", "", saveNewContent);
				}
				if (debug) {
					console.log(replacedContent);
					setProgress("add");
				}
			} else {
				sendMsg(msg("report_link_not_found") + " - " + page);
				setProgress("reducemax");
			}
		}
	}
	//Preps links for removal
	function removeBackLinks() {
		var linkList = getLinksToClean();
		bContinueProcess = true;
		if (linkList.length) {
			var processedPages = {};
			var confirmAction = true;
			removableLinkList = linkList;
			var startCleaning;
			setProgress("set", 0);
			if ($("#removeButton").attr("disabled") === "disabled") {
				return;
			}
			if (linkSweepConfirmation) {
				confirmAction = window.confirm(msg("label_submit_warning"));
				if (!confirmAction) {
					return;
				}
			}
			startCleaning = function (tmpResultList) {
				if (tmpResultList.length) {
					var id = 0;
					var pageSlices = [];
					var queuePos;
					var timeoutObj;
					var delayedRemove;
					var queryResultList;
					var pageIds;
					var listLength;
					var pageListing = [];
					for (id = 0; id < tmpResultList.length; id += 1) {
						pageListing.push(tmpResultList[id].title);
					}
					sendMsg(msg("report_found_backlinks"));
					setProgress("set", 0, pageListing.length);
					var currBatch = 0;
					if (currBatch < pageListing.length) {
						pageSlices = pageListing.slice(currBatch, currBatch + 10);
						currBatch += 10;
						if (pageSlices.length > 0) {
							$.get(mw.util.wikiScript("api"), {
								action: "query",
								prop: "revisions",
								titles: pageSlices.join("|"),
								rvprop: "content",
								indexpageids: "true",
								format: "json"
							}).then(function (data) {
								if (data.query && data.query.pages) {
									queryResultList = data.query.pages;
									pageIds = data.query.pageids;
									listLength = pageIds.length;
									if (listLength > 0) {
										if (confirmAction) {
											$("#removeButton").attr("disabled", true);
											queuePos = 0;
											delayedRemove = function () {
												if (queuePos < listLength) {
													timeoutObj = setTimeout(delayedRemove, delay);
												} else if (queuePos >= listLength) {
													clearTimeout(timeoutObj);
													timeoutObj = undefined;
													if (tmpResultList.slice(currBatch)) {
														startCleaning(tmpResultList.slice(currBatch));
													}
												}
												var pageContents = queryResultList[pageIds[queuePos]];
												if (pageContents && bContinueProcess && !processedPages[pageContents.title]) {
													var revContent = pageContents.revisions[0];
													processedPages[pageContents.title] = 1;
													if (revContent && revContent["*"]) {
														deleteInternalLinks(pageContents.title, revContent["*"]);
													}
												} else {
													setProgress("reducemax");
													setProgress("set", sweepedPages);
												}
												queuePos += 1;
											};
											delayedRemove();
											$("#removeButton").attr("disabled", false);
										} else {
											reportStatus(msg("report_action_cancel"));
										}
									}
								} else {
									reportStatus(msg("report_no_links_found"));
									setProgress("reducemax");
									setProgress("done", sweepedPages);
								}
							}).fail(function () {
								reportStatus("report_fail_request");
								setProgress("set", 0);
							});
						} else {
							setProgress("done");
						}
					}
				}
			};
			sendMsg("", true);
			var targetLink = 0;
			var storedBackLinks = [];
			var processLinkList;
			processLinkList = function (queuePos) {
				if (linkList[targetLink] && linkList[targetLink].trim() !== "") {
					processBackLinks(linkList[queuePos], function (data) {
						if (data.query) {
							var fullQueryResults = data.query.backlinks.concat(data.query.imageusage || data.query.embeddedin || []);
							var tmpResultList = fullQueryResults.filter(function (item, pos) {
								return fullQueryResults.indexOf(item).title === pos.title;
							});
							storedBackLinks = storedBackLinks.concat(tmpResultList);
							if (linkList[queuePos + 1]) {
								setProgress("wait");
								processLinkList(queuePos + 1);
							} else {
								startCleaning(storedBackLinks);
							}
						}
					});
				}
			};
			processLinkList(0);
		} else {
			reportStatus(msg("label_report_nobacklinks"));
		}
	}
	//Shows modal for LinkSweeper
	var showLinkSweeperModal = function (event) {
		var currPages = getPageLink($(this));
		var options = {};
		if (event.data.type === "batch") {
			var specialPage = mw.config.get("wgCanonicalSpecialPageName");
			options = {
				"progress": undefined,
				reportStatus: ""
			};
			if (allowedSpecialPage[specialPage.toLowerCase()]) {
				$("#mw-content-text li > a:nth-child(1)").each(function () {
					currPages += $(this).text() + "\n";
				});
				if ($("#pageNameId")) {
					$("#pageNameId").text(currPages);
					setProgress("set", 0);
				}
			}
		}
		var sweeperForm = createForm(currPages, options);
		sweepedPages = 0;
		dev.showCustomModal("Link Sweeper", sweeperForm, {
			id: "backLinkForm",
			width: 325,
			buttons: [{
				message: msg("btn_show_back_links"),
				id: "showBacklinks",
				handler: function () {
					showBackLinks(currPages);
				}
			}, {
				message: msg("btn_add_category_content"),
				id: "addCatMembersButton",
				handler: function () {
					var category = $("#cmbCategories").val();
					if (category === "Custom") {
						category = prompt(msg("label_category_fetch, category"));
					}
					if (category.length > 3) {
						var config = {
							action: "query",
							list: "categorymembers",
							cmtitle: "category:" + category,
							format: "json",
							cmlimit: "500"
						};
						var addPages = function (data) {
							if (data.query && data.query.categorymembers) {
								var queryResultList = data.query.categorymembers;
								var pageNames = [];
								queryResultList.forEach(function (categoryMember) {
									pageNames.push(categoryMember.title);
								});
								$("#pageNameId").text(pageNames.join("\n"));
							}
						};
						processAction("post", config, "", "", addPages);
					}
				}
			}, {
				message: msg("btn_fetch_redlinks"),
				id: "fetchRedlinksButton",
				defaultButton: false,
				handler: function () {
					var redLinks = [];
					var currLink = "";
					var contentSelector = ".mw-content-text";
					if (mw.config.get("wgCanonicalSpecialPageName")) {
						contentSelector = ".mw-spcontent";
					}
					$(contentSelector + " a.new").each(function (index, $htmlElement) {
						currLink = $($htmlElement).attr("href");
						currLink = currLink.replace("/wiki/", "").split("?")[0];
						if (currLink.toLowerCase() === "special:upload") {
							currLink = $($htmlElement).attr("title");
						}
						currLink = decodeURI(currLink);
						if (redLinks.indexOf(currLink) === -1) {
							redLinks.push(currLink);
						}
					});
					$("#pageNameId").text(redLinks.join("\n"));
					reportStatus("");
					sendMsg("", true);
					setProgress();
				}
			}, {
				message: msg("btn_cancel"),
				id: "cancelButton",
				handler: function () {
					bContinueProcess = false;
					dev.showCustomModal.closeModal($("#backLinkForm"));
				}
			}, {
				message: msg("btn_remove_backlinks"),
				id: "removeButton",
				defaultButton: true,
				handler: function () {
					removeBackLinks();
				}
			}]
		});
	};
	//Sanitize config
	function sanitizeCfg() {
		if (defaultSettings && defaultSettings.settings) {
			var arrSettings = defaultSettings.settings;
			if (arrSettings.specialpages) {
				Object.keys(arrSettings.specialpages).forEach(function (name) {
					if (typeof (arrSettings.specialpages[name]) !== "number") {
						delete defaultSettings.settings.specialpages[name];
					}
				});
			}
			if (arrSettings.categoryList.constructor !== Array) {
				defaultSettings.settings.categoryList = ["Custom"];
			}
			if (typeof (arrSettings.linkSweeperDelay) !== "number" || arrSettings.linkSweeperDelay < 500) {
				defaultSettings.settings.linkSweeperDelay = 1000;
			}
			defaultSettings.settings.linkSweepConfirmation = defaultSettings.settings.linkSweepConfirmation || true;
		}
	}
	//Initializes script
	function main() {
		sanitizeCfg();
		var specialPage = mw.config.get("wgCanonicalSpecialPageName");
		var Html = mw.html;
		var mwAction = mw.config.get("wgAction");
		allowedSpecialPage = defaultSettings.settings.specialpages;
		linkSweepConfirmation = defaultSettings.settings.linkSweepConfirmation || 1;
		delay = defaultSettings.settings.linkSweeperDelay || 1000;
		categoryList = defaultSettings.settings.categoryList;
		defaultRemovalMsg = msg("default_removalsummary");
		setNamespaces();
		var removeLinks = Html.element("input", {
			"type": "button",
			"value": "Remove backlinks",
			"class": "classRemoveLinks"
		});
		var removeBatchLinks = Html.element("input", {
			"type": "button",
			"value": "Remove all links below",
			"class": "classRemoveBatchLinks"
		});
		if (mw.config.get("skin") === "oasis" && $("#my-tools-menu").length) {
			$("#my-tools-menu").prepend("<li class=\"custom\"><a style=\"cursor:pointer\" id=\"LinkSweeperToolbar\">Link Sweeper</a></li>");
			$("#LinkSweeperToolbar").on("click", {
				type: "toolbarclick"
			}, showLinkSweeperModal);
		}
		if (specialPage && allowedSpecialPage[specialPage.toLowerCase()]) {
			$(".emptymwmsg.mediawiki_showingresults").append(removeBatchLinks);
			if (specialPage.toLowerCase() === "whatlinkshere") {
				$("#mw-whatlinkshere-target").parent().append(" " + removeLinks);
			} else {
				$("#mw-content-text li").each(function () {
					$(this).append(removeLinks);
				});
			}
		} else if (mwAction === "delete") {
			$(".mw-submit").append(" " + removeLinks);
		} else {
			return;
		}
		$(".classRemoveLinks").on("click", {
			type: "normal"
		}, showLinkSweeperModal);
		$(".classRemoveBatchLinks").on("click", {
			type: "batch"
		}, showLinkSweeperModal);
	}
	mw.hook('dev.showCustomModal').add(function() {
		main();
	});
	importArticle({
	    type: 'script',
	    article: 'u:dev:MediaWiki:ShowCustomModal.js'
	});
}(window, mw, $));