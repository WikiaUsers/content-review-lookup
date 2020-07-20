/*
 * Load quick delete tools
 */
importScriptPage('FastDelete/code.js','dev');
var fdButtons = [];

/*
 * Add quick delete button for unused category
 */
if(wgCanonicalNamespace == "Category") {
	fdButtons[fdButtons.length] = {
		'summary': 'Deleting unused category as per [[Special:UnusedCategories]]',
		'label': 'Unused'
	};
}

/*
 * Add quick delete button for unused template
 */
if(wgCanonicalNamespace == "Template") {
	fdButtons[fdButtons.length] = {
		'summary': 'Deleting unused template as per [[Special:UnusedTemplates]]',
		'label': 'Unused'
	};
}

/*
 * Then load the rest of the quick delete buttons
 */

fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Spam|Spam]]',
  'label': 'Spam'
};

fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Vandalism|Vandalism]]',
  'label': 'Vandalism'
};

fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Clean-up'
};

fdButtons[fdButtons.length] = {
  'summary': 'Inappropriate content',
  'label': 'Content'
};