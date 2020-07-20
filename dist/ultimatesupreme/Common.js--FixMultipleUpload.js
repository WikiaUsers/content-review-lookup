/*jshint browser:true jquery:true curly:false */
/*global mediaWiki */

// Only run on Special:MultipleUpload
// NOTE: mw.config is a module but is currently part of the core. It makes little sense for it
//to NOT be available (or for it to be a module, but whatever).
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload')
(function(window, $, mw) {
"use strict";

// NOTE: We're assuming a plain MultipleUpload. Custom MU with extra textareas will not behave
//intelligently
function myInsertTags(start, end, inner/*, other*/) {
$('#wpUploadDescription').textSelection('encapsulateSelection', {pre:start, post:end, peri:inner});
}

// We need the textSelection jQuery plug-in for this to work
mw.loader.using('jquery.textSelection', function() {
window.insertTags = myInsertTags;
});
})(window, jQuery, mediaWiki);