// CSS-Counter für # Spalte
if (!$('#crate-counter-style').length) {
    $('<style id="crate-counter-style">')
        .text(
            '.crate-table { counter-reset: crate-row; }' +
            '.crate-table tbody tr.crate-row-main { counter-increment: crate-row; }' +
            '.crate-table tbody tr td.crate-counter-cell::before { content: counter(crate-row); }'
        )
        .appendTo('head');
}

mw.hook('wikipage.content').add(function ($content) {
    $content.find('table.crate-table').each(function () {
        var $table = $(this);

        if ($table.data('filter-init')) return;
        $table.data('filter-init', true);

        // sortable entfernen damit rowspan nicht kaputt geht
        $table.removeClass('sortable');

        // Spaltenstruktur erkennen:
        // CrateListe:  6 Spalten → # | Item | Kategorie | Seltenheit | Crates | Anzahl
        // CrateInhalt: 4 Spalten → # | Item | Seltenheit | Kategorie
        var isFull   = $table.attr('data-crate-type') === 'liste';
        var hideKat  = $table.attr('data-hide-cat') === '1';
        var itemIdx   = 1;
        var katIdx    = isFull && !hideKat ? 2 : 3;
        var rarityIdx = isFull ? (hideKat ? 2 : 3) : 2;

        // Hauptzeile hat mehr als 2 Zellen (Folgezeilen haben nur 2: Seltenheit + Crates)
        function isMainRow($tr) {
            return $tr.find('td').length > 2;
        }

        // Seltenheiten sammeln (nur aus Hauptzeilen und Folgezeilen mit Seltenheit)
        var rarities = [];
        $table.find('tbody tr').each(function () {
            var $cells = $(this).find('td');
            if ($cells.length < 2) return;
            // Seltenheit steht immer in der richtigen Zelle wenn >= 2 Zellen
            var selIdx = isMainRow($(this)) ? rarityIdx : 0;
            var val = $cells.eq(selIdx).text().trim();
            if (val && val !== 'N/A' && !rarities.includes(val)) rarities.push(val);
            if (val === 'N/A' && !rarities.includes('N/A')) rarities.push('N/A');
        });
        rarities.sort();

        // Kategorien sammeln (nur aus Hauptzeilen)
        var categories = [];
        $table.find('tbody tr').each(function () {
            if (!isMainRow($(this))) return;
            var val = $(this).find('td').eq(katIdx).text().trim();
            if (val && !categories.includes(val)) categories.push(val);
        });
        categories.sort();

        // Sortieroptionen für CrateListe
        var sortOptions = isFull
            ? (hideKat
                ? ['Item (A–Z)', 'Seltenheit (A–Z)', 'Anzahl (↑)', 'Anzahl (↓)']
                : ['Item (A–Z)', 'Kategorie (A–Z)', 'Seltenheit (A–Z)', 'Anzahl (↑)', 'Anzahl (↓)'])
            : ['Standard', 'Item (A–Z)', 'Kategorie (A–Z)', 'Seltenheit (A–Z)'];

        var selectedRarity   = '';
        var selectedCategory = '';
        var selectedSort     = '';

        // Filter-Bar aufbauen
        var $wrapper = $('<div>').addClass('crate-filter-bar');
        var $input = $('<input>')
            .attr({ type: 'text', placeholder: 'Suchen...' })
            .addClass('crate-filter-input');

        var $rarityDropdown = createDropdown(
            ['Alle Seltenheiten'].concat(rarities),
            'Alle Seltenheiten',
            function (val) {
                selectedRarity = val === 'Alle Seltenheiten' ? '' : val;
                applyFilter();
            }
        );
        var $categoryDropdown = createDropdown(
            ['Alle Kategorien'].concat(categories),
            'Alle Kategorien',
            function (val) {
                selectedCategory = val === 'Alle Kategorien' ? '' : val;
                applyFilter();
            }
        );
        var $sortDropdown = createDropdown(
            sortOptions,
            'Sortierung',
            function (val) {
                selectedSort = val;
                applySort();
            }
        );

        if ($table.attr('data-hide-cat') === '1') {
            $wrapper.append($input, $rarityDropdown, $sortDropdown);
        } else {
            $wrapper.append($input, $rarityDropdown, $categoryDropdown, $sortDropdown);
        }
        $table.wrap('<div class="crate-table-wrapper"></div>');
        $table.parent().before($wrapper);

        // Gruppen aufbauen: jede Gruppe = alle tr-Zeilen eines Items zusammen
        function getGroups() {
            var groups = [];
            var current = null;
            var idx = 0;
            $table.find('tbody tr').each(function () {
                if (isMainRow($(this))) {
                    current = { main: $(this), extra: [], origIndex: idx++ };
                    groups.push(current);
                } else if (current) {
                    current.extra.push($(this));
                }
            });
            return groups;
        }

        function applyFilter() {
            var search = $input.val().toLowerCase();
            var selRar = selectedRarity.toLowerCase();
            var selCat = selectedCategory.toLowerCase();

            var groups = getGroups();
            groups.forEach(function (g) {
                var $main   = g.main;
                var $cells  = $main.find('td');

                var itemText = $cells.eq(itemIdx).text().toLowerCase();
                var cat      = $cells.eq(katIdx).text().trim().toLowerCase();

                var matchSearch = !search || itemText.includes(search);
                var matchCat    = !selCat  || cat === selCat;

                // Seltenheitsfilter: prüfe Hauptzeile und alle Folgezeilen
                var matchRarity = !selRar;
                if (!matchRarity) {
                    // Hauptzeile
                    if ($cells.eq(rarityIdx).text().trim().toLowerCase() === selRar) matchRarity = true;
                    // Folgezeilen (haben Seltenheit in erster Zelle)
                    g.extra.forEach(function ($tr) {
                        if ($tr.find('td').eq(0).text().trim().toLowerCase() === selRar) matchRarity = true;
                    });
                }

                var show = matchSearch && matchCat && matchRarity;

                $main.toggle(show);
                $main.toggleClass('crate-row-main', show);
                g.extra.forEach(function ($tr) { $tr.toggle(show); });
            });

            updateDropdownOptions();
        }

        function updateDropdownOptions() {
            // Seltenheits-Dropdown: zeigt Seltenheiten die beim aktuellen Kategoriefilter vorkommen
            // (unabhängig vom Seltenheitsfilter selbst)
            var rarityForCat = [];
            $table.find('tbody tr').each(function () {
                var $cells = $(this).find('td');
                if ($cells.length < 2) return;
                // Kategorie-Check: stimmt Kategorie mit aktuellem Kategoriefilter überein?
                if (selectedCategory) {
                    var cat = isMainRow($(this))
                        ? $cells.eq(katIdx).text().trim().toLowerCase()
                        : null;
                    if (cat === null) return; // Folgezeile - Kategorie aus Hauptzeile nötig
                    if (cat !== selectedCategory.toLowerCase()) return;
                }
                var selIdx = isMainRow($(this)) ? rarityIdx : 0;
                var val = $cells.eq(selIdx).text().trim();
                if (val && !rarityForCat.includes(val)) rarityForCat.push(val);
            });
            rarityForCat.sort();

            // Kategorie-Dropdown: zeigt Kategorien die beim aktuellen Seltenheitsfilter vorkommen
            var catsForRarity = [];
            $table.find('tbody tr').each(function () {
                if (!isMainRow($(this))) return;
                var $cells = $(this).find('td');
                // Seltenheits-Check über alle Zeilen der Gruppe
                if (selectedRarity) {
                    var foundRarity = false;
                    var $next = $(this);
                    while ($next.length) {
                        var $tc = $next.find('td');
                        var selIdx2 = isMainRow($next) ? rarityIdx : 0;
                        if ($tc.eq(selIdx2).text().trim().toLowerCase() === selectedRarity.toLowerCase()) {
                            foundRarity = true; break;
                        }
                        $next = $next.next('tr');
                        if ($next.length && isMainRow($next)) break;
                    }
                    if (!foundRarity) return;
                }
                var val = $cells.eq(katIdx).text().trim();
                if (val && !catsForRarity.includes(val)) catsForRarity.push(val);
            });
            catsForRarity.sort();

            updateDropdown($rarityDropdown, ['Alle Seltenheiten'].concat(rarityForCat), selectedRarity || 'Alle Seltenheiten');
            if ($table.attr('data-hide-cat') !== '1') {
                updateDropdown($categoryDropdown, ['Alle Kategorien'].concat(catsForRarity), selectedCategory || 'Alle Kategorien');
            }
        }

        function updateDropdown($dropdown, options, currentVal) {
            var $menu = $dropdown.find('.cb-dropdown-menu');
            $menu.empty();
            options.forEach(function (opt) {
                var $item = $('<div>')
                    .addClass('cb-dropdown-item')
                    .text(opt)
                    .on('click', function (e) {
                        e.stopPropagation();
                        $dropdown.find('.cb-dropdown-toggle').text(opt);
                        $dropdown.removeClass('open');
                        // Trigger the right onChange based on which dropdown this is
                        if ($dropdown.is($rarityDropdown)) {
                            selectedRarity = opt === 'Alle Seltenheiten' ? '' : opt;
                        } else {
                            selectedCategory = opt === 'Alle Kategorien' ? '' : opt;
                        }
                        applyFilter();
                    });
                $menu.append($item);
            });
            // Aktuellen Toggle-Text setzen
            var displayVal = options.includes(currentVal) ? currentVal : options[0];
            $dropdown.find('.cb-dropdown-toggle').text(displayVal);
        }

        function applySort() {
            var groups = getGroups();

            groups.sort(function (a, b) {
                if (selectedSort === 'Standard') {
                    return a.origIndex - b.origIndex;
                }
                if (selectedSort === 'Item (A–Z)') {
                    var aItem = a.main.find('td[data-item]').attr('data-item') || '';
                    var bItem = b.main.find('td[data-item]').attr('data-item') || '';
                    return aItem.localeCompare(bItem, 'de');
                }
                if (selectedSort === 'Kategorie (A–Z)') {
                    var aKat = a.main.find('td[data-kat]').attr('data-kat') || '';
                    var bKat = b.main.find('td[data-kat]').attr('data-kat') || '';
                    return aKat.localeCompare(bKat, 'de');
                }
                if (selectedSort === 'Seltenheit (A–Z)') {
                    var rarityOrder = {'Legendär':1,'Episch':2,'Selten':3,'Normal':4,'N/A':5};
                    var aRar = a.main.find('td').eq(rarityIdx).text().trim();
                    var bRar = b.main.find('td').eq(rarityIdx).text().trim();
                    return (rarityOrder[aRar] || 9) - (rarityOrder[bRar] || 9);
                }
                if (selectedSort === 'Anzahl (↑)') {
                    var aAnz = parseInt(a.main.find('td[data-anzahl]').attr('data-anzahl')) || 0;
                    var bAnz = parseInt(b.main.find('td[data-anzahl]').attr('data-anzahl')) || 0;
                    return aAnz - bAnz;
                }
                if (selectedSort === 'Anzahl (↓)') {
                    var aAnzD = parseInt(a.main.find('td[data-anzahl]').attr('data-anzahl')) || 0;
                    var bAnzD = parseInt(b.main.find('td[data-anzahl]').attr('data-anzahl')) || 0;
                    return bAnzD - aAnzD;
                }
                return 0;
            });

            var $tbody = $table.find('tbody');
            groups.forEach(function (g) {
                $tbody.append(g.main);
                g.extra.forEach(function ($tr) { $tbody.append($tr); });
            });

            // Sichtbarkeit nach Sort neu anwenden
            applyFilter();
        }

        $input.on('input', applyFilter);

        // Hauptzeilen markieren für CSS-Counter
        $table.find('tbody tr').each(function () {
            if (isMainRow($(this))) $(this).addClass('crate-row-main');
        });
    });
});

