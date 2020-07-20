/*Boutons modèles pour la modification classique*/

/*mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/XXX/revision/latest?path-prefix=fr",
        "speedTip": "",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": ""
    };*/

if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
    
    /*Faux "bouton" pour faire une démarquation visible*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "",
		"speedTip": " ‾ "};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/central/images/f/fd/Button_underline.png/revision/latest",
		"speedTip": "Texte souligné",
		"tagOpen": "<u>",
		"tagClose": "</u>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Texte barré",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png/revision/latest",
		"speedTip": "Texte en exposant",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/central/images/a/aa/Button_sub_letter.png/revision/latest",
		"speedTip": "Texte en indice",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
		"speedTip": "Plus grand (ne pas en abuser !)",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
		"speedTip": "Plus petit (ne pas en abuser !)",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/4/4e/Button_romain.png/revision/latest?path-prefix=fr",
        "speedTip": "Petites majuscules",
		"tagOpen": "{{sc|",
		"tagClose": "}}",
		"sampleText": "TEXTE"
    };
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
		"speedTip": "Insérer une liste à puce",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
		"speedTip": "Insérer une liste numérotée",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/central/images/4/4a/Button_table.png/revision/latest",
		"speedTip": "Créer un tableau",
		"tagOpen": "{| class=\"wikitable\"\r! ",
		"tagClose": "\r! TITRE_B\r|-\r|A1\r|B1\r|-\r|A2\r|B2\r|}",
		"sampleText": "TITRE_A"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "Passer à la ligne",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/e/e4/Template_spoiler.png/revision/latest?path-prefix=fr",
		"speedTip": "Zone de texte dissimulable (Spoiler)",
		"tagOpen": "<div class=\"mw-collapsible mw-collapsed\" style=\"width:100%\">",
		"tagClose": "</div>",
		"sampleText": "Spoiler"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest",
		"speedTip": "Insérer le modèle de références",
		"tagOpen": "<ref>",
		"tagClose": "</ref>",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png/revision/latest",
		"speedTip": "Insérer une référence nominative",
		"tagOpen": "<ref name=\"",
		"tagClose": "\" />",
		"sampleText": "REF"
	};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/8/89/Template_ref.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer la liste des références",
		"tagOpen": "{{Références}}\r",
		"tagClose": "",
		"sampleText": ""};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/4/4f/Button_neutral.png",
		"speedTip": "Cette page est une ébauche",
		"tagOpen": "{{Ébauche}}\r",
		"tagClose": "",
		"sampleText": ""};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
		"speedTip": "Cette section est vide",
		"tagOpen": "{{Vide}}\r",
		"tagClose": "",
		"sampleText": ""};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/2/28/Button_info.png",
		"speedTip": "Insérer un commentaire",
		"tagOpen": "{{Comment|",
		"tagClose": "}}",
		"sampleText": "mention"
	};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirection",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "TITRE_PAGE"
	};
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/0/03/Template_HP.png/revision/latest?path-prefix=fr",
		"speedTip": "Lien Wiki HP",
		"tagOpen": "[[w:c:fr.harrypotter:",
		"tagClose": "|]]",
		"sampleText": "TITRE_PAGE"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/b/bb/Seealso.png",
		"speedTip": "Article détaillé",
		"tagOpen": "{{article détaillé|",
		"tagClose": "}}",
		"sampleText": ""
	};
	
	/*Faux "bouton" pour faire une démarquation visible*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "",
		"speedTip": " "};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/1/1f/Template_NBSP.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer un espace HTML (pour éviter le bug des listes dans l'infobox)",
		"tagOpen": "&#32",
		"tagClose": ";",
		"sampleText": ""
	};
	
	/*Boutons de caractères spéciaux courants*/	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/b/b1/Button_dagger.png/revision/latest?path-prefix=fr",
        "speedTip": "Ce personnage est décédé (à éviter dans le corps de l'article)",
		"tagOpen": "†",
		"tagClose": "",
		"sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/b/bf/Button_vertical.png/revision/latest?path-prefix=fr",
        "speedTip": "| (barre verticale)",
		"tagOpen": "|",
		"tagClose": "",
		"sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/0/06/Button_susp.png/revision/latest?path-prefix=fr",
        "speedTip": "… (points de suspension)",
		"tagOpen": "…",
		"tagClose": "",
		"sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/8/80/Button_É.png/revision/latest?path-prefix=fr",
        "speedTip": "É",
		"tagOpen": "É",
		"tagClose": "",
		"sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/3/38/Button_ae.png/revision/latest?path-prefix=fr",
        "speedTip": "æ",
		"tagOpen": "æ",
		"tagClose": "",
		"sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/f/f1/Button_oe.png/revision/latest?path-prefix=fr",
        "speedTip": "œ",
		"tagOpen": "œ",
		"tagClose": "",
		"sampleText": ""
    };

	/*Faux "bouton" pour faire une démarquation visible*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "",
		"speedTip": " ‾ "};
    
    /*"Générateurs" de modèles de pages à remplir*/
        /*Personnages généraux*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/2/2d/Template_famille.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Famille}}",
		"tagOpen": "{{Infobox Famille\r|Image=\r|Nom=\r|Membres=& #32;\r|Statut=\r|Sang= {{SANG}}\r|Lieu de vie=\r|Liées=\r|Affiliation=& #32;\r|Première=\r|Dernière=\r|Galerie=\r}}\rLa '''famille ",
		"tagClose": "''' est une famille de {{SANG}} dont (INFOS_MEMBRE_NOTABLE).\r== Devise et blason ==\r\r== La famille et ses possessions ==\rLes DERNIERS MEMBRES CONNUS/MEMBRES ACTUELS sont…\r\rLes NOM possède ELFE_DE_MAISON/emploient EMPLOYÉ/etc…\r== Familles liées ==\rCette famille est liée à AUTRES_FAMILLES\r== Étymologie ==\rLe nom « NOM » provient de ETYMOLOGIE\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{DEFAULTSORT:NOM Famille}}\r[[Catégorie:Familles]]",
		"sampleText": "NOM_FAMILLE"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/e/ef/Template_personnage.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est PROFIL\r== Biographie ==\r\r==Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]",
		"sampleText": "NOM_PERSONNAGE"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/a/a7/Template_personnage_alt.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage Alt}} (pour mettre plusieurs photos)",
		"tagOpen": "{{Infobox Personnage Alt\r|Image=<tabber>\rTITRE1 = [[Fichier:IMAGE1|220px|center]]\r|-|\rTITRE2 = [[Fichier:IMAGE2|220px|center]]\r</tabber>",
		"tagClose": "",
		"sampleText": "\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''NOM_PERSONNAGE''', né le DATE, est PROFIL\r== Biographie ==\r\r==Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/9/99/Template_elfe.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Elfe de maison}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= [[w:c:fr.harrypotter:Elfe_de_maison|Elfe de maison]]\r|Surnom=\r|Affiliation=& #32;\r* \r|Première=\r|Dernière=\r|Galerie=\r}}\r'''",
		"tagClose": "''' est un [[w:c:fr.harrypotter:Elfe_de_maison|elfe de maison]]\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Elfes de maison]]",
		"sampleText": "NOM_ELFE"};
	
        /*Élèves d'écoles magiques*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/e/e1/Template_arnhem.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Élève d'Arnhem}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[Filière X]]\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève suivant la [[filière X]] sur le Campus Flottant d'[[Arnhem]].\r== Biographie ==\r=== Scolarité ===\r==== Première année ====\rAprès avoir embarqué au port de [https://en.wikipedia.org/wiki/NAME NAME]{{en}}, NOM s'est inscrit dans la [[filière X]], et a choisi A, B, C, … comme matières supplémentaires.\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r* [[Destins Parallèles]], [[Arnhem|OS №4]]\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves d'Arnhem]]",
		"sampleText": "NOM_ÉLÈVE"};
        
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/e/ee/Template_beaux.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Élève de Beauxbâtons}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève de l'Ordre [[ORDRE]] à l'[[Académie de Beauxbâtons]].\r== Biographie ==\r=== Scolarité ===\r==== 1<sup>ère</sup> Année ====\rLors de la Cérémonie de [[Répartition]], NOM est envoyé dans l'Ordre [[ORDRE]].\r==== 2<sup>ème</sup> Année ====\rÀ partir de la 2<sup>ème</sup> Année, les élèves sont autorisés à choisir un [[Clubs de Beauxbâtons|Club]], et de tenter leur chance lors des sélections de [[w:c:fr.harrypotter:Quidditch|Quidditch]] et de [[Cognepoing]], un sport local.\r==== 3<sup>ème</sup> Année ====\rEn 3<sup>ème</sup> Année, les élèves sont amenés à choisir deux [[Options de Beauxbâtons|Matières optionnelles]], une majeure, et une mineure. NOM choisit respectivement X et Y. \r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Classification|Sorcier/ère|ORDRE}}<!--À MODIFIER-->\r{{Nav-ORDRE}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Beauxbâtons]]",
		"sampleText": "NOM_ÉLÈVE"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/a/a6/Template_drakensberg.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Élève de Drakensberg}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Élement=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[Palier de Drakensberg]]\r*\r|Première= ''[[Destins Parallèles]], [[Palier de Drakensberg|OS №1]]''\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève du [[Palier de Drakensberg]].\r== Biographie ==\r=== Scolarité ===\r\r==== 1ère Année ====\rAprès l'appel du [[Frappe-Pierre]], X fait sa rentrée au [[Palier de Drakensberg]], le [[21 mars]] [[2015]], après avoir pris la navette à [https://fr.wikipedia.org/wiki/Bloemfontein Bloemfontein].\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r=== Amulette de concentration ===\r\r=== Affinité élémentaire ===\rX… affinité avec la [[Magie Élémentaire#X|x]].\r== Anecdotes ==\r\r== Apparitions ==\r* [[Destins Parallèles]], [[Palier de Drakensberg|OS №1]]\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Drakensberg]]",
		"sampleText": "NOM_ÉLÈVE"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/parfum-potter/images/9/98/Template_mahoutokoro.png/revision/latest?path-prefix=fr",
        "speedTip": "Insérer le modèle {{Personnage : Élève de Mahoutokoro}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Élement=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[Mahoutokoro]]\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève suivant la Voie [[VOIE]] à l'École de [[Mahoutokoro]].\r== Biographie ==\r=== Scolarité ===\r==== Première année ====\rLors de la Cérémonie de [[Répartition]], NOM est envoyé sur la Voie [[VOIE]].\rIl choisit comme Options X et Y et entre dans le [[Mahoutokoro#Les_autres_activit.C3.A9s|club]] Z.\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r=== Affinité élémentaire ===\rNOM… affinité avec la [[Magie Élémentaire#X|x]].\r== Anecdotes ==\r\r== Apparitions ==\r* [[La Voie de la Magie]] :\r** [[Les Fleurs de Cerisiers]]\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Mahoutokoro]]",
		"sampleText": "NOM_ÉLÈVE"
    };
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/d/dd/Template_adler.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Élève de Mighty Adler}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[Mighty Adler]]\r*\r|Première= ''[[Destins Parallèles]], [[Mighty Adler|OS №2]]''\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève de l'Académie [[Mighty Adler]].\r== Biographie ==\r\r=== Scolarité ===\r==== Grade 1 ====\rX fait sa rentrée à [[Mighty Adler]]. Il choisit '''X''' comme matière magique, et '''Y''' comme matière naturelle.\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r* [[Destins Parallèles]], [[Mighty Adler|OS №2]]\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Mighty Adler]]",
		"sampleText": "NOM_ÉLÈVE"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/f/f4/Template_poudlard.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Personnage : Élève de Poudlard}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[MAISON]]\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève de la Maison [[MAISON]] à l'École de [[Poudlard]].\r== Biographie ==\r=== Scolarité ===\r==== Première année ====\rLors de la Cérémonie de [[w:c:fr.harrypotter:Répartition|Répartition]], NOM est envoyé dans la Maison de [[MAISON]].\r==== Deuxième année ====\r\r== Troisième année ====\rEn troisième année, les élèves sont amenés à choisir deux matières optionnelles.\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Classification|Sorcier/ère|MAISON}}<!--À MODIFIER-->\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Poudlard]]",
		"sampleText": "NOM_ÉLÈVE"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/8/80/Template_salem.png/revision/latest?path-prefix=fr",
        "speedTip": "Insérer le modèle {{Personnage : Élève de Salem}}",
		"tagOpen": "{{Infobox Personnage\r|Image=\r|Nom=\r|Sexe=\r|Yeux=\r|Cheveux=\r|Naissance=\r|Mort=\r|Famille=& #32;\r* \r|Sang= {{SANG}}\r|Surnom=\r|Baguette=\r|Épouvantard=\r|Patronus=\r|Animagus=\r|Métier=\r|Affiliation=& #32;\r* [[Division NOM_DIV]]\r*\r|Première=\r|Dernière=\r|Interprète=\r|Galerie=\r}}\r'''",
		"tagClose": "''', né le DATE, est un élève de l'[[Institut de Salem]].\r== Biographie ==\r=== Scolarité ===\r==== 1<sup>st</sup> Grade ====\rDurant le 1<sup>st</sup> Grade, X appartient à la [[Division NOM_DIV]].\r== Caractéristiques du personnage ==\r=== Description physique ===\r\r=== Personnalité ===\r\r=== Compétences ===\r\r=== Vie de famille ===\r\r=== Baguette ===\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Personnages]]\r[[Catégorie:Élèves de Salem]]",
		"sampleText": "NOM_ÉLÈVE"
    };
		
		/*Autres infos fictives ou réelles, et modèles peu usités*/
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/c/c3/Template_creature.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Créature}}",
		"tagOpen": "{{Infobox Créature\r|Image=\r|Nom=\r|Apparence=\r|Caractère=\r|Yeux=\r|Peau=\r|Plumes/Poils=\r|Hauteur=\r|Longueur=\r|Envergure=\r|Pays d'origine=\r|Localisation=\r|Alimentation=\r|Remarques=\r|Affiliation=\r|Classification du ministère=\r|Classification de la prévôté=\r|Statut=\r|Première=\r|Dernière=\r|Galerie=\r}}\r'''",
		"tagClose": "''' est DESCRIPTION\r==Généralités==\r===Apparence===\r\r===Pouvoirs===\r\r==MEMBRE_ESPÈCE connus==\r\r==Hybrides connus==\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Créatures Magiques]]",
		"sampleText": "NOM_RACE"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/4/41/Template_lieu.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Lieu}}",
		"tagOpen": "{{Infobox Lieu\r|Nom=\r|Image=\r|Pays=\r|Région=\r|Ville=\r|Emplacement=\r|Fonction=\r|Propriétaire=\r|Résident=& #32;\r*\r|Employé=& #32;\r*\r|Affiliation=\r|Première=\r|Dernière=\r|Galerie=\r}}\r'''",
		"tagClose": "''' est PRÉSENTATION.\r== Description ==\r=== Lieux ===\r\r== Localisation et accès ==\r\r== Histoire ==\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Nav-Lieux}}\r[[Catégorie:Lieux]]",
		"sampleText": "NOM_LIEU"};
		
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/7/78/Template_ecole.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{École}}",
		"tagOpen": "{{Infobox Lieu\r|Nom=\r|Image=\r|Pays=\r|Région=\r|Ville=\r|Emplacement=\r|Fonction= Éducative\r|Résident= & #32;\r* Personnel de ÉCOLE\r* Élèves de ÉCOLE\r* Fantômes de ÉCOLE\r|Employé= Personnel de ÉCOLE\r|Affiliation=\r|Première=\r|Dernière=\r|Galerie=\r}}\r'''",
		"tagClose": "''' est un établissement formant les jeunes sorcières et sorciers PAYS à l'art et à la pratique de la magie. Il est situé RÉGION, dans PAYS.\r== Description ==\r=== Lieux ===\r\r== Localisation et accès ==\r\r== Histoire ==\r\r== Caractéristiques de l'école ==\r===Héraldique===\r\r===La devise de ÉCOLE===\r\r===L'hymne de ÉCOLE===\r\r===Personnel de ÉCOLE===\r\r===Concernant les élèves===\r====Les inscriptions====\r\r====L'arrivée à ÉCOLE====\r\r====La cérémonie de la Répartition====\r\r====Les matières de ÉCOLE====\r\r====La vie à ÉCOLE====\r\r====Les autres activités====\r\r====Les examens====\r\r== Anecdotes ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Nav-Écoles}}\r[[Catégorie:Lieux]]\r[[Catégorie:Écoles de Magie]]",
		"sampleText": "NOM_ÉCOLE"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/6/62/Template_sort.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Sort}}",
		"tagOpen": "{{Infobox Sort\r|Image=\r|Nom=\r|Formule=''FORMULE''\r|Gestuelle=\r|Effet=\r|Commentaire=\r|Première=\r|Dernière=\r}}\r'''''",
		"tagClose": "''''' est un sort\r== Historique ==\r\r== Étymologie ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:Sortilèges]]",
		"sampleText": "FORMULE_SORT"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/2/29/Template_objet.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Objet}}",
		"tagOpen": "{{Infobox Objet\r|Image=\r|Nom=\r|Fabricant=\r|Date=\r|Utilisation=\r|Vendeur=\r|Propriétaire=&#32 ;\r|Première=\r|Dernière=\r}}\r'''",
		"tagClose": "''' est DESCRIPTION\r==Apparitions==\r\r==Notes et Références==\r{{Références}}\r[[Catégorie:Objets magiques]]",
		"sampleText": "NOM_OBJET"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/b/b3/Template_organisation.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Organisation}}",
		"tagOpen": "<!--\r– À noter que les paramètres \"Fondation\" et \"Dissolution\" font référence aux dates échéantes.\r– À noter que le paramètre \"Cause\" fait référence à la cause de la dissolution de l'organisation, et ne doit alors être remplie que si les paramètres \"Dissolution\" et \"Dernière\" le sont aussi.\r– La Catégorie peut être par exemple \"Groupe de Sorciers\", \"Justice Française\", etc… En tout cas, n'importe quelle catégorie incluant des organisations suffisamment définies pour que ce modèle soit utilisé.\r– Supprimez ce commentaire avant d'enregistrer la page, SVP !\r-->\r{{Infobox Organisation\r|Nom=\r|Image=\r|Fondateur=\r|Fondation=\r|Dissolution=\r|Leader=\r|Quartier général=\r|Intentions=\r|Affiliation=& #32;\r* \r|Ennemis=\r|Première=\r|Dernière=\r|Cause=\r|Galerie=\r}}\r'''",
		"tagClose": "'''\r==Localisation==\r\r==Chefs de X==\r\r==Employés connus==\r\r==Apparitions==\r\r== Notes et Références ==\r{{Références}}\r[[Catégorie:TYPE]]",
		"sampleText": "NOM_ORGANISATION"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/c/ca/Template_roman.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Roman}} (pour les écrits réels)",
		"tagOpen": "{{Infobox Roman\r|Titre=\r|Image=\r|Auteur=\r|Année Scolaire=\r|Chapitres=\r|Galerie=\r}}\r{{Citation|CITATION|[[SOURCE]]}}\r'''''",
		"tagClose": "''''' est PRÉSENTATION\r== Résumé ==\r\r== Liste des chapitres ==\r# \r== Liens et Statistiques ==\r* [https://www.fanfiction.net/s/ADRESSE FanFiction.net] : Reviews: X - Favs: X - Follows: X\r== Notes et Références ==\r{{Références}}\r{{Nav-Saga}}",
		"sampleText": "TITRE_ROMAN"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/b/bc/Template_saga.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Saga}}",
		"tagOpen": "{{Infobox Saga\r|Titre=\r|Image=\r|Auteur=\r|Période Scolaire=\r|Tomes=& #32;\r# \r|Galerie=\r}}\r'''",
		"tagClose": "''' est une saga +PRÉSENTATION\r== Liste des tomes ==\r\r== Notes et Références ==\r{{Références}}\r{{Nav-Saga}}\r[[Catégorie:Romans]]",
		"sampleText": "TITRE_SAGA"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/0/0a/Template_auteur.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Auteur]}",
		"tagOpen": "{{Infobox Auteur\r|Image=\r|Nom=\r|Sexe=\r|Alias=& #32;\r*\r|Écrits=& #32;\r*\r}}\r'''",
		"tagClose": "'''\r== Profil ==\r{{Nav-Saga}}\r[[Catégorie:Auteurs]]",
		"sampleText": "NOM_AUTEUR"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/a/a3/Template_event.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Événement}}",
		"tagOpen": "{{Infobox Événement\r|Nom=\r|Image=\r|Description=\r|Date=\r|Lieu=\r|Participants=\r|Liés=\r|Première=\r|Dernière=\r|Galerie=\r}}\r'''",
		"tagClose": "'''\r== Apparitions ==\r\r==Notes et Références==\r{{Références}}\r[[Catégorie:Événements]]",
		"sampleText": "EVENT"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/2/22/Template_annee.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Année}}",
		"tagOpen": "Les évènements suivants se déroulent en '''",
		"tagClose": "''' :\r==Évènements==\r\r===Sports===\r====[[w:c:fr.harrypotter:Quidditch|Quidditch]]====\r\r====[[Cognepoing]]====\r\r===[[w:c:fr.harrypotter:Répartition|Répartition]] à [[Poudlard]]===\r====[[Gryffondor]]====\r\r====[[Poufsouffle]]====\r\r====[[Serdaigle]]====\r\r====[[w:c:fr.harrypotter:Serpentard|Serpentard]]====\r\r===[[Répartition]] à [[Beauxbâtons]]===\r====[[Aloysia]]====\r\r====[[Lonicera]]====\r\r====[[Urtica]]====\r\r===Autres rentrées scolaires===\r\r===Naissances===\r\r===Décès===\r\r==Liens externes==\r*{{HP}}\r*{{WP}}\r==Notes et références==\r{{Références}}\r{{Nav-Chrono}}\r[[Catégorie:Années]]",
		"sampleText": "ANNÉE"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/c/ca/Template_cours.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Cours}}",
		"tagOpen": "{{Infobox Cours\r|Image=\r|Nom=\r|Professeur=\r|Salle=\r|Equipement=\r|Galerie=\r}}\r'''",
		"tagClose": "''' est une matière\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Nav-Cours-NOM_ÉCOLE}}",
		"sampleText": "NOM_COURS"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/7/79/Template_livre.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{LIVRE}} (pour les écrits fictifs)",
		"tagOpen": "{{Infobox Livre\r|Nom=\r|Image=\r|Auteur=\r|Date=\r|Maison d'édition=\r|Sujet=\r|Copies connues=\r|Première=\r|Dernière=\r}}\r'''''",
		"tagClose": "''''' est DESCRIPTION\r== Contenu ==\r\r== Histoire ==\r\r== Apparitions ==\r\r== Notes et Références ==\r{{Références}}\r{{Nav-Écrits}}\r[[Catégorie:Livres]]",
		"sampleText": "TITRE_LIVRE"};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/parfum-potter/images/1/1d/Template_journal.png/revision/latest?path-prefix=fr",
		"speedTip": "Insérer le modèle {{Périodique}} (Journal, brève, …)",
		"tagOpen": "{{Infobox Périodique\r|Titre=\r|Image=\r|Format=\r|Fréquence de publication=\r|Editeur=\r|Sujet=\r|Lecteurs=\r|Première=\r|Dernière=\r}}\r'''''",
		"tagClose": "''''' est DESCRIPTION\r==Le Journal==\r===Format===\r\r===Fréquence===\r\r===Prix & Livraison===\r\r===Lecteurs===\r\r==La Rédaction==\r===Les Bureaux===\r\r===Le Personnel===\r\r==Contenu==\r===Sujets===\r\r===Sensationnalisme & Influence===\r\r===Articles publiés===\r\r==Anecdotes==\r\r==Apparitions==\r\r==Notes et références==\r{{Références}}\r{{Nav-Écrits}}\r[[Catégorie:Périodiques]]",
		"sampleText": "NOM_PÉRIODIQUE"};
		
	/*Faux "bouton" pour faire une démarquation visible*/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "",
		"speedTip": " ‾ "};
}

// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'Modèle:Stdsummaries'
};
// The options need to be set before the import! Otherwise they may not work.
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
   var $tabs = $('#WikiaUserPagesHeader ul.tabs');
   if (!$tabs.length) return;
   var newTabs = {
       'Sandbox': '/Sandbox',
};
   var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
   if (!name.length) return;
   name = name.text();
   var tabs = document.createDocumentFragment(), li, a;
   for (var tab in newTabs) {
       li = document.createElement('li');
       a = document.createElement('a');
       a.title = 'User:' + name + newTabs[tab];
       a.href = mw.util.wikiGetlink(a.title);
       a.appendChild(document.createTextNode(tab));
       li.appendChild(a);
       tabs.appendChild(li);
   }
   $tabs.append(tabs);
});
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */

$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 40px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});