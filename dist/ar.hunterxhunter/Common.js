/* Any JavaScript here will be loaded for all users on every page load. */
 
if ($('.page-User_-_Darkchylde').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://vignette.wikia.nocookie.net/xmenmovies/images/7/7a/Deadpool_thumbs_up.jpg/revision/latest?cb=20150715231436" width="300"></div>');
}
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

if ($('.page-مستخدم_Marceline_Saga').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://vignette.wikia.nocookie.net/hunterxhunter/images/3/3b/Gekijouban_Hisoka1.png/revision/latest?cb=20180918143333" width="300"></div>');
}
 
if ($('.page-Message_Wall_Marceline_Saga').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://vignette.wikia.nocookie.net/hunterxhunter/images/2/2c/Gekijouban_Kurapika1.png/revision/latest?cb=20131128214739="300"></div>');
}

///* SpoilerAlert *///
SpoilerAlert = {
    question: 'قد تحتوي هذه الصفحة على محتويات غير ملائمة لمن هم دون سِنِّ 13. هل تودُّ المتابعة و إظهار محتوى الصفحة؟',
    yes: 'نعم  أظهر',
    no: 'لا, ليس بعد',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('13+');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
        // group: { associated tag data }
        bureaucrat: { u: 'رئيس جمعية الصيادين' },
	}
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat'];
 
/* importArticles */
importArticles({
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Common.js/displayClock.js',
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});
 
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});
 
/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{Visitor}} replacement */
 
if ($('.page-User_TheCarrotSaysYumYum').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/fairytail/images/6/65/Jellal_Zeref%27s_Awakening_Full_size.jpg" width="300"></div>');
}
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
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
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();