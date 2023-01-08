/*HERE STARTS THE WORKING-CODE OF "METABOXES"*/
 
 /* Funcionament de la Plantilla:Metacaixa
 Implementat per: Usuari:Peleguer.
 Actualitzat per Joanjoc seguint les indicacions d'en Martorell
 */
 
 function MetaCaixaInit(){
  //S'executa al carregar-se la pàgina, si hi ha metacaixes,
  // s'assignen els esdeveniments als botons
  //alert("MetaCaixaInit");
 
  var i=0       //Inicialitzem comptador de caixes
  for (i=0;i<=9;i++){
     var vMc = document.getElementById("mc"+i);
     if (!vMc) break;
     //alert("MetaCaixaInit, trobada Metacaixa mc"+i);
 
     var j=1    //Inicialitzem comptador de botons dins de la caixa
     var vPsIni = 0  //Pestanya visible inicial
     for (j=1;j<=9;j++){
        var vBt = document.getElementById("mc"+i+"bt"+j);
        if (!vBt) break;
        //alert("MetaCaixaInit, trobat botó mc"+i+"bt"+j);
        vBt.onclick = MetaCaixaMostraPestanya;          //A cada botó assignem l'esdeveniment onclick
        //alert (vBt.className);
        if (vBt.className=="mcBotoSel") vPsIni=j;  //Si tenim un botó seleccionat, en guardem l'index
     }
     //alert ("mc="+i+", ps="+j+", psini="+vPsIni );
     if (vPsIni == 0) { //Si no tenim cap botó seleccionat, n'agafem un aleatòriament
         vPsIni = 1+Math.floor((j-1)*Math.random()) ;
         //alert ("Activant Pestanya a l'atzar; _mc"+i+"bt"+vPsIni +"_");
         document.getElementById("mc"+i+"ps"+vPsIni).style.display = "block";
         document.getElementById("mc"+i+"ps"+vPsIni).style.visibility = "visible";
         document.getElementById("mc"+i+"bt"+vPsIni).className="mcBotoSel";
     } 
  }
 }
 
 function MetaCaixaMostraPestanya(){
  //S'executa al clicar una pestanya,
  //aquella es fa visible i les altres s'oculten
  var vMcNom = this.id.substr(0,3); //A partir del nom del botó, deduïm el nom de la caixa
  var vIndex = this.id.substr(5,1); //I l'index
 
  var i=1
  for (i=1;i<=9;i++){        //busquem totes les pestanyes d'aquella caixa
      //alert(vMcNom+"ps"+i);
        var vPsElem = document.getElementById(vMcNom+"ps"+i);
        if (!vPsElem) break;
        if (vIndex==i){ //Si és la pestanya bona la mostrem i canviem la classe de botó
                vPsElem.style.display = "block";
                vPsElem.style.visibility = "visible";
                document.getElementById(vMcNom+"bt"+i).className="mcBotoSel";
        } else {             //Sinó, l'ocultem i canviem la classe de botó
                vPsElem.style.display = "none";
                vPsElem.style.visibility = "hidden";
                document.getElementById(vMcNom+"bt"+i).className="mcBoto";
        }
  }
  return false; //evitem la recàrrega de la pàgina
 }
 
 addOnloadHook(MetaCaixaInit);
 
 /*HERE FINISHES THE WORKING-CODE OF "METABOXES"*/
 
 
