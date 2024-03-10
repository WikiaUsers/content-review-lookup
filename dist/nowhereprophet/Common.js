/* COLLAPSIBLE LISTS FOR WALK-THROUGHS */
/* Hide sublists at page generation */
$("div.walkthrough dd").hide();

/* Add collapsible styling to dt */
$("div.walkthrough dd").prev("dt").addClass("collapsible-wt");

/* Add "toggle all" button at the top */
$( "<button class='wt-toggall'>(Toggle all paths)</button>" ).insertBefore( "div.walkthrough > dl:first-of-type" );

/* Toggle each dd’s display onClick */
$(".walkthrough dt").click(function() {
	$(this).next('dd').toggle();
});

/* Toggle all onClick */
$("button.wt-toggall").click(function() {
	$(this).parent('div.walkthrough').find('dd').toggle();
});
/* END COLLAPSIBLE LISTS FOR WALK-THROUGHS */