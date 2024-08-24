 // Modèle page protect

if (console) console.log("Modeles.js en marche 2!");

if ( wikiaPageType == "home")
    {
        var contenu='<div style="position:absolute; z-index:100; right:0px; top:-20px;" class="metadata" id="administrator"><a href="http://fr.ippo.wikia.com/wiki/Hajime_no_Ippo_Wiki:Article_Prot%C3%A9g%C3%A9"><img src="https://vignette.wikia.nocookie.net/ippo/images/8/80/Etoile_Protection.png/revision/latest?cb=20141030221923&path-prefix=fr" width="50" height="50" /></a></div>';
        $('.WikiaArticle').before(contenu);
    }