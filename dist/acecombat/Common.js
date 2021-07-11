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

/*** On page load ***/
$(function(){
	// Template:TOC limit side tools support
	if($(".toclimit").length){
		var limit = $(".toclimit").attr("class").replace("toclimit","").trim();
		$("#sticky-toc").addClass(limit);
	}
	
	// Add upload images button to Special:NewFiles
	if($("body.page-Special_NewFiles").length){
		var buttonArea = ".page-header__buttons";
		if(mw.config.get("skin") == "oasis") buttonArea = ".page-header__contribution-buttons";
		$(buttonArea).append("<a class='wds-button' href='/wiki/Special:Upload'><svg class='wds-icon wds-icon-small'><use xlink:href='#wds-icons-image'></use></svg><span>Add new image</span></a>");
	}
});