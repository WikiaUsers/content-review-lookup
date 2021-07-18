// adds image to text in category page
// selector: '#mw-pages ul li a, .category-page__members .category-page__member > a'
// selectors: classic, dynacats
// todo: find dynacat w\ images > add chck agnst 2nd img
(function($, ci) {
    // debug
    var urlVars = new URLSearchParams(location.search);
    ci.debug = ci.debug !== undefined ? ci.debug : false;
    ci.debug = urlVars.get('debug') || urlVars.get('debug1') || ci.debug;
    // restrict to ns:14 (category)
    ci.restrict = ci.restrict !== undefined ? ci.restrict : true;
    // dbl run or wrong conditions
    var mws = mw.config.get(['wgNamespaceNumber', 'skin', 'wgUserName']);
    if (ci.f || !mws.wgUserName || (ci.restrict && (mws.wgNamespaceNumber !== 14))) return;// fuck the anonymous
    // image extension
    ci.ext = ci.ext || '.png';
    // image class
    ci.cls = ci.cls || 'cicon-image';
    ci.cls = mw.html.escape(ci.cls);
    // scale. save bandwith
    ci.scale = ci.scale === undefined ? '/scale-to-width-down/50' : ci.scale === '' ? '' : $.htmlentities(ci.scale);
    // image prepend: prep+name+ext
    ci.iprepend = ci.iprepend !== undefined ? ci.iprepend : '';
    // image append: name+append+ext
    ci.iappend = ci.iappend !== undefined ? ci.iappend : '';
    // text prepend: prepend+<img>
    ci.tprepend = ci.tprepend !== undefined ? ci.tprepend : '';
    // text append: <img>+append
    ci.tappend = ci.tappend !== undefined ? ci.tappend : '';
    
    ci.log = function log () {
        if (!ci.debug) return;
        var a = [].slice.call(arguments);
        a.unshift('ci');
        console.log.apply(this, a);
    };// log
    
    ci.getObj = function getObj (data, key) {
        // traverse through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                if (k === key) {
                    ret.push(data[k]);
                }
                r = ci.getObj(data[k], key);
                if (r) ret = ret.concat(r);
            }// if obj
        }// for k in data
        return ret;
    };// getObj
 
    ci.getVal = function getVal (data, key) {
        // traverse through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                r = ci.getVal(data[k], key);
                if (r) ret = ret.concat(r);
            } else {
                if (k === key) {
                    ret.push(data[k]);
                }
            }// if obj
        }// for k in data
        return ret;
    };// getVal
    
    ci.f = function() {
        ci.log($('#mw-pages ul li, .category-page__members .category-page__member > a').length);
        $('#mw-pages ul li a, .category-page__members .category-page__member > a').each(function() {
            var aimage = mw.Title.newFromText(ci.iprepend + $(this).text() + ci.iappend + ci.ext, 6);
            var api = new mw.Api(), $el = $(this);
            ci.log(aimage, $el);
            api.get({action: 'query', redirects: '', titles: aimage.getPrefixedDb(),
                prop: 'imageinfo', iiprop: 'url', format: 'json'})
            .done(function(data) {
                var image = {};
                ci.log('data', data);
                var page = {};
                page.missing = data.query.pages['-1'] ? true : false;
                if (page.missing) return;
                page.imageinfo = ci.getObj(data.query.pages, 'imageinfo');
                page.imageinfo = page.imageinfo.length > 0 ? page.imageinfo[0][0] : null;
                if (!page.imageinfo) return;
                ci.log('ii', page.imageinfo);
                // deal with redirs
                page.redirects = ci.getVal(ci.getObj(data.query, 'redirects'), 'to');
                page.redirects = page.redirects.length > 0 ? page.redirects[0] : null;
                image.url = page.redirects || page.imageinfo.url || ' ';
                if (image.url === ' ') return;
                // add scaling
                image.url = image.url.indexOf('?') > -1 ? image.url.replace('?', ci.scale + '?') : image.url + ci.scale;
                image.img = $('<img>', {src: image.url, class: ci.cls});
                // stacking the stuff
                if (ci.tappend) $el.prepend($('<span>', {text: ci.tappend,class: 'cicon-append'}));
                $el.prepend(image.img);
                if (ci.tprepend) $el.prepend($('<span>', {text: ci.tprepend, class: 'cicon-prepend'}));
            });// done api.get
        });// each li a
    };// f

    mw.loader.using(['mediawiki.api', 'mediawiki.Title'], $(document).ready.bind(this, ci.f));
}(jQuery, (window.fng = window.fng || {}).cicon = window.fng.cicon || {}));