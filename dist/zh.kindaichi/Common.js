/* 此处的JavaScript将加载于所有用户每一个页面。 */





 /* Collapsible tables */
 
 var autoCollapse = 2;
 var collapseCaption = "隱藏";
 var expandCaption = "顯示";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
             
             Button.appendChild( ButtonLink );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

// End "Articletype positioning" script


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
/* End of Collapsible tables */





/* Another Tabber */
$(function() {
 
    var tabbers = $("div.dbe-tabber");
 
    for(var i = 0; i < tabbers.length; ++i) {
 
        var tabber = tabbers.eq(i);
        var tabs = $(document.createElement("div")).addClass("dbe-tabs");
        var active = $(document.createElement("div")).addClass("dbe-tab-panel");
 
        var panels = tabber.children();
        var activeTab = null;
 
        for(var j = 0; j < panels.length; ++j) {
 
            var panel = panels.eq(j);
            var heading = panel.children("div.dbe-tab-title:first-child");
 
            var tab = $(document.createElement("a"));
            tab.attr("href", "#").addClass("dbe-tab").append(heading).appendTo(tabs);
 
            if(panel.hasClass("dbe-tab-panel-active"))
                activeTab = tab;
 
            var onclick = function(ts, a, t, p) {
 
                return function(event) {
 
                    event.preventDefault();
 
                    a.children().detach();
                    ts.children().removeClass("dbe-tab-active");
 
                    t.addClass("dbe-tab-active");
                    a.append(p);
 
                };
 
            }(tabs, active, tab, panel);
 
            tab.click(onclick);
 
        }
 
        panels.detach();
        tabber.prepend(active);
        tabber.prepend(tabs);
 
        if(!activeTab)
            activeTab = tabs.children("a:first-child");
 
        activeTab.trigger("click");
 
    }
 
});
 
/* End of Another Tabber */





/* Display title */
function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0];
	if(newPageTitle == null) return;
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0];
	if(oldPageTitle == null) return;
	oldPageTitle.innerHTML = newPageTitle.innerHTML;
}
addOnloadHook(fixPageName);
/* End of Display title */





/* Import Slider */
importArticles({
    type: 'script',
    articles: [
        'u:halo:MediaWiki:Wikia.js/Slider.js'
    ]
});
/* End of Import Slider */





/* Tabber Options */
 tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };
 /* End of Tabber Options */





/* Switch */
//
//<syntaxhighlight lang="javascript">
/**
 * Switch.js
 * 
 * Adds a tabber-like switch
 * @todo Add an option to choose the default tab (default: 1)
 *
 * @author [[w:User:Fubuki風吹]]
 * See: {{Switch}}
 */
 
var sWitch = {
 
    /**
     * Adds numeric class to elements
     *
     * @function [args] [ [elem]: Selected element ]
     * @returns [none]
     */
    addClass: function ( elem ) {
        for ( i = 0; i < $( '.' + elem ).length; i++ ) {
            $( '.' + elem ).eq( i ).addClass( elem + '-' + ( i + 1 ) );
        }
    },
 
    /**
     * Adds basic onclick functionality to tabs
     *
     * @function [args] [ [index]: Index of the tab (added via sWitch.addClass()) ]
     * @returns [none]
     */
    onClick: function ( index ) {
        $( '.tab-' + index ).on( 'click', function ( e ) {
            $( '.switch .container' ).html( $( '.content-' + index ).html() );
            $( this ).removeClass( 'inactive' ).addClass( 'active' );
            $( this ).siblings( '.tab' ).removeClass( 'active' ).addClass( 'inactive' );
        } );
    },
 
    /**
     * Defaults
     *   - Hide the content
     *   - Make the first tab active
     *   - Show the content of the first tab in the container
     *
     * @function [args] [none]
     * @returns [none]
     */
    preset: function () {
        $( '.content' ).hide();
        $( '.tab-1' ).addClass( 'active' );
        $( '.switch .container' ).html( $( '.content-1' ).html() );
    },
 
    /**
     * CSS requirements
     *
     * @function [args] [none]
     * @returns [none]
     */
    CSS: function () {
        $.get( '/api.php?action=query&titles=MediaWiki:Switch.css&format=json', function ( data ) {
            if ( data.query.pages[ '-1' ] ) {
                mw.util.addCSS(
                    '.switch .tab { \
                         text-align:center; \
                         padding:2px 10px; \
                     } \
                     .switch .tab:not(:first-child) { \
                         border-left:0px solid #000; \
                     } \
                     .switch .active { \
                         font-weight:bold; \
                     } \
                     .switch .inactive { \
                         font-weight:normal; \
                     } \
                     .switch .container { \
                         border:0px solid #000; \
                     }'
                );
            } else {
                importStylesheetPage( 'MediaWiki:Switch.css', window.location.host.split( '.' )[ 0 ] );
            }
        } );
    },
 
    /**
     * Initialization
     *
     * @function [args] [none]
     * @returns [none]
     */
    init: function () {
        sWitch.CSS();
        sWitch.addClass( 'tab' );
        sWitch.addClass( 'content' );
        sWitch.preset();
        for ( i = 0; i < $( '.tab' ).length; i++ ) {
            sWitch.onClick( i + 1 );
        }
    }
}
 
