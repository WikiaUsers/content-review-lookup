$('.WikiaRail').append('<section class="module"><h1>aa</h1>O <b>aaaaaaaaaaaaaa</section>');

/* Adiciona um botão para ver o código da página, apenas o código */
importScriptPage('View_Source/code.js', 'dev'); 

/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Gadget de referências */
importScriptPage('ReferencePopups/code.js', 'dev');

/* Top editores */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{UsuárioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
   
/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 3,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

// Wordmark replacer, uses 750x195 wordmark, since the wordmark will lose some of its elements (mostly outlines and glows) on 250x65.
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.indexOf('https://vignette.wikia.nocookie.net/pokepediabr/images/8/89/Wiki-wordmark.png/revision/latest?cb=20160210054103&path-prefix=pt-br') !== -1) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/plants-vs-zombies-fan-fiction/images/8/89/Wiki-wordmark.png/revision/latest?cb=20150403031006", "https://vignette.wikia.nocookie.net/plants-vs-zombies-fan-fiction/images/7/72/750x195logo.png");
        }
    }
}
changeSourceAll();

// add the original english title as a subtitle for the article, linking to corresponding page.
function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('WikiaPageHeader');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}
 
// add the original english title as a subtitle.
  showEnTitle();