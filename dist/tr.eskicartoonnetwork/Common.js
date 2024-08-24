importScriptPage('DupImageList/code.js', 'dev');

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Spam',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': 'Vandalismo',
  'label': 'Vandalismo'};

function emptyLicenseAlert(form) {
	var msg = "O arquivo de licença não for selecionado."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
/* Import */
importArticles({
    type: 'script',
    articles: [
        'w:c:pt-br.cartoonnetwork:MediaWiki:Common.js/BackToTopButton.js', // "Back to top" button - Obtained from Wikia Developers Wiki @ w:c:dev:BackToTopButton
    ]
});
 
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries
 
// As descrições dos grupos de usuários ativos no perfil do usuário
importScript('MediaWiki:Common.js/userRightsIcons.js');
// FIM das descrições dos grupos de usuários ativos no novo perfil de usuário
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
 var autoCollapse = 2;
 var collapseCaption = "esconder";
 var expandCaption = "mostrar";
 
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
             Button.style.width = "4em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
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

// Tabber
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab7: null,
    tab8: null,
    tab9: null,
    tab10: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    tab7Selector: null,
    tab8Selector: null,
    tab9Selector: null,
    tab10Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 7) {
            Tabs.tab7.hide(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 8) {
            Tabs.tab8.hide(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 9) {
            Tabs.tab9.hide(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 10) {
            Tabs.tab10.hide(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7.show(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8.show(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9.show(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10.show(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
        Tabs.tab7 = $('#content-7');
        Tabs.tab7Selector = $('#selector-7').click(function () {
            Tabs.changeTab(7);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab7Selector.hover(function () {
            Tabs.hoverTab(7);
        }, function () {
            Tabs.unhoverTab(7);
        });
        Tabs.tab8 = $('#content-8');
        Tabs.tab8Selector = $('#selector-8').click(function () {
            Tabs.changeTab(8);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab8Selector.hover(function () {
            Tabs.hoverTab(8);
        }, function () {
            Tabs.unhoverTab(8);
        });
        Tabs.tab9 = $('#content-9');
        Tabs.tab9Selector = $('#selector-9').click(function () {
            Tabs.changeTab(9);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab9Selector.hover(function () {
            Tabs.hoverTab(9);
        }, function () {
            Tabs.unhoverTab(9);
        });
        Tabs.tab10 = $('#content-10');
        Tabs.tab10Selector = $('#selector-10').click(function () {
            Tabs.changeTab(10);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab10Selector.hover(function () {
            Tabs.hoverTab(10);
        }, function () {
            Tabs.unhoverTab(10);
        });
    }
};
Tabs.init();

// Diminuir os dias para bloquear os comentários 
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;