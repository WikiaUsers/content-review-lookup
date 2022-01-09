/* <pre> */
/* smth like mw:Extension:Popups */
/* popup on link:hover */
/* maintainer: user:fngplg */
/* classes: main: npage-preview, image not found: npage-preview-noimage */
/* img: <img>, text: <div> */
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
        dock: '#mw-content-text, #article-comments',
        defimage: 'https:// vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru',
        noimage : 'https:// vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/200?cb=20160122074659&path-prefix=ru',
    };// defaults
    var pp = {};
    pp.sync = []; // synchronization element
    var ncache = []; // {href, data}
    var loc = {lefts: 5, tops: 5}; // left: x, top: y, lefts: left-shift, clientx
    var currentEl = {}; // {href, ?data}
    // var api = new mw.Api();
    var apiUri;
    // exports
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
    }// log

    pp.start = function (e) {
        // allows (true) processing for element e
        if (e) {
            if (pp.sync.indexOf(e) > -1) {
                return false;
            }
        }
        Settings.process = true;
        pp.sync.push(e || Settings.process);
        return true;
    };// start
    
    pp.stop = function (e) {
        hlpaHover();
        var epos = pp.sync.indexOf(e);
        if (epos !== -1) {
            // remove e from sync array
            pp.sync.splice(epos, 1);
        } else {
            // remove something; stack presumed
            pp.sync.splice(0, 1);
        }
        if (pp.sync.length === 0) {
            Settings.process = false;
        }
    };// stop

    pp.cachedupl = function () {
        // check cache for href duplication
        var el = null;
        outer:
        for (var i = 0, len = ncache.length; i < len; i++) {
            for (var k = i + 1; k < len; k++) {
                if (ncache[i].href === ncache[k].href) {
                    el = {v: ncache[i].href, i: i, k: k};
                    break outer;
                }
            }// k inner loop
        }// i outer loop
        if (el) {
            console.log('pp.cachedupl found', el.v, el.i, el.k);
        }
    };// cachedupl

    function init () {
        if (window.pPreview && window.pPreview.version) {
            log('init dbl run protection triggered');
            return;
        }
        Settings.version = '1.61';
        log('init vrsn:', Settings.version);
        apiUri = new mw.Uri({path: mwc.wgScriptPath + '/api.php'});
        // use api.v1/article/details
        Settings.apid = Settings.apid !== undefined ? Settings.apid : false;
        // show preview delay, ms
        Settings.delay = Settings.delay !== undefined ? Settings.delay : 100;
        // suppress hover events for x ms
        // Settings.throttling = timeout until x
        Settings.throttle = Settings.throttle !== undefined ? Settings.throttle : 100;
        Settings.throttling = false;
        Settings.process = false;// processing data
        Settings.tlen = Settings.tlen !== undefined ? Settings.tlen : 1000; // max text length
        // do not remove portable infobox on preprocess stage
        Settings.pibox = Settings.pibox !== undefined ? Settings.pibox : false;
        // do not remove infobox siblings
        Settings.piboxkeepprev = Settings.piboxkeepprev !== undefined ? Settings.piboxkeepprev : false;
        // cache size
        Settings.csize = Settings.csize !== undefined ? Settings.csize : 100;
        Settings.defimage = Settings.defimage !== undefined ? Settings.defimage : Defaults.defimage; // default image path
        // no image found. class: npage-preview-noimage
        Settings.noimage = Settings.noimage !== undefined ? Settings.noimage : Defaults.noimage;
        // request to perform scaling
        Settings.scale = Settings.scale !== undefined ? Settings.scale : {r: '?', t: '/scale-to-width-down/350?'};
        // container (#WikiaMainContent, #mw-content-text etc)
        Settings.dock = !!Settings.dock ? Settings.dock : Defaults.dock;
        // parse whole page. debug purposes mainly
        Settings.wholepage = urlVars.get('wholepage') || (Settings.wholepage !== undefined ? Settings.wholepage : false);
        Settings.RegExp = Settings.RegExp || {}; // regexps
        // images 2 ignore
        Settings.RegExp.iimages = Settings.RegExp.iimages || [];
        // pages 2 ignore
        Settings.RegExp.ipages = Settings.RegExp.ipages || [];
        // links 2 ignore
        Settings.RegExp.ilinks = Settings.RegExp.ilinks || [];
        // parents to ignore
        Settings.RegExp.iparents = Settings.RegExp.iparents || ['[id^=flytabs] .tabs'];
        // classes to ignore
        Settings.RegExp.iclasses = Settings.RegExp.iclasses || [];
        // content to process. non-exclusive inclusion
        Settings.RegExp.onlyinclude = Settings.RegExp.onlyinclude || [];
        // content to remove (css-style targets)
        Settings.RegExp.noinclude = Settings.RegExp.noinclude || [];
        // Settings.RegExp.hash = Settings.RegExp.hash || new RegExp('#.*');
        Settings.RegExp.wiki = Settings.RegExp.wiki || new RegExp('^.*?\/wiki\/', 'i');
        // delete tags
        Settings.RegExp.dtag = Settings.RegExp.dtag || new RegExp('<.*>', 'gm');
        // preprocess data (remove scripts)
        Settings.RegExp.prep = Settings.RegExp.prep || [];
        // set len restriction for apid.abstract
        if (Settings.apid) {
            Settings.tlen = (Settings.tlen > 500) ? 500 : Settings.tlen;
        }
        // ensure #mw-content-text is processed
        Settings.fixContentHook = Settings.fixContentHook !== undefined ? Settings.fixContentHook : true;
        window.pPreview = Settings;
        var thisPage = (createUri(location) || {}).truepath;
        // should i ignore this page
        if (!thisPage || nignorePage(thisPage)) {
            mw.hook('wikipage.content').remove(main);
            log('ignore', thisPage);
            return;
        }
        // run once
        // dump sass params
        var sasses = '';
        $.each(mwc.wgSassParams, function(k, v) {
            sasses = sasses + '--sass-' + k + ':' + v + ';\n';
        });// each sassparam
        if (sasses.length) {
            sasses = ':root {\n' + sasses + '}';
            mw.util.addCSS(sasses);
        }
        log('sasses', {sasses: sasses});
        importArticle({type: 'style', article: 'u:dev:MediaWiki:LinkPreview.css'});
        log('rmain');
        if (Settings.debug) {
            Settings.cache = ncache;
        }
        Settings.RegExp.ilinks.push(thisPage); // ignore this page
        Settings.RegExp.ilinks.push(new RegExp(apiUri.path)); // ignore unknown
        var r;
        if (Settings.RegExp.prep instanceof RegExp) {
            r = Settings.RegExp.prep;
            Settings.RegExp.prep = [r];
        }// if regexp.prep is regexp
        if (!(Settings.RegExp.prep instanceof Array)) {
            Settings.RegExp.prep = [];
        }// if regexp.prep is not array
        Settings.RegExp.prep.push(/<script>[\s\S]*?<\/script>/igm);
        Settings.RegExp.prep.push(/<ref>[\s\S]*?<\/ref>/igm);
        Settings.defimage = chkImageSrc(Settings.defimage) ? Settings.defimage : Defaults.defimage;
        Settings.noimage = chkImageSrc(Settings.noimage) ? Settings.noimage : Defaults.noimage;
        Settings.f.pp = pp;
        // ajaxrc support
        window.ajaxCallAgain = window.ajaxCallAgain || [];
        window.ajaxCallAgain.push(main);
        mw.hook('wikipage.content').add(main);
        mw.hook('ppreview.ready').fire(Settings);
        // main();
    } // init
    
    function main ($cont) {
        // main
        log('main', $cont);
        if (Settings.fixContentHook && $cont && $cont.length) {
            Settings.fixContentHook = false;
            if ($cont.selector !== '#mw-content-text') {
                log('main fixcontent', $cont);
                main($('#mw-content-text'));
            }
        }
        var $content, arr = [];
        // gather dock sites to one array
        Settings.dock.split(',').forEach(function (v) {
            var $c = {};
            if ($cont) {
                // if $cont belongs to dock container
                $c = ($cont.is(v) || $cont.parents(v).length) ? $cont : {};
            } else {
                // get whole dock. if main() called w\o params
                $c = $(v);
            }// if $cont. instead of $cont ? .is || .len ? : :
            $.merge(arr, $c);
        });// each dock
        $content = $(arr);
        log('main.c:', $content);
        $content.find('a').each(function() {
            var $el = $(this);
            if (elValidate($el)) { // internal link
                // $el.hover(aHover, nhidePreview);
                $el.off('mouseenter.pp mouseleave.pp');
                $el.on('mouseenter.pp', aHover);
                $el.on('mouseleave.pp', nhidePreview);
            } // if internal link
        }); // each a
    } // main
    
    function elValidate ($el) {
        // returns false if element should be ignored
        var ahref = $el.attr('href'),
            bstop = false;
        // log('elValidate. el.h:', ahref);
        if (!ahref) return false;
        ahref = createUri(ahref);
        // log('elValidate.uri:', ahref);
        if (!ahref || (ahref.hostname !== apiUri.host) || nignoreLink(ahref.truepath)) {
            return false;
        }

        // chk classes
        if ($.isArray(Settings.RegExp.iclasses)) {
            Settings.RegExp.iclasses.forEach(function(v) {
                if ($el.hasClass(v)) {
                    log('elValidate classes', v, ahref.truepath);
                    // Settings.RegExp.ilinks.push(ahref.truepath);
                    bstop = true;
                }
            });
        }
        // log('elValidate classes', bstop);
        if (bstop) return false;

        // chk parents
        if ($.isArray(Settings.RegExp.iparents)) {
            Settings.RegExp.iparents.forEach(function(v) {
                if ($el.parents(v).length) {
                    log('elValidate parents', v, ahref.truepath);
                    // Settings.RegExp.ilinks.push(ahref.truepath);
                    bstop = true;
                }
            });
        }
        // log('elValidate parents', bstop);
        if (bstop) return false;
        return true;
    }// elValidate
    
    function chkImageSrc (src) {
        // is src belongs to wikia
        if (!src) return false;
        var url;
        try {
            url = new mw.Uri(src);
            return (/(\.wikia\.(com|org)|\.fandom\.com|\.wikia\.nocookie\.net)$/.test(url.host));
        }
        catch (e) {
            return false;
        }
        return false;
    }// chkimagesrc
    
    function preprocess (text) {
        // prep must be non-empty array (script removing at least, added in the init)
        if (!(Settings.RegExp.prep instanceof Array) || Settings.RegExp.prep.length < 1) return '';
        var s = text,
            $s = $('<div>').html(s);

        // remove noinclude items
        if (Settings.RegExp.noinclude && (Settings.RegExp.noinclude instanceof Array)) {
            Settings.RegExp.noinclude.forEach(function(v){$s.find(v).remove();});
        }// if RegExp.noinclude
        s = $s.html();
        // process exclusive items
        // must be done before trash tag processing. because of reasons
        if (Settings.RegExp.onlyinclude && (Settings.RegExp.onlyinclude instanceof Array)) {
            /* exclusive
            Settings.RegExp.onlyinclude.forEach(function (v) {
                var $v = $s.find(v);
                if ($v.length) $s = $v;// call it exclusive
            });
            s = $s.html();
            */
            /* non-exclusive set */
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
        }// if RegExp.onlyinclude
        
        Settings.RegExp.prep.forEach(function (v) {
            s = s.replace(v, '');
        });
        return s;
    }// preprocess
    
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
    } // createUri
        
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    } // escapeRegExp
    
    function hlpaHover () {
        // aHover helper
        if (Settings.throttling) {
            clearTimeout(Settings.throttling);
            Settings.throttling = false;
        }
    }// hlpaHover
    
    function aHover (ev) {
        // a hover handler
        ev.stopPropagation();
        log('ahover ', Settings.throttling, currentEl.href);
        // suppress some events
        if (Settings.throttling || Settings.process) {
            return false;
        }
        Settings.throttling = setTimeout(hlpaHover, Settings.throttle);
        var hel = createUri($(ev.currentTarget).attr('href')) || {};
        // if link already in process
        if (hel && hel.truepath && currentEl.href == hel.truepath) {
            return false;
        }
        currentEl.href = hel.truepath;
        currentEl.islocal = hel.islocal;
        currentEl.interwiki = hel.interwiki;
        // if link determined be ignored
        if (nignoreLink(currentEl.href)) {
            return true;
        } // if ignore link
        // set coords
        loc.left = ev.pageX;
        loc.top = ev.pageY;
        loc.clientX = ev.clientX;
        loc.clientY = ev.clientY;
        log('ahover ev:', ev, 'cel:', currentEl);
        setTimeout(ngetPreview.bind(this, ev), Settings.delay);
        return false;
    } // ahover
    
    function getObj (data, key) {
        // traverse through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                if (k === key) {
                    ret.push(data[k]);
                }
                r=getObj(data[k], key);
                if (r) ret=ret.concat(r);
            } // if obj
        } // for k in data
        return ret;
    } // getObj
    
    function getVal (data, key) {
        // travers through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                r=getVal(data[k], key);
                if (r) {
                    ret=ret.concat(r);
                }
            } else {
                if (k === key) {
                    ret.push(data[k]);
                }
            } // if obj
        } // for k in data
        return ret;
    } // getVal
    
    function hlpPreview (uri, div, img, force, withD) {
        // preview helper
        // load img and add to div
        var im, d;
        im = $('img', div);
        if (!Settings.apid && !withD) {
            if (img) {
                // let vignette do scale
                im.attr('src', Settings.scale ? img.replace(Settings.scale.r, Settings.scale.t) : img);
            } else {
                im.attr('src', Settings.noimage);
                im.addClass('npage-preview-noimage');
            } // if img
        }// if !apid
        d = {href: uri.truepath, data: div, uri: uri};
        ncache.push(d);
        if (Settings.debug) window.pPreview.pdiv = d.data;
        nshowPreview(d.data, d.uri, force);
        pp.stop(d.href);
    } // hlpPreview
    
    function ngetPreview (ev, forcepath, withD) {
        var nuri = createUri($(ev.currentTarget).attr('href')) || {};
        nuri.truepath = forcepath || nuri.truepath;
        if (!nuri || !nuri.truepath) {
            log('gp no href', ev, forcepath);
            return;
        }
        if (!pp.start(nuri.truepath)) {
            // this href already started to process
            log('gp suppressed dbl processing for', nuri);
            return;
        }
        // save bandwith
        log('gp uri: ', nuri, ' curel.href: ', currentEl.href, nuri.truepath === currentEl.href, 'd:', withD);
        // withd means fallback request, that should not be cancelled early
        if (!forcepath && !withD && (nuri.truepath != currentEl.href)) {
            pp.stop(nuri.truepath);
            return;
        }
        var ndata = ncacheOf(nuri.truepath);
        log('gp x:', loc.left, 'y:', loc.top);
        if (ndata) {
            log('gp show preview', ndata);
            nshowPreview(ndata.data, nuri, forcepath ? true : false);
            pp.stop(nuri.truepath);
            return false;
        } // if data
        // get data
        var apipage,
            iwrap = $('<img>', {src: Settings.defimage}),
            twrap = $('<div/>'),
            div = $('<div/>', {class: 'npage-preview'});
        if (Settings.apid || withD) {
            apipage = new mw.Uri(nuri.interwiki + '/api/v1/Articles/Details');
            apipage.extend({titles: nuri.truepath, abstract: Math.min(Settings.tlen, 500)});
            log('gp apid', apipage);
            $.getJSON(apipage).done(function(data) {
                if (!data || data.error) {
                    log('gp apid.error', nuri, data);
                    Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                    pp.stop(nuri.truepath);
                    return this;
                }
                var item = data.items[Object.keys(data.items)[0]];
                if (!item) {
                    log('gp apid.noitem', nuri, data);
                    Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                    pp.stop(nuri.truepath);
                    return this;
                }
                iwrap.attr('src', item.thumbnail || Settings.noimage);
                iwrap.addClass(item.thumbnail ? '' : 'npage-preview-noimage');
                twrap.text(item.abstract);
                div.append(iwrap).append(twrap);
                hlpPreview(nuri, div, item.thumbnail, forcepath ? true : false, withD);
                return this;
            })// apid.done
            .fail(function(data) {
                log('gp apid.fail', nuri, data);
                Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                pp.stop(nuri.truepath);
                return this;
            });// apid.fail
            return;
        }
        apipage = new mw.Uri({path: nuri.interwiki + '/api.php'});
        apipage.extend({action: 'parse', page: nuri.truepath,
                    prop: 'images|text', format: 'json', disablepp: '', redirects: ''});
        if (!Settings.wholepage) apipage.extend({section: 0});
        log('gp apip: ', apipage.toString());
        $.getJSON(apipage).done(function(data) {
            // parse: {text: {*: text}, images: []}
            if (!data.parse) {
                log('gp apip. no valid data in', data);
                Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                pp.stop(nuri.truepath);
                return this;
            }
            var img = data.parse.images.map(function(value, index) {
                if (nignoreImage(value)) {
                    return false;
                } else {
                    return value;
                }
            }).filter(Boolean)[0];
            // img = $(img);
            var text = data.parse.text['*'];
            log('gp apip img:', img, 'text:', {text: text});
            if (!img && !text) {
                pp.stop(nuri.truepath);
                if (Settings.apid || withD) {
                    Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                    return this;
                } else {
                    // last try; via api.v1
                    return ngetPreview(ev, null, true);
                }
            }
            // preprocess (cleanup)
            text = preprocess(text);
            text = $('<div/>', {class: 'tmpdivclass', style: 'visibility:hidden;display:none;'}).html(text);
            if (!Settings.pibox) { // remove portable infobox
                // assume infobox as 1st item
                // and remove all preceding info- templates
                //   if needed
                if (!Settings.piboxkeepprev) text.find('aside').prevAll().remove();
                text.find('aside').remove();
            }
            // convert 2 text
            text = text.text();
            // text clean up
            text = text ? text.replace(Settings.RegExp.dtag, '') : '';
            text = text.trim().substr(0, Settings.tlen);
            if (Settings.debug) {
                Settings.pptext = text;
                Settings.ppdata = data;
                log('gp img: ', img, ' text: ', {text: text});
            }
            if (text.length > 0) {
                twrap.text(text);
                div.append(twrap);
            } // if text
            div.prepend(iwrap);
            if (img) {
                // action=query&titles=file:.jpg&iiprop=url&prop=imageinfo&format=xml
                var im = 'file:' + img.trim();
                var apiimage = new mw.Uri({path: nuri.interwiki + '/api.php'});
                apiimage.extend({action: 'query', redirects: '',
                            titles: im, iiprop: 'url', prop: 'imageinfo', format: 'json'});
                log('gp apii: ', apiimage.toString());
                $.getJSON(apiimage.toString()).done(function(data) {
                    log('gp apii done:', data);
                    var im, d1;
                    d1 = data.query;
                    if (d1.redirects) {
                        var imRed = getVal(getObj(d1, 'redirects'), 'to');
                        log('gp img redir to', imRed);
                        if (imRed.length > 0) {
                            imRed = imRed[0];
                        } else {
                            // no url found
                            iwrap.attr('src', Settings.noimage);
                            log('gp img redir.to not found in', d1);
                            return this;
                        }
                        var apiim = apiimage.clone().extend({titles: imRed});
                        // resolve redirect
                        log('gp resolv redir:', apiim.toString());
                        $.getJSON(apiim.toString(), function(data) {
                            var im = getVal(getObj(data, 'pages'), 'url');
                            if (im.length > 0) {
                                im = im[0];
                            } else {
                                // no url found. again
                                im = false;
                            }
                            hlpPreview(nuri, div, im, forcepath ? true : false);
                        }); // getjson. resolve redirect
                    } else {
                        im = getVal(getObj(d1, 'imageinfo'), 'url');
                        if (im.length > 0) {
                            im = im[0];
                        } else {
                            im = false;
                        }
                        hlpPreview(nuri, div, im, forcepath ? true : false);
                    } // if redirects
                    return this; // should be promise. but well
                }).fail(function(obj, stat, err) {
                    log('gp img api fail', obj, stat, err);
                    hlpPreview(nuri, div, false, forcepath ? true : false);
                    return this;
                });// img fail
            } else { // no img
                hlpPreview(nuri, div, false, forcepath ? true : false);
            }// if img
        
        })// get page data.done
        .fail(function(obj, stat, err){
            log('pg get page data fail', obj, stat, err);
            pp.stop(nuri.truepath);
        });// get page data.fail
        // pp.stop();
        return false;
    
    } // getpreview
    
    function nshowPreview (data, target, force) {
        log('sp', data, target, force);
        if (!force && (currentEl.href !== target.truepath)) {
            return false; // other hover processing yet
        }
        log('sp data:', data);
        
        // nhidePreview();
        $('.npage-preview').remove(); // remove artefacts
        $('body').append($(data));

        // prehide data
        $(data).css({left: -10000, top: -10000});
        $(data).show(200, function() { // ;// fadeIn('fast');
            // reposition works well with pre-set fixed data bounds
            if ((loc.clientY + $(data).height()) > $(window).height()) {
                loc.top -= ($(data).height() + loc.tops);
            } else {
                loc.top += loc.tops;
            }// if top>window
            if ((loc.clientX + $(data).width()) > $(window).width()) {
                loc.left -= ($(data).width() + loc.lefts);
            } else {
                loc.left += loc.lefts;
            }// if left>window
        
            // move preview to target location
            log('sp loc', loc);
            loc.left = loc.left > 0 ? loc.left : 0;
            loc.top = loc.top > 0 ? loc.top : 0;
            $(data).css({
                left: force ? $('body').scrollLeft() : loc.left,
                top: force ? $('body').scrollTop() : loc.top});
            mw.hook('ppreview.show').fire(data);
        });// data.show.done
    } // showpreview
    
    function nhidePreview (data) {
        currentEl.href = '';
        $('.npage-preview').remove();
        // clear throttling
        hlpaHover();
    } // hidepreview
    
    function nignoreImage (name) {
        // true if image should be ignore
        // name = name.replace(/(file):/im, '');
        // name = name.charAt(0).toUpperCase() + name.slice(1);
        for (var i = 0, len = Settings.RegExp.iimages.length; i < len; i++) {
            if (Settings.RegExp.iimages[i] instanceof RegExp) {
                if (Settings.RegExp.iimages[i].test(name)) return true;
            } else {
                if (name === Settings.RegExp.iimages[i]) return true;
            } // if regexp
        }
        return false;
    } // nignoreimage
    
    function nignorePage (name) {
        // true if page should be ignore
        var a = Settings.RegExp.ipages;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            } // if regexp
        }
        return false;
    } // nignorepage
    
    function nignoreLink (name) {
        // true if link should be ignore
        var a = Settings.RegExp.ilinks;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            } // if regexp
        }
        return false;
    } // nignorelink
    
    function ncacheOf (href) {
        // returns cached obj or null
        if (ncache.length > Settings.csize) ncache = []; // clear cache
        for (var i = 0, len = ncache.length; i < len; i++) {
            if (ncache[i].href === href) {
                log('cache found:', href, 'data:', ncache[i].data);
                // window.ppcdata = ncache[i];
                return ncache[i];
            }
        }
        return null;
    } // ncacheof
})(jQuery);