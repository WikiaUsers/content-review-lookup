/**
 * Icônes de titre
 *
 * Cherche les icônes de titre (class="icone_de_titre") et les
 * déplace à droite du titre de la page.
 * Doit être exécuté après une éventuelle correction de titre.
 */
function IconesDeTitre() {
  var $h1;
  var $icones;

  $icones = $('div.icone_de_titre');
  if (!$icones.length) return;

  if (skin == 'oasis') {
    //apparence Wikia
     $h1 = $('h2:first');
  } else {
    //apparence Monobook
    $h1 = $('#firstHeading');
  }
  if (!$h1.length) return;

  $icones.each( function () {
    $(this).css({display: "block"}); /* annule display:none par défaut */
    $(this).insertBefore($h1); /* déplacement de l'élément */
   });
}
addOnloadHook(IconesDeTitre);

//pour ajouter des boutons dans la barre d'outils
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/2/26/Button_latinas.png','Citation française','{{Citation|','}}','Citation française');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/0/05/Button_Anf%C3%BChrung.png','Citation étrangère','{{Citation étrangère|langue=en|','}}','Citation anglaise');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/5/5c/Button_references2.png','Section ou article à sourcer','{{à sourcer|date=' + getStrDateToday('m a') + '}}','a_sourcer');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/1/1a/Button_fact.png','Référence nécessaire','{{Référence nécessaire|', '|date=' + getStrDateToday('m a') + '}}','ref_nec');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/3/3c/Button_lienweb.png','Lien web','<ref>{{Lien web\n|url=\n|titre=\n|id=\n|série=\n|auteur=\n|lien auteur=\n|coauteurs=\n|date=\n|année=\n|mois=\n|site=\n|éditeur=\n|page=\n|citation=\n|en ligne le=\n|consulté le=' + getStrDateToday('j m a') + '\n}}</ref>','lien_web');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/b/b4/Button_lienjournal.png','Article','<ref>{{Article\n|langue=\n|prénom1=\n|nom1=\n|lien auteur1=\n|titre=\n|périodique=\n|lien périodique=\n|jour=\n|mois=\n|année=\n|volume=\n|numéro=\n|pages=\n|issn=\n|url texte=\n|consulté le=' + getStrDateToday('j m a') + '\n}}</ref>,'article');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/e/ef/Button_cite_book.png','Livre','<ref>{{ouvrage\n|langue=\n|prénom1=\n|nom1=\n|lien auteur1=\n|titre=\n|sous-titre=\n|numéro d\'édition=\n|éditeur=\n|lien éditeur=\n|lieu=\n|jour=\n|mois=\n|année=\n|volume=\n|tome=\n|pages totales=\n|passage=\n|isbn=\n|lire en ligne=\n|consulté le=' + getStrDateToday('j m a') + '\n}}</ref>,'livre');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/3/31/Button-harv.png','Harvard sans parenthèse','<ref>{{harvsp|','|','|p=','}}</ref>,'harvsp');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/0/04/Button_array.png','Tableau','{| class="wikitable"\n|+ Titre du tableau\n! en-tête 0\n! en-tête 1\n! en-tête 2\n|-----\n| élément\n| élément\n| élément\n|-{{ligne grise}}\n| élément\n| élément\n| élément\n|-----\n| élément\n| élément\n| élément\n|},'array');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/c/c9/Button_strike.png','Rayer','<del>', '', '</del>,'strike');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/8/88/Btn_toolbar_enum.png','Énumération','\n* élément A\n* élément B\n* élément C', '', '', ''enum');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/1/11/Btn_toolbar_liste.png','Liste','\n# élément 1\n# élément 2\n# élément 3', '', ''liste');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/9/9e/Btn_toolbar_gallery.png','Galerie d\'images','\n<gallery>\nExemple.jpg|[[Tournesol]]\nExemple1.jpg|[[La Joconde]]\nExemple2.jpg|Un [[hamster]]\n</gallery>\n{{message galerie}}', '', '','gallery');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/3/37/Btn_toolbar_commentaire.png','Commentaire','<!--', '', '-->','comment');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/4/47/Button_redir.png','Redirection','#REDIRECT[[', 'nom de la destination', ']]','redir');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/b/b4/Button_category03.png','Catégorie','[[Catégorie:', 'nom de la catégorie', ']]','category');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/3/3b/Button_template_alt.png','Modèle','{{', 'modèle ou page à inclure', '}}','template');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/c/c4/Button_ref.png','Référence','<ref>', 'référence, citation ou lien', '</ref>','ref');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/6/64/Buttonrefvs8.png','Index des références','== Notes et références ==\n{{Références}}', '', '','references');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/b/bb/Seealso.png','Section Annexes',''== Notes et références ==\n{{Références}}\n\n== Annexes ==\n=== Articles connexes ===\n* [[À remplacer]]\n\n=== Liens externes ===\n*\n\n=== Bibliographie ===\n* [[À remplacer]]\n\n', '', '','references');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/1/12/Button_accueilA.png','Bienvenue sur ta page !','Bienvenue. Ceci est ta page utilisateur, '''{{BASEPAGENAME}}'''.<br />
N’hésite pas à la modifier [[Aide:Page utilisateur|suivant les recommandations]], et à t’y présenter !<br /> [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','bienvenue_sur_ta_page');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/e/eb/Button_accueilB.png','Bienvenue sur Aigles et Lys!','{{Bienvenue nouveau}}[[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','bienvenue');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/5/55/Button_accueilC.png','Bienvenue IP méritante','<div class="plainlinks" style="width:100%; height: auto; border-right:1px solid #FEA347; vertical-align:top; -moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius:10px; padding: 5px 5px 0 0;background-repeat:no-repeat; background-position:105% -15px; ">

