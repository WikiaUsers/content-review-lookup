console.log('Equipment widget code start.');

// Loads up the logic of the Simulator Widget.
function loadWidget(widget) {
	
	// Here you initialize HTML / event listeners / etc. of your widget. The widget is a jQuery element of the <div>.
	
}

// Hook up to article page load, find all Simulator Widgets, and initialize them.
mw.hook("wikipage.content").add(function($content) {
	var widgets = $content.find('.EquipmentWidget');
	console.log('Equipment widget load test:', widgets);
	// Note: I am a bit fearful in case we need to change this HTML later on, as the JS will need re-approval then.
	// Hopefully the customization in our data source file, and CSS, will take care of most of this.
	widgets.html('<h1>-</h1><div class="row sim-main-screen"><form class="col-5 controls-holder"></form><div class="col-7 loot-summary-holder hidden"><h3>Results</h3><div class="grid"></div><p class="more-results-hidden">- more results not shown</p><div class="loot-card setheight-20 padding-ls"><div><div class="float-right graph-container" style="--title:\'Profit distribution\'"><canvas width="114" height="60"></canvas></div><span class="text-large loot-summary-average"><span class="text">Average profit</span>:<br/><span class="worth"></span></span><span class="text-info loot-summary-min"><span class="text">Minimum profit</span>: <span class="worth"></span></span><span class="text-info loot-summary-max"><span class="text">Maximum profit</span>: <span class="worth"></span></span></div><hr/><div><span class="text-large loot-summary-average-hour"><span class="text">Avg. profit / hour</span>:<br/><span class="worth"></span></span><span class="text-info loot-summary-min-hour"><span class="text">Min. profit / hour</span>: <span class="worth"></span></span><span class="text-info loot-summary-max-hour"><span class="text">Max. profit / hour</span>: <span class="worth"></span></span></div></div></div></div><div class="row sim-loot-inspect hidden"><div class="col-12"><div class="grid-auto-width"><span class="back-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM16 7L0.999999 7L0.999999 9L16 9L16 7Z" fill="var(--textcolor)"/></svg><span class="sim-loot-inspect-results">Results</span></span><h3 class="sim-loot-inspect-runloot">Run Loot</h3></div><div class="grid run-loot-grid"></div><div class="grid"><div class="loot-card grid-auto-width"><div class="loot-card-padding"><a href="#" target="__blank" title="Item name" class="tile-big float-right loot-run-worthmost-tile"><img /></a><span class="text-large loot-run-profit"><span class="text">Total profit</span>: <span class="worth"></span></span><span class="text-info loot-run-worthmost"><span class="text">Worth most</span>: <b>-</b> <span class="worth"></span></span></div></div></div></div></div><div class="row sim-processing-wait hidden"><div class="col-12"><div class="loader"><div class="loaderBar"></div></div><a class="btn btn-cancel">Cancel</a></div></div><div class="footer"><svg class="footer-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="var(--background)" d="M0,0 L100,0 L50,100 L0,0 z"></path></svg><span></span></div>');
	
	for (var i = 0; i < widgets.length; i++) {
		loadWidget($(widgets[i]));
	}
});