/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','Moja strona użytkownika, tylko moja!');
ta['pt-anonuserpage'] = new Array('.','Strona użytkownika dla numeru ip, spod którego edytujesz');
ta['pt-mytalk'] = new Array('n','Moja dyskusja');
ta['pt-anontalk'] = new Array('n','Dyskusja adresu IP');
ta['pt-preferences'] = new Array('','Preferencje');
ta['pt-watchlist'] = new Array('l','Lista stron, na których obserwujesz zmiany');
ta['pt-mycontris'] = new Array('y','Wkład użytkownika');
ta['pt-login'] = new Array('o','Jest zalecane, abyś się zalogował, aczkolwiek logowanie nie jest konieczne.');
ta['pt-anonlogin'] = new Array('o','Jest zalecane, abyś się zalogował, aczkolwiek logowanie nie jest konieczne.');
ta['pt-logout'] = new Array('o','Wylogowanie');
ta['ca-talk'] = new Array('t','Dyskusja tej strony');
ta['ca-edit'] = new Array('e','Możesz edytować tę stronę. Użyj podglądu przed zapisaniem.');
ta['ca-addsection'] = new Array('+','Dodaj komentarz do tej dyskusji.');
ta['ca-viewsource'] = new Array('e','Ta strona jest zabezpieczona. Możesz zobaczyć jej źródło.');
ta['ca-history'] = new Array('h','Wcześniejsza wersja strony.');
ta['ca-protect'] = new Array('=','Zabezpiecz stronę');
ta['ca-delete'] = new Array('d','Usuń stronę');
ta['ca-undelete'] = new Array('d','Odtwórz edycje tej strony sprzed usunięcia');
ta['ca-move'] = new Array('m','Przenieś tę stronę');
ta['ca-watch'] = new Array('w','Dodaj stronę do listy obserwowanych');
ta['ca-unwatch'] = new Array('w','Usuń stronę z listy obserwowanych');
ta['search'] = new Array('f','Przeszukaj wiki');
ta['p-logo'] = new Array('','Strona główna');
ta['n-mainpage'] = new Array('z','Odwiedź stronę główną');
ta['n-portal'] = new Array('','O projekcie, o to, co możesz pisać i gdzie znaleźć potrzebne rzeczy');
ta['n-currentevents'] = new Array('','Tak, tutaj jest artykuł na medal. Co tydzień inny, jeszcze lepszy.');
ta['n-recentchanges'] = new Array('r','Lista ostatnich zmian na tej Wikii.');
ta['n-randompage'] = new Array('x','Wybierz stronę za mnie!');
ta['n-help'] = new Array('','Strony pomocy.');
ta['n-sitesupport'] = new Array('','Wspomóż nas, no śmiało.');
ta['t-whatlinkshere'] = new Array('j','Lista wszystkich stron, które zawierają link do tej strony');
ta['t-recentchangeslinked'] = new Array('k','Ostatnie zmiany na stronach, które linkują do tej strony');
ta['feed-rss'] = new Array('','RSS feed dla tej strony');
ta['feed-atom'] = new Array('','Atom feed dla tej strony');
ta['t-contributions'] = new Array('','Zobacz wkład tego użytkownika.');
ta['t-emailuser'] = new Array('','Wyślij e-mail do tego użytkownika.');
ta['t-upload'] = new Array('u','Załaduj grafikę lub media');
ta['t-specialpages'] = new Array('q','Lista wszystkich stron specjalnych');
ta['ca-nstab-main'] = new Array('c','Zobacz stronę');
ta['ca-nstab-user'] = new Array('c','Zobacz stronę użytkownika');
ta['ca-nstab-media'] = new Array('c','Zobacz stronę z mediami');
ta['ca-nstab-special'] = new Array('','To jest stona specjalna. Nie możesz jej samodzielnie edytować.');
ta['ca-nstab-wp'] = new Array('a','Zobacz stronę meta');
ta['ca-nstab-image'] = new Array('c','Zobacz stronę grafiki');
ta['ca-nstab-mediawiki'] = new Array('c','Zobacz komunikat systemowy');
ta['ca-nstab-template'] = new Array('c','Zobacz szablon');
ta['ca-nstab-help'] = new Array('c','Zobacz stronę pomocy');
ta['ca-nstab-category'] = new Array('c','Zobacz stronę kategorii');
 
 
// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 // autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 // licencja: GFDL
 // set up the words in your language
 var NavigationBarHide = '[ Ukryj ]';
 var NavigationBarShow = '[ Pokaż ]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1; 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addOnloadHook(function(){createNavigationBarToggleButton();});
 
 // END Dynamic Navigation Bars
 // ============================================================
 
 
// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================
 
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
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
/* customized for Fallout wiki */
 
var autoCollapse = 2;
var collapseCaption = "Ukryj";
var expandCaption = "Pokaż";
 
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
    var collapseIndex = 0;
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
            Button.className = "t_show_hide";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
 
            if ( !hasClass( Tables[i], "nocount" ) ) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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
 
// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================