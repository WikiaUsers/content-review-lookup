/* {{:Projet:JavaScript/Script|HotCatsMultiCustomEdit}} */

/* 

La fonction ci-dessous est appel�e par HotCatsMulti juste avant d'effectuer l'�dition. 
Elle permet de g�rer des difficult�s d'�dition li�es uniquement au wiki sur lequel HotCatsMulti est install�.

*/
//<source lang=javascript>//<pre><nowiki>

function hotcat_EditCustom(){
    var Text = document.getElementById('wpTextbox1').value;
// Ajouter ci-dessous les op�ration � effectuer sur le contenu de la fen�tre de modification (variable "Text")
// ===========================================================================================================

// Enl�ve la fausse cat�gorie en commentaire dans les images qui est prise pour un point de rep�re 
//(http://fr.aigles-et-lys.wikia.com/wiki/Discussion_Projet:JavaScript/Rapport_de_bug&diff=56995134&oldid=56985376)
    if(wgNamespaceNumber==6){
        Text = Text.split("[[Cat�gorie:Image sur Aigles et Lys]]-->").join("-->");
    }



// ===========================================================================================================
// Fin des op�rations sp�ciales
    document.getElementById('wpTextbox1').value = Text; 
}

//</nowiki></pre></source>