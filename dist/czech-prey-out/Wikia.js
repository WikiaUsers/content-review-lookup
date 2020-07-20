/* ==============
   Witcher TV event giveaway
   Will only be active until roughly 
   end of November 2019
   ============== */
 
 /* Right rail CTA */
    $(function () {
        $('#WikiaRail').prepend("<iframe width='100%' height='700' src='https://fandomrewards.typeform.com/to/y0NKRk'></iframe>");
    });
 /*   
   $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://brettbates.typeform.com/to/GtPn2X' style='width: 100%; height: 700px;padding:20px 0'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });

*/

/* Add modules to the right rail 
var rightRailModules = {
	config: {
		loadOnNamespaces: [0]
	},
 
	checkRail: 0,
 
	addModules: function() {
		var railHasLoaded = $("#WikiaRail .rail-module").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addCTABanner();
		}		
	},
 
	addCTABanner: function() {
		var	addBefore = $('#WikiaRail #wikia-recent-activity'), 
			bannerHTML = "<iframe width='100%' height='700' src='https://fandomrewards.typeform.com/to/y0NKRk'></iframe>";
		addBefore.before(bannerHTML);
	},
 
	init: function() {
		var thisObject = this;
		if (($.inArray(mw.config.get('wgNamespaceNumber'), this.config.loadOnNamespaces) > -1) && !mw.config.get('wgIsMainPage')) {
			this.checkRail = setInterval(function() { thisObject.addModules(); }, 750);
		}		
	}
}
 
$(function() {
	rightRailModules.init();
});

*/