const GameData = (() => {
	async function apiGet(params) {
		const url = mw.util.wikiScript("api") + "?" + new URLSearchParams(params);
		const res = await fetch(url);
		
		return res.json();
	}
	
	async function getPageContent(title) {
		
	}
	
	function parseTemplateArgs(content) {
		
	}
	
	async function getTemplateData(templateName) {
		
	}
	
	
	
	async function getShip(shipName) {
		
	}
	
	
	
	async function getItem(itemName) {
		
	}
})();

window.GameData = GameData