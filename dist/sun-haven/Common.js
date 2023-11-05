/* Any JavaScript here will be loaded for all users on every page load. */

/* -------- Tooltips Configuration ---------- */
window.shTooltips = $.extend(true, window.shTooltips, {RegExp: (window.shTooltips || {}).RegExp || {} });
window.shTooltips.templates = [
	{
		templatename: "LOCATION",
		template: "{{Tooltip/location/data|%PAGE%|description=%TEXT%" +
                    "|location=<#location#>" + 
                    "|hours=<#hours#>" +
                    "|map=<#map#>" +
                    "|image=<#image#>" +
                    "}}"
	},
    {
		templatename: "NPC",
		template: "{{NPC tooltip|%PAGE%|name=<#name#>}}"
	},
    {
		templatename: "Item infobox",
		template: "{{Item tooltip|%PAGE%|image=<#image#>|sell=<#sell#>|selltype=<#selltype#>" +
                    "|itemType=<#itemType#>|selltype=<#selltype#>|restores=<#restores#>" +
                    "|statInc=<#statInc#>|statAmt=<#statAmt#>|region=<#region#>|location=<#location#>" +
                    "|node=<#node#>|season=<#season#>|seed=<#seed#>|produces=<#produces#>|exp=<#exp#>" +
                    "|requirement=<#requirement#>|set=<#armorset#>" + 
                    "}}"
	},
    {
        linkmatch: /Template:.+/,
        template: '{{Tooltip/template|%PAGE%}}'
    }
];

var loadingImage = "https://static.wikia.nocookie.net/sun-haven/images/8/86/Crafting_Table.gif/revision/latest?cb=20210702142456";
window.shTooltips.loadingContent = '<div style="padding: 10px;"><img src="' + loadingImage + '"/>';
window.shTooltips.delay = 300;
/* ------------------------------------------ */