/* {{:Projet:JavaScript/Script|HotCatsMultiCustomEdit}} */

/* 

La fonction ci-dessous est appelée par HotCatsMulti juste avant d'effectuer l'édition. 
Elle permet de gérer des difficultés d'édition liées uniquement au wiki sur lequel HotCatsMulti est installé.

*/
//<source lang=javascript>//<pre><nowiki>

function hotcat_EditCustom(){
    var Text = document.getElementById('wpTextbox1').value;
// Ajouter ci-dessous les opération à effectuer sur le contenu de la fenêtre de modification (variable "Text")
// ===========================================================================================================

// Enlève la fausse catégorie en commentaire dans les images qui est prise pour un point de repère 
//(http://fr.aigles-et-lys.wikia.com/wiki/Discussion_Projet:JavaScript/Rapport_de_bug&diff=56995134&oldid=56985376)
    if(wgNamespaceNumber==6){
        Text = Text.split("[[Catégorie:Image sur Aigles et Lys]]-->").join("-->");
    }



// ===========================================================================================================
// Fin des opérations spéciales
    document.getElementById('wpTextbox1').value = Text; 
}

//</nowiki></pre></source>