// <nowiki>
/*jshint browser:true jquery:true curly:false */
/*global mediaWiki */
 
(function (window, $, mw) {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName'
    ]);
    // Only run on Special:MultipleUpload
    if (
        config.wgCanonicalSpecialPageName !== 'MultipleUpload' ||
        window.FixMultipleUploadLoaded
    ) {
        return;
    }
    window.FixMultipleUploadLoaded = true;
    // NOTE: We're assuming a plain MultipleUpload. Custom MU with extra textareas will not behave intelligently
    function myInsertTags(start, end, inner /*, other*/ ) {
        $('#wpUploadDescription').textSelection('encapsulateSelection', {
            pre: start,
            post: end,
            peri: inner
        });
    }
    // We need the textSelection jQuery plug-in for this to work
    mw.loader.load('jquery.textSelection', null, true);
    mw.loader.using('jquery.textSelection', function () {
            window.insertTags = myInsertTags;
    });
})(window, jQuery, mediaWiki);