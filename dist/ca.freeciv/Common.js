/* Es carregarà per a tots els usuaris, i per a qualsevol pàgina, el codi JavaScript que hi haja després d'aquesta línia. */
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

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Amaga";
 var expandCaption = "Mostra";
 
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
 
 addOnloadHook( createCollapseButtons );