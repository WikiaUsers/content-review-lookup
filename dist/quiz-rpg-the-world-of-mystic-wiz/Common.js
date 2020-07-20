/* Any JavaScript here will be loaded for all users on every page load. */

/* Submodules */
importArticles({
	type: 'script',
	articles: [
		'MediaWiki:ServerTime.js',         // DST-aware clock, used by other clock views
		'MediaWiki:Tooltip.js',            // Tooltip (spirits)
		'MediaWiki:Clockbanner.js',        // Clock banner (on main page...)
		'MediaWiki:Expcalc.js',            // Exp->Book calculator
		'MediaWiki:Hippocalc.js',          // Hippo unlocking calculator
		'MediaWiki:DamageCalc.js',         // Skill damage calculator
		'MediaWiki:SLFilter.js',           // Skills list filter
		'MediaWiki:DisplayClock.js',       // Clock at top right of each page
		'MediaWiki:Countdown.js',          // Flexible countdown timer
		'MediaWiki:SkillMultiplierCalc.js' // Skill Multiplier Calculator
		//'MediaWiki:InputFormBuilder.js'  // General Input form
	]
});
 
// hover for show/hide
$("#mouseOverTrigger").mouseenter(function(){
	$("#mouseOverTooltip").slideDown(400);
}).mouseleave(function(){
	$("#mouseOverTooltip").slideUp(400);
});
 
// home-brew (only on this wiki) hovering trigger for class "here-customhover"
// must use in conjunction with "mw-customtoggle"
function addSlideOnHover() {
    var m = this.className.match("mw-customtoggle-(\\S+)");
    if (m) {
        var target = $("#mw-customcollapsible-" + m[1]);
        $(this).hover(
            function(){target.slideDown(600)},
            function(){target.slideUp(600)}
        );
    }
}
 
$(function(){
    $(".here-customhover").each(addSlideOnHover);
});