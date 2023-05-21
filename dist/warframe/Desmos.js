/**
 * Importing code and stylesheets for embedding interactive graphs using Desmos API.
 * Documentation on library: https://www.desmos.com/api/v1.6/docs/index.html#document-quickstart
 * 
 * TODO: Calculator script doesn't run on [[Void Relic/Math]] even though elements were added. I assume
 * this has to do with load priority and since DOM is fully loaded by the time the calculator elements are added,
 * the relevant scripts doesn't fire.
 */
(function() {
	// TODO: Use latest API (v1.8)
	const API_KEY = "dcb31709b452b1cf9dc26972add0fda6";	// Using public demonstration API key for non-commercial use
	const DESMOS_API = "https://www.desmos.com/api/v1.6/calculator.js?apiKey=" + API_KEY;
	const ENDPOINT = new URL(DESMOS_API);
	const DIV_ID = "desmos-calculator";	// Wrapper div element for interactive Desmos graphs
	const CURRENT_PAGE_NAME = mw.config.get("wgPageName");
	
	if (document.getElementById(DIV_ID)) {
		var scriptTag = document.createElement("script");
		scriptTag.src = ENDPOINT.toString();
		scriptTag.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(scriptTag);
		
		var graphTag = document.createElement("script");
		graphTag.type = "text/javascript";
		graphTag.defer = true;
		
		var graphId, graphLatex;
		
		switch(CURRENT_PAGE_NAME) {
			case "Void_Relic/Math":
				graphId = "void-relic";
				// Geometric distribution of the number of runs by a full 4-player squad 
				// with the Radiant relics before seeing at least one rare drop rolled
				graphLatex = "f(x)=0.3439(1 - 0.3439)^{x-1}";
				break;
			case "Enemy_Level_Scaling":
				// TODO: Add enemy level scaling equations
				graphId = "enemy-level-scaling";
				graphLatex = "";
				break;
			default:
				graphId = "default-graph";
				graphLatex = "y=x^2";
		}
		
		graphTag.innerHTML = 'var elt = document.getElementById("' + DIV_ID +'");';
		graphTag.innerHTML += 'var calculator = Desmos.GraphingCalculator(elt);';
		graphTag.innerHTML += 'calculator.setExpression({ id: "' + graphId + '", latex: "' + graphLatex + '" });';

		document.getElementsByTagName("body")[0].appendChild(graphTag);
	}
})();