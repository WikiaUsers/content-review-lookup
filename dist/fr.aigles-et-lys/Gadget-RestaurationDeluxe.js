/**
 * '''Restauration Deluxe'''
 *
 * Cocher/D�cocher rapidement les cases pour restaurer un article
 *
 * Auteur : G�T�
 * Derni�re r�vision : 27 septembre 2011
 * {{Cat�gorisation JS|RestaurationDeluxe}}
 */

function UndeleteSelectAll(){
        var title2 = document.getElementsByTagName('h2');
        if(!title2 || title2.length==0) return;
        var all = document.createElement('input');
        all.setAttribute('type', 'checkbox');
        all.setAttribute('onclick', 'SelectAllInputs(this.checked)');
        all.setAttribute('title', 'S�lectionner/D�s�lectionner tous');
        title2[title2.length-1].appendChild(all);
        all.click();
}

function SelectAllInputs(bool){
        var inputs = document.getElementById('undelete').getElementsByTagName('input');
        for (var cpt = 0 ; cpt < inputs.length ; cpt++){
                inputs[cpt].checked = bool;
        }
}

if(wgCanonicalSpecialPageName == 'Undelete') addOnloadHook(UndeleteSelectAll);