/**
 * Run when DOM ready
 *
 * @function [args] [none]
 * @returns [none]
*/
$( function () {
    $( '.switch' ).each( function () {
        sWitch.init();
    } );
} );
//
//</syntaxhighlight>
/* End of Switch */





/* Rating function */
/* Partially from http://runescape.wikia.com/wiki/User:Quarenon/gemwupdate.js */
addOnloadHook(function () {
    if ($.inArray("Bewertete Creepypasta", wgCategories) > -1) {
        var pageName = 'Wertung:' + wgPageName;
        disableEdit = false;
        var symbolInactive = new Image();
        symbolInactive.src = 'https://images.wikia.nocookie.net/kindaichi/zh/images/d/de/評分%28off%29.png';
        var symbolActive = new Image();
        symbolActive.src = 'https://images.wikia.nocookie.net/kindaichi/zh/images/d/de/評分%28off%29.png';
 
        if (!wgUserName) {
            $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {}).done(function (data) {;
                var userIP = data.host;
 
                getReview(pageName, userIP);
            });
        } else {
            var userIP = wgUserName;
 
            getReview(pageName, userIP)
        }
 
    }
 
    saveRating = false;
    $('.rating').mouseenter(function () {
        var currentRating = parseInt($(this).attr('id').split("-")[1]);
 
        $('.rating').each(function () {
            var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
            if (currentRatingEach <= currentRating && saveRating == false) {
                $(this).addClass('rating-active');
            }
        });
    });
 
    $('.rating').mouseleave(function () {
        if (saveRating == false) {
            $('.rating').attr('class', 'rating');
        }
    });
 
    $(".rating").on("click", function () {
        saveRating = true;
        actualRating = parseInt($(this).attr('id').split("-")[1]);
 
        if (!wgUserName) {
            $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {}).done(function (data) {;
                var userIP = data.host;
                var pageName = 'Wertung:' + wgPageName;
 
                var contentText = '<noinclude>' + userIP + ':</noinclude>' + actualRating;
 
                if (disableEdit == false) {
                    submitReview(pageName, contentText, userIP, actualRating);
                }
            });
        } else {
            var userIP = wgUserName;
            var pageName = 'Wertung:' + wgPageName;
 
            var contentText = '<noinclude>' + userIP + ':</noinclude>' + actualRating;
 
            if (disableEdit == false) {
                submitReview(pageName, contentText, userIP, actualRating);
            }
        }
 
        if (saveRating == true) {
            $('.rating').attr('class', 'rating');
            $('.rating').each(function () {
                var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
                if (currentRatingEach <= actualRating) {
                    $(this).addClass('rating-active');
                }
            });
        }
    });
});
 
function showError(msg) {
    console.log(msg);
}
 
function callAPI(data, method, callback) {
    data['format'] = 'json';
 
    $.ajax({
        data: data,
        dataType: 'json',
        url: wgScriptPath + '/api.php',
        type: method,
        success: function (response) {
            if (response.error) {
                showError('API error: ' + response.error.info);
            } else {
                callback(response);
            }
        },
        error: function (xhr, error) {
            showError('AJAX error: ' + error);
        },
        timeout: 10000 // msec
    });
}
 
