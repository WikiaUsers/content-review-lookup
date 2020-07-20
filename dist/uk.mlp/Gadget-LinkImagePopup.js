// Автор скрипту Bobogoobo; детальний опис і оригінал тут: [[:en:MediaWiki:Common.js/LinkImagePopup.js]]
$(function() {
    //Список оновлюється вручну
    var names = {}, cacheEnabled = (window.linkImagePopupCachingDisabled ? false : true), pendingPages = {},
      categories = ['Алікорни', 'Антагоністи', 'Фонові персонажі', 'Кристальні поні',
      'Земні поні', 'Персонажі «Дівчата з Еквестрії»', 'Жіночі персонажі', 'Лошата', 'Чоловічі персонажі',
      'Персонажі не-поні', 'Створіння', 'Дракони', 'Грифони', 'Домашні улюбленці', 'Поні-пегаси', 'Другорядні персонажі',
      'Поні-єдинороги', 'Родина Епл',//категорії персонажів
      'Епізоди першого сезону', 'Епізоди другого сезону', 'Епізоди третього сезону', 
      'Епізоди четвертого сезону', "Епізоди п'ятого сезону", 'Епізоди шостого сезону', 
      'Епізоди сьомого сезону', 'Епізоди восьмого сезону', "Епізоди дев'ятого сезону",//категорії епізодів
      'Локації',//категорії локацій
      ], exceptions = ['Алікорни', 'Кристальні поні', 'Земні поні', 'Пегаси',  'Єдинороги', 'Лошата',
      'Фонові поні', 'Тварини', 'Люди', 'Неістоти', 'Створіння', 'Дракони', 'Грифони',
      ],//сторінки без головного зображення (розпізнаються автоматично)
      lists = ['поні з коміксів', 'персонажі «Дівчата з Еквестрії»', 'персонажі не-поні',
      'поні/Алікорни', 'поні/Кристальні поні', 'поні/Земні поні/Кобили', 'поні/Земні поні/Жеребці',
      'поні/Лошата', 'поні/Згадувані поні', 'поні/Пегаси', 'поні/Єдинороги',
      'поні з коміксів/Земні поні', 'поні з коміксів/Пегаси', 'поні з коміксів/Єдинороги',
      'поні з коміксів/Алікорни', 'поні з коміксів/Кристальні поні',
      ],//списки персонажів
      mouseIsOver;
 
    //Завантажує або створює список сторінок
    if (typeof window.sessionStorage !== 'undefined' && cacheEnabled &&
      typeof window.sessionStorage.linkPopupStorage !== 'undefined') {
        names = JSON.parse(window.sessionStorage.linkPopupStorage);
        console.log('LinkPopupImage data loaded from browser storage.');
    } else {
        if (typeof window.sessionStorage === 'undefined') {
            cacheEnabled = false;
        }
        var pending = 0, pending2 = 0;
        $.each(categories, function(index, value) {
            pending += 1;
            $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=Категорія:' + enc(value) +
              '&cmprop=title&cmtype=page&cmlimit=max&format=json', function(data) {
                data = data.query.categorymembers;
                $.each(data, function(idx, val) {
                    if (
                      ! names[val.title] &&
                      val.title.substring(0, 8) !== 'Список ' &&
                      exceptions.indexOf(val.title) === -1
                    ) {
                        names[val.title] = '';
                    }
                });
                pending -= 1;
                if (pending === 0) {
                    $.each(lists, function(index2, value2) {
                        pending2 += 1;
                        $.getJSON('/api.php?action=parse&page=Список_' + enc(value2) +
                          '&prop=wikitext&format=json', function(data2) {
                            data2 = data2.parse.wikitext['*'];
                            var re = /\|\-\n\|.*\{\{[Cc]ellanchor\|([^\}]*)\}\}.*\[\[File\:(.*(?:png|jpg)).*\n/g;
                            var match;
                            while ((match = re.exec(data2)) !== null) {
                                if (names[match[1]] === undefined) {
                                    names[match[1]] = {'файл': match[2]};
                                }
                            }
 
                            pending2 -= 1;
                            if (pending2 === 0) {
                                updateCache();
                            }
                        });
                    });
                }
            });
        });
    }
 
    function updateCache() {
        if (!cacheEnabled) {
            return;
        }
        window.sessionStorage.linkPopupStorage = JSON.stringify(names);
    }
 
    function enc(url) {
        return mw.util.wikiUrlencode(url);
    }
 
    function showPopup(name, $elem, ev) {
        if (!mouseIsOver) { return; }
 
        var data = names[name], abs = Math.abs;
        var multi = (data.url.indexOf('|') !== -1);
        var dUrl = data.url, dWidth = data.width, dHeight = data.height;
        if (multi) {
            dUrl = data.url.split('|')[0];
            dWidth = parseInt(data.width.split('|')[0], 10);
            dHeight = parseInt(data.height.split('|')[0], 10);
        }
        var showAbove = false, after = true, isSplit = false, left = $elem.offset().left;
        var offset, realWidth, $insert;
 
        if (
          dHeight < $elem[0].getBoundingClientRect().top &&
          (multi ? data.height.split('|')[1] : -1) < $elem[0].getBoundingClientRect().top
        ) {
            showAbove = true;  
        }
 
        if ($elem.height() >= $elem.css('font-size').replace('px', '') * 2) {
            //посилання на більше ніж одній стрічці
            isSplit = true;
            realWidth = $elem.clone().css('display', 'none').attr('id',
              'linkImagePopupRemove').appendTo($('body')).width();
            $('#linkImagePopupRemove').remove();
            if (ev.pageX > left + realWidth) {
                //link is before line break
                after = false;
                if (left !== $('#WikiaPageHeader h1').offset().left) {
                    offset = realWidth / 2;
                } else {
                    offset = (dWidth - (realWidth - (left - realWidth))) / 2;
                }
            } else {
                if (left !== $('#WikiaPageHeader h1').offset().left) {
                    offset = (dWidth - (ev.pageX - (left - realWidth)));
                } else {
                    offset = (dWidth - (left - realWidth)) / 2;
                }
            }
        } else {
            offset = (dWidth - $elem.width()) / 2;
        }
 
        $insert = $('<div />', {
            'class': 'profilePopup',
            'style': 'display:inline; position:relative; width:0;',
            'html': $('<img />', {
                'src': dUrl,
                'width': dWidth + 'px',
                'height': dHeight + 'px',
                'style': 'z-index:1000000; position:absolute; ' + (showAbove ? 'bottom' : 'top') +
                  ':1.5em; ' + (after ? 'right:' : 'left:') + (offset < 0 ? '' : '-') + abs(offset) + 'px;'
            }).after((!multi ? '' : $('<img />', {
                'src': data.url.split('|')[1],
                'width': data.width.split('|')[1] + 'px',
                'height': data.height.split('|')[1] + 'px',
                'style': 'z-index:1000000; position:absolute; ' + (showAbove ? 'bottom' : 'top') +
                  ':1.5em; ' + (after ? 'right:' : 'left:') + (offset < 0 ? '' : '-') +
                  (abs(offset) + dWidth) + 'px;'
            })))
        });
 
        if (after) {
            $elem.after($insert);
        } else {
            $elem.before($insert); 
        }
    }
 
    $('#mw-content-text a').on('mouseover', function(e) {
        var $this = $(this), name = decodeURIComponent($(this).attr('href').replace(/_/g, ' '));
        mouseIsOver = true;
 
        name = name.substring(($this.attr('href')[0] === '#' ? 1 : 6));//anchor-only link, or remove "/wiki"
 
        //При посиланні на сторінку списку використовується ім'я персонажа
        if (name.substr(0, 8) === 'Список ' && name.indexOf('#') !== -1) {
            name = name.substring(name.indexOf('#') + 1);
        }
 
        if (name === '' || names[name] === undefined || pendingPages[name]) {
            mouseIsOver = false;
            return;
        }
 
        //Пропуск, якщо посилання містить зображення або в навбоксі з зображеннями (напр. Епізоди)
        if (
          $this.find('img').length ||
          ($this.parent()[0].tagName === 'TD' &&
          $this.closest('tr').prev().find('td:nth-child(' +
          ($this.parent().index() + 1) + ') img').length) || 
          $this.closest('[style*=column-count]').length// http://i.imgur.com/U9H91Mi.png
        ) {
            mouseIsOver = false;
            return;
        }
 
        
        if (! names[name]) {
            //Image data not yet known
            pendingPages[name] = true;
            //wish query API modules would actually give you stuff in order
            $.getJSON('/api.php?action=parse&page=' + enc(name) + '&section=0&prop=wikitext&format=json',
              function(data) {
                data = data.parse.wikitext['*'];
                //Get the first image used in the wikitext, hopefully.
                var fileRe = /(?:\|.*\=\s*(.*(?:png|jpg))(?!.*\]\]).*\n|\[\[File\:(.*(?:png|jpg)))/g;
                var file = fileRe.exec(data);
                var file2;
                if (file === null) {
                    delete names[name];
                    updateCache();
                    mouseIsOver = false;
                    return false;
                }
 
                //Більше зображень для статей про декількох персонажів
                if (name.indexOf(' and ') !== -1) {
                    var iboxMatch = data.match(/\{\{[Ii]nfobox character/g);
                    if (iboxMatch.length > 1) {
                        fileRe.lastIndex = data.lastIndexOf(iboxMatch[1]);
                    }
                    file2 = fileRe.exec(data);
                    if (file2) { file2 = file2[1] || file2[2]; }
                }
 
                var result = file[1] || file[2];
                if (file2) { result += '|File:' + file2; }
                $.getJSON('/api.php?action=query&prop=imageinfo&titles=File:' + enc(result) +
                  '&iiprop=url&iiurlwidth=150&format=json', function(stuffs) {
                    var stuff = stuffs.query.pages[Object.keys(stuffs.query.pages)[0]].imageinfo[0];
                    names[name] = {'url':stuff.thumburl, 'width':stuff.thumbwidth, 'height':stuff.thumbheight};
 
                    if (file2) {
                        stuff = stuffs.query.pages[Object.keys(stuffs.query.pages)[1]].imageinfo[0];
                        names[name].url += '|' + stuff.thumburl;
                        names[name].width += '|' + stuff.thumbwidth;
                        names[name].height += '|' + stuff.thumbheight;
                    }
 
                    showPopup(name, $this, e);
                    delete pendingPages[name];
                    updateCache();
                });
            });
        } else if (names[name].file) {
            pendingPages[name] = true;
            $.getJSON('/api.php?action=query&prop=imageinfo&titles=File:' + enc(names[name].file) +
              '&iiprop=url&iiurlwidth=150&format=json', function(data) {
                data = data.query.pages[Object.keys(data.query.pages)[0]].imageinfo[0];
                names[name] = {'url':data.thumburl, 'width':data.thumbwidth, 'height':data.thumbheight};
                showPopup(name, $this, e);
                delete pendingPages[name];
                updateCache();
            });
        } else {
            showPopup(name, $this, e);
        }
    });
 
    $('#mw-content-text a').on('mouseout', function() {
        $('.profilePopup').remove();
        mouseIsOver = false;
    });
});