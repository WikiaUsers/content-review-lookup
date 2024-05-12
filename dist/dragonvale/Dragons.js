$(function () {
	
	function createToggleSymbolsButton(id, selector) {
		if ($('#'+id).length) {
	        var button = document.createElement("button");
	        button.textContent = "Hide Symbols";
	        
	        button.addEventListener("click", function() {
	            document.querySelectorAll(selector).forEach(function(element) {
	                element.classList.toggle('hide-symbols');
	            });
	            
	            if (button.textContent === "Hide Symbols") {
	                button.textContent = "Show Symbols";
	            } else {
	                button.textContent = "Hide Symbols";
	            }
	        });
	            
	        document.getElementById(id).appendChild(button);
    	}
	}
	
	createToggleSymbolsButton('hide-dragonarium-rarity-symbols-btn', '.dragonarium-rarity');
	createToggleSymbolsButton('hide-release-calendar-symbols-btn', '.calendar-item')
});