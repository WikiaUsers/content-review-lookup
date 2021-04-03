/* 
 * Suppression Deluxe
 * 
 * Motifs de suppression prédéfinis
 * Il est possible de définir des messages comportant des liens internes
 * 
 * Auteurs : Dake
 * Modifications : IAlex, Seb35
 * Date de dernière révision : 10 mai 2007
 * {{:Projet:JavaScript/Script|SuppressionDeluxe}}
 */

//////////// Zone personnalisable //////////
var suppressiondeluxeMessages = new Array();
with (suppressiondeluxeMessages) {
        push("Bac à sable");
        push("[[Aigles et Lys:Critères_d'admissibilité_des_articles|Ne répond pas aux critères d'admissibilité]]");
        push("Vandalisme");
        push("Existe avec un autre titre");
        push("Purge ou renommage");
        push("Diffamation ou insulte");
        push("Non encyclopédique en l'état");
        push("Pas en français");
        push("Redirection cassée");
        push("[[Aigles et Lys:Critères_d'admissibilité_des_articles|Contenu promotionnel]]");
        push("Potentielle violation de droits d'auteur");
        push("Licence inappropriée");
        push("Catégorie vide");
        push("[["
             + (wgNamespaceNumber % 2 ?
                 ""
               : "Discussion"
                 + (wgNamespaceNumber ?
                     " " // ← il manquait une espace ici
                   : ":"
                   )
               )
             + wgPageName
             + "/Suppression|Décision PàS]]"
        );

        push("[[Aide:Republication|Copie de site web sans autorisation explicite]]");
        push("Déplacement vers Commons");
        push("Page blanchie par son auteur");
        push("Redirection sans intérêt");
        push("Page de discussion orpheline");
        push("À la demande de son auteur");
}
//////////// Fin de la zone personnalisable //////////

function SuppressionDeluxe() {
        var mainForm = document.getElementById('deleteconfirm');
        if(!mainForm) return;
        var table = document.createElement('table');
        
        for(var i=0; i<suppressiondeluxeMessages.length; i++) {
                if (i%4==0) {
                        tr = document.createElement('tr');
                        table.appendChild(tr);
                }
                var inputConfirm = document.createElement('input');
                inputConfirm.setAttribute('value',suppressiondeluxeMessages[i].replace(/^\[\[.*\|(.*)\]\]$/, '$1'));
                inputConfirm.setAttribute('onclick','SuppressionResume("'+suppressiondeluxeMessages[i]+'");');
                inputConfirm.setAttribute('type', 'button');
                
                var td = document.createElement('td');
                td.appendChild(inputConfirm);
                tr.appendChild(td);
                }
        
        var separation = document.createElement('p');
        separation.appendChild(document.createElement('hr'));
        insertAfter(mainForm.parentNode, separation, mainForm);
        insertAfter(mainForm.parentNode, table, separation);
}
function SuppressionResume(sampleText) {
        var mainForm = document.getElementById('deleteconfirm');
        mainForm.wpReason.value = sampleText;
        mainForm.wpConfirmB.click();
}
if(wgAction == 'delete') addOnloadHook(SuppressionDeluxe