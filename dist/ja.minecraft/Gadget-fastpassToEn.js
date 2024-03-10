/**
 * This script adds a link to an English page with the same name to the header
 * if the name of the page you're viewing uses only single-byte characters.
 * 
 * Author: otokoume
 */

$(function() {
    'use strict';

    var title           = mw.config.get('wgTitle');
    var namespace       = mw.config.get('wgCanonicalNamespace');
    var specialPagename = mw.config.get('wgCanonicalSpecialPageName');
    var uploadAutoFill  = mw.config.get('wgUploadAutoFill');
    var filledFilename  = $('#wpDestFile').val();
    var urlParams       = location.search;

    // Only run on pages that pagename is only alphanumeric characters
    if (!isSingleByteOnly(title) && !specialPagename) return;

    var encodedTitle = encodeURIComponent(title);
    var resultPagename;

    if (uploadAutoFill === false && isSingleByteOnly(filledFilename)) {
        resultPagename = 'File:' + filledFilename;
    } else if (specialPagename) {
        resultPagename = namespace + ':' + specialPagename;
    } else {
        resultPagename = (namespace ? namespace + ':' : '') + encodedTitle;
    }

    var html = genLinkHtml(resultPagename, '対応する英語版ページに移動', '英語版');

    if (urlParams) {
        var suffix                   = parseParamsList() || '';
        var resultPagenameWithParams = resultPagename + suffix;
        html += genLinkHtml(resultPagenameWithParams, '正確に対応する英語版ページに移動', '英語版 (A)');
    }

    // Rendering
    // For normal header
    $('.fandom-community-header')
        .find('.wds-tabs')
        .append(html);

    // For sticky header
    $('.fandom-sticky-header')
        .find('.wds-tabs')
        .find('.wds-dropdown')
        .not('.more-menu')
        .last()
        .after(html);

    /**
     * Check that the string contains only single-byte characters.
     * @param {string} str
     * @return {boolean}
     */
    function isSingleByteOnly(str) {
        return /^[\x01-\x7E]+$/.test(str);
    }

    function parseParamsList() {
        var paramsPos = urlParams.indexOf('?');
        var params    = urlParams.slice(paramsPos);

        if (paramsPos !== -1) return params;

        return null;
    }

    function genLinkHtml(pagename, title, label) {
        var link = '<a href="/wiki/' + pagename + '" title="' + title + '">' +
            '<span>' + label + '</span></a>';

        return [
            '<div>',
            '<div class="wds-tabs__tab-label first-level-item">',
            link,
            '</div>',
            '</div>'
        ].join('');
    }
});