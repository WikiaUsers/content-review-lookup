// Inicio del botón collapse WikiaRail

function fanonScreen(){
  $(".WikiaPage").css("width", "99%");
  $(".WikiaHeader,.WikiaFooter,.WikiaArticleComments,.WikiaSearch,.WikiHeaderRestyle,#WikiaPageHeader a,.wikia-menu-button,.RelatedPagesModule,#csAddCategorySwitch,#WikiaArticleBottomAd,.editsection").css("display", "none");
  $(".WikiaArticleCategories").css("width", "96,5%");
  $("#WikiaRail").css("position", "absolute");
  $("#WikiaMainContent").css("width", "100%");
  $("#GioviScript").css("display", "inline");
  $("#WikiaRail section,#WikiaRail div").css("display", "none");
  $("#WikiaRailCollapseButton").css("display", "block").css("left", "305px").unbind().click(unfanonScreen).attr("title", "Cerrar pantalla completa");
  $("#WikiaRailCollapseButton img").css("border-color", "transparent #006CB0 transparent transparent").css("border-width", "9px 9px 9px 0px");
/*  document.cookie = "fanonScreen=true"; */
}
function unfanonScreen(){
  $(".WikiaHeader,.WikiaFooter,.WikiaArticleComments,.WikiaSearch,.WikiHeaderRestyle,.editsection,.RelatedPagesModule,#csAddCategorySwitch,#WikiaArticleBottomAd").css("display", "block");
  $(".WikiaPage").css("width", "1000px");
  $("#WikiaMainContent").css("width", "68%");
  $("#WikiaPageHeader a,.wikia-menu-button").css("display", "inline-block");
  $("#WikiaRail").css("position", "relative");
  $("#GioviScript").css("display", "none");
  $("#WikiaRail section,#WikiaRail div").css("display", "block");
  $("#WikiaRailCollapseButton").css("left", "-9px").unbind().click(fanonScreen).attr("title", "Pantalla completa");
  $("#WikiaRailCollapseButton img").css("border-color", "transparent transparent transparent #006CB0").css("border-width", "9px 0px 9px 9px");
/*  document.cookie = "fanonScreen=false"; */
}

$(function(){
  if (window.wgIsMainpage || window.wgCanonicalNamespace == 'User_talk' || window.wgCanonicalNamespace == 'User' || window.wgCanonicalNamespace == 'Special') return;
  $("#wikiPreview").css("margin-right", "0px");
  var img = $("<img>").attr("src", "https://images.wikia.nocookie.net/__cb28671/common/skins/common/blank.gif").attr("accesskey", "9").css("height", "0px").css("width", "0px").css("border-style", "solid");
  var imgdiv = $("<div>").css("position", "absolute").css("top", "250px").css("padding", "5px").css("cursor", "pointer").css("z-index", "5").attr("id", "WikiaRailCollapseButton").append(img);
  $("#WikiaRail").css("right", "0px").append(imgdiv);
    $("#WikiaMainContent").append("<div style='text-align:center; padding:10px;' id='GioviScript'>Script fanonScreen desarrollado por <a href='http://www.giovixd.com.ar'>Giovi</a> a partir del script collapseWikiaRail del usuario retirado (obligatoriamente) <a href='http://es.wikia.com/wiki/Usuario:Zeratul_100'>Zeratul 100</a> con la licencia CC-BY-SA, en la que Usted es libre de: Compartir - copiar, distribuir, ejecutar y comunicar públicamente la obra, hacer obras derivadas y hacer un uso comercial de esta obra BAJO LAS CONDICIONES SIGUIENTES: Atribución — Debe reconocer los créditos de la obra de la manera especificada por el autor o el licenciante (pero no de una manera que sugiera que tiene su apoyo o que apoyan el uso que hace de su obra). Compartir bajo la Misma Licencia — Si altera o transforma esta obra, o genera una obra derivada, sólo puede distribuir la obra generada bajo una licencia idéntica a ésta.</div>");
  var cookie = document.cookie.match('(^|;) ?fanonScreen=([^;]*)(;|$)');
  var collapse = cookie? unescape(cookie[2]) : "false";
  if (collapse == "true")
    fanonScreen();
  else
    unfanonScreen();
});