/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkownik//<pre>
// Ukrywanie tytułu strony głównej
var mpTitle = "Wiki o Kurowie:Strona główna - Wiki o Kurowie";
var isMainPage = (document.title == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));
if (isMainPage && !isDiff) document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
//</pre>
//<pre>
// Flaga
document.write('<style type="text/css">#interProject {display: none; speak: none;} #p-tb .pBody {padding-right: 0;}<\/style>');
 function iProject() {
  if (document.getElementById("interProject")) {
   var iProject = document.getElementById("interProject").innerHTML;
   var interProject = document.createElement("div");
   interProject.style.marginTop = "0.7em";
   interProject.innerHTML = '<h5>Correlatos<\/h5><div class="pBody">'+iProject+'<\/div>';
   document.getElementById("p-tb").appendChild(interProject);
  }
 }
 hookEvent("load", iProject);
//</pre>

NavigationBarShowDefault = 100;