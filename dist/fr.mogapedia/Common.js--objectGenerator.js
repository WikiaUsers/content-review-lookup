/* Any JavaScript here will be loaded for all users on every page load. */

/* Auteur : Houmgaor
Objectif: Réaliser un outil pour permettre aux débutants de créer des pages d'objet
*/

if (document.querySelector('title').innerHTML == 'Générateur d\'objets - Wiki L\'encyclopédie Moga - Wikia') {
			window.addEventListener('load', function () {		
				var a = document.getElementById('zonedecreation');
				var form = document.createElement('form');
				form.setAttribute('name', 'entree');
				//A la fin du formulaire, des inputbox invisibles qui stockeront les différentes page 
				form.innerHTML = '<p>Choisissez un jeu : <label for="MH3U">MH3U </label><input type="radio" name="game" id="MH3U" value="MH3U"> <label for="MH4U"> MH4U </label><input type="radio" name="game" id="MH4U" value="MH4U"> <label for="MHGen"> MHGen </label><input type="radio" name="game" id="MHGen" value="MHGen"></p>\n<p><label for="name">Nom de l\'objet : </label><input type="text" placeholder="Méga pierre-volt" id="name" name="name" onchange="document.entree.getElementsByTagName(\'a\')[0].innerHTML = this.value;"> <input type="button" value="Autocompléter" onclick="autocomplet(document.entree.name.value);"></p>\n<p style="display: block; float: left; width: 420px;">Sélectionnez la couleur de votre objet : </p><input type="range" style="width: 350px;" min="0" max="12" step="1" value="Votre navigateur n\'est pas à jour" name="color" onchange="sendColour(document.entree.color.value, false);"><span id="colourtext" style="display: inline-block; width: 100px; height: 23px; position: relative; left: 15px; background-color: white; border: 3px black double; text-align: center; opacity: 0;"></span>\n<div style="display: flex; flex-wrap: nowrap; height: 20px; position: relative; top: -5px; justify-content: center; width: 300px; left: -15px;"><div style="background-color: #B42828; width: 100px;"></div><div style="background-color: #C68468; width: 100px;"></div><div style="background-color: #F2A8AA; width: 100px;"></div><div style="background-color: #FFCED6; width: 100px;"></div><div style="background-color: #FF9B37; width: 100px;"></div><div style="background-color: #F1ED54; width: 100px;"></div><div style="background-color: #9AD71E; width: 100px;"></div><div style="background-color: #ADE4D8; width: 100px;"></div><div style="background-color: #1D8FFE; width: 100px;"></div><div style="background-color: #9B309B; width: 100px;"></div><div style="background-color: #B07CD3; width: 100px;"></div><div style="background-color: #DCDCDC; width: 100px;"></div><div style="background-color: #EFEFEF; width: 100px;"></div></div>\n<p><br/><label for="pic">Image : </label><input id="pic" name="pic" placeholder="ItemIcon003f" value=""></p><p><label for="ename">Nom Japonais / Nom Anglais : </label><input type="text" name="ename" placeholder="-/High voltstone"></p><p><label for="cat">Catégorie de composant : </label><select name="cat" id="cat" onchange="switype(this.value)"></select></p><p><label for="type">Type de composant : </label><select id="type" name="type"></select></p><p><label for="rar">Rareté : </label><input type="number" min="1" max="10" value="1" name="rar" id="rar"></p><p><label for="ach">Prix d\'achat : </label><input type="text" id="ach" name="ach"></p><p><label for="sel">Prix de vente : </label><input type="text" placeholder="4 480" id="sel" name="sel"></p><p><label for="desc">Description : </label><textarea cols="50" rows="2" name="desc" id="desc" placeholder="Organe de Qurupeco pourpre produisant de l\'électricité. Attention à la décharge !"></textarea></p><p><label for="obt">Comment obtenir le composant ? </label><textarea name="obt" id="obt" cols="50" rows="2" placeholder="S\'obtient en blessant les silex sur les ailes du [[Qurupeco Vermillon]], en rang G uniquement."></textarea></p><p><label for="why">À quoi sert ce composant ? </label><textarea name="why" id="why" cols="50" rows="2" placeholder="Permet d\'améliorer les armes de rang G à base de [[Qurupeco Vermillon]]."></textarea></p>\n<p><label for="comb">Combinaisons : </label><textarea cols="50" rows="2" name="comb" id="comb"></textarea></p>\n<p><input type="button" value="Obtenir le WikiSource" onclick="generate();"> <input type="reset" value="Tout effacer"></p>\n<p><label for="res">Code wikisource de votre page : </label><textarea cols="100" rows="30" id="res" name="res" ondblclick="select();">{{Objet \n|Nom de l\'objet =\n|Nom Jap / US =\n|Image = [[File:.png|50px]]\n|Catégorie = \n|Type = \n|Rareté = \n|Achat = N/A\n|Vente = \n}}\n<tabber>\n = <br/>\n====<u>Description</u>====\n\'\'     .\'\'\n\n====<u>Comment l\'obtenir ?</u>====\n\n====<u>À quoi sert-il ?</u>====\n\n====<u>Combinaison</u>====\nAucune combinaison possible.\n|-|\n</tabber></textarea></p>\n<p style="text-align: center;"><a href="http://fr.mogapedia.wikia.com/index.php?action=edit&summary=&title=&create=Cr%C3%A9er+une+page">Créer la page</a></p>\n<p><textarea name="EUobj" style="display: none;"></textarea><textarea name="EUdep" style="display: none;"></textarea><textarea name="AUobj" style="display: none;"></textarea><textarea name="AUdep" style="display: none;"></textarea><textarea name="Genobj" style="display: none;"></textarea><textarea name="Gendep" style="display: none;"></textarea></p>';
				//On a ajoute le formulaire incomplet
				document.getElementById('zonedecreation').appendChild(form);	
				//On complète une première liste déroulante
				document.entree.cat.innerHTML = '<option value="Composant de monstre">Composant de monstre</option><option value="Soins & Boost">Soins & Boost</option><option value="Outils-Bombes">Outils-Bombes</option><option value="Viandes">Viandes</option><option value="Munitions & Enduits">Munitions & Enduits</option><option value="Plantes">Plantes</option><option value="Minerais">Minerais</option><option value="Appâts et poissons">Appâts et poissons</option><option value="Insectes">Insectes</option><option value="Nectar pour kinsectes">Nectar pour kinsectes</option><option value="Os">Os</option><option value="Pièces & Tickets">Pièces & Tickets</option><option value="Fournitures">Fournitures</option>';
				//On complète une seconde liste déroulante 
				document.entree.type.innerHTML = '<optgroup label="Soins & Boost"><option value="Soin">Soin</option><option value="Boost">Boost</option><option value="Wyvpierre">Wyvpierre</option></optgroup><optgroup label="Outils & Bombes"><option value="Outil">Outil</option><option value="Bombe">Bombe</option><option value="Objet de lancer">Objet de lancer</option><option value="Filet à papillon">Filet à papillon</option><option value="Flûte">Flûte</option></optgroup><optgroup label="Viandes"><option value="Consommable">Consommable</option></optgroup><optgroup label="Munitions & Enduits"><option value="Munition">Munition</option><option value="Enduit">Enduit</option></optgroup><optgroup label="Plantes"><option value="Herbe">Herbe</option><option value="Champignon">Champignon</option><option value="Baie / Graine">Baie / Graine</option></optgroup><optgroup label="Minerais"><option value="N/A">N/A</option><option value="Sphère d\'armure">Sphère d\'armure</option><option value="Charme">Charme</option><option value="Arme rouillée">Arme rouillée</option></optgroup><optgroup label="Appâts et poissons"><option value="Poisson">Poisson</option><option value="Appât">Appât</option></optgroup><optgroup label="Insectes"><option value="N/A">N/A</option></optgroup><optgroup label="Nectar pour kinsectes"><option value="N/A">N/A</option></optgroup><optgroup label="Composant de monstre"><option value="Os">Os</option><option value="Poche et fluide">Poche et fluide</option><option value="Aile">Aile</option><option value="Peau">Peau</option><option value="Ecaille">Ecaille</option><option value="Plaque">Plaque</option><option value="Carapace">Carapace</option><option value="Plume">Plume</option><option value="Queue">Queue</option><option value="Nageoire">Nageoire</option><option value="Griffe / Croc">Griffe / Croc</option><option value="Bouse">Bouse</option><option value="Œuf">Œuf</option><option value="Gemme">Gemme</option><option value="Mante">Mante</option></optgroup><optgroup label="Os"><option value="Collectable">Collectable</option></optgroup><optgroup label="Pièces & Tickets"><option value="Pièce">Pièce</option><option value="Ticket">Ticket</option></optgroup><optgroup label="Fournitures"><option value="Outil">Outil</option><option value="Autre">Autre</option></optgroup>';
				document.entree.color.max = document.entree.getElementsByTagName('div').length - 2;
				document.entree.querySelector('div').style.width = (parseInt(document.entree.color.style.width, 10) + 30)+'px';
				document.querySelector('span#loading').style.display = 'none';
			});
			//La fonction chargée de traiter les informations entrées
			var generate = function () {
			//Déclaration de quelques variables
				var name = document.entree.name.value,
					color = sendColour(document.entree.color.value, true),
					pic = (document.entree.pic.value === '') ? 'placeholder' : document.entree.pic.value.trim().replace('.png', '') + '.png';
				var ach = (document.entree.ach.value === '') ? 'N/A' : document.entree.ach.value.replace('z', '').trim() + 'z';
				var sel = (document.entree.sel.value === '') ? 'N/A' : document.entree.sel.value.replace('z', '').trim() + 'z';
				var comb = (document.entree.comb.value === '') ? 'Aucune combinaison possible' : document.entree.comb.value;
				var cate = (document.entree.game[0].checked) ? ['MH3U'] : [''];
				cate[0] = (document.entree.game[1].checked) ? 'MH4U' : cate[0];
				cate[0] = (document.entree.game[2].checked) ? 'MHGen' : cate[0];
				cate.push( (document.entree.cat.value == 'Composant de monstre') ? 'Composant de monstre]] [[Catégorie:' : '');
				//On affiche le résultat
				document.entree.res.value = '{{Objet ' + color + '\n|Nom de l\'objet = ' + name + '\n|Nom Jap / US = ' + document.entree.ename.value + '\n|Image = [[File:' + pic + '|50px]]\n|Catégorie = ' + document.entree.cat.value + '\n|Type = ' + document.entree.type.value + '\n|Rareté = ' + parseInt(document.entree.rar.value, 10) + '\n|Achat = ' + ach + '\n|Vente = ' + sel + '\n}}\n<tabber>\n' + cate[0] + ' = <br/>\n====<u>Description</u>====\n\'\'' + document.entree.desc.value + '\'\'\n\n====<u>Comment l\'obtenir : </u>====\n' + document.entree.obt.value + '\n\n====<u>À quoi sert-il ?</u>====\n' + document.entree.why.value + '\n\n====<u>Combinaison : </u>====\n' + comb + '\n|-|\n</tabber>\n\n[[Catégorie:' + cate[1] + cate[0] + ' - Objet]]';
				//On change le lien qui crée la page
				document.entree.getElementsByTagName('a')[0].href = 'http://fr.mogapedia.wikia.com/index.php?action=edit&summary=Cr%C3%A9ation+de+la+page+par+g%C3%A9n%C3%A9rateur&title=' + encodeURIComponent(name) + '&create=Cr%C3%A9er+une+page';		
			};
			//Une fonction qui choisit le type des composants
			var switype = function (a) {
				var b = document.entree.type;
				var name = document.entree.name.value;
				switch (a) {
				case 'Composant de monstre':
				b.value = 'Os';
				b.value = (/Aile|Palmure|Egide|Elytre/.test(name)) ? 'Aile' : b.value;
				b.value = (/Queue|Fouet|Fléau/.test(name)) ? 'Queue' : b.value;
				b.value = (/Rubis|Célémeraude|Gemme^-|Saphir|Pierre|Joyau/.test(name)) ? 'Gemme' : b.value;
				b.value = (/Mante|Pallium|Réacteur Immortel|Carapace céleste|Gemme-dragon/.test(name)) ? 'Mante' : b.value;
				b.value = (/Poche|Extrait|Liquide|Sang|Bouillon|Poisse|Salive|Essence|Huile|Crème/.test(name)) ? 'Poche et fluide' : b.value;
				b.value = (/Peau|Toison|Cuir|Fourr|Pelage|Manteau/.test(name)) ? 'Peau' : b.value;
				b.value = (/Griffe|Croc/.test(name)) ? 'Griffe / Croc' : b.value;
				b.value = (/Œuf/.test(name)) ? 'Œuf' : b.value;
				b.value = (/Nageoire/.test(name)) ? 'Nageoire' : b.value;
				b.value = (/Bouse|Fiente|Guano/.test(name)) ? 'Bouse' : b.value; 
				break;
				case 'Soins & Boost':
				b.value = 'Soin';
				break;
				case 'Outils-Bombes':
				b.value = 'Outil';
				break;
				case 'Viandes':
				b.value = 'Consommable';
				break;
				case 'Munitions & Enduits':
				b.value = (/Enduit/.test(name)) ? 'Enduit' : 'Munition';
				break;
				case 'Plantes':
				b.value = 'Herbe';
				break;
				case 'Minerais':
				b.value = (/Sphère|Pierre d'armure/.test(name)) ? 'Sphère d\'armure' :'N/A';
				break;
				case 'Appâts et poissons':
				b.value = (/Appât/i.test(name)) ? 'Appât' : 'Poisson';
				break;
				case 'Insectes':
				b.value = 'N/A';
				break;
				case 'Nectar pour kinsectes':
				b.value = 'N/A';
				break;
				case 'Os':
				b.value = 'Collectable';
				break;
				case 'Pièces & Tickets':
				b.value = (/Ticket|Coupon/.test(name)) ? 'Ticket' : 'Pièce';
				break;
				case 'Fournitures':
				b.value = 'Outil';
				break;
				}
			};
			// Fonction chargée de trouver un maximum d'informations sur l'objet sur le wikia à partir de son nom
			var autocomplet = function (a) {
				document.entree.cat.value = (/Aile|Palmure|Egide|Elytre|Queue|Fouet|Fléau|Rubis|Célémeraude|Mante|Gemme|Saphir|Pierre|Griffe|Déchireur|Serre|Croc|Cisaille|Ecaille|Eclat|Carapace|Cuirasse|Plaque|Cortex|Moelle|Medulla|Pointe|Aiguille|Essence|Coeur|Sang|Tête|Bec|Cornicule|Crinière|Peau|Toison|Oreille|Oeil|Nageoire/.test(a)) ? 'Composant de monstre' : document.entree.cat.value;
				switype(document.entree.cat.value);
				
				//Déclaration de plusieurs variables pour trouver l'objet dans 6 pages au total
				var EUobj = new XMLHttpRequest(),
					EUdep = new XMLHttpRequest(),
					AUobj = new XMLHttpRequest(),
					AUdep = new XMLHttpRequest(),
					Genobj = new XMLHttpRequest(),
					Gendep = new XMLHttpRequest();
				EUobj.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MH3U_-_Liste_d%27objets?action=edit');
				EUobj.addEventListener('readystatechange', function() { 
					if (EUobj.readyState === XMLHttpRequest.DONE && EUobj.status === 200) {
						document.entree.EUobj.value = EUobj.responseText.substring(EUobj.responseText.indexOf('id="wpTextbox1"'), EUobj.responseText.indexOf('id="CategorySelect"'));
					}
				});
				EUobj.send(null);
				EUdep.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MH3U_-_Composants_de_monstres?action=edit');
				EUdep.addEventListener('readystatechange', function() { 
					if (EUdep.readyState === XMLHttpRequest.DONE && EUdep.status === 200) {
						document.entree.EUdep.value = EUdep.responseText.substring(EUdep.responseText.indexOf('id="wpTextbox1"'), EUdep.responseText.indexOf('id="CategorySelect"'));
					}
				});
				EUdep.send(null);
				AUobj.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MH4U_Liste_des_Objets?action=edit');
				AUobj.addEventListener('readystatechange', function() { 
					if (AUobj.readyState === XMLHttpRequest.DONE && AUobj.status === 200) {
						document.entree.AUobj.value = AUobj.responseText.substring(AUobj.responseText.indexOf('id="wpTextbox1"'), AUobj.responseText.indexOf('id="CategorySelect"'));
					}
				});
				AUobj.send(null);
				AUdep.open('GET', 'http://fr.mogapedia.wikia.com/wiki/Liste_d%C3%A9pe%C3%A7ages_des_monstres_(MH4U)?action=edit');
				AUdep.addEventListener('readystatechange', function() { 
					if (AUdep.readyState === XMLHttpRequest.DONE && AUdep.status === 200) {
						document.entree.AUdep.value = AUdep.responseText.substring(AUdep.responseText.indexOf('id="wpTextbox1"'), AUdep.responseText.indexOf('id="CategorySelect"'));
					}
				});
				AUdep.send(null);
				Genobj.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MHGen_-_Liste_des_Objets?action=edit');
				Genobj.addEventListener('readystatechange', function() { 
					if (Genobj.readyState === XMLHttpRequest.DONE && Genobj.status === 200) {
						document.entree.Genobj.value = Genobj.responseText.substring(Genobj.responseText.indexOf('id="wpTextbox1"'), Genobj.responseText.indexOf('id="CategorySelect"'));
					}
				});
				Genobj.send(null);
				Gendep.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MHGen_-_Composants_de_monstres?action=edit');
				Gendep.addEventListener('readystatechange', function() { 
					if (Gendep.readyState === XMLHttpRequest.DONE && Gendep.status === 200) {
						document.entree.Gendep.value = Gendep.responseText.substring(Gendep.responseText.indexOf('id="wpTextbox1"'), Gendep.responseText.indexOf('id="CategorySelect"'));
					}
				});
				Gendep.send(null);
				if (document.entree.game[0].checked) {
					var EUobje = document.entree.EUobj.value,
                        EUdepe = document.entree.EUdep.value;
                    if (EUobje.indexOf(a) > 0 && EUdepe.indexOf(a) > 0) {
                        EUobje = EUobje.replace(RegExp(a, 'g'), '');
                    }
					if (~EUobje.indexOf(a)) {
						document.entree.pic.value = EUobje.substring(Math.max(EUobje.toLowerCase().lastIndexOf('[[file:', EUobje.indexOf(a)) + 7, EUobje.toLowerCase().lastIndexOf('[[fichier:', EUobje.indexOf(a)) + 10), EUobje.lastIndexOf('.png', EUobje.indexOf(a)));
						document.entree.desc.value = EUobje.substring(EUobje.lastIndexOf('|', EUobje.indexOf('.', EUobje.indexOf(a)+ a.length ) ) + 1, EUobje.indexOf('|', EUobje.indexOf('.', EUobje.indexOf(a)+ a.length ) ) - 1 ); 
						document.entree.rar.value = EUobje.substring(intIndex(EUobje, EUobje.indexOf(a) ) , intIndex(EUobje, EUobje.indexOf(a) ) + 1);
					}
					if (~EUdepe.indexOf(a)) {
						document.entree.cat.value = 'Composant de monstre';
						document.entree.pic.value = EUdepe.substring(Math.max(EUdepe.toLowerCase().lastIndexOf('[[file:', EUdepe.indexOf(a)) + 7, EUdepe.toLowerCase().lastIndexOf('[[fichier:', EUdepe.indexOf(a)) + 10), EUdepe.lastIndexOf('.png', EUdepe.indexOf(a)));
						document.entree.desc.value = EUdepe.substring(EUdepe.lastIndexOf('|', Math.min(EUdepe.indexOf('|-', EUdepe.indexOf(a) ), EUdepe.indexOf('|}', EUdepe.indexOf(a) ) ) ), Math.min(EUdepe.indexOf('|-', EUdepe.indexOf(a) ), EUdepe.indexOf('|}', EUdepe.indexOf(a) ) ) );
						document.entree.rar.value = EUdepe.substring(EUdepe.indexOf('|', EUdepe.indexOf('|', EUdepe.indexOf(a)  + a.length + 1 ) + 1 ) + 1, EUdepe.indexOf('\n', EUdepe.indexOf('|', EUdepe.indexOf(a) + a.length + 1 ) ) );
						document.entree.sel.value = lastInt(EUdepe.substring(EUdepe.indexOf(a), EUdepe.indexOf('z\n|', EUdepe.indexOf(a) ) ));
					}
				} else if (document.entree.game[1].checked) {
					var AUobje = document.entree.AUobj.value,
                        AUdepe = document.entree.AUdep.value;
                    if (AUobje.indexOf(a) > 0 && AUdepe.indexOf(a) > 0) {
                        AUobje = AUobje.replace(RegExp(a, 'g'), '');
                    }
							if (~AUobje.indexOf(a)) {
								document.entree.pic.value = AUobje.substring(AUobje.toLowerCase().lastIndexOf('[[file:', AUobje.indexOf(a)) + 7, AUobje.lastIndexOf('.png', AUobje.indexOf(a) ) );
								document.entree.ename.value = AUobje.substring(AUobje.indexOf('=', AUobje.indexOf(a)) + 1, AUobje.indexOf('\n|', AUobje.indexOf('=', AUobje.indexOf(a) ) )) + ' / -';
								document.entree.rar.value = lastInt(AUobje.substring(AUobje.indexOf(a), AUobje.indexOf('\n|Capacity', AUobje.indexOf(a) ) ));
								document.entree.sel.value = lastInt(AUobje.substring(AUobje.indexOf(a), AUobje.indexOf('\n|How To Get', AUobje.indexOf(a) ) ));
								document.entree.obt.value = AUobje.substring(AUobje.indexOf('=', AUobje.indexOf('|How To Get', AUobje.indexOf(a))) + 1, AUobje.indexOf('\n}}', AUobje.indexOf(a) ) );
							}
							if (~AUdepe.indexOf(a)) {
								document.entree.cat.value = 'Composant de monstre';
								document.entree.pic.value = AUdepe.substring(AUdepe.toLowerCase().lastIndexOf('[[file:', AUdepe.indexOf(a)) + 7, AUdepe.lastIndexOf('.png', AUdepe.indexOf(a)));
								document.entree.ename.value = AUdepe.substring(AUdepe.indexOf('&lt;br />', AUdepe.indexOf(a) + a.length ) + 9, AUdepe.indexOf('\n|', AUdepe.indexOf(a) ) )  + ' / -';
								document.entree.rar.value = parseInt(AUdepe.substring(intIndex(AUdepe, AUdepe.indexOf(a)), AUdepe.length), 10);
								document.entree.sel.value = AUdepe.substring(AUdepe.lastIndexOf('|', AUdepe.indexOf('z', AUdepe.indexOf(a) + a.length ) ) + 1, AUdepe.indexOf('z', AUdepe.indexOf(a) + a.length ) );
								document.entree.desc.value = AUdepe.substring(AUdepe.lastIndexOf('|', Math.min(AUdepe.indexOf('|-', AUdepe.indexOf(a) ), AUdepe.indexOf('|}', AUdepe.indexOf(a) ) ) - 2 ) + 2, Math.min(AUdepe.indexOf('|-', AUdepe.indexOf(a) ), AUdepe.indexOf('|}', AUdepe.indexOf(a) ) ) - 1 ); 
								document.entree.obt.value = (AUdepe.substring(AUdepe.lastIndexOf('===[[', AUdepe.indexOf(a) ) + 5, AUdepe.lastIndexOf(']]===', AUdepe.indexOf(a) ) ) == 'Divers') ? document.entree.obt.value : 'Vous pouvez l\'obtenir sur un ' + AUdepe.substring(AUdepe.lastIndexOf('===[[', AUdepe.indexOf(a) ) + 3, AUdepe.lastIndexOf(']]===', AUdepe.indexOf(a) ) + 2 );
							}
				} else if (document.entree.game[2].checked) {
					var Genobje = document.entree.Genobj.value,
                        Gendepe = document.entree.Gendep.value;
                    if (Genobje.indexOf(a) > 0 && Gendepe.indexOf(a) > 0) {
                        Genobje = Genobje.replace(RegExp(a, 'g'), '');
                    }
							if (~Genobje.indexOf(a)) {
								document.entree.pic.value = Genobje.substring(Genobje.toLowerCase().lastIndexOf('[[file:', Genobje.indexOf(a)) + 7, Genobje.lastIndexOf('.png', Genobje.indexOf(a)));
								document.entree.ename.value = Genobje.substring(Genobje.indexOf('=', Genobje.indexOf(a)) + 1, Genobje.indexOf('\n|', Genobje.indexOf('=', Genobje.indexOf(a) ) )) + ' / -';
								document.entree.rar.value = lastInt(Genobje.substring(Genobje.indexOf(a), Genobje.indexOf('\n|Capacity', Genobje.indexOf(a) ) ));
								document.entree.sel.value = lastInt(Genobje.substring(Genobje.indexOf(a), Genobje.indexOf('\n|How To Get', Genobje.indexOf(a) ) ));
								document.entree.obt.value = Genobje.substring(Genobje.indexOf('=', Genobje.indexOf('|How To Get', Genobje.indexOf(a))) + 1, Genobje.indexOf('\n}}', Genobje.indexOf(a) ) );
							}
							if (~Gendepe.indexOf(a)) {
								document.entree.cat.value = 'Composant de monstre';
								document.entree.pic.value = Gendepe.substring(Gendepe.toLowerCase().lastIndexOf('[[file:', Gendepe.indexOf(a)) + 7, Gendepe.lastIndexOf('.png', Gendepe.indexOf(a)));
								document.entree.ename.value = Gendepe.substring(Gendepe.indexOf('&lt;br />', Gendepe.indexOf(a) ) + 9, Gendepe.indexOf('\n|', Gendepe.indexOf)) + ' / -';
								document.entree.rar.value = parseInt(Gendepe.substring(intIndex(Gendepe, Gendepe.indexOf(a) ), Gendepe.length), 10 );
								document.entree.sel.value = Gendepe.substring(Genedepe.lastIndexOf('|', Gendepe.indexOf('z', Gendepe.indexOf(a) + a.length ) ) + 1, Gendepe.indexOf('z', Gendepe.indexOf(a) + a.length ) );
								document.entree.desc.value = Gendepe.substring(Gendepe.indexOf('|', Gendepe.indexOf(document.entree.rar.value, Gendepe.indexOf(a) ) ) + 1, Gendepe.indexOf('|', Gendepe.indexOf('|', Gendepe.indexOf(document.entree.rar.value, Gendepe.indexOf(a) ) )));
							}
				}
			};
			//Une petite fonction chargée de trouver l'a position dans une chaîne d'un nombre
			var intIndex = function (a, c) {
				if (typeof a === 'string') {
					var b = 0;
					if (typeof c === 'undefined') {
						c = 0;
					}
					var i = c;
					while (isNaN(parseInt(a.substring(i, i + 1), 10))) {
						i++;
						if (i > a.length) {
							i = -1;
							break;
						} 
					}
					b = i;
				} else {
				b = -1;
				}
				return b;
			};
			//Une autre fonction pour trouver le dernier nombre à la fin d'une chaîne
			var lastInt = function (a) {
			if (typeof a === "string") {
				for (var i = a.length ; !isNaN(a.substring(i, a.length)); i--) {
					var b = a.substring(i, a.length);
				}
			} else {
				var b = a;
			}
			return parseInt(b, 10);
			};
			//Fonction qui affiche la couleur sélectionnée, avec pour argument cette couleur
			var sendColour = function (a, c) {
				var color = '';				
				switch (parseInt(a, 10)) {
					case 0:
					color = 'rouge foncé';
					break;
					case 1:
					color = 'marron';
					break;
					case 2:
					color = 'rouge';
					break;
					case 3:
					color = 'rose';
					break;
					case 4:
					color = 'orange';
					break;
					case 5:
					color = 'jaune';
					break;
					case 6:
					color = 'vert';
					break;
					case 7:
					color = 'bleu';
					break;
					case 8:
					color = 'bleu foncé';
					break;
					case 9:
					color = 'violet foncé';
					break;
					case 10:
					color = 'violet';
					break;
					case 11:
					color = 'gris';
					break;
					case 12:
					color = 'blanc';
					break;
				}
				if (c) {
					return color;
				} else {
					var b = document.getElementById('colourtext');
					b.style.opacity = 1;
					b.innerHTML = color;
					setTimeout(eraseColour, 900);
				}
			};
			//Fonction qui agit après la fonction précédente, et qui efface le couleur
			var eraseColour = function() {
                if (document.getElementById('colourtext').style.opacity > 0) {
                    document.getElementById('colourtext').style.opacity -= 0.05;
                    setTimeout(eraseColour, 60);
                }
			};
		}