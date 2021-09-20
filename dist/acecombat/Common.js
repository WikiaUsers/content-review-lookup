/* These codes are run on every page load for all users. */

/*** dev:LockOldComments ***/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365;

/*** dev:GlobalFileUsage ***/
window.globalFileUsageConfig = {
    'lang': ['fr','ja','pt-br','zh'],
    'auto_show': false
}

/*** dev:AddRailModule ***/
window.AddRailModule = [
	{page: 'Template:DiscordRailModule', prepend: true, maxAge: 86400},
	{page: 'Template:NewPagesRailModule', maxAge: 0}
];

/*** dev:Tooltips ***/
window.tooltips_config = {
	offsetX: 5,
	offsetY: 5,
};

/*** Template:TOC limit side tools support ***/
$(function(){
	if($(".toclimit").length){
		var limit = $(".toclimit").attr("class").replace("toclimit","").trim();
		$("#sticky-toc").addClass(limit);
	}
});