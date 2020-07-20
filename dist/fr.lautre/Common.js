/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/// = Modèle 'Username'

// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiers de copier {{USERNAME}}.
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + wgUserName + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').text(wgUserName); });


/// = Bouton JavaScript sur le Tableau de Bord Administrateur

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});