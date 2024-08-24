// *******************************************
// * Novos botões na barra de ferramentas *
// *******************************************

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Botão de Redirecionamento */
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png', 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');

/* Botão Sim1 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/2/21/Bot%C3%A3o_Sim1.png','Sim1','{{','}}','Sim1\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|casa         = \n|colegas      = \n|animais      = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Sim2 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/3/32/Bot%C3%A3o_Sim2.png','Sim2','{{','}}','Sim2\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|ano            = \n|especialização = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração    = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Sim3 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/7/7e/Bot%C3%A3o_Sim3.png','Sim3','{{','}}','Sim3\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|celebridade  = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|matéria      = \n|carreira     = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|traço1       = \n|traço2       = \n|traço3       = \n|traço4       = \n|traço5       = \n|desejo       = \n|música       = \n|comida       = \n|cor          = \n|grupo1       = \n|grupo2       = \n|grupo3       = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Sim4 */
addCustomButton('https://vignette.wikia.nocookie.net/simswiki/images/d/d7/Bot%C3%A3o_Sim4.jpg/revision/latest?cb=20140906165026&path-prefix=pt-br','Sim4','{{','}}','Sim4\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|família      = \n|pais         = \n|irmãos       = \n|cônjuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|aspiração2   = \n|traçoextra   = \n|traço41      = \n|traço42      = \n|traço43      = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Simbio-começo */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/c/ce/Bot%C3%A3o_Simbio-come%C3%A7o.png','Simbio-começo','{{','}}','Simbio-começo\n|imagem  = \n|nome    = \n|sexo    = \n|família = \n|pais    = \n|irmãos  = \n|cônjuge = \n|filhos  = \n|outros  = \n','');
 
/* Botão Simbio1 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/a/a7/Bot%C3%A3o_Simbio1.png','Simbio1','{{','}}','Simbio1\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Simbio2 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/e/e4/Bot%C3%A3o_Simbio2.png','Simbio2','{{','}}','Simbio2\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|ano            = \n|especialização = \n|espécie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração    = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Simbio3 */
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/8/88/Bot%C3%A3o_Simbio3.png','Simbio3','{{','}}','Simbio3\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|matéria      = \n|carreira     = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|traço1       = \n|traço2       = \n|traço3       = \n|traço4       = \n|traço5       = \n|desejo       = \n|música       = \n|comida       = \n|cor          = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/* Botão Simbio4 */
addCustomButton('https://vignette.wikia.nocookie.net/simswiki/images/3/3e/Bot%C3%A3o_Simbio4.jpg/revision/latest?cb=20140906165401&path-prefix=pt-br','Simbio4','{{','}}','Simbio4\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|espécie      = \n|pele         = \n|peso         = \n|física       = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspiração2   = \n|traçoextra   = \n|traço41      = \n|traço42      = \n|traço43      = \n|aparição     = \n|jogabilidade = \n|morte        = \n|vizinhança   = \n','');
 
/** Botão DEFAULTSORT **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/9/99/Bot%C3%A3o_Defaultsort.png','DEFAULTSORT','{{','}}','DEFAULTSORT:sobrenome, nome','');
 
/* Botão Propriedade */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/6/67/Bot%C3%A3o_PROPRIEDADE.jpg', 'Propriedade','{{','}}','Propriedade\n|1 = \n','');

/* Botão Simsérie */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/6/68/Bot%C3%A3o_SIMS%C3%89RIE.png','Simsérie','{{','}}','Simsérie\n|imagem        = \n|nome          = \n|escritor      = \n|tipo          = \n|motor         = \n|capítulos     = \n|classificação = \n|lançamento    = \n|encerramento  = \n|status        = \n','');

/* Botão Capítulo */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/2/22/Bot%C3%A3o_CAP%C3%8DTULO.jpg','Capítulo','{{','}}','Capítulo\n|imagem        = \n|nome          = \n|escritor      = \n|lançamento    = \n|simsérie      = \n|classificação = \n|temporada     = \n|anterior      = \n|próximo       = \n','');

/* Botão SimsérieVídeo */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/9/9d/Bot%C3%A3o_SIMS%C3%89RIEV%C3%8DDEO.jpg','SimsérieVídeo','{{','}}','SimsérieVídeo\n|imagem        = \n|nome          = \n|tipo          = \n|motor         = \n|temaabertura  = \n|classificação = \n|criação       = \n|roteirista    = \n|produção      = \n|direção       = \n|edição        = \n|dubladores    = \n|episódios     = \n|lançamento    = \n|encerramento  = \n|status        =\n','');

/* Botão Episódio */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/a/af/Bot%C3%A3o_EPIS%C3%93DIO.jpg','Episódio','{{','}}','Episódio\n|imagem        = \n|nome          = \n|lançamento    = \n|simsérie      = \n|classificação = \n|temporada     = \n|anterior      = \n|próximo       = \n','');

/* Botão FilmeFanon */
addCustomButton('https://images.wikia.nocookie.net/simsfanon/pt-br/images/e/ec/Bot%C3%A3o_FILMEFANON.png','FilmeFanon','{{','}}','FilmeFanon\n|imagem       = \n|nome         = \n|lançamento   = \n|duração      = \n|motor        = \n|roteiro      = \n|direção      = \n|edição       = \n|dublagem     = \n|anterior     = \n|sucessor     = \n','');

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
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

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' seconde';
  } else {
    left = (diff%60) + ' secondes';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' minute, et ' + left;
    } else {
      left = (diff%60) + ' minutes, et ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' heure, ' + left;
    } else {
      left = (diff%24) + ' heures, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' jour, ' + left;
    } else {
      left = diff + ' jours, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************