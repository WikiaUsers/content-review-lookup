/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Apparition des symboles pique, trèfle, carreau et coeur au survol du Modèle:MembreDF
Auteur:Franky003 */

// "Unité Pique"
function Pique () {
$('#navpique').html("<span style='font-weight:bold;'>♠ Unité Pique ♠</span>");
}
function RePique () {
$('#navpique').html("<span style='font-weight:bold;'>Unité Pique</span>");
}
jQuery('#navpique').mouseover(Pique).mouseout(RePique);

// "Unité Carreau"
function Carreau () {
$('#navcarreau').html("<span style='font-weight:bold;'>♦ Unité Carreau ♦</span>");
}
function ReCarreau () {
$('#navcarreau').html("<span style='font-weight:bold;'>Unité Carreau</span>");
}
jQuery('#navcarreau').mouseover(Carreau).mouseout(ReCarreau);

// "Unité Trèfle"
function Trefle () {
$('#navtrefle').html("<span style='font-weight:bold;'>♣ Unité Trèfle ♣</span>");
}
function ReTrefle () {
$('#navtrefle').html("<span style='font-weight:bold;'>Unité Trèfle</span>");
}
jQuery('#navtrefle').mouseover(Trefle).mouseout(ReTrefle);

// "Unité Coeur"
function Coeur () {
$('#navcoeur').html("<span style='font-weight:bold;'>♥ Unité Cœur ♥</span>");
}
function ReCoeur () {
$('#navcoeur').html("<span style='font-weight:bold;'>Unité Cœur</span>");
}
jQuery('#navcoeur').mouseover(Coeur).mouseout(ReCoeur);