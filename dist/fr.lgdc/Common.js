/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}