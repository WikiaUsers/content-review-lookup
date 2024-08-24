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
		"speedTip": "Ins�rer le mod�le {{Personnage}}",
		"tagOpen": "\{\{Personnage\r|Nom=",
		"tagClose": "\r|Image= \r|Surnom= \r|Sexe= \r|Naissance= \r|Mort= \r|Famille= \r|Occupation= \r|Affiliation= \r|Premi�re= \r|Derni�re= \r|Interpr�te= \r|Doubleur VF= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/harrypotter/fr/images/7/71/Outils-Lettre.png",
		"speedTip": "Ins�rer le mod�le {{Lettre}}",
		"tagOpen": "\{\{Lettre\r|Nom=",
		"tagClose": "\r|Image= \r|Exp�diteur= \r|Destinataire= \r|Date= \r|Sujet= \r|Livraison= \r|Premi�re= \r|Derni�re= \r|Galerie= \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Ins�rer le mod�le {{Fichier}} pour ajouter une description.",
		"tagOpen": "==Description==",
		"tagClose": "\r\{\{Fichier\r|Description=\r|Date= \r|Auteur= \r|Source= \r|Licence= \r|Et plus= \r\}\}",
		"sampleText": ""};
}