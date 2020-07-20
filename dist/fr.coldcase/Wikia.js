/*##################################################################################################
#                                                                                                  #
#                                         CUSTOM EDIT BAR                                          #
#                                                                                                  #
#       @Auteur original : Avatar888                                                               #
#       @Adaptation par : Hulothe                                                                  #
#       @Usage : Personnalisation de la barre d'outils                                             #
#                                                                                                  #
###################################################################################################*/
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/harrypotter/fr/images/7/7c/Outils-Personnage.png",
		"speedTip": "Insérer le modèle {{Personnage}}",
		"tagOpen": "\{\{Personnage\r|Nom=",
		"tagClose": "\r|Image= \r|Surnom= \r|Sexe= \r|Naissance= \r|Mort= \r|Famille= \r|Occupation= \r|Affiliation= \r|Première= \r|Dernière= \r|Interprète= \r|Doubleur VF= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/harrypotter/fr/images/7/71/Outils-Lettre.png",
		"speedTip": "Insérer le modèle {{Lettre}}",
		"tagOpen": "\{\{Lettre\r|Nom=",
		"tagClose": "\r|Image= \r|Expéditeur= \r|Destinataire= \r|Date= \r|Sujet= \r|Livraison= \r|Première= \r|Dernière= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insérer le modèle {{Fichier}} pour ajouter une description.",
		"tagOpen": "==Description==",
		"tagClose": "\r\{\{Fichier\r|Description=\r|Date= \r|Auteur= \r|Source= \r|Licence= \r|Et plus= \r\}\}",
		"sampleText": ""};
}