/* Code permettant d'avoir un lien vers la catégorie utilisateur 
 * Par Fujimaru-kun
 */
function getCatUser() {
     //Récupération du nom d'utilisateur
     var config = mw.config.get([
            'wgArticlePath',
            'wgUserName'
        ]);
     //On ne créé le lien que si l'utilisateur est connecté
     if(config.wgUserName !== null) {
       //Création du lien
       return '♦ <a href="' + config.wgArticlePath.replace('$1', 'Catégorie:' + config.wgUserName) + '"> <span class="liensidebarnouvelle">Mes pages</span></a>';
       //Ajout du lien à la balise span qui a l'id mypages
     }
     return ' ';
}

$(document).ready(function() {
    var newSection = '<section id="sidebarnouvelle" class="rail-module">' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/fr/api.php?action=parse&text={{SidebarNouvelles}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebarnouvelle').append(code);
        $('.mypages').append(getCatUser());
    });
});