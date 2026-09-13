/*
 * Inspired by "[[W:C:dev:MisspelledPage]]" on the Fandom Developers Wiki.
 * Originally created by Gguigui1, revised by Moonwatcher x Qibli.
 * It is available under the CC-BY-SA license.
 */

/*
 * Unlike the version on the Fandom Developers Wiki, this one calculates similarity based on the Levenshtein distance.
 */
;(function ($, mw) {
    'use strict';

    const wgPageName = mw.config.get('wgPageName');
    const similitudeThreshold = window.similitude || 55;

    function getLevenshteinDistance(s1, s2) {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    function calculateSimilarity(str1, str2) {
        const maxLen = Math.max(str1.length, str2.length);
        if (maxLen === 0) return 100;
        const minPossibleSimilarity = ((maxLen - Math.abs(str1.length - str2.length)) / maxLen) * 100;
        if (minPossibleSimilarity < similitudeThreshold) {
            return minPossibleSimilarity;
        }
        return ((maxLen - getLevenshteinDistance(str1, str2)) / maxLen) * 100;
    }

    function getColorBySimilarity(score) {
        if (score >= 90) return 'var(--theme-success-color)';
        if (score >= 80) return 'var(--theme-warning-color)';
        if (score >= 70) return 'dodgerblue';
        return 'var(--theme-page-text-color)';
    }

    function sortAndColorizePages($listContainer) {
        const $items = $listContainer.children('li');
        const itemsArray = [];
        $items.each(function () {
            const $el = $(this);
            const score = parseInt($el.attr('data-score'), 10) || 0;
            itemsArray.push({ $el, score });
        });
        itemsArray.sort((a, b) => b.score - a.score);
        const sortedElements = [];
        itemsArray.forEach(item => {
            item.$el.find('*').css('color', getColorBySimilarity(item.score));
            sortedElements.push(item.$el);
        });
        $listContainer.append(sortedElements);
    }

    function searchForPages() {
        new mw.Api().get({
            action: 'query',
            list: 'allpages',
            apfilterredir: 'nonredirects',
            apprefix: wgPageName.substring(0, 1),
            aplimit: 'max'
        }).done(function (data) {
            const pages = (data && data.query && data.query.allpages) || [];
            
            const wgPageNameNormalized = wgPageName.replace(/_/g, ' ').toLowerCase();
            
            const $noArticleBox = $('.noarticletext');
            let $listContainer = $noArticleBox.find('ul');
            let listHtmlBuffer = '';

            pages.forEach(page => {
                const loopPage = page.title;
                const loopPageNormalized = loopPage.toLowerCase();
                const similarity = calculateSimilarity(wgPageNameNormalized, loopPageNormalized);

                if (similarity >= similitudeThreshold) {
                    if (!$listContainer.length) {
                        $noArticleBox.find('p:last').remove();
                        $noArticleBox.append(
                            '<p style="font-size:130%; text-align:center;">Are you perhaps looking for one of these pages?</p>' +
                            '<ul style="list-style-type:circle;"></ul>' +
                            '<p></p>'
                        );
                        $listContainer = $noArticleBox.find('ul');
                    }
                    const safePage = mw.html.escape(loopPage);
                    const pageUrl = mw.util.getUrl(loopPage);
                    const roundedSimilarity = Math.round(similarity);
                    const labelText = safePage + ' (' + roundedSimilarity + '% similarity)';

                    listHtmlBuffer += '<li data-score="' + roundedSimilarity + '"><a href="' + pageUrl + '">' + labelText + '</a></li>';
                }
            });

            if (listHtmlBuffer) {
                $listContainer.append(listHtmlBuffer);
                sortAndColorizePages($listContainer);
            } else {
                console.log('[MisspelledPage] No page has reached the similarity threshold of ' + similitudeThreshold + '%.');
            }
        }).fail(function(err) {
            console.error('[MisspelledPage] Error in the API request:', err);
        });
    }

    $(function () {
        const hasNoArticleText = $('.noarticletext').length;
        const hasLogExcerpt = $('.mw-warning-with-logexcerpt').length;

        console.log('[MisspelledPage] Checking environment::', { hasNoArticleText, hasLogExcerpt, deletedToo: window.deletedToo });

        if (!hasNoArticleText || (hasLogExcerpt && !window.deletedToo)) {
            console.log('[MisspelledPage] Script interrupted: The page either does not contain the text box or has recent deletion records.');
            return;
        }

        mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(searchForPages);
    });

})(window.jQuery, window.mediaWiki);