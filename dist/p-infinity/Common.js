/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
    var fullPokemonData = {};
    var chunkSize = 100; 
    var currentStart = 1;
    var maxChunks = 12;
    var chunkCount = 0;

    function initAdvancedSearch() {
        var $wrapper = $('#advanced-search-wrapper');
        if (!$wrapper.length) return;

        $wrapper.html('<div id="load-status" style="padding:20px; text-align:center; background:#f9f9f9; border:1px solid #ccc;">' +
                      '<p>Loading Pokemon Database... <span id="load-count">0</span> records loaded.</p>' +
                      '</div>');

        loadNextChunk($wrapper);
    }

    function loadNextChunk($wrapper) {
        var api = new mw.Api();
        var currentEnd = currentStart + chunkSize - 1;
        chunkCount++;

        if (chunkCount > maxChunks) {
            console.warn("Reached max chunks limit. Finalizing search interface.");
            $('#load-status').hide();
            buildInterface($wrapper, fullPokemonData, api);
            return;
        }

        api.post({
            action: 'expandtemplates',
            text: '{{#invoke:Pokemon|get_search_data|' + currentStart + '|' + currentEnd + '}}',
            prop: 'wikitext'
        }, {
            timeout: 15000 
        }).done(function(data) {
            var wikitext = data.expandtemplates.wikitext;
            
            if (!wikitext || wikitext.trim() === "" || wikitext.indexOf('data-json') === -1) {
                $('#load-status').hide();
                buildInterface($wrapper, fullPokemonData, api);
                return;
            }

            try {
                var startStr = 'data-json=';
                var startIndex = wikitext.indexOf(startStr);
                var quoteChar = wikitext.substr(startIndex + startStr.length, 1);
                var firstQuote = wikitext.indexOf(quoteChar, startIndex);
                var lastQuote = wikitext.lastIndexOf(quoteChar);
                
                var jsonContent = wikitext.substring(firstQuote + 1, lastQuote);

                if (jsonContent) {
                    var decodedJson = jsonContent
                        .replace(/&quot;/g, '"')
                        .replace(/&apos;/g, "'")
                        .replace(/&#39;/g, "'")
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&');
                        
                    var chunk = JSON.parse(decodedJson);
                    var chunkKeys = Object.keys(chunk);

                    if (chunkKeys.length === 0) {
                        $('#load-status').hide();
                        buildInterface($wrapper, fullPokemonData, api);
                        return;
                    }

                    $.extend(fullPokemonData, chunk);
                    
                    var totalLoaded = Object.keys(fullPokemonData).length;
                    $('#load-count').text(totalLoaded);
                    
                    currentStart += chunkSize;
                    loadNextChunk($wrapper);
                } else {
                    buildInterface($wrapper, fullPokemonData, api);
                }
            } catch (e) {
                console.error("Chunk Error at Start " + currentStart + ":", e);
                $('#load-status').hide();
                buildInterface($wrapper, fullPokemonData, api);
            }
        }).fail(function(code) {
            console.error("API Failure at Start " + currentStart + ":", code);
            $('#load-status').hide();
            buildInterface($wrapper, fullPokemonData, api);
        });
    }

    function buildInterface($wrapper, pokemonData, api) {
        var allMoves = [], allAbilities = [], moveSet = {}, abilitySet = {};

        $.each(pokemonData, function(id, p) {
            if (p.moves) $.each(p.moves, function(i, m) { if (m && !moveSet[m]) { moveSet[m] = true; allMoves.push(m); } });
            if (p.abilities) $.each(p.abilities, function(i, a) { if (a && !abilitySet[a]) { abilitySet[a] = true; allAbilities.push(a); } });
        });
        allMoves.sort();
        allAbilities.sort();

        var uiHtml = '<div id="search-ui-container" style="background: #ecede1; border: 4px solid #D8D7BD; border-radius: 12px; padding: 20px; margin-bottom: 20px;">' +
            '<h3 style="margin-top:0; color:#555; border-bottom:1px solid #D8D7BD; padding-bottom:10px;">Moveset Searcher</h3>' +
            '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">';
        
        for (var i = 1; i <= 4; i++) {
            uiHtml += '<div style="position:relative;">' +
                '<label style="font-size:0.9em; color:#666;"><b>Move ' + i + '</b></label><br>' +
                '<input type="text" class="search-input move-input" id="search-m' + i + '" autocomplete="off" placeholder="Type move..." style="width:100%; padding:8px; border-radius:4px; border:1px solid #ccc; box-sizing:border-box;">' +
                '<div class="suggestion-box" id="sug-m' + i + '" style="display:none; position:absolute; z-index:1000; background:white; border:1px solid #ccc; width:100%; max-height:150px; overflow-y:auto; box-shadow:0 4px 8px rgba(0,0,0,0.1);"></div>' +
                '</div>';
        }

        uiHtml += '<div style="position:relative;">' +
            '<label style="font-size:0.9em; color: blue;"><b>Ability</b></label><br>' +
            '<input type="text" class="search-input ability-input" id="search-ab" autocomplete="off" placeholder="Type ability..." style="width:100%; padding:8px; border-radius:4px; border:1px solid #ccc; box-sizing:border-box;">' +
            '<div class="suggestion-box" id="sug-ab" style="display:none; position:absolute; z-index:1000; background:white; border:1px solid #ccc; width:100%; max-height:150px; overflow-y:auto; box-shadow:0 4px 8px rgba(0,0,0,0.1);"></div>' +
            '</div></div>' +
            '<div style="margin-top: 20px; display:flex; gap:10px;">' +
            '<button id="btn-do-search" style="padding:10px 30px; background:#9856E9; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Search Database</button> ' +
            '<button id="btn-reset-search" style="padding:10px 20px; background:#e74c3c; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Reset</button>' +
            '</div></div><div id="search-results-display"></div>';

        $wrapper.html(uiHtml);

        function setupSuggestions(inputId, sugId, list) {
            var $input = $('#' + inputId), $sugBox = $('#' + sugId);
            $input.on('input', function() {
                var val = $(this).val().trim().toLowerCase();
                if (val.length < 2) { $sugBox.hide(); return; }
                var filtered = list.filter(function(item) { return item.toLowerCase().indexOf(val) !== -1; }).slice(0, 10);
                if (filtered.length === 0) { $sugBox.hide(); return; }
                var itemsHtml = '';
                $.each(filtered, function(i, item) { itemsHtml += '<div class="sug-item" style="padding:8px; cursor:pointer; border-bottom:1px solid #eee;">' + item + '</div>'; });
                $sugBox.html(itemsHtml).show();
                $sugBox.find('.sug-item').on('click', function() { $input.val($(this).text()); $sugBox.hide(); });
            });
            $(document).on('click', function(e) { if (!$(e.target).closest('#' + inputId + ', #' + sugId).length) $sugBox.hide(); });
        }

        setupSuggestions('search-m1', 'sug-m1', allMoves);
        setupSuggestions('search-m2', 'sug-m2', allMoves);
        setupSuggestions('search-m3', 'sug-m3', allMoves);
        setupSuggestions('search-m4', 'sug-m4', allMoves);
        setupSuggestions('search-ab', 'sug-ab', allAbilities);

        $('#btn-do-search').on('click', function() {
            var mValues = [$('#search-m1').val().trim().toLowerCase(), $('#search-m2').val().trim().toLowerCase(), $('#search-m3').val().trim().toLowerCase(), $('#search-m4').val().trim().toLowerCase()];
            var abValue = $('#search-ab').val().trim().toLowerCase();
            var matches = [];
            var capitalize = function(s) { return s.charAt(0).toUpperCase() + s.slice(1); };

            $.each(pokemonData, function(id, p) {
                var pMoves = (p.moves || []).map(function(m) { return m.toLowerCase(); });
                var pAbilities = (p.abilities || []).map(function(a) { return a.toLowerCase(); });
                var moveMatch = true;
                $.each(mValues, function(i, val) { if (val !== "" && pMoves.indexOf(val) === -1) { moveMatch = false; return false; } });
                var abMatch = (abValue === "" || pAbilities.indexOf(abValue) !== -1);
                if (moveMatch && abMatch) matches.push(p);
            });

            var $output = $('#search-results-display');
            if (matches.length === 0) {
                $output.html('<div style="text-align:center; color:#721c24; background:#f8d7da; padding:20px; border-radius:8px;">No matches found.</div>');
                return;
            }

            // Sorted by ID (National Dex order)
            matches.sort(function(a,b) { return parseInt(a.id) - parseInt(b.id); });

            var wikitext = '<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 20px;">';
            $.each(matches, function(i, p) {
                var link = p.link || p.name;
                var t1 = p.types[0] ? capitalize(p.types[0].toLowerCase()) : '';
                var t2 = (p.types[1] && p.types[1] !== "" && p.types[1] !== p.types[0]) ? capitalize(p.types[1].toLowerCase()) : '';
                
                var typesMarkup = '{{typecolor|' + t1 + '}}';
                if (t2 !== '') { typesMarkup += '{{typecolor|' + t2 + '}}'; }

                wikitext += '<div style="width: 140px; text-align: center; font-size: 90%">' +
                            '[[File:Icon' + p.id + '.gif|link=' + link + ']]<br>' +
                            '<div style="margin-top: 12px; white-space: nowrap;">[[' + link + '|' + p.name + ']]</div>' +
                            '<div>' + typesMarkup + '</div>' +
                            '</div>';
            });
            wikitext += '</div>';

            $output.html('<p style="text-align:center;">Rendering ' + matches.length + ' results...</p>');
            api.post({ action: 'parse', text: wikitext, contentmodel: 'wikitext' }).done(function(data) {
                if (data && data.parse) {
                    $output.html('<h3 style="text-align:center; color:#555;">Found ' + matches.length + ' Results</h3>' + data.parse.text['*']);
                }
            });
        });

        $('#btn-reset-search').on('click', function() {
            $('.search-input').val('');
            $('#search-results-display').empty();
        });
    }

    $(document).ready(initAdvancedSearch);
})();