/**
 * Auberge du jour
 *
 * Lien vers L'Auberge du jour dans le panneau de navigation
 *
 * Auteur : ??
 * Contributeur : Tieno, Maloq
 * Dernière révision : 2 septembre 2008
 * {{:Projet:JavaScript/Script|AubergeDuJour}}
 */
//<source lang=javascript>//<pre><nowiki>
function TodayDate() {
      var m = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
      var today = new Date();
      var day = today.getDate();
      var year = today.getYear();

      if (year < 2000)
           year = year + 1900;

      return (day + " " + m[today.getMonth()] + " " + year);
}

function AubergeDuJour()
{
 addPortletLink('p-navigation', wgArticlePath.split('$1').join('Aigles_et_Lys:L'Auberge/' + TodayDate().replace(/ /g," ") ), 'Auberge du jour', 'n-auberge');
}
addOnloadHook(AubergeDuJour);

//</nowiki></pre></source>