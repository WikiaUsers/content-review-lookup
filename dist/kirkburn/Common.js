/* Any JavaScript here will be loaded for all users on every page load. */

if ($("#mw-upload-form").size() || mw.util.getParamValue('DragDrop')) {
    importScriptPage('MediaWiki:Common.js/DragDropUploader.js');
}

console.log('Wikia.js : 2');