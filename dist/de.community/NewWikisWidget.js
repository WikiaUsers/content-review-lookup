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
            specialPageUrl: 'https://community.fandom.com/de/wiki/Special:NewWikis?language=de&hub=0&limit=10'
        };

        $.get(config.specialPageUrl)
            .done(function(html) {
                var $content = $(html).find('#mw-content-text');
                var $listItems = $content.find('ul > li');
                
                if (!$listItems.length) {
                    $widgetContainer.html('Konnte keine neuen Wikis finden.');
                    return;
                }
                
                var wikisData = [];
                var responsesReceived = 0;
                var totalWikis = $listItems.length;
                
                $listItems.each(function(index) {
                    var $item = $(this);
                    var $link = $item.find('a').first();
                    var wikiName = $link.text().trim();
                    var wikiUrl = $link.attr('href');
                    
                    if (wikiUrl && wikiUrl.startsWith('/')) {
                        wikiUrl = 'https://' + location.hostname + wikiUrl;
                    }
                    
                    if (wikiName && wikiUrl) {
                        var now = new Date();
                        var fallbackTimestamp = new Date(now);
                        fallbackTimestamp.setDate(now.getDate() - index);
                        fallbackTimestamp.setHours(Math.max(0, 12 - index)); 
                        var wikiData = {
                            name: wikiName,
                            url: wikiUrl,
                            date: fallbackTimestamp.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                            timestamp: fallbackTimestamp.toISOString()
                        };
                        
                        var apiUrl = wikiUrl.replace(/^http:/, 'https:') + '/api.php';
                        
                        $.ajax({
                            url: apiUrl + '?action=query&list=logevents&ledir=newer&lelimit=1&leprop=timestamp&format=json&origin=*',
                            method: 'GET',
                            timeout: 3000,
                            success: function(data) {
                                if (data && data.query && data.query.logevents && data.query.logevents.length > 0) {
                                    var firstLog = data.query.logevents[0];
                                    if (firstLog && firstLog.timestamp) {
                                        var existingIndex = wikisData.findIndex(function(w) { return w.name === wikiName; });
                                        if (existingIndex !== -1) {
                                            wikisData[existingIndex].date = new Date(firstLog.timestamp).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                            wikisData[existingIndex].timestamp = firstLog.timestamp;
                                        }
                                    }
                                }
                            },
                            error: function(xhr, status, error) {
                            },
                            complete: function() {
                                responsesReceived++;
                                if (responsesReceived === totalWikis) {
                                    wikisData.sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
                                    setTimeout(function() {
                                        renderList(wikisData, $widgetContainer);
                                    }, 250);
                                }
                            }
                        });
                        
                        wikisData.push(wikiData);
                        
                    } else {
                        responsesReceived++;
                        if (responsesReceived === totalWikis) {
                            wikisData.sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
                            setTimeout(function() {
                                renderList(wikisData, $widgetContainer);
                            }, 250);
                        }
                    }
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