/**
 * Book information popup module
 * Adapted for English wiki volume tables
 * 
 * REQUIRED TABLE STRUCTURE:
 * - Table class: "volume-table has-book-info"
 * - Row headers (exact text):
 *   • "Vol."
 *   • "Cover"
 *   • "Japanese Release"
 * 
 * REQUIRED FILE PAGE SECTIONS:
 * - == Synopsis ==
 * - == Chapters ==
 */
(function (global, $) {

    function setupBookInfoButtons() {
        var $volumeTables = $('.volume-table.has-book-info');

        $volumeTables.each(function () {
            var $table = $(this);
            var volumes = extractVolumeData($table);

            if (!volumes.length) {
                console.warn('No volume data found for table:', $table);
                return;
            }

            // Create container
            var $container = $('<div class="book-info-wrapper"></div>');

            // Create button
            var $button = $('<button>')
                .addClass('book-info-button cdx-button')
                .text('Show volume details')
                .css('display', 'block');

            $table.before($container);
            $container.append($button);

            var popupContent = createPopupContent(volumes);

            var popup = PopupGenerator.createPopup({
                introText: $button,
                headerText: 'Volume Information',
                content: popupContent,
                appendTo: $container,
                mode: 'add'
            });

            popup.popupElement
                .find('.book-info-container')
                .data('volumes', volumes);

            // Auto-load first volume
            setTimeout(function () {
                popup.popupElement
                    .find('.volume-list-item:first')
                    .trigger('click');
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
        var jpDateRow = findRowByHeader($rows, 'Japanese Release');

        if (!volumeRow || !coverRow || !jpDateRow) {
            console.error('Required table rows not found:', {
                volumeRow: volumeRow,
                coverRow: coverRow,
                jpDateRow: jpDateRow
            });
            return volumes;
        }

        $(volumeRow).find('td').each(function (index) {
            try {
                var $coverCell = $(coverRow).find('td').eq(index);
                var $dateCell = $(jpDateRow).find('td').eq(index);

                volumes.push({
                    name: $(this).text().trim(),
                    coverHtml: fixLazyLoadedImages($coverCell.html()),
                    jpDate: $dateCell.text().trim(),
                    coverUrl: extractCoverUrl($coverCell)
                });
            } catch (e) {
                console.error('Error processing volume:', e);
            }
        });

        return volumes;
    }

    function fixLazyLoadedImages(html) {
        if (!html) return html;

        var $temp = $('<div>').html(html);

        $temp.find('img').each(function () {
            var $img = $(this);
            var dataSrc = $img.attr('data-src');

            if (dataSrc) {
                $img.attr('src', dataSrc)
                    .removeAttr('data-src')
                    .removeClass('lazyload');
            }
        });

        return $temp.html();
    }

    function extractCoverUrl($cell) {
        var $img = $cell.find('img');
        return $img.attr('data-src') || $img.attr('src') || '';
    }

    function findRowByHeader($rows, headerText) {
        var foundRow = null;

        $rows.each(function () {
            var $headerCell = $(this).find('th:first');
            if ($headerCell.length && $headerCell.text().trim() === headerText) {
                foundRow = this;
                return false;
            }
        });

        return foundRow;
    }

    function loadVolumeDetails(volume, $container) {
        $container.html('<div class="book-info-loading">Loading…</div>');

        var imageName = extractImageName(volume.coverUrl);
        if (!imageName) {
            $container.html('<div class="book-info-error">Missing image data</div>');
            return;
        }

        var title = imageName.replace(/_/g, ' ').replace(/\.(jpg|png|jpeg|gif)$/i, '');

        $container.html([
            '<div class="volume-detail">',
            '<div class="volume-cover">', volume.coverHtml, '</div>',
            '<h3>', title, '</h3>',
            '<div><strong>Japanese release:</strong> ', volume.jpDate, '</div>',
            '<div class="volume-summary">',
            '<h4>Synopsis</h4>',
            '<div class="summary-content">Loading…</div>',
            '</div>',
            '<div class="volume-chapters">',
            '<h4>Chapters</h4>',
            '<div class="chapters-content">Loading…</div>',
            '</div>',
            '</div>'
        ].join(''));

        mw.loader.using(['mediawiki.util'], function () {
            loadPageSection('File:' + imageName, 'Synopsis',
                $container.find('.summary-content'));
            loadPageSection('File:' + imageName, 'Chapters',
                $container.find('.chapters-content'));
        });
    }

    function extractImageName(url) {
        var match = url && url.match(/[^\/]+\.(jpg|png|jpeg|gif)/i);
        return match ? decodeURIComponent(match[0]) : '';
    }

    function loadPageSection(page, sectionTitle, $target) {
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'parse',
            page: page,
            prop: 'sections',
            format: 'json'
        }).done(function (data) {
            var section = (data.parse.sections || [])
                .find(s => s.line === sectionTitle);

            if (!section) {
                $target.text('No content available.');
                return;
            }

            loadSectionContent(page, section.index, $target);
        });
    }

    function loadSectionContent(page, index, $target) {
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'parse',
            page: page,
            section: index,
            prop: 'text',
            format: 'json'
        }).done(function (data) {
            $target.html(fixLazyLoadedImages(data.parse.text['*']));
        });
    }

    $(document).on('click', '.volume-list-item', function () {
        var $item = $(this);
        var $container = $item.closest('.book-info-container');
        var volumes = $container.data('volumes');
        var index = $item.data('index');

        $item.addClass('active').siblings().removeClass('active');
        loadVolumeDetails(volumes[index],
            $container.find('.volume-details-content'));
    });

    $(setupBookInfoButtons);

})(window, jQuery);