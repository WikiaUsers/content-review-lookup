/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/trains/images/c/cb/Icone-train.png",
		"speedTip": "Ajouter une infobox {{Matériel roulant}}",
		"tagOpen": "\{\{Matériel roulant\r|Nom = \r|image = \r|comment_image = \r|exploitant = \r|type = \r|lignes = \r|composition = \r|conduite = \r|constructeur = \r|mise_en_service = \r|effectif =",
		"tagClose": "\r\}\}",
		"sampleText": ""};
}