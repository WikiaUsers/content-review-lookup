// Check if page is in the "Песни" category
function isInSongsCategory(pageTitle) {
    var api = new mw.Api();
    return api.get({
        action: 'query',
        prop: 'categories',
        titles: pageTitle,
        cllimit: 'max'
    }).then(function(response) {
        var pages = response.query.pages;
        var page = pages[Object.keys(pages)[0]];
        return page.categories ? page.categories.some(function(cat) {
            return cat.title === 'Категория:Песни';
        }) : false;
    }).catch(function(error) {
        console.error("Error checking category:", error);
        return false;
    });
}

// Get text from heading, properly handling spans
function getHeadingText(heading) {
    var headline = heading.querySelector('.mw-headline');
    return headline ? headline.textContent.trim() : heading.textContent.trim();
}

// Check if heading indicates lyrics content
function isLyricsHeading(text) {
    var terms = ['текст песни', 'текст', 'слова', 'lyrics', 'song lyrics'];
    text = text.toLowerCase();
    for (var i = 0; i < terms.length; i++) {
        if (text.indexOf(terms[i]) !== -1) return true;
    }
    return false;
}

// Calculate actual column count considering colspan
function getLogicalColumnCount(table) {
    var firstRow = table.querySelector('tr');
    if (!firstRow) return 0;

    var cells = firstRow.querySelectorAll('td, th');
    var count = 0;

    for (var i = 0; i < cells.length; i++) {
        var colspan = parseInt(cells[i].getAttribute('colspan'), 10) || 1;
        count += colspan;
    }

    return count;
}

// Get cell at logical column position
function getCellAtLogicalIndex(row, targetIndex) {
    var cells = row.querySelectorAll('td, th');
    var currentIndex = 0;

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var colspan = parseInt(cell.getAttribute('colspan'), 10) || 1;

        if (currentIndex <= targetIndex && targetIndex < currentIndex + colspan) {
            return cell;
        }
        currentIndex += colspan;
    }

    return null;
}

// Process cell content, handling special tags
function extractCellContent(cell) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = cell.innerHTML;

    // Remove sup elements
    var sups = tempDiv.getElementsByTagName('sup');
    while (sups.length > 0) {
        sups[0].parentNode.removeChild(sups[0]);
    }

    // Handle ruby annotations
    var rubies = tempDiv.getElementsByTagName('ruby');
    for (var i = rubies.length - 1; i >= 0; i--) {
        var ruby = rubies[i];
        var rts = ruby.getElementsByTagName('rt');
        var rps = ruby.getElementsByTagName('rp');

        // Remove rt and rp elements
        while (rts.length > 0) rts[0].parentNode.removeChild(rts[0]);
        while (rps.length > 0) rps[0].parentNode.removeChild(rps[0]);

        // Replace ruby with its base text
        var baseText = ruby.textContent.trim();
        ruby.parentNode.replaceChild(document.createTextNode(baseText), ruby);
    }

    return tempDiv.textContent
        .replace(/\s+/g, ' ')
        .trim();
}

// Locate lyrics tables in the document
function findLyricsTables() {
    var contentArea = document.querySelector('.mw-parser-output');
    if (!contentArea) {
        console.debug('Content area not found');
        return [];
    }

    var tables = [];
    var headings = contentArea.getElementsByTagName('h2');

    for (var i = 0; i < headings.length; i++) {
        var heading = headings[i];
        var headingText = getHeadingText(heading);

        if (isLyricsHeading(headingText)) {
            var element = heading.nextElementSibling;

            while (element && element.tagName !== 'H2') {
                if (element.tagName === 'TABLE') {
                    if (!element.classList.contains('song-lyrics-legend')) {
                        var columnCount = getLogicalColumnCount(element);
                        if (columnCount >= 2) {
                            tables.push({
                                heading: heading,
                                table: element
                            });
                        }
                    }
                }

                // Check nested tables
                var nestedTables = element.getElementsByTagName('table');
                for (var j = 0; j < nestedTables.length; j++) {
                    var nestedTable = nestedTables[j];
                    if (!nestedTable.classList.contains('song-lyrics-legend')) {
                        var nestedColumnCount = getLogicalColumnCount(nestedTable);
                        if (nestedColumnCount >= 2) {
                            tables.push({
                                heading: heading,
                                table: nestedTable
                            });
                        }
                    }
                }

                element = element.nextElementSibling;
            }
        }
    }

    return tables;
}

