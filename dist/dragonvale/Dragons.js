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

;
$(document).ready(function () {
	function initializeInfobox(loader) {
		var $infoboxDiv = $(loader);
		if ($infoboxDiv.length === 0) return;

		loader.classList.remove('infobox-invalid');
		loader.classList.add('infobox-valid');
		var infoboxType = loader.id.replace('-infobox-loader', '');

		return ModuleInject.invokeModule(
			`${infoboxType}box`,
			'create',
			[],
			ModuleInject.collectNamedArgs($infoboxDiv[0])
		).then(html => {
			$infoboxDiv.html(html);
		});
	}

	mw.loader.using('mediawiki.api', function () {
        mw.hook('wikipage.content').add(function ($content) {
			const loaderElements = document.querySelectorAll('[id$="-infobox-loader"]');
			const readyPromises = Array.from(loaderElements).map(loaderElement =>
				ModuleInject.waitForElement('#'+loaderElement.id).then(() => initializeInfobox(loaderElement))
			);

			Promise.all(readyPromises).then(() => {
				if (typeof window.initializeToggler === 'function') {
					window.initializeToggler();
				}

                if (typeof window.initializeCountdown === 'function') {
                    window.initializeCountdown($content);
                }
			});
		});
	});
});