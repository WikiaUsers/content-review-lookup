console.log('[Common.js]: Loaded')

/* Any JavaScript here will be loaded for all users on every page load. */
function loadTabs(){
	const tabs = document.getElementById('tabs')
	
	// Store as array.
	const panes = [...document.getElementById('tab-panes').children]
	
	function selectTab(){
		// e.g.  Main Characters -> main-characters
		const name = this.innerText.toLowerCase().replace(' ','-')
		// Search the panes for a match (e.g. <div data-name="main-characters">).
		const el = panes.find(_ => _.dataset.name === name)
		
		if(el){
			// Hide the previous tab and show the new one.
			document.querySelector('#tab-panes .visible').removeAttribute('class')
			el.className = "visible"
		}
	}
	
	// Add click event to the tab buttons.
	for(const tab of tabs.children){
		tab.onclick = selectTab;
	}
	console.log('[Common.js]: Tabs loaded.')
}
$(loadTabs)