// Add copy functionality to column headers
function addCopyIcon(cell, table, columnIndex) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('song-lyrics-heading');

    // Move existing content
    while (cell.firstChild) {
        wrapper.appendChild(cell.firstChild);
    }

    var copyIcon = document.createElement('a');
    copyIcon.innerHTML = '<i class="copy-icon fas fa-copy"></i>';
    copyIcon.title = 'Копировать столбец';
    copyIcon.style.cursor = 'pointer';
    copyIcon.classList.add('copy-col');
    copyIcon.onclick = function(e) {
        e.preventDefault();
        copyColumnContent(table, columnIndex);
    };

    wrapper.appendChild(copyIcon);
    cell.appendChild(wrapper);
}

// Add translation toggle link
function addTranslationToggle(cell, table) {
    var toggleLink = document.createElement('a');
    toggleLink.innerHTML = '<i class="fas fa-eye"></i>';
    toggleLink.title = 'Скрыть/показать перевод';
    toggleLink.style.cssText = 'cursor:pointer;';
    toggleLink.classList.add('toggle-col');

    var isHidden = false;
    toggleLink.onclick = function(e) {
        e.preventDefault();
        isHidden = !isHidden;
        var rows = table.getElementsByTagName('tr');

        var wrapper = cell.querySelector('.song-lyrics-heading');
        if (wrapper) {
            if (isHidden) {
                wrapper.classList.add('translation-hidden');
            } else {
                wrapper.classList.remove('translation-hidden');
            }
        }

        for (var i = 1; i < rows.length; i++) {
            var targetCell = getCellAtLogicalIndex(rows[i], 2);
            if (targetCell) {
                targetCell.style.display = isHidden ? 'none' : '';
            }
        }

        toggleLink.innerHTML = isHidden ?
            '<i class="fas fa-eye-slash"></i>' :
            '<i class="fas fa-eye"></i>';
        toggleLink.title = isHidden ? 'Показать перевод' : 'Скрыть перевод';
    };

    var wrapper = cell.querySelector('div');
    if (wrapper) {
        wrapper.appendChild(toggleLink);
    } else {
        cell.appendChild(toggleLink);
    }
}

// Copy column text to clipboard
function copyColumnContent(table, columnIndex) {
    var rows = table.getElementsByTagName('tr');
    var content = [];
    var isFirstRow = true;

    for (var i = 0; i < rows.length; i++) {
        if (isFirstRow) {
            isFirstRow = false;
            continue;
        }

        var firstCell = rows[i].querySelector('td, th');
        if (!firstCell || !firstCell.textContent.trim()) {
            if (content.length > 0) {
                content.push('');
            }
            continue;
        }

        var targetCell = getCellAtLogicalIndex(rows[i], columnIndex);
        if (targetCell) {
            var cellText = extractCellContent(targetCell);
            if (cellText.trim()) {
                content.push(cellText);
            }
        }
    }

    var finalContent = content.join('\n');

    // Use execCommand as fallback for older browsers
    var textArea = document.createElement('textarea');
    textArea.value = finalContent;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(finalContent)
                .then(function() {
                    mw.notify('Текст скопирован', {
                        type: 'success'
                    });
                })
                .catch(function(err) {
                    console.error("Clipboard API failed:", err);
                    document.execCommand('copy');
                    mw.notify('Текст скопирован', {
                        type: 'success'
                    });
                });
        } else {
            document.execCommand('copy');
            mw.notify('Текст скопирован', {
                type: 'success'
            });
        }
    } catch (err) {
        console.error("Copy failed:", err);
        mw.notify('Ошибка при копировании', {
            type: 'error'
        });
    } finally {
        document.body.removeChild(textArea);
    }
}

// Process individual lyrics table
function processLyricsTable(heading, table) {
    var headerRow = table.querySelector('tr');
    if (!headerRow) return;

    var headerCells = headerRow.querySelectorAll('td, th');
    if (!headerCells.length) return;

    table.classList.add('song-lyrics');

    // Add copy icons to cells that don't have them
    for (var i = 0; i < headerCells.length; i++) {
        if (!headerCells[i].querySelector('.copy-icon')) {
            addCopyIcon(headerCells[i], table, i);
        }
    }

    // Add translation toggle for 3-column tables if needed
    var columnCount = getLogicalColumnCount(table);
    if (columnCount === 3) {
        var thirdColumnHeader = getCellAtLogicalIndex(headerRow, 2);
        if (thirdColumnHeader && !thirdColumnHeader.querySelector('.fa-eye')) {
            addTranslationToggle(thirdColumnHeader, table);
        }
    }
}

// Main function
function main() {
    var pageTitle = mw.config.get('wgPageName');

    isInSongsCategory(pageTitle).then(function(isInCategory) {
        if (isInCategory) {
            var tables = findLyricsTables();

            for (var i = 0; i < tables.length; i++) {
                try {
                    processLyricsTable(tables[i].heading, tables[i].table);
                } catch (error) {
                    console.error('Error processing table:', error);
                }
            }
        }
    }).catch(function(error) {
        console.error('Main function error:', error);
    });
}

$(document).ready(main);