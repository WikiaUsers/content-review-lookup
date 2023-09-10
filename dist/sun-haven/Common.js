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
		templatename: "FOOD",
		template: "{{Tooltip/Food/data|<#name#>}}"
	},
	{
		templatename: "NPC",
		template: "{{Tooltip/NPC/data|%PAGE%|name=<#name#>}}"
	},
    {
		templatename: "CROP",
		template: "{{Tooltip/crop/data|<#name#>}}"
	},
    {
		templatename: "TOOL",
		template: "{{Tooltip/tool/data|<#name#>}}"
	},
    {
		templatename: "EQUIPMENT",
		template: "{{Tooltip/equipment/data|<#name#>|set=<#armorset#>" + 
                    "|source=<#source#>|effect=<#effect#>}}"
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