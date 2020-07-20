!function(cfg) {
    // copy url with canonical namespace
    // codename: cc
    // .decodeUri: decodeuricomponent for url, except ? and # parts
    //  safe for all links in the same-lang community
    //  when lang borders are crossed (copy decoded ru.url from ru.chrome to en.discord),
    //      multiple conversions might occur, with unpredictable results
    // .fullDecodeUri: decodeuricomponent for whole uri, including ? and #
    //  some links will be broken, even for same-lang comms; by design
    //  obviously broken urls will be discarded, partial decode will be performed instead
    // .unsafeFullDecode: ignore decoding errors for fulldecode; will return broken url

    var $btnCC,
        mwc = mw.config.get(['wgAction', 'wgCanonicalNamespace', 'wgFormattedNamespaces', 'wgNamespaceIds', 'wgNamespaceNumber']),
        $surrogate = $('<input>', {type: 'text', style: 'position:absolute;top:-1000px'}),
        href = canonizeMe(location.href);
    
    function doCopyToClipboard(what) {
        // copies what to clipboard
        $surrogate.val(what);
        $surrogate.appendTo('body:first');
        try {
            $surrogate.focusNoScroll();
            $surrogate.get(0).setSelectionRange(0, 9999);
            document.execCommand('copy');
        } catch (ex) {
            mw.log('cc', 'copy to clipboard error', ex);
        }
        $surrogate.detach();
    }// doCopyToClipboard

    function newUrlHelper(what) {
        // creates url from what
        // returns {url, success}
        try {
            return {
                url: new URL(what),
                success: !0,
            };
        } catch (ex) {
            mw.log('cc', 'create url error', ex, what);
            return {
                url: what,
                success: !1,
            };
        }
    }// newUrlHelper
    
    function canonizeMe(whom) {
        // casts to canonical and does other decoding stuff
        
        // there is nothing to replace for the ns:0
        if (!whom || (mwc.wgNamespaceNumber === 0 && !(cfg.decodeUri || cfg.fullDecodeUri))) return whom;
        // sometimes, it's special%3A
        var regexp = new RegExp(encodeURIComponent(mwc.wgFormattedNamespaces[mwc.wgNamespaceNumber].replace(/ /g, '_')) + '(:|%3A)');
        whom = whom.replace(
            regexp,
            mwc.wgCanonicalNamespace + ':'
        );

        // user request: full decode. will damage urls frequently, including hash part
        if (cfg.fullDecodeUri) {
            var s = decodeURIComponent(whom);
            // can decoded string be converted back to url?
            if (cfg.unsafeFullDecode || newUrlHelper(s).success) return s;
        }

        // partial decode. supposed to be safe enough, unless language borders crossed
        // also, fallback for fullDecodeUri: try to decode at least something
        if (cfg.decodeUri || cfg.fullDecodeUri) {
            var url = newUrlHelper(whom);
            if (url.success) whom = (url.url.origin + decodeURIComponent(url.url.pathname) + url.url.search + url.url.hash);
        }
        return whom;
    }// canonizeMe

    function btnCC_click(e) {
        // don't jump on me
        e.preventDefault();
        // re-get the href. just in case
        href = canonizeMe(location.href);
        doCopyToClipboard(href);
        // click animation
        $(this).animate({filter: 2}, {
            step: function(now, tween) {
                $(tween.elem).css('filter', 'invert(' + Math.abs(now >= 1 ? 2 - now : now) + ')');
            },
            complete: function() {
                $(this).css('filter', 'initial');
            },
        });
    }// btnCC_click

    function deinit() {
        // clean up
        $btnCC.remove();
        $surrogate.detach();
        $('body').off('click.cc');
        cfg.loaded = !!0;
    }// deinit

    function init() {
        $btnCC = $('<a>', {
            class: 'nbtncopycanonical',
            text: 'CC',
            href: '#',
            id: 'nbtncopycanonical',
            title: href,
        });

        if (cfg.useToolbar) {
            $btnCC.css('font-weight', 'bold');
            $btnCC = $('<li>').append($btnCC);
            $btnCC.appendTo('#WikiaBarWrapper .toolbar ul.tools');
        } else {
            $btnCC.addClass('wds-button wds-is-squished wds-is-secondary');
            $btnCC.appendTo('.wds-community-header__top-container .wds-community-header__wiki-buttons');
        }
        
        $('body').on('click.cc', '.nbtncopycanonical', btnCC_click);
        cfg.loaded = !0;
    }// init
    
    if (cfg.loaded) return;
    cfg.loaded = !0;
    cfg.$surrogate = $surrogate;
    cfg.init = init;
    cfg.deinit = deinit;
    // go to toolbar, when needed or no head butts avail
    cfg.useToolbar = cfg.useToolbar || (/edit|submit/.test(mwc.wgAction) ? !0 : !!0);

    init();
}((window.fng = window.fng || {}).cc = window.fng.cc || {});