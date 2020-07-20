/**
 * Additional scripts specified here and on other MediaWiki pages
 *   collapsible tables from [[MediaWiki:CollapsibleTables.js]]
 *   ingame interwiki redirects from [[MediaWiki:InterwikiSearchRedirect.js]]
 *   ingame chatlink searches from [[MediaWiki:ChatLinkSearch.js]]
 */
// Scripts to use when viewing articles
if (mw.config.get('wgIsArticle') || window.location.href.indexOf('action=submit') > -1 || mw.config.get('wgNamespaceNumber') == -1) {
    // Article namespace
    if (mw.config.get('wgNamespaceNumber') === 0 ) {
        addArticleFeedback(document);
        demarcateDialogue();
        semanticGalleryCleanup();
        gameUpdateIcons();
    }
    
    // Only if the page contains collapsible tables
    if ( $('.collapsible, .expandable').length > 0 ) {
        mw.loader.load( '/index.php?title=MediaWiki:CollapsibleTables.js&action=raw&ctype=text/javascript' );
    }
    tradingPostPrices()
    autoConvertUTC();
}

// Script to use in the Special namespace only
if ( mw.config.get('wgNamespaceNumber') == -1 ) {
    uploadEnforcer();
}

// Scripts to use when searching
if (mw.config.get('wgPageName') == 'Special:Search') {
    mw.loader.load( '/index.php?title=MediaWiki:InterwikiSearchRedirect.js&action=raw&ctype=text/javascript' );
    mw.loader.load( '/index.php?title=MediaWiki:ChatLinkSearch.js&action=raw&ctype=text/javascript' );
}


/**** function addMobileViewport.js
 * Adds additional Android-Chrome formatting rules to prevent text scaling to fill screen on each line (different font sizes)
 */
(function addMobileViewport() {
    var nua = navigator.userAgent;
    if ( nua.indexOf('Android ') > -1 && nua.indexOf('Chrome/') > -1 ) {
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
        $('head').append('<style>html, body { min-width:800px !important; }</style>');
    }
})();

/**
 * Feedback button (see [[Guild Wars 2 Wiki:Feedback initiative]])
 *   Adds a button to leave feedback about a mainspace article on the talk page using a preloaded feedback format
 */
function addArticleFeedback (document) {
    // Construct pretty date format with padded zeros YYYY-MM-DD
    var currentDate = new Date();
    var day = ('0' + currentDate.getDate().toString()).slice(-2);
    var month = ('0' + (currentDate.getMonth() + 1 ).toString()).slice(-2);
    var year = currentDate.getFullYear();
    var currentDate = year + '%2F' + month + '%2F' + day;
    
    // Construct new tab
    feedbacktab = document.createElement('li');
    feedbacktab.id = 'special-articlefeedback';
    feedbacklink = '/index.php?title=Talk:' + encodeURIComponent(mw.config.get('wgPageName')) + '&action=edit&section=new&editintro=Template:Feedback_notice&preload=Template:Feedback_preload&preview=yes&preloadtitle=Feedback+' + currentDate;
    feedbackhover = 'Leave us feedback on the content of the article so that we can improve it';
    feedbacktabtext = 'Leave article feedback';
    
    // Change format depending on whether user is using vector or monobook
    if (mw.config.get('skin') == 'vector') {
        feedbacktab.innerHTML = '<span><a href="' + feedbacklink + '" title="' + feedbackhover + '">' + feedbacktabtext + '</a></span>'
    } else if (mw.config.get('skin') == 'monobook') {
        feedbacktab.innerHTML = '<a href="' + feedbacklink + '" title="' + feedbackhover + '">' + feedbacktabtext + '</a>'
    }
    
    // Finally add the feedback button somewhere after the discussion tab
    document.getElementById('ca-talk').parentNode.insertBefore(feedbacktab, document.getElementById('ca-talk').nextSibling);
}

/**
 * Trading post prices. (see [[Template:Tp]])
 *   Converts placeholder content of elements with class "gw2-tpprice" to trading post prices, using "data-info" attribute values (sell or buy) if available.
 */
