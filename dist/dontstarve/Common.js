/* ######################################################################### */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Most scripts can be refered to http://dev.wikia.com */
/* ######################################################################### */

importArticles({
    type: "script",
    article: "u:dev:CopyText/code.js",
});


/* ######################################################################### */
/* Wiki log setting
/* ######################################################################### */

window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log"];
window.ajaxRefresh = 20000; /* 20 seconds */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        bot: { u:'WX-78', link:'Project:Bots' },
        bureaucrat: { u:'Nightmare Throne', link:'Project:Bureaucrats' },
        chatmoderator: { u:'Spokesman of Wes', link:'Project:Custodians' },
        "content-moderator": { u:'Wisdom of Wickerbottom', link:'Project:Custodians'},
        inactive: { u:'Wilson will miss you' },
        rollback: { u:'Shadow Hand', link:'Project:Rollback' },
        custodian: { u:'Custodian', link:'Project:Custodians' },
        sysop: { u:'Admin', link:'Project:Administrators' },
        threadmoderator: { u:'Courage of Wigfrid', link:'Project:Custodians' },
	}
};
UserTagsJS.modules.mwGroups = ['bot', 'bureaucrat', 'chatmoderator','content-moderator', 'sysop', 'inactive', 'rollback', 'bannedfromchat', 'sysop', 'threadmoderator'];
UserTagsJS.modules.inactive = 30; // 30 days



/* ######################################################################### */
/* {{Username}} setting */
/* ######################################################################### */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});



/* ######################################################################### */
/* PreloadFileDescription */
/* Credit: Nanaki
/* ######################################################################### */

PFD_templates = [{
        label: 'Images',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Images]]',
    },
    'Group header', {
        label: 'Videos',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Videos]]',
    },
];
 
PFD_requireLicense = true;


/* ######################################################################### */
/* Collapsible tables */
/* ######################################################################### */

/* The following is code to allow collapsible tables from the Templates wiki - Bluegiest */
/**
 * Collapsible tables ********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[wikipedia:Wikipedia:NavFrame]].
 * Maintainers: [[wikipedia:User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;
    var i;

    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;

    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }

    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) { continue; }
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) { continue; }

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = 'collapseButton';  /* Styles are declared in Common.css */

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }

    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}

$( createCollapseButtons );

/* ######################################################################### */
/* Table Filters */
/* ######################################################################### */

/* Table Filters
 * Copied from [[w:c:starwars]]
 * Show/hide for media timeline -- Grunny
 * modified from Queron
 **/
$( function () {
	if( !$( '.table-filters' ).length ) {
		return;
	}
	$( '.table-filters' ).find( 'div > a' ).click( function () {

		var	hideBtnClass = $( this ).parent().attr( 'class' );
		
		var statusDST = $( 'div.dst > a' ).attr( 'class' );
		var statusRoG = $( 'div.rog > a' ).attr( 'class' );
		var statusSW = $( 'div.sw > a' ).attr( 'class' );
		var statusHam = $( 'div.ham > a' ).attr( 'class' );
		
		var hideContent;
		var filters = '';
		
		
		if(statusDST != 'hidden' && statusRoG != 'hidden' && hideBtnClass != 'dst')
		{
			filters = filters + ':not(.dst)';
		}
		
		if(statusRoG != 'hidden' && hideBtnClass != 'rog')
		{
			filters = filters + ':not(.rog)';
		}
		
		if(statusSW != 'hidden' && hideBtnClass != 'sw')
		{
			filters = filters + ':not(.sw)';
		}
		
		if(statusHam != 'hidden' && hideBtnClass != 'ham')
		{
			filters = filters + ':not(.ham)';
		}
		
		hideContent = $( 'tr.' + hideBtnClass + filters );
		
		if( !hideContent.length ) {
			return;
		}
		
		if ( $( this ).text().search(/\bhide\b/) >= 0 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
			$( '.table-filters' ).find( 'div.' + hideBtnClass + ' > a' ).addClass("hidden").removeClass("visible");
			hideContent.hide();
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
			$( '.table-filters' ).find( 'div.' + hideBtnClass + ' > a' ).addClass("visible").removeClass("hidden");
			hideContent.show();
		}
		
		
	} );
} );

/* ######################################################################### */
/* Lock Old Comments */
/* ######################################################################### */
/* Prevent reply on old page comments */

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365;
window.lockOldComments.addNoteAbove = true;