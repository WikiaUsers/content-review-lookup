/**
 * Widget to display the latest German wikis.
 *
 * This script fetches and parses the list of new wikis from [[Special:NewWikis]].
 * For each wiki, it then queries its API to get the exact creation date from
 * the timestamp of the first revision (rev-id 1).
 *
 * The final list is sorted by date (newest first) and grouped into "Today"
 * and "Older Wikis". The script is also configured to only run on a specific set of pages.
 */
(function($) {

    var allowedPages = [
        'Vorlage:NewWikisWidget'
    ];

    var isMainPage = mw.config.get('wgIsMainPage');
    var currentPageName = mw.config.get('wgPageName');

    if (!isMainPage && allowedPages.indexOf(currentPageName) === -1) {
        return;
    }

    function waitForElement(selector, callback) {
        var attempts = 0;
        var maxAttempts = 100;
        var interval = setInterval(function() {
            var $element = $(selector);
            if ($element.length) {
                clearInterval(interval);
                callback($element);
            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }
        }, 100);
    }

    function renderSkeleton($container) {
        var skeletonHTML = `
            <div class="skeleton-wrapper">
                <div class="skeleton-line skeleton-heading"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line skeleton-heading"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
            </div>
        `;
        $container.html(skeletonHTML);
    }

    function runWidgetLogic($widgetContainer) {
        if ($widgetContainer.data('initialized')) {
            return;
        }
        $widgetContainer.data('initialized', true);

        renderSkeleton($widgetContainer);

        var config = {
            specialPageUrl: 'https://community.fandom.com/de/Special:NewWikis?language=de&hub=0&limit=10',
            apiEndpoint: '/api.php?action=query&prop=revisions&revids=1&format=json&origin=*'
        };

        $.get(config.specialPageUrl)
            .done(function(html) {
                var $links = $(html).find('#mw-content-text ul > li > a');
                if (!$links.length) {
                    $widgetContainer.html('Konnte keine neuen Wikis finden.');
                    return;
                }
                var wikisData = [];
                var responsesReceived = 0;
                $links.each(function() {
                    var wikiName = $(this).text();
                    var wikiUrl = $(this).attr('href');
                    if (wikiUrl.startsWith('/')) {
                        wikiUrl = 'https://' + location.hostname + wikiUrl;
                    }
                    $.ajax({
                        url: wikiUrl + config.apiEndpoint,
                        success: function(data) {
                            var pages = data.query.pages;
                            var pageId = Object.keys(pages)[0];
                            if (pageId && pages[pageId].revisions && pages[pageId].revisions[0].timestamp) {
                                var timestamp = pages[pageId].revisions[0].timestamp;
                                wikisData.push({
                                    name: wikiName,
                                    url: wikiUrl,
                                    date: new Date(timestamp).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                                    timestamp: timestamp
                                });
                            }
                        },
                        error: function() { console.log('New Wikis Widget: Fehler bei ' + wikiName); },
                        complete: function() {
                            responsesReceived++;
                            if (responsesReceived === $links.length) {
                                setTimeout(function() {
                                    renderList(wikisData, $widgetContainer);
                                }, 250); // 250ms Verzögerung
                            }
                        }
                    });
                });
            })
            .fail(function() {
                $widgetContainer.html('Fehler: Liste konnte nicht geladen werden.');
            });
    }

    function renderList(data, $widgetContainer) {
        if (!data.length) {
            $widgetContainer.html('Keine Wiki-Daten abrufbar.');
            return;
        }
        data.sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var todayWikis = data.filter(function(wiki) {
            var wikiDate = new Date(wiki.timestamp);
            wikiDate.setHours(0, 0, 0, 0);
            return wikiDate.getTime() === today.getTime();
        });
        var olderWikis = data.filter(function(wiki) {
            var wikiDate = new Date(wiki.timestamp);
            wikiDate.setHours(0, 0, 0, 0);
            return wikiDate.getTime() < today.getTime();
        });
        $widgetContainer.empty();
        var createListGroup = function(title, wikis) {
            if (wikis.length > 0) {
                $widgetContainer.append($('<h3>').text(title));
                var $ul = $('<ul>', { 'class': 'new-wikis-list' });
                wikis.forEach(function(wiki) {
                    var $li = $('<li>');
                    var $link = $('<a>', { href: wiki.url, text: wiki.name, target: '_blank' });
                    $li.append($link).append(' <small>(' + wiki.date + ')</small>');
                    $ul.append($li);
                });
                $widgetContainer.append($ul);
            }
        };
        createListGroup('Heute erstellt', todayWikis);
        createListGroup('Ältere Wikis', olderWikis);
    }

    waitForElement('#new-wikis-widget', runWidgetLogic);

})(jQuery);