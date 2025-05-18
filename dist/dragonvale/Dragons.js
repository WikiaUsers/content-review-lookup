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

		var dataMap = {};
		var dataset = $infoboxDiv[0].dataset;
		for (var key in dataset) {
			if (dataset.hasOwnProperty(key)) {
				dataMap[key] = dataset[key];
			}
		}

		var unnamedArgs = [], namedArgs = dataMap || {};
		return updateModuleInvocation(`${infoboxType}box`, 'create', unnamedArgs, namedArgs).then(html=>{
			$infoboxDiv.html(html);
		});
	}

	function generateModuleInvocation(moduleName, functionName, unnamedArgs, namedArgs) {
		unnamedArgs = unnamedArgs || [];
		namedArgs = namedArgs || {};

		var unnamedArgsString = unnamedArgs.map(function (arg) {
			return arg || '';
		}).join('|');

		var namedArgsString = Object.keys(namedArgs).map(function (key) {
			return key + '=' + (namedArgs[key] || '');
		}).join('|');

		var luaInvocation = '{{#invoke:' + moduleName + '|' + functionName +
			(unnamedArgsString ? '|' + unnamedArgsString : '') +
			(namedArgsString ? '|' + namedArgsString : '') + '}}';

		return luaInvocation;
	}

	function invokeModule(invocation) {
		return $.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				action: 'parse',
				format: 'json',
				text: invocation,
				prop: 'text'
			},
			dataType: 'json'
		});
	}

	function updateModuleInvocation(module, functionName, unnamedArgs, namedArgs) {
		var invocation = generateModuleInvocation(module, functionName, unnamedArgs, namedArgs);

		return invokeModule(invocation).then(data => data.parse.text['*']);
	}

	function initializeWhenDivIsReady(id) {
		return new Promise(resolve => {
			const existing = document.getElementById(id);
			if (existing) return resolve(existing);

			const observer = new MutationObserver((_, observerInstance) => {
				const element = document.getElementById(id);
				if (element) {
					observerInstance.disconnect();
					resolve(element);
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}

	mw.loader.using('mediawiki.api', function () {
        mw.hook('wikipage.content').add(function ($content) {
			const loaderElements = document.querySelectorAll('[id$="-infobox-loader"]');
			const readyPromises = Array.from(loaderElements).map(loaderElement =>
				initializeWhenDivIsReady(loaderElement.id).then(() => initializeInfobox(loaderElement))
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