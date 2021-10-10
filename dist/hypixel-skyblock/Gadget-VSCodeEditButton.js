/* jshint jquery: true, maxerr: 99999999, esversion: 5 */

"use strict";
$(function () {
	function getCodeLink() {
		function toUriArgs(args) {
			return args.map(function (value) { return value.key + "=" + value.value; }).join("&");
		}
		var scheme = "vscode";
		var codespaceScheme = "https://*.github.dev";
		var head = scheme ? scheme + "://" : codespaceScheme + "/";
		var extensionID = "rowewilsonfrederiskholme.wikitext";
		var actionPath = "/PullPage";
		var isRemoteBot = "true";
		var protocol = window.location.protocol + "//";
		var server = window.mw.config.get("wgServer").replaceAll(/https?:\/\//g, "");
		var scriptPath = window.mw.config.get("wgScriptPath");
		var apiPath = scriptPath + "/api.php";
		var title = window.mw.config.get("wgPageName");
		var args = [
			{ "key": "RemoteBot", "value": isRemoteBot },
			{ "key": "TransferProtocol", "value": protocol },
			{ "key": "SiteHost", "value": server },
			{ "key": "APIPath", "value": apiPath },
			{ "key": "Title", "value": title },
		];
		return "" + head + extensionID + actionPath + "?" + toUriArgs(args);
	}
	var text = "Open in VSCode";
	var gadgetID = "wikitext-extension-gadget";
	if (!window.mw) {
		console.error(gadgetID + ": window.mw is not accessible.");
		return undefined;
	}
	var skinName = window.mw.config.get("skin");
	if (!skinName) {
		console.warn(gadgetID + ": skin is undefined");
		return undefined;
	}
	var anyButton = [
		$("#ca-edit"),
		$("#ca-viewsource"),
		$("#ca-view")
	].filter(function (value) { return value.length > 0; }).shift();
	if (anyButton === undefined) {
		console.warn(gadgetID + ": No buttons for insertion.");
		return undefined;
	}
	var link = $("<a>", {
		id: "vscode-wikitext-button",
		href: getCodeLink(),
		class: "wds-button wds-is-text page-header__action-button has-label",
		title: "Open this page in VSCode",
		text: text,
	});

	if (skinName !== "minerva") {
		anyButton.after(link);
	}
	else {
		var span = $("<span>");
		span.addClass("page-actions-menu__list-item");
		link.addClass("mw-ui-icon mw-ui-icon-element mw-ui-icon-wikimedia-edit-base20 mw-ui-icon-with-label-desktop");
		button.css({ "align-items": "center", "display": "flex" });
		link.css("vertical-align", "middle");
		span.append(link);
		button.append(span);
		anyButton.parent().after(button);
	}
});