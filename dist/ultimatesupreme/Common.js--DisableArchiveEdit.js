/*jshint browser:true jquery:true smarttabs:true laxbreak:true */
/*global mediaWiki */

(function($, mw, config) {
"use strict";
var i18n = {
// English
en: {
archived: "Archived",
archivedTooltip: "This page is an archive and should not be edited."
}
};
// Configuration
config = $.extend({
archives: {
// Namespace number to Regex
// subpages starting with the word "Archive" in the user_talk namespace
3, 1: /\/[Aa]rchive[^\/]*$/
},
textColor: '#D9D9D9'
// messages: { langCode: {} }
}, config);

// Only run if configuration exists
var theTest = config.archives[mw.config.get('wgNamespaceNumber')];
if (theTest === void 0) {
return;
}

// Tests come in 2 flavours:
//  1) string: exact match
//  2) regex: apply
if (theTest instanceof RegExp) {
if (!theTest.test(mw.config.get('wgTitle'))) {
return;
}
} else {
/*jshint eqeqeq:false */
if (mw.config.get('wgTitle') != theTest) {
return;
}
/*jshint eqeqeq:true */
}

// i18n
// Do this here when we know we actually need the computation this involves.
// Only keep messages we want to use
config.messages = (function(msgs, lang) {
/*jshint forin:false */
var msgSet = {};
for (var m in msgs.en) {
msgSet[m] = (msgs[lang] && msgs[lang][m]) || msgs.en[m];
}
return msgSet;
})($.extend(true, i18n, config.messages), mw.config.get('wgUserLanguage'));
i18n = null;

// Run when the DOM is ready
$(function($) {
var $editLink;
if (mw.config.get('skin') === 'oasis') {
// Remove edit links whilst preserving Rename and Protect
$('li > a#ca-edit').parent().remove();
$editLink = $('a#ca-addsection');
} else {// Monobook
$('#ca-addsection').remove();
$editLink = $('#ca-edit a');
}
$editLink.removeAttr('href').prop('title', config.messages.archivedTooltip).text(config.messages.archived).css('color', config.textColor);

// Section editing links
$('.editsection').remove();
});

})(jQuery, mediaWiki, window.DisableArchiveEditJS);