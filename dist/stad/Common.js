/* <pre> */

/* Op de hoofdpagina staat nu hoofdpagina in plaats van artikel */
var mpTitle = "Wikistad:Hoofdpagina";
var isMainPage = (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage && !isDiff) {
document.write('<style type="text/css">/*<![CDATA[*/ #siteSub, #contentSub, h1.firstHeading { visibility:visible !important; } /*]]>*/</style>');
}

//Main page tab no longer says article
function mainpg() {
      if ((isMainPage || /[\/=:]Main_Page/.test(document.location)) && document.getElementById('ca-nstab-project')) {
            document.getElementById('ca-nstab-project').firstChild.innerHTML = 'hoofdpagina';
      }   
}
addOnloadHook(mainpg);

/* </pre> */