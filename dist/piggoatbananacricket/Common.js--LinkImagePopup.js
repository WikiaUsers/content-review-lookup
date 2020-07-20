// LinkImagePopup by Bobogoobo (credit to MLP Wiki): shows a popup image of a character/episode/location upon hovering over a link to it.
//To delete stored data: window.sessionStorage.removeItem('linkPopupStorage');
//To disable the script: in your Special:MyPage/wikia.js add: window.linkImagePopupDisabled = true;
//To disable sessionStorage caching: window.linkImagePopupCachingDisabled = true;
//for testing: window.sessionStorage.removeItem('linkPopupStorage');$('#mw-content-text a').off('mouseover').off('mouseout');
$(function() {
    //These lists need to be updated manually
    var names = {}, cacheEnabled = (window.linkImagePopupCachingDisabled ? false : true), pendingPages = {},
      categories = ['Antagonists', 'Females', 'Males',
      'Characters',
      //character categories
      'Season 1 Episodes', 'Season 2 Episodes'
      ,//episode categories
      'Locations',//location categories
      ], exceptions = [ ],//included pages with no representative image (also detected automatically)
      lists = [ ],//listofponies-class lists of characters
      mouseIsOver;

    //Load cache or create the list of pages
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
            $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=Category:' + enc(value) +
              '&cmprop=title&cmtype=page&cmlimit=max&format=json', function(data) {
                data = data.query.categorymembers;
                $.each(data, function(idx, val) {
                    if (
                      ! names[val.title] &&
                      val.title.substring(0, 8) !== 'List of ' &&
                      exceptions.indexOf(val.title) === -1
                    ) {
                        names[val.title] = '';
                    }
                });
                pending -= 1;
                if (pending === 0) {
                    //I put these way down here to avoid race conditions (if JS doesn't handle those itself?)
                    //  and to get the most important stuff first
                    $.each(lists, function(index2, value2) {
                        pending2 += 1;
                        $.getJSON('/api.php?action=parse&page=List_of_' + enc(value2) +
                          '&prop=wikitext&format=json', function(data2) {
                            data2 = data2.parse.wikitext['*'];
                            var re = /\|\-\n\|.*\{\{[Cc]ellanchor\|([^\}]*)\}\}.*\[\[File\:(.*(?:png|jpg)).*\n/g;
                            var match;
                            while ((match = re.exec(data2)) !== null) {
                                if (names[match[1]] === undefined) {
                                    names[match[1]] = {'file': match[2]};
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
            //link is on more than one line
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
        
        //If a link to a list page, extract the character name (actually the anchor used)
        if (name.substr(0, 8) === 'List of ' && name.indexOf('#') !== -1) {
            name = name.substring(name.indexOf('#') + 1);
        }

        if (name === '' || names[name] === undefined || pendingPages[name]) {
            mouseIsOver = false;
            return;
        }
        
        //Skip if link contains an image or is in a navbox with images (e.g. Episodes)
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

        //Interestingly, the imageinfo API won't give you a thumbnail larger than the image's dimensions
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
                
                //For double-character pages, find two relevant images
                if (name.indexOf(' and ') !== -1) {
                    var iboxMatch = data.match(/\{\{[Ii]nfobox character/g);
                    if (iboxMatch.length > 1) {
                        fileRe.lastIndex = data.lastIndexOf(iboxMatch[1]);
                    }
                    file2 = fileRe.exec(data);//null if no second match
                    if (file2) { file2 = file2[1] || file2[2]; }//as below
                }

                var result = file[1] || file[2];//whichever one actually matched
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
            //Image from a list page, need to get its data
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
            //Data already cached
            showPopup(name, $this, e);
        }
    });

    $('#mw-content-text a').on('mouseout', function() {
        $('.profilePopup').remove();
        mouseIsOver = false;
    });
});