<div style="padding: 0; width: 60%; float: left; font-size: 1em;">
<p style="display: block; padding: 5px; margin: 2% 0 0 0; border: none; border-left: 5px solid #FEA347; font-size: 132%;">'''Bonjour cher contributeur !'''</p>
<div style="padding-left: 5%;margin : 10px 0 0 0">
[[Fichier:Logo aigles et lys.svg|150px|left|border]]
Je suis {{#if:|[[user:{{!}}]],|}} bénévole sur Aigles et Lys pour l’accueil et l’aide aux débutants. Je vous contacte à propos de vos apports à Aigles et Lys, qui sont d'excellente qualité. Merci !

Actuellement, vous contribuez à Aigles et Lys depuis votre adresse IP ({{BASEPAGENAME}}). Cette adresse peut changer : vous perdrez alors la continuité des conversations en cours, votre crédit en tant qu’auteur des modifications que vous avez faites, etc. 

Afin de pouvoir poursuivre vos contributions dans de meilleures conditions (identité fixe, suivi des articles, gestion des conversations, espace personnel de brouillon, possibilité de participer à la vie communautaire et notamment aux votes et élections), je vous propose de vous [[Special:CreateAccount|créer un compte]]. Cela se fait gratuitement, et sans fournir de données personnelles : en quelques clics, devenez un membre de la communauté Aigles et Lys !{{#if:{{{message}}}|
{{clr|left}}
}}

Si vous avez besoin d'aide, n’hésitez pas à me contacter.

À bientôt,{{#if:|<nowiki/>

{{{sign}}} }}
</div>
</div>

<div style="width:30%; float: left; padding-left:5%;">
<p style="color:#444; font-weight: bold; font-size: 116%;border-bottom: 1px dotted #FEA347; padding-top: 0.55em;">L'indispensable</p>
* [[Aigles et Lys:Principes fondateurs|Principes fondateurs]]
* [[Aide:Tout l'indispensable...|Tout l'indispensable…]]
* [[Aigles et Lys:Critères d'admissibilité des articles|Critères d'admissibilité des articles]]

<p style="color:#444; font-weight: bold;border-bottom: 1px dotted #FEA347; padding-top: 0.55em;">Rejoindre la communauté ?</p>
* [[Aide:Compte utilisateur#Avantages|Pourquoi avoir un compte ?]]
* [[meta:Privacy policy/fr|Politique Aigles et Lys sur l’anonymat]]
* [[Aigles et Lys:Informations rendues publiques|Informations rendues publiques]]

<p style="color:#444; font-weight: bold;border-bottom: 1px dotted #FEA347; padding-top: 0.55em;">Pour vous aider</p>
* [[Aigles et Lys:Accueil de la communauté|Accueil de la communauté]]
* [[Aigles et Lys:Forum des nouveaux|Forum d'aide aux nouveaux]]

</div>
{{clr}}
<div style="background:#FEA347;padding:.3em;margin:10px 5% 0 65%;text-align:center;-moz-border-radius:10px 10px 0 10px; -webkit-border-radius:10px 10px 0 10px; border-radius:10px 10px 0 10px;">[[Special:CreateAccount|'''Créer un compte''' → ]]</div>

{{clr}}
</div> [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','bienvenue_ip_meritante');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/a/a9/Button_tournesol.png','Merci IP','<div title="{{((}}subst:merci IP{{))}} ou {{((}}subst:merci IP|&#126;&#126;&#126;&#126;{{))}}">
<h2>Merci de vos contributions</h2>

[[Image:Namespace Aigles et Lys.svg|left|200px|Merci]]

Bonjour,

'''Merci''' pour vos ajouts qui améliorent l’encyclopédie ; Aigles et Lys se construit petit à petit grâce à des bénévoles comme vous. Si vous le souhaitez, vous pouvez vous créer un [[Aide:Compte utilisateur|compte utilisateur]], mais cela n’a rien d’obligatoire. N’hésitez pas à me contacter si vous rencontrez une difficulté ou si vous avez la moindre question.

Amicalement, 
</div> [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','merci_ip');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/0/00/Button_vandale.png','Blocage d\'un vandale','{{Bloqué|1|jour}} [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','blocage_vandale');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/a/a7/Button_smiley3.png','Avertissement vandalisme','
== Édition inopportune sur l'article « article » ==
{|class="WSerieH plainlinks" title="{{((}}subst:vandalisme{{!}}page{{))}} ou {{((}}subst:vandalisme{{!}}liens{{=}}pages{{))}}" align="center" style="width:100%;margin-bottom:2em;border:1px solid #8888aa;border-right-width:2px;border-bottom-width:2px;background-color:#f7f8ff;padding:5px;text-align:justify" 
|-
|[[Fichier:Face-sad.svg|95px|link=]]
|Bonjour '''{{BASEPAGENAME}}''',

Vous avez découvert combien il est facile de modifier et de compléter [[Aigles et Lys]], l’encyclopédie [[Aigles et Lys:Réutilisation du contenu de Aigles et Lys|libre]], universelle et gratuite.<br /> Merci cependant de faire des contributions constructives et d’éviter d’effacer du contenu ou de vandaliser des pages{{#if:article|<nowiki> </nowiki>telles que '''[[:article]]''' ([[Special:Contributions/{{PAGENAME}}|entre autres]])}}.

'''''En cas de récidive, gardez à l'esprit que nous pourrions avoir à [[Aigles et Lys:Blocage en écriture|prendre une sanction de blocage]] contre votre adresse IP ou votre compte.'''''

Enfin, le [[Aigles et Lys:bac à sable|bac à sable]] est à votre disposition pour tester la [[Aide:Syntaxe Aigles et Lys|syntaxe de Aigles et Lys]].
|} [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','avertissement_vandalisme');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/5/58/Button_black_copyright.png','Avertissement copyvio','
{| class="WSerieH plainlinks" title="{{((}}Copieur{{!}}article concerné{{!}}site d’origine{{))}}" align="center" style="width:100%; margin-top:0; border:2px solid OrangeRed; padding:5px; background-color:#FFDF80;"
|-
|[[Fichier:Red copyright.svg|center|64px|alt=|link=]]
|style="padding-left: 10px" |Bonjour '''{{BASEPAGENAME}}''',

'''Vous avez copié sur [[article]] un contenu (texte ou image) provenant de page copiée.''' Cette modification a été annulée car elle contrevient à [[Aigles et Lys:Droit d'auteur|l’un des principes fondateurs de Aigles et Lys]] et à la législation sur les droits d’auteur.

{| align="center" style="padding: 0.5em; border: 1px solid red; background: #FFDF80"
| Toutefois, [[Modèle:Copieur/Ayant-droit|si vous êtes l’auteur de ce que vous avez écrit ou importé sur Aigles et Lys]],<br />consultez la '''[[Aide:Republication|page d’aide sur la republication de contenu sur Aigles et Lys]]'''.<br /> ''Il ne sera procédé à aucune restauration d’article ou d’image sans autorisation préalable''.
|}

Dans tous les autres cas, en copiant du matériel protégé, '''vous êtes personnellement responsable de contrefaçon''', et vous engagez également la responsabilité de l’hébergeur de Aigles et Lys, Wikia. En cas de récidive, un administrateur bloquera votre accès en écriture.

<small>[[Aigles et Lys:Legifer|Comment faire pour être sûr de la validité juridique de mes contributions ?]] - [[Aigles et Lys:Licence Creative Commons Paternité-Partage des Conditions Initiales à l'Identique 3.0 Unported|Licence Creative Commons Paternité-Partage des Conditions Initiales à l'Identique 3.0 Unported]] - [[A&L:GFDL|Licence de documentation libre GNU]]</small>
|}<!--
-->{{icône de titre|Image=Red copyright.svg|Taille=25|Texte=Copieur|Lien=Aigles et Lys:Droit d'auteur}} [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','avertissement_copyvio');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/5/58/Button_black_copyright.png','Avertissement copyvio','
{| class="WSerieH plainlinks" title="{{((}}Copieur{{!}}article concerné{{!}}site d’origine{{))}}" align="center" style="width:100%; margin-top:0; border:2px solid OrangeRed; padding:5px; background-color:#FFDF80;"
|-
|[[Fichier:Red copyright.svg|center|64px|alt=|link=]]
|style="padding-left: 10px" |Bonjour '''{{BASEPAGENAME}}''',

'''Vous avez copié sur [[article]] un contenu (texte ou image) provenant de page copiée.''' Cette modification a été annulée car elle contrevient à [[Aigles et Lys:Droit d'auteur|l’un des principes fondateurs de Aigles et Lys]] et à la législation sur les droits d’auteur.

{| align="center" style="padding: 0.5em; border: 1px solid red; background: #FFDF80"
| Toutefois, [[Modèle:Copieur/Ayant-droit|si vous êtes l’auteur de ce que vous avez écrit ou importé sur Aigles et Lys]],<br />consultez la '''[[Aide:Republication|page d’aide sur la republication de contenu sur Aigles et Lys]]'''.<br /> ''Il ne sera procédé à aucune restauration d’article ou d’image sans autorisation préalable''.
|}

Dans tous les autres cas, en copiant du matériel protégé, '''vous êtes personnellement responsable de contrefaçon''', et vous engagez également la responsabilité de l’hébergeur de Aigles et Lys, Wikia. En cas de récidive, un administrateur bloquera votre accès en écriture.

<small>[[Aigles et Lys:Legifer|Comment faire pour être sûr de la validité juridique de mes contributions ?]] - [[Aigles et Lys:Licence Creative Commons Paternité-Partage des Conditions Initiales à l'Identique 3.0 Unported|Licence Creative Commons Paternité-Partage des Conditions Initiales à l'Identique 3.0 Unported]] - [[A&L:GFDL|Licence de documentation libre GNU]]</small>
|}<!--
-->{{icône de titre|Image=Red copyright.svg|Taille=25|Texte=Copieur|Lien=Aigles et Lys:Droit d'auteur}} [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','avertissement_copyvio');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/f/fb/Button_spam2.png','Avertissement spam','
== Votre modification {{#if:article|sur « [[article]] »}} a été annulée ==

Bonjour et merci pour vos apports{{#if:article|&nbsp;{{#if:|à Aigles et Lys, notamment l'article|à l'article}} « [[article]] »}}.

<p style="padding: 5px; border-left: 2px solid #F0F010;">
Malheureusement, j'ai annulé vos modifications car {{#if:|vous avez ajouté le même [[Aide:Liens externes|lien externe]] sur un grand nombre d'articles. Or cette pratique s'apparente à du [[spam]] et ''n'est pas autorisée sur Aigles et Lys''.|vous avez ajouté un ou plusieurs [[Aide:Liens externes|liens externes]] inappropriés. Or cette section est réservée à des ''sites de référence reconnus'' : sites officiels, universités, gouvernements{{etc}}}}

Si votre lien apporte un complément d'information encyclopédique et fiable à un point {{#if:|des articles|de l'article}}, il est recommandé de le [[Aigles et Lys:Citez vos sources|citer comme source]] à l'endroit de l'information concernée.</p>

Pour davantage de précisions, vous pouvez lire {{#if:|la page [[Aigles et Lys:Spam]]|[[Aigles et Lys:Liens externes|la page consacrée aux liens externes]]}} ainsi que [[Aide:Présentez vos sources|l'aide à la présentation de vos sources]].

{{#if:|Si vous estimez que cette suppression est injustifiée, n'hésitez pas à [[User talk:|me contacter]].&nbsp;}}Je vous souhaite de bonnes futures contributions sur Aigles et Lys !

<small>Une question concernant le fonctionnement de Aigles et Lys ? [[Aigles et Lys:Forum des nouveaux|Contactez le forum des nouveaux]] !</small> [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','avertissement_spam');

addCustomButton('http://images.wikia.com/aigles-et-lys/fr/images/d/d9/Button_trait%C3%A9.png','Fait','{{Fait}} [[Utilisateur:Jimmy44|Jimmy NICOLLE]] ([[w:c:fr.aigles-et-lys:Discussion utilisateur:Jimmy44|discussion]])  février 3, 2013 à 12:17 (UTC)','fait');