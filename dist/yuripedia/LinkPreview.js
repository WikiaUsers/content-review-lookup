/* Modified version of https://dev.fandom.com/wiki/LinkPreview */
/* 1. Removes Noimage Image */
/* 2. Limits Preview to Mainspace Articles */
/* 3. Restricts Usage in User Spaces */

(function wrapper ($) {
    var urlVars = new URLSearchParams(location.search);
    var Settings = window.pPreview || {},
        mwc = mw.config.get(['wgScriptPath', 'wgSassParams', 'wgArticlePath']);
    Settings.debug = urlVars.get('debug') || urlVars.get('debug1') || (Settings.debug !== undefined ? Settings.debug : false);

    // killswitch
    Settings.dontrun = urlVars.get('nolp');
    if (Settings.dontrun) return;

    // default values
    var Defaults = {
        dock: '#mw-content-text, #article-comments'
        // no defimage, no noimage
    };
    var pp = {};
    pp.sync = [];
    var ncache = [];
    var loc = {lefts: 5, tops: 5};
    var currentEl = {};
    var apiUri;

    Settings.wrapper = wrapper;
    Settings.context = this;
    Settings.f = {init: init, main: main, createuri: createUri, getpreview: ngetPreview,
                showpreview: nshowPreview, hidepreview: nhidePreview, cache: ncache,
                ignoreimage: nignoreImage, ignorepage: nignorePage, ignorelink: nignoreLink,
                cacheof: ncacheOf, chkimagesrc: chkImageSrc, preprocess: preprocess,
                elvalidate: elValidate};

    mw.loader.using(['mediawiki.util', 'mediawiki.Uri'], init);

    function log () {
        var a = [].slice.call(arguments);
        a.unshift('pp');
        if (Settings.debug) console.log.apply(this, a);
    }

    pp.start = function (e) {
        if (e) {
            if (pp.sync.indexOf(e) > -1) return false;
        }
        Settings.process = true;
        pp.sync.push(e || Settings.process);
        return true;
    };
    
    pp.stop = function (e) {
        hlpaHover();
        var epos = pp.sync.indexOf(e);
        if (epos !== -1) {
            pp.sync.splice(epos, 1);
        } else {
            pp.sync.splice(0, 1);
        }
        if (pp.sync.length === 0) {
            Settings.process = false;
        }
    };

    function init () {
        if (window.pPreview && window.pPreview.version) {
            log('init dbl run protection triggered');
            return;
        }
        
        var ns = mw.config.get('wgNamespaceNumber');
            if (ns === 2 || ns === 3) {  // 2 = User, 3 = User talk
            log('Preview disabled in User/User talk namespace');
            return;
        }
        
        Settings.version = '1.70';
        log('init vrsn:', Settings.version);
        apiUri = new mw.Uri({path: mwc.wgScriptPath + '/api.php'});

        Settings.apid = Settings.apid !== undefined ? Settings.apid : false;
        Settings.delay = Settings.delay !== undefined ? Settings.delay : 100;
        Settings.throttle = Settings.throttle !== undefined ? Settings.throttle : 100;
        Settings.throttling = false;
        Settings.process = false;
        Settings.tlen = Settings.tlen !== undefined ? Settings.tlen : 1000;
        Settings.pibox = Settings.pibox !== undefined ? Settings.pibox : false;
        Settings.piboxkeepprev = Settings.piboxkeepprev !== undefined ? Settings.piboxkeepprev : false;
        Settings.csize = Settings.csize !== undefined ? Settings.csize : 100;
        Settings.scale = Settings.scale !== undefined ? Settings.scale : {r: '?', t: '/scale-to-width-down/350?'};
        Settings.dock = !!Settings.dock ? Settings.dock : Defaults.dock;
        Settings.wholepage = urlVars.get('wholepage') || (Settings.wholepage !== undefined ? Settings.wholepage : false);
        Settings.RegExp = Settings.RegExp || {};

        Settings.RegExp.iimages = Settings.RegExp.iimages || [];
        Settings.RegExp.ipages = Settings.RegExp.ipages || [];
        Settings.RegExp.ilinks = Settings.RegExp.ilinks || [];
        Settings.RegExp.iparents = Settings.RegExp.iparents || ['[id^=flytabs] .tabs'];
        Settings.RegExp.iclasses = Settings.RegExp.iclasses || [];
        Settings.RegExp.onlyinclude = Settings.RegExp.onlyinclude || [];
        Settings.RegExp.noinclude = Settings.RegExp.noinclude || [];
        Settings.RegExp.wiki = Settings.RegExp.wiki || new RegExp('^.*?\/wiki\/', 'i');
        Settings.RegExp.dtag = Settings.RegExp.dtag || new RegExp('<.*>', 'gm');
        Settings.RegExp.prep = Settings.RegExp.prep || [];

        if (Settings.apid) {
            Settings.tlen = (Settings.tlen > 500) ? 500 : Settings.tlen;
        }

        Settings.fixContentHook = Settings.fixContentHook !== undefined ? Settings.fixContentHook : true;
        window.pPreview = Settings;

        var thisPage = (createUri(location) || {}).truepath;
        if (!thisPage || nignorePage(thisPage)) {
            mw.hook('wikipage.content').remove(main);
            log('ignore', thisPage);
            return;
        }

        var sasses = '';
        $.each(mwc.wgSassParams, function(k, v) {
            sasses += '--sass-' + k + ':' + v + ';\n';
        });
        if (sasses.length) {
            sasses = ':root {\n' + sasses + '}';
            mw.util.addCSS(sasses);
        }

        importArticle({type: 'style', article: 'u:dev:MediaWiki:LinkPreview.css'});

        if (Settings.debug) {
            Settings.cache = ncache;
        }

        Settings.RegExp.ilinks.push(thisPage);
        Settings.RegExp.ilinks.push(new RegExp(apiUri.path));

        var r;
        if (Settings.RegExp.prep instanceof RegExp) {
            r = Settings.RegExp.prep;
            Settings.RegExp.prep = [r];
        }
        if (!(Settings.RegExp.prep instanceof Array)) {
            Settings.RegExp.prep = [];
        }
        Settings.RegExp.prep.push(/<script>[\s\S]*?<\/script>/igm);
        Settings.RegExp.prep.push(/<ref>[\s\S]*?<\/ref>/igm);

        Settings.f.pp = pp;

        window.ajaxCallAgain = window.ajaxCallAgain || [];
        window.ajaxCallAgain.push(main);
        mw.hook('wikipage.content').add(main);
        mw.hook('ppreview.ready').fire(Settings);
    }
    
    function main ($cont) {
        log('main', $cont);
        if (Settings.fixContentHook && $cont && $cont.length) {
            Settings.fixContentHook = false;
            if ($cont.selector !== '#mw-content-text') {
                log('main fixcontent', $cont);
                main($('#mw-content-text'));
            }
        }
        var $content, arr = [];
        Settings.dock.split(',').forEach(function (v) {
            var $c = {};
            if ($cont) {
                $c = ($cont.is(v) || $cont.parents(v).length) ? $cont : {};
            } else {
                $c = $(v);
            }
            $.merge(arr, $c);
        });
        $content = $(arr);
        log('main.c:', $content);
        $content.find('a').each(function() {
            var $el = $(this);
            if (elValidate($el)) {
                $el.off('mouseenter.pp mouseleave.pp');
                $el.on('mouseenter.pp', aHover);
                $el.on('mouseleave.pp', nhidePreview);
            }
        });
    }
    
    function elValidate ($el) {
        var ahref = $el.attr('href'),
            bstop = false;
        if (!ahref) return false;
        ahref = createUri(ahref);
        if (!ahref || (ahref.hostname !== apiUri.host) || nignoreLink(ahref.truepath)) {
            return false;
        }

   // Main namespace check: block only if it starts with a known non-main namespace prefix
    var path = ahref.truepath;
    if (path.indexOf(':') !== -1) {
        var prefix = path.split(':')[0].trim().toLowerCase().replace(/_/g, ' '); // normalize spaces
        var blockedPrefixes = [
            'talk', 'user', 'user talk', 'yuri wiki', 'yuri wiki talk',
            'file', 'file talk', 'mediawiki', 'mediawiki talk',
            'template', 'template talk', 'help', 'help talk',
            'category', 'category talk', 'forum', 'forum talk',
            'geojson', 'geojson talk', 'user blog', 'user blog comment',
            'blog', 'blog talk', 'module', 'module talk',
            'message wall', 'thread', 'message wall greeting',
            'board', 'board thread', 'topic', 'map', 'map talk'
        ];
        if (blockedPrefixes.includes(prefix)) {
            log('elValidate blocked namespace prefix:', prefix, path);
            return false;
        }
    }


        if ($.isArray(Settings.RegExp.iclasses)) {
            Settings.RegExp.iclasses.forEach(function(v) {
                if ($el.hasClass(v)) {
                    log('elValidate classes', v, ahref.truepath);
                    bstop = true;
                }
            });
        }
        if (bstop) return false;

        if ($.isArray(Settings.RegExp.iparents)) {
            Settings.RegExp.iparents.forEach(function(v) {
                if ($el.parents(v).length) {
                    log('elValidate parents', v, ahref.truepath);
                    bstop = true;
                }
            });
        }
        if (bstop) return false;
        return true;
    }
    
    function chkImageSrc (src) {
        if (!src) return false;
        var url;
        try {
            url = new mw.Uri(src);
            return (/(\.wikia\.(com|org)|\.fandom\.com|\.wikia\.nocookie\.net)$/.test(url.host));
        }
        catch (e) {
            return false;
        }
    }
    
    function preprocess (text) {
        if (!(Settings.RegExp.prep instanceof Array) || Settings.RegExp.prep.length < 1) return '';
        var s = text,
            $s = $('<div>').html(s);

        if (Settings.RegExp.noinclude && (Settings.RegExp.noinclude instanceof Array)) {
            Settings.RegExp.noinclude.forEach(function(v){$s.find(v).remove();});
        }
        s = $s.html();

        if (Settings.RegExp.onlyinclude && (Settings.RegExp.onlyinclude instanceof Array)) {
            s = Settings.RegExp.onlyinclude.map(function(v) {
                var $v = $s.find(v);
                if ($v.length) {
                    $s.find(v).remove();
                    return $v.map(function() {return this.outerHTML}).toArray().join();
                } else {
                    return false;
                }
            })
            .filter(Boolean).join() || s;
        }
        
        Settings.RegExp.prep.forEach(function (v) {
            s = s.replace(v, '');
        });
        return s;
    }
    
    function createUri (href, base) {
        var h;
        try {
            h = new mw.Uri(href.toString());
            h.pathname = h.path;
            h.hostname = h.host;
        } catch (e) {
            h = undefined;
            log('createUrl.e', e);
        }
        if (h) {
            try {
                h.truepath = decodeURIComponent(h.pathname.replace(Settings.RegExp.wiki, ''));
                h.interwiki = h.path.split('/wiki/')[0];
                h.islocal = mwc.wgArticlePath.split('/wiki/')[0] === h.interwiki;
            }
            catch (e) {
                h = undefined;
                log('createuri decode.e', e, h, String(h));
            }
        }
        return h;
    }
        
    function hlpaHover () {
        if (Settings.throttling) {
            clearTimeout(Settings.throttling);
            Settings.throttling = false;
        }
    }
    
    function aHover (ev) {
        ev.stopPropagation();
        log('ahover ', Settings.throttling, currentEl.href);
        if (Settings.throttling || Settings.process) {
            return false;
        }
        Settings.throttling = setTimeout(hlpaHover, Settings.throttle);
        var hel = createUri($(ev.currentTarget).attr('href')) || {};
        if (hel && hel.truepath && currentEl.href == hel.truepath) {
            return false;
        }
        currentEl.href = hel.truepath;
        currentEl.islocal = hel.islocal;
        currentEl.interwiki = hel.interwiki;
        if (nignoreLink(currentEl.href)) {
            return true;
        }
        loc.left = ev.pageX;
        loc.top = ev.pageY;
        loc.clientX = ev.clientX;
        loc.clientY = ev.clientY;
        log('ahover ev:', ev, 'cel:', currentEl);
        setTimeout(ngetPreview.bind(this, ev), Settings.delay);
        return false;
    }
    
    function getObj (data, key) {
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                if (k === key) ret.push(data[k]);
                r = getObj(data[k], key);
                if (r) ret = ret.concat(r);
            }
        }
        return ret;
    }
    
    function getVal (data, key) {
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                r = getVal(data[k], key);
                if (r) ret = ret.concat(r);
            } else {
                if (k === key) ret.push(data[k]);
            }
        }
        return ret;
    }
    
    function hlpPreview (uri, div, img, force, withD) {
        var im = $('img', div);
        if (img) {
            im.attr('src', Settings.scale ? img.replace(Settings.scale.r, Settings.scale.t) : img);
        }
        // no else — no src = no image shown

        var d = {href: uri.truepath, data: div, uri: uri};
        ncache.push(d);
        if (Settings.debug) window.pPreview.pdiv = d.data;
        nshowPreview(d.data, d.uri, force);
        pp.stop(d.href);
    }
    
    function ngetPreview (ev, forcepath, withD) {
        var nuri = createUri($(ev.currentTarget).attr('href')) || {};
        nuri.truepath = forcepath || nuri.truepath;
        if (!nuri || !nuri.truepath) {
            log('gp no href', ev, forcepath);
            return;
        }
        if (!pp.start(nuri.truepath)) {
            log('gp suppressed dbl processing for', nuri);
            return;
        }

        log('gp uri: ', nuri, ' curel.href: ', currentEl.href, nuri.truepath === currentEl.href, 'd:', withD);
        if (!forcepath && !withD && (nuri.truepath != currentEl.href)) {
            pp.stop(nuri.truepath);
            return;
        }

        var ndata = ncacheOf(nuri.truepath);
        if (ndata) {
            log('gp show preview', ndata);
            nshowPreview(ndata.data, nuri, forcepath ? true : false);
            pp.stop(nuri.truepath);
            return false;
        }

        var apipage,
            iwrap = $('<img>'),  // ← no src by default
            twrap = $('<div>'),
            div = $('<div>', {class: 'npage-preview'});

        if (Settings.apid || withD) {
            apipage = new mw.Uri(nuri.interwiki + '/api/v1/Articles/Details');
            apipage.extend({titles: nuri.truepath, abstract: Math.min(Settings.tlen, 500)});
            log('gp apid', apipage);
            $.getJSON(apipage).done(function(data) {
                if (!data || data.error) {
                    log('gp apid.error', nuri, data);
                    Settings.RegExp.ilinks.push(nuri.truepath);
                    pp.stop(nuri.truepath);
                    return;
                }
                var item = data.items[Object.keys(data.items)[0]];
                if (!item) {
                    log('gp apid.noitem', nuri, data);
                    Settings.RegExp.ilinks.push(nuri.truepath);
                    pp.stop(nuri.truepath);
                    return;
                }
                if (item.thumbnail) {
                    iwrap.attr('src', item.thumbnail);
                }
                twrap.text(item.abstract);
                div.append(iwrap).append(twrap);
                hlpPreview(nuri, div, item.thumbnail, forcepath ? true : false, withD);
            })
            .fail(function(data) {
                log('gp apid.fail', nuri, data);
                Settings.RegExp.ilinks.push(nuri.truepath);
                pp.stop(nuri.truepath);
            });
            return;
        }

        apipage = new mw.Uri({path: nuri.interwiki + '/api.php'});
        apipage.extend({
            action: 'parse',
            page: nuri.truepath,
            prop: 'images|text',
            format: 'json',
            disablepp: '',
            redirects: '',
            smaxage: 600,
            maxage: 600
        });
        if (!Settings.wholepage) apipage.extend({section: 0});
        log('gp apip: ', apipage.toString());

        $.getJSON(apipage).done(function(data) {
            if (!data.parse) {
                log('gp apip. no valid data in', data);
                Settings.RegExp.ilinks.push(nuri.truepath);
                pp.stop(nuri.truepath);
                return;
            }
            var img = data.parse.images.map(function(value) {
                return nignoreImage(value) ? false : value;
            }).filter(Boolean)[0];

            var text = data.parse.text['*'];
            log('gp apip img:', img, 'text:', {text: text});

            if (!img && !text) {
                pp.stop(nuri.truepath);
                if (Settings.apid || withD) {
                    Settings.RegExp.ilinks.push(nuri.truepath);
                    return;
                } else {
                    return ngetPreview(ev, null, true);
                }
            }

            text = preprocess(text);
            text = $('<div>', {class: 'tmpdivclass', style: 'visibility:hidden;display:none;'}).html(text);

            if (!Settings.pibox) {
                if (!Settings.piboxkeepprev) text.find('aside').prevAll().remove();
                text.find('aside').remove();
            }

            text = text.text();
            text = text ? text.replace(Settings.RegExp.dtag, '') : '';
            if (text.length > Settings.tlen) {
                text = text.substr(0, Settings.tlen).trim() + '…';
            }

            if (Settings.debug) {
                Settings.pptext = text;
                Settings.ppdata = data;
                log('gp img: ', img, ' text: ', {text: text});
            }

            if (text.length > 0) {
                twrap.text(text);
                div.append(twrap);
            }

            div.prepend(iwrap);

            if (img) {
                var im = 'file:' + img.trim();
                var apiimage = new mw.Uri({path: nuri.interwiki + '/api.php'});
                apiimage.extend({action: 'query', redirects: '',
                            titles: im, iiprop: 'url', prop: 'imageinfo', format: 'json'});
                log('gp apii: ', apiimage.toString());

                $.getJSON(apiimage.toString()).done(function(data) {
                    var d1 = data.query;
                    if (d1.redirects) {
                        var imRed = getVal(getObj(d1, 'redirects'), 'to');
                        if (imRed.length > 0) {
                            imRed = imRed[0];
                            var apiim = apiimage.clone().extend({titles: imRed});
                            $.getJSON(apiim.toString(), function(data) {
                                var im = getVal(getObj(data, 'pages'), 'url');
                                im = im.length > 0 ? im[0] : false;
                                hlpPreview(nuri, div, im, forcepath ? true : false);
                            });
                        } else {
                            hlpPreview(nuri, div, false, forcepath ? true : false);
                        }
                    } else {
                        var im = getVal(getObj(d1, 'imageinfo'), 'url');
                        im = im.length > 0 ? im[0] : false;
                        hlpPreview(nuri, div, im, forcepath ? true : false);
                    }
                }).fail(function(obj, stat, err) {
                    log('gp img api fail', obj, stat, err);
                    hlpPreview(nuri, div, false, forcepath ? true : false);
                });
            } else {
                hlpPreview(nuri, div, false, forcepath ? true : false);
            }
        
        }).fail(function(obj, stat, err){
            log('pg get page data fail', obj, stat, err);
            pp.stop(nuri.truepath);
        });

        return false;
    }
    
    function nshowPreview (data, target, force) {
        log('sp', data, target, force);
        if (!force && (currentEl.href !== target.truepath)) {
            return false;
        }
        
        $('.npage-preview').remove();
        $('body').append($(data));

        $(data).css({left: -10000, top: -10000});
        $(data).show(200, function() {
            if ((loc.clientY + $(data).height()) > $(window).height()) {
                loc.top -= ($(data).height() + loc.tops);
            } else {
                loc.top += loc.tops;
            }
            if ((loc.clientX + $(data).width()) > $(window).width()) {
                loc.left -= ($(data).width() + loc.lefts);
            } else {
                loc.left += loc.lefts;
            }
        
            loc.left = loc.left > 0 ? loc.left : 0;
            loc.top = loc.top > 0 ? loc.top : 0;
            $(data).css({
                left: force ? $('body').scrollLeft() : loc.left,
                top: force ? $('body').scrollTop() : loc.top
            });
            mw.hook('ppreview.show').fire(data);
        });
    }
    
    function nhidePreview () {
        currentEl.href = '';
        $('.npage-preview').remove();
        hlpaHover();
    }

    function nignoreImage (name) {
        for (var i = 0, len = Settings.RegExp.iimages.length; i < len; i++) {
            if (Settings.RegExp.iimages[i] instanceof RegExp) {
                if (Settings.RegExp.iimages[i].test(name)) return true;
            } else {
                if (name === Settings.RegExp.iimages[i]) return true;
            }
        }
        return false;
    }
    
    function nignorePage (name) {
        var a = Settings.RegExp.ipages;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            }
        }
        return false;
    }
    
    function nignoreLink (name) {
        var a = Settings.RegExp.ilinks;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            }
        }
        return false;
    }
    
    function ncacheOf (href) {
        if (ncache.length > Settings.csize) ncache = [];
        for (var i = 0, len = ncache.length; i < len; i++) {
            if (ncache[i].href === href) {
                log('cache found:', href, 'data:', ncache[i].data);
                return ncache[i];
            }
        }
        return null;
    }
})(jQuery);