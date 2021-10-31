/* jshint jquery: true, maxerr: 99999999, esversion: 5 */

"use strict";
$(function () {
	function getCodeLink() {
		function toUriArgs(args) {
			return args.map(function (value) {
				return value.key + "=" + value.value;
			}).join("&");
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
		var args = [{
				key: "RemoteBot",
				value: isRemoteBot
			},
			{
				key: "TransferProtocol",
				value: protocol
			},
			{
				key: "SiteHost",
				value: server
			},
			{
				key: "APIPath",
				value: apiPath
			},
			{
				key: "Title",
				value: title
			},
		];
		return "" + head + extensionID + actionPath + "?" + toUriArgs(args);
	}
	var svgPaths = [
		"m12.1 353.9s-24-17.3 4.8-40.4l67.1-60s19.2-20.2 39.5-2.6l619.2 468.8v224.8s-.3 35.3-45.6 31.4z",
		"m171.7 498.8-159.6 145.1s-16.4 12.2 0 34l74.1 67.4s17.6 18.9 43.6-2.6l169.2-128.3z",
		"m451.9 500 292.7-223.5-1.9-223.6s-12.5-48.8-54.2-23.4l-389.5 354.5z",
		"m697.1 976.2c17 17.4 37.6 11.7 37.6 11.7l228.1-112.4c29.2-19.9 25.1-44.6 25.1-44.6v-671.2c0-29.5-30.2-39.7-30.2-39.7l-197.7-95.3c-43.2-26.7-71.5 4.8-71.5 4.8s36.4-26.2 54.2 23.4v887.5c0 6.1-1.3 12.1-3.9 17.5-5.2 10.5-16.5 20.3-43.6 16.2z",
	];
	var vscodeLogo = "<svg class='wds-icon wds-icon-small' height='1455' viewBox='-11.9 -2 1003.9 995.6' xmlns='http://www.w3.org/2000/svg'>" +
		svgPaths.map(function (v) {
			return "<path d='" + v + "'></path>";
		}).join("") +
		"</svg>";
	var text = $("<span>", {
		css: {
			overflow: "hidden",
			"max-height": "100%",
			"text-align": "center",
		},
		text: "VSCode"
	});
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
	].filter(function (value) {
		return value.length > 0;
	}).shift();
	if (anyButton === undefined) {
		console.warn(gadgetID + ": No buttons for insertion.");
		return undefined;
	}
	var link = $("<a>", {
		id: "vscode-wikitext-button",
		href: getCodeLink(),
		class: "wds-button wds-is-text page-header__action-button has-label",
		title: "Open this page in VSCode",
		html: [vscodeLogo, text],
	});

	if (skinName !== "minerva") {
		anyButton.after(link);
	} else {
		var span = $("<span>");
		span.addClass("page-actions-menu__list-item");
		link.addClass("mw-ui-icon mw-ui-icon-element mw-ui-icon-wikimedia-edit-base20 mw-ui-icon-with-label-desktop");
		var button = $("<button>").css({
			display: "flex",
			"align-items": "center",
		});
		link.css("vertical-align", "middle");
		span.append(link);
		button.append(span);
		anyButton.parent().after(button);
	}
});