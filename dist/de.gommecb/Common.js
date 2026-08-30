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

// Wiki-Suche
(function () {
	function initCbWikiSearch() {
		var container = document.getElementById('cb-wiki-search');
		if (!container || container.dataset.cbInit) return;
		container.dataset.cbInit = '1';

		var wrap = document.createElement('div');
		wrap.className = 'cb-wiki-search-inner';

		var input = document.createElement('input');
		input.type = 'search';
		input.className = 'cb-wiki-search-input';
		input.placeholder = 'Wiki durchsuchen…';
		input.autocomplete = 'off';

		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'cb-wiki-search-btn';
		btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

		var results = document.createElement('div');
		results.className = 'cb-wiki-search-results';

		wrap.appendChild(input);
		wrap.appendChild(btn);
		wrap.appendChild(results);
		container.appendChild(wrap);

		var apiUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/api.php';
		var searchUrl = mw.config.get('wgServer') + mw.util.getUrl('Special:Search');

		var articlePath = mw.config.get('wgArticlePath') || '/wiki/$1';
		var langPrefix = articlePath.replace('/wiki/$1', '');
		var wikiaUrl = mw.config.get('wgServer') + langPrefix + '/wikia.php';

		var reqId = 0;
		var activeIndex = -1;
		var currentLinks = [];

		function goToSearch(query) {
			var q = (query !== undefined ? query : input.value).trim();
			if (!q) return;
			window.location.href = searchUrl + '?search=' + encodeURIComponent(q);
		}

		function clearResults() {
			results.innerHTML = '';
			results.classList.remove('cb-wiki-search-open');
			currentLinks = [];
			activeIndex = -1;
		}

		function setActive(index) {
			for (var i = 0; i < currentLinks.length; i++) {
				currentLinks[i].classList.toggle('cb-wiki-search-active', i === index);
			}
			if (index >= 0 && currentLinks[index]) {
				currentLinks[index].scrollIntoView({ block: 'nearest' });
			}
			activeIndex = index;
		}

		function renderResults(titles, urls, flags, nsFlags) {
			if (!titles.length) { clearResults(); return; }
			results.innerHTML = '';
			currentLinks = [];
			for (var i = 0; i < titles.length; i++) {
				var a = document.createElement('a');
				a.href = urls[i];
				a.textContent = titles[i];
				var cls = 'cb-wiki-search-result';
				if (flags && flags[i]) cls += ' cb-wiki-search-result--contains';
				if (nsFlags && nsFlags[i]) cls += ' cb-wiki-search-result--ns';
				a.className = cls;
				a.addEventListener('mouseenter', (function (idx) {
					return function () { setActive(idx); };
				}(i)));
				results.appendChild(a);
				currentLinks.push(a);
			}
			results.classList.add('cb-wiki-search-open');
			activeIndex = -1;
		}

		function extractRedirects(redirData) {
			// Liefert Liste von {from, to} - "to" ist das Weiterleitungsziel, kann null sein falls unbekannt
			var out = [];
			if (!redirData) return out;
			if (Array.isArray(redirData)) {
				for (var i = 0; i < redirData.length; i++) {
					var entry = redirData[i];
					if (typeof entry === 'string') {
						out.push({ from: entry, to: null });
					} else if (entry && entry.title) {
						out.push({ from: entry.title, to: entry.redirect || entry.to || null });
					} else if (entry && entry.from) {
						out.push({ from: entry.from, to: entry.to || null });
					}
				}
			} else if (typeof redirData === 'object') {
				for (var key in redirData) {
					if (Object.prototype.hasOwnProperty.call(redirData, key)) {
						out.push({ from: key, to: redirData[key] });
					}
				}
			}
			return out;
		}

		function fetchSuggestions(term) {
			var suggestUrl = wikiaUrl + '?controller=UnifiedSearchSuggestions&method=getSuggestions&format=json&scope=internal&query=' + encodeURIComponent(term);
			var fulltextUrl = apiUrl + '?action=query&list=search&format=json&srlimit=6&origin=*&srsearch=' + encodeURIComponent(term);
			return Promise.all([
				fetch(suggestUrl).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
				fetch(fulltextUrl).then(function (r) { return r.ok ? r.json() : { query: {} }; }).catch(function () { return { query: {} }; })
			]);
		}

		// Liefert bis zu 2 Singular/Plural-Vermutungen für den Suchbegriff
		function guessVariants(q) {
			var candidates = [];
			if (/en$/i.test(q) && q.length > 4) {
				candidates.push(q.slice(0, -2)); // "Farmwelten" -> "Farmwelt"
				candidates.push(q.slice(0, -1)); // "Gilden" -> "Gilde"
			} else if (/s$/i.test(q) && q.length > 3) {
				candidates.push(q.slice(0, -1)); // "Homes" -> "Home"
			} else if (/n$/i.test(q) && q.length > 3) {
				candidates.push(q.slice(0, -1)); // sonstige -n-Endungen
			} else {
				candidates.push(q + 'n'); // Singular -> Plural raten (deutsch)
				candidates.push(q + 's'); // Singular -> Plural raten (englisches Lehnwort)
			}
			var seen = {};
			var out = [];
			for (var i = 0; i < candidates.length; i++) {
				var v = candidates[i];
				if (v && v.length > 1 && v.toLowerCase() !== q.toLowerCase() && !seen[v.toLowerCase()]) {
					seen[v.toLowerCase()] = true;
					out.push(v);
				}
			}
			return out.slice(0, 2);
		}

		var timer = null;
		input.addEventListener('input', function () {
			var q = input.value.trim();
			if (timer) clearTimeout(timer);
			if (q.length < 2) { clearResults(); return; }

			var thisReq = ++reqId;
			timer = setTimeout(function () {
			var cleanQ = q.replace(/^\//, '').trim();
			var slashQ = '/' + cleanQ;
			var words = cleanQ.split(/\s+/).filter(function (w) { return w.length >= 2; });
		
			var terms = [cleanQ, slashQ];
			if (words.length > 1) {
				var lastWord = words[words.length - 1];
				if (terms.indexOf(lastWord) === -1) terms.push(lastWord);
			} else {
				terms = terms.concat(guessVariants(cleanQ));
			}
		
			Promise.all(terms.map(fetchSuggestions)).then(function (allResults) {
					if (thisReq !== reqId) return; // veraltete Antwort ignorieren

					var seen = {};
					var merged = [];
					
					var NS_PREFIX_RE = /^(Datei|File|MediaWiki|CityBuild Wiki|Vorlage|Template|Kategorie|Category|Modul|Module|Spezial|Special|Hilfe|Help|Benutzer|User|Diskussion|Talk):/i;

					for (var ti = 0; ti < terms.length; ti++) {
						var term = terms[ti];
						var termLower = term.toLowerCase();
						var isExact = (ti === 0);

			var suggest = (allResults[ti][0] && allResults[ti][0].suggestions) || [];
			var redirectPairs = extractRedirects(allResults[ti][0] && allResults[ti][0].redirects);
			var search = (allResults[ti][1].query && allResults[ti][1].query.search) || [];
			
			suggest.forEach(function (t) {
				if (!seen[t] && t.toLowerCase().indexOf(termLower) !== -1) {
					seen[t] = true;
					merged.push({ title: t, contains: !isExact });
				}
			});
			
			var FILE_PREFIX_RE = /^(Datei|File):/i;
			
			redirectPairs.forEach(function (pair) {
				var targetIsFile = pair.to && FILE_PREFIX_RE.test(pair.to);
			
				if (targetIsFile) {
					// Ausnahme: Weiterleitung zeigt auf eine Datei -> nur die Datei zeigen
					if (!seen[pair.to]) {
						seen[pair.to] = true;
						merged.push({ title: pair.to, contains: true });
					}
					return;
				}
			
				if (pair.from && !seen[pair.from] && pair.from.toLowerCase().indexOf(termLower) !== -1) {
					seen[pair.from] = true;
					merged.push({ title: pair.from, contains: !isExact });
				}
			
				// Zielartikel zusätzlich zeigen - falls textlich zu ähnlich, fängt isNearDuplicate (v31) das später ab
				if (pair.to && !seen[pair.to] && !NS_PREFIX_RE.test(pair.to)) {
					seen[pair.to] = true;
					merged.push({ title: pair.to, contains: true });
				}
			});

						search.forEach(function (item) {
							var t = item.title;
							if (!seen[t] && t.toLowerCase().indexOf(termLower) !== -1) {
								seen[t] = true;
								merged.push({ title: t, contains: true });
							}
						});
					}

					function isNearDuplicate(a, b) {
						var short = a.length <= b.length ? a : b;
						var long = a.length <= b.length ? b : a;
						if (short.length < 3) return false;
						return long.toLowerCase().indexOf(short.toLowerCase()) !== -1;
					}
					
					merged.forEach(function (item) {
						item.ns = NS_PREFIX_RE.test(item.title);
					});
					
					merged.sort(function (a, b) {
						return (a.ns === b.ns) ? 0 : (a.ns ? 1 : -1);
					});
					
					var deduped = [];
					outer:
					for (var m = 0; m < merged.length; m++) {
						for (var n = 0; n < deduped.length; n++) {
							if (isNearDuplicate(merged[m].title, deduped[n].title)) {
								if (merged[m].title.length < deduped[n].title.length) {
									deduped[n] = merged[m];
								}
								continue outer;
							}
						}
						deduped.push(merged[m]);
					}
					merged = deduped;
					merged = merged.slice(0, 8);

					var titles = [];
					var urls = [];
					var flags = [];
					var nsFlags = [];
					for (var k = 0; k < merged.length; k++) {
						titles.push(merged[k].title);
						urls.push(mw.util.getUrl(merged[k].title));
						flags.push(merged[k].contains);
						nsFlags.push(merged[k].ns);
					}
					renderResults(titles, urls, flags, nsFlags);
				});
			}, 100);
		});

		input.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowDown') {
				if (!currentLinks.length) return;
				e.preventDefault();
				setActive(Math.min(activeIndex + 1, currentLinks.length - 1));
			} else if (e.key === 'ArrowUp') {
				if (!currentLinks.length) return;
				e.preventDefault();
				setActive(Math.max(activeIndex - 1, 0));
			} else if (e.key === 'Enter') {
				if (activeIndex >= 0 && currentLinks[activeIndex]) {
					window.location.href = currentLinks[activeIndex].href;
				} else {
					goToSearch();
				}
			} else if (e.key === 'Escape') {
				clearResults();
				input.blur();
			}
		});

		btn.addEventListener('click', function () { goToSearch(); });

		document.addEventListener('click', function (e) {
			if (!wrap.contains(e.target)) clearResults();
		});
	}

	mw.hook('wikipage.content').add(initCbWikiSearch);
}());