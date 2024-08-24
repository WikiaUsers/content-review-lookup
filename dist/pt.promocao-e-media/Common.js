/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */

/* Etiqueta personalizada para usuários - Créditos à Wiki Naruto e Dev Wikia */
function addMastheadTags() {
    var rights = {},
        user   = "";
    rights["Goncasdio"] = ["Equipe"];
    rights["Lord_of_Omniverse"] = ["Divulgador"];

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }

    }
}