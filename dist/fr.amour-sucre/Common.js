/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
// Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js
var disclaimerNs=[0,1,4,5,6,7,14,15,110,111,400,401,500,502,503,-1];
if (disclaimerNs.indexOf(wgNamespaceNumber) !== -1) {
	var legaltext="Amour Sucré est un jeu du studio de création Beemoov. Le wiki Amour Sucré est un site indépendant non sponsorisé par le groupe Beemoov. Les images proviennent en majorité du jeu.";
	var legaldiv='<div id="lcowiki_legal"><div style="clear:both"></div><br><center><div class="legaldisclaimer">'+legaltext+"</div></center></div>";
	$(".page-content").append(legaldiv);
		
	$(".legaldisclaimer").css({
	  padding:"2px 5px",
	  marginTop:"1em",
 	  clear:"both",
	  fontSize:"85%",
	  border:"1px solid #58c5ea",
	  backgroundColor:"var(--theme-page-background-color--secondary)",
	  borderRadius:"7px",
	  boxShadow: "0 0 5px 0 rgba(58,81,86,.39)",
	})
}