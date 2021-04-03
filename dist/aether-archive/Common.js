/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage( 'QuickIW/code.js', 'dev' );
window.UserTagsJS = {
    modules: {},
    tags: {
        devcode: {
            u: 'Aether Team',
            title: 'Developer',
            order: -1 / 0
        },
        devtexture: {
            u: 'Aether Team',
            title: 'Texture Artist',
            link: 'Chase',
            order: -1 / 0
        },
        devart: {
            u: 'Aether Team',
            title: 'Artist/Concept Artist',
            link: 'OscarPayn',
            order: -1 / 0
        },
        devwriter: {
            u: 'Aether Team',
            title: 'Lore Writer',
            link: 'Liberty',
            order: -1 / 0
        },
        devmusic: {
            u: 'Aether Team',
            title: 'Music Composer',
            link: 'Emile van Krieken',
            order: -1 / 0
        },
        owner: {
            u: 'Current Owner',
            title: 'Adopted Wiki',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'Bureaucrat'
        },
        founder: {
            u: 'Original Founder'
        }
    }
};

UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days

UserTagsJS.modules.userfilter = {
    'IStoleThePies': ['sysop', 'bureaucrat']
};

UserTagsJS.modules.custom = {
    'IStoleThePies': ['owner'],
        'LibertyPrimeTF2': ['devwriter'],
        'OzzAR0th': ['devart']
};
importArticle({
    type: 'script',
    article: 'w:c:dev:UserTags/code.js'
});

UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days

UserTagsJS.modules.userfilter = {
    'IStoleThePies': ['sysop', 'bureaucrat']
};

UserTagsJS.modules.custom = {
    'IStoleThePies': ['owner'],
        'LibertyPrimeTF2': ['devwriter'],
        'OzzAR0th': ['devart']
};

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null !== replace) {
    var getvalue = replace.getAttribute("class");
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
 
            Button.style.styleFloat = "right";    //
            Button.style.cssFloat = "right";      // REMOVE THESE LINES
            Button.style.fontWeight = "normal";   // ON 10 FEBRUARY 2009
            Button.style.textAlign = "right";     // 
            Button.style.width = "6em";           //
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createCollapseButtons );