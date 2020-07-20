// Notiplus (For notifications)
window.notiplus = window.notiplus || {};
notiplus.consentRequired = false;
notiplus.pagename = 'MediaWiki:Custom-notiplus';

// The SocialBlade Widget
$('.SocialBladeWidget').each(function() {
    var sbname = $(this).data("name");
    $(this).html('<iframe class="sbframe" src="http://widget.socialblade.com/widget.php?v=2&u=' +sbname+ '" scrolling="no" frameBorder="0"></iframe>').show();
});

// Tell users to write summaries in the Visual Editor
if( window.location.href.indexOf('veaction=edit') >= 0 ) {
    $('body').prepend('<div class="ve-edit-summary-alert">'+
    'Dear editor! We would like you to add an edit summary before publishing every edit. Please, make sure to briefly describe what you changed to this article. Thank you!</div>');
}

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "less";
 var expandCaption = "more";
 
 function collapseTable( tableIndex ) {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
 
 function createCollapseButtons() {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
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
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

// Page Rating
window.votingconfig = {
  strings: {
    none: 'none',
    votesavg: 'Average vote',
    votescount: 'Votes',
    uservote: 'Your vote',
    views: 'Views',
    revcount: 'Edits',
    seemore: 'See more...',
    hide: '(<a>hide</a>)'
  },
  style: {
    starsColor: {
      normal: 'FFDC00',
      empty: '999999',
      hover: 'FF851B'
    },
    starSize: {
      other: 20
    },
    transitions: {
      starsWidth: '0.25s',
      starsColor: '0.25s',
      monobookStatsHeight: '0.5s'
    },
    monobookClasses: '',
    monobookId: 'p-voting',
    custom: ''
  },
  enabled: {
    allowedNamespaces: ['', 'File'],
    excludedPages: [wgMainPageTitle],
    mustBeArticle: true,
    customCheck: function customCheck() {
      return true;
    }
  },
  monobookElement: '#p-navigation',
  disableViews: true,
  header: function header() {
    switch (wgCanonicalNamespace) {
      case '':
        return 'Rate article';
      case 'File':
        return 'Rate file';
      default:
        return 'Rate page';
    }
  },
  ratings: function ratings() {
    return {
      1: 'Worst',
      2: 'Bad',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
  }
};


/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Custom edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:Custom-StandardEditSummary'
};

/*Fixing the search for RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log"
};