function submitReview(reviewPageName, reviewRating, userIP, rating) {
    disableEdit = true;
    setTimeout(function () {
        disableEdit = false;
    }, 500);
    callAPI({
        'action': 'query',
        'prop': 'info|revisions',
        'intoken': 'edit',
        'titles': reviewPageName,
        'rvprop': 'content',
        'rvlimit': '1'
    }, 'GET', function (response) {
        var pages = response.query.pages;
        var page = null;
 
        for (var i in pages) {
            page = pages[i];
        }
 
        if (page.missing == "") {
            var content = reviewRating;
 
            callAPI({
                'minor': 'yes',
                'summary': 'Automatische Aktualisierung der Bewertung',
                'action': 'edit',
                'title': reviewPageName,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
				'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
 
                    averageArray = [];
                    var averageRatingSymbols = Math.round(rating);
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingSymbols) {
                            $(this).addClass('rating-average-active');
                        }
                    });
					$('.rating-people').text(1);
 
                    $('.rating-total').attr('data-rating', rating);
 
                    averageArray.push(parseInt(rating));
                } else {
 
                }
            });
        } else {
            var content = page.revisions[0]['*'];
 
            if ((page.length) == 0) {
                var content = reviewRating;
            } else {
                if (content.match(userIP)) {
                    var numbers = new RegExp(userIP + '\:\<\/noinclude>[0-9]([0-9])?', 'm');
                    var content = content.replace(numbers, userIP + '\:\<\/noinclude>' + rating);
                } else {
                    var content = content + ' + ' + reviewRating;
                }
            }
 
            callAPI({
                'minor': 'yes',
                'summary': 'Automatische Aktualisierung der Bewertung',
                'action': 'edit',
                'title': reviewPageName,
                'basetimestamp': page.revisions[0].timestamp,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
				'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
 
 
                    var newAverageArray = [];
                    var newAverageArray = averageArray;
                    var stopSplice = false;
                    var oldRating = $('.rating-total').attr('data-rating');
 
                    for (var i = newAverageArray.length - 1; i >= 0; i--) {
                        if (newAverageArray[i] == oldRating && stopSplice == false) {
                            newAverageArray.splice(i, 1);
                            var stopSplice = true;
                        }
                    }
 
                    newAverageArray.push(parseInt(rating));
 
                    sumRatingNew = 0;
                    for (var x = 0; x < newAverageArray.length; x++) {
                        sumRatingNew = sumRatingNew + newAverageArray[x];
                    }
 
                    averageRatingNew = sumRatingNew / newAverageArray.length;
 
                    var averageRatingSymbols = Math.round(averageRatingNew);
                    $('.rating-average').attr('class', 'rating-average');
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingSymbols) {
                            $(this).addClass('rating-average-active');
                        }
                    });
					$('.rating-people').text(newAverageArray.length);
 
 
                    $('.rating-total').attr('data-rating', rating);
 
                } else {
 
                }
            });
        }
    });
}
 
function getReview(reviewPageName, userIP) {
    callAPI({
        'action': 'query',
        'prop': 'info|revisions',
        'intoken': 'edit',
        'titles': reviewPageName,
        'rvprop': 'content',
        'rvlimit': '1'
    }, 'GET', function (response) {
        var pages = response.query.pages;
        var page = null;
 
        for (var i in pages) {
            page = pages[i];
        }
 
        if (page.missing == "") {
            $('.rating-people').text(0);
        } else {
            var content = page.revisions[0]['*'];
 
            var contentArray = content.split("+");
 
            averageArray = [];
            $(contentArray).each(function (index, value) {
                var averageRatingItem = contentArray[index];
 
                var averageRatingEachExp = new RegExp('\:\<\/noinclude\>[0-9]+', 'm');
                var averageRatingEach = averageRatingItem.match(averageRatingEachExp)[0].replace(':</noinclude>', '');
 
                averageArray.push(parseInt(averageRatingEach));
 
                if (contentArray[index].indexOf(userIP) > -1) {
                    var ratingArrayItem = contentArray[index];
 
                    var ratingRegExp = new RegExp('\:\<\/noinclude\>[0-9]+', 'm');
                    ratingFinal = ratingArrayItem.match(ratingRegExp)[0].replace(':</noinclude>', '');
 
                    $('.rating-total').attr('data-rating', ratingFinal);
 
                    $('.rating').each(function () {
                        var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentRatingEach <= ratingFinal) {
                            $(this).addClass('rating-active');
                        }
                        saveRating = true;
                    });
                }
            });
            sumRating = 0;
            for (var x = 0; x < averageArray.length; x++) {
                sumRating = sumRating + averageArray[x];
            }
 
            averageRating = sumRating / averageArray.length;
 
            var averageRatingSymbols = Math.round(averageRating);
            $('.rating-average').each(function () {
                var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                if (currentAverageRatingEach <= averageRatingSymbols) {
                    $(this).addClass('rating-average-active');
                }
				$('.rating-people').text(averageArray.length);
            });
 
            $('.rating-average').attr('data-amount', averageArray.length);
        }
    });
}
 
/* End rating function */