function tradingPostPrices () {
    if ( $('.gw2-tpprice').length === 0 ) {
        return;
    }

    function pad (s) {
        return (s < 10 ? '0' : '') + s;
    }

    function getCoin (coin, asHtml) {
        var copper = coin % 100;
        var text = copper + 'c';
        var html = '<span class="numbers">' + (coin >= 100 ? pad(copper) : copper ) + '</span>&nbsp;<img src="https://vignette.wikia.nocookie.net/gw2/images/e/eb/Copper_coin.png/revision/latest?cb=20180522014120&path-prefix=ja" alt="Copper" />';
        if (coin >= 100) {
            var silver = (coin / 100 >> 0) % 100;
            html = '<span class="numbers">' + (coin >= 10000 ? pad(silver) : silver ) + '</span>&nbsp;<img src="https://vignette.wikia.nocookie.net/gw2/images/3/3c/Silver_coin.png/revision/latest?cb=20180522014256&path-prefix=ja" alt="Silver" />&nbsp;' + html;
            text = silver + 's ' + text;
        }
        if (coin >= 10000) {
            var gold = coin / 10000 >> 0;
            html = '<span class="numbers">' + gold + '</span>&nbsp;<img src="https://vignette.wikia.nocookie.net/gw2/images/d/d1/Gold_coin.png/revision/latest?cb=20180522014210&path-prefix=ja" alt="Gold" />&nbsp;' + html;
            text = gold + 'g ' + text;
        }
        return asHtml ? html : text;
    }

    var elements = {};
    $('.gw2-tpprice').each(function () {
        var id = +this.getAttribute('data-id');
        if (!id || parseInt(id) != id) {
            return;
        }
        if (!elements[id]) {
            elements[id] = [];
        }
        elements[id].push({ elem: this, info: this.getAttribute('data-info') });
    });

    var ids = $.map(elements, function (o, i) { return i; });
    var promises = [];
    for (var i=0; i < ids.length; i+=200) {
        var current_ids = ids.slice(i,i+200).join(',');
        promises.push($.getJSON('https://api.guildwars2.com/v2/commerce/prices?ids='+current_ids+'&wiki=1&lang=en'));
    }
    $.when.apply($,promises)
    .done(function(){
        // If multiple requests are made, concatenate the objects into an array
        if (promises.length > 1) {
            var data = $.map(arguments, function(v){
              return v[0];
            });
        } else {
            var data = arguments[0];
        }

        $.each(data, function (index, item) {
            var buyText = 'Highest buy order: ' + getCoin(item.buys.unit_price);
            var sellText = 'Lowest sell offer: ' + getCoin(item.sells.unit_price);
            $.each(elements[item.id], function () {
                if (this.info == 'buy') {
                    this.elem.innerHTML = getCoin(item.buys.unit_price, true);
                    this.elem.title = buyText + ' (' + item.buys.quantity + ' ordered)';
                    this.elem.setAttribute('data-sort-value',item.buys.unit_price);
                }
                else if (this.info == 'sell') {
                    this.elem.innerHTML = getCoin(item.sells.unit_price, true);
                    this.elem.title = sellText + ' (' + item.sells.quantity + ' listed)';
                    this.elem.setAttribute('data-sort-value',item.sells.unit_price);
                }
                else {
                    this.elem.innerHTML = getCoin(item.sells.unit_price, true);
                    this.elem.title = sellText + ' / ' + buyText;
                    this.elem.setAttribute('data-sort-value',item.sells.unit_price);
                }
                if ((this.info == 'buy' && !item.buys.quantity) || (this.info != 'buy' && !item.sells.quantity)) {
                    this.elem.style.opacity = '.5';
                }
            });
        });
    })
    .fail( function(d, textStatus, error) {
        console.log("Commerce API getJSON failed, status: " + textStatus + ", error: "+error);
        $.each(elements, function (index, item) {
            $.each(item, function() {
                this.elem.innerHTML = getCoin(0, true);
                this.elem.title = 'No buy or sell orders found.'
                this.elem.style.opacity = '.5';
            });
        });
    });
}

/**
 * Convert UTC time to local time. (see [[Template:UTC time]])
 */
function autoConvertUTC () {
    function pad (s) {  return (s < 10 ? '0' : '') + s; }
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $('.utc-auto-convert').each(function(i,v){
        // Get UTC time using MediaWiki {{#time: U}} epoch format
        var utcseconds = v.getAttribute('data-time');
        if (utcseconds == 'error') {
            return;
        }
        var d = new Date(0);
        d.setUTCSeconds(utcseconds);
        var offset = (-1 * d.getTimezoneOffset() / 60);
        var offsetstring = '';
        if (offset > 0) { offsetstring = '+' + offset; }
        if (offset < 0) { offsetstring = offset; }
        
        // Default to showing the time only
        var datestring = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ' UTC' + offsetstring;
        var titlestring = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ' UTC';
        
        // But check for different formatting in case there is a day of the week given inside the span
        if (!v.textContent.match(/^\d/)) {
            datestring  = days[d.getDay()] + ' ' + datestring;
            titlestring = days[d.getUTCDay()] + ' ' + titlestring;
        }
        
        // Show result
        $(v).html('<span style="cursor:help; border-bottom:1px dotted silver;" title="'+titlestring+'">'+datestring+'</span>');
    });
}

/**
 * Additional class formatting "dialogue" for sections titled as dialogue or text on mainspace articles
 */
function demarcateDialogue () {
    $('h2').each(function (i, e) {
        var h2Content = this.innerHTML.match(/(対話|テキスト)/i);
        if (h2Content) {
            $(this).nextUntil(this.tagName).wrapAll('<div class="dialogue"></div>');
        }
    });
}

/**
 * Remove image dimension text from Semantic galleries created with {{#ask: ... | format = gallery }}
 */
function semanticGalleryCleanup () {
    var captions = $('.srf-gallery .gallerytext p');
    if (captions.length > 0) {
        $.each(captions, function(i,v){
          var p = this.innerHTML.replace(/(\d+|\d+,\d+) × (\d+|\d+,\d+)\<br\>\n/,"<br>\n")
          $(this).html(p);
        });
    }
}

/**
 * Increased line spacing for skill and trait icons on the Game update page and subpages
 */
function gameUpdateIcons () {
    if (mw.config.get('wgPageName').substring(0, 12) == 'Game_updates') {
        $('li .skillicon, li .effecticon, li .traiticon').each(function(){
            $(this).parent('li').addClass('patchnote');
        });
    }
}