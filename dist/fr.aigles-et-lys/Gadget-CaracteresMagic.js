/*
 * Magic_words
 * 
 * Ajoute les Magic Words Mediawiki dans la liste des caractères spéciaux
 * 
 * Auteur : ??
 * Date de dernière révision : 23 juin 2006
 * {{Projet:JavaScript/Script|caracteres/magic}}
 */
//<source lang=javascript>//<pre><nowiki>
addOnloadHook(function() {
  // Magic words
  if (wgAction == 'edit' || wgAction == 'submit') {

    addSpecialCharsetHTML("Magic words",
          "<a href=\"//meta.wikimedia.org/wiki/Help:Magic_words\">Aide</a>" +
          "<br />TOC / Section :" +
          "<span>" +
          "__NOTOC__ __TOC__ __FORCETOC__ __NOEDITSECTION__ __NEWSECTIONLINK__ __NOGALLERY__ __HIDDENCAT__" +
          "</span>" +
          "<br />Date / Heure (UTC) : " +
          "<span>" +
          "{{CURRENTDAY}} {{CURRENTDAY2}} {{CURRENTDAYNAME}} {{CURRENTMONTH}} {{CURRENTMONTHNAME}} {{CURRENTMONTHABBREV}} {{CURRENTWEEK}} {{CURRENTYEAR}} {{CURRENTTIME}} {{CURRENTHOUR}} {{CURRENTTIMESTAMP}}" +
          "</span>" +
          "<br />Date / Heure (local) : " +
          "<span>" +
          "{{LOCALDAY}} {{LOCALDAY2}} {{LOCALDAYNAME}} {{LOCALMONTH}} {{LOCALMONTHNAME}} {{LOCALMONTHABBREV}} {{LOCALWEEK}} {{LOCALYEAR}} {{LOCALTIME}} {{LOCALHOUR}} {{LOCALTIMESTAMP}}" +
          "</span>" +
          "<br />Pages : " +
          "<span>" +
          "{{PAGENAME}} {{SUBPAGENAME}} {{BASEPAGENAME}} {{NAMESPACE}} {{FULLPAGENAME}} {{TALKSPACE}} {{SUBJECTSPACE}} {{ARTICLESPACE}} {{TALKPAGENAME}} {{SUBJECTPAGENAME}} {{ARTICLEPAGENAME}} {{REVISIONID}} {{REVISIONDAY}} {{REVISIONDAY2}} {{REVISIONMONTH}} {{REVISIONYEAR}} {{REVISIONTIMESTAMP}} {{SITENAME}} {{SERVER}} {{SCRIPTPATH}} {{SERVERNAME}}" +
          "</span>" +
          "<br />Stats : " +
          "<span>" +
          "{{CURRENTVERSION}} {{NUMBEROFEDITS}} {{NUMBEROFARTICLES}} {{NUMBEROFPAGES}} {{NUMBEROFFILES}} {{NUMBEROFUSERS}} {{NUMBEROFADMINS}} {{PAGESINNS:+}}" +
          "</span>");
   }
});

//</nowiki></pre></source>