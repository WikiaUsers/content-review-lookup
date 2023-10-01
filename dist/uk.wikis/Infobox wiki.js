// codename: wiu (wiki info util)
// cache: [link = data]
(function ($) {
 
    var f = {};
    f.cache = [];
 
    f.getValue = function (arr, vid) {
        // returns value by id
        // arr: array of {id, *}; vid: value id
        return arr.map(function (v) {
            return v.id === vid ? v['*'] : null;
        }).filter(Boolean)[0];
    };// getValue
 
    f.init = function ($content) {
        // gather targets: [link = [$elements]]
        var targets = [];
        $content.find('.wiki-infobox-input, [data-wiu-wiki]').each(function () {
            var link, target, $el, $this = $(this);
            if ($this.hasClass('wiki-infobox-input')) {
                link = f.link($this.text());
                $el = $this.closest('.portable-infobox');
            } else {
                link = f.link($this.data('wiuWiki'));
                $el = $this;
            }
            target = targets[link];
            if (target) {
                target.push($el);
            } else {
                targets[link] = [$el];
            }
        });// gather targets
        if (!Object.keys(targets).length) return;
        // get data
        Object.keys(targets).forEach(function (i) {
            var cache = f.cache[i],
                v = targets[i];
            // favicon
            f.favicon(i, v);
            // logo
            f.logo(i, v);
            if (cache) {
                f.update(v, cache);
                return;
            }
            f.getInfo(i)
            .done(function (data) {
                if (!data || data.error) {
                    console.log('wiu can\'t get data', i, data);
                    return this;
                }
                f.cache[i] = data;
                f.update(v, data);
                return this;
            })
            .fail(function (data) {
                console.log('wiu request failed', i, data);
                return this;
            });
        });// each targets
    };// init
 
    f.getInfo = function (l) {
        var def = $.Deferred();
        $.ajax({
            url: l + '/api.php',
            crossDomain: true,
            data: {
                action: 'query',
                titles: 'File:Site-logo.png',
                prop: 'imageinfo',
                iiprop: 'url',
                meta: 'siteinfo',
                siprop: 'statistics|general|category|variables',
                format: 'json',
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            type: 'GET',
        })
        .done(function (data) {
            if (!data || !data.query || data.error) {
                def.reject(data);
                return this;
            }
            var cityId = f.getValue(data.query.variables, 'wgCityId');
            // wiki details
            $.get('https://community.fandom.com/api/v1/Wikis/Details?ids=' + cityId)
            .done(function (dv1) {
                if (!dv1 || !dv1.items || dv1.error) {
                    def.reject(dv1);
                    return this;
                }
                var wikiInfo = dv1.items[cityId];
                if (!wikiInfo) {
                    def.reject(dv1);
                    return this;
                }
                data.query.statistics.hub = wikiInfo.hub;
                data.query.statistics.founding_user_id = wikiInfo.founding_user_id;
                data.query.statistics.creation_date = new Date(wikiInfo.creation_date + 'Z').toLocaleString();
                def.resolve(data);
            })
            .fail(function (dv1) {
                console.log('wiu api/v1 fail', dv1);
                def.reject(dv1);
                return this;
            });// get api/v1
        })
        .fail(function (data) {
            console.log('wiu api.php fail', data);
            def.reject(data);
            return this;
        });// get api.php
        return def.promise();
    };// getInfo
 
    f.update = function (targets, d) {
        var wordmark, wordmark_body,
            s = d.query.statistics,
            data = ['activeusers', 'admins', 'articles', 'edits', 'hub', 'images', 'lang', 'pages', 'founder', 'creation_date'],
            $targets = $(targets).map(function(){return this.toArray()});
            //server = f.getValue(d.query.variables, 'wgServer'),
            //scriptPath = f.getValue(d.query.variables, 'wgScriptPath');
        // api/v1 stuff (hub, founding_user_id etc) added by .getInfo to .query.statistics
        s.lang = d.query.general.lang;
        $targets = $.unique($targets);
 
        $.each(data, function (i, v) {
            // .map cuz .find doesn't work on top-lvl el's
            var $target = $targets.map(function () {
                var $temp, $this = $(this);
                if ($this.hasClass('wiki-infobox-' + v)) return this;
                $temp = $this.find('.wiki-infobox-' + v);
                if ($temp.length) return $temp.toArray();
            });
            $target.text(s[v]);
            switch (v) {
            case 'articles':
                $target.each(function () {
                    var $this = $(this);
                    if ($this.data('newplural') !== undefined) {
                        var pages, second = 0, result = s[v].toString(), last = result.slice(-1);
                        if (result.length > 1) {
                            second = result.slice(-2)[0];
                        }
                        if (second === '1') {
                            pages = 'статей';
                        } else if (last === '1') {
                            pages = ($this.data('newplural') !== 0) ? 'статтю' : 'стаття';
                        } else if (['2', '3', '4'].indexOf(last) !== -1) {
                            pages = 'статті';
                        } else {
                            pages = 'статей';
                        }
                        $this.text($this.text() + ' ' + pages);
                    }
                });
                break;
            case 'founder':
                // user details
                if (!s.founding_user_id) break;
                $.get('/api/v1/User/Details?ids=' + s.founding_user_id)
                .done(function (data) {
                    if (!data || !data.items || data.error) return this;
                    var userInfo = data.items[0];
                    if (!userInfo) return this;
                    var founder = userInfo.name || userInfo.title;
                    $target.each(function () {
                        var $founder = {},
                            $this = $(this),
                            fmt = $this.data('format') || 'plain';
                        switch (fmt) {
                        case 'article':// link to local article
                            $founder = $('<a>', {
                                href: wgArticlePath.replace('$1', founder),
                                text: founder,
                            });
                            break;
                        case 'guser':// link to global profile
                            $founder = $('<a>', {
                                href: 'https://community.fandom.com/wiki/user:' + founder,
                                text: founder,
                            });
                            break;
                        case 'plain':// plain text
                            // default sanitized plain-texted founder
                            $founder.get = function () { return {outerHTML: $.htmlentities(founder)}; };
                            break;
                        case 'user':// link to local profile
                            $founder = $('<a>', {
                                href: wgArticlePath.replace('$1', 'user:' + founder),
                                text: founder,
                            });
                            break;
                        default:// user-defined format
                            $founder = $('<a>', {
                                href: fmt.replace('$1', founder),
                                text: founder,
                            });
                        }
                        $this.html($founder.get(0).outerHTML);
                    });
                    return this;
                });// done userinfo
                break;
            case 'hub':
                // new hub logic
                $target.each(function() {
                    var $this = $(this);
                    $this.attr('data-wiu-hub', s.hub);
                });
                break;
            case 'lang':
                // new lang logic
                $target.each(function() {
                    var $this = $(this);
                    $this.attr('data-wiu-lang', s.lang);
                });
                break;
            }// switch v
        });// each in data
 
        // Мова
        //$targets.find( '.wiki-infobox-lang' ).text( d.query.general.lang );
 
        // Початок заповнення логотипу
        if (!$targets.find('.wiki-infobox-wordmark').length) return;
        /*
        $.each( d.query.pages, function( k,v ) {
            wordmark = v.imageinfo[ 0 ].url;
        });
        */
        var iinfo = d.query.pages[Object.keys(d.query.pages)[0]].imageinfo;
        wordmark = (iinfo && iinfo[0]) ? iinfo[0].url : 'video151';
 
        if (wordmark.match('video151')) { // Якщо логотипу не існує
            wordmark_body = '<span class=".wiki-infobox-nowordmark">—</span>';
        } else {
            wordmark_body = $('<img>', {src: wordmark}).get(0).outerHTML;
        }
 
        $targets.find('.wiki-infobox-wordmark').html(wordmark_body);
        // Кінець заповнення логотипу
    };// update
 
    f.link = function(l) {
        // l supposed to be simplified to lang.wiki
        var alink = l.split('.');
        if (alink.length === 1) {
            // no lang part (wiki)
            l = 'https://' + alink[0] + '.fandom.com';
        } else if (alink.length === 2) {
            // has lang part (lang.wiki)
            l = 'https://' + alink[1] + '.fandom.com/' + alink[0];
        } else {
            // full url or other weird stuff
            // backward compatibility for
            if (l.indexOf('/wiki/') > -1) {
                l = l.replace(/\/wiki\/.*/, '');
            }
            if (l.indexOf('http://') !== 0 && l.indexOf('https://') !== 0 && l.indexOf('//') !== 0) {
                l = 'https://' + l;
            }
            l = l.replace(/^(http:\/\/|\/\/)/i, 'https://');
            if (l.indexOf('.wikia.com') === -1) {
                l = l + '.wikia.com';
            }
        }
        return l;
    };// link
 
    f.favicon = function(wiki, els) {
        // Фавікони
        // Автор - fngplg
        var $content = els.filter(function($el){return $el.hasClass('portable-infobox')})[0];
        if (!$content || !$content.length) return;
        var document = $content.get(0);
        document.querySelectorAll('.favicon').forEach(function(e) {
            if (typeof e.dataset.url !== 'undefined') {
                var a = e.dataset.url.split(':'),
                    img = new Image;
                img.src = wiki + '/wiki/special:filepath/Site-favicon.ico';
                e.appendChild(img);
                img.addEventListener('error', function (err) {
                    err.target.src = 'https://images.wikia.nocookie.net/__cb1531133815/common/skins/common/images/favicon.ico';
                }, {once: !0, passive: !0});
            }
        });
    };// favicon
 
    f.logo = function(wiki, els) {
        // Фон для лого 
        // Автор - fngplg
        function addCss(theme) {
            var css = ':root {',
                cssPrefix = '--foreign-theme-';
            $.each(theme, function (i, v) {
                css += cssPrefix + i + ':' + (v || wgSassParams[i]) + ';\n';
            });
            css += '}';
            window.foreignTheme = true;
            mw.util.addCSS(css);
        }// addCss
 
        if (window.foreignTheme && window.wgAction !== 'edit') return;
        var $content = els.filter(function($el){return $el.hasClass('portable-infobox')})[0];
        if (!$content || !$content.length) return;
 
        wiki = wiki + '/wikia.php?controller=MercuryApi&method=getWikiVariables&format=json';// thnx to kocka
        $.get(wiki)
        .done(function (data) {
            if (!data || !data.data || data.error) return;
            data = data.data;
            addCss(data.theme);
        })
        .fail(function (data) {
            // don't try old wikia.com path, try wikia.org one
            if (data && data.status === 404) return;
            wiki = wiki.replace('.fandom.com', '.wikia.org');
            $.get(wiki)
            .done(function (data) {
                if (!data || !data.data || data.error) return;
                data = data.data;
                addCss(data.theme);
            });
        });
    };// logo
 
    mw.hook('wikipage.content').add(f.init);
})(jQuery);