/* Any JavaScript here will be loaded for all users on every page load. */

// PonyStats by Bobogoobo
// applies to Special:BlankPage?blankspecial=ponystats
// imported through Common.js
// todo: make it look nicer and try for more efficiency.
//   I should do one loop over each table instead of one loop for each function. Major restructure yay
//   Also add more features (I'm open to suggestions, currently working on stuff in the forum)
//  keep working on name stuff, obviously.
//    Maybe I should include placeholder names in there too, since there are so few official ones.
//   add TOC
//   make separation in Totals less ghetto
//   add toFixed to hasarticle in Totals (need to make the line not wrap >_>)
//   analyze names (and maybe first appearances?)
//   maybe add number of official names (just need to check for bold, right?)
//   should probably differentiate duplicates from characters with articles (just check for link going to LOP)
//   should explain why stuff is excluded
//   add a border every 16 cells in the tables (add 16px(?) to table width, update container width)
//   add combined stats for coat, mane, eyes
//   put the first section into a table or something to be neater and more comparable
//   find a way to make a consistent vertical graph interval without squishing the graphs too much.
//   maybe for the Chrome thing I could try creating a new element and see if I can get it to convert to rgb.
//   clever thing I came up with but didn't end up needing: obj[foo] = (obj[foo] || 0) + 1;
// be careful when adding a new list, a lot of stuff is determined on index variables. I should change that.
// remember that the Crystal and Wonderbolt lists are all transcluded.
$(function() {
    var $content = $('#mw-content-text > p'),
      $heading = ($('#WikiaPageHeader').length ? $('#WikiaPageHeader') : $('.AdminDashboardArticleHeader')).children('h1'),
      ponylists = ['Daftar poni/Poni bumi', 'Daftar poni/Poni pegasus',
          'Daftar poni/Poni unikorn', 'Daftar Poni Kristal',
          'Daftar poni/Anak kuda', 'Daftar poni/Poni yang disebutkan'],
      otherlists = ['Daftar Wonderbolt', 'Daftar poni komik',
          'Daftar karakter Equestria Girls'],
      done = 0, progress = 0,
      totals = { 'chars':0, 'earth':0, 'pegasus':0, 'unicorn':0,
          'mare':0, 'stallion':0, 'filly':0, 'colt':0 },
      hasarticle = { 'total':0, 'Earth':0, 'Pegasus':0, 'Unicorn':0, 'Crystal':0, 'Foal':0, 'Mentioned':0,
          'Comic':0, 'EG':0 },
      names = { 'total':0, 'status':{ 'official':0, 'poll':0, 'other':0 }, 'list':{} },
      colors = { 'chars':0, 'coat':{}, 'mane':{}, 'eyes':{} };

    var getStat = { //because I can?
        'maximum': function(obj) {
            var max = 0;
            for (var x in obj) {
                if (obj[x] > max) {
                    max = obj[x];
                }
            }
            return max;
        },

        'mean': function(obj) {
            var total = 0, count = 0;
            for (var x in obj) {
                count += obj[x];
                total += x * obj[x]; //specific for colors object, should fix (idea: pass weight function)
            }
            return (total / count).toFixed(2);
        },

        'median': function(obj) {
            var arr = [];
            for (var x in obj) {
                for (var i = 0; i < obj[x]; i++) {
                    arr.push(x);
                }
            }
            arr.sort(function(a, b) { return a - b; }); //numerical
            if (arr.length % 2) {
                return arr[Math.floor(arr.length / 2)];
            } else {
                return (+arr[arr.length / 2] + +arr[(arr.length / 2) - 1]) / 2;
            }
        }
    };

    function doStuff($list, num, title, contains, text, add, index) {
        var selector = '', result;
        if (title) {
            selector = ' a[title="' + title + '"]';
        } else if (contains) {
            selector = ':contains("' + contains + '")';
        } else {
            selector = ':empty';
        }

        result = $list.find('td:nth-child(' + num + ')' + selector).length;
        if (add && index !== 3) {
            totals[add] += result;
        }
        return result + text;
    }

    function checkProgress() {
        var $span = $content.find('p:first span span');
        progress += 1;
        $span.html(Math.round(
            progress / (ponylists.length + otherlists.length) * 100
        ));
        if ($span.html() === '100') {
            $span.parent().css('color', 'green');
        }
    }

    function countArticles($html, which, index) {
        var thiscount = 0;
        if (which === 'pony' || (which === 'other' && index !== 0)) {
            $('.listofponies tr:not(:first)', $html).each(function() {
                if (
                  /^See <a.*>(.*)<\/a>\.$/.test($(this).find('td:nth-child(8)').html()) ||
                  (which === 'other' && index === 2 && $(this).find('td:first').find('a[href^="/wiki/"]').length > 0)
                ) {
                    hasarticle[{'pony':{0:'Bumi',1:'Pegasus',2:'Unikorn',3:'Kristal',4:'Anak kuda',5:'Disebutkan'},
                      'other':{1:'Komik',2:'EG'}}[which][index]] += 1;
                    hasarticle.total += 1;
                    thiscount += 1;
                }
            });
            return thiscount;
        }
        return null;
    }

    function parseNames($html, which, index) {
        if ((which === 'pony' && index === 3) || (which === 'other' && index === 0)) {
            return;
        }

        $('.listofponies tr:not(:first) td:nth-child(1)', $html).each(function() {
            var name = $(this).text().replace('[sic]', '');

            if (names.list[name] !== '') {
                if ($(this).find('b').length) {
                    names.status.official += 1;
                    names.list[name] = ''; //using a dictionary ignores duplicates (irrelevant now that I moved this ;_;)
                } else if ($(this).find('a').length) {
                    names.status.poll += 1;
                } else {
                    names.status.other += 1;
                }
                names.total += 1;
            }
        });
    }

    function parseColors($html, which, index) {
        if (
          (which === 'pony' && index === 3) ||
          (which === 'other' && (index === 0 || index === 1))
        ) { return; }

        function getValues(str) {
            //Probably browser-dependent. In fact, Chrome and Firefox give some different values.
            var arr = str.replace('rgb(', '').replace(')', '').split(', ');
            return [parseInt(arr[0], 10), parseInt(arr[1], 10), parseInt(arr[2], 10)];
        }

        if (colors.chars === 0) { //initialize object structure
            for (var type in {'coat':'','mane':'','eyes':''}) {
                for (var color in {'r':'','g':'','b':''}) {
                    colors[type][color] = { 'total':0, 'count':{} };
                    for (var i = 0; i < 256; i++) {
                        colors[type][color].count[i] = 0;
                    }
                }
            }
        }

        $('.listofponies tr:not(:first)', $html).each(function() {
            var cols = {'coat':4, 'mane':5, 'eyes':6}, vals = {0:'r', 1:'g', 2:'b'},
              added = false, $cell, values, bg;

            for (var type in cols) {
                $cell = $(this).find('td:nth-child(' + cols[type] + ')');
                bg = $cell.css('background-color');

                if ( //all the ways we indicate unknown colors :P
                  $.trim($cell.html()) &&
                  !($cell.find('span[title="unknown"]').length) &&
                  (bg.indexOf('rgb(') !== -1 || bg === 'black')
                ) {
                    if (bg === 'black') { bg = 'rgb(0, 0, 0)'; } //workaround for Chrome
                    values = getValues(bg);

                    for (var color in vals) {
                        colors[type][vals[color]].total += values[color];
                        colors[type][vals[color]].count[values[color]] += 1;
                    }
                    if (!added) {
                        colors.chars += 1;
                        added = true;
                    }
                }
            }
        });
    }

    $heading.html('PonyStats');
    document.title = 'PonyStats - ' + mw.config.get('wgSitename');
    $content.html(
      '<p><span style="font-size:125%;">Kemajuan: <span>0</span>%.</span><br />' +
        'Tolong buat saran dan laporkan kesalahan <a href="/wiki/Pembicaraan_Pengguna:Ivan_the_Brony_Kaiju" ' +
        'title="Pembicaraan Pengguna: Ivan the Brony Kaiju">di sini</a>.<br /><b>Halaman ini saat ini tidak terawat. ' +
        'Mohon berikan saran jika kamu ingin melihat proyek ini dihidupkan kembali. </b></p>' +
      '<p>Perhatikan bahwa halaman ini tidak menyertakan poni yang hanya muncul di barang dagangan atau di ' +
        '<a href="/wiki/Project:Bengkel/Daftar_poni_prosa">literatur</a> (belum lagi).</p>' +
      '<h2>Daftar utama</h2><ul id="ps-ponies"></ul>' +
      '<h2>Daftar lain</h2><ul id="ps-other"></ul>' +
      '<h2>Total</h2><p>Ini termasuk daftar utama, kecuali poni Kristal, ditambah komik. ' +
        'Total karakter termasuk semua kecuali Kristal dan Wonderbolt.</p><ul id="ps-total"></ul>' +
      '<h2>Statistik</h2><ul id="ps-stats"></ul>'
    );

    function ponylist(page, index) {
        $.getJSON('/id/api.php?action=parse&page=' + page + '&prop=text&format=json', function(data) {
            var $html = $('<div>' + data.parse.text['*'] + '</div>'), $li, chars,
              $list = $('.listofponies', $html), hasArticle;

            $('#ps-ponies').append($('<li />', {
                'id': 'ps-' + page.replace('/', '-'),
                'html': '<a href="/wiki/' + page + '" title="' + page.replace(/_/g, ' ') + '">' +
                  ($('#title-meta', $html).text() || page.replace(/_/g, ' ')).replace('Daftar ', '') + '</a>: '
            }));
            $li = $('#ps-' + page.replace('/', '-'));

            chars = $list.find('tr').length - 1;

            $li.append(
              chars + ' | ',
              doStuff($list, 3, 'mare', '', ' mares, ', 'mare', index),
              doStuff($list, 3, 'stallion', '', ' stallions', 'stallion', index)
            );
            if (index !== 3) {
                totals.chars += chars;
            }
            if (index > 2) {
                $li.append(', ',
                    doStuff($list, 3, 'filly', '', ' fillies, ', 'filly', index),
                    doStuff($list, 3, 'colt', '', ' colts, ', 'colt', index),
                    doStuff($list, 3, '', '', ' unknown | '),
                    doStuff($list, 2, 'earth', '', ' Earth, ', 'earth', index),
                    doStuff($list, 2, 'pegasus', '', ' Pegasus, ', 'pegasus', index),
                    doStuff($list, 2, 'unicorn', '', ' Unicorn, ', 'unicorn', index),
                    doStuff($list, 2, 'Alicorn', '', ' Alicorn, ', '', index),
                    doStuff($list, 2, '', '', ' unknown')
                );
            } else {
                $li.append(', ', doStuff($list, 3, '', '', ' unknown'));
                switch (index) {
                    case 0:
                        totals.earth += chars; break;
                    case 1:
                        totals.pegasus += chars; break;
                    case 2:
                        totals.unicorn += chars; break;
                }
            }

            parseNames($html, 'pony', index);
            parseColors($html, 'pony', index);
            hasArticle = countArticles($html, 'pony', index);
            if (hasArticle !== null) {
                $li.append(' | ' + hasArticle + ' (' + Math.round(hasArticle / chars * 100) + '%) has articles');
            }

            checkProgress();
            if (index < ponylists.length - 1) {
                ponylist(ponylists[index+1].replace(/ /g, '_'), index+1);
            } else if (done === 1) {
                finish();
            } else {
                done += 1;
            }
        });
    }
    ponylist(ponylists[0].replace(/ /g, '_'), 0);

    function otherlist(page, index) {
        $.getJSON('/id/api.php?action=parse&page=' + page + '&prop=text&format=json', function(data) {
            var $html = $('<div>' + data.parse.text['*'] + '</div>'), $li, chars,
              $list = $('.listofponies', $html), hasArticle;

            $('#ps-other').append($('<li />', {
                'id': 'ps-' + page.replace('/', '-'),
                'html': '<a href="/wiki/' + page + '" title="' + page.replace(/_/g, ' ') + '">' +
                  ($('#title-meta', $html).text() || page.replace(/_/g, ' ')).replace('Daftar ', '') + '</a>: '
            }));
            $li = $('#ps-' + page.replace('/', '-'));

            chars = $list.find('tr').length - 1;

            $li.append(chars + ' | ');
            switch (index) {
                case 0:
                    $li.append(
                        doStuff($list, 3, 'mare', '', ' mares, '),
                        doStuff($list, 3, 'stallion', '', ' stallions, '),
                        doStuff($list, 3, '', '', ' unknown')
                    );
                    break;
                case 1:
                    totals.chars += chars;
                    $li.append(
                        doStuff($list, 3, 'mare', '', ' mares, ', 'mare'),
                        doStuff($list, 3, 'stallion', '', ' stallions, ', 'stallion'),
                        doStuff($list, 3, 'filly', '', ' fillies, ', 'filly'),
                        doStuff($list, 3, 'colt', '', ' colts, ', 'colt'),
                        doStuff($list, 3, '', '', ' unknown | '),
                        doStuff($list, 2, 'earth', '', ' Earth, ', 'earth'),
                        doStuff($list, 2, 'pegasus', '', ' Pegasus, ', 'pegasus'),
                        doStuff($list, 2, 'unicorn', '', ' Unicorn, ', 'unicorn'),
                        doStuff($list, 2, 'Alicorn', '', ' Alicorn, ', ''),
                        doStuff($list, 2, '', '', ' unknown')
                    );
                    break;
                case 2:
                    totals.chars += chars;
                    $li.append(
                        doStuff($list, 3, '', 'P', ' females, '),
                        doStuff($list, 3, '', 'L', ' males, '),
                        doStuff($list, 3, '', ' ', ' n/a | '),
                        doStuff($list, 2, '', 'Atlet', ' athletes, '),
                        doStuff($list, 2, '', 'Fashionista', ' fashionistas, '),
                        doStuff($list, 2, '', 'Drama', ' dramas, '),
                        doStuff($list, 2, '', 'Ramah lingkungan', ' eco-kids, '),
                        doStuff($list, 2, '', 'Teknisi', ' techies, '),
                        doStuff($list, 2, '', 'Pemain music rok', ' rockers, '),
                        doStuff($list, 2, '', 'Staf', ' staff, '),
                        doStuff($list, 2, '', 'Hewan', ' animals, '),
                        doStuff($list, 2, '', 'Pelawak', ' comedians, '),
                        doStuff($list, 2, '', 'Tidak terdefinisi', ' undefined')
                    );
                    break;
            }

            parseNames($html, 'other', index);
            parseColors($html, 'other', index);
            hasArticle = countArticles($html, 'other', index);
            if (hasArticle !== null) {
                $li.append(' | ' + hasArticle + ' (' + Math.round(hasArticle / chars * 100) + '%) have articles');
            }

            checkProgress();
            if (index < otherlists.length - 1) {
                otherlist(otherlists[index+1].replace(/ /g, '_'), index+1);
            } else if (done === 1) {
                finish();
            } else {
                done += 1;
            }
        });
    }
    otherlist(otherlists[0].replace(/ /g, '_'), 0);

    function finish() {
        $('#ps-total').append('<li>Characters: ' + totals.chars + '</li>');
        for (var type2 in {'earth':'','pegasus':'','unicorn':'','mare':'','stallion':'','filly':'','colt':''}) {
            if (type2 === 'earth' || type2 === 'mare') {
                $('#ps-total').append('<li></li>');
            }
            $('#ps-total').append('<li>' +
              type2.charAt(0).toUpperCase() + type2.substring(1) + ': ' +
              totals[type2] + ' (' + (totals[type2] / totals.chars * 100).toFixed(2) + '%)'
            );
        }

        $('#ps-stats').append(
            '<li>' + hasarticle.total + ' (' + Math.round(hasarticle.total / totals.chars * 100) + '%) have articles</li>',
            '<li>Lebih banyak statistik yang akan datang!</li>'
        ).after(
            '<h3>Nama</h3><div id="ps-names"><p>Tidak termasuk Kristal dan Wonderbolt.</p></div>',
            '<h3>Warna</h3><p>Menghitung daftar utama kecuali Kristal, ditambah EG (kulit/rambut/mata dalam kasus itu).' +
              ' Mungkin sedikit tidak akurat di Chrome.</p>',
            '<h4>Bulu</h4><div id="ps-colors-coat"></div>',
            '<h4>Surai</h4><div id="ps-colors-mane"></div>',
            '<h4>Mata</h4><div id="ps-colors-eyes"></div>'
        );

        (function nameStats() {
            var letters = {}, words = {}, wordsbyFreqDesc = [], totalLength = 0;

            for (var j = 65; j < 91; j++) { letters[String.fromCharCode(j)] = 0; } //initialize letters in order

            $('#ps-names').append('<p>Out of ' + names.total + ' characters\' names, ' +
              names.status.official + ' (' + (names.status.official / names.total * 100).toFixed(2) + '%) resmi ' +
              'dan ' + names.status.poll + ' (' + (names.status.poll / names.total * 100).toFixed(2) + '%) buka untuk ' +
              '<a href="/wiki/FW:PN" title="FW:PN">pemilihan</a>.</p>' +
              '<p>Statistik lebih lanjut di bagian ini hanya mencakup nama resmi.</p>'
            );

            for (var name in names.list) {
                totalLength += name.length;
                $.each(name.split(''), function(index, value) {
                    if (typeof letters[value.toUpperCase()] === 'number') { //temporary graph fix
                        letters[value.toUpperCase()] += 1;
                    }
                });
                $.each(name.toLowerCase().split(' '), function(index, word) {
                    if (words[word]) {
                        words[word] += 1;
                    } else {
                        words[word] = 1;
                        wordsbyFreqDesc.push(word);
                    }
                });
            }
            wordsbyFreqDesc.sort(function(a, b) {
                return words[b] - words[a];
            });

            $('#ps-names').append($('<ul></ul>').append(
                '<li>Panjang nama rata-rata: ' + (totalLength / names.status.official).toFixed(2) + '</li>',
                '<li id="ps-names-words">Kata-kata yang paling umum: </li>',
                '<li>Bagian ini sedang dalam pembangunan. c:</li>'
            ));

            for (var i = 0; i < wordsbyFreqDesc.length; i++) {
                if (i > 4 && words[wordsbyFreqDesc[i]] !== words[wordsbyFreqDesc[i-1]]) {
                    $('#ps-names-words').append('.');
                    break;
                } else {
                    $('#ps-names-words').append((i > 0 ? ', ' : '') +
                      wordsbyFreqDesc[i] + ' (' + words[wordsbyFreqDesc[i]] + ')');
                }
            }

            $('#ps-names').append('<table id="ps-names-letters" style="' +
              'border-collapse:collapse; width:262px; height:300px; border:1px solid black; padding:0;">' +
              '<caption><b>Frekuensi Huruf</b></caption><tr></tr></table>');
            for (var letter in letters) {
                $('#ps-names-letters tr').append('<td style="width:10px; vertical-align:bottom; padding:0;">' +
                  '<div title="' + letter + ' - ' + letters[letter] + '" style="width:100%; background:#F5ADFF; height:' +
                  Math.round(letters[letter] / getStat.maximum(letters) * 300) + 'px;"></div></td>'
                );
            }
            
            //development notes: use names.status.official for length of names.list.
            //  remember to continue as long as same value when printing wordsbyFreqDesc
            //add shortest and longest names, more stuff
            //there are a bunch of weird characters in letters, not sure why. Print them next to the graph.
        }());

        (function colorStats() {
            var $div, color, max = {};

            for (var type in {'coat':'','mane':'','eyes':''}) {
                $div = $('#ps-colors-' + type);
                max[type] = {};

                $div.append('Warna rata-rata: rgb(');
                for (var color2 in {'r':'','g':'','b':''}) {
                    $div.append(Math.round(colors[type][color2].total / colors.chars));
                    $div.append(color2 === 'b' ? ')' : ', ');
                }
                color = $div.text().replace('Warna rata-rata: ', '');
                $div.append(
                  ' <span style="color:' + color + '">' + color + '</span>',
                  ' <span style="background-color:' + color + '">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>'
                );

                for (var color3 in {'r':'','g':'','b':''}) {
                    $div.append('<table style="width:100%;"><tr><td style="width:780px;">' +
                      '<table id="ps-colors-' + type + '-' + color3 + '" style="' + 
                      'border-collapse:collapse; height:100px; width:770px; border:1px solid black; padding:0;">' +
                      '<tr></tr></table></td><td style="vertical-align:top;"><ul></ul></td></table>');

                    max[type][color3] = getStat.maximum(colors[type][color3].count);

                    for (var i = 0; i < 256; i++) {
                        $div.find('#ps-colors-' + type + '-' + color3 + ' tr').append(
                            '<td style="width:3px; vertical-align:bottom; padding:0;">' +
                            '<div title="' + i + ': ' + colors[type][color3].count[i] + '" style="width:100%; height:' +
                            Math.round(colors[type][color3].count[i] / max[type][color3] * 100) + 'px; background:' +
                            {'r':'red','g':'green','b':'blue'}[color3] + ';"></div></td>'
                        );
                    }

                    $div.find('#ps-colors-' + type + '-' + color3).parent().next().children().append(
                        '<li>Frekuensi maks: ' + max[type][color3] + '</li>',
                        '<li>Nilai rata-rata: ' + getStat.mean(colors[type][color3].count) + '</li>',
                        '<li>Nilai median: ' + getStat.median(colors[type][color3].count) + '</li>'
                    );
                }
            }
        }());
    }
});