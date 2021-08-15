$(function() {
    'use strict';

    var title           = mw.config.get('wgTitle');
    var namespace       = mw.config.get('wgCanonicalNamespace');
    var specialPagename = mw.config.get('wgCanonicalSpecialPageName');
    var uploadAutoFill  = mw.config.get('wgUploadAutoFill');
    var filledFilename  = $('#wpDestFile').val();
    var urlParamas      = location.search;

    // Only run on pages that pagename is only alphanumeric characters
    if (!/^[\x01-\x7E]+$/.test(title) && !specialPagename) return;

    var isFandomDesktop = mw.config.get('skin') === 'fandomdesktop';

    var encodedTitle = encodeURIComponent(title);
    var resultPagename;

    if (uploadAutoFill === false && /^[\x01-\x7E]+$/.test(filledFilename)) {
        resultPagename = 'File:' + filledFilename;
    } else if (specialPagename) {
        resultPagename = namespace + ':' + specialPagename;
    } else {
        resultPagename = (namespace ? namespace + ':' : '') + encodedTitle;
    }

    var html = genLinkHtml(resultPagename, '対応する英語版ページに移動', '英語版');

    if (urlParamas) {
        var suffix                   = parseParamsList() || '';
        var resultPagenameWithParams = resultPagename + suffix;
        html += genLinkHtml(resultPagenameWithParams, '正確に対応する英語版ページに移動', '英語版 (A)');
    }

    // Rendering
    if (isFandomDesktop) {
        // For normal header
        $('.fandom-community-header')
            .find('.wds-tabs.extra-large-navigation')
            .append(html);

        // For sticky header
        $('.fandom-sticky-header')
            .find('.wds-tabs.large-navigation')
            .find('.wds-dropdown')
            .not('.more-menu')
            .last()
            .after(html);
    } else {
        $('#left-navigation ul').append(html);
    }

    function parseParamsList() {
        var paramsPos = urlParamas.indexOf('?');
        var params    = urlParamas.slice(paramsPos);

        if (paramsPos !== -1) return params;

        return null;
    }

    function genLinkHtml(pagename, title, label) {
        var link = '<a href="/wiki/' + pagename + '" title="' + title + '">';

        if (isFandomDesktop) {
            link += '<span>' + label + '</span></a>';

            return [
                '<div>',
                '<div class="wds-tabs__tab-label first-level-item">',
                link,
                '</div>',
                '</div>'
            ].join('');
        }

        link += label + '</a>';

        return [
            '<li id="ca-englishlink">',
            '<span>',
            link,
            '</span>',
            '</li>'
        ].join('');
    }
});