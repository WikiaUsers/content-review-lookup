// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:DefaultUploadSummary.js
// Supports https://dev.fandom.com/wiki/MultiUpload
{
	if (mw.config.get('wgPageName') === 'Special:Upload' && !document.getElementById('DefaultUploadSummary')) {
		console.log("[Default Upload Summary] [LOG]: Current page is 'Special:Upload'. Running script.");
		
		const uploadText = document.getElementById("uploadtext");
		const container = uploadText.appendChild(document.createElement('div'));
		container.setAttribute('id', "DefaultUploadSummary");
		const baseElem = container.appendChild(document.createElement("div"));
		const input = baseElem.appendChild(document.createElement("textarea"));
		const updateSummary = container.appendChild(document.createElement('button'));
		updateSummary.innerHTML = 'Update summaries';
		input.setAttribute("style", "width:50%");
		input.setAttribute("rows", "8");
		input.setAttribute("cols", "40");
		container.insertAdjacentHTML("afterbegin", "Input custom summary, applying to all files being uploaded:");
		
		let summaryText = "[[Category:Unsorted files]]";
		function addDefaultSummary() {
			const theseElems = [...document.querySelectorAll("*[id^='wpUploadDescription']")];
			theseElems.forEach(function(elem) {
				elem.value = summaryText.toString();
			});
		}
		
		const uploadButton = document.getElementById('multiupload') || document.getElementById('wpUploadFile');
		if (uploadButton) {
			uploadButton.addEventListener('change', addDefaultSummary);
		}
		
		input.value = summaryText;
		addDefaultSummary();
		
		input.addEventListener('input', function() {
			summaryText = this.value;
		});
		updateSummary.addEventListener('click', addDefaultSummary);
	} else {
		console.log("[Default Upload Summary] [LOG]: Script activation conditions not met. Exiting...");
	}
}