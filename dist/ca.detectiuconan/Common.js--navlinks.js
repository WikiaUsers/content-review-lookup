/* Afegeix el link "Nosaltres" al menú "On the Wiki"
 * De RuneScape Wiki, modificat per: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Detectiu_Conan_Wiki:Nosaltres">Nosaltres</a></li>');
    }
});