function createDropdown(options, placeholder, onChange) {
    var $dropdown = $('<div>').addClass('cb-dropdown');
    var $toggle   = $('<div>').addClass('cb-dropdown-toggle').text(placeholder);
    var $menu     = $('<div>').addClass('cb-dropdown-menu');

    options.forEach(function (opt) {
        var $item = $('<div>')
            .addClass('cb-dropdown-item')
            .text(opt)
            .on('click', function (e) {
                e.stopPropagation();
                $toggle.text(opt);
                $dropdown.removeClass('open');
                onChange(opt);
            });
        $menu.append($item);
    });

    $toggle.on('click', function (e) {
        e.stopPropagation();
        $('.cb-dropdown').not($dropdown).removeClass('open');
        $dropdown.toggleClass('open');
    });

    $(document).off('click.cbDropdown').on('click.cbDropdown', function () {
        $('.cb-dropdown').removeClass('open');
    });

    $dropdown.append($toggle, $menu);
    return $dropdown;
}

// Syntax-Box Copy-Button
document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cb-syntax-copy');
    if (!btn) return;
    var box  = btn.closest('.cb-syntax-box');
    var code = box.querySelector('.cb-syntax-code');
    if (!code) return;
    navigator.clipboard.writeText(code.innerText.trim());
    btn.textContent = '✔';
    box.style.borderLeftColor = '#54FB54';
    setTimeout(function () {
        btn.textContent = '⧉';
        box.style.borderLeftColor = '#1f86c1';
    }, 800);
});