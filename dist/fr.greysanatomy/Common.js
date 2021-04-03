/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

/ ** Tables pliantes ********************************************* ************
 *
 * Description: Permet tables à effondrés, ne montrant que l'en-tête. Voir
 * Http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 * Responsables: [[fr: Utilisateur: R. Koot]]
 * /
 
var autoCollapse =  2 ; 
var collapseCaption =  'cacher' ; 
var expandCaption =  'show' ;
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        si  (  ! Table | |  ! Bouton )  { 
                retourner  faux ; 
        }
 
        var Rows = tableau. rangées ;
 
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
 
        pour  (  var i =  0 ; i < Tables. longueur ; i + +  )  { 
                si  ( hasClass ( tableaux [ i ] ,  'pliable'  )  )  {
 
                        / * Seulement bouton et incrémentation du compteur ajouter si il ya une rangée d'en-tête de travailler avec
                          
                           
                                
                        
                          
                           
                                
                        
 
                        NavigationBoxes [ tableIndex ]  = Tables [ i ] ; 
                        tableaux [ i ] . setAttribute (  'id' ,  'collapsibleTable'  + tableIndex ) ;
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        . Bouton className  =  'collapseButton' ;  / / Styles sont déclarés dans [[MediaWiki: Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header. insertBefore ( Bouton , en-tête. childNodes [ 0 ]  ) ; 
                        tableIndex + +; 
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
 
addOnloadHook ( createCollapseButtons ) ;
 
/ ** Teste si un élément a une certaine classe **************************************
 *
 * Description: utilise des expressions régulières et la mise en cache pour améliorer les performances.
 * Responsables: [[User: Mike Dillon]], [[User: R. Koot]], [[User: SG]]
 * /
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
[ edit ] Common.css
/ ** Tables pliantes ********************************************* ************
 *
 * Description: Permet tables à effondrés, ne montrant que l'en-tête. Voir
 * Http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 * Responsables: [[fr: Utilisateur: R. Koot]]
 * /
 
tableau . effondré tr pliable.  { 
        affichage :  aucun ; 
}
 
. CollapseButton  {                / * 'show' / boutons «cacher» créés dynamiquement par l'* / 
        float :  droit ;            / * CollapsibleTables JavaScript dans [[MediaWiki: Common.js]] * / 
        font-weight :  normale ;     / * sont StyLED ici de sorte qu'ils peuvent être personnalisés. * / 
        text-align :  droit ; 
        largeur :  auto ; 
}

/* Protection de catégorisation massive */
window.MassCategorizationGroups = ['sysop', 'content-moderator', 'bot'];