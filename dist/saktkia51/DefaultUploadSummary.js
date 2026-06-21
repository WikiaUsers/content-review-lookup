// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:DefaultUploadSummary.js
// Supports https://dev.fandom.com/wiki/MultiUpload
{
	const toolName = 'Default Upload Summary';
	if (mw.config.get('wgPageName') === 'Special:Upload' && !document.getElementById('DefaultUploadSummary')) {
		console.log(`[${toolName}] [LOG]: Current page is 'Special:Upload'. Running script...`);
		const origPerformance = performance.now();
		
		const uploadText = document.getElementById("uploadtext");
		const mainContainer = create('div', uploadText);
		mainContainer.setAttribute('id', "DefaultUploadSummary");
		const baseElem = create('div', mainContainer);
		const input = create('textarea', baseElem);
		const updateSummary = create('button', mainContainer);
		updateSummary.innerHTML = 'Update summaries';
		input.setAttribute('style', "width:50%");
		input.setAttribute('rows', '8');
		input.setAttribute('cols', '40');
		mainContainer.insertAdjacentHTML('afterbegin', "Input custom summary, applying to all files being uploaded:");
		
		let summaryText = '[[' + "Category:Unsorted files]]";
		function addDefaultSummary() {
			const e = document.querySelectorAll("*[id^='wpUploadDescription']");
			e.forEach(function(elem) {
				elem.value = summaryText.toString();
			});
		};
		
		// Due to load order differences between site and personal JS, the usage of looped intervals are used here to ensure an event listener is added to the proper file input.
		// Delay is reasonable to have minimal performance impact. The code safely ignores the lack of the MultiUpload script, while accommodating users who choose to use said personal-only script.
		function createInterval(searchingID, intervalName, delay = 200, msCap = 120e3) {
			intervalName ??= `Interval${Object.keys(intervals).length + 1}`;
			intervals[intervalName] = setInterval(function() {
				const elem = document.getElementById(searchingID);
				if (elem) {
					elem.addEventListener('change', addDefaultSummary);
					console.log(`[${toolName}] [LOG]: Successfully found element ID ${searchingID}.`);
				};
				if (performance.now() - origPerformance >= msCap || elem) {
					clearInterval(intervals[intervalName]);
				};
			}, delay);
		};
		const intervals = {};
		createInterval('wpUploadFile', 'upload');
		createInterval('multiupload', 'multiupload');
		
		input.value = summaryText;
		addDefaultSummary();
		
		input.addEventListener('input', function() {
			summaryText = this.value;
		});
		updateSummary.addEventListener('click', addDefaultSummary);
	} else {
		console.log(`[${toolName}] [LOG]: Script activation conditions not met. Exiting...`);
	};
};