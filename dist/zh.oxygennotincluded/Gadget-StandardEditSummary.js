window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
     select: 'MediaWiki:Custom-StandardEditSummaries',
};

// The options need to be set before the import! Otherwise they may not work.
mw.loader.load('https://dev.fandom.com/wiki/MediaWiki:Standard Edit Summary/code.js?action=raw&ctype=text/javascript');