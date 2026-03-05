/**
 * Book Information Popup Module (English Version)
 * Extracts volume data from English volume tables and loads
 * Summary + Chapters from corresponding File pages.
 */
(function (global, $) {

    function setupBookInfoButtons() {
        var $tables = $('.volume-table.has-book-info');

        $tables.each(function () {
            var $table = $(this);
            var volumes = extractVolumeData($table);

            if (!volumes.length) {
                console.warn('No volume data found in table:', $table);
                return;
            }

            var $container = $('<div class="book-info-wrapper"></div>');
            var $button = $('<button>')
                .addClass('book-info-button cdx-button')
                .text('Show Details')
                .css('display', 'block');

            $table.before($container);
            $container.append($button);

            var popupContent = createPopupContent(volumes);

            var popup = PopupGenerator.createPopup({
                introText: $button,
                headerText: 'Volume Details',
                content: popupContent,
                appendTo: $container,
                mode: 'add'
            });

            popup.popupElement
                .find('.book-info-container')
                .data('volumes', volumes);

            setTimeout(function () {
                var $first = popup.popupElement.find('.volume-list-item:first');
                if ($first.length) {
                    $first.trigger('click');
                }
            }, 50);

            $container.data('popup-instance', popup);
        });
    }

    function createPopupContent(volumes) {
        var html = ['<div class="book-info-container">'];

        html.push('<div class="volume-list">');
        volumes.forEach(function (vol, index) {
            html.push(
                '<div class="volume-list-item" data-index="',
                index,
                '">',
                vol.name,
                '</div>'
            );
        });
        html.push('</div>');

        html.push(
            '<div class="volume-details">',
            '<div class="volume-details-content"></div>',
            '</div>',
            '</div>'
        );

        return html.join('');
    }

    function extractVolumeData($table) {
        var volumes = [];
        var $rows = $table.find('tr');

        var volumeRow = findRowByHeader($rows, 'Vol.');
        var coverRow = findRowByHeader($rows, 'Cover');
        var jpReleaseRow = findRowByHeader($rows, 'Japanese Release');
        var enReleaseRow = findRowByHeader($rows, 'English Release');
        var jpIsbnRow = findRowByHeader($rows, 'JP ISBN');
        var enIsbnRow = findRowByHeader($rows, 'EN ISBN');

        if (!volumeRow || !coverRow) {
            console.error('Required rows not found (Vol. or Cover).');
            return volumes;
        }

        $(volumeRow).find('td').each(function (index) {
            try {
                var $coverCell = $(coverRow).find('td').eq(index);
                var $jpReleaseCell = jpReleaseRow ? $(jpReleaseRow).find('td').eq(index) : null;
                var $enReleaseCell = enReleaseRow ? $(enReleaseRow).find('td').eq(index) : null;
                var $jpIsbnCell = jpIsbnRow ? $(jpIsbnRow).find('td').eq(index) : null;
                var $enIsbnCell = enIsbnRow ? $(enIsbnRow).find('td').eq(index) : null;

                volumes.push({
                    name: $(this).text().trim(),
                    coverHtml: fixLazyLoadedImages($coverCell.html()),
                    coverUrl: extractCoverUrl($coverCell),
                    jpRelease: $jpReleaseCell ? $jpReleaseCell.text().trim() : '—',
                    enRelease: $enReleaseCell ? $enReleaseCell.text().trim() : '—',
                    jpISBN: $jpIsbnCell ? $jpIsbnCell.text().trim() : '—',
                    enISBN: $enIsbnCell ? $enIsbnCell.text().trim() : '—'
                });

            } catch (e) {
                console.error('Error extracting volume data:', e);
            }
        });

        return volumes;
    }

    function fixLazyLoadedImages(html) {
    if (!html) return html;

    var $temp = $('<div>').html(html);

    $temp.find('img').each(function () {
        var $img = $(this);

        // Grab data-src or data-srcset if present
        var dataSrc = $img.attr('data-src') || $img.attr('data-srcset');

        if (dataSrc) {
            $img.attr('src', dataSrc)           // force actual src load
                .removeAttr('data-src')         // remove lazyload attribute
                .removeAttr('data-srcset')     // remove srcset if used
                .removeClass('lazyload')        // remove lazyload class
                .css({
                    opacity: 1,                 // make visible
                    display: 'block'            // force block display
                });
        }
    });

    return $temp.html();
}

    function extractCoverUrl($cell) {
        try {
            var $img = $cell.find('img');
            if ($img.length) {
                return $img.attr('data-src') || $img.attr('src') || '';
            }
            return '';
        } catch (e) {
            console.error('Error extracting cover URL:', e);
            return '';
        }
    }

    function findRowByHeader($rows, headerText) {
        var found = null;

        $rows.each(function () {
            var $headerCell = $(this).find('th:first');
            if ($headerCell.length && $headerCell.text().trim() === headerText) {
                found = this;
                return false;
            }
        });

        return found;
    }

    function loadVolumeDetails(volume, $detailsContainer) {
    if (!$detailsContainer.length) return;

    $detailsContainer.empty().html('<div class="book-info-loading">Loading...</div>');

    var imageName = extractImageName(volume.coverUrl);
    var isPlaceholder = !imageName;

    // Fallback to placeholder if no image name
    if (isPlaceholder) {
        imageName = 'Placeholder Poster.png';  // your wiki's placeholder file
    }

    // Build HTML - always show table data, use placeholder cover if needed
    var coverSrc = isPlaceholder 
        ? 'https://static.wikia.nocookie.net/yuripedia/images/0/09/Placeholder_Poster.png/revision/latest?cb=20260207031906'
        : volume.coverUrl;

    var detailsHtml = [
        '<div class="volume-detail">',
        '<div class="volume-cover">',
        '<img src="' + coverSrc + '" alt="' + (isPlaceholder ? 'Placeholder' : volume.name) + '" style="width:200px; height:auto;">',
        '</div>',
        '<h3 class="volume-title">', volume.name, '</h3>',
        '<div class="volume-jp-release"><strong>Japanese Release:</strong> ', volume.jpRelease || '—', '</div>',
        '<div class="volume-en-release"><strong>English Release:</strong> ', volume.enRelease || '—', '</div>',
        '<div class="volume-jp-isbn"><strong>JP ISBN:</strong> ', volume.jpISBN || '—', '</div>',
        '<div class="volume-en-isbn"><strong>EN ISBN:</strong> ', volume.enISBN || '—', '</div>',
        '<div class="volume-summary">',
        '<span>Summary</span>',
        '<div class="summary-content book-info-loading-content">Loading...</div>',
        '</div>',
        '<div class="volume-chapters">',
        '<div class="chapters-content book-info-loading-content">Loading...</div>',
        '</div>',
        '</div>'
    ].join('');

    $detailsContainer.html(detailsHtml);

    // Always try to load Summary + Chapters if there's an image name (real or placeholder)
    if (imageName) {
        mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util'], function () {
            loadPageSection('File:' + imageName, 'Summary', $detailsContainer.find('.summary-content'));
            loadPageSection('File:' + imageName, 'Chapters', $detailsContainer.find('.chapters-content'));
        });
    } else {
        $detailsContainer.find('.summary-content').html('<em>(Summary not available)</em>');
        $detailsContainer.find('.chapters-content').html('<em>(Chapters not available)</em>');
    }
}

    function extractImageName(url) {
        if (!url) return '';
        var match = url.match(/[^\/]+\.(jpg|png|jpeg|gif)/i);
        return match ? decodeURIComponent(match[0]) : '';
    }

    function loadPageSection(pageTitle, sectionTitle, $container) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                page: pageTitle,
                prop: 'sections',
                format: 'json'
            },
            dataType: 'json',
            success: function (data) {
                if (!data.parse || !data.parse.sections) {
                    $container.html('<div class="book-info-error">Failed to load page data.</div>');
                    return;
                }

                var target = data.parse.sections.find(function (sec) {
                    return sec.line === sectionTitle;
                });

                if (!target) {
                    $container.html('<div class="book-info-no-content">Section "' + sectionTitle + '" not found.</div>');
                    return;
                }

                loadSectionContent(pageTitle, target.index, $container);
            },
            error: function () {
                $container.html('<div class="book-info-error">Failed to load section.</div>');
            }
        });
    }

    function loadSectionContent(pageTitle, sectionIndex, $container) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                page: pageTitle,
                section: sectionIndex,
                prop: 'text',
                format: 'json'
            },
            dataType: 'json',
            success: function (data) {
                if (data.parse && data.parse.text && data.parse.text['*']) {
                    $container.html(fixLazyLoadedImages(data.parse.text['*']));
                    if (typeof $.fn.makeCollapsible === 'function') {
                        $container.find('.mw-collapsible').makeCollapsible();
                    }
                } else {
                    $container.html('<div class="book-info-no-content">No content available.</div>');
                }
            },
            error: function () {
                $container.html('<div class="book-info-error">Failed to load content.</div>');
            }
        });
    }

    function init() {
        $(function () {
            setupBookInfoButtons();

            $(document).on('click', '.volume-list-item', function () {
                var $this = $(this);
                var $container = $this.closest('.book-info-container');
                var volumes = $container.data('volumes');
                var index = $this.data('index');

                if (volumes && volumes[index]) {
                    $this.addClass('active').siblings().removeClass('active');
                    loadVolumeDetails(volumes[index], $container.find('.volume-details-content'));
                }
            });
        });
    }

    global.BookInfoPopup = global.BookInfoPopup || { init: init };

    init();

})(window, jQuery);