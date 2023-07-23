;(function(mw) {
	'use strict';
	console.log("loaded");
	
	function init() {
		console.log("init");
		
		var armorSearch = document.getElementById('conan-armor-search')
		if(!armorSearch) return;
		
		console.log("start")
		
		var container = document.createElement('div')
		container.id = 'container-armor-search'
		container.innerHTML =	
			'<form id="armor-search">' +
			'  <label for="name">Name:<input name="name" id="name" maxlength="30"></label>' +
			'  <label for="grade">Grade:' +
			'  <select name="grade" id="grade">' +
			'    <option></option>' +
			'    <option>Light</option>' +
			'    <option>Medium</option>' +
			'    <option>Heavy</option>' +
			'  </select></label>' +
			'  <button>Search</button>'
			'</form>'
		
		armorSearch.append(container)
		
		console.log("end")
	}

	// Execute script after page is loaded
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);