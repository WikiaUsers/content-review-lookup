// Project in progress, see http://mlp.wikia.com/wiki/User:Bobogoobo/sandbox/PonyDesign
// Feel free to leave comments and suggestions on my talk page
// Description goes here
// By Bobogoobo
//todo: only need species on manes and tails, remove it from eyes and marks
//todo: need vastly improved documentation of data structures for future editing
//todo: more format checking
//todo: maybe should verify that all links for each pony identifier are the same
//      (would need new data structure to track them in parse), include presence of quotes
$(function() {
    // So I can test during development without having to save every edit
    if (mw.util.getParamValue('testing') && !window.ponyDesign) {
        return;
    }
    
    var designs = { 'manes': {}, 'tails': {}, 'eyes': {}, 'marks': {} };
    // Format: { manes: { style: { pony: { link, species, age, tags: { freq, sets }}}}}
    
    // Capitalizes first letter of given string and returns new string.
    function ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Returns given list as string with commas and/or "and" as appropriate.
    //  list: array of values to combine
    //  func: if values are not plain strings, provide function to access them
    function grammar(list, func) {
        var str = '';
        switch (list.length) {
            case 1:
                str = (func ? func(list[0]) : list[0]);
                break;
            case 2:
                if (func) {
                    str = func(list[0]) + ' and ' + func(list[1]);
                } else {
                    str = list.join(' and ');
                }
                break;
            default:
                if (func) {
                    for (var i = 0; i < list.length - 1; i++) {
                        str += func(list[i]) + ', ';
                    }
                    str += 'and ' + func(list[list.length - 1]);
                } else {
                    str = list.slice(0, list.length - 1).join(', ') +
                        ', and ' + list[list.length - 1];
                }
                break;
        }
        return str;
    }
    
    // Loads page code, splits into sections for processing.
    function loadPage() {
        var title = mw.config.get('wgPageName');
        var id = mw.config.get('wgArticleId');
        $.getJSON(
            '/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content' +
                '&format=json&titles=' + title,
            function(data) {
                var page = data.query.pages[id].revisions[0]['*'];
                page = page.split('\n==Start==\n')[1].split('\n==End==\n')[0];
                page = page.split('\n===Manes===\n')[1].split('\n===Tails===\n');
                parseText(page[0], 'manes');
                page = page[1].split('\n===Eyes===\n');
                parseText(page[0], 'tails');
                page = page[1].split('\n===Cutie Marks===\n');
                parseText(page[0], 'eyes');
                parseText(page[1], 'marks');
                $('#pony-designs').trigger('ponyDesignsLoaded');
                console.log(JSON.stringify(designs));
            }
        );
    }
    
    // Parses each line of the given section to be added to the data structure.
    //  text: the wikitext of the section
    //  which: which section is being processed (data structure key)
    function parseText(text, which) {
        var style, pony, page, species, isFoal = false, tags, skipped = {};
        var types = ['Crystal', 'Earth', 'Pegasus', 'Unicorn'];
        var freqs = ['always', 'usually', 'sometimes'];
        
        $.each(text.split('\n'), function(i, line) {
            if (!line || line.charAt(0) !== '*') {
                if (line.trim()) {
                    skipped[i.toString()] = [line, 'invalid line start'];
                }
                return true;
            }
            
            if (line.charAt(1) !== '*') {// One bullet = style
                style = line.slice(1).split(':')[0].trim().toLowerCase();
                while (designs[which][style] !== undefined) {
                    style = 'new-' + style;
                    skipped[i.toString()] = [
                        line, 'duplicate style name (not skipped)'
                    ];
                }
                designs[which][style] = {};
            } else if (line.charAt(2) !== '*') {// Two bullets = pony
                pony = line.slice(2).split(':')[0].trim();
                page = pony;
                if (page.indexOf('[') !== -1) {
                    page = pony.match(/\[\[([^\|\]]*)/);
                    if (page) {
                        page = page[1];
                    } else {
                        skipped[i.toString()] = [line, 'invalid link'];
                        return true;
                    }
                } else if (page.charAt(0) === '"') {
                    page = page.substring(1, page.length - 1);
                }
                species = ucfirst(line.slice(2).split(':')[1].trim());
                if (species.indexOf(',') !== -1) {
                    species = species.split(',');
                    if (ucfirst(species[1].trim()) === 'Foal') {
                        isFoal = true;
                    } else {
                        skipped[i.toString()] = [line, 'invalid pony type'];
                        return true;
                    }
                    species = species[0];
                }
                if (types.indexOf(species) === -1) {
                    skipped[i.toString()] = [line, 'invalid pony species'];
                    return true;
                }
                if (designs[which][style][page] !== undefined) {
                    skipped[i.toString()] = [line, 'duplicate pony in type'];
                    return true;
                }
                designs[which][style][page] = {
                    'link': pony,
                    'species': species,
                    'age': (isFoal ? 'Foal' : 'Adult'),
                    'tags': {
                        'freq': 'always',
                        'sets': ''
                    }
                };
            } else if (line.charAt(3) !== '*') {// Three bullets = tags
                // Skip if pony this is for was skipped
                if (skipped[(i - 1).toString()]) {
                    return true;
                }
                tags = line.slice(3).toLowerCase().split(',');
                if (freqs.indexOf(tags[0]) === -1) {
                    skipped[i.toString()] = [line, 'invalid frequency tag'];
                } else {
                    designs[which][style][page].tags.freq = tags[0];
                }
                if (tags.length > 1) {
                    if (tags[1] !== 'set1' && tags[1] !== 'set2') {
                        skipped[i.toString()] = [line, 'invalid set tag'];
                    } else {
                        designs[which][style][page].tags.sets = tags[1];
                    }
                }
            } else {
                skipped[i.toString()] = [line, 'invalid line format'];
                return true;
            }
        });
        printSkipped(skipped, which);
    }
    
    // Prints ignored lines and the reasons to the page.
    //  skips: object mapping line number (str) to array of (line text, reason)
    //  type: which section these are from
    function printSkipped(skips, type) {
        var text = '\n\n' + ucfirst(type === 'marks' ? 'Cutie Marks' : type) + ':';
        $.each(skips, function (key, val) {
            text += '\n[' + key + '] ' + val[1] + ': ' + val[0];
        });
        if (!Object.keys(skips).length) {
            text += '\nNo errors found.';
        }
        $('#pony-designs-errors').append(text);
    }
    
    // Analyzes data structures for matches for the given pony name.
    //  target: the link target (pony identifier) to look up
    //  pronoun: the pronoun to use for the pony (selected from interface)
    function analyzeCharacter(target, pronoun) {
        var entries = { 'manes': {}, 'tails': {}, 'eyes': {}, 'marks': {} };
        var matches = {}, sortedMatches = {}, hasSets = false;
        var typeHasMatches = [], hasMatchCount = 0;
        var output = '', errors = {};
        // List of similarity types, with the most important listed first.
        // "Design" means mane style, tail style, species, and age.
        var hierarchy = [
            'design-eyes-mark', 'design-eyes', 'design-mark', 'design',
            'mane-tail-eyes-mark', 'mane-tail-eyes', 'mane-tail-mark',
            'mane-tail', 'mane-eyes-mark', 'tail-eyes-mark',
            'mane-eyes', 'tail-eyes', 'mane-mark', 'tail-mark',
            'mane', 'tail', 'mark'
        ];
        var matchTypeDesc = {
            'design': 'design', 'mane': 'mane style', 'tail': 'tail style',
            'eyes': 'eye color', 'mark': 'cutie mark'
        };
        $.each(hierarchy, function(i, v) {
            sortedMatches[v] = [];
            typeHasMatches.push(0);
        });
        // For use with grammar() for frequency matches arrays
        var gFunc = function(m) {
            return Object.keys(m)[0];
        };
        
        // Append Or Create string b to a with hypen separator
        function aoc(a, b) {
            return (a ? a + '-' : a) + b;
        }
        
        // Gather all ponies that share styles with the target
        $.each(designs, function(type, styleList) {
            $.each(styleList, function(style, ponyList) {
                if (ponyList.hasOwnProperty(target)) {
                    entries[type][style] = $.extend({}, ponyList[target]);
                    if (ponyList[target].tags.sets) {
                        hasSets = true;
                    }
                    $.each(ponyList, function(pony, data) {
                        if (pony === target) {
                            return true;
                        }
                        if (matches[pony] === undefined) {
                            matches[pony] = [];
                        }
                        matches[pony].push(
                            $.extend({ 'part': type, 'style': style }, data)
                        );
                    });
                }
            });
        });
        
        // Sort matches by how much they share with the target
        $.each(matches, function(matchPony, matchList) {
            var matchRank = '', freqs = {};
            var isMatch = {
                'design': false, 'mane': false, 'tail': false,
                'species': false, 'age': false, 'eyes': false,
                'mark': false
            };
            $.each(matchList, function(i, matchData) {
                // For lookup only, do not modify
                var entry = entries[matchData.part][matchData.style];
                var matchType = {
                    'manes':'mane', 'tails':'tail', 'eyes':'eyes', 'marks':'mark'
                }[matchData.part];
                var freq1 = entry.tags.freq, freq2 = matchData.tags.freq;
                
                isMatch[matchType] = true;
                if (freq1 === 'sometimes' || freq2 === 'sometimes') {
                    freqs[matchType] = 'sometimes';
                } else if (freq1 === 'usually' || freq2 === 'usually') {
                    freqs[matchType] = 'usually';
                }
                
                if (matchData.species === entry.species) {
                    isMatch.species = true;
                }
                if (matchData.age === entry.age) {
                    isMatch.age = true;
                }
            });
            if (isMatch.mane && isMatch.tail && isMatch.species && isMatch.age) {
                isMatch.design = true;
            }
            // Map to an item in hierarchy
            if (isMatch.design) {
                matchRank = aoc(matchRank, 'design');
            } else {
                if (isMatch.mane) {
                    matchRank = aoc(matchRank, 'mane');
                }
                if (isMatch.tail) {
                    matchRank = aoc(matchRank, 'tail');
                }
            }
            if (isMatch.eyes) {
                matchRank = aoc(matchRank, 'eyes');
            }
            if (isMatch.mark) {
                matchRank = aoc(matchRank, 'mark');
            }
            if (hierarchy.indexOf(matchRank) !== -1) {
                // Just get link from first item, since they should all be the same
                sortedMatches[matchRank].push([matchList[0].link, freqs]);
            } else if (matchRank !== 'eyes') {
                errors['match-sorting'] = [matchRank, 'unidentified match type'];
            }
        });
        
        // For grammar calculation, mark which hierarchy items are not empty
        $.each(sortedMatches, function(t, m) {
            if (m.length) {
                typeHasMatches[hierarchy.indexOf(t)] = '1';
                hasMatchCount += 1;
            }
        });
        
        // Create output in hierarchy order with appropriate grammar
        $.each(hierarchy, function(j, matchType) {
            var ponyList = sortedMatches[matchType];
            var matchPieces, matchesExist, tempOutput = '';
            var alwaysMatches = [], usuallyMatches = [], sometimesMatches = [];
            
            if (!ponyList.length) {
                return true;
            }
            
            matchPieces = $.map(matchType.split('-'), function(piece) {
                return matchTypeDesc[piece];
            });
            
            // Sort list of matched pony data by link display text
            ponyList.sort(function(a, b) {
                function getName(link) {
                    if (link.indexOf('|') !== -1) {
                        return link.slice(
                            link.indexOf('|') + 1,
                            link.indexOf(']')
                        );
                    } else {
                        return link.slice(
                            link.lastIndexOf('[') + 1,
                            link.indexOf(']')
                        );
                    }
                }
                var pony1 = getName(a[0]), pony2 = getName(b[0]);
                if (pony1 < pony2) {
                    return -1;
                } else if (pony1 > pony2) {
                    return 1;
                } else {
                    return 0;
                }
            });
            
            // Group matches of this type by frequency
            //  Pony link is associated with frequency of each part of match
            $.each(ponyList, function(k, pony) {
                var obj = {}, lowest = 'always';
                obj[pony[0]] = {};
                $.each(matchType.split('-'), function(l, matchPart) {
                    var fre = pony[1][matchPart] || 'always';
                    obj[pony[0]][matchPart] = fre;
                    if (fre === 'usually' && lowest === 'always') {
                        lowest = 'usually';
                    }
                    if (fre === 'sometimes' && lowest !== 'sometimes') {
                        lowest = 'sometimes';
                    }
                });
                if (lowest === 'sometimes') {
                    sometimesMatches.push(obj);
                } else if (lowest === 'usually') {
                    usuallyMatches.push(obj);
                } else {
                    alwaysMatches.push(obj);
                }
            });
            
            matchesExist = (alwaysMatches.length ? '1' : '0') +
                (usuallyMatches.length ? '1' : '0') +
                (sometimesMatches.length ? '1' : '0');
            
            // Grammar for overall paragraph
            if (output && hasMatchCount > 2) {
                tempOutput += ';';
            }
            if (hasMatchCount > 1 && typeHasMatches.lastIndexOf('1') === j) {
                tempOutput += ' and';
            }
            
            if (matchesExist === '010') {
                tempOutput += ' usually';
            }
            if (matchesExist === '001') {
                tempOutput += ' sometimes';
            }
            
            tempOutput += ' shares ' + pronoun + ' ' + grammar(matchPieces);
            
            if (alwaysMatches.length) {
                tempOutput += ' with ' + grammar(alwaysMatches, gFunc);
                if (matchesExist === '111') {
                    tempOutput += ', ';
                } else if (matchesExist === '110' || matchesExist === '101') {
                    if (ponyList.length > 2) {
                        tempOutput += ',';
                    }
                    tempOutput += ' and ';
                }
            }
            if (usuallyMatches.length) {
                if (matchesExist !== '010') {
                    tempOutput += 'usually ';
                    if (!alwaysMatches.length) {
                        tempOutput += ' with ';
                    }
                } else {
                    tempOutput += ' with ';
                }
                tempOutput += grammar(usuallyMatches, gFunc);
                if (matchesExist === '111') {
                    tempOutput += ', and ';
                } else if (sometimesMatches.length) {
                    tempOutput += ' and ';
                }
            }
            if (sometimesMatches.length) {
                if (matchesExist !== '001') {
                    tempOutput += 'sometimes ';
                } else {
                    tempOutput += ' with ';
                }
                tempOutput += grammar(sometimesMatches, gFunc);
            }
            
            output += tempOutput;
        });
        if (output) {
            output += '.';
            $('#pony-designs-output').html('(PONY NAME)' + output);
        } else {
            errors['pony-search'] = [target, 'pony not found'];
        }
        // Scale to content
        $('#pony-designs-output').css(
            'height', $('#pony-designs-output')[0].scrollHeight
        );
        
        if (Object.keys(errors).length) {
            printSkipped(errors, 'analysis (' + target + ')');
        }
        
        //todo: distinguishing between cutie marks - only if more than one
        //  then only the match's frequency should be used
        
        //todo: Things to check after all matches are entered:
        //  check for species or age changing - "sometimes shares design"
        //  handle sets - multiple paragraphs.
        //    Example pages: Eiffel vs. Thorn
        
        //todo: if no commas are used, use commas instead of semicolons
        //      (0-2 matches per type, no matches with three parts)
        
        //todo: could work on more appropriate placement of "sometimes"
        //todo: also combine "mane style and tail style"
    }
    
    // Runs when the page loads to initialize the interface.
    (function init() {
        var $div = $('#pony-designs');
        $div.html('');
        
        //todo: shouldn't use right margins for layout
        //todo: condense this a bit? After finalizing code
        $div.append($('<button />', {
            'class': 'wikia-button',
            'id': 'pony-designs-prepare',
            'html': 'Prepare',
            'style': 'margin-right:1.5em;'
        }), $('<button />', {
            'class': 'wikia-button',
            'disabled': 'disabled',
            'id': 'pony-designs-analyze',
            'html': 'Analyze character:'
        }), ' ', $('<input />', {
            'id': 'pony-designs-character',
            'size': '30',
            'style': 'margin-right:1.5em;',
            'type': 'text'
        }), $('<label />', { 
            'for': 'pronoun',
            'html': 'Pronoun: '
        }), $('<input />', {
            'checked': 'checked',
            'name': 'pronoun',
            'type': 'radio',
            'value': 'his'
        }), $('<label />', {
            'for': 'his',
            'html': 'His'
        }), $('<input />', {
            'name': 'pronoun',
            'type': 'radio',
            'value': 'her'
        }), $('<label />', {
            'for': 'her',
            'html': 'Her'
        }), $('<input />', {
            'name': 'pronoun',
            'type': 'radio',
            'value': 'its'
        }), $('<label />', {
            'for': 'its',
            'html': 'Its'
        }), $('<pre />', {
            'html': 'ERRORS:',
            'id': 'pony-designs-errors',
            'style': 'margin-top:1em;'
        }), $('<textarea />', {
            'html': 'The output will display here.',
            'id': 'pony-designs-output',
            'style': 'margin-top:1em; width:100%;'
        })
        );
        
        $('#pony-designs-prepare').click(function() {
            $(this).attr('disabled', 'disabled');
            loadPage();
        });
        $('#pony-designs-analyze').click(function() {
            analyzeCharacter(
                $('#pony-designs-character').val(),
                $div.find('[name="pronoun"]:checked').val()
            );
        });
        // Enter key to submit
        $('#pony-designs-character').keypress(function(e) {
            if (e.which === 13) {
                $('#pony-designs-analyze').click();
            }
        });
        $div.on('ponyDesignsLoaded', function() {
            $('#pony-designs-analyze').removeAttr('disabled');
        });
    })();
});