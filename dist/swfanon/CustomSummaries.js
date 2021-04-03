/**
 * Brutally simple standard edit summaries for Oasis wide editor
 * No jQuery fanciness, no glitter.
 */
(function (mw) {
	'use strict';
	var config = mw.config;
	
	/**
	 * Apply user-selected edit summary
	 * @param {Object} event
	 */
	function fillSummary(event) {
		document.getElementById('wpSummary').value = event.target.textContent;
	}
	
	/**
	 * Parse summary data and show the list once done
	 */
	function showStdSummaries() {
		var rawData = this.responseText.split('\n'),
			list = document.getElementById('custom-edit-summaries');
		for (var i = 0; i < rawData.length; i++) {
			if (rawData[i].indexOf('--') === 0) {
				var summary = document.createElement('li');
				summary.textContent = rawData[i].substring(2).trim();
				summary.addEventListener('click', fillSummary);
				list.appendChild(summary);
			}
		}
		list.style.display = 'block';
		list.style.left = (0 - (list.offsetWidth + 8)).toString() + 'px';
		list[Symbol.for('summaryListState')] = 'open';
		list[Symbol.for('summaryListLoaded')] = 'yes';
	}

	/**
	 * Show/hide the summary list, and load it if it hasn't been loaded yet
	 * @param {Object} event
	 */
	function init(event) {
		var list = document.getElementById('custom-edit-summaries'),
			stateKey = Symbol.for('summaryListState');
		if (list[stateKey] != 'open') {
			if (list[Symbol.for('summaryListLoaded')] != 'yes') {
				var xhr = new XMLHttpRequest();
				xhr.onload = showStdSummaries.bind(xhr);
				xhr.open('GET', config.get('wgServer') + '/index.php?action=raw&title=Template:Stdsummaries&ctype=text/css');
				xhr.send();
			} else {
				list.style.display = 'block';
				list[stateKey] = 'open';
			}
		} else {
			list.style.display = 'none';
			list[stateKey] = 'closed';
		}
	}
	if (config.get('wgAction') === 'edit') {
		importArticle({ type: 'style', article: 'MediaWiki:CustomSummaries.css' });
		var img = document.createElement('img');
		img.id='custom-edit-summaries-button';
		img.src = 'https://storage.googleapis.com/material-icons/external-assets/v1/icons/svg/ic_list_black_24px.svg';
		img.addEventListener('click', init);

		var ul = document.createElement('ul');
		ul.id='custom-edit-summaries';

		var parent = document.getElementById('wpSummaryLabel');
		parent.insertBefore(img, parent.firstChild);
		parent.insertBefore(ul, parent.firstChild);
	}
}(mediaWiki));