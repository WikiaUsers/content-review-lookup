/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur */

/* ============================================================
 Partie par Houmgaor */
// Le générateur d'armes automatique, autogénération de la page

if (document.querySelector('title').innerHTML == 'MH4U - Armes - Générateur - Wiki L\'encyclopédie Moga - Wikia') {
    var WikiaRail = document.getElementById('WikiaRail');
    var a = document.createElement('form');
    a.setAttribute('name', 'entree');
    a.innerHTML = '<p><label for="input">Nom de l\'arme : </label><input type="text" name="input" value="" id="input" placeholder="Glaive suprême" maxlength="50"><br/></p>\n<p><label for="att">Attaque : </label><input type="number" name="att" min="100" max="2000" id="att" placeholder="714" value=100 size="6"><br/></p>\n<p><label for="img">Image : </label><input type="text" name="img" value="" id="img" placeholder="Insect Glaive 008.png"><br/></p>\n<p><label for="spe">Spécial : </label><select name="Spécial" value="" id="spe"><option value="N/A" selected>Aucun</option><optgroup label="Elément"><option value="Feu">Feu</option><option value="Eau">Eau</option><option value="Glace">Glace</option><option value="Foudre">Foudre</option><option value="Dragon">Dragon</option></optgroup><optgroup label="Statut"><option value="Paralysie">Paralysie</option><option value="Poison">Poison</option><option value="Poisse">Poisse</option><option value="Sommeil">Sommeil</option><option value="Etourdissement">Etourdi</option></optgroup></select><br/></p>\n<p><label for="val">Spécial (valeur): </label><input type="number" name="val" value="10" min="10" max="1000" step="5" id="val" size="6"><label for="ev">    Avec éveil?</label><input type="radio" id="ev" name="ev" value="1"><label for="ev">Oui</label><input type="radio" id="nev" name="ev" value="0" checked><label for="nev">Non</label><br/></p>\n<p><label for="ach">Coût Achat : </label><input type="text" name="ach" value="" id="ach" placeholder="145 600z"><label for="ach">  (ne pas oublier les espaces)</label><br/></p>\n<p><label for="ame">Coût Amélioration : </label><input type="text" name="ame" value="" id="ame" placeholder="145 600z"><label for="ame">  (ne pas oublier les espaces)</label><br/></p>\n<p><label for="aff">Affinité : </label><input type="number" name="aff" value="0" id="aff" placeholder="30" min="-100" max="100" step="5" size="3"><label for="aff">  (ne pas indiquer le "%")</label><br/></p>\n<p><label for="tran">Tranchant : </label><input type="text" name="tran" value="" id="tran" placeholder="{{Tranchant|40|24|8|8|6|4}}{{Tranchant|40|24|8|8|6|4}}" size="40"><br/></p>\n<p><label for="cachat">Composants Achat : </label><input type="text" name="cachat1" value="" id="cachat1" placeholder="Composant 1 x2" size="50"><br/><input type="text" name="cachat2" value="" id="cachat2" placeholder="Composant 2 x2" size="50"><br/><input type="text" name="cachat3" value="" id="cachat3" placeholder="Composant 3 x2" size="50"><br/><input type="text" name="cachat4" value="" id="cachat4" placeholder="Composant 4 x2" size="50"><br/></p>\n<p><label for="came">Composants Amélioration : </label><input type="text" name="came1" value="" id="came1"  placeholder="Composant 1 x2" size="50"><br/><input type="text" name="came2" value="" id="came2" placeholder="Composant 2 x2" size="50"><br/><input type="text" name="came3" value="" id="came3" placeholder="Composant 3 x2" size="50"><br/><input type="text" name="came4" value="" id="came4" placeholder="Composant 4 x2" size="50"><br/></p>\n<p><label for="fen">Fentes : </label><input type="number" name="fen" value="0" min="0" max="3" id="fen" size="2"><br/></p>\n<p><label for="def">Bonus de Défense : </label><input type="number" name="def" value="0" min="-50" max="50" id="def" size="4"><br/></p>\n<p><label for="rar">Rareté : </label><input type="number" name="rar" min="1" value="1" max="10" id="rar" size="3"><br/></p>\n<p><label for="desc">Description : </label><input type="text" name="desc" value="" id="desc" size="60"><br/></p>\n<p><label for="vientde">Amélioré de : </label><input type="text" name="vientde" value="" id="vientde" placeholder="{{MH4UWL|Insectoglaive|Glaive colossal|8}}" size="40"><br/></p>\n<p><label for="ameen">Améliorer en : </label><input type="text" name="ameen" value="" id="ameen" placeholder="(Stade final de l\'arme)" size="40"><br/></p>\n<p><label for="tree">Arbre d\'évolution : </label><input type="text" name="tree" value="" id="tree" placeholder="Arbre des Faux en Os" size="40"><br/></p>\n<p><label for="engl">Lien interlangue anglais (optionnel) : </label><input type="text" value="" id="engl" name="engl" placeholder="Raven Tessen (MH4U)"></p>\n<input type="button" name="bouton" value="Convertir" onclick="common();">\n<input type="reset" name="del" value="Tout effacer">';
    document.getElementById('zonedecreation').appendChild(a);

// Formulaire de sortie du texte
    var a0 = document.createElement('form');
    a0.setAttribute('name', 'resultat');
    a0.innerHTML = '<textarea name="ress" rows="27" cols="60" id="exit">{{MH4U-Armes\n|Nom = \n|Image = [[Fichier:|200px]]\n|Attaque = \n|Spécial = \n|Coût Achat = \n|Coût Amélioration = \n|Affinité = \n|Tranchant = \n|Composants Achat = \n|Composants Amélioration = \n|Fentes = [[Fichier:_slot_decoration.png|40px]]\n|Bonus défense = \n|Rareté = \n|Description = \n|Amélioré De = \n|Amélioré En = \n}}</textarea><p><textarea name="dep" rows="1" cols="1" id="dep"></textarea></p><p><textarea name="share" id="share" cols="1" rows="1"></textarea></p><p><textarea name="objet" id="objet" cols="1" rows="1"></textarea></p>';
    document.getElementById('zonedecreation').appendChild(a0);
// Formulaire latérale pour les armes spéciales
    var a1 = document.createElement('form');
    a1.setAttribute('name', 'choice');
    a1.innerHTML = '<p><label for="cho">Entrez votre arme : </label><select name="choice" id="cho" onchange="choic()"><optgroup label="Épéiste"></optgroup><option value="ds">Doubles Lames</option><option value="gs">Grande Epée</option><option value="ls">Épée Longue</option><option value="sns">Épée et Bouclier</option><option value="hr">Marteau</option><option value="sa">Morpho-Hache</option><option value="cb">Volto-Hache</option><option value="hh">Corne de Chasse</option><option value="ig">Insectoglaive</option><option value="kin">Kinsecte</option><option value="lce">Lance</option><option value="lcn">Lancecanon</option><optgroup label="Artilleur"></optgroup><option value="lb">Fusarbalète Léger</option><option value="lb">Fusarbalète Lourd</option><option value="bow">Arc</option></select><br/></p>';
    WikiaRail.appendChild(a1);
// Formulaires spécifiques à certaines armes
    var a3 = document.createElement('h3');
    a3.innerHTML = '<u>Épéiste</u>';
    WikiaRail.appendChild(a3);
// Formulaire Morpho-Hache
    var a4 = document.createElement('h4');
    a4.innerHTML = 'Morpho-Hache';
    WikiaRail.appendChild(a4);
    var a5 = document.createElement('form');
    a5.setAttribute('name', 'sa');
    a5.innerHTML = '<p><label for="fiol">Fiole : </label><select name="fiol" value="" id="fiol"><option value="Puissance">Puissance</option><option value="Élément">Élément</option><option value="Poison">Poison</option><option value="Faiblesse">Faiblesse</option><option value="Paralysie">Paralysie</option><option value="Dragon">Dragon</option></select><br/></p>';
    WikiaRail.appendChild(a5);
//Formulaire Volto-Hache et Morpho-Hache
	var a6 = document.createElement('h4');					
    a6.innerHTML = 'Volto-Hache et Morpho-Hache';
    WikiaRail.appendChild(a6);
    var a7 = document.createElement('form');
    a7.setAttribute('name', 'cb');
    a7.innerHTML = '<p><label for="fio">Fiole : </label><select name="fio" value="" id="fio"><option value="Antiblindage"><font color="red">Explosion</font></option><option value="Élémentaire"><font color="green">Élément</font></option></select><br/></p>';
    WikiaRail.appendChild(a7);
// Formulaire Corne de Chasse
    var a8 = document.createElement('h4');
    a8.innerHTML = 'Corne de Chasse';
    WikiaRail.appendChild(a8);
    var a9 = document.createElement('form');
    a9.setAttribute('name', 'hh');
    a9.innerHTML = '<p><label for="notes">Mélodies : </label><input type="text" name="notes" value="" id="notes" placeholder="WBG" maxlength="3" size="4"><br/></p>';
    WikiaRail.appendChild(a9);
// Formulaire Insectoglaive
    var a10 = document.createElement('h4');
    a10.innerHTML = 'Insectoglaive';
    WikiaRail.appendChild(a10);
    var a11 = document.createElement('form');
    a11.setAttribute('name', 'ig');
    a11.innerHTML = '<p><label for="type">Type Kinsecte : </label><select name="Type Kinsecte" value="" id="type"><option value="Trancher">Couper</option><option value="Frapper">Impact</option></select></p><p><label for="nk">Niveau(x) du Kinsecte : </label><input type="text" name="nk" value="" id="nk" placeholder="4-6" maxlength="5" size="5"><br/></p>';
    WikiaRail.appendChild(a11);
// Formulaire Kinsecte
    var a12 = document.createElement('h4');
    a12.innerHTML = 'Kinsecte';
    WikiaRail.appendChild(a12);
// Formulaire lancecanon
    var a13 = document.createElement('h4');
    a13.innerHTML = 'Lancecanon';
    WikiaRail.appendChild(a13);
    var a14 = document.createElement('form');
    a14.setAttribute('name', 'lce');
    a14.innerHTML = '<p><label for="tire">Tir : </label><input type="text" name="tir" value="" id="tire" placeholder="Normal 1" size="15"><br/></p>';
    WikiaRail.appendChild(a14);
    var a15 = document.createElement('h3');
    a15.innerHTML = '<u>Artilleur</u>';
    WikiaRail.appendChild(a15);
// Formulaire Fusarbalète
    var a16 = document.createElement('h4');
    a16.innerHTML = 'Fusarbalète';
    WikiaRail.appendChild(a16);
    var a17 = document.createElement('form');
    a17.setAttribute('name', 'lb');
    a17.innerHTML = '<p><label for="rec">Recul : </label><select name="rec" id="rec"><option value="Un peu">Un peu</option><option value="Moyen">Moyen</option></select><br/><label for="dev">Déviation : </label><input name="dev" type="text" placeholder="Droite +2" id="dev" value="" size="15"><br/><label for="rech">Recharge :</label><select name="rech"	id="rech"><option value="Lent">Lent</option><option value="Inférieur moyen">Inférieur moyen</option><option value="Moyen">Moyen</option><option value="Supérieur moyen">Supérieur moyen</option><option value="Rapide">Rapide</option></select><br/><center>Munitions :</center><label for="Mnor1">Normale 1 : </label><input type="checkbox" name="Mnor1" id="Mnor1"><label for="Mnor2">Normale 2 : </label><input type="checkbox" name="Mnor2" id="Mnor2"><label for="Mnor3">Normale 3 : </label><input type="checkbox" name="Mnor3" id="Mnor3"><br/><label for="Mfeu">Feu : </label><input type="checkbox" name="Mfeu" id="Mfeu"><label for="Mper1">Perçante 1 : </label><input type="checkbox" name="Mper1" id="Mper1"><label for="Mper2">Perçante 2 : </label><input type="checkbox" name="Mper2" id="Mper2"><br/><label for="Mper3">Perçante 3 : </label><input type="checkbox" name="Mper3" id="Mper3"><label for="Maqu">Aquatique : </label><input type="checkbox" name="Maqu" id="Maqu"><label for="Mgre1">Grenaille 1 : </label><input type="checkbox" name="Mgre1" id="Mgre1"><br/><label for="Mgre2">Grenaille 2 : </label><input type="checkbox" name="Mgre2" id="Mgre2"><label for="Mgre3">Grenaille 3 : </label><input type="checkbox" name="Mgre3" id="Mgre3"><label for="Mfou">Foudre : </label><input type="checkbox" name="Mfou" id="Mfou"><br/><label for="Mant1">Antiblinda. 1:</label><input type="checkbox" name="Mant1" id="Mant1"><label for="Mant2">Antiblinda. 2:</label><input type="checkbox" name="Mant2" id="Mant2"><label for="Mant3">Antiblinda. 3:</label><input type="checkbox" name="Mant3" id="Mant3"><br/><label for="Mgla">Glace :</label><input type="checkbox" name="Mgla" id="Mgla"><label for="Mfra1">Fragmentation 1 :</label><input type="checkbox" name="Mfra1" id="Mfra1"><label for="Mfra2">Fragmentation 2 :</label><input type="checkbox" name="Mfra2" id="Mfra2"><br/><label for="Mfra3">Fragmentat. 3:</label><input type="checkbox" name="Mfra3" id="Mfra3"><label for="Mdra">Anti-Dragon:</label><input type="checkbox" name="Mdra" id="Mdra"><label for="Mtranq">Tranquilisante:</label><input type="checkbox" name="Mtranq" id="Mtranq"><br/><label for="Mpai">Paintball : </label><input type="checkbox" name="Mpai" id="Mpai"><label for="Mgue1">Guérison 1 : </label><input type="checkbox" name="Mgue1" id="Mgue1"><label for="Mgue2">Guérison 2 : </label><input type="checkbox" name="Mgue2" id="Mgue2"><br/><label for="Mdem">Démoniaque : </label><input type="checkbox" name="Mdem" id="Mdem"><label for="Mtox1">Toxique 1 : </label><input type="checkbox" name="Mtox1" id="Mtox1"><label for="Mtox2">Toxique 2 : </label><input type="checkbox" name="Mtox2" id="Mtox2"><br/><label for="Mdef">Défensive : </label><input type="checkbox" name="Mdef" id="Mdef"><label for="Mpar1">Paralysante 1 : </label><input type="checkbox" name="Mpar1" id="Mpar1"><label for="Mpar2">Paralysante 2 : </label><input type="checkbox" name="Mpar2" id="Mpar2"><br/><label for="Mtran">Tranchante : </label><input type="checkbox" name="Mtran" id="Mtran"><label for="Msom1">Somnifère 1 : </label><input type="checkbox" name="Msom1" id="Msom1"><label for="Msom2">Somnifère 2 : </label><input type="checkbox" name="Msom2" id="Msom2"><br/><label for="Mfeuw">Feu Wyverne:</label><input type="checkbox" name="Mfeuw" id="Mfeuw"><label for="Mlet1">Léthargique 1:</label><input type="checkbox" name="Mlet1" id="Mlet1"><label for="Mlet2">Léthargique 2:</label><input type="checkbox" name="Mlet2" id="Mlet2"><br/><label for="Mex">Explosive : </label><input type="checkbox" name="Mex" id="Mex"><br/></p>';
    WikiaRail.appendChild(a17);
// Formulaire Arc
    var a18 = document.createElement('h4');
    a18.innerHTML = 'Arc';
    WikiaRail.appendChild(a18);
    var a19 = document.createElement('form');
    a19.setAttribute('name', 'bow');
    a19.innerHTML = '<p><label for="tir">Tir Arc :</label><input type="text" value="" name="tir" id="tir" placeholder="Barrage - Large"><center>Enduits : </center><label for="E"></label><input type="checkbox" name="E" id="E">                       <br/></p>';
    WikiaRail.appendChild(a19);
    
// Formulaire d'entrée pour les informations en vrac sur l'arme
    var a2 = document.createElement('form');
    a2.setAttribute('name', 'trick');
    a2.innerHTML = '<textarea placeholder="| style=&quot;text-align:left;&quot; |{{I}}{{I}}{{L}}{{MH4UWL|Epée & Bouclier|Dague de commandant|2}}\n| 140\n| N/A\n| {{Tranchant|10|14|16|10}}{{Tranchant|10|14|16|20}}\n| [[Fichier:0 slot decoration.png|20px]]\n| \'\'\'0%\'\'\'\n| N/A\n|-\n| style=text-align:left; |{{I}}{{I}}{{Indent}}{{Branch}}{{MH4UWL|Epée & Bouclier|Couteau mortel|2}}" cols="30" rows="22" name="area" autofocus></textarea><input type="button" value="Auto-completer" onclick="auto ()">';
    document.getElementById('WikiaRail').appendChild(a2);
// Récupération de la liste des composants de monstre MH4U
    var xhrdep = new XMLHttpRequest();
    xhrdep.open('GET', 'http://fr.mogapedia.wikia.com/wiki/Liste_d%C3%A9pe%C3%A7ages_des_monstres_(MH4U)?action=edit');
    xhrdep.addEventListener('readystatechange', function() { 
        if (xhrdep.readyState === XMLHttpRequest.DONE && xhrdep.status === 200) {
            var hrdep = xhrdep.responseText;
            document.resultat.dep.innerHTML = hrdep.substring(hrdep.indexOf('id="wpTextbox1"'), hrdep.indexOf('id="CategorySelect"'));
        }
    });
    xhrdep.send(null);
// Récupération de la liste des échanges d'objets
    var xhrshare = new XMLHttpRequest();
    xhrshare.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MH4U_-_Echanges_de_Composants?action=edit');
    xhrshare.addEventListener('readystatechange', function() { 
        if (xhrshare.readyState === XMLHttpRequest.DONE && xhrshare.status === 200) {
            var hrshare = xhrshare.responseText;
            document.resultat.share.innerHTML = hrshare.substring(hrshare.indexOf('id="wpTextbox1"'), hrshare.indexOf('id="CategorySelect"'));
        }
    });
    xhrshare.send(null);
// Récupération de la liste des objets MH4U
    var xhrobj = new XMLHttpRequest();
    xhrobj.open('GET', 'http://fr.mogapedia.wikia.com/wiki/MH4U_Liste_des_Objets?action=edit');
    xhrobj.addEventListener('readystatechange', function() { 
        if (xhrobj.readyState === XMLHttpRequest.DONE && xhrobj.status === 200) {
            var hrobj = xhrobj.responseText;
            document.resultat.objet.innerHTML = hrobj.substring(hrobj.indexOf('id="wpTextbox1"'), hrobj.indexOf('id="CategorySelect"'));
        }
    });
    xhrobj.send(null);    
// Effacement du texte 'Chargement'
    document.getElementById('todelete').style.display = 'none';
    // Fonction pour trouver le dernier nombre contenu dans une châne de caractère
			var lastInt = function (a) {
			if (typeof a === "string") {
				for (var i = a.length ; !isNaN(a.substring(i, a.length)); i--) {
					var b = a.substring(i, a.length);
				}
			} else {
				var b = a;
			}
			return parseInt(b);
			};
			
// Fonction pour trouver l'index du premier chiffre rencontré
			var intIndex = function (a, c) {
				if (typeof a === 'string') {
					var b = 0;
					if (typeof c === 'undefined') {
						c = 0;
					}
					var i = c;
					while (isNaN(parseInt(a.substring(i, i+1)))) {
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
// Fonction pour nettoyer un texte de certains caractères spéciaux 
		var textPurge = function (a) {
			if (typeof a == "string") {
				a = a.replace('É', 'E');
				a = a.replace('œ', 'oe');
				a = a.replace('Œ', 'Oe');
			}
			if (typeof a == 'object') {
				for (var i = 0; i < a.length ; i++) {
				a[i] = a[i].replace('É', 'E');
				a[i] = a[i].replace('œ', 'oe');
				a[i] = a[i].replace('Œ', 'Oe');
				}
			}
			return a;
		};
// Fonction pour remplir automatiquement le formulaire
	var auto = function () {
	var Sentree = document.trick.area.value,		
		Snom = Sentree.substring(Sentree.indexOf('{{MH4UWL'), Sentree.indexOf('}}', Sentree.indexOf('{{MH4UWL'))+2),
		Satt = Sentree.substring(Sentree.indexOf('|', Sentree.indexOf(Snom)+Snom.length)+2, Sentree.indexOf('|', Sentree.indexOf(Snom)+Snom.length)+6);
		document.entree.input.value = Snom;
		document.entree.att.value = parseInt(Satt);
		document.entree.rar.value = parseInt(Snom.substring(Snom.lastIndexOf('|')+1, Snom.indexOf('}')));
		switch (Snom.substring(Snom.indexOf('|')+1, Snom.indexOf('|', Snom.indexOf('|')+1))) {
		case 'Epée & Bouclier': 
		document.choice.choice.value = 'sns';
		break;
		case 'Doubles Lames':
		document.choice.choice.value = 'ds';
		break;
		case 'Grande Epée':
		document.choice.choice.value = 'gs';
		break;
		case 'Epée Longue':
		document.choice.choice.value = 'ls';
		break;
		case 'Marteau':
		document.choice.choice.value = 'hr';
		break;
		case 'Corne de Chasse': 
		document.choice.choice.value = 'hh';
		var note = '';
		note = Sentree.substring(Sentree.indexOf('Note.')+5, Sentree.indexOf('Note.')+6);
		note = note+Sentree.substring(Sentree.indexOf('Note.', Sentree.indexOf('Note.')+1)+5, Sentree.indexOf('Note.', Sentree.indexOf('Note.')+1)+6);
		note = note+Sentree.substring(Sentree.lastIndexOf('Note.')+5, Sentree.lastIndexOf('Note.')+6);
		note = note.toUpperCase();
		document.hh.notes.value = note;
		break;
		case 'Kinsecte Tranchant': 
		document.choice.choice.value = 'kin';
		break;
		case 'Kinsecte Impact': 
		document.choice.choice.value = 'kin';
		break;
		case 'Lance': 
		document.choice.choice.value = 'lce';
		break;
		case 'Lancecanon': 
		document.choice.choice.value = 'lcn';
		var Stir = '';
		Stir = ~Sentree.indexOf('Normal') ? Sentree.substring(Sentree.indexOf('Normal'), Sentree.indexOf('Normal')+8): Stir;
		Stir = ~Sentree.indexOf('Long') ? Sentree.substring(Sentree.indexOf('Long'), Sentree.indexOf('Long')+6): Stir;
		Stir = ~Sentree.indexOf('Large') ? Sentree.substring(Sentree.indexOf('Large'), Sentree.indexOf('Large')+7): Stir;
		document.lcn.tir.value = Stir;
		break;
		case 'Morpho-Hache': 
		document.choice.choice.value = 'sa';
		break;
		case 'Volto-Hache': 
		document.choice.choice.value = 'cb';
		break;
		case 'Insectoglaive':
		document.choice.choice.value = 'ig';
		document.entree.input.value = Snom.substring(Snom.indexOf('|', Snom.indexOf('|')+1)+1, Snom.lastIndexOf('|'));
		break;
		case 'Fusarbalète Léger':
		document.choice.choice.value = 'lb';
		break;
		case 'Fusarbalète Lourd': 
		document.choice.choice.value = 'hb';
		break;
		case 'Arc':
		document.choice.choice.value = 'bow';
		break;
		}
	if ((document.choice.choice.value!='lb' && document.choice.choice.value!='hb' && document.choice.choice.value!='bow' && document.choice.choice.value!='kin') || 1) {
		if (~Sentree.indexOf('{{Elément')){
		Sspe = Sentree.substring(Sentree.indexOf('{{Elément'), Sentree.indexOf('}}', Sentree.indexOf('{{Elément'))+2);
		document.entree.Spécial.value = Sspe.substring(Sspe.indexOf('|')+1, Sspe.lastIndexOf('|'));
		} else if (~Sentree.indexOf('{{Statut')) {
		Sspe = Sentree.substring(Sentree.indexOf('{{Statut'), Sentree.indexOf('}}', Sentree.indexOf('{{Statut'))+2);
		document.entree.Spécial.value = Sspe.substring(Sspe.indexOf('|')+1, Sspe.lastIndexOf('|'));
		} else if (~Sentree.toLowerCase().indexOf('adell')) {
			switch (Sentree.substring(Sentree.indexOf('[[Fi')+10, Sentree.indexOf(' Adell'))) {
			case 'Fire':
			Sspe = '{{Elément|Feu|Mode=Icon}}';
			document.entree.Spécial.value = 'Feu';
			break;
			case 'Water':
			Sspe = '{{Elément|Eau|Mode=Icon}}';
			document.entree.Spécial.value = 'Eau';
			break;
			case 'Thunder':
			Sspe = '{{Elément|Foudre|Mode=Icon}}';
			document.entree.Spécial.value = 'Foudre';
			break;
			case 'Ice':
			Sspe = '{{Elément|Glace|Mode=Icon}}';
			document.entree.Spécial.value = 'Glace';
			break;
			case 'Dragon':
			Sspe = '{{Elément|Dragon|Mode=Icon}}';
			document.entree.Spécial.value = 'Dragon';
			break;
			case 'Poison':
			Sspe = '{{Statut|Poison|Mode=Icon}}';
			document.entree.Spécial.value = 'Poison';
			break;
			case 'Paralysis':
			Sspe = '{{Statut|Paralysie|Mode=Icon}}';
			document.entree.Spécial.value = 'Paralysie';
			break;
			}
		} else if (Sentree.includes('Status Effect-Blastblight MH4 Icon')) {
			Sspe = '{{Statut|Fléau-Poisse|Mode=Icon}}';
			document.entree.Spécial.value = 'Fléau-Poisse';
		} else if (Sentree.includes('MH3G-Status Effect Sleep.png') || Sentree.includes('Sleep xAdell.png')) {
			Sspe = '{{Statut|Sommeil|Mode=Icon}}';
			document.entree.Spécial.value = 'Sommeil';
		}
		else {
		Sspe = 'N/A';
		document.entree.Spécial.value = 'N/A';		
		}
	if (document.choice.choice.value == 'ig') {
		if (Sentree.includes(' Coupe ')) {
			document.getElementById('type').value = 'Trancher';
		} else {
			document.getElementById('type').value = 'Frapper';
		}
		document.ig.nk.value = parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(' Niv. ')), Sentree.length));
		if (Sentree.substring(intIndex(Sentree, Sentree.indexOf(' Niv. '))+document.ig.nk.value.length, intIndex(Sentree, Sentree.indexOf(' Niv. '))+document.ig.nk.value.length+1) == '-') {
			document.ig.nk.value += '-'+parseInt(Sentree.substring(intIndex(Sentree, intIndex(Sentree, Sentree.indexOf(' Niv. '))+2), Sentree.length));
		}
	}
	var Stran = Sentree.substring(Sentree.indexOf('{{Tranchant|'), Sentree.indexOf('}}', Sentree.lastIndexOf('{{Tranchant|'))+2);
		document.entree.tran.value = Stran;
		}
	if (Sspe != 'N/A') {
		if (~Sentree.indexOf(')', Sentree.indexOf(Satt)+Satt.length)) {
		var Sval = parseInt((Sentree.indexOf('adell')) ? Sentree.substring(Math.max(Sentree.indexOf(']]')+2, Sentree.indexOf('(')+1), Sentree.lastIndexOf(')')) : Sentree.substring(Math.max(Sentree.indexOf('}}'), Sentree.indexOf('(')), Sentree.lastIndexOf(')')));
		} else {
		var Sval = parseInt(Sentree.substring(Math.max(Sentree.indexOf(']]'), Sentree.indexOf('}}'))+2, Sentree.indexOf('|', Math.max(Sentree.indexOf(']]'), Sentree.indexOf('}}')))));
		}
	document.entree.val.value = Sval;
	}
	if (~Sentree.indexOf(')', Sentree.indexOf(Satt)+Satt.length)) {
	document.entree.nev.checked = false;
	document.getElementById('ev').checked = true;
	} else {
	document.getElementById('ev').checked = false;
	document.entree.nev.checked = true;	
	}
	var Sfen = parseInt(Sentree.substring(Sentree.lastIndexOf(':', Sentree.indexOf('slot'))+1, Sentree.indexOf('slot')));
		document.entree.fen.value = Sfen;
		var Saff = ' ',
			i = 3;
		while (isNaN(parseInt(Saff)) && i > -100) {
		Saff = Sentree.substring(Sentree.indexOf('%')-i, Sentree.indexOf('%'));
		i--;
		}
		document.entree.aff.value = parseInt(Saff);
	Sdef = ((Sentree.lastIndexOf('+') > Sentree.indexOf(Sspe)) && (~Sentree.indexOf('+', Sentree.indexOf(Satt)))) ? Sdef = parseInt(Sentree.substring(Sentree.lastIndexOf('+'), Sentree.lastIndexOf('+')+3)) : Sdef = 0;
	document.entree.def.value = Sdef;
	if (Sentree.lastIndexOf('{{MH4UWL') != Sentree.indexOf('{{MH4UWL')) {
	var Sameen = Sentree.substring(Sentree.lastIndexOf('{{MH4UWL'), Sentree.indexOf('}}', Sentree.lastIndexOf('{{MH4UWL'))+2);
		if (Sentree.substring(Sentree.indexOf(Sameen)+Sameen.length+1, Sentree.indexOf(Sameen)+Sameen.length+2) == '\'') {
		Sameen = '\'\'\''+Sameen+'\'\'\'';
	}
	}
	document.entree.ameen.value = (Sentree.substring(Sentree.indexOf('}}', Sentree.indexOf('{{MH4UWL')), Sentree.indexOf('}}', Sentree.indexOf('{{MH4UWL'))+4).includes('\'')) ? '(Stade ultime de l\'arme)' : Sameen;
	if (~Sentree.indexOf('Améliorer: ')) {
		var amelior = Sentree.indexOf('Améliorer: ');
		var Same = Sentree.substring(amelior+11, Sentree.indexOf('z', amelior)+1).replace(',', ' ');
		document.entree.ame.value = Same;
		var Scame = [];
		Scame[0] = Sentree.substring(Sentree.indexOf('z', amelior)+5, intIndex(Sentree, Sentree.indexOf('z', amelior)+1)).trim();
		Scame.push(' x'+parseInt(Sentree.substring(Sentree.indexOf(Scame[0])+Scame[0].length, Sentree.length))); 
		document.entree.came1.value = textPurge(Scame[0])+Scame[1];
		if (~intIndex(Sentree, Sentree.indexOf(Scame[0]))) {
			Scame.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[0]))+4, intIndex(Sentree, Sentree.indexOf(Scame[0])+Scame[0].length+Scame[1].length)));
			Scame[2] = Scame[2].trim();
			Scame.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[2])), Sentree.length)));
			document.entree.came2.value = textPurge(Scame[2])+Scame[3];		
			if (~intIndex(Sentree, Sentree.indexOf(Scame[2])) && Sentree.includes(Scame[2])) {
				Scame.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[2]))+4, intIndex(Sentree, Sentree.indexOf(Scame[2])+Scame[2].length+Scame[3].length)));
				Scame[4] = Scame[4].trim();
				Scame.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[2])), Sentree.length)));
				document.entree.came3.value = textPurge(Scame[4])+Scame[5];		
				if (~intIndex(Sentree, Sentree.indexOf(Scame[4])) && Sentree.includes(Scame[4])) {
					Scame.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[4]))+4, intIndex(Sentree, Sentree.indexOf(Scame[4])+Scame[4].length+Scame[5].length)));
					Scame[6] = Scame[6].trim();
					Scame.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scame[4])), Sentree.length)));
					document.entree.came4.value = textPurge(Scame[6])+Scame[7];
				}
			}
		}
	}
	if (~Sentree.indexOf('Créer: ')) {
		var cre = Sentree.indexOf('Créer:')
		var Sach = Sentree.substring(cre+7, Sentree.indexOf('z', cre)+1).replace(',', ' ');
		document.entree.ach.value = Sach;
		var Scachat = [];
		Scachat[0] = Sentree.substring(Sentree.indexOf('z', cre)+5, intIndex(Sentree, Sentree.indexOf('z', cre)+1)).trim();
		Scachat.push(' x'+parseInt(Sentree.substring(Sentree.indexOf(Scachat[0])+Scachat[0].length, Sentree.length)));
		document.entree.cachat1.value = textPurge(Scachat[0])+Scachat[1];
		if (~intIndex(Sentree, Sentree.indexOf(Scachat[0]))) {
			Scachat.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[0]))+4, intIndex(Sentree, Sentree.indexOf(Scachat[0])+Scachat[0].length+Scachat[1].length)));
			Scachat[2] = Scachat[2].trim();
			Scachat.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[2])), Sentree.length)));
			document.entree.cachat2.value = textPurge(Scachat[2])+Scachat[3];		
			if (~intIndex(Sentree, Sentree.indexOf(Scachat[2])) && Sentree.includes(Scachat[2])) {
				Scachat.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[2]))+4, intIndex(Sentree, Sentree.indexOf(Scachat[2])+Scachat[2].length+Scachat[3].length)));
				Scachat[4] = Scachat[4].trim();
				Scachat.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[2])), Sentree.length)));
				document.entree.cachat3.value = textPurge(Scachat[4])+Scachat[5];		
				if (~intIndex(Sentree, Sentree.indexOf(Scachat[4])) && Sentree.includes(Scachat[4])) {
					Scachat.push(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[4]))+4, intIndex(Sentree, Sentree.indexOf(Scachat[4])+Scachat[4].length+Scachat[5].length)));
					Scachat[6] = Scachat[6].trim();
					Scachat.push(' x'+parseInt(Sentree.substring(intIndex(Sentree, Sentree.indexOf(Scachat[4])), Sentree.length)));
					document.entree.cachat4.value = textPurge(Scachat[6])+Scachat[7];
				}
			}
		}
	}
	if (Sentree.includes('Créer: ') && !Sentree.includes('Améliorer: ')) {
		var Svientde = '(Stade de base de l\'arme)'
		document.entree.vientde.value = Svientde;
	}
	choic();
	};
	denomination = arme = arbre = '';
	i=1;
	cat="";

	//Les fonctions qui gère le traitement des informations entrées
	var choic = function () {
	document.entree.tree.style.display = 'inline-block'; 
	variante =" ";
	arme="";
	arbre=""
	weap =1;
	switch(document.choice.choice.value) {
	default:
    cat = "Armes";
    break;
	case "ds":
	denomination ="Armes";
	arbre="MH4U_:_Doubles_Lames";
	cat="Doubles lames";
	break;
	case "gs":
	denomination ="Armes";
	arbre="MH4U_:_Grande_épée";
	cat="Grande Epée";
	break;
	case "ls":
	denomination ="Armes";
	arbre="MH4U_:_Epée_longue";
	cat="Epée longue";
	break;
	case "sns":
	denomination ="Armes";
	arbre="MH4U_:_Epée_&_bouclier";
	cat="Épée et Bouclier";
	break;
	case "hr":
	denomination ="Armes";
	arbre="MH4U_:_Marteau";
	cat="Marteau";
	break;
	case "sa":
	denomination ="Morpho";
	fiol =document.sa.fiol.value;
	arme="\n|Fiole = "+fiol;
	arbre="MH4U_:_Morpho-Hache";
	cat="Morpho-Hache";
	break;
	case "cb":
	denomination ="Morpho";
	fio =document.cb.fio.value;
	arme="\n|Fiole = "+fio;
	arbre="MH4U_:_Volto-Hache";
	cat="Volto-Hache";
	break;
	case "hh":
	denomination ="CC";
	notes =document.hh.notes.value;
	arme="\n|Notes = "+notes;
	arbre="MH4U_:_Corne_de_chasse";
	cat="Corne de chasse"
	break;
	case "ig":
	denomination ="IG";
	type =document.ig.type.value;
	nk =document.ig.nk.value;
	arme ="\n|Type Insecte = "+type+" niveau "+nk;
	document.entree.tree.style.display = 'none';
	weap =4;
	break;
	case "kin":
	denomination ="Kin";
	arme="";
	cat="Kinsecte";
	break;
	case "lce":
	denomination ="Armes";
	arbre="MH4U_:_Lance";
	cat="Lance";
	break;
	case "lcn":
	denomination ="LF";
	tir =document.lcn.tir.value;
	arme ="\n|Tir = "+tir;
	arbre="MH4U_:_Lancecanon";
	cat="Lancecanon";
	break;
	case "lb":
	i = document.lb;
	var ask = 'Nombre de munitions ';
	   mun ='';
	mun = (i.Mnor1.checked) ? mun+'|Normale 1 = '+prompt(ask+'Normale 1?'): '';
	mun = (i.Mnor2.checked) ? mun+'\n|Normale 2 = '+prompt(ask+'Normale 2?') : mun;
	mun = (i.Mnor3.checked) ? mun+ '\n|Normale 3 = '+prompt(ask+'Normale 3?') : mun;
	mun = (i.Mfeu.checked) ? mun+ '\n|Feu = '+prompt(ask+'Feu ?') : mun;
	mun = (i.Mper1.checked) ? mun+ '\n|Perçante 1 = '+prompt(ask+'Perçante 1?') : mun;
	mun = (i.Mper2.checked) ? mun+ '\n|Perçante 2 = '+prompt(ask+'Perçante 2?') : mun;
	mun = (i.Mper3.checked) ? mun+ '\n|Perçante 3 = '+prompt(ask+'Perçante 3?') : mun;
	mun = (i.Maqu.checked) ? mun+ '\n|Aquatique = '+prompt(ask+'Aquatique?') : mun;
	mun = (i.Mgre1.checked) ? mun+ '\n|Grenaille 1 = '+prompt(ask+'Grenaille 1?') : mun;
	mun = (i.Mgre2.checked) ? mun+ '\n|Grenaille 2 = '+prompt(ask+'Grenaille 2?') : mun;
	mun = (i.Mgre3.checked) ? mun+ '\n|Grenaille 3 = '+prompt(ask+'Grenaille 3?') : mun;
	mun = (i.Mfou.checked) ? mun+ '\n|Foudre = '+prompt(ask+'Foudre ?') : mun;
	mun = (i.Mant1.checked) ? mun+ '\n|Antiblindage 1 = '+prompt(ask+'Antiblindage 1?') : mun;
	mun = (i.Mant2.checked) ? mun+ '\n|Antiblindage 2 = '+prompt(ask+'Antiblindage 2?') : mun;
	mun = (i.Mant3.checked) ? mun+ '\n|Antiblindage 3 = '+prompt(ask+'Antiblindage 3?') : mun;
	mun = (i.Mgla.checked) ? mun+ '\n|Glace = '+prompt(ask+'Glace?') : mun;
	mun = (i.Mfra1.checked) ? mun+ '\n|Fragmentation 1 = '+prompt(ask+'Fragmentation 1?') : mun;
	mun = (i.Mfra2.checked) ? mun+ '\n|Fragmentation 2 = '+prompt(ask+'Fragmentation 2?') : mun;
	mun = (i.Mfra3.checked) ? mun+ '\n|Fragmentation 3 = '+prompt(ask+'Fragmentation 3?') : mun;
	mun = (i.Mdra.checked) ? mun+ '\n|Anti-Dragon = '+prompt(ask+'Anti-Dragon?') : mun;
	mun = (i.Mtranq.checked) ? mun+ '\n|Tranquilisante = '+prompt(ask+'Tranquilisante?') : mun;
	mun = (i.Mpai.checked) ? mun+ '\n|Paintball = '+prompt(ask+'Paintball?') : mun;
	mun = (i.Mgue1.checked) ? mun+ '\n|Guérison 1 = '+prompt(ask+'Guérison 1?') : mun;
	mun = (i.Mgue2.checked) ? mun+ '\n|Guérison = '+prompt(ask+'Guérison 2?') : mun;
	mun = (i.Mdem.checked) ? mun+ '\n|Démoniaque = '+prompt(ask+'Démoniaque?') : mun;
	mun = (i.Mtox1.checked) ? mun+ '\n|Toxique 1 = '+prompt(ask+'Toxique 1?') : mun;
	mun = (i.Mtox2.checked) ? mun+ '\n|Toxique 2 = '+prompt(ask+'Toxique 2?') : mun;
	mun = (i.Mdef.checked) ? mun+ '\n|Défensive = '+prompt(ask+'Défensive?') : mun;
	mun = (i.Mpar1.checked) ? mun+ '\n|Paralysante 1 = '+prompt(ask+'Paralysante 1?') : mun;
	mun = (i.Mpar2.checked) ? mun+ '\n|Paralysante 2 = '+prompt(ask+'Paralysante 2?') : mun;
	mun = (i.Mtran.checked) ? mun+ '\n|Tranchante = '+prompt(ask+'Tranchante?') : mun;
	mun = (i.Msom1.checked) ? mun+ '\n|Somnifère 1 = '+prompt(ask+'Somnifère 1?') : mun;
	mun = (i.Msom2.checked) ? mun+ '\n|Somnifère 2 = '+prompt(ask+'Somnifère 2?') : mun;
	mun = (i.Mfeuw.checked) ? mun+ '\n|Feu Wyverne = '+prompt(ask+'Feu Wyverne?') : mun;
	mun = (i.Mlet1.checked) ? mun+ '\n|Léthargique 1 = '+prompt(ask+'Léthargique 1?') : mun;
	mun = (i.Mlet2.checked) ? mun+ '\n|Léthargique 2 = '+prompt(ask+'Léthargique 2?') : mun;
	mun = (i.Mex.checked) ? mun+ '\n|Explosive = '+prompt(ask+'Explosive?') : mun;
	weap =2;
	denomination ="Fusa";
	arme ="";
	rec =document.lb.rec.value;
	dev =document.lb.dev.value;
	rech =document.lb.rech.value;
	break;
	case "bow":
	weap =3;
	denomination ="Arc";
	var end = '';
	arme="";
	tir =document.bow.tir.value;
	break;
	}
	common();
	};
	i = 1;

	var common = function () {
	if (typeof(weap) == 'undefined') {
	weap = 1;
	}
	no = document.entree.input.value;
	pic = document.entree.img.value === '' ? 'placeholder' : document.entree.img.value;
	att = document.entree.att.value;
	switch(document.entree.Spécial.value) {
	case "N/A":
		spe ="N/A"
		break;
	case "Feu":
		spe ="{{Elément|Feu|Mode=Icon}}"
		break;
	case "Eau":
		spe ="{{Elément|Eau|Mode=Icon}}"
		break;
	case "Glace":
		spe ="{{Elément|Glace|Mode=Icon}}"
		break;
	case "Foudre":
		spe ="{{Elément|Foudre|Mode=Icon}}"
		break;
	case "Dragon":
		spe ="{{Elément|Dragon|Mode=Icon}}"
		break;
	case "Paralysie":
		spe ="{{Statut|Paralysie|Mode=Icon}}"
		break;
	case "Poison":
		spe ="{{Statut|Poison|Mode=Icon}}"
		break;
	case "Poisse":
		spe ="{{Statut|Fléau-Poisse|Mode=Icon}}"
		break;
	case "Sommeil":
		spe ="{{Statut|Sommeil|Mode=Icon}}"
		break;
	case "Etourdissement":
		spe ="{{Statut|Etourdissement|Mode=Icon}}"
		break;
	}
	val =document.entree.val.value;
	if (spe!="N/A") {
	spec =spe+val;
	}
	else {
	spec =spe;
	}
	if (spe!="N/A" && document.getElementById('ev').checked) {
	spec = '(' + spec + ')';
	}	
	var	Sdep = document.resultat.dep.value,
		Sshare = document.resultat.share.value,
		Sobjet = document.resultat.objet.value,
		came = cachat = [],
		cachat1 = document.entree.cachat1.value,
		cachat2 = document.entree.cachat2.value,
		cachat3 = document.entree.cachat3.value,
		cachat4 = document.entree.cachat4.value,
		came1 = document.entree.came1.value,
		came2 = document.entree.came2.value,
		came3 = document.entree.came3.value,
		came4 = document.entree.came4.value,
		cacha1 = cacha2 = cacha3 = cacha4 = cam1 = cam2 = cam3 = cam4 = CACHAT = CAME = '';
		ach = document.entree.ach.value;
		ame = document.entree.ame.value;
	if (ach!=0 && ach.toLowerCase() != "0z" && ach!="0") {
	if (cachat1 != "") {
	cacha1 = (~Sshare.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(cachat1.substring(0, cachat1.indexOf(' x'))))+4)+'|20px]] - [['+cachat1.substring(0, cachat1.indexOf(' x'))+']]' : cacha1; 
	cacha1 = (~Sdep.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(cachat1.substring(0, cachat1.indexOf(' x'))))+4)+'|20px]] - [['+cachat1.substring(0, cachat1.indexOf(' x'))+']]' : cacha1; 
	cacha1 = (~Sobjet.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(cachat1.substring(0, cachat1.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(cachat1.substring(0, cachat1.indexOf(' x'))))+4)+'|20px]] - [['+cachat1.substring(0, cachat1.indexOf(' x'))+']]' : cacha1; 
	cacha1 = (cacha1.length) ? cacha1 : '[['+cachat1.substring(0, cachat1.indexOf(' x'))+']]';
	cacha1 = (cachat1.length) ? cacha1 : "";
	cachat[0] = cacha1;
	cachat.push(parseInt(cachat1.substring(cachat1.indexOf(' x')+2, 2*cachat1.length-cachat1.indexOf(' x')+2)));
	}
	if (cachat2 != "") {
	cacha2 = (~Sshare.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(cachat2.substring(0, cachat2.indexOf(' x'))))+4)+'|20px]] - [['+cachat2.substring(0, cachat2.indexOf(' x'))+']]' : cacha2; 
	cacha2 = (~Sdep.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(cachat2.substring(0, cachat2.indexOf(' x'))))+4)+'|20px]] - [['+cachat2.substring(0, cachat2.indexOf(' x'))+']]' : cacha2; 
	cacha2 = (~Sobjet.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(cachat2.substring(0, cachat2.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(cachat2.substring(0, cachat2.indexOf(' x'))))+4)+'|20px]] - [['+cachat2.substring(0, cachat2.indexOf(' x'))+']]' : cacha2; 
	cacha2 = (cacha2.length) ? cacha2 : '[['+cachat2.substring(0, cachat2.indexOf(' x'))+']]';
	cacha2 = (cachat2.length) ? cacha2 : "";
	cachat.push(cacha2);
	cachat.push(parseInt(cachat2.substring(cachat2.indexOf(' x')+2, 2*cachat2.length-cachat2.indexOf(' x')+2)));
	}
	if (cachat3 != "") {
	cacha3 = (~Sshare.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(cachat3.substring(0, cachat3.indexOf(' x'))))+4)+'|20px]] - [['+cachat3.substring(0, cachat3.indexOf(' x'))+']]' : cacha3; 
	cacha3 = (~Sdep.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(cachat3.substring(0, cachat3.indexOf(' x'))))+4)+'|20px]] - [['+cachat3.substring(0, cachat3.indexOf(' x'))+']]' : cacha3; 
	cacha3 = (~Sobjet.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(cachat3.substring(0, cachat3.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(cachat3.substring(0, cachat3.indexOf(' x'))))+4)+'|20px]] - [['+cachat3.substring(0, cachat3.indexOf(' x'))+']]' : cacha3; 
	cacha3 = (cacha3.length) ? cacha3 : '[['+cachat3.substring(0, cachat3.indexOf(' x'))+']]';
	cacha3 = (cachat3.length) ? cacha3 : "";
	cachat.push(cacha3);
	cachat.push(parseInt(cachat3.substring(cachat3.indexOf(' x')+2, 2*cachat3.length-cachat3.indexOf(' x')+2)));
	}
	if (cachat4 != "") {
	cacha4 = (~Sshare.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(cachat4.substring(0, cachat4.indexOf(' x'))))+4)+'|20px]] - [['+cachat4.substring(0, cachat4.indexOf(' x'))+']]' : cacha4; 
	cacha4 = (~Sdep.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(cachat4.substring(0, cachat4.indexOf(' x'))))+4)+'|20px]] - [['+cachat4.substring(0, cachat4.indexOf(' x'))+']]' : cacha4; 
	cacha4 = (~Sobjet.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(cachat4.substring(0, cachat4.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(cachat4.substring(0, cachat4.indexOf(' x'))))+4)+'|20px]] - [['+cachat4.substring(0, cachat4.indexOf(' x'))+']]' : cacha4; 
	cacha4 = (cacha4.length) ? cacha4 : '[['+cachat4.substring(0, cachat4.indexOf(' x'))+']]';
	cacha4 = (cachat4.length) ? cacha4 : "";
	cachat.push(cacha4);
	cachat.push(parseInt(cachat4.substring(cachat4.indexOf(' x')+2, 2*cachat4.length-cachat4.indexOf(' x')+2)));
	}
	for (var i = 0; i < cachat.length; i++) {
	var CACHAT = (i/2 != Math.round(i/2)) ? CACHAT+' x'+cachat[i]+'<br/>' : CACHAT+cachat[i];
	}
	} else {
	ach = CACHAT = 'N/A';
	}
	if (ame!="" && ame.toLowerCase() != "0z" && ame != "0" && ame!=0) {
	if (came1 != "") {
	cam1 = (~Sshare.indexOf(came1.substring(0, came1.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(came1.substring(0, came1.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(came1.substring(0, came1.indexOf(' x'))))+4)+'|20px]] - [['+came1.substring(0, came1.indexOf(' x'))+']]' : cam1; 
	cam1 = (~Sdep.indexOf(came1.substring(0, came1.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(came1.substring(0, came1.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(came1.substring(0, came1.indexOf(' x'))))+4)+'|20px]] - [['+came1.substring(0, came1.indexOf(' x'))+']]' : cam1; 
	cam1 = (~Sobjet.indexOf(came1.substring(0, came1.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(came1.substring(0, came1.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(came1.substring(0, came1.indexOf(' x'))))+4)+'|20px]] - [['+came1.substring(0, came1.indexOf(' x'))+']]' : cam1; 
	cam1 = (cam1.length) ? cam1 : '[['+came1.substring(0, came1.indexOf(' x'))+']]';
	cam1 = (came1.length) ? cam1 : "";
	came[0] = cam1;
	came.push(parseInt(came1.substring(came1.indexOf(' x')+2, 2*came1.length-came1.indexOf(' x')+2)));
	}
	if (came2 != "") {
	cam2 = (~Sshare.indexOf(came2.substring(0, came2.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(came2.substring(0, came2.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(came2.substring(0, came2.indexOf(' x'))))+4)+'|20px]] - [['+came2.substring(0, came2.indexOf(' x'))+']]' : cam2; 
	cam2 = (~Sdep.indexOf(came2.substring(0, came2.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(came2.substring(0, came2.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(came2.substring(0, came2.indexOf(' x'))))+4)+'|20px]] - [['+came2.substring(0, came2.indexOf(' x'))+']]' : cam2; 
	cam2 = (~Sobjet.indexOf(came2.substring(0, came2.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(came2.substring(0, came2.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(came2.substring(0, came2.indexOf(' x'))))+4)+'|20px]] - [['+came2.substring(0, came2.indexOf(' x'))+']]' : cam2; 
	cam2 = (cam2.length) ? cam2 : '[['+came2.substring(0, came2.indexOf(' x'))+']]';
	cam2 = (came2.length) ? cam2 : "";
	came.push(cam2);
	came.push(parseInt(came2.substring(came2.indexOf(' x')+2, 2*came2.length-came2.indexOf(' x')+2)));
	}
	if (came3 != "") {
	cam3 = (~Sshare.indexOf(came3.substring(0, came3.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(came3.substring(0, came3.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(came3.substring(0, came3.indexOf(' x'))))+4)+'|20px]] - [['+came3.substring(0, came3.indexOf(' x'))+']]' : cam3; 
	cam3 = (~Sdep.indexOf(came3.substring(0, came3.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(came3.substring(0, came3.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(came3.substring(0, came3.indexOf(' x'))))+4)+'|20px]] - [['+came3.substring(0, came3.indexOf(' x'))+']]' : cam3; 
	cam3 = (~Sobjet.indexOf(came3.substring(0, came3.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(came3.substring(0, came3.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(came3.substring(0, came3.indexOf(' x'))))+4)+'|20px]] - [['+came3.substring(0, came3.indexOf(' x'))+']]' : cam3; 
	cam3 = (cam3.length) ? cam3 : '[['+came3.substring(0, came3.indexOf(' x'))+']]';
	cam3 = (came3.length) ? cam3 : "";
	came.push(cam3);
	came.push(parseInt(came3.substring(came3.indexOf(' x')+2, 2*came3.length-came3.indexOf(' x')+2)));
	}
	if (came4 != "") {
	cam4 = (~Sshare.indexOf(came4.substring(0, came4.indexOf(' x')))) ? Sshare.substring(Sshare.lastIndexOf('[[File:', Sshare.indexOf(came4.substring(0, came4.indexOf(' x')))), Sshare.lastIndexOf('.png|', Sshare.indexOf(came4.substring(0, came4.indexOf(' x'))))+4)+'|20px]] - [['+came4.substring(0, came4.indexOf(' x'))+']]' : cam4; 
	cam4 = (~Sdep.indexOf(came4.substring(0, came4.indexOf(' x')))) ? Sdep.substring(Sdep.lastIndexOf('[[File:', Sdep.indexOf(came4.substring(0, came4.indexOf(' x')))), Sdep.lastIndexOf('.png|', Sdep.indexOf(came4.substring(0, came4.indexOf(' x'))))+4)+'|20px]] - [['+came4.substring(0, came4.indexOf(' x'))+']]' : cam4; 
	cam4 = (~Sobjet.indexOf(came4.substring(0, came4.indexOf(' x')))) ? Sobjet.substring(Sobjet.lastIndexOf('[[File:', Sobjet.indexOf(came4.substring(0, came4.indexOf(' x')))), Sobjet.lastIndexOf('.png|', Sobjet.indexOf(came4.substring(0, came4.indexOf(' x'))))+4)+'|20px]] - [['+came4.substring(0, came4.indexOf(' x'))+']]' : cam4; 
	cam4 = (cam4.length) ? cam4 : '[['+came4.substring(0, came4.indexOf(' x'))+']]';
	cam4 = (came4.length) ? cam4 : "";
	came.push(cam4);
	came.push(parseInt(came4.substring(came4.indexOf(' x')+2, 2*came4.length-came4.indexOf(' x')+2)));
	}
	for (var i = 0; i < came.length; i++) {
	var CAME = (i/2 != Math.round(i/2)) ? CAME+' x'+came[i]+'<br/>' : CAME+came[i];
	}
	} else {
	ame = CAME = 'N/A';
	}
	aff =document.entree.aff.value+'%';
	if (Math.abs(parseInt(document.entree.aff.value)) > 15) {
	aff ='\'\'\''+document.entree.aff.value+'\'\'\'';
	}
if (parseInt(document.entree.aff.value) > 0) {
aff = "<font color=blue>"+aff+"</font>";
}
if (parseInt(document.entree.aff.value) < 0) {
aff = "<font color=red>"+aff+"</font>";
}
	if (aff == '%') {
	aff = '0%';
	}
tran =document.entree.tran.value;
fen =document.entree.fen.value;
if (document.entree.def.value!=0) {
def ="[[File:Defense Adell.png]] +"+document.entree.def.value;
}
else {
def ="0";
}
rar =document.entree.rar.value;
desc =document.entree.desc.value;
vientde =document.entree.vientde.value;
ameen = document.entree.ameen.value;
tree =document.entree.tree.value;
var engl = document.entree.engl.value;
if (engl.length > 2) {
engl = '[[en:'+engl+']]';
} else {
engl = '';
}
//Toutes les variables de texte et numériques sont entrées, elle sont donc renvoyées vers le contributeur, en utilisant un modèle présent sur le wikia
switch(weap) {
case 1:
document.resultat.ress.value="{{MH4U-"+denomination+"\n|Nom = "+no+"\n|Image = [[Fichier:"+pic+"|250px]]\n|Attaque = "+att+"\n|Spécial = "+spec+"\n|Coût Achat = "+ach+"\n|Coût Amélioration = "+ame+"\n|Affinité = "+aff+"\n|Tranchant = "+tran+"\n|Composants d'Achat = "+CACHAT+"\n|Composants d'Amélioration = "+CAME+arme+"\n|Fentes = [[Fichier:"+fen+"_slot_decoration.png|40px]]"+"\n|Bonus défense = "+def+"\n|Rare = "+rar+"\n|Description = "+desc+"\n|Amélioré De = "+vientde+"\n|Amélioré En = "+ameen+"\n|Arbre d'évolution = [["+arbre+"|"+tree+"]]\n}}\n[[" + "Catégorie:MH4U - "+cat+"]]\n"+engl;
break;
case 2:
document.resultat.ress.value="{{MH4U-Fusa\n|Nom = "+no+"\n|Image = [[Fichier:"+pic+"|250px]]\n|Attaque = "+att+"\n|Coût Achat = "+ach+"\n|Coût Amélioration = "+ame+"\n|Recul = "+rec+"\n|Déviation = "+dev+"\n|Recharge = "+rech+"\n|Affinité = "+aff+"\n|Composants d'Achat = "+CACHAT+"\n|Composants d'Amélioration = "+CAME+arme+"\n|Fentes = [[Fichier:"+fen+"_slot_decoration.png|40px]]"+"\n|Bonus défense = "+def+"\n|Rareté = "+rar+"\n|Description = "+desc+"\n|Amélioré De = "+vientde+"\n|Amélioré En = "+ameen+'\n}}<section begin=Munitions />\n{{MH4U-Fusa2'+mun+'\n}}<section end=Munitions />\n'+engl;
break;
case 3:
document.resultat.ress.value="{{MH4U-Arc\n|Nom = "+no+"\n|Image = [[Fichier:"+pic+"|250px]]\n|Attaque = "+att+"\n|Spécial = "+spec+"\n|Coût Achat = "+ach+"\n|Coût Amélioration = "+ame+"\n|Tir arc"+tir+"\n|Affinité = "+aff+"\n|Composants d'Achat = "+CACHAT+"\n|Composants d'Amélioration = "+CAME+arme+"\n|Fentes = [[Fichier:"+fen+"_slot_decoration.png|40px]]"+"\n|Bonus défense = "+def+"\n|Rareté = "+rar+"\n|Description = "+desc+"\n|Amélioré De = "+vientde+"\n|Amélioré En = "+ameen+"\n}}<section begin=Enduits />\n{{MH4U-Arc2\n"+end+"\n}}<section end=Enduits />\n"+engl;
break;
case 4:
document.resultat.ress.value="{{MH4U-IG\n|Nom = "+no+"\n|Image = [[Fichier:"+pic+"|250px]]\n|Attaque = "+att+"\n|Spécial = "+spec+"\n|Coût Achat = "+ach+"\n|Coût Amélioration = "+ame+"\n|Affinité = "+aff+"\n|Tranchant = "+tran+"\n|Composants Achat = "+CACHAT+"\n|Composants Amélioration = "+CAME+arme+"\n|Fentes = [[Fichier:"+fen+"_slot_decoration.png|40px]]"+"\n|Bonus défense = "+def+"\n|Rareté = "+rar+"\n|Description = "+desc+"\n|Amélioré De = "+vientde+"\n|Amélioré En = "+ameen+"\n}}\n"+engl;
break;
} 
	};
//Fin des fonctions nécessaires pour le générateur
}