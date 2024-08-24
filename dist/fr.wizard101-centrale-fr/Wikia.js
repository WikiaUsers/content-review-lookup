// 05/06/2015
$(document).ready( function() {
   importArticles({
       type: "style",
       article: "MediaWiki:ArticleStyle.css"
    });
    
    var hName = $('hgroup h1'), hTag = $('hgroup .tag'),
    specialTag = ['Fondateur', 'Administrateur', 'Mod�rateur'],
    wizardTag = ['Cofondateur', 'Grand ma�tre sorcier', 'Ma�tre sorcier',
'Magicien �s lettres', 'Magicien �s arts'];

    for(var i = 0; i < specialTag.length; i++){
        switch(i){
            case 0 :
                if(hTag.text() == specialTag[i]|| hTag.text() == specialTag[i + 1]){
                    hTag.after($('<span />').append(wizardTag[i+1]).addClass('tag'));
                }
                else{
                    hName.after($('<span />').append('Savant(e) Sorcier(i�re)').addClass('tag'));
                }
            break;
        }
    }
    
/* Personalisation des "titres"  
    var titre = $('hgroup .tag'), userName = $('hgroup h1'),
    nouveauTitre = $('<span></span>');
    
    if(userName.text() == 'Namri57') {
        titre.text('Co-fondateur'); //Inqiquer Namri57 comme co-fondateur
    }
    
    if(titre.text() == 'Fondateur'
    || titre.text() == 'Co-fondateur'
    || titre.text() == 'Administrateur') {
        //Affichage d'un titre suppl�mentaire pour les Admins
        titre.after(nouveauTitre.addClass('tag').text('Grand ma�tre sorcier'));
    }
    else if (titre.text() == 'Mod�rateur') {
        //Affiche d'un titre suppl�mentaire pour les Modos
        titre.after(nouveauTitre.addClass('tag').text('Ma�tre sorcier'));
    }
    else {
        //Affichage d'un titre suppl�mentaire pour les Utilisateurs ordinaires
        userName.after(nouveauTitre.addClass('tag').text('Savant(e) Sorcier(i�re)'));
    } */
});