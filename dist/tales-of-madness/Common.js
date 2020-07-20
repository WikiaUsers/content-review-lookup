/* Any JavaScript here will be loaded for all users on every page load. */

if (wgNamespaceNumber==6 && wgAction=='view') {
	mw.loader.load('//tools.wmflabs.org/imagemapedit/ime.js');
}