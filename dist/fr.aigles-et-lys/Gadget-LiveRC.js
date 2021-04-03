/*
 ------------------------------------------------------------------------------
 -----LLLL---------III--------------------------RRRRRRRRRR--------CCCCC--------
 -----LLLL---------III--------------------------RRRRRRRRRRRR----CCCCCCCCC------
 -----LLLL--------------------------------------RRR------RRR---CCC-----CCC-----
 -----LLLL---------III--VV-----VV--EEEEEEEEE----RRR------RRR--CCC--------------
 -----LLLL---------III---VV---VV---EEE----------RRRRRRRRRRR---CCC--------------
 -----LLLL---------III---VV---VV---EEEEEE-------RRRRRRRRRR----CCC--------------
 -----LLLL---------III----VV-VV----EEEEEE-------RRR-----RRR----CCC-----CCC-----
 -----LLLLLLLLLLL--III----VVVVV----EEE----------RRR------RRR----CCCCCCCCC------
 -----LLLLLLLLLLL--III-----VVV-----EEEEEEEEE----RRR-------RRR-----CCCCC--------
 ------------------------------------------------------------------------------

{{Boîte déroulante|largeur=30%|alignB=right|titre=Sommaire|contenu={{Sommaire à droite}}}}

* Licence : ...?
* Documentation : [[:fr:Aigles et Lys:LiveRC/Documentation]]
* Auteur : [[Wikipedia:fr:User:EDUCA33E]]
* Développement et maintenance :
** [[Wikipedia:fr:User:TiChou]],
** [[Wikipedia:pl:User:Leafnode]],
** [[Wikipedia:it:User:Jalo]],
** [[Wikipedia:fr:User:Nakor]],
** [[Wikipedia:fr:User:Arkanosis]],
** [[Wikipedia:pl:User:Nux]],
** [[Wikipedia:fr:User:Argos42]],
** [[Wikipedia:fr:User:Orlodrim]],
** [[Wikipedia:fr:User:Dr Brains]]

{{Catégorisation JS|LiveRC}}
{{clr}}

== Code source ==

=== Variables globales ===

<source lang="javascript"> */

if(typeof(LiveRC_PageTitle)=="undefined") LiveRC_PageTitle = "Aigles et Lys:LiveRC";
if(typeof(LiveRC_MessagesPage)=="undefined")  LiveRC_MessagesPage = "MediaWiki:Gadget-LiveRCMessages.js";

var LiveRC_Version = "0.5.0";

/* </source>

==== Variables d'état (pour test sur rc.state) ====

<source lang=javascript> */

  // Comments test table (regexp format);
  // ////////////////////////////////////
  var commenttests = [
    { state: "BLANKING"  , regex: /^Résumé automatique : blanchiment|^[Bb]lanchi/ },
    { state: "REPLACED"  , regex: /^Résumé automatique : contenu remplacé par/ },
    { state: "REVERT" , regex: /(LiveRC : )?Révocation |([Bb]ot : )?[Aa]nnulation des modifications|([Bb]ot : )?[Rr]évocation de |^(Undid|Revert to( the)?) revision|^(Undoing|Reverted( \d+)?) edit|^r(e)?v(ert(ing|ed)?)?\b|LiveRC : Suppression immédiate/ }
  ];

  // Categories test table (regexp format);
  var categoriestests = [
    { state: "LOCK"      , regex: 'Page (semi-protégée|en semi-protection longue)' },
    { state: "FULLLOCK"  , regex: 'Page protégée' },
    { state: "ADQ"       , regex: 'Article de qualité( contesté|)$' },
    { state: "BA"        , regex: 'Bon article$' },
    { state: "APDQ"      , regex: 'Article potentiellement (bon|de qualité)' },
    { state: "STUB"      , regex: 'Aigles et Lys:ébauche' },
    { state: "COPYRIGHT" , regex: 'Article soupçonné de travail sous copyright' },
    { state: "PAS"       , regex: 'Page proposée à la suppression' }
  ];

/* </source>

==== Paramètres ====

<source lang=javascript> */

  var lrcParams = {
    "PreviewHeight"       : '250px', // Hauteur par défaut de la fenêtre de prévisualisation;
    "HistoryHeight"       : '250px', // Hauteur par défaut de l'historique des prévisualisations;
    "GoogleHeight"        : '250px', // Hauteur par défaut de la fenêtre de recherche Google;
    "TchatHeight"         : '150px', // Hauteur par défaut de la fenêtre de tchat;
    "TZ"                  : '',      // Fuseau horaire (+02:00, 02:00, -0200, -05:45, ...)
    "RCLimit"             : 30,      // Nombre de ligne maximum de la table de RC;
    "Refresh"             : 10,      // Délai de rafraichissement des RC
    "ReloadList"          : 600,     // Délai de rafraichissement des listes de suivi, du journal des blocages et des catégories d'utilisateurs
    "GoogleSearchLimit"   : 100,     // Nombre de résultats de la recherche Google
    "ArticleLengthLimit"  : 0,       // Limite du nombre de caractères affichés de l'article dans les RC
    "UserLengthLimit"     : 0,       // Limite du nombre de caractères affichés de l'utilisateur dans les RC
    "AutoCloseDiff"       : false,   // Supprimer une ligne après visualisation du diff
    "WLAllChanges"        : true,    // Montrer les changements faits dans la liste de suivi
    "BoldComments"        : false,   // Commentaires de modification en gras
    "RvMinorEdit"         : false,   // Marquer les révocations en édition mineure
    "LoadWatchlist"       : true,    // Charger la liste des articles et utilisateurs suivis (coûteux au démarrage)
    "LoadIPCat"           : true,    // Charger les catégories d'utilisateurs et le journal des blocages (coûteux au démarrage)
    "LoadCatAndTemplates" : true,    // Charger les catégories et modèles des articles (très coûteux)
    "BypassWatchdefault"  : true,    // Ne pas ajouter automatiquement les pages modifiées à la liste de suivi
    "AddExtensionCustom"  : false,   // Permettre d'ajouter des extensions en plus de celles par défaut
    "InvertUpdate"        : false,   // Inverser le sens d'apparition des RC
    "KeepAllLines"        : false,   // Conserver toutes les lignes RC
    "DisplayDebug"        : false,   // Afficher le panneau de débogage
    "PreloadLines"        : true,    // Préchargement des diff en utilisant le bouton [Suivant]
    "SubstWarnings"       : true     // Substitution des modèles d'avertissement
  }

  // Valeurs par défaut du menu d'option

  var lrcOptionMenuValues = {
    "Tchat"   : false,        // Case "Tchat"
    "Preview" : false,        // Case "Prévisualiser"
    "Lists"   : false,        // Case "Listes" cochée
    "Stop"    : false,        // Case "Pause" cochée
    "Diff"    : false,        // Case "Diff réduit" cochée
    "RC"      : true,         // Case "RC" cochée
    "Log"     : false,        // Case "Journaux" cochée :
    "Filter"  : false,        // Case "Filtres"
    "RCType"  : "IPNEW",      // Sélecteur "Utilisateurs" : "RESTMODE", "IPONLY", "IPNEW", "ALLUSERS" ou "ALLNBOTS"
    "RCns"    : 999           // Sélecteur "Espaces" : false ou espace de noms
  }

/* </source>

==== Textes ====

<source lang=javascript> */

  // Wiki specific translation;
  // /////////////////////
  var lang_category       = 'Catégorie:';
  var lang_main_namespace = 'Articles';
  var lang_sandbox        = "Aigles et Lys:Bac à sable";

  // Menu translation;
  // /////////////////
  var lang_menu = {
    PAUSE    : "Pause",
    PREVIEW  : "Prévisualiser",
    LISTS    : "Listes",
    LOWDIFF  : "Diff réduit",
    RCLABEL  : "RC",
    NOBOTS   : "Sans Bots",
    RESTMODE : "Suivis",
    IPONLY   : "IP seules",
    IPNEW    : "IP+débutants",
    ALLUSERS : "Tous",
    ALLNBOTS : "Tous+bots",
    NAMESP   : "Espace",
    XTIMES   : "fois",
    UNDORC   : "Défaire",
    REVERT   : "Révoquer",
    REASON   : "Motif",
    USERMSG  : "Message",
    EMPTY    : "Blanchir",
    TAG      : "Bandeau",
    LOGSHOW  : "Journaux",
    ABSHOW   : "Filtres",
    NEXTDIFF : "Suivant",
    TCHAT    : "Tchat"
  };

  var lang_tooltips = {
    // main menu
    HIDE_ALL:             "Supprimer toutes les lignes",
    HIDE_REVIEWED:        "Supprimer les lignes des modifications visualisées",
    HIDE_REVERTS:         "Supprimer les lignes d’annulation",
    HIDE_NEW:             "Supprimer les lignes de création de page",
    HIDE_BLANKING:        "Supprimer les lignes de blanchiment",
    HIDE_THIS:            "Supprimer cette ligne",
    // history
    DIFFPREV_TIP:         "Voir la page précédente",
    DIFFPREV_SHORT:       "⇦",
    DIFFHIST_TIP:         "Ouvrir l’historique de navigation",
    DIFFHIST_SHORT:       "?",
    DIFFNEXT_TIP:         "Voir la page suivante",
    DIFFNEXT_SHORT:       "⇨",
    NEXTDIFF_TIP:         "Voir la modification suivante",
    // options
    PAUSE_TIP:            "Arrêter le défilement des modifications",
    DIFFR_TIP:            "Afficher le diff réduit",
    SHOWRC_TIP:           "Afficher les modifications",
    SHOWLOG_TIP:          "Afficher les journeaux d’opération",
    SHOWFILTER_TIP:       "Afficher les filtres",
    SHOWUSERS_TIP:        "Sélectionner le type d’utilisateurs suivis",
    SHOWNS_TIP:           "Sélectionner l’espace de noms",
    // links in rows
    DIFF_TIP:             "Différence",
    DIFF_SHORT:           "Diff",
    HIST_TIP:             "Historique",
    HIST_SHORT:           "H",
    EDIT_TIP:             "Modifier",
    EDIT_SHORT:           "M",
    MOVE_TIP:             "Renommer",
    MOVE_SHORT:           "R",
    DEL_TIP:              "Supprimer",
    DEL_SHORT:            "S",
    PROTECT_TIP:          "Protéger",
    PROTECT_SHORT:        "P",
    SUBJECT_TIP:          "Page",
    SUBJECT_SHORT:        "P",
    TALK_TIP:             "Discussion",
    TALK_SHORT:           "D",
    CONTRIB_TIP:          "Contributions",
    CONTRIB_SHORT:        "C",
    BLOCK_TIP:            "Bloquer",
    BLOCK_SHORT:          "B",
    USER_HIDE_TIP:        "Ignorer l’utilisateur",
    USER_HIDE_SHORT:      "H",
    NEWSECTION_TIP:       "Nouvelle discussion",
    NEWSECTION_SHORT:     "+",
    DELETEDCONTRIB_TIP:   "Contributions supprimées",
    DELETEDCONTRIB_SHORT: "+",
    REVISIONDELETE_TIP:   "Masquer la révision",
    REVISIONDELETE_SHORT: "Masquer",
    WHATLINKSHERE_TIP:    "Pages liées à",
    WHATLINKSHERE_SHORT:  "↩",
    WATCH_TIP:            "Suivre",
    WATCH_SHORT:          "S",
    UNWATCH_TIP:          "Ne plus suivre",
    UNWATCH_SHORT:        "<s>S</s>",
    ASKSYSOP_SHORT:       "Demande sysop",
    ASKSYSOP_TIP:         "Demander une action à un administrateur",
    // other
    WORKING:              "Traitement en cours...",
    GOOGLE_TIP:           "Rechercher sur Google",
    GOOGLE_SHORT:         "Google",
    GOOGLE_CLOSE_TIP:     "Fermer la fenêtre Google",
    GOOGLE_CLOSE_SHORT:   "Fermer"
  }

  var lang_messages = {
    NEW_VERSION      : ' <span class="error">Vous utilisez la version $1 de LiveRC, qui est obsolète. Veuillez recharger le cache de votre navigateur pour utiliser la dernière version.</span>',
    ALREADY_RUNNING  : ' <span class="error">Vous essayez de lancer LiveRC, alors que LiveRC est déjà lancé. Vérifiez que vous ne l\'avez pas activé deux fois (dans vos gadgets <em>et</em> dans vos scripts, par exemple).</span>',
    SAME_EDITOR      : 'éditeur précédent identique',
    WARNING          : 'Message',
    ON_ARTICLE       : 'sur',
    SANDBOX          : 'attention, cette page est dédiée aux tests',
    NOEXIST          : '<center><span class="error">Cette page n’existe pas.</span> $1Créer ?$2</center>',
    FILTER           : 'Déclenchement du filtre',
    WATCHLISTON      : 'ajout sur watchlist',
    WATCHLISTOFF     : 'retrait de watchlist',
    REVISIONDELETEOK : "Visibilité des versions mise à jour avec succès.",
    SPEEDDELETION    : 'Suppression immédiate',
    BLOCKED          : 'bloqué',
    RESUMESTART      : '[[A&L:LRC|LiveRC]] : ',
    BLOCKAVERTO      : 'Avertissement blocage',
    BLOCKTEMPLATE    : 'Blocage',
    UPDATEMESSAGES   : 'Mise à jour des messages système',
    CLOCKTITLE       : 'Geler/Relancer l’horloge',
    SHOWLiveRC       : 'Afficher LiveRC',
    HIDELiveRC       : 'Masquer LiveRC'
  };

/* </source>

==== Blanchiment, révocation et avertissement ====

<source lang=javascript> */

  // Avertissement 
  var lstAverto = [
    { template: "Test 0"                , string: "Test 0"            , hasPage: true,  addName: true  },
    { template: "Test 1"                , string: "Test 1"            , hasPage: true,  addName: true  },
    { template: "Test 2"                , string: "Test 2"            , hasPage: false, addName: false },
    { template: "Test 3"                , string: "Test 3"            , hasPage: false, addName: false },
    { template: "Seul avertissement"    , string: "Test 4"            , hasPage: false, addName: false },
    { template: "Retrait injustifié"    , string: "Retrait injustifié", hasPage: true,  addName: true  },
    { template: "Motivation modif"      , string: "Résumé"            , hasPage: true,  addName: true  },
    { template: "LE HC"                 , string: "LE hors-critères"  , hasPage: true,  addName: true  },
    { template: "LE dans texte"         , string: "LE dans texte"     , hasPage: true,  addName: true  },
    { template: "Spammeur"              , string: "Spam"              , hasPage: true,  addName: true  },
    { template: "Ortho"                 , string: "Ortho"             , hasPage: true,  addName: true  },
    { template: "Ajout POV"             , string: "Non-neutre"        , hasPage: true,  addName: true  },
    { template: "Non-encyclo"           , string: "Non-encyclo"       , hasPage: true,  addName: true  },
    { template: "Faut sourcer"          , string: "Faut sourcer"      , hasPage: true,  addName: true  },
    { template: "Maladresse"            , string: "Modif corrigée"    , hasPage: true,  addName: true  },
    { template: "Suppr Bandeaux"        , string: "Bandeaux"          , hasPage: true,  addName: true  },
    { template: "Bienvenue Copyvio 1"   , string: "Copyright"         , hasPage: true,  addName: true  },
    { template: "Compte publicitaire"   , string: "PU publicitaire"   , hasPage: false, addName: true  },
    { template: "BSI CAA"               , string: "BSI CAA"           , hasPage: true,  addName: true  },
    { template: "BSI BàS"               , string: "BSI BàS"           , hasPage: true,  addName: true  },
    { template: "BSI promo"             , string: "BSI promo"         , hasPage: true,  addName: true  },
    { template: "BSI canular"           , string: "BSI canular"       , hasPage: true,  addName: true  },
    { template: "Aide sources"          , string: "Aide sources"      , hasPage: false, addName: true  },
    { template: "Aide images"           , string: "Aide images"       , hasPage: false, addName: true  },
    { template: "Aide wikification"     , string: "Aide wikif"        , hasPage: true,  addName: true  },
    { template: "Aide liens"            , string: "Aide liens"        , hasPage: false, addName: true  },
    { template: "Bienvenue"             , string: "Bienvenue"         , hasPage: false, addName: true  },
    { template: "Bienvenue IP"          , string: "Bienvenue IP"      , hasPage: false, addName: true  },
    { template: "Bienvenue IP méritante", string: "Bienvenue IP +"    , hasPage: false, addName: true  }
  ];

  // Blanchiment
  var lstBlank = [
    {tooltip: "copyvio"      , resume: "[[A&L:COPY|copie de site web sans autorisation explicite]]" },
    {tooltip: "CAA"          , resume: "[[A&L:CAA|critères d\'admissibilité non atteints]]"         },
    {tooltip: "non encyclo"  , resume: "[[A&L:P|non encyclopédique en l\'état]]"                    },
    {tooltip: "BaS"          , resume: "bac à sable"                                               },
    {tooltip: "vandalisme"   , resume: "vandalisme"                                                }
  ];

  // Révocation
  var lrcRevertMessages = [
    { resume: "[[Aigles et Lys:Bac à sable|Bac à sable]]" , text: "Bac à sable" },
    { resume: "[[Aigles et Lys:Vandalisme|Vandalisme]]"   , text: "Vandalisme"  },
    { resume: "Retrait d'information non sourcée"    , text: "Non-sourcé"  },
    { resume: "Traduction automatique"                , text: "Trad auto"   }
  ];

  // Bandeaux
  var lstTag = [
    { template: "Admissibilité à vérifier" , string: "admissibilité" , withDate: true  },
    { template: "Copie à vérifier"         , string: "copyvio"       , withDate: false },
    { template: "À sourcer"                , string: "à sourcer"     , withDate: true  },
    { template: "À wikifier"               , string: "à wikifier"    , withDate: true  },
    { template: "Promotionnel"             , string: "promotionnel"  , withDate: false },
    { template: "Travail inédit"           , string: "TI"            , withDate: false }
  ];

/* </source>

==== Requête aux administrateurs ====

<source lang=javascript> */

    var lstAskForSysop = [
        {  userright:"delete",
           text:"Suppression",
           page:"Aigles et Lys:Demande de suppression immédiate",
           template:"Aigles et Lys:LiveRC/Modèles/Demande de suppression",
           parampage:true,
           paramuser:false,
           reasonsdropdownname:"deletereason-dropdown"
        },
        {  userright:"protect",
           text:"Protection",
           page:"Aigles et Lys:Demande de protection de page",
           template:"Aigles et Lys:LiveRC/Modèles/Demande de protection",
           parampage:true,
           paramuser:false,
           reasonsdropdownname:"protect-dropdown"
        },
        {  userright:"block",
           text:"Blocage",
           page:"Aigles et Lys:Vandalisme en cours",
           template:"Aigles et Lys:LiveRC/Modèles/Demande de blocage",
           parampage:false,
           paramuser:true,
           reasonsdropdownname:"ipbreason-dropdown"
        }
    ];

/* </source>

==== Catégories ====

<source lang=javascript> */

  // user categories for highlighting
  var watchCategories = [
    { category: "Catégorie:Adresse IP scolaire", image: "ScolarIP" },
    { category: "Catégorie:Adresse IP partagée", image: "SharedIP" },
    { category: "Catégorie:Utilisateur enfreignant un copyright", image: "CopyrightUser" }
  ];

/* </source>

==== Icônes ====

<source lang=javascript> */

  // Default icons
  var lrcIcon = new Array();
  lrcIcon["Nocat"] = '<sup style="color:crimson">(cat ?)</sup>';
  lrcIcon["Noportal"] = '<sup style="color:crimson">(portail ?)</sup>';
  lrcIcon["NbRevoc"] = '<sup style="color:red">($1 révoc <a href="javascript:;" onClick="removeRevoc($2)" title="Remettre le compteur de révocations à zéro">-</a>)</sup>';
  lrcIcon["Tag"] = '<br /><span style="color: red; font-weight: bold;">Tag : $1$2</span>';
  lrcIcon["Recent"] = '<img '
                    + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/1/19/Ambox_currentevent.svg/16px-Ambox_currentevent.svg.png" '
                    + 'width="16px" title="Événement récent" alt="Récent" />';
  lrcIcon["Homon"] = '<img '
                   + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Disambig.svg/16px-Disambig.svg.png" '
                   + 'width="16px" title="Homonymie" alt="Homonymie" />';
  lrcIcon["Stub"] = '<img '
                   + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Construction_cone.png/12px-Construction_cone.png" '
                   + 'width="12px" title="Ébauche" alt="Ébauche" />';
  lrcIcon["FullLock"] = '<img '
                      + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/4/48/Padlock-red.svg/16px-Padlock-red.svg.png" '
                      + 'width="16px" title="Article protégé" alt="Article protégé"/>';
  lrcIcon["Lock"] = '<img '
                  + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Padlock-gold.svg/16px-Padlock-gold.svg.png" '
                  + 'width="16px" title="Article semi-protégé" alt="Article semi-protégé"/>';
  lrcIcon["Copyright"] = '<img '
                       + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/16px-Copyright.svg.png" '
                       + 'width="16px" title="Article soupçonné d\'enfreindre un copyright" alt="Copyright" />';
  lrcIcon["PaS"] = '<img '
                 + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cestino_pieno_architetto_01.svg/11px-Cestino_pieno_architetto_01.svg.png" '
                 + 'height="11px" title="En PàS" alt="PaS" />';
  lrcIcon["AdQ"] = '<sup><img '
                 + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fairytale_bookmark_gold.png/10px-Fairytale_bookmark_gold.png" '
                 + 'width="10px" title="Article de qualité" alt="Adq" /></sup>';
  lrcIcon["BA"] = '<sup><img '
                + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fairytale_bookmark_silver_light.png/10px-Fairytale_bookmark_silver_light.png" '
                + 'width="10px" title="Bon article" alt="Bon article" /></sup>';
  lrcIcon["APDQ"] = '<sup><img '
                  + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fairytale_bookmark_light.png/10px-Fairytale_bookmark_light.png" '
                  + 'width="10px" title="Article potentiellement de qualité" alt="Article potentiellement de qualité" />';
  lrcIcon["Move"] = '<img '
                  + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Forward.png/16px-Forward.png" '
                  + 'width="16px" title="Renommage" alt="Renommage" />';
  lrcIcon["Redirect"] = '<img '
                      + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Redirectltr.png/20px-Redirectltr.png" '
                      + 'width="20px" title="Redirection" alt="Redirect" />';
  lrcIcon["Upload"] = '<img '
                    + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Gartoon-Gnome-dev-floppy.png/16px-Gartoon-Gnome-dev-floppy.png" '
                    + 'width="16px" title="Upload" alt="Upload" />';
  lrcIcon["NewUser"] = '<img '
                     + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Crystal_personal.png/16px-Crystal_personal.png" '
                     + 'width="16px" title="Nouvel utilisateur" alt="Nouvel utilisateur" />';
  lrcIcon["Block"] = '<img '
                   + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/6/64/Crystal_Clear_action_lock3.png/16px-Crystal_Clear_action_lock3.png" '
                   + 'width="16px" title="Blocage" alt="Blocage" />';
  lrcIcon["Delete"] = '<img '
                    + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Editcut.png/16px-Editcut.png" '
                    + 'width="16px" title="Suppression" alt="Suppression" />';
  lrcIcon["Protect"] = '<img '
                     + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Crystal_Clear_app_agent.png/16px-Crystal_Clear_app_agent.png" '
                     + 'width="16px" title="Protection" alt="Protection" />';
  lrcIcon["Bot"] = '<img '
                 + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nuvola_apps_kservices.png/16px-Nuvola_apps_kservices.png" '
                 + 'width="16px" title="Bot" alt="Bot" />';
  lrcIcon["Sysop"] = '<img '
                   + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Broom_icon.svg/16px-Broom_icon.svg.png" '
                   + 'width="16px" title="Administrateur" alt="Administrateur" />';
  lrcIcon["Revert"] = '<img '
                    + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nuvola_actions_undo.png/16px-Nuvola_actions_undo.png" '
                    + 'width="16px" title="Revert" alt="Revert" />';
  lrcIcon["TOR"] = '<img '
                 + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dialog-warning.svg/16px-Dialog-warning.svg.png" '
                 + 'width="16px" title="TOR" alt="TOR" />';
  lrcIcon["Blocked"] = '<img '
                     + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Modern_clock_chris_kemps_01_with_Octagon-warning.svg/16px-Modern_clock_chris_kemps_01_with_Octagon-warning.svg.png"'
                     + ' title="Utilisateur récemment bloqué" width="16px" alt="Bloqué" />';
  lrcIcon["Replaced"] = '<img '
                      + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Categorie_III.svg/10px-Categorie_III.svg.png" '
                      + 'width="10px" title="Warning" alt="Warning"/>';
  lrcIcon["SharedIP"] = '<img '
                      + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b7/WLM_logo.svg/16px-WLM_logo.svg.png" '
                      + 'width="16px" title="Adresse IP partagée" alt="IP partagée"/>';
  lrcIcon["ScolarIP"] = '<img '
                      + 'src=//upload.wikimedia.org/wikipedia/commons/thumb/9/98/Crystal_kdmconfig.png/16px-Crystal_kdmconfig.png '
                      + 'width="16px" title="Adresse IP scolaire" alt="IP scolaire"/>';
  lrcIcon["CopyrightUser"] = '<img '
                           + 'src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/16px-Copyright.svg.png" '
                           + 'width="16px" title="Utilisateur enfreignant un copyright" alt="Utilisateur copieur"/>';

/* </source>

==== Gestion des paramètres ====

<source lang=javascript> */

  // Textes
  var lrcManageParamsText = {
    "ButtonText": '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Icon_tools.svg/20px-Icon_tools.svg.png" width="20" height="20" alt="Paramètres" />',
    "ButtonTitle": "Modifier les paramètres",
    "LegendTitle": 'Modifier les paramètres <sup><a href="//fr.wikipedia.org/wiki/Aigles et Lys:LiveRC/Documentation#Configuration" target="_blank" title="Aide">?</a></sup>',
    "VariableLegend": "Variables",
    "ExtensionLegend": "Extensions",
    "MessagesLegend" : "Messages système",
    "OK": "Valider",
    "Cancel": "Fermer",
    "RAZ": "Valeurs par défaut",
    "Continue": "Continuer ?",
    "Comment": "Personnalisation pour LiveRC",
    "EditRunning": "Édition de la page <b>$1</b> en cours<span style=\"text-decoration:blink;\">…</span>",
    "SaveRunning": "Sauvegarde de la page <b>$1</b> en cours<span style=\"text-decoration:blink;\">…</span>",
    "SaveDone": "Sauvegarde de la page <b>$1</b> effectuée.",
    "SaveRefresh": '<span class="error">La prise en compte des nouvelles valeurs nécessite la mise à jour du cache du navigateur.</span>'
  }
  var LiveRC_ParamComment = "//END PARAMS\n";
  var LiveRC_ExtensionSetupComment = "//EXTENSIONS SETUP : ";
  var LiveRC_Params = new Array();
    // Définitions
  var lrcManageParams_Desc = {
// Menu de paramétrage
 'DesclrcParams': new Array('Paramètres', 'Paramètres'),
 'DesclrcOptionMenuValues': new Array('Options par défaut du menu de commande', 'Options'),
 'DesclstBlank': new Array('Résumés de blanchiment', 'Blanchiment'),
 'DesclrcRevertMessages': new Array('Résumés de révocation', 'Révocation'),
 'DesclstAverto': new Array('Modèles d’avertissement', 'Avertissement'),
 'DesclstTag': new Array('Modèles de bandeaux', 'Bandeaux'),
 'DesclstAskForSysop' : new Array('Modèles de requête aux administrateurs', 'Requêtes sysop'),
 'DesclrcIcon': new Array('Icônes', 'Icônes'),
 'Desclang_menu': new Array('Textes du menu de commande', 'Textes 1'),
 'Desclang_tooltips': new Array('Textes des liens', 'Textes 2'),
 'Desclang_messages': new Array('Textes de divers messages', 'Textes 3'),
 'DesclrcManageParamsText': new Array('Textes du menu de gestion des options', 'Textes 4'),
 'DesclrcManageParams_Desc': new Array('Descriptions des variables', 'Textes 5'),
 'DescContactListLegend': new Array('Liste des contacts', 'Contacts'),
 'DescExtensionsLegend': new Array('Extensions installées', 'Extensions'),
// Paramètres
 'DescPreviewHeight': new Array('Hauteur de la fenêtre de prévisualisation', 'Fenêtre de prévisualisation'),
 'DescHistoryHeight': new Array('Hauteur de l’historique de prévisualisation', 'Fenêtre historique'),
 'DescGoogleHeight': new Array('Hauteur de la fenêtre google', 'Fenêtre Google'),
 'DescTchatHeight': new Array('Hauteur de la fenêtre de tchat', 'Fenêtre tchat'),
 'DescTZ': new Array('Fuseau horaire', 'Fuseau horaire'),
 'DescRCLimit': new Array('Limite de lignes RC', 'Limite de lignes RC'),
 'DescRefresh': new Array('Délai de rafraichissement des RC', 'Rafraichissement RC'),
 'DescReloadList': new Array('Délai de rafraichissement de la Liste de suivi', 'Rafraichissement Liste de suivi'),
 'ReloadList' : new Array('Rafraichissement liste de suivi, blocages et catégories', 'Rafraichissement liste de suivi, blocages et catégories'),
 'DescGoogleSearchLimit': new Array('Limite de résultats Google', 'Limite de résultats Google'),
 'DescArticleLengthLimit': new Array('Limite de longueur nom de page', 'Limite de longueur nom de page'),
 'DescUserLengthLimit': new Array('Limite de longueur nom d’utilisateur', 'Limite de longueur nom d’utilisateur'),
 'DescAutoCloseDiff': new Array('Supprimer une ligne après visualisation du diff', 'Supprimer ligne visualisée'),
 'DescWLAllChanges': new Array('Montrer les changements faits dans la liste de suivi', 'Liste de suivi'),
 'DescBoldComments': new Array('Commentaires de modif en gras', 'Commentaires de modif en gras'),
 'DescRvMinorEdit': new Array('Marquer les révocations comme mineures', 'Marquer les révocations comme mineures'),
 'DescLoadWatchlist': new Array('Charger la liste des articles et utilisateurs suivis (coûteux au démarrage)', 'Charger la liste des articles et utilisateurs suivis (coûteux au démarrage)'),
 'DescLoadIPCat': new Array('Charger les catégories d’utilisateurs et le journal des blocages (coûteux au démarrage)', 'Charger les catégories et le journal'),
 'DescLoadCatAndTemplates': new Array('Charger les catégories et modèles des articles (très coûteux)', 'Charger catégories et modèles'),
 'DescBypassWatchdefault': new Array('Ne pas ajouter automatiquement les pages modifiées à la liste de suivi', 'Ne pas ajouter automatiquement les pages modifiées à la liste de suivi'),
 'DescAddExtensionCustom': new Array('Permettre de personnaliser le menu des extensions', 'Personnalisation menu extensions'),
 'DescInvertUpdate': new Array('Inverser le sens d’apparition des RC', 'Inverser le sens d’apparition des RC'),
 'DescKeepAllLines': new Array('Conserver toutes les lignes RC', 'Conserver toutes les lignes RC'),
 'DescDisplayDebug': new Array('Afficher le panneau de débogage', 'Débogage'),
 'DescPreloadLines': new Array('Préchargement des diff', 'Préchargement des diff'),
 'DescSubstWarnings' : new Array('Substitution des modèles d’avertissement', 'subt modèles'),
// Options
 'DescStop': new Array('Case "Pause"', 'Case "Pause"'),
 'DescDiff': new Array('Case "Diff réduit"', 'Case "Diff réduit"'),
 'DescPreview': new Array('Case "Prévisualiser"', 'Case "Prévisualiser"'),
 'DescTchat': new Array('Case "Tchat"', 'Case "Tchat"'),
 'DescLists': new Array('Case "Listes"', 'Case "Listes"'),
 'DescRC': new Array('Case "RC"', 'Case "RC"'),
 'DescLog': new Array('Case "Journaux"', 'Case "Journaux"'),
 'DescFilter': new Array('Case "Filtres"', 'Case "Filtres"'),
 'DescRCType': new Array('Sélecteur "Utilisateurs"', 'Sélecteur "Utilisateurs"'),
 'DescRCns': new Array('Sélecteur "Espaces"', 'Sélecteur "Espaces"'),
// Icônes
 "DescNocat": new Array("Page sans catégorie", "Sans catégorie"),
 "DescNoportal": new Array("Sans bandeau de portail", "Sans portail"),
 "DescNbRevoc": new Array("Nombre de révocations", "Nombre de révocations"),
 "DescTag": new Array("Déclenchement de filtre", "Filtre"),
 "DescStub": new Array("Ébauche", "Ébauche"),
 "DescRecent": new Array("Événement récent", "Événement récent"),
 "DescHomon": new Array("Homonymie", "Homonymie"),
 "DescFullLock": new Array("Article protégé", "Article protégé"),
 "DescLock": new Array("Article semi-protégé", "Article semi-protégé"),
 "DescCopyright": new Array("Article soupçonné d\'enfreindre un copyright", "Copyright"),
 "DescPaS": new Array("En PàS", "PaS"),
 "DescAdQ": new Array("Article de qualité", "Adq"),
 "DescBA": new Array("Bon article", "Bon article"),
 "DescAPDQ": new Array("Article potentiellement de qualité", "Article potentiellement de qualité"),
 "DescMove": new Array("Renommage", "Renommage"),
 "DescRedirect": new Array("Redirection", "Redirect"),
 "DescUpload": new Array("Upload", "Upload"),
 "DescNewUser": new Array("Nouvel utilisateur", "Nouvel utilisateur"),
 "DescBlock": new Array("Blocage", "Blocage"),
 "DescDelete": new Array("Suppression", "Suppression"),
 "DescProtect": new Array("Protection", "Protection"),
 "DescBot": new Array("Bot", "Bot"),
 "DescSysop": new Array("Administrateur", "Administrateur"),
 "DescRevert": new Array("Revert", "Revert"),
 "DescTOR": new Array("TOR", "TOR"),
 "DescBlocked": new Array("Utilisateur récemment bloqué", "Bloqué"),
 "DescReplaced": new Array("Warning", "Warning"),
 "DescSharedIP": new Array("Adresse IP partagée", "IP partagée"),
 "DescScolarIP": new Array("Adresse IP scolaire", "IP scolaire"),
 "DescCopyrightUser": new Array("Utilisateur enfreignant un copyright", "Utilisateur copieur"),
// Extensions
 "DesclrcExtensions": new Array("Menu des extensions", "Extensions"),
// Textes 1
 "DescPAUSE": new Array("Pause", "Pause"),
 "DescPREVIEW": new Array("Prévisualiser", "Prévisualiser"),
 "DescLISTS": new Array("Listes", "Listes"),
 "DescLOWDIFF": new Array("Diff réduit", "Diff réduit"),
 "DescRCLABEL": new Array("RC", "RC"),
 "DescNOBOTS": new Array("Sans Bots", "Sans Bots"),
 "DescRESTMODE": new Array("Suivis", "Suivis"),
 "DescIPONLY": new Array("IP seules", "IP seules"),
 "DescIPNEW": new Array("IP+débutants", "IP+débutants"),
 "DescALLUSERS": new Array("Tous", "Tous"),
 "DescALLNBOTS": new Array("Tous+bots", "Tous+bots"),
 "DescNAMESP": new Array("Espace", "Espace"),
 "DescXTIMES": new Array("fois", "fois"),
 "DescUNDORC": new Array("Défaire", "Défaire"),
 "DescREVERT": new Array("Révoquer", "Révoquer"),
 "DescREASON": new Array("Motif", "Motif"),
 "DescUSERMSG": new Array("Avertir", "Avertir"),
 "DescEMPTY": new Array("Blanchir", "Blanchir"),
 "DescTAG": new Array("Bandeau", "Bandeau"),
 "DescLOGSHOW": new Array("Journaux", "Journaux"),
 "DescABSHOW": new Array("Filtres", "Filtres"),
 "DescNEXTDIFF": new Array("Suivant", "Suivant"),
 "DescTCHAT": new Array("Tchat", "Tchat"),
// Textes 2
 "DescHIDE_ALL":new Array("Tooltip du lien pour supprimer toutes les lignes", "Tooltip du lien pour supprimer toutes les lignes"),
 "DescHIDE_REVIEWED":new Array("Tooltip du lien pour supprimer les lignes des modifications visualisées", "Tooltip du lien pour supprimer les lignes des modifications visualisées"),
 "DescHIDE_REVERTS":new Array("Tooltip du lien pour supprimer les lignes d'annulation", "Tooltip du lien pour supprimer les lignes d'annulation"),
 "DescHIDE_NEW":new Array("Tooltip du lien pour supprimer les lignes de création de page", "Tooltip du lien pour supprimer les lignes de création de page"),
 "DescHIDE_BLANKING":new Array("Tooltip du lien pour supprimer les lignes de blanchiment", "Tooltip du lien pour supprimer les lignes de blanchiment"),
 "DescHIDE_THIS":new Array("Tooltip du lien pour supprimer cette ligne", "Tooltip du lien pour supprimer cette ligne"),
 "DescDIFF_TIP":new Array("Tooltip du lien vers le diff", "Tooltip du lien vers le diff"),
 "DescDIFF_SHORT":new Array("Texte du lien vers le diff", "Texte du lien vers le diff"),
 "DescHIST_TIP":new Array("Tooltip du lien vers l’historique", "Tooltip du lien vers l’historique"),
 "DescHIST_SHORT":new Array("Texte du lien vers l’historique", "Texte du lien vers l’historique"),
 "DescEDIT_TIP":new Array("Tooltip du lien pour éditer", "Tooltip du lien pour éditer"),
 "DescEDIT_SHORT":new Array("Texte du lien pour éditer", "Texte du lien pour éditer"),
 "DescMOVE_TIP":new Array("Tooltip du lien pour renommer", "Tooltip du lien pour renommer"),
 "DescMOVE_SHORT":new Array("Texte du lien pour renommer", "Texte du lien pour renommer"),
 "DescDEL_TIP":new Array("Tooltip du lien pour supprimer", "Tooltip du lien pour supprimer"),
 "DescDEL_SHORT":new Array("Texte du lien pour supprimer", "Texte du lien pour supprimer"),
 "DescPROTECT_TIP":new Array("Tooltip du lien pour protéger", "Tooltip du lien pour protéger"),
 "DescPROTECT_SHORT":new Array("Texte du lien pour protéger", "Texte du lien pour protéger"),
 "DescSUBJECT_TIP":new Array("Tooltip du lien vers l’article", "Tooltip du lien vers l’article"),
 "DescSUBJECT_SHORT":new Array("Texte du lien vers l’article", "Texte du lien vers l’article"),
 "DescTALK_TIP":new Array("Tooltip du lien vers la page de discussion", "Tooltip du lien vers la page de discussion"),
 "DescTALK_SHORT":new Array("Texte du lien vers la page de discussion", "Texte du lien vers la page de discussion"),
 "DescCONTRIB_TIP":new Array("Tooltip du lien vers les contributions", "Tooltip du lien vers les contributions"),
 "DescCONTRIB_SHORT":new Array("Texte du lien vers les contributions", "Texte du lien vers les contributions"),
 "DescBLOCK_TIP":new Array("Tooltip du lien pour bloquer", "Tooltip du lien pour bloquer"),
 "DescBLOCK_SHORT":new Array("Texte du lien pour bloquer", "Texte du lien pour bloquer"),
 "DescUSER_HIDE_TIP":new Array("Tooltip du lien pour ignorer un utilisateur", "Tooltip du lien pour ignorer un utilisateur"),
 "DescUSER_HIDE_SHORT":new Array("Texte du lien pour ignorer un utilisateur", "Texte du lien pour ignorer un utilisateur"),
 "DescNEWSECTION_TIP":new Array("Tooltip du lien pour éditer une nouvelle section", "Tooltip du lien pour éditer une nouvelle section"),
 "DescNEWSECTION_SHORT":new Array("Texte du lien pour éditer une nouvelle section", "Texte du lien pour éditer une nouvelle section"),
 "DescDELETEDCONTRIB_TIP":new Array("Tooltip du lien vers les contributions supprimées", "Tooltip du lien vers les contributions supprimées"),
 "DescDELETEDCONTRIB_SHORT":new Array("Texte du lien vers les contributions supprimées", "Texte du lien vers les contributions supprimées"),
 "DescREVISIONDELETE_TIP":new Array("Tooltip du lien pour masquer une révision", "Tooltip du lien pour masquer une révision"),
 "DescREVISIONDELETE_SHORT":new Array("Texte du lien pour masquer une révision", "Texte du lien pour masquer une révision"),
 "DescWHATLINKSHERE_TIP":new Array("Tooltip du lien vers les pages liées", "Pages liées tooltip"),
 "DescWHATLINKSHERE_SHORT":new Array("Texte du lien vers les pages liées", "Pages liées texte"),
 "DescASKSYSOP_TIP":new Array("Tooltip du lien pour les demandes sysop", "Demande sysop tooltip"),
 "DescASKSYSOP_SHORT":new Array("Texte du lien pour les demandes sysop", "Demande sysop texte"),
 "DescWORKING":new Array("Message \"Traitement en cours...\"", "Message \"Traitement en cours...\""),
 "DescLAST_SITUATION":new Array("Message \"Dernière situation\"", "Message \"Dernière situation\""),
 "DescGOOGLE_TIP":new Array("Tooltip du lien vers Google", "Tooltip du lien vers Google"),
 "DescGOOGLE_SHORT":new Array("Texte du lien vers Google", "Texte du lien vers Google"),
 "DescGOOGLE_CLOSE_TIP":new Array("Tooltip du lien pour fermer Google", "Tooltip du lien pour fermer Google"),
 "DescGOOGLE_CLOSE_SHORT":new Array("Texte du lien pour fermer Google", "Texte du lien pour fermer Google"),
// Textes 3
 "DescNEW_VERSION":new Array("Nouvelle version disponible", "Nouvelle version disponible"),
 "DescSAME_EDITOR":new Array("Message \"éditeur précédent identique\"", "Message \"éditeur précédent identique\""),
 "DescWARNING":new Array("Résumé de modif avertissement", "Résumé de modif avertissement"),
 "DescON_ARTICLE":new Array("Mot \"sur\"", "Mot \"sur\""),
 "DescSANDBOX":new Array("Message sur le bac à sable", "Message sur le bac à sable"),
 "DescNOEXIST":new Array("Texte de remplacement pour page inexistante", "Texte de remplacement pour page inexistante"),
 "DescFILTER":new Array("Message de déclenchement d'un filtre", "Message de déclenchement d'un filtre"),
 "DescWATCHLISTON":new Array("Message \"Ajout à la liste de suivi\"", "Message \"Ajout à la liste de suivi\""),
 "DescWATCHLISTOFF":new Array("Message \"Retrait de la liste de suivi\"", "Message \"Retrait de la liste de suivi\""),
 "DescREVISIONDELETEOK":new Array("Message après masquage réussi", "Message après masquage réussi"),
 "DescSPEEDDELETION":new Array("Résumé de modif blanchiment", "Résumé de modif blanchiment"),
 "DescBLOCKED":new Array("Mot \"bloqué\"", "Mot \"bloqué\""),
 "DescRESUMESTART":new Array("Début des résumés de modif", "Début des résumés de modif"),
 "DescBLOCKAVERTO":new Array("Résumé de modif avertissement blocage", "Résumé de modif avertissement blocage"),
 "DescBLOCKTEMPLATE":new Array("Modèle pour avertissement blocage", "Modèle pour avertissement blocage"),
 "DescUPDATEMESSAGES":new Array("Résumé de modif mise à jour des messages système", "Résumé de modif mise à jour des messages système"),
// Textes 4
 "DescButtonText":new Array("Bouton d'ouverture du menu", "Bouton d'ouverture du menu"),
 "DescButtonTitle":new Array("Tooltip du bouton d’ouverture du menu", "Tooltip du bouton d’ouverture du menu"),
 "DescLegendTitle":new Array("Légende du menu", "Légende du menu"),
 "DescVariableLegend":new Array("Commentaire \"Variables\" dans le js", "Commentaire \"Variables\" dans le js"),
 "DescExtensionLegend":new Array("Commentaire \"Extensions\" dans le js", "Commentaire \"Extensions\" dans le js"),
 "DescMessagesLegend":new Array("Commentaire \"Messages système\" dans le js", "Commentaire \"Messages système\" dans le js"),
 "DescOK":new Array("Bouton de validation", "Bouton de validation"),
 "DescCancel":new Array("Bouton d'annulation", "Bouton d'annulation"),
 "DescRAZ":new Array("Bouton de remise à zéro", "Bouton de remise à zéro"),
 "DescContinue":new Array("Pop-up de confirmation", "Pop-up de confirmation"),
 "DescComment":new Array("Résumé de modification", "Résumé de modification"),
 "DescEditRunning":new Array("Phrase \"Édition en cours\"", "Phrase \"Édition en cours\""),
 "DescSaveRunning":new Array("Phrase \"Sauvegarde en cours\"", "Phrase \"Sauvegarde en cours\""),
 "DescSaveDone":new Array("Phrase \"Sauvegarde effectuée\"", "Phrase \"Sauvegarde effectuée\""),
 "DescSaveRefresh":new Array("Phrase \"Rafraichir le cache\"", "Phrase \"Rafraichir le cache\"")
};

/* </source>

==== Autres variables personnalisables ====

<source lang=javascript> */


  var lrcRecentTemplates = new Array( "Événement à venir",
                                      "Événement en cours",
                                      "Évènement récent",
                                      "Futur aéroport",
                                      "Affaire judiciaire en cours",
                                      "Album à venir",
                                      "Avion à venir",
                                      "Bâtiment à venir",
                                      "Compétition sportive à venir",
                                      "Compétition sportive en cours",
                                      "Compétition sportive récente",
                                      "Course en direct",
                                      "Scrutin à venir",
                                      "Élection récente",
                                      "Évènements récents",
                                      "Film futur",
                                      "Jeu vidéo futur",
                                      "Match en direct",
                                      "Mort récente",
                                      "Pont en cours de construction",
                                      "Saison en cours de diffusion",
                                      "Show catch à venir",
                                      "Sport en cours",
                                      "Sport à venir",
                                      "Série télévisée en production",
                                      "Projet de transport",
                                      "Projet de transport en Île-de-France",
                                      "Projet ferroviaire",
                                      "Volcan en éruption"
                                    );

    // Preview title-bar template
  var PreviewBarTemplate = '<table width="100%" ><tr>'
                         + '<td align="left" style="vertical-align:middle">$1</td>'
                         + '<td align="right" style="vertical-align:middle">$2</td>'
                         + '</tr><tr>'
                         + '<td align="left" style="vertical-align:middle"><small>$3</small></td>'
                         + '<td align="right" style="vertical-align:middle">$4</td>'
                         + '</tr></table>';

    // Tchat
  var lrcTchatChannel = "#wikipedia-fr-liverc";

    // Extensions
  var lrcExtensions = [
    {
      "name":"UserWarningsExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/UserWarningsExtension.js",
      "desc":"Ajoute une icône aux utilisateurs ayant reçu un avertissement. En option, indique si la page de discussion de l'utilisateur existe ou non."
    },
    {
      "name":"MostModifiedPagesExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/MostModifiedPagesExtension.js",
      "desc":"Ajoute une icône aux pages ayant été modifiées par au moins <code>X</code> utilisateurs différents durant la dernière heure (<code>X</code> est personnalisable, 5 par défaut)."
    },
    {
      "name":"LinkOnIconExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/LinkOnIconExtension.js",
      "desc":"Lie les icônes PàS, AdQ, BA et copyvio aux pages de discussion associées."
    },
    {
      "name":"EditCharactersExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/EditCharactersExtension.js",
      "desc":"Améliore la fenêtre de modification avec les fonctions standards du Common.js (toolbar et caractères spéciaux)."
    },
    {
      "name":"RunCommonJS",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/RunCommonJS.js",
      "desc":"Améliore le prévisualisation avec des fonctions du Common.js (boîtes déroulantes, palettes, {{Images}}, etc...)"

    },
    {
      "name":"HotCatsMulti",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/HotCatsMulti.js",
      "desc":"Permet d'ajouter/modifier/retirer une ou plusieurs catégories lors de la prévisualisation d'un article"
    },
    {
      "name":"BandeauPortail",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/BandeauPortail.js",
      "desc":"Permet d'ajouter/modifier/retirer un ou plusieurs bandeau de portail lors de la prévisualisation d'un article"
    },
    {
      "name":"OnlyWatchlist",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/Watchlist.js",
      "desc":"Permet de ne surveiller que les pages de la liste de suivi"
    },
    {
      "name":"CategoryRC",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/CategoryRCExtension.js",
      "desc":"Permet de ne surveiller que les pages appartenant à une ou plusieur catégories"
    },
    {
      "name":"OnlyNeA&LagesExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/OnlyNeA&LagesExtension.js",
      "desc":"Permet de ne surveiller que les pages nouvellement créées"
    },
    {
      "name":"PreviewAllLinksExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/PreviewAllLinksExtension.js",
      "desc":"Permet de prévisualiser tout lien interne de la fenêtre de prévisualisation"
    },
    {
      "name":"PreviewThisPageExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/PreviewThisPageExtension.js",
      "desc":"Permet de prévisualiser une page au choix"
    },
    {
      "name":"DiffExtension",
      "url":"//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.js/Extensions/DiffExtension.js",
      "desc":"Permet d'avoir les fonctions automatiques de LiveRC dans les diff \"normaux\""
    }
  ];

    // Messages systèmes utilisés
  var lrcNeededMessages = new Array("abusefilter-log-name",
                                    "abusefilter-action-block",
                                    "abusefilter-action-blockautopromote",
                                    "abusefilter-action-degroup",
                                    "abusefilter-action-disallow",
                                    "abusefilter-action-rangeblock",
                                    "abusefilter-action-tag",
                                    "abusefilter-action-throttle",
                                    "abusefilter-action-warn",
                                    "blocklogpage",
                                    "centralauth-log-name",
                                    "centralauth-rightslog-name",
                                    "deletereason-dropdown",
                                    "dellogpage",
                                    "disambiguationspage",
                                    "globalblocking-logpage",
                                    "hide",
                                    "importlogpage",
                                    "ipbreason-dropdown",
                                    "log",
                                    "mergelog",
                                    "movelogpage",
                                    "mycontris",
                                    "newuserlogpage",
                                    "protect-dropdown",
                                    "protect-unchain-permissions",
                                    "protectlogpage",
                                    "red-link-title",
                                    "renameuserlogpage",
                                    "revertpage",
                                    "review-logpage",
                                    "rightslog",
                                    "uploadlogpage",
                                    "whatlinkshere-filters",
                                    "whatlinkshere-hideimages",
                                    "whatlinkshere-hidelinks",
                                    "whatlinkshere-hideredirs",
                                    "whatlinkshere-hidetrans"
                                   );


/* </source>

==== Variables non personnalisables ====

<source lang=javascript> */

  var lstSysop = new Array();                           // Liste des administrateurs;
  var lstContact = new Array();                         // Liste des contacts;
  var lstRevoc = new Array();                           // Liste des utilisateurs révoqués;
  var lstHidden = new Array();                          // Liste des utilisateurs masqués;
  var lstBlocks = new Array();                          // Liste des utilisateurs récemment bloqués
  var lstUserCat = new Array();                         // Liste des catégories d'utilisateurs
  var lstSuivi = new Array();                           // Liste de suivi
  var lrcMediawikiMessages = new Array();               // Liste des messages système Mediawiki
  var lrcHomonTemplates = new Array();                  // Liste des modèles d'homonymie
  var lrcUserRights = new Array();                      // Liste des droits de l'utilisateur
  var lrcAPIlimit = 499;                                // Limite de requête API
  var lrcAdmin = (wgUserGroups.indexOf("sysop") != -1); // Utilisateur administrateur;
  var lrcTimeout = new Array();                         // Liste des timeout
  var LiveRC_RequestError = 0;                          // Nombre de requêtes RC consécutives échoués
  var lrcClockTime = new Array();                       // Horloge de LiveRC ("H","M","S")

  var nextFreeID = 0, nextDiffNum = 0;

// Timestamps d'initialisation des RC, Log et Filtres
  var lastrcid=0,        lastlogid=0,        lastfilterid=0;
  var lastrctimestamp=1, lastletimestamp=1,  lastfiltertimestamp=1;

  // Préchargement de la prévisualisation
  var lrcLines = new Object(), lrcAllLinesSeen = true;

    //Historique des prévisualisations
  var lrcHistory = {"Type":new Array(), "Params":new Array(), "URL":new Array(), "Text":new Array() };
  var lrcHistoryIndex = -1;
  var lrcHistoryIsOld = false;

    // Hooks;
  var lrcHooks = {
                  "AfterOptions" : new Array(),
                  "AfterPreviewDiff" : new Array(),
                  "AfterPreviewArticle" : new Array(),
                  "AfterPreviewHistory" : new Array(),
                  "AfterPreviewContribs" : new Array(),
                  "AfterPreviewDeletedContribs" : new Array(),
                  "AfterPreviewLog" : new Array(),
                  "AfterPreviewFilter" : new Array(),
                  "AfterPreviewEdit" : new Array(),
                  "AfterPreviewMove" : new Array(),
                  "AfterPrevieA&Lrotect" : new Array(),
                  "AfterPreviewDelete" : new Array(),
                  "AfterPreviewBlock" : new Array(),
                  "AfterPreviewRevisiondelete" : new Array(),
                  "AfterPreviewWhatlinkshere" : new Array(),
                  "AfterFillParamPanel" : new Array(),
                  "AfterCreateParamPanel" : new Array(),
                  "BeforeRC" : new Array(),
                  "AfterRC" : new Array()
                 };

    // Styles globaux
  importStylesheetURI('//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-LiveRC.css&action=raw&ctype=text/css');

    // JavaScript globaux
  if (wgPageName == LiveRC_PageTitle && (wgAction=="view"||wgAction=="purge")) {
    importScriptURI('//pl.wikipedia.org/skins-1.5/common/diff.js?90&action=raw&ctype=text/javascript');
    importScriptURI('//bits.wikimedia.org/skins-1.5/common/edit.js?283-19&action=raw&ctype=text/javascript');
  }

    // Messages système sauvegardés
  importScript(LiveRC_MessagesPage);

    // Styles et Javascript utilisateur
  importScript('User:'+wgUserName+'/LiveRCparam.js');
  importStylesheet('User:'+wgUserName+'/LiveRCparam.css');



    // Variables obsolètes, conservées pour compatibilité avec anciennes personnalisations
  var lang_log = new Array();
  var lrcManageParamsDesc = new Array()
  var lrcManageParamsDesc = new Array()
  var lrcHotCatsVariables = new Array()
  var lrcHotCatsText = new Array()

/* </source>

=== Fonctions utilitaires ===

==== Ajax ====

<source lang="javascript"> */
var A&Lajax = {
  initReq: function() {
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch(e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          xmlhttp = false
        }
      }
    }
    return xmlhttp;
  },
  /* preloadReq.state
     0 : no request
     1 : pending request
     2 : pending request, the result will be used with preloadReq.bundle
         (preloadReq is locked until the request is complete)
     3 : completed request
  */
  preloadReq: {url: null, xmlhttp: null, bundle: null, state: 0},
  preload: function(url) {
    if (!lrcParams["PreloadLines"]) return;
    var plr = A&Lajax.preloadReq;
    if (plr.state == 2) return 0;
    var xmlhttp = A&Lajax.initReq();
    if (!xmlhttp) return 0;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState != 4
          || !((plr.state == 1 || plr.state == 2) && plr.url == url)) return;
      var oldState = plr.state;
      plr.xmlhttp = xmlhttp;
      plr.state = 3;
      if (oldState == 2)
        A&Lajax.httpComplete(xmlhttp, plr.bundle);
    };
    plr.state = 1;
    plr.url = url;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
    return 1;
  },
  // mandatory: bundle.url
  // optional:  bundle.async
  // optional:  bundle.method
  // optional:  bundle.headers
  // optional:  bundle.data
  // optional:  bundle.onSuccess (xmlhttprequest, bundle)
  // optional:  bundle.onFailure (xmlhttprequest, bundle)
  // optional:  bundle.otherStuff OK too, passed to onSuccess and onFailure
  http: function(bundle) {
    var plr = A&Lajax.preloadReq;
    if (!(bundle.method || bundle.headers || bundle.async == false || bundle.data)
        && (plr.state == 1 || plr.state == 3) && plr.url == bundle.url) {
      if (plr.state == 1) {
        plr.state = 2;
        plr.bundle = bundle;
      } else {
        A&Lajax.httpComplete(plr.xmlhttp, bundle);
      }
      return 2;
    }
    var xmlhttp = A&Lajax.initReq();
    if (!xmlhttp) return 0;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4)
        A&Lajax.httpComplete(xmlhttp, bundle);
    };
    xmlhttp.open(bundle.method ? bundle.method : "GET", bundle.url, bundle.async == false ? false : true);
    if (bundle.headers) {
      for (var field in bundle.headers)
        try {
          xmlhttp.setRequestHeader(field, bundle.headers[field]);
        } catch(err) {
          //Argos42 : pour rendre LiveRC fonctionnel sur chrome
        }
    }
    xmlhttp.send(bundle.data ? bundle.data : null);
    return 1;
  },
  httpComplete: function(xmlhttp, bundle) {
    if (xmlhttp.status == 200 || xmlhttp.status == 302) {
      if (bundle.onSuccess)
        bundle.onSuccess(xmlhttp, bundle);
    } else if (bundle.onFailure) {
      bundle.onFailure(xmlhttp, bundle);
    }
  }
};

/* </source>

==== Hook functions ====

<source lang="javascript"> */

// Ajout d'une fonction à un hook

function LiveRC_AddHook(Type, func){
      if(typeof(func)==="function" && lrcHooks[Type]) lrcHooks[Type].push(func);
}

// Exécution des fonctions

function LiveRC_RunHooks(Type, Params){
  var HookResult = true;
  if(typeof(lrcHooks[Type])!='undefined'){
    for(var a=0,l=lrcHooks[Type].length;a<l;a++){
      var ThisHookResult = lrcHooks[Type][a](Params);
      if(ThisHookResult===false) HookResult = false;
    }
  }
  return HookResult;
}

/* </source>

==== Fonctions d'état ====

<source lang="javascript"> */


function lrcHasState(state, thisState){
    if(!state) return false;
    return (state.indexOf(thisState)!=-1);
}

function lrcAddState(state, thisState){
    if(!state) state = new Array();
    if(!lrcHasState(state, thisState)) state[(state.length)] = thisState;
    return state;
}

/* </source>

==== Fonctions de suivi ====

<source lang="javascript"> */

// Ajout du bouton de suivi d'utilisateur

function LiveWatchInitButton(Req, data) {
    var Li = document.getElementById('n-liveRC');
    if(!Li) return;
    lstContact = new Array();
    var api = Req.responseXML.getElementsByTagName('api')[0];
    if (api.firstChild.nodeName == "error") return;
    var watched = false;
    if (api.getElementsByTagName('page')[0].getAttributeNode('watched')) watched = true;

    lstContact[wgTitle] = watched;
    var Links = '<span class="watchedLink" ' + (watched ? '' : 'style="display:none;"') + '> - <a '
              + ' href="javascript:;" '
              + ' onclick="addWatch('+lrcEscapeStrHTML(wgTitle)+', false); lrcToggleWatchLink(this); return false;"'
              + ' title="Ne plus suivre ce contributeur dans LiveRC">UW</a></span>'
              + '<span class="watchedLink" ' + (watched ? 'style="display:none;"' : '' ) + '> - <a '
              + ' href="javascript:;" '
              + ' onclick="addWatch('+lrcEscapeStrHTML(wgTitle)+', true); lrcToggleWatchLink(this); return false;"'
              + ' title="Suivre ce contributeur dans LiveRC">W</a></span>';
    Li.innerHTML += Links;
}

// Basculement du bouton de suivi d'utilisateur

function lrcToggleWatchLink(WatchLink){
     var Li = WatchLink.parentNode.parentNode;
     var Spans = getElementsByClass("watchedLink", Li, "span");
     for(var a=0,l=Spans.length;a<l;a++){
          if(Spans[a].style.display == "none"){
               Spans[a].style.display = "";
          }else{
               Spans[a].style.display = "none";
          }
     }
}

// Ajout/Retrait d'un utilisateur du suivi

function watchAPICall(title, watch) {
  var url = wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=watch&titles='+encodeURIComponent(title);
  A&Lajax.http({url: url, onSuccess: watchAPICallStep2, title: title, watch: watch});
}

function watchAPICallStep2(xmlreq, data) {
  var pageNode = xmlreq.responseXML.getElementsByTagName("page")[0];
  var url = wgServer + wgScriptPath + '/api.php?format=xml&action=watch';
  var data = "title=" + encodeURIComponent(data.title)
          + "&token=" + encodeURIComponent(pageNode.getAttribute("watchtoken"))
          + (data.watch ? "" : "&unwatch=1");
  var headers = {"Content-Type": "application/x-www-form-urlencoded"};
  A&Lajax.http({url: url, method: "POST", headers: headers, data: data});
}

function addWatch(uname, add, td2id) {
  var WLitem = lstContact[uname];
  var page = 'LiveRCWatch:' + uname;
  if (!WLitem && add) {
    lstContact[uname] = {ts: 0, fromjs: false};
    watchAPICall(page, true);
  } else if (WLitem && !add) {
    watchAPICall(page, false);
    delete lstContact[uname];
  }
  if (td2id == null) return;
  var td2 = document.getElementById(td2id);
  if (td2 == null || td2.parentNode == null || td2.parentNode.tagName != 'TR') return;
  if (add) {
    addClass(td2.parentNode, "RcContact");
  } else {
    removeClass(td2.parentNode, "RcContact");
  }
}

// Ajout du bouton de suivi de page

function LiveWatchArticle(Link, LinkType, page){
  var LinkText, LinkTitle, Action = "watch";
  if(Link.innerHTML == lang_tooltips.WATCH_TIP || Link.innerHTML == lang_tooltips.WATCH_SHORT) {
    Action = "unwatch";
    if(!lstSuivi[page]) lstSuivi[page] = "--:--";
    LinkText = (LinkType ? lang_tooltips.UNWATCH_TIP : lang_tooltips.UNWATCH_SHORT);
    LinkTitle = lang_tooltips.UNWATCH_TIP +" « "+page+" »";
    watchAPICall(page, true);
  } else {
    watchAPICall(page, false);
    LinkText = (LinkType ? lang_tooltips.WATCH_TIP : lang_tooltips.WATCH_SHORT);
    LinkTitle = lang_tooltips.WATCH_TIP +" « "+page+" »";
    if(lstSuivi[page]) delete lstSuivi[page];
  }
  Link.title = LinkTitle;
  Link.innerHTML = LinkText;
  Link.href = Link.href.replace(/&action=.*/, "&action="+Action);
}

/* </source>

==== Horloge ====

<source lang="javascript"> */

function lrcSetClocks(){
  var ClockSpanTitle = document.getElementById('ClockSpanTitle');
  if(ClockSpanTitle){
    ClockSpanTitle.className="RunningClock";
    var Link = ClockSpanTitle.parentNode;
    if(Link){
      Link.href= "javascript:lrcToggleClockState('ClockSpanTitle');";
      Link.title= lang_messages.CLOCKTITLE;
      lrcClockTimer("ClockSpanTitle");
    }
  }
}

function lrcClockTimer(ID){
  var ClockSpan = document.getElementById(ID);
  if(!ClockSpan) return;
    var Now = new Date();
    var Heures = Now.getHours();
    var Minutes = Now.getMinutes();
    var Secondes = Now.getSeconds();
    lrcClockTime["H"] = Heures;
    lrcClockTime["M"] = Minutes;
    lrcClockTime["S"] = Secondes;
  if(hasClass(ClockSpan, "RunningClock")){
    ClockSpan.innerHTML =  (Heures < 10 ? '0' : '') + Heures + ':' + (Minutes < 10 ? '0' : '') + Minutes + ':' + (Secondes<10 ? '0' : '') + Secondes;
  }
  if(lrcTimeout[("Clock_"+ID)]) clearTimeout(lrcTimeout[("Clock_"+ID)]);
  lrcTimeout[("Clock_"+ID)] = setTimeout("lrcClockTimer('"+ID+"')", 1000);
}

function lrcToggleClockState(ID){
  var ClockSpan = document.getElementById(ID);
  if(!ClockSpan) return;
  if(hasClass(ClockSpan, "RunningClock")){
    removeClass(ClockSpan, "RunningClock");
    addClass(ClockSpan, "FrozenClock");
  }else{
    removeClass(ClockSpan, "FrozenClock");
    addClass(ClockSpan, "RunningClock");
  }
}

/* </source>

==== Positionnement ====

<source lang="javascript"> */

// Extraction de l'interface LiveRC

function lrcFixPosition(){
    var LiveRCContainer = document.getElementById("LiveRCContainer");
    if(!LiveRCContainer) return;
    LiveRCContainer.parentNode.removeChild(LiveRCContainer);
    document.body.insertBefore(LiveRCContainer, document.body.firstChild);

    var Next = LiveRCContainer.nextSibling;
    var OtherContainer = document.createElement('div');
    OtherContainer.id = "OtherContainer";
    while(Next){
        Next.parentNode.removeChild(Next);
        OtherContainer.appendChild(Next)
        Next = LiveRCContainer.nextSibling
    }
    document.body.appendChild(OtherContainer);
    updatePreviewWindowAttributes();
    LiveRCContainer.style.display = "";
    lrcToggleLiveRC();
}

// Mise à jour de la hauteur de la table RC

function lrcInitTableHeight(){
  var TabDiv = document.getElementById('liveRC_RCList');
  if(!TabDiv) return;
  var HauteurEcran = LiveRC_GetScreenHeight();
  var TitleTable = document.getElementById("TitleTable");
  var RCOptions = document.getElementById("livePreviewFoot");
  var Table = document.getElementById('tabRC');
  var body = document.body;
  if(hasClass(body, "LiveRCConfigDisplayed")){
    var BottomFixedElement = document.getElementById("OutFixedBottomPanel");
  }else{
    var BottomFixedElement = document.getElementById("FixedBottomPanel");
  }
  if(TitleTable && RCOptions && BottomFixedElement){
    var NewHeight = parseInt( HauteurEcran - (BottomFixedElement.offsetHeight+TitleTable.offsetHeight+RCOptions.offsetHeight+10) );
    TabDiv.style.height = (NewHeight ? NewHeight : 1 ) + "px";
    if(Table){
      var TableInnerHeight = Table.offsetHeight;
      if(TableInnerHeight>NewHeight){
        if(LiveRC_NavIsIE()){
          TabDiv.style.overflowX = "hidden";
          TabDiv.style.paddingRight = "20px";
        }
        TabDiv.style.overflowY = "scroll";
      }else{
        if(LiveRC_NavIsIE()){
          TabDiv.style.overflowX = "";
          TabDiv.style.paddingRight = "0";
        }
        TabDiv.style.overflowY = "";
      }
    }
  }
  if(lrcTimeout["InitTableHeight"]) clearTimeout(lrcTimeout["InitTableHeight"]);
  lrcTimeout["InitTableHeight"] = setTimeout("lrcInitTableHeight()",200);
}

/* </source>

==== Zones de déplacement et redimensionnement ====

<source lang="javascript"> */

// Mise en place des zones

function LiveRC_setResizeZones(){
     LiveRC_SetVerticalResizeZone(document.getElementById("livePreviewTitle"),
                          new Array(document.getElementById("livePreview")),
                          document.getElementById("LiveRC_Preview")
                         );
     LiveRC_SetVerticalResizeZone(document.getElementById("FollowAnchor"),
                          new Array(document.getElementById("liveRevoc"),
                                    document.getElementById("liveContact"),
                                    document.getElementById("liveHidden"),
                                    document.getElementById("liveSuivi")
                          ),
                          document.getElementById("liveFollow")
                         );
     LiveRC_SetVerticalResizeZone(document.getElementById("LiveRCFooter_Anchor"),
                          new Array(document.getElementById("IconList")),
                          document.getElementById("LiveRCFooter")
                         );
}

// Détermination du type de navigateur

function LiveRC_NavIsIE(){
     var agt=navigator.userAgent.toLowerCase();
     var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
     return is_ie;
}

// Détermination de la hauteur de l'écran

function LiveRC_GetScreenHeight(){
     var ScreenHeight = 0;
     if( typeof( window.innerHeight ) == 'number' ) {
          ScreenHeight = parseInt(window.innerHeight);
     }else if( document.documentElement && document.documentElement.clientHeight ){
          ScreenHeight = parseInt(document.documentElement.clientHeight);
     }else if( document.body && document.body.clientHeight ){
          ScreenHeight = parseInt(document.body.clientHeight);
     }
     return ScreenHeight;
}

// Détermination de la largeur de l'écran

function LiveRC_GetScreenWidth(){
     var ScreenWidth = 0;
     if( typeof( window.innerWidth ) == 'number' ) {
          ScreenWidth = parseInt(window.innerWidth);
     }else if( document.documentElement && document.documentElement.clientWidth ){
          ScreenWidth = parseInt(document.documentElement.clientWidth);
     }else if( document.body && document.body.clientWidth ){
          ScreenWidth = parseInt(document.body.clientWidth);
     }
     return ScreenWidth;
}

// Détermination du positionnement de la souris

function LiveRC_GetMousePosition(event){
     if(LiveRC_NavIsIE()){
          var Mouse_X = parseInt( event.clientX + document.getElementsByTagName('body')[0].scrollLeft );
          var Mouse_Y = parseInt( event.clientY + document.getElementsByTagName('body')[0].scrollTop );
     }else{
          var Mouse_X = parseInt( event.clientX );
          var Mouse_Y = parseInt( event.clientY );
     }
     return {"X": Mouse_X, "Y": Mouse_Y};
}

// Mise en place d'une zone de déplacement

function LiveRC_SetMoveZone(anchorNode, elementsToMove){
     if((!anchorNode)||(!elementsToMove)) return;
     anchorNode.onmousedown=function(event) {
          if(!event) { event = window.event; }
          var PositionSouris = LiveRC_GetMousePosition(event);
          var PositionSouris_X = PositionSouris["X"];
          var PositionSouris_Y = PositionSouris["Y"];
          for(var a=0;a<elementsToMove.length;a++){
               elementsToMove[a].initialX = parseInt( PositionSouris_X - elementsToMove[a].offsetLeft);
               elementsToMove[a].initialY = parseInt( PositionSouris_Y - elementsToMove[a].offsetTop);
          }
          document.getElementsByTagName('body')[0].onmousemove = function(event) {
               if(!event) { event = window.event; }
               PositionSouris = LiveRC_GetMousePosition(event);
               PositionSouris_X = PositionSouris["X"];
               PositionSouris_Y = PositionSouris["Y"];
               for(var a=0;a<elementsToMove.length;a++){
                    var Element = elementsToMove[a];
                    if(!Element) continue;
                    var PositionGauche = parseInt( PositionSouris_X ) - Element.initialX;
                    var PositionHaut = parseInt(PositionSouris_Y ) - Element.initialY;
                    Element.style.left = PositionGauche + 'px';
                    Element.style.top = PositionHaut + 'px';
                    Element.style.right = '';
                    Element.style.bottom = '';
               }
          }
          document.getElementsByTagName('body')[0].onmouseup=function(event){
               document.getElementsByTagName('body')[0].onmousemove = null;
               document.getElementsByTagName('body')[0].onmouseup = null;
          }
     }
     anchorNode.style.cursor = "move";
}

// Mise en place d'une zone de redimensionnement vertical

function LiveRC_SetVerticalResizeZone(anchorNode, ToResizeNodes, containerNode){
     if((!anchorNode)||(!ToResizeNodes)) return;
     anchorNode.onmousedown = function(event){
          if(!event) { event = window.event; }
          var positionSouris_Y = LiveRC_GetMousePosition(event)["Y"];
          var MaxHeight = LiveRC_GetScreenHeight();
          for(var a=0;a<ToResizeNodes.length;a++){
               ToResizeNodes[a].initialHeight = parseInt( (MaxHeight-positionSouris_Y) - ToResizeNodes[a].offsetHeight );
          }
          document.getElementsByTagName('body')[0].onmousemove=function(event) {
               if(!event) { event = window.event; }
               var positionSouris_Y = LiveRC_GetMousePosition(event)["Y"];
               var MaxHeight = LiveRC_GetScreenHeight();
               var HeightLimit = false;
               for(var a=0;a<ToResizeNodes.length;a++){
                    var NewHeight = parseInt( (MaxHeight-positionSouris_Y) - ToResizeNodes[a].initialHeight );
                    if(NewHeight>MaxHeight) HeightLimit = true;
               }
               if(HeightLimit) return;
               for(var a=0;a<ToResizeNodes.length;a++){
                    var Element = ToResizeNodes[a];
                    if(!Element) continue;
                    var NewHeight = parseInt( (MaxHeight-positionSouris_Y) - Element.initialHeight );
                    NewHeight = (NewHeight>0 ? NewHeight : 1);
                    if(Element.tagName && (Element.tagName.toLowerCase()=="iframe" || Element.tagName.toLowerCase()=="img")){
                         Element.height = NewHeight;
                    }else{
                         Element.style.height = NewHeight + 'px';
                    }
               }
               lrcInitTableHeight();

          }
          document.getElementsByTagName('body')[0].onmouseup=function(event) {
               document.getElementsByTagName('body')[0].onmousemove = null;
               document.getElementsByTagName('body')[0].onmouseup = null;
          }
     }
     addClass(anchorNode, "LiveRC_MenuAnchor");
     addClass(containerNode, "LiveRC_MenuContainer");
     anchorNode.style.cursor = "n-resize";
}

// Mise en place d'une zone de redimensionnement total

function LiveRC_SetTotalResizeZone(anchorNode, elementsToResize, Container){
     if((!anchorNode)||(!elementsToResize)) return;
     anchorNode.onmousedown = function(event){
          if(!event) { event = window.event; }
          var PositionSouris = LiveRC_GetMousePosition(event);
          var PositionSouris_X = PositionSouris["X"];
          var PositionSouris_Y = PositionSouris["Y"];
          for(var a=0;a<elementsToResize.length;a++){
               elementsToResize[a].initialWidth = parseInt( PositionSouris_X - elementsToResize[a].offsetWidth );
               elementsToResize[a].initialHeight = parseInt( PositionSouris_Y - elementsToResize[a].offsetHeight );
          }
          document.getElementsByTagName('body')[0].onmousemove=function(event) {
               if(!event) { event = window.event; }
               if(Container){
                    Container.style.top = Container.offsetTop + 'px';
                    Container.style.left = Container.offsetLeft + 'px';
                    Container.style.right = '';
                    Container.style.bottom = '';
               }
               var PositionSouris = LiveRC_GetMousePosition(event);
               var PositionSouris_X = PositionSouris["X"];
               var PositionSouris_Y = PositionSouris["Y"];
               for(var a=0;a<elementsToResize.length;a++){
                    var Element = elementsToResize[a];
                    if(!Element) continue;
                    var NewWidth = parseInt( PositionSouris_X - Element.initialWidth  );
                    var NewHeight = parseInt( PositionSouris_Y - Element.initialHeight );
                    NewHeight = (NewHeight>0 ? NewHeight : 1);
                    NewWidth = (NewWidth>0 ? NewWidth : 1);
                    if(Element.tagName && (Element.tagName.toLowerCase()=="iframe" || Element.tagName.toLowerCase()=="img")){
                         Element.width  = NewWidth + 'px';
                         Element.height = NewHeight + 'px';
                    }else{
                         Element.style.width  = NewWidth + 'px';
                         Element.style.height = NewHeight + 'px';
                    }
               }
           }
          document.getElementsByTagName('body')[0].onmouseup=function(event) {
               document.getElementsByTagName('body')[0].onmousemove = null;
               document.getElementsByTagName('body')[0].onmouseup = null;
          }
     }
     anchorNode.style.cursor = "se-resize";
}

/* </source>

==== Boutons ====

<source lang="javascript"> */

// Mise en place des liens

function lrcMakeButtons(){
    lrcUpdateButton("LiveRCButtonOn", false, function(){ lrcToggleLiveRC(); return false; });
    lrcUpdateButton("LiveRCButtonOff", false, function(){ lrcToggleLiveRC(); return false; });
    lrcUpdateButton("LiveRCFollowButtonOn", false, function(){ lrcToggleLiveRCButton("LiveRCLiveFollowDisplayed"); return false; });
    lrcUpdateButton("LiveRCFollowButtonOff", false, function(){ lrcToggleLiveRCButton("LiveRCLiveFollowDisplayed"); return false; });
    lrcUpdateButton("LiveRCPreviewButtonOn", false, function(){ lrcToggleLiveRCButton("LiveRCPreviewDisplayed"); return false; });
    lrcUpdateButton("LiveRCPreviewButtonOff", false, function(){ lrcToggleLiveRCButton("LiveRCPreviewDisplayed"); return false; });
    lrcUpdateButton("LiveRCFooterButtonOff", false, function(){ lrcToggleLiveRCButton("LiveRCFooterDisplayed"); return false; });
    lrcUpdateButton("LiveRCFooterButtonOn", false, function(){ lrcToggleLiveRCButton("LiveRCFooterDisplayed"); return false; })

    lrcUpdateButton("LiveRCRCTableButtonOff", false, function(){ lrcToggleLiveRCButton("LiveRCRCTableDisplayed", true); return false; });
    lrcUpdateButton("LiveRCRCTableButtonOn", false, function(){ lrcToggleLiveRCButton("LiveRCRCTableDisplayed", true); return false; })

    lrcUpdateButton("LiveRCTchatButtonOn", false, function(){ buildTchatWindow(); return false; });
    lrcUpdateButton("LiveRCTchatButtonOff", false, function(){ buildTchatWindow(); return false; });

    lrcUpdateButton("LiveRCConfigButtonOff", false, function(){ LiveRC_ManageParams_OpenMenu(); return false; });
    lrcUpdateButton("LiveRCConfigButtonOn", false, function(){ LiveRC_ManageParams_OpenMenu(); return false; });

    lrcUpdateButton("LiveRCHistoryButtonOn", false, function(){ lrcGetAllHistory(); return false; });
    lrcUpdateButton("LiveRCHistoryButtonOff", false, function(){ lrcGetAllHistory(); return false; });

    var Buttons = document.getElementById("LiveRCButtons");
    if(Buttons) Buttons.style.display = "";
    lrcToggleLiveRCButton("LiveRCRCTableDisplayed");
}

// Mise en place d'un lien

function lrcUpdateButton(ID, HREF, ONCLICK){
    var Button = document.getElementById(ID);
    if(!Button) return;
    var Link = Button.getElementsByTagName('a')[0];
    if(!Link) return;
    Link.href = (HREF ? HREF : "javascript:;");
    if(ONCLICK) Link.onclick = ONCLICK;
}

//////// Basculements de fenêtres //////

// Mode LiveRC/Normal

function lrcToggleLiveRC(){
  var IDs = new Array("liveRC_ON", "livePreviewFoot", "livePreviewFoot", "liveRC_RCList", "FixedBottomPanel");
  if(hasClass(document.body, "FixedLiveRCContainer")){
    removeClass(document.body, "FixedLiveRCContainer");
    for(var a=0,l=IDs.length;a<l;a++){
        var ThisNode = document.getElementById(IDs[a]);
        if(ThisNode) ThisNode.style.display = "none";
    }
  }else{
    addClass(document.body, "FixedLiveRCContainer");
    for(var a=0,l=IDs.length;a<l;a++){
        var ThisNode = document.getElementById(IDs[a]);
        if(ThisNode) ThisNode.style.display = "";
    }
    lrcInitTableHeight();
  }
}

// Ouverture fenêtre du bas ( prévisualisation / Listes / Footer / Historique )

function lrcToggleLiveRCButton(ClassName, nocloseall){
  if(hasClass(document.body, ClassName)){
    removeClass(document.body, ClassName);
  }else{
    if(!nocloseall) lrcCloseAll();
    addClass(document.body, ClassName);
  }
  lrcInitTableHeight();
}

// Fermeture de toutes les fenêtres (sauf Tchat)

function lrcCloseAll(){
  var ClassN = new Array("LiveRCLiveFollowDisplayed", "LiveRCFooterDisplayed", "LiveRCPreviewDisplayed", "LiveRCHistoryDisplayed");
  for(var a=0,l=ClassN.length;a<l;a++){
    removeClass(document.body, ClassN[a]);
  }
  lrcCloseHistory();
  LiveRC_ManageParams_CloseMenu();
  lrcInitTableHeight();
}

/* </source>

==== Fenêtre de recherche Google ====

<source lang="javascript"> */

// Ouverture

function liveGoogleSearch(PageName){
  var OldGoogle = document.getElementById("lrcGoogleDiv");
  if(OldGoogle) return;
  var PreviewWindow = document.getElementById("livePreviewTitle");
  if(!PreviewWindow) return;
  var DivGoogle = document.createElement('div');
  DivGoogle.id = "lrcGoogleDiv";
  DivGoogle.setAttribute("style", "width:99.4%;");
  PreviewWindow.parentNode.insertBefore(DivGoogle, PreviewWindow);
  var Titlebar = document.createElement('div');
  addClass(Titlebar, "LiveRC_MenuAnchor");
  Titlebar.innerHTML = '<b>' + lang_tooltips.GOOGLE_TIP + ' : « ' + PageName + ' »'
                     + '&nbsp;&nbsp;'
                     + '<small>'
                     + '<a href="javascript:;" title="'+lang_tooltips.GOOGLE_CLOSE_TIP+'" '
                     + 'onClick="closeGoogleSearch()">['
                     + lang_tooltips.GOOGLE_CLOSE_SHORT+']</a>'
                     + '</small></b>';
  DivGoogle.appendChild(Titlebar);
  var DivGoogleContent = document.createElement('div');
  addClass(DivGoogleContent, "LiveRC_MenuContent");
  var Iframe = document.createElement('iframe');
  Iframe.src = 'http://www.google.'+wgContentLanguage+'/search?q=%22'+PageName.replace(/ /g, "+")+'%22&num='+lrcParams["GoogleSearchLimit"];
  Iframe.width = "99.8%";
  Iframe.height = lrcParams["GoogleHeight"];
  Iframe.setAttribute("style", "margin-left:3px");
  DivGoogleContent.appendChild(Iframe);
  DivGoogle.appendChild(DivGoogleContent);
  LiveRC_SetVerticalResizeZone(Titlebar, new Array(DivGoogle, Iframe), DivGoogle);
}

// Fermeture

function closeGoogleSearch(){
  var GoogleDiv = document.getElementById("lrcGoogleDiv");
  if(GoogleDiv) GoogleDiv.parentNode.removeChild(GoogleDiv);
  lrcInitTableHeight();
}

/* </source>

==== Fenêtre de tchat ====

<source lang="javascript"> */

// Création

function  buildTchatWindow(){
  var OldTchat = document.getElementById("liveTchat");
  if(OldTchat){
    toggleTchatWindow();
    return;
  }
  var TargetDiv = document.getElementById("LiveRCContainer");
  if(!TargetDiv) return;
  var DivTchat = document.createElement('div');
  DivTchat.id = "liveTchat";
  TargetDiv.appendChild(DivTchat);
  var TchatMoveAnchor = document.createElement('div');
  TchatMoveAnchor.id = "liveTchatMoveAnchor";
  addClass(TchatMoveAnchor, "LiveRC_MenuAnchor");
  TchatMoveAnchor.innerHTML = lang_menu.TCHAT;
  var TchatContent = document.createElement('div');
  TchatContent.id = "liveTchatContent";
  addClass(TchatContent, "LiveRC_MenuContent");
  var Iframe = document.createElement('iframe');
  Iframe.id = "liveTchatFrame";
  Iframe.src = "//webchat.freenode.net/?channels="+lrcTchatChannel+"&nick="+encodeURIComponent(wgUserName.replace(/ /, "_"));
  Iframe.width = "99.8%";
  Iframe.height = lrcParams["TchatHeight"];
  Iframe.setAttribute("style", "margin-left:3px");
  TchatContent.appendChild(Iframe);
  var TchatResizeAnchor = document.createElement('div');
  TchatResizeAnchor.id = "liveTchatResizeAnchor";
  addClass(TchatResizeAnchor, "LiveRC_MenuAnchor");
  DivTchat.appendChild(TchatMoveAnchor);
  DivTchat.appendChild(TchatContent);
  DivTchat.appendChild(TchatResizeAnchor);
  lrcCloseAll();
  addClass(document.body, "LiveRCTchatDisplayed");
  LiveRC_SetMoveZone(TchatMoveAnchor, new Array(DivTchat));
  LiveRC_SetTotalResizeZone(TchatResizeAnchor, new Array(DivTchat, Iframe), DivTchat);
  var HauteurEcran = LiveRC_GetScreenHeight();
  DivTchat.style.bottom = "0px";
}

// Affichage / Masquage

function toggleTchatWindow(){
    if(hasClass(document.body, "LiveRCTchatDisplayed")){
      removeClass(document.body, "LiveRCTchatDisplayed");
    }else{
      addClass(document.body, "LiveRCTchatDisplayed");
    }
}

/* </source>

==== Fenêtre de l'historique de prévisualisation ====

<source lang="javascript"> */

// Création de l'historique de prévisualisation

function lrcGetAllHistory(){
  var HistoryDiv = document.getElementById("LiveRC_History");
  if(HistoryDiv){
    lrcCloseHistory();
    return;
  }
  var TargetDiv = document.getElementById("FixedBottomPanel");
  if(!TargetDiv) return;
  lrcCloseAll();
  addClass(document.body, "LiveRCHistoryDisplayed");
  var HistoryArray = new Array();
  for(var a=0,l=lrcHistory["Type"].length;a<l;a++){
    var Type = lrcHistory["Type"][a];
    var Params = lrcHistory["Params"][a];
    var URL = lrcHistory["URL"][a];
    var Text = lrcHistory["Text"][a];
    var Onclick = "lrcGetHistory("+a+"); lrcCloseHistory(); return false;";
    var Link = '<li>'+Type+'&nbsp;:&nbsp;<a href="'+URL+'" onClick="'+Onclick+'">'+Text+'</a></li>';
    if(HistoryArray.indexOf(Link)==-1) HistoryArray.push(Link);
  }
  var DivContainer = document.createElement('div');
  DivContainer.id = "LiveRC_History";
  var DivAnchor = document.createElement('div');
  DivAnchor.id = "LiveRC_HistoryAnchor";
  DivAnchor.innerHTML = "Historique des prévisualisations";
  var DivContent = document.createElement('div');
  DivContent.id = "LiveRC_HistoryContent";
  DivContent.setAttribute("style", "height:"+lrcParams["HistoryHeight"]+";overflow-y:auto;");
  var Ol = document.createElement('ol');
  Ol.setAttribute("style", "-moz-column-count:3;-webkit-column-count:3;column-count:3");
  Ol.innerHTML = HistoryArray.join("");
  DivContent.appendChild(Ol);
  DivContainer.appendChild(DivAnchor);
  DivContainer.appendChild(DivContent);
  TargetDiv.appendChild(DivContainer);
  addClass(DivContent, "LiveRC_MenuContent");
  LiveRC_SetVerticalResizeZone(document.getElementById("LiveRC_HistoryAnchor"),
                       new Array(document.getElementById("LiveRC_HistoryContent")),
                       document.getElementById("LiveRC_History")
                      );
  lrcInitTableHeight();
}

// Fermeture de l'historique de prévisualisation

function lrcCloseHistory(){
  var HistoryDiv = document.getElementById("LiveRC_History");
  if(HistoryDiv) HistoryDiv.parentNode.removeChild(HistoryDiv);
  removeClass(document.body, "LiveRCHistoryDisplayed");
  lrcInitTableHeight();
}

// Ajout d'une entrée à l'historique de prévisualisation

function lrcAddToHistory(Type, Params, URL, Text){
  lrcCloseHistory();
  lrcHistory["Type"].push(Type);
  lrcHistory["Params"].push(Params);
  lrcHistory["URL"].push(URL);
  lrcHistory["Text"].push(Text);
}

// Rechargement d'une entrée de l'historique de prévisualisation

function lrcGetHistory(index){
  lrcHistoryIsOld = true;
  var Type = lrcHistory["Type"][index];
  var Params = lrcHistory["Params"][index];
  var FuntionToEval = Type + "(" + Params.join(", ") + ");";
  //alert(FuntionToEval);
  eval(FuntionToEval);
  lrcHistory["Type"].pop();
  lrcHistory["Params"].pop();
  lrcHistory["URL"].pop();
  lrcHistory["Text"].pop();
  lrcHistoryIndex = index;
}

// Mise à jour des boutons de l'historique de prévisualisation

function buildHistoryPanel(){
  if(!lrcHistoryIsOld) lrcHistoryIndex = (lrcHistory["Type"].length-1);
  var PreviousDisabled = ((lrcHistoryIndex>0) ? '' : ' disabled="disabled" ' );
  var NextDisabled = ((lrcHistoryIndex<(lrcHistory["Type"].length-1)) ? '' : ' disabled="disabled" ' );
  var PreviousLink = '<input style="padding:0" type="button" ' + PreviousDisabled
                   + 'onclick="lrcGetHistory('+(lrcHistoryIndex-1)+');" onselect="lrcGetHistory(-1);" '
                   + 'value="'+lang_tooltips.DIFFPREV_SHORT+'" title="'+lang_tooltips.DIFFPREV_TIP+'" />';
  var ShowHistoryLink = '<input style="padding:0" type="button" '
                      + 'onclick="lrcGetAllHistory();" onselect="lrcGetAllHistory();" '
                      +'value="'+lang_tooltips.DIFFHIST_SHORT+'" title="'+lang_tooltips.DIFFHIST_TIP+'" />';
  var NextLink = '<input style="padding:0" type="button" '+ NextDisabled
               + ' onclick="lrcGetHistory('+(lrcHistoryIndex+1)+');" onselect="lrcGetHistory(1);" '
               +'value="'+lang_tooltips.DIFFNEXT_SHORT+'" title="'+lang_tooltips.DIFFNEXT_TIP+'" />';
  lrcHistoryIsOld = false;
  var historyPanel = document.getElementById("historyPanel");
  if(historyPanel) historyPanel.innerHTML = PreviousLink + ShowHistoryLink + NextLink ;
}

/* </source>

==== Fenêtre de prévisualisation ====

<source lang="javascript"> */

// Mise à jour de la hauteur et du déroulé de la fenêtre de prévisualisation

function updatePreviewWindowAttributes(){
  var LP = document.getElementById( 'livePreview' );
  if(LP) LP.scrollTop = 0;
  lrcInitTableHeight();
}

// Création barre de commandes standard

function buildBlanckPreviewBar(Text, History, TextHD, TextBG, TextBD){
    var Template = PreviewBarTemplate;
    Template = Template.split('$1').join(Text);
    Template = Template.split('$2').join((TextHD ? TextHD : "&nbsp;"));
    Template = Template.split('$3').join((TextBG ? TextBG : "&nbsp;"));
    Template = Template.split('$4').join((TextBD ? TextBD : "&nbsp;"));
    var TabContainer = document.getElementById("livePreviewTitle");
    if(TabContainer) TabContainer.innerHTML = Template;
}

// Création barre de commandes avec liens

function buildPreviewBar(Args){
    var Mode = Args["Mode"];
    var URL  = Args["Url"];
    var Page = Args["Page"];
    var User1 = Args["User1"];
    var User2 = Args["User2"];
    var oldid = Args["Oldid"];
    var Previous = Args["Previous"];
    var Next = Args["Next"];

// $1 : case haut-gauche
    var TabsHautGauche = '<b><a href="'+URL+'" target="_new">'+Page+'</a></b>'
    if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Delete"||Mode=="Protect"||Mode=="Edit"||Mode=="Revisiondelete"){
        TabsHautGauche += '&nbsp;&nbsp;•&nbsp;&nbsp;'
                        + '<small><a href="'+lrcGetUglyPageURL('Special:Whatlinkshere/'+Page) + '" '
                        + 'onClick="liveWhatlinkshere('+lrcEscapeStr(Page)+'); return false;" '
                        + 'title="'+lang_tooltips.WHATLINKSHERE_TIP+' « '+Page+' »" '
                        + '>'+lang_tooltips.WHATLINKSHERE_SHORT+'</a></small>';
        TabsHautGauche += '&nbsp;&nbsp;•&nbsp;&nbsp;'
                        + '<small><a href="http://www.google.'+wgContentLanguage+'/search?q=%22'+Page.replace(/ /g, "+")+'%22" '
                        + 'onClick="liveGoogleSearch('+lrcEscapeStr(Page)+'); return false;" '
                        + 'title="'+lang_tooltips.GOOGLE_TIP+'">['+lang_tooltips.GOOGLE_SHORT+']</a></small>';
    }


   if(Mode=="Revisiondelete" && Args["RevisiondeleteOK"]){
      TabsHautGauche += ' <small>'+lang_messages.REVISIONDELETEOK+'</small>';
   }

// $2 : case haut-droite
    var TabsHautDroite = "";
    if(Mode=="Diff" && lrcUserHasRight("deleterevision")){
        TabsHautDroite = buildRevisiondeleteBar(Page);
    }
    if(Mode=="Diff" && Previous){
        TabsHautDroite += '<small><a id="previousDiffLink" href="'+Previous["url"]+'" '
                        + 'onClick="liveDiff('+lrcEscapeStr(Page)+',\'prev\',\''+Previous["oldid"]+'\'); return false;" '
                        + 'title="'+Previous["title"]+'">'+Previous["text"]+'</a></small>';
    }
    if(Mode=="Diff" && Next){
        if(Previous) TabsHautDroite += '<small> | </small>';
        TabsHautDroite += '<small><a id="nextDiffLink" href="'+Next["url"]+'" '
                        + 'onClick="liveDiff('+lrcEscapeStr(Page)+',\'next\',\''+Next["oldid"]+'\'); return false;" '
                        + 'title="'+Next["title"]+'">'+Next["text"]+'</a></small>';
    }

// $3 : case bas-gauche
    var TabsBasGauche = buildPreviewNormalTabs(Args);

// $4 : case bas-droite
    var TabsBasDroite = buildPreviewSpecialTabs(Args);

// Affichage
    var Template = PreviewBarTemplate;
    Template = Template.split('$1').join(TabsHautGauche);
    Template = Template.split('$2').join(TabsHautDroite);
    Template = Template.split('$3').join(TabsBasGauche);
    Template = Template.split('$4').join(TabsBasDroite);
    var TabContainer = document.getElementById("livePreviewTitle");
    if(TabContainer) TabContainer.innerHTML = Template;
    buildHistoryPanel();
    LiveRC_RevertMessagesExtension_Init();
}

// Liens en bas à gauche

function buildPreviewNormalTabs(Args){
    var Mode = Args["Mode"];
    var URL  = Args["Url"];
    var Page = Args["Page"];
    var User1 = Args["User1"];
    var User2 = Args["User2"];
    var oldid = Args["Oldid"];
    var Next = Args["Next"];

    var ParamOldid = (Next && oldid ? "&oldid="+oldid : "");

    var PageNamespaceNumber = getNamespaceInfoFromPage(Page);
    var PageName = getNamespaceInfoFromPage(Page, "PageName");
    var escTitle = lrcEscapeStr(Page);
    var escUser = false;
    var User = User2;
    if(!User) User = User1;
    if(!User){
        if(PageNamespaceNumber==2 ||PageNamespaceNumber==3){
            User = PageName.replace(/\/.*/g, "");
        }
    }
    if(User) escUser = lrcEscapeStr(User);
    var Tabs = new Array();
// Other Page /////////////////////////////////
    if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Move"||Mode=="Delete"||Mode=="Protect"||Mode=="Edit"||Mode=="Revisiondelete"){
        if(PageNamespaceNumber%2==0){
            var OtherPageText = lang_tooltips.TALK_TIP;
            var OtherPageNamespaceNumber = (PageNamespaceNumber+1);
        }else{
            var OtherPageText = lang_tooltips.SUBJECT_TIP;
            var OtherPageNamespaceNumber = (PageNamespaceNumber-1);
        }
        var OtherPageName = (OtherPageNamespaceNumber == 0 ? PageName : wgFormattedNamespaces[OtherPageNamespaceNumber]+":"+PageName);
        Tabs["OtherPage"] = '<a href="'+lrcGetPageURL(OtherPageName)+'" '
                          + 'onClick="liveArticle('+lrcEscapeStr(OtherPageName)+'); return false;" '
                          + 'title="'+OtherPageName+'" '
                          + '>'+OtherPageText+'</a>';
    }else if(Mode=="Contrib"||Mode=="DeletedContrib"||Mode=="Block"){
        var OtherPageName = wgFormattedNamespaces[3]+":"+User;
        Tabs["OtherPage"] = '<a href="'+lrcGetPageURL(OtherPageName)+'" '
                          + 'onClick="liveArticle('+lrcEscapeStr(OtherPageName)+'); return false;" '
                          + 'title="'+OtherPageName+'" '
                          + '>'+lang_tooltips.TALK_TIP+'</a>';
    }
// Edit /////////////////////////////////
    if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Move"||Mode=="Delete"||Mode=="Protect"||Mode=="Revisiondelete"){
        Tabs["Edit"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=edit'+ParamOldid) + '" '
                     + 'onClick="liveEdit('+escTitle+', \''+ParamOldid+'\'); return false;" '
                     + 'title="'+lang_tooltips.EDIT_TIP+' « '+Page+' »" '
                     + '>'+lang_tooltips.EDIT_TIP+'</a>';

    }
// New Section /////////////////////////////////
    if(PageNamespaceNumber%2!=0){
        if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Move"||Mode=="Delete"||Mode=="Protect"||Mode=="Edit"||Mode=="Revisiondelete"){
            Tabs["NewSection"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=edit&section=new') + '" '
                               + 'onClick="liveEdit('+escTitle+',\'&section=new\'); return false;" '
                               + 'title="'+lang_tooltips.NEWSECTION_TIP+'" '
                               + '>'+lang_tooltips.NEWSECTION_TIP+'</a>';
        }
    }
// Hist /////////////////////////////////
    if(Mode=="Article"||Mode=="Diff"||Mode=="Edit"||Mode=="Move"||Mode=="Delete"||Mode=="Protect"||Mode=="Revisiondelete"){
        Tabs["Hist"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=history') + '" '
                     + 'onClick="liveHist('+escTitle+'); return false;" '
                     + 'title="'+lang_tooltips.HIST_TIP+'" '
                     + '>'+lang_tooltips.HIST_TIP+'</a>';

    }
// Move /////////////////////////////////
    if(lrcUserHasRight("move")){
        if(Mode=="Article"||Mode=="Diff"||Mode=="Edit"||Mode=="Hist"||Mode=="Delete"||Mode=="Protect"||Mode=="Revisiondelete"){
            Tabs["Move"] = '<a href="'+lrcGetPageURL('Special:Movepage/'+Page) + '" '
                         + 'onClick="liveMove('+escTitle+'); return false;" '
                         + 'title="'+lang_tooltips.MOVE_TIP+' « '+Page+' »" '
                         + '>'+lang_tooltips.MOVE_TIP+'</a>';
        }
    }
// Contrib /////////////////////////////////
    if(escUser){
        if(Mode=="Block"||Mode=="DeletedContrib"){
            Tabs["Contrib"] = '<a href="'+lrcGetPageURL('Special:Contributions/' + User)+'" '
                            + 'onClick="liveContrib('+escUser+'); return false;" '
                            + 'title="'+lang_tooltips.CONTRIB_TIP+'" '
                            + '>'+lang_tooltips.CONTRIB_TIP+'</a>';
        }
    }
// DeletedContrib /////////////////////////////////
    if(lrcUserHasRight("deletedhistory") && escUser){
        if(Mode=="Block"||Mode=="Contrib"){
            Tabs["DeletedContrib"] = '<a href="'+lrcGetPageURL('Special:DeletedContributions/'+User)+'" '
                                   + 'onClick="liveDeletedContrib('+escUser+'); return false;" '
                                   + 'title="'+lang_tooltips.DELETEDCONTRIB_TIP+'" '
                                   + '>'+lang_tooltips.DELETEDCONTRIB_TIP+'</a>';
        }
    }
// Delete /////////////////////////////////
    if(lrcUserHasRight("delete")){
        if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Move"||Mode=="Protect"||Mode=="Edit"||Mode=="Revisiondelete"){
            Tabs["Delete"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=delete') + '" '
                           + 'onClick="liveDelete('+escTitle+'); return false;" '
                           + 'title="'+lang_tooltips.DEL_TIP+' « '+Page+' »" '
                           + '>'+lang_tooltips.DEL_TIP+'</a>';
        }
    }
// Protect /////////////////////////////////
    if(lrcUserHasRight("protect")){
        if(Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Move"||Mode=="Delete"||Mode=="Edit"||Mode=="Revisiondelete"){
            Tabs["Protect"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=protect') + '" '
                            + 'onClick="liveProtect('+escTitle+'); return false;" '
                            + 'title="'+lang_tooltips.PROTECT_TIP+' « '+Page+' »" '
                            + '>' +lang_tooltips.PROTECT_TIP+'</a>';
        }
    }
// Block /////////////////////////////////
    if(lrcUserHasRight("block") && escUser){
        if(Mode=="Contrib"||Mode=="DeletedContrib"){
            Tabs["Block"] = '<a href="'+lrcGetPageURL('Special:Blockip/'+User)+'" '
                          + 'onClick="liveBlock('+escUser+'); return false;" '
                          + 'title="'+lang_tooltips.BLOCK_TIP+' « '+User+' »" '
                          + '>'+lang_tooltips.BLOCK_TIP+'</a>';
        }else if(Mode=="Article" && (PageNamespaceNumber==2 ||PageNamespaceNumber==3)){
            var ThisUser = PageName.replace(/\/.*/g, "");
            Tabs["Block"] = '<a href="'+lrcGetPageURL('Special:Blockip/'+ThisUser)+'" '
                          + 'onClick="liveBlock('+lrcEscapeStr(ThisUser)+'); return false;" '
                          + 'title="'+lang_tooltips.BLOCK_TIP+' « '+ThisUser+' »" '
                          + '>'+lang_tooltips.BLOCK_TIP+'</a>';
        }
    }
// (Un)Watch /////////////////////////////////
    if(PageNamespaceNumber>-1 && (Mode=="Article"||Mode=="Diff"||Mode=="Hist"||Mode=="Edit"||Mode=="Move"||Mode=="Delete"||Mode=="Protect"||Mode=="Revisiondelete")){
        if(lstSuivi[Page]){
            Tabs["Watch"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=unwatch') + '" '
                          + 'onClick="LiveWatchArticle(this, 1, '+escTitle+'); return false;" '
                          + 'title="'+lang_tooltips.UNWATCH_TIP+' « '+Page+' »" '
                          + '>'+lang_tooltips.UNWATCH_TIP+'</a>';

        }else{
            Tabs["Watch"] = '<a href="'+lrcGetUglyPageURL(Page,'&action=watch') + '" '
                          + 'onClick="LiveWatchArticle(this, 1, '+escTitle+'); return false;" '
                          + 'title="'+lang_tooltips.WATCH_TIP+' « '+Page+' »" '
                          + '>'+lang_tooltips.WATCH_TIP+'</a>';
        }
    }
// Ask for sysop /////////////////////////////////
    if(lrcUserHasRight("autopatrol")) Tabs["AskForSyop"] = buildAskForSysop(Page, User);

    var AllTabs = new Array();
    for(var Tab in Tabs){
        if(typeof(Tabs[Tab])=="string" && Tabs[Tab] !="") AllTabs.push(Tabs[Tab]);
    }
    AllTabs = '<ul ><li>'+AllTabs.join("</li><li>") + '</li></ul>';
    if(AllTabs=="") AllTabs = "&nbsp;";
    return AllTabs;
}

// Commandes en bas à droite

function buildPreviewSpecialTabs(Args){
    if(!lrcUserHasRight("autopatrol")) return "&nbsp;";
    var Mode = Args["Mode"];
    var Page = Args["Page"];
    var User1 = Args["User1"];
    var User2 = Args["User2"];
    var oldid = Args["Oldid"];
    var patrolledDiff = Args["patrolledDiff"];
    var Next = Args["Next"];
    var SpecialTabs = "";
    if(Mode=="Diff") {
        if(!Next){
            SpecialTabs += buildLiveUndo(Page, oldid, User1, User2);
        }
        SpecialTabs += (SpecialTabs==="" ? "" : ' • ') + buildLiveAverto(Page, User2, true);
    }else if(Mode=="Article"){
        SpecialTabs += buildLiveTag(Page) + ' • ' + buildLiveBlank(Page);
        var User = Args["User1"];
        var HasPageParam = true;
        var PageNamespaceNumber = getNamespaceInfoFromPage(Page);
        var PageName = getNamespaceInfoFromPage(Page, "PageName");
        if(PageNamespaceNumber==2||PageNamespaceNumber==3){
            User = PageName.replace(/\/.*/g,"");
            HasPageParam = false;
        }
        if(User) SpecialTabs += ' • ' + buildLiveAverto(Page, User, HasPageParam);
    }else if(Mode=="Contrib"||Mode=="DeletedContrib"){
        if(lrcUserHasRight("autopatrol")) SpecialTabs += buildLiveAverto(Page, User1, false);
    }
    if(SpecialTabs==="") SpecialTabs = "&nbsp;";
    return SpecialTabs;
}

// Récupération du contenu de la page prévisualisée

function getPageContent(Req, ID){
  var OldTemp = document.getElementById("TempDiv");
  if(OldTemp) OldTemp.parentNode.removeChild(OldTemp);
  var Temp = document.createElement('div');
  Temp.id = "TempDiv";
  Temp.style.display = "none";
  document.body.appendChild(Temp);
  Temp.innerHTML = Req.responseText;
  var bC;
  if(ID){
    bC  = getElementWithId(ID, '*', Temp);
  }else{
    bC  = getElementWithId('bodyContent', 'div', Temp);
    if (bC ==  null) bC  = getElementWithId('article', 'div', Temp);
    if (bC ==  null) bC  = getElementWithId('mw_contentholder', 'div', Temp);
  }
  return bC;
}

// Recherche de form à partir d'un bouton

function getFormFromThisInput(Input){
     //if(!Input) return null;
     var Element = Input.parentNode;
     while(Element){
          if(Element.tagName && Element.tagName.toLowerCase() == 'form') return Element;
          Element = Element.parentNode;
     }
     return null
}

// Récupération de paramètres depuis une form

function getFormParams(Form){
     var Params = new Array();
     var Tags = new Array("textarea", "select", "input");
     for(var a=0,l=Tags.length;a<l;a++){
          var Elements = Form.getElementsByTagName(Tags[a]);
          for(var b=0,m=Elements.length;b<m;b++){
               var Element = Elements[b];
               var ElName = Element.name;
               if(!ElName) continue;
               var ElValue = Element.value;
               var ElType = Element.type;
               if(Tags[a].toLowerCase()=='input' && (ElType == "checkbox" || ElType == "radio") && Element.checked){
                    Params[ElName] = ElValue;
               }else if(Tags[a].toLowerCase()=='input' && (ElType == "text" || ElType == "hidden") ){
                    Params[ElName] = ElValue;
               }else if(Tags[a].toLowerCase()!='input'){
                    Params[ElName] = ElValue;
               }
          }
     }
     return Params;
}

/* </source>

===== Fonctions automatiques =====

====== Blanchiment ======

<source lang="javascript"> */

// Création de la commande de blanchiment

function buildLiveBlank(Page){
    if(!Page) return "";
    var optBlank = "";
    var optl = lstBlank.length;
    for (j=0; j<optl; j++) {
        optBlank += '<option value="' + lstBlank[j].resume + '" title="' + lstBlank[j].resume + '">' + lstBlank[j].tooltip + '</option>';
    }
    var BlankBar = '<form id="LiveBlankForm">'
                 + '<input id="LiveBlankLink" type="button" title="'+lang_menu.EMPTY+' « '+Page+' »" '
                 + 'onclick="getLiveBlank('+lrcEscapeStr(Page)+'); return false;" '
                 + 'onselect="getLiveBlank('+lrcEscapeStr(Page)+'); return false;" '
                 + 'value="'+lang_menu.EMPTY+'" />'
                 + '<select id="LiveBlankReason">' + optBlank + '</select>'
                 + '</form>';
    return BlankBar;
}

// Récupération des informations et requête de page

function getLiveBlank(page){
    var BlankSelect = document.getElementById("LiveBlankReason");
    var BlankButton = document.getElementById("LiveBlankLink");
    if(!BlankSelect || !BlankButton) return;
    BlankSelect.disabled = "disabled";
    BlankButton.disabled = "disabled";
    var message = BlankSelect.value;
    A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=edit&inprop=protection&titles='+encodeURIComponent(page),
                  onSuccess: postBlankPage,
                  page: page,
                  message: message
                });
    return false;
}

// Traitement de la requête de blanchiment

function postBlankPage(xmlreq, data){
  var page=data.page;
  var message=data.message;
  var EditParam = new Array();
  var ObjetXML = xmlreq.responseXML;
  var Isprotected = false;
  var PR = ObjetXML.getElementsByTagName("pr");
  for(var a=0,l=PR.length;a<l;a++){
    var Type = PR[a].getAttribute("type");
    var Level = PR[a].getAttribute("level");
    if(Type=="edit" && wgUserGroups.indexOf(Level)==-1) Isprotected = true;
  }
  if(Isprotected){
    alert('Page protégée');
    return;
  }
  var Page = ObjetXML.getElementsByTagName("page")[0];
  EditParam["token"] = encodeURIComponent(Page.getAttribute("edittoken"));
  EditParam["text"] = "";
  EditParam["summary"] = encodeURIComponent(lang_messages.RESUMESTART+lang_messages.SPEEDDELETION+' ; ' + message);
  EditParam["title"] = encodeURIComponent(page);
  EditParam["watchlist"] = "preferences";
  if(lrcParams["BypassWatchdefault"]) EditParam["watchlist"] = "nochange";
  var Params = new Array();
  for(var Param in EditParam){
    Params.push(Param+"="+EditParam[Param]);
  }
  Params = Params.join("&");
  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=edit',
                method: "POST", headers: headers,
                data: Params});
}

/* </source>

====== Bandeaux ======

<source lang="javascript"> */

// Création de la commande d'ajout de bandeau

function buildLiveTag(Page){
    if(!Page) return "";
    var optTag = "";
    var optl = lstTag.length;
    for (j=0; j<optl; j++) {
        optTag += '<option value="' + lstTag[j].template + '" '
               + 'title="{{' + lstTag[j].template + '}}" '
               + '>' + lstTag[j].string + '</option>';
    }
    var TagBar = '<form id="LiveTagForm">'
               + '<input id="LiveTagLink" type="button" title="'+lang_menu.TAG+'" '
               + 'onclick="getLiveTag('+lrcEscapeStr(Page)+'); return false;" '
               + 'onselect="getLiveTag('+lrcEscapeStr(Page)+'); return false;" '
               + 'value="'+lang_menu.TAG+'" />'
               + '<select id="LiveTagReason">' + optTag + '</select>'
               + '</form>';
    return TagBar;
}

// Récupération des information et requête de page

function getLiveTag(page){
    var TagSelect = document.getElementById("LiveTagReason");
    var TagButton = document.getElementById("LiveTagLink");
    if(!TagSelect || !TagButton) return;
    var message = TagSelect.value;
    lrcDisableLink("LiveTagReason");
    lrcDisableLink("LiveTagLink");
    A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?format=xml'
                     + '&action=query&prop=info&intoken=edit'
                     + '&inprop=protection'
                     + '&titles=' + encodeURIComponent(page),
                onSuccess: postTagPage,
                page: page,
                message: message});
  return false;
}

// Traitement ajout de bandeau

function postTagPage(xmlreq, data){
  var page = data.page;
  var message = data.message;

  var EditParam = new Array();
  var ObjetXML = xmlreq.responseXML;
  var Isprotected = false;
  var PR = ObjetXML.getElementsByTagName("pr");
  for(var a=0,l=PR.length;a<l;a++){
    var Type = PR[a].getAttribute("type");
    var Level = PR[a].getAttribute("level");
    if(Type=="edit" && wgUserGroups.indexOf(Level)==-1) Isprotected = true;
  }
  if(Isprotected){
    alert('Page protégée');
    return;
  }
  var ThisDate = "";
  for(var Tag in lstTag){
    if(lstTag[Tag].template == message && lstTag[Tag].withDate){
      var Months = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
      var Now = new Date();
      var Year = Now.getYear();
      if(Year < 2000) Year = Year + 1900;
      var Month = Months[(Now.getMonth())];
      ThisDate = "|date="+Month+" "+Year;
    }
  }
  var Page = ObjetXML.getElementsByTagName("page")[0];
  EditParam["token"] = encodeURIComponent(Page.getAttribute("edittoken"));
  EditParam["prependtext"] = encodeURIComponent("{{"+message+ThisDate+"}}\n");
  EditParam["summary"] = encodeURIComponent(lang_messages.RESUMESTART + lang_messages.WARNING + ' ' + message);
  EditParam["title"] = encodeURIComponent(page);
  EditParam["watchlist"] = "preferences";
  EditParam["nocreate"] = "1";
  if(lrcParams["BypassWatchdefault"]) EditParam["watchlist"] = "nochange";

  var Params = new Array();
  for(var Param in EditParam){
    Params.push(Param+"="+EditParam[Param]);
  }
  Params = Params.join("&");
  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=edit',
                method: "POST", headers: headers,
                data: Params});
}

/* </source>

====== Révocation ======

<source lang="javascript"> */

// Création de la commande de révocation

function buildLiveUndo(Page, oldid, User1, User2){
    if(!Page || !oldid || !User1 || !User2 ) return "";
    var specialNotice = "";
    var rollbackButton = "";
    if (User1 == User2) {
        specialNotice = "<small><b style='color:red'>[" + lang_messages.SAME_EDITOR + "]</b></small> ";
        rollbackButton = '<input id="LiveRollbackLink" '
                       + 'type="button" title="'+lang_menu.REVERT+' « '+User2+' » ('+Page+')" '
                       + 'onclick="lrcUndo(' + lrcEscapeStr(Page) + ',' + lrcEscapeStr(User2) +'); return false;" '
                       + 'onselect="lrcUndo(' + lrcEscapeStr(Page) + ',' + lrcEscapeStr(User2) +'); return false;" '
                       + 'value="' + lang_menu.REVERT + '" />'
    }
    if (Page == lang_sandbox) {
        specialNotice = "<small><b style='color:red'>[" + lang_messages.SANDBOX + "]</small></b> ";
    }
    var UndoBar = '<form id="LiveUndoForm">'
                + specialNotice + rollbackButton
                + '<input id="LiveUndoLink" type="button" title="'+lang_menu.UNDORC+' « '+User2+' » ('+Page+')" '
                + 'onclick="lrcUndo(' + lrcEscapeStr(Page) + ',' + lrcEscapeStr(User2) +',' + oldid + '); return false;" '
                + 'onselect="lrcUndo(' + lrcEscapeStr(Page) + ',' + lrcEscapeStr(User2) +',' + oldid + '); return false;" '
                + 'value="' + lang_menu.UNDORC + '" />'
                + '<input id="LiveRevertMessage" value="" />'
                + '</form>';
    return UndoBar;
}

// Mise en place des suggestions de résumé de révocation

function LiveRC_RevertMessagesExtension_Init(){
    var RevertInput = document.getElementById("LiveRevertMessage");
    if(!RevertInput) return;
    var Opt = '<option selected="selected" onClick="LiveRC_RevertMessagesExtension_Update()" value=""> </option>';
    for(var a=0,l=lrcRevertMessages.length;a<l;a++){
      Opt += '<option value="'+lrcRevertMessages[a].resume+'" '
            + 'title="'+lrcRevertMessages[a].resume+'" '
            + 'onClick="LiveRC_RevertMessagesExtension_Update()" '
            + 'name="'+a+'">'+lrcRevertMessages[a].text+'</option>';
    }
    var Select = document.createElement('select');
    Select.id = "LiveRevertMessage_List";
    Select.innerHTML = Opt;
    Select.style.display = "none";
    Select.style.position = "relative" ;
    Select.style.width = RevertInput.offsetWidth + "px" ;
    Select.style.top = parseInt(RevertInput.offsetHeight) + "px";
    Select.style.marginBottom = "-" + (20 + parseInt(RevertInput.offsetHeight)) + "px" ;
    Select.style.marginLeft = "-"+RevertInput.offsetWidth+"px" ;
    RevertInput.parentNode.insertBefore(Select, RevertInput.nextSibling);
    Select.onkeyup = LiveRC_RevertMessagesExtension_KeyPress;
    Select.onchange = LiveRC_RevertMessagesExtension_Update;

    RevertInput.onmouseover = LiveRC_RevertMessagesExtension_Toggle;
    RevertInput.onfocus = LiveRC_RevertMessagesExtension_Toggle;
}

// Affichage / Masquage des suggestions de résumé de révocation

function LiveRC_RevertMessagesExtension_Toggle(){
    var RevertSelect = document.getElementById("LiveRevertMessage_List");
    if(!RevertSelect) return;
    if(RevertSelect.style.display == "none"){
        RevertSelect.style.display = "inline";
    }else{
        RevertSelect.style.display = "none";
    }
}

// Sélection d'une suggestion de résumé de révocation (clavier + souris)

function LiveRC_RevertMessagesExtension_KeyPress(e){
    if (!e) var e = window.event;
    if (e.keyCode != 13) return;
    LiveRC_RevertMessagesExtension_Update();
}

function LiveRC_RevertMessagesExtension_Update(){
    var RevertInput = document.getElementById("LiveRevertMessage");
    var RevertSelect = document.getElementById("LiveRevertMessage_List");
    if(!RevertInput || !RevertSelect) return;
    var InputValue = RevertInput.value;
    if(InputValue!="") RevertInput.value += " ; ";
    var Options = RevertSelect.getElementsByTagName('option');
    for(var a=0,l=Options.length;a<l;a++){
        if(!Options[a].selected) continue;
        RevertInput.value = Options[a].value;
        RevertInput.focus();
        return;
    }
}

// Récupération des informations et requête de page

function lrcUndo(title, user, oldid) {
  var RollbackButton = document.getElementById('LiveRollbackLink');
  var UndoButton = document.getElementById('LiveUndoLink');
  var UndoMessage = document.getElementById('LiveRevertMessage');
  var UndoMessageList = document.getElementById('LiveRevertMessage_List');
  if(!UndoMessage) return;
  if(RollbackButton) RollbackButton.disabled = "disabled";
  if(UndoButton) UndoButton.disabled = "disabled";
  UndoMessage.disabled = "disabled";
  if(UndoMessageList) UndoMessageList.disabled = "disabled";
  var summary = UndoMessage.value;
  var requestHistory = wgServer + wgScriptPath + '/api.php?format=xml'
          + '&action=query&prop=revisions|info&rvlimit=10'
          + '&rvprop=user|ids&intoken=edit&titles=' + encodeURIComponent(title);
  A&Lajax.http({url: requestHistory, onSuccess: lrcUndoCB, title: title,
               user: user, oldid: oldid, summary: summary});
  return false;
}

// Traitement de la requête de révocation

function lrcUndoCB(xmlreq, data) {
  var page = xmlreq.responseXML.getElementsByTagName('page')[0];
  var token = page.getAttribute('edittoken');
  var lst = xmlreq.responseXML.getElementsByTagName('revisions')[0].childNodes;
  var user = data.user ? data.user : lst[0].getAttribute('user');
  var curid = lst[0].getAttribute('revid');
  var i;
  for (i = 0; i < lst.length && lst[i].getAttribute('user') == user
          && lst[i].getAttribute('revid') != data.oldid; i++) {}
  if (i == 0 || i == lst.length) return;
  var oldUser = lst[i].getAttribute('user');
  var oldid = lst[i].getAttribute('revid');
  var summary = lang_messages.RESUMESTART+lrcMediawikiMessages["revertpage"];
  summary = summary.split("$1").join(oldUser);
  summary = summary.split("$2").join(user);
  if (data.summary) summary += ' ; ' + data.summary;
  var minorEdit = lrcParams["RvMinorEdit"] ? '&minor=1' : '';
  var watchParam = lrcParams["BypassWatchdefault"] ? '&watchlist=nochange' : '&watchlist=preferences';
  var requestEditData = 'title=' + encodeURIComponent(data.title)
          + '&token=' + encodeURIComponent(token)
          + '&summary=' + encodeURIComponent(summary)
          + '&undo=' + curid + '&undoafter=' + oldid + watchParam + minorEdit
  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?action=edit',
               method: "POST", headers: headers, data: requestEditData});
}

/* </source>

====== Avertissement ======

<source lang="javascript"> */

// Création de la commande de message utilisateur

function buildLiveAverto(Page, User, WithPage){
    if(!Page || !User) return "";
    var optAvert = "";
    var optl = lstAverto.length;
    for (j=0; j<optl; j++) {
        var Value = lstAverto[j].template;
        if(lstAverto[j].addName) Value += "|user=" + wgUserName
        if(lstAverto[j].hasPage && WithPage) Value += '|1='+Page.replace(/\"/g, "");
        optAvert += '<option value="'+Value+'" ';
        optAvert += 'title="{{'+Value+'}}" '
        optAvert += '>'+lstAverto[j].string+'</option>';
    }
    var AvertoBar = '<form id="LiveAvertoForm">'
                  + '<input id="LiveAvertoLink" type="button" title="'+lang_menu.USERMSG+' « '+User+' »" '
                  + 'onclick="getLiveAverto('+lrcEscapeStr(User)+','+lrcEscapeStr(Page)+'); return false;" '
                  + 'onselect="getLiveAverto('+lrcEscapeStr(User)+','+lrcEscapeStr(Page)+'); return false;" '
                  + 'value="'+lang_menu.USERMSG+'" />'
                  + '<select id="averto">' + optAvert + '</select>'
                  + '</form>';
     return AvertoBar;
}

// Récupération des informations et requête de page

function getLiveAverto(user, page) {
  var message = document.getElementById('averto').value;
  if(!message) return;
  lrcDisableLink('LiveAvertoLink');
  lrcDisableLink('averto');
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=edit&inprop=protection&titles='+wgFormattedNamespaces[3]+":"+encodeURIComponent(user),
                onSuccess: postLiveAverto,
                user: user, page:page, message: message });
  return false;
}

// Traitement de la requête de message utilisateur

function postLiveAverto(xmlreq, data) {
  var user = data.user;
  var page = data.page;
  var message = data.message;
  var typeofmessage = message.replace(/\|.*/g, "");
  var EditParam = new Array();
  var ObjetXML = xmlreq.responseXML;
  var Isprotected = false;
  var PR = ObjetXML.getElementsByTagName("pr");
  for(var a=0,l=PR.length;a<l;a++){
    var Type = PR[a].getAttribute("type");
    var Level = PR[a].getAttribute("level");
    if(Type=="edit" && wgUserGroups.indexOf(Level)==-1) Isprotected = true;
  }
  if(Isprotected){
    alert('Page protégée');
    return;
  }
  var Page = ObjetXML.getElementsByTagName("page")[0];
  EditParam["token"] = encodeURIComponent(Page.getAttribute("edittoken"));
  EditParam["appendtext"] = encodeURIComponent('\n\n{{subst:' + message + '}} ~~~~\n');
  EditParam["summary"] = encodeURIComponent(lang_messages.RESUMESTART + lang_messages.WARNING + ' ' + typeofmessage + (page ? ' ' + lang_messages.ON_ARTICLE + ' [['+page+']]' : '' ) + ' !');
  //EditParam["recreate"] = 1;
  EditParam["title"] = wgFormattedNamespaces[3]+":"+encodeURIComponent(user);
  EditParam["watchlist"] = "preferences";
  if(lrcParams["BypassWatchdefault"]) EditParam["watchlist"] = "nochange";

  var Params = new Array();
  for(var Param in EditParam){
    Params.push(Param+"="+EditParam[Param]);
  }
  Params = Params.join("&");
  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=edit',
                method: "POST", headers: headers,
                data: Params});
}
/* </source>

====== Demande aux administrateurs ======

<source lang="javascript"> */

// Récupération des motifs standards de demande administrative

function buildAskForSysopCreateReasons(){
     for(var Ask in lstAskForSysop){
          var ThisAsk = lstAskForSysop[Ask];
          var Type = ThisAsk.userright;
          var DropType = ThisAsk.userright;
          ThisAsk.reasons = new Array();
          var Drop = lrcMediawikiMessages[ThisAsk.reasonsdropdownname];
          if(!Drop) continue;
          var Drop = Drop.split("**");
          for(var a=0,l=Drop.length;a<l;a++){
               var ThisReason = Drop[a];
               if(ThisReason.indexOf("*")!=-1) continue;
               ThisAsk.reasons.push(ThisReason);
          }
     }
}

// Création du lien de demande administrative

function buildAskForSysop(Page, User){
    var optAskSysop = new Array('<option id="null" value="" title=""></option>');
    var optl = lstAskForSysop.length;
    for (j=0; j<optl; j++) {
        if((lstAskForSysop[j].parampage && Page) || (lstAskForSysop[j].paramuser && User)){
            if(lrcUserHasRight(lstAskForSysop[j].userright)) continue;
            var NewValue = lstAskForSysop[j].template;
            if(lstAskForSysop[j].parampage && Page) NewValue += '|page='+Page.replace(/\"/g, '\\"');
            if(lstAskForSysop[j].paramuser && User) NewValue += '|user='+User.replace(/\"/g, '\\"');
            var NewOption = '<option id="'+lstAskForSysop[j].userright+'" value="'+NewValue+'" title="{{'+NewValue+'}}" '
                          + '>'+lstAskForSysop[j].text+'</option>';
            optAskSysop.push(NewOption);
        }
    }
    if(optAskSysop.length===1) return "";
    var AskForSysopBar = '<form id="AskForSysopForm">'
                       + '<a id="LiveAskForSysop" href="javascript:;" '
                       + 'title="' + lang_tooltips.ASKSYSOP_TIP + ' " '
                       + 'onClick="liveAskForSysop('+lrcEscapeStr(User)+');">'+lang_tooltips.ASKSYSOP_SHORT+'</a> : '
                       + '<select id="AskForSysop" onchange="buildAskForSysopGetReason()">' + optAskSysop.join("") + '</select>'
                       + '</form>';
     return AskForSysopBar;
}

// Création du menu de demande administrative

function buildAskForSysopGetReason(){
     var OldDropDown = document.getElementById("AskForSysopReasons");
     if(OldDropDown) OldDropDown.parentNode.removeChild(OldDropDown);
     var Select = document.getElementById("AskForSysop");
     if(!Select) return;
     var Options = Select.getElementsByTagName('option');
     for(var a=0,l=Options.length;a<l;a++){
          if(!Options[a].selected) continue;
          var ID = Options[a].id;
          if(!ID || ID==="null") continue;
          for(var Ask in lstAskForSysop){
               var Type = lstAskForSysop[Ask].userright;
               if(Type!=ID) continue;
               var Reasons = lstAskForSysop[Ask].reasons;
               if(!Reasons || Reasons.length===0) continue;
               var NewSelect = document.createElement('select');
               NewSelect.id = "AskForSysopReasons";
               NewSelect.setAttribute("style", "width:100px");
               var Opt = document.createElement('option');
               Opt.value = "";
               Opt.innerHTML = "";
               NewSelect.appendChild(Opt);
               for(var b=0,m=Reasons.length;b<m;b++){
                    var Opt = document.createElement('option');
                    Opt.value = Reasons[b];
                    Opt.innerHTML = Reasons[b];
                    NewSelect.appendChild(Opt);
               }
               Select.parentNode.insertBefore(NewSelect, Select.nextSibling);
          }
     }
}

// Récupération des informations et requête de page

function liveAskForSysop() {
  var GotOption = false;
  var GotOptionParams = false
  var GotReason = false;
  var Select = document.getElementById('AskForSysop');
  var Options = Select.getElementsByTagName('option');
  for(var a=0,l=Options.length;a<l;a++){
    var Option = Options[a];
    if(Option.selected && !GotOption){
      GotOption = Option;
      var ID = GotOption.id;
      for(var Ask in lstAskForSysop){
        var Type = lstAskForSysop[Ask].userright;
        if(Type!=ID) continue;
        GotOptionParams = lstAskForSysop[Ask];
      }
    }
  }
  var message = GotOption.value;
  var summary = message;
  var ReasonsSelect = document.getElementById('AskForSysopReasons');
  var ReasonsOptions = ReasonsSelect.getElementsByTagName('option');
  for(var a=0,l=ReasonsOptions.length;a<l;a++){
    var ReasonsOption = ReasonsOptions[a];
    if(ReasonsOption.selected){
      GotReason = ReasonsOption.value;
    }
  }
  if(!GotOption || !GotOptionParams || !GotReason) return;
  lrcDisableLink('LiveAskForSysop');
  lrcDisableLink('AskForSysop');
  lrcDisableLink('AskForSysopReasons');
  var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=edit&inprop=protection&titles='+encodeURIComponent(GotOptionParams.page)
  A&Lajax.http({ url       : URL,
                onSuccess : postAskForSysop,
                message   : message,
                summary   : summary,
                page      : GotOptionParams.page,
                reason    : GotReason
  });
  return false;
}

// Traitement de la requête de demande administrative

function postAskForSysop(xmlreq, data) {
  var page = data.page;
  var message = data.message;
  var summary = data.summary;
  var reason = data.reason;
  var ObjetXML = xmlreq.responseXML;
  var Isprotected = false;
  var PR = ObjetXML.getElementsByTagName("pr");
  for(var a=0,l=PR.length;a<l;a++){
    var Type = PR[a].getAttribute("type");
    var Level = PR[a].getAttribute("level");
    if(Type=="edit" && wgUserGroups.indexOf(Level)==-1) Isprotected = true;
  }
  if(Isprotected){
    alert('Page protégée');
    return;
  }
  var Page = ObjetXML.getElementsByTagName("page")[0];
  var EditParam = new Array();
  EditParam["token"] = encodeURIComponent(Page.getAttribute("edittoken"));
  EditParam["appendtext"] = encodeURIComponent('\n\n{{subst:' + message + '|raison='+reason+'}}\n');
  EditParam["summary"] = encodeURIComponent("");
  EditParam["title"] = encodeURIComponent(page);
  EditParam["watchlist"] = "preferences";
  if(lrcParams["BypassWatchdefault"]) EditParam["watchlist"] = "nochange";
  var Params = new Array();
  for(var Param in EditParam){
    Params.push(Param+"="+EditParam[Param]);
  }
  Params = Params.join("&");
  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=edit',
                method: "POST", headers: headers,
                data: Params});
}
/* </source>

==== Module de gestion des variables ====

===== Récupération de la page de paramétrage =====

<source lang=javascript> */

// Récupération oldid de la page de paramétrage

function LiveRC_ManageParams_GetOldParamsOldid(RequeteOldid){
  var ObjetXML = RequeteOldid.responseXML;
  if (ObjetXML){
    var LastRevision = ObjetXML.getElementsByTagName('rev')[0];
    if (LastRevision){
      var Oldid = LastRevision.getAttribute('revid');
      A&Lajax.http({url:wgServer + wgScript + '?title=User:' + encodeURIComponent(wgUserName) + '/LiveRCparam.js&action=raw&oldid=' + Oldid, onSuccess:LiveRC_ManageParams_GetOldParams });
    }
  }
}

// Récupération de la page de paramétrage

function LiveRC_ManageParams_GetOldParams(Req){
     var Response = Req.responseText;
     if(Response=="") return;
     var FoundSetup = false;
     var ResponseLines = Response.split('\n');
     for(var line = 0,linelength=ResponseLines.length;line<linelength;line++){
          var ThisLine = ResponseLines[line];
          if(ThisLine.indexOf(LiveRC_ExtensionSetupComment)!=-1){
               FoundSetup = true;
               for(var a=0,l=lrcExtensions.length;a<l;a++){
                    var Installed = false;
                    if(ThisLine.indexOf("|"+lrcExtensions[a]["name"]+"|")!=-1){
                         Installed = true;
                    }
                    lrcExtensions[a]["Installed"] = Installed;
               }
          }
     }
     if(!FoundSetup) for(var a=0,l=lrcExtensions.length;a<l;a++) lrcExtensions[a]["Installed"] = false;
}

/* </source>

===== Menu de paramétrage =====

<source lang=javascript> */

// Création des variables

function LiveRC_ManageParams_Fill(OptionArray, ArrayName, AddButton){
        LiveRC_Params[ArrayName] = new Array();
        for(var Param in OptionArray){
            var ParamName = Param;
            var ParamOldValue = OptionArray[Param];
            var ParamType = typeof(ParamOldValue);  // 'number', 'string', 'boolean', 'object'
            if(ParamType == 'number' || ParamType == 'string' || ParamType == 'boolean' || ParamType == 'object'){
                var NewArray = {
                    "Type"      : "Variable",
                    "Name"      : ParamName,
                    "Desc"      : LiveRC_ManageParams_Translate(ParamName, 0),
                    "ValueType" : ParamType,
                    "OldValue"  : ParamOldValue,
                    "AddButton" : (AddButton ? true : false)
                }
                if(LiveRC_Params[ArrayName].indexOf(NewArray)==-1) LiveRC_Params[ArrayName].push(NewArray);
            }
        }
}

// Traduction du noms des variables

function LiveRC_ManageParams_Translate(Text, Index){
  if(!Index) Index == 0;
  for(var Vars in lrcManageParams_Desc){
    if(" Desc"+Text == " "+Vars) return lrcManageParams_Desc[Vars][Index];
  }
  return ("<"+Text+">").htmlize();
}

// Fermeture du menu

function LiveRC_ManageParams_CloseMenu(){
    var Menu = document.getElementById("LiveRC_ParamMenu");
    if(Menu) Menu.parentNode.removeChild(Menu);
    removeClass(document.body, "LiveRCConfigDisplayed");
    lrcInitTableHeight();
}

// Création du menu

function LiveRC_ManageParams_OpenMenu(){
    var OldMenu = document.getElementById("LiveRC_ParamMenu");
    if(OldMenu){
        LiveRC_ManageParams_CloseMenu();
        return;
    }
    lrcCloseAll();
    addClass(document.body, "LiveRCConfigDisplayed");
    LiveRC_ManageParams_Fill(lrcParams, "lrcParams");
    LiveRC_ManageParams_Fill(lrcOptionMenuValues, "lrcOptionMenuValues");
    LiveRC_ManageParams_Fill(lstBlank, "lstBlank", true);
    LiveRC_ManageParams_Fill(lrcRevertMessages, "lrcRevertMessages", true);
    LiveRC_ManageParams_Fill(lstAverto, "lstAverto", true);
    LiveRC_ManageParams_Fill(lstTag, "lstTag", true);
    LiveRC_ManageParams_Fill(lrcIcon, "lrcIcon");
    if(lrcParams["AddExtensionCustom"]) LiveRC_ManageParams_Fill(lrcExtensions, "lrcExtensions", true);
    LiveRC_ManageParams_Fill(lang_menu, "lang_menu");
    LiveRC_ManageParams_Fill(lang_tooltips, "lang_tooltips");
    LiveRC_ManageParams_Fill(lang_messages, "lang_messages");
    LiveRC_ManageParams_Fill(lrcManageParamsText, "lrcManageParamsText");
    LiveRC_ManageParams_Fill(lrcManageParams_Desc, "lrcManageParams_Desc");
    LiveRC_RunHooks("AfterFillParamPanel");
    var TargetDiv = document.getElementById("OutFixedBottomPanel");
    if(!TargetDiv) return;
    var Menu = document.createElement('div');
    Menu.id = "LiveRC_ParamMenu";
    var MenuAnchor = document.createElement('div');
    MenuAnchor.id = "LiveRC_ParamMenuAnchor";
    MenuAnchor.innerHTML  = "Menu de configuration";
    Menu.appendChild(MenuAnchor);
    var MenuContent = document.createElement('div');
    MenuContent.id = "LiveRC_ParamMenuContent";
    addClass(MenuContent, "LiveRC_MenuContent");
    var Form = document.createElement('form');
    Form.id = "LiveRC_ParamMenuForm";
    MenuContent.appendChild(Form);
    for(var ThisVariableIndex in LiveRC_Params){
        var ArrayVariable = LiveRC_Params[ThisVariableIndex];
        var VariableFieldset = document.createElement('fieldset');
        VariableFieldset.id = "LiveRC_ParamMenu_"+ThisVariableIndex;
        VariableFieldset.setAttribute("style", "text-align:left;");
        var VariableLegend = document.createElement('legend');
        VariableLegend.appendChild(document.createTextNode(LiveRC_ManageParams_Translate(ThisVariableIndex, 0)));
        VariableFieldset.appendChild(VariableLegend);
        VariableFieldset.appendChild(LiveRC_ManageParams_CreateActionButtons());
        var VariableDiv = document.createElement('div');
        VariableDiv.className = "LiveRC_ParamMenuPart";
        var VariableUl = document.createElement('ul');
        var Columns = "";
        if(!ArrayVariable[0]) continue;
        if(ArrayVariable[0]["ValueType"]!='object') Columns ="-moz-column-count:2;-webkit-column-count:2;column-count:2;";
        VariableUl.setAttribute("style", "list-style:none;list-image:none;margin:0;"+Columns);
        VariableDiv.appendChild(VariableUl);
        VariableFieldset.appendChild(VariableDiv);
        for(var a=0,l=ArrayVariable.length;a<l;a++){
            var ThisVariable = ArrayVariable[a];
            var P = document.createElement('li');
            addClass(P, "ParamMenuLi");
            var AddButton = ThisVariable["AddButton"];
            if(ThisVariable["ValueType"]!='object'){
                var Input = document.createElement('input');
                Input.id = ThisVariable["Name"];
                Input.name = ThisVariable["Name"];
                if(ThisVariable["ValueType"]=="boolean"){
                    Input.type = "checkbox";
                    if(ThisVariable["OldValue"]) Input.checked = "checked";
                }else{
                    Input.type = "text";
                    Input.size = 30;
                    Input.setAttribute("style", "padding:2px;margin:0");
                    Input.value = ThisVariable["OldValue"];
                }
                var Label = document.createElement('label');
                Label.setAttribute('for', ThisVariable["Name"]);
                Label.innerHTML = ThisVariable["Desc"];
                P.appendChild(Input);
                P.appendChild(document.createTextNode(" "));
                P.appendChild(Label);
            }else{
                for(var VarIndex in ThisVariable["OldValue"]){
                    var VariableType = typeof(ThisVariable["OldValue"][VarIndex]);
                    if(VariableType!="boolean" && VariableType!="number" && VariableType!="string") continue;
                    var Input = document.createElement('input');
                    Input.id = VarIndex;
                    Input.name = VarIndex;
                    if(VariableType=="boolean"){
                        Input.type = "checkbox";
                        if(ThisVariable["OldValue"][VarIndex]) Input.checked = "checked";
                    }else{
                        Input.type = "text";
                        if(VariableType=="string") Input.size = 40;
                        if(VariableType=="number") Input.size = 15;
                        Input.setAttribute("style", "padding:2px;margin:0");
                        Input.value = ThisVariable["OldValue"][VarIndex];
                    }
                    var Label = document.createElement('label');
                    Label.setAttribute('for', VarIndex);
                    Label.innerHTML = VarIndex;
                    P.appendChild(Label);
                    P.appendChild(document.createTextNode(":"));
                    P.appendChild(Input);
                    P.appendChild(document.createTextNode(" "));
                }
                if(AddButton) P.appendChild(LiveRC_ManageParams_AddDeleteLink());
            }
            VariableUl.appendChild(P);
        }
        if(AddButton){
            var P = document.createElement('li');
            var Types = new Array()
            for(var VarIndex in ThisVariable["OldValue"]){
                Types.push(lrcEscapeStr(VarIndex)+":"+lrcEscapeStr(typeof(ThisVariable["OldValue"][VarIndex])));
            }
            P.innerHTML = '<a id="AddParam_'+ThisVariableIndex+'" href="javascript:LiveRC_ManageParams_AddNeA&Laram('+lrcEscapeStr(ThisVariableIndex)+', {'+Types.join(",")+'});" >(+)</a>';
            VariableUl.appendChild(P);
        }
        Form.appendChild(VariableFieldset);
    }
    Menu.appendChild(MenuContent);
    TargetDiv.appendChild(Menu);
    LiveRC_ManageParams_AddContactListMenu();
    LiveRC_ManageParams_AddExtensionsMenu();
    LiveRC_ManageParams_CreateToggleButtons();
    LiveRC_ManageParams_ToggleMenu();
    LiveRC_SetVerticalResizeZone(document.getElementById("LiveRC_ParamMenuAnchor"),
                         getElementsByClass("LiveRC_ParamMenuPart",document.getElementById("LiveRC_ParamMenu"),"div"),
                         document.getElementById("LiveRC_ParamMenu")
                        );
    lrcInitTableHeight();
    LiveRC_RunHooks("AfterCreateParamPanel");
}

// Ajouter une nouvele ligne

function LiveRC_ManageParams_AddNeA&Laram(Id, Vars){
    var Link = document.getElementById('AddParam_'+Id);
    if(!Link) return;
    var P = document.createElement('li');
    addClass(P, "ParamMenuLi");
    for(var iName in Vars){
        var Label = document.createElement('label');
        Label.setAttribute('for', iName);
        Label.innerHTML = iName;
        var Input = document.createElement('input');
        Input.id = iName;
        Input.name = iName;
        if(Vars[iName]=="boolean"){
            Input.type = "checkbox";
        }else{
            Input.type = "text";
            Input.size = 40;
            Input.setAttribute("style", "padding:2px;margin:0");
            Input.value = "";
        }
        P.appendChild(Label);
        P.appendChild(document.createTextNode(":"));
        P.appendChild(Input);
        P.appendChild(document.createTextNode(" "));
    }
    P.appendChild(LiveRC_ManageParams_AddDeleteLink());
    var Li = Link.parentNode;
    Li.parentNode.insertBefore(P, Li);
}

// Bouton de suppression de ligne

function LiveRC_ManageParams_AddDeleteLink(){
    var Link = document.createElement('a');
    Link.innerHTML = ('(–)');
    Link.href = "javascript:;"
    Link.onclick = function(){ LiveRC_ManageParams_DeleteThisParam(this); }
    return Link;
}

// Suppression d'une ligne

function LiveRC_ManageParams_DeleteThisParam(Link){
    var Line = Link.parentNode;
    Line.parentNode.removeChild(Line);
    return false;
}

// Création boutons d’action ( Valider / RAZ )

function LiveRC_ManageParams_CreateActionButtons(){
    var ActionP = document.createElement('p');
    var OKInput = document.createElement('input');
    OKInput.type = "button";
    OKInput.value = lrcManageParamsText["OK"];
    OKInput.onclick = function(){ LiveRC_ManageParams_CheckMenu(this); return false;}
    OKInput.onselect = function(){ LiveRC_ManageParams_CheckMenu(this); return false;}
    ActionP.appendChild(OKInput);
    var RAZInput = document.createElement('input');
    RAZInput.type = "button";
    RAZInput.value = lrcManageParamsText["RAZ"];
    RAZInput.onclick = function(){ LiveRC_ManageParams_RAZParams(this); return false;}
    RAZInput.onselect = function(){ LiveRC_ManageParams_RAZParams(this); return false;}
    ActionP.appendChild(RAZInput);
    var CancelInput = document.createElement('input');
    CancelInput.type = "button";
    CancelInput.value = lrcManageParamsText["Cancel"];
    CancelInput.onclick = function(){ LiveRC_ManageParams_CloseMenu(this); return false;}
    CancelInput.onselect = function(){ LiveRC_ManageParams_CloseMenu(this); return false;}
    ActionP.appendChild(CancelInput);
    return ActionP;
}

// Création des onglets

function LiveRC_ManageParams_CreateToggleButtons(){
    var Form = document.getElementById("LiveRC_ParamMenuForm");
    var P = document.createElement('p');
    P.id = "ToggleButtons";
    var Fieldsets = Form.getElementsByTagName('fieldset');
    for(var a=0,l=Fieldsets.length;a<l;a++){
        var Id = ""+Fieldsets[a].id.split("LiveRC_ParamMenu_").join("");
        var Input = document.createElement('input');
        Input.id = "LiveRC_ParamMenuInput_"+Id;
        Input.type = "button";
        Input.setAttribute("style", "padding:0;");
        Input.value = LiveRC_ManageParams_Translate(Id, 1);
        Input.onclick = function(){ LiveRC_ManageParams_ToggleMenu(this); return false;};
        Input.onselect = function(){ LiveRC_ManageParams_ToggleMenu(this); return false;};
        P.appendChild(Input);
    }
    if(lrcUserHasRight("edituserjs")){
        var MSInput = document.createElement('input');
        MSInput.type = "button";
        MSInput.title = "Mise à jour des messages système utilisés";
        MSInput.setAttribute("style", "margin-left:0.5em");
        MSInput.value = lrcManageParamsText["MessagesLegend"];
        MSInput.onclick = function(){ LiveMessages(true); return false;}
        MSInput.onselect = function(){ LiveMessages(true); return false;}
        P.appendChild(MSInput);
    }
    Form.parentNode.insertBefore( P, Form);
}

// Gestion des onglets

function LiveRC_ManageParams_ToggleMenu(Input){
    var Id = false;
    if(Input) Id = Input.id.split("LiveRC_ParamMenuInput_").join("LiveRC_ParamMenu_");
    var Form = document.getElementById("LiveRC_ParamMenuForm");
    var Onglets = document.getElementById("ToggleButtons").getElementsByTagName('input');
    var Fieldsets = Form.getElementsByTagName('fieldset');
    for(var a=0,l=Fieldsets.length;a<l;a++){
        if(Id){
            Onglets[a].setAttribute("style", ((Id == Fieldsets[a].id)? "font-weight:bold;padding:0;" : "padding:0;") );
            Fieldsets[a].style.display = ((Id == Fieldsets[a].id)? "" : "none");
        }else{
            Onglets[a].setAttribute("style", ((a==0)? "font-weight:bold;padding:0;" : "padding:0;") );
            Fieldsets[a].style.display = ((a==0)? "" : "none");
        }
    }
}

// Vérification du menu

function LiveRC_ManageParams_CheckMenu(Input){
    var Menu = document.getElementById("LiveRC_ParamMenu");
    if(!Menu) return;
    lrcDisableLink(Input);
 // Variables
    var FieldSets = Menu.getElementsByTagName('fieldset');
    for(var b=0,m=FieldSets.length;b<m;b++){
        var ArrayName = FieldSets[b].id.split("LiveRC_ParamMenu_").join("");
        if(!LiveRC_Params[ArrayName]) continue;
        var Lis = FieldSets[b].getElementsByTagName('li');
        var Type = Lis[0].getElementsByTagName('input').length;
        for(var a=0,l=Lis.length;a<l;a++){
            var Inputs = Lis[a].getElementsByTagName('input');
            if(Inputs.length==0) continue;
            if(Type>1){   // ------------------------- object
                if(typeof(LiveRC_Params[ArrayName][a])=='undefined'){
                    LiveRC_Params[ArrayName][a] = new Array();
                }
                var NewValue = new Array();
                for(var i=0,il=Inputs.length;i<il;i++){
                    var Input = Inputs[i];
                    var iName = Input.name;
                    var iValue;
                    if(Input.type=="checkbox"){
                        iValue = (Input.checked ? "true" : "false");
                    }else{
                        iValue = lrcEscapeStrHTML(Input.value);
                    }
                    NewValue.push(lrcEscapeStr(iName)+":"+iValue);
                }
                LiveRC_Params[ArrayName][a]["NewValue"] = "{ "+NewValue.join(", ")+" }";
            }else{                // ------------------------- boolean, number, text
                var Input = Inputs[0];
                if(!Input) continue;
                var InputName = Input.name;
                var InputType = Input.type;
                var InputId = Input.id;
                if(InputName){
                    if(InputType=="text"){
                        for(var i=0,j=LiveRC_Params[ArrayName].length;i<j;i++){
                            if(LiveRC_Params[ArrayName][i]["Name"] != InputName) continue;
                            if(LiveRC_Params[ArrayName][i]["ValueType"] == "string") LiveRC_Params[ArrayName][i]["NewValue"] = lrcEscapeStrHTML(Input.value);
                            if(LiveRC_Params[ArrayName][i]["ValueType"] == "number") LiveRC_Params[ArrayName][i]["NewValue"] = parseInt(Input.value);
                        }
                    }
                    if(InputType=="checkbox"){
                        for(var i=0,j=LiveRC_Params[ArrayName].length;i<j;i++){
                            if(LiveRC_Params[ArrayName][i]["Name"] != InputName) continue;
                            LiveRC_Params[ArrayName][i]["NewValue"] = (Input.checked ? "true" : "false");
                        }
                    }
                }
            }
        }
    }
 // Extensions
    var ExtensionsFieldset = document.getElementById("LiveRC_ParamMenu_ExtensionsLegend");
    var Inputs = ExtensionsFieldset.getElementsByTagName('input');
    for(var a=0,l=Inputs.length;a<l;a++){
        var iName = Inputs[a].name;
        if(Inputs[a].checked){
            for(var b=0,m=lrcExtensions.length;b<m;b++){
                var ExtName = lrcExtensions[b]["name"];
                if(ExtName==iName) lrcExtensions[b]["ToInstall"] = true;
            }
        }
    }
    LiveRC_ManageParams_CreateNeA&LaramPage();
}

// Création nouveau script (≠RAZ)

function LiveRC_ManageParams_CreateNeA&LaramPage(Input){
    lrcDisableLink(Input);
    var ParamPage = "// "+lrcManageParamsText["Comment"]+ "\n";
    var Variables = "\n/* ** "+lrcManageParamsText["VariableLegend"] + " ** */\n\n";

    Variables += "function LiveRC_getUserCustom(){\n\n";
    for(var ArrayName in LiveRC_Params){
        var ThisArray = LiveRC_Params[ArrayName];
        if(typeof(ThisArray[0])=="undefined") continue;
        Variables += "  // "+ LiveRC_ManageParams_Translate(ArrayName, 0) +"\n";
        Variables += "try{\n";
        if(ThisArray[0]["Name"] === 0 || ThisArray[0]["Name"] === "0" ){
            var AllValues = new Array()
            for(var i=0,j=ThisArray.length;i<j;i++){
                if(typeof(ThisArray[i]["NewValue"])!="undefined") AllValues.push("\n "+ThisArray[i]["NewValue"]);
            }
            Variables += ArrayName + " = [" + AllValues.join(", ") + "\n];\n";
        }else{
            for(var i=0,j=ThisArray.length;i<j;i++){
                Variables += ArrayName +"[\""+ThisArray[i]["Name"]+"\"] = "+ThisArray[i]["NewValue"] + ";\n";
            }
        }
        Variables += "}catch(e){ }\n\n";
    }
    Variables += "}\n\n";
    //alert(Variables); return;
    try{ eval(Variables); LiveRC_getUserCustom(); }catch(e){ }
    ParamPage += Variables;
    var Extensions = "\n/* ** "+lrcManageParamsText["ExtensionLegend"] + " ** */\n\n"
                     + LiveRC_ExtensionSetupComment;
    var ExtensionList = "";
    for(var ArrayName in lrcExtensions){
        var ThisArray = lrcExtensions[ArrayName];
        if(ThisArray["ToInstall"] === true){
            Extensions += " |"+ThisArray["name"]+"|";
            ExtensionList += "// "+ThisArray["name"]+ " : "+ThisArray["desc"]+"\n"
                           + "importScriptURI('"+ThisArray["url"]+"&action=raw&ctype=text/javascript');\n\n"
        }
    }
    Extensions += "\n\n"+ExtensionList;
    ParamPage += Extensions;
    LiveRC_ManageParams_UpdateParams(ParamPage);
}

// Création nouveau script (RAZ)

function LiveRC_ManageParams_RAZParams(){
    var ParamPage = "// "+lrcManageParamsText["Comment"]+ "\n";
    LiveRC_ManageParams_UpdateParams(ParamPage);
}

// Édition du script

function LiveRC_ManageParams_UpdateParams(NeA&Lage){
    NeA&Lage = NeA&Lage + "\n" + LiveRC_ParamComment;
    var Menu = document.getElementById("LiveRC_ParamMenuForm");
    var P = document.getElementById("LiveRC_ParamMenuRunning");
    if(!P){
        P = document.createElement('p');
        P.id = "LiveRC_ParamMenuRunning";
        Menu.insertBefore(P,Menu.firstChild);
    }
    if(P) P.innerHTML = lrcManageParamsText["EditRunning"].split("$1").join(wgFormattedNamespaces[2]+":"+wgUserName+"/LiveRCparam.js");
    A&Lajax.http({ url: wgServer + wgScript + '?title='+wgFormattedNamespaces[2]+':' + wgUserName.replace(/&/g, "26") + '/LiveRCparam.js&action=edit',
                onSuccess: LiveRC_ManageParams_SaveParams, param:NeA&Lage});
}

// Sauvegarde du script

function LiveRC_ManageParams_SaveParams(Req, data){
    var NeA&Lage = data.param;
    var Temp = document.createElement('div');
    Temp.id = "TempDiv";
    Temp.style.display = "none";
    document.body.insertBefore(Temp, document.body.firstChild);
    Temp.innerHTML = Req.responseText;
    var Textarea = getElementWithId("A&LTextbox1", 'textarea', Temp);
    Textarea.value = NeA&Lage;
    getElementWithId("A&LSummary", 'input', Temp).value = lang_messages.RESUMESTART + lrcManageParamsText["Comment"];
    var P = document.getElementById("LiveRC_ParamMenuRunning");
    if(P) P.innerHTML += "<br />"
                       + lrcManageParamsText["SaveRunning"].split("$1").join(wgFormattedNamespaces[2]+":"+wgUserName+"/LiveRCparam.js");
    var Editform = getElementWithId("editform", 'form', Temp);
    var action = Editform.action;
    var params = new Array();
    var Params = getFormParams(Editform);
    for(var Param in Params){
        params.push(Param+"="+encodeURIComponent(Params[Param]));
    }
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST", headers: headers,
                  onSuccess:LiveRC_ManageParams_SaveParamsDone,
                  data: params.join("&")
    });
    if(Temp) Temp.parentNode.removeChild(Temp);
}

// Script sauvegardé

function LiveRC_ManageParams_SaveParamsDone(Req){
    var P = document.getElementById("LiveRC_ParamMenuRunning");
    if(P) P.innerHTML += "<br />"
                       + lrcManageParamsText["SaveDone"].split("$1").join(wgFormattedNamespaces[2]+":"+ wgUserName+"/LiveRCparam.js" )
                       + "<br/>" + lrcManageParamsText["SaveRefresh"];
}

/* </source>

===== Menu de gestion des contacts =====

<source lang=javascript> */

// Création du menu des contacts

function LiveRC_ManageParams_AddContactListMenu(){
    var Form = document.getElementById("LiveRC_ParamMenuForm");
    if(!Form) return;
    var ContactListFieldset = document.createElement('fieldset');
    ContactListFieldset.id = "LiveRC_ParamMenu_ContactListLegend";
    var ContactListLegend = document.createElement('legend');
    ContactListLegend.appendChild(document.createTextNode(LiveRC_ManageParams_Translate("ContactListLegend", 0)));
    ContactListFieldset.appendChild(ContactListLegend);
    ContactListFieldset.appendChild(LiveRC_ManageParams_CreateContactButtons());
    var ContactListDiv = document.createElement('div');
    ContactListDiv.className = "LiveRC_ParamMenuPart";
    var ContactListUl = document.createElement('ul');
    ContactListUl.id = "LiveRC_ParamMenu_ContactListUL";
    ContactListUl.setAttribute("style", "list-style:none;list-image:none;margin:0;-moz-column-count:3;-webkit-column-count:3;column-count:3;");
    ContactListDiv.appendChild(ContactListUl);
    ContactListFieldset.appendChild(ContactListDiv);
    Form.appendChild(ContactListFieldset);
    for (var user in lstContact) {
        if(!lstContact[user]) continue;
        var P = document.createElement('li');
        addClass(P, "ParamMenuLi");
        var Link = document.createElement('a');
        Link.className = "contact";
        Link.title = user;
        Link.innerHTML = user;
        Link.href= "javascript:liveArticle("+lrcEscapeStr(user)+");";
        P.appendChild(Link);
        P.appendChild(document.createTextNode(" "));
        P.appendChild(LiveRC_ManageParams_AddDeleteLink());
        ContactListUl.appendChild(P);
    }
}

// Création boutons

function LiveRC_ManageParams_CreateContactButtons(){
    var Paragraphe = document.createElement('p');
    var InputAdd = document.createElement('input');
    InputAdd.type = "button";
    InputAdd.value = "Ajouter un contact";
    InputAdd.onclick = function(){ LiveRC_ManageParams_AddNewContact(); };
    InputAdd.onselect = function(){ LiveRC_ManageParams_AddNewContact(); };
    Paragraphe.appendChild(InputAdd);
    var InputOK = document.createElement('input');
    InputOK.type = "button";
    InputOK.value = "OK";
    InputOK.onclick = function(){ LiveRC_ManageParams_CheckContactListMenu(); };
    InputOK.onselect = function(){ LiveRC_ManageParams_CheckContactListMenu(); };
    Paragraphe.appendChild(InputOK);
    var CancelInput = document.createElement('input');
    CancelInput.type = "button";
    CancelInput.value = lrcManageParamsText["Cancel"];
    CancelInput.onclick = function(){ LiveRC_ManageParams_CloseMenu(this); return false;}
    CancelInput.onselect = function(){ LiveRC_ManageParams_CloseMenu(this); return false;}
    Paragraphe.appendChild(CancelInput);
    return Paragraphe;
}

// Ajout d'un contact

function LiveRC_ManageParams_AddNewContact(Name){
    var Ul  = document.getElementById("LiveRC_ParamMenu_ContactListUL");
    if(!Ul) return;
    var P = document.createElement('li');
    addClass(P, "ParamMenuLi");
    var Span = document.createElement('span')
    var Input = document.createElement('input');
    Input.type = "text";
    Input.value = (Name ? Name : "");
    Span.appendChild(Input);
    Input.onkeyup = function(){
          LiveRC_ManageParams_AddNewContact_GetSuggestions(this);
    }
    var Select = document.createElement('select');
    Select.setAttribute('style', 'display:none;')
    Span.appendChild(Select);
    var InputOK = document.createElement('input');
    InputOK.type = "button";
    InputOK.value = "OK";
    InputOK.onclick = function(){ LiveRC_ManageParams_AddThisContact(this); };
    InputOK.onselect = function(){ LiveRC_ManageParams_AddThisContact(this); };
    Span.appendChild(InputOK);
    P.appendChild(Span);
    P.appendChild(document.createTextNode(" "));
    P.appendChild(LiveRC_ManageParams_AddDeleteLink());
    Ul.appendChild(P);
    Input.focus();
}

// Ajout d'un contact (requête suggestions)

function LiveRC_ManageParams_AddNewContact_GetSuggestions(Input){
    if(!Input) return;
    var Select = Input.nextSibling;
    if(!Select) return;
    var User = Input.value;
    if(!User) return;
    var URL = wgServer + wgScriptPath
            + "/api.php?format=xml&action=query&list=allusers"
            + "&auprefix=" + encodeURIComponent(User)
            + "&aulimit=10";
    A&Lajax.http({ url       : URL,
                  onSuccess : LiveRC_ManageParams_AddNewContact_ShowSuggestions,
                  user : User,
                  input : Input,
                  select : Select
    });
}

// Ajout d'un contact (affichage suggestions)

var lrcLiveRC_ManageParams_AddNewContact_ShowSuggestions_ZIndex = 10000;
function LiveRC_ManageParams_AddNewContact_ShowSuggestions(Req, data){
    var TailleListe = 5;
    var xml = Req.responseXML ;
    var Select = data.select;
    var Input = data.input;
    var User = data.user;
    if ( xml == null || !Select || !Input || !User ) return ;
    var titles = new Array () ;
    var pages = xml.getElementsByTagName("u") ;
    for(var i=0;i<pages.length;i++){
        var s = pages[i].getAttribute("name");
        if(titles.indexOf(s)==-1) titles.push(s);
    }
    var suggestion = titles[0];
    if(titles.length==0 || suggestion===Input.value){
        Select.style.display = "none" ;
        return;
    }
    if(titles.length<TailleListe) TailleListe = titles.length;
    Select.style.display = "inline" ;
    Select.size = TailleListe ;
    Select.style.align = "left" ;
    Select.style.zIndex = lrcLiveRC_ManageParams_AddNewContact_ShowSuggestions_ZIndex++ ;
    Select.style.position = "relative" ;
    Select.style.width = Input.offsetWidth + "px" ;
    Select.style.height = (TailleListe * 20) + "px" ;
    while(Select.firstChild) Select.removeChild(Select.firstChild);
    for ( var i = 0 ; i < titles.length ; i++ ) {
         var opt = document.createElement("option");
         var ot = document.createTextNode(titles[i]);
         opt.appendChild(ot) ;
         opt.value = titles[i];
         Select.appendChild(opt) ;
    }
    Select.style.marginTop = "-" + (TailleListe * 20) + "px" ;
    Select.style.marginLeft = "-" + Input.offsetWidth + "px" ;
    Select.onkeyup = lrcLiveRC_ManageParams_AddNewContact_ReplaceSuggestionsKeyPress;
    Select.onclick = lrcLiveRC_ManageParams_AddNewContact_ReplaceSuggestions;
    if(suggestion.indexOf(Input.value)==0){
        var CurrentValueLength = Input.value.length;
        Input.value = suggestion;
        if (Input.createTextRange) {
            var ra = Input.createTextRange();
            ra.moveStart("character", CurrentValueLength);
            ra.moveEnd("character", suggestion.length);
            ra.select();
        } else if( Input.setSelectionRange ) {
            Input.setSelectionRange( CurrentValueLength, suggestion.length );
        } else {
            Input.selectionStart = CurrentValueLength;
            Input.selectionEnd = suggestion.length ;
        }
    }
}

// Ajout d'un contact (sélection suggestion)

function lrcLiveRC_ManageParams_AddNewContact_ReplaceSuggestionsKeyPress(e){
     if (!e) var e = window.event;
     if (e.keyCode != 13) return;
     lrcLiveRC_ManageParams_AddNewContact_ReplaceSuggestions();
}

function lrcLiveRC_ManageParams_AddNewContact_ReplaceSuggestions(){
     var Select = this;
     if(!Select) return;
     var Input = Select.previousSibling;
     if(!Input) return;
     var Options = Select.getElementsByTagName('option');
     for(var a=0;a<Options.length;a++){
          if(Options[a].selected){
               Input.value = Options[a].value;
               Input.focus();
               LiveRC_ManageParams_AddNewContact_GetSuggestions(Input);
               return;
          }
     }
}

// Ajout d'un contact (validation)

function LiveRC_ManageParams_AddThisContact(OK){
    if(!OK) return;
    var Li = OK.parentNode.parentNode;
    if(!Li) return;
    var UserInput = Li.getElementsByTagName('input')[0]
    if(!UserInput) return;
    var User = UserInput.value;
    if(!User) return;
    Li.removeChild(Li.getElementsByTagName('span')[0]);
    var Link = document.createElement('a');
    Link.className = "contact";
    Link.title = User;
    Link.innerHTML = User;
    Link.href= "javascript:liveArticle("+lrcEscapeStr(User)+");";
    Li.insertBefore(Link, Li.firstChild);
}

// Vérification du menu des contacts

function LiveRC_ManageParams_CheckContactListMenu(){
    var Menu = document.getElementById("LiveRC_ParamMenu_ContactListLegend");
    if(!Menu) return;
    var Contacts = getElementsByClass("contact", Menu, "a");
    var ContactList = new Array();
    for(var a=0,l=Contacts.length;a<l;a++){
        var userName = Contacts[a].title;
        ContactList.push(userName);
        if(!lstContact[userName]){
            addWatch(userName , true);
        }
    }
    for(var user in lstContact){
        if(ContactList.indexOf(user)==-1){
            addWatch(user, false);
        }
    }
}
/* </source>

===== Menu de gestion des extensions =====

<source lang=javascript> */

// Création du menu des extensions

function LiveRC_ManageParams_AddExtensionsMenu(){
    var Form = document.getElementById("LiveRC_ParamMenuForm");
    if(!Form) return;
    var ExtensionFieldset = document.createElement('fieldset');
    ExtensionFieldset.id = "LiveRC_ParamMenu_ExtensionsLegend";
    var ExtensionLegend = document.createElement('legend');
    ExtensionLegend.appendChild(document.createTextNode(LiveRC_ManageParams_Translate("ExtensionsLegend", 0)));
    ExtensionFieldset.appendChild(ExtensionLegend);
    ExtensionFieldset.appendChild(LiveRC_ManageParams_CreateActionButtons());
    var ExtensionDiv = document.createElement('div');
    ExtensionDiv.className = "LiveRC_ParamMenuPart";
    var ExtensionUl = document.createElement('ul');
    ExtensionUl.setAttribute("style", "list-style:none;list-image:none;margin:0;");
    ExtensionDiv.appendChild(ExtensionUl);
    ExtensionFieldset.appendChild(ExtensionDiv);
    for(var a=0,l=lrcExtensions.length;a<l;a++){
        var ThisExtension = lrcExtensions[a];
        var P = document.createElement('li');
        addClass(P, "ParamMenuLi");
        var Input = document.createElement('input');
        Input.id = ThisExtension["name"];
        Input.name = ThisExtension["name"];
        Input.type = "checkbox";
        if(ThisExtension["Installed"] && ThisExtension["Installed"]==true) Input.checked = "checked";
        var Label = document.createElement('label');
        Label.setAttribute('for', ThisExtension["name"]);
        Label.innerHTML = '<a href="'+ThisExtension["url"] + '" target="_blank" >'+ThisExtension["name"]+'</a>&nbsp;:&nbsp;' +ThisExtension["desc"];
        P.appendChild(Input);
        P.appendChild(document.createTextNode(" "));
        P.appendChild(Label);
        ExtensionUl.appendChild(P);
    }
    Form.appendChild(ExtensionFieldset);
}

/* </source>

==== Manipulation de classes ====

<source lang="javascript"> */

if(typeof(hasClass)!='function')
function hasClass(node, className){
    var haystack = node.className;
    if(!haystack) return false;
    if (className === haystack) {
        return true;
    }
    return (" " + haystack + " ").indexOf(" " + className + " ") > -1;
}

if(typeof(addClass)!='function')
function addClass(node, className) {
    if (hasClass(node, className)) {
        return false;
    }
    var cache = node.className;
    if (cache) {
        node.className = cache + ' ' + className;
    } else {
        node.className = className;
    }
    return true;
}

if(typeof(removeClass)!='function')
function removeClass(node, className) {
  if (!hasClass(node, className)) {
    return false;
  }
  node.className = node.className.replace(new RegExp('(^|\\s+)'+ className +'($|\\s+)','g'), ' ');
  return true;
}


function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

/* </source>

==== Fenêtre de débogage ====

<source lang="javascript"> */

function lrcDisplayDebug(text){
  var DebugDiv = document.getElementById("debug");
  var DebugUl = document.getElementById("debug_ul");
  var DebugLogo = document.getElementById("debug_Logo");
  var Logo = document.getElementById("lrcLogo");
  var AnimatedLogo = document.getElementById("lrcAnimatedLogo");
  if(!text || text == ""){
    if(Logo && AnimatedLogo){
        Logo.style.display = "";
        AnimatedLogo.style.display = "none";
    }
    if(!lrcParams["DisplayDebug"]) return;
    if(DebugDiv) DebugDiv.style.display = "none";
    if(DebugUl) DebugUl.innerHTML = "";
  }else{
    if(Logo && AnimatedLogo){
        Logo.style.display = "none";
        AnimatedLogo.style.display = "";
    }
    if(!lrcParams["DisplayDebug"]) return;
    if(DebugDiv) DebugDiv.style.display = "block";
    if(DebugUl) DebugUl.innerHTML += '<li>' + text + '</li>';
  }
}

/* </source>

==== Divers ====

<source lang="javascript"> */

function getElementWithId( elementId , elementTagName , elementParentNode ){
      if(!elementParentNode) elementParentNode = document.body;

      if (elementParentNode.getElementById) return elementParentNode.getElementById(elementId);

      var TheElement = false;
      var Elements = elementParentNode.getElementsByTagName(elementTagName);
      var elementcount = 0;
      while(elementcount<Elements.length){
            var Id = Elements[elementcount].getAttribute('id');
            if(Id){
                  if(Id==elementId){
                        TheElement = Elements[elementcount];
                        break;
                  }
            }
            elementcount++
      }
      if (! TheElement) return null;
      return TheElement;
}

function generateNewID() {
  nextFreeID++;
  return "idauto" + nextFreeID;
}

function canRevertUser(user) {
  return user == wgUserName || user == 'Salebot';
}

// HTMLize
String.prototype.htmlize = function() {
  var chars = new Array('&','<','>','"');
  var entities = new Array('amp','lt','gt','quot');
  var string = this;
  for (var i=0; i<chars.length; i++) {
    var regex = new RegExp(chars[i], "g");
    string = string.replace(regex, '&' + entities[i] + ';');
  }
  return string;
}

function lrcEncode(text){
 return encodeURIComponent(text).replace(/%3A/g, ":").replace(/%2F/g, "/");
}

function lrcGetPageURL(page) {
  return wgServer + wgArticlePath.split('$1').join(lrcEncode(page));
}

function lrcGetUglyPageURL(page, params) {
  return wgServer + wgScript + '?title=' + lrcEncode(page)+ (params ? params : "");
}

function lrcGetUserLink(user) {
  var regexpIP = /^\d{1,3}\.\d{1,3}.\d{1,3}.\d{1,3}$/;
  var prefix = wgFormattedNamespaces[2]+":";
  var LiveFunction = "liveArticle("+lrcEscapeStr(prefix+user)+");";
  if (regexpIP.exec(user)) {
    prefix = "Special:Contributions/";
    LiveFunction = "liveContrib("+lrcEscapeStr(user)+");";
  }
  var link = '<a class="lrc_EditorLink" '
           + 'href="' + lrcGetPageURL(prefix + user) + '" '
           + 'onClick="'+LiveFunction+' return false;" '
           + '>' + lrcStripString(user, lrcParams["UserLengthLimit"]) + '</a>';
  return link;
}

/* Returns s such that, when a piece of js code containing s is inserted in the
   property innerHTML of an element, the evaluation of s is the string str. */
function lrcEscapeStr(str) {
  return "'" + (""+str).replace(/\\/g, '\\\\').replace(/'/g, '\\\'').htmlize() + "'";
}
function lrcEscapeStrHTML(str) {
  return "'" + (""+str).replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + "'";
}

function lrcComputeWatchParam(doc) {
  var result;
  if (lrcParams["BypassWatchdefault"]) {
    result = doc.getElementById('ca-unwatch');
  }
  else {
    result = doc.getElementById('A&LWatchthis').checked;
  }
  return result ? "&A&LWatchthis=1" : "";
}

function lrcStripString(string, limit){
  if(!limit || string.length<limit) return string;
  return string.substring(0, limit) + "…";
}

function lrcDisableLink(id) {
  var lnk = document.getElementById(id);
  if(!lnk) return;
  if(!lnk.tagName) return;
  var DisableElementTimer = 2;
  if(lnk.tagName.toLowerCase() == "a"){
    var DisabledLink = document.createElement('a');
    DisabledLink.id = id + "_disabled";
    DisabledLink.title = lnk.title;
    DisabledLink.innerHTML = lnk.innerHTML;
    DisabledLink.href = "javascript:;";
    DisabledLink.style.color = "silver";
    DisabledLink.style.cursor = "default";
    DisabledLink.style.textDecoration = "none";
    lnk.style.display = "none";
    lnk.parentNode.insertBefore(DisabledLink, lnk);
  }else if(lnk.tagName.toLowerCase() == "input" || lnk.tagName.toLowerCase() == "select"){
    lnk.disabled = "disabled";
  }
  setTimeout("lrcEnableLink('"+id+"')", DisableElementTimer*1000);
}

function lrcEnableLink(id, OldHref, OldOnclick, OldColor, OldCursor, OldTextDecoration) {
  var lnk = document.getElementById(id);
  if(!lnk) return;
  if(!lnk.tagName) return;
  var DisableElementTimer = 5;
  if(lnk.tagName.toLowerCase() == "a"){
    var DisabledLink = document.getElementById(id+"_disabled");
    if(!DisabledLink) return;
    DisabledLink.parentNode.removeChild(DisabledLink);
    lnk.style.display = "";
  }else if(lnk.tagName.toLowerCase() == "input" || lnk.tagName.toLowerCase() == "select"){
    lnk.disabled = false;
  }
}

function tsToHhMm(timestamp) {
  var tz = lrcGetTimeZone();
  var regex = new RegExp(/^\d\d\d\d-\d\d-\d\dT(\d\d):(\d\d):\d\dZ$/);
  match = regex.exec(timestamp);
  if (!match) {
    return 'xx:xx';
  }
  var tt = (match[1]*60 + match[2]*1 + tz + 1440) % 1440;
  var mm = tt % 60;
  var hh = (tt - mm) / 60 % 24;
  return hh + ':' + (mm < 10 ? '0' : '') + mm;
}

function lrcGetTimeZone(){
  var tz;
  var match;
  if (lrcParams["TZ"]) {
    var regex = new RegExp(/^([-+])?(\d?\d):?(\d\d)$/);
    match = regex.exec(lrcParams["TZ"]);
    if (!match) {
      return 0;
    }
    tz = match[2]*60 + match[3]*1;
    tz = match[1] == '-' ? -tz : tz;
  } else {
    var now = new Date();
    tz = -now.getTimezoneOffset();
  }
  return tz;
}

function lrcGetArgFromURL(URL, Arg){
  if(!URL || !Arg) return false;
  try{
    var Args = decodeURIComponent(URL).split("&");
    for(var a=0,l=Args.length;a<l;a++){
      if(Args[a].indexOf(Arg+"=")!=-1) return Args[a].split("=")[1];
    }
  }catch(e){
    return false;
  }
  return false;
}

function getNamespaceInfoFromPage(Page, ToReturn){
     if(!ToReturn) ToReturn = false;
     var NamespaceNumber = 0;
     var NamespaceName = "";
     var PageName = Page;
     var Found = false;
     for(var NS in wgFormattedNamespaces){
          if(Found) continue;
          var ThisNamespaceName = wgFormattedNamespaces[NS];
          if(ThisNamespaceName==="") continue;
          var NamespaceNameRegExp = new RegExp("^"+ThisNamespaceName+":", "ig");
          var Matches = Page.match(NamespaceNameRegExp);
          if(Matches!=null && Matches.length == 1){
               NamespaceNumber = parseInt(NS);
               NamespaceName = ThisNamespaceName;
               PageName = Page.replace(NamespaceNameRegExp, "");
               Found = true;
          }
     }
     if(ToReturn==="NamespaceName") return NamespaceName;
     if(ToReturn==="PageName") return PageName;
     return NamespaceNumber;
}

if(typeof(getTextContent)!='function'){
  function getTextContent(oNode) {
    if(!oNode) return null;
    if (typeof(oNode.textContent)!="undefined") {return oNode.textContent;}
    switch (oNode.nodeType) {
      case 3: // TEXT_NODE
      case 4: // CDATA_SECTION_NODE
        return oNode.nodeValue;
        break;
      case 7: // PROCESSING_INSTRUCTION_NODE
      case 8: // COMMENT_NODE
        if (getTextContent.caller!=getTextContent) {
          return oNode.nodeValue;
        }
        break;
      case 9: // DOCUMENT_NODE
      case 10: // DOCUMENT_TYPE_NODE
      case 12: // NOTATION_NODE
        return null;
        break;
    }
    var _textContent = "";
    oNode = oNode.firstChild;
    while (oNode) {
      _textContent += getTextContent(oNode);
      oNode = oNode.nextSibling;
    }
    return _textContent;
  }
}

/* </source>

=== Fonctions d'initialisation ===

==== Activation ====

<source lang="javascript"> */


function LiveRC_Init() {
  if (wgPageName == LiveRC_PageTitle && (wgAction=="view"||wgAction=="purge")) {

    // Get Site params
    if(typeof(LiveRC_getSiteCustom)==="function") try{ LiveRC_getSiteCustom(); }catch(e){ }

    // Get User params
    if(typeof(LiveRC_getUserCustom)==="function") try{ LiveRC_getUserCustom(); }catch(e){ }

    // Check LiveRC version
    var VersionContainer = document.getElementById("currentVersion");
    if(VersionContainer){
        var validatedVersion = '<span style="color:green;font-weight:bold">'+LiveRC_Version+'</span>';
        if(VersionContainer.innerHTML == LiveRC_Version){
            VersionContainer.innerHTML = validatedVersion;
        } else if (VersionContainer.innerHTML == validatedVersion) {
            VersionContainer.parentNode.innerHTML += '<br/>'+lang_messages.ALREADY_RUNNING;
        }else{
            VersionContainer.parentNode.innerHTML += '<br/>'+lang_messages.NEW_VERSION.split("$1").join(LiveRC_Version);
        }
    }
    // Update positions
    lrcFixPosition();
    // Set buttons
    lrcMakeButtons();
    // Set clocks
    lrcSetClocks();
    // Set resize zones
    LiveRC_setResizeZones();
    lrcInitTableHeight();
    // Update icons
    for(var Icon in lrcIcon){
      var IconContainer = document.getElementById("lrcIcon_"+Icon);
      if(!IconContainer) continue;
      IconContainer.innerHTML = lrcIcon[Icon];
    }
    // Start
    lrcDisplayDebug("Get extensions");
    A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=revisions&rvlimit=1&rvprop=ids&titles=User:'+encodeURIComponent(wgUserName) + "/LiveRCparam.js",
                 onSuccess: LiveRC_ManageParams_GetOldParamsOldid});
    lrcDisplayDebug("Get user rights");
    A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?action=query&meta=userinfo&uiprop=rights&format=xml',
                onSuccess: getRights});
  }
  // Add LiveRC link in left panel
  var RCLi = document.getElementById("n-recentchanges");
  if(RCLi){
    var LiveRCLi = document.createElement('li');
    LiveRCLi.id = 'n-liveRC';
    var LiveRCLink = document.createElement('a');
    LiveRCLink.title = 'LiveRC';
    LiveRCLink.href = wgServer+wgArticlePath.split("$1").join(encodeURIComponent(LiveRC_PageTitle));
    LiveRCLink.appendChild(document.createTextNode('LiveRC'));
    LiveRCLi.appendChild(LiveRCLink);
    RCLi.parentNode.insertBefore(LiveRCLi,RCLi.nextSibling);
    if((wgNamespaceNumber==2 || wgNamespaceNumber==3) && wgPageName.indexOf('/') == -1 ){
        A&Lajax.http({url : wgServer + wgScriptPath
                         + '/api.php?format=xml&action=query&prop=info&inprop=watched&titles=' + encodeURIComponent("LiveRCWatch:" + wgTitle),
                     onSuccess : LiveWatchInitButton
        });
    }
  }
}
addOnloadHook(LiveRC_Init);

/* </source>

==== Récupération des droits utilisateur ====

<source lang="javascript"> */

function getRights(xmlreq, data) {
  var api = xmlreq.responseXML;

  if (api.firstChild.nodeName == "error") return;

  var rights = api.getElementsByTagName('query')[0].getElementsByTagName('userinfo')[0].getElementsByTagName('rights')[0].getElementsByTagName('r');
  var len = rights.length;
  var i;
  var id,right;

  for (i=0; i<len; i++) {
    right = rights[i].textContent;
    // Handle IE
    if (!right) right = rights[i].text;

    if(right) lrcUserRights.push(right);
  }
  if(lrcUserHasRight("apihighlimits")) lrcAPIlimit = 4999;
  LiveMessages();
}

function lrcUserHasRight(Right){
  return (lrcUserRights.indexOf(Right)!=-1);
}

/* </source>

==== Récupération des messages système ====

<source lang="javascript"> */

function LiveMessages(update){
  var lrcMissingMessages = new Array();
  if(update){
    for(var MessageName in lrcMediawikiMessages){
        lrcMissingMessages.push(MessageName);
    }
  }else{
    for(var a=0,l=lrcNeededMessages.length;a<l;a++){
      if(typeof(lrcMediawikiMessages[lrcNeededMessages[a]])=="undefined") lrcMissingMessages.push(lrcNeededMessages[a]);
    }
  }
  if(lrcMissingMessages.length>0){
    lrcDisplayDebug("Get system messages");
    A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=query&meta=allmessages&ammessages='+lrcMissingMessages.join('|')+'&format=xml',
                  onSuccess: getAllmessages,
                  updateMode:(update ? true : false)
               });
  }else if(!update){
    getDisambiguationTemplates();
    buildControlBar();
  }
}

function getAllmessages(xmlreq, data){
  var api = xmlreq.responseXML;
  if (api.firstChild.nodeName == "error") return;
  var messages = api.getElementsByTagName('message');
  for(var a=0,l=messages.length;a<l;a++){
    var MessageName = messages[a].getAttribute('name');
    var MessageValue = (messages[a].firstChild ? messages[a].firstChild.nodeValue : "");
    lrcMediawikiMessages[MessageName] = MessageValue;
  }
  if(data.updateMode===true){
    lrcDisplayDebug("Save system messages");
    UpdateAllmessages();
  }else{
    buildControlBar();
    getDisambiguationTemplates();
  }
}

function UpdateAllmessages(){
    var Messages = "\n/* ** "+lrcManageParamsText["MessagesLegend"] + " ** */\n\n";
    for(var MessageName in lrcMediawikiMessages){
        Messages += "lrcMediawikiMessages[\""+MessageName+"\"] = "
                  + lrcEscapeStrHTML(lrcMediawikiMessages[MessageName].split('\n').join("")) + ";\n";
    }
    A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=edit&inprop=protection&titles='+encodeURIComponent(LiveRC_MessagesPage),
                onSuccess: UpdateAllmessagesRunning, messages: Messages});
}

function UpdateAllmessagesRunning(Req, data){
    var EditParam = new Array();
    var Page = Req.responseXML.getElementsByTagName("page")[0];
    EditParam["token"] = encodeURIComponent(Page.getAttribute("edittoken"));
    EditParam["text"] = encodeURIComponent(data.messages);
    EditParam["summary"] = encodeURIComponent(lang_messages.RESUMESTART+lang_messages.UPDATEMESSAGES);
    EditParam["title"] = encodeURIComponent(LiveRC_MessagesPage);
    EditParam["watchlist"] = "preferences";
    if(lrcParams["BypassWatchdefault"]) EditParam["watchlist"] = "nochange";

    var Params = new Array();
    for(var Param in EditParam){
        Params.push(Param+"="+EditParam[Param]);
    }
    Params = Params.join("&");
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?action=edit',
                  method: "POST", headers: headers,
                  onSuccess:UpdateAllmessagesDone,
                  data: Params
    });
}

function UpdateAllmessagesDone(Req, data){
    lrcDisplayDebug("");
}

/* </source>

==== Listage des modèles d'homonymie ====

<source lang="javascript"> */

function getDisambiguationTemplates(){
  lrcDisplayDebug("Get disambiguation templates")
  var DisambiguationPage = lrcMediawikiMessages["disambiguationspage"];
  var Reg = new RegExp("\\[\\[[^\\]]+\\]\\]", "g");
  var AllLinks = DisambiguationPage.match(Reg);
  if(AllLinks==null) return;
  for(var a=0,l=AllLinks.length;a<l;a++){
    var ThisLink = AllLinks[a].split("[[").join("").split("]]").join("");
    if(getNamespaceInfoFromPage(ThisLink)!=10) continue;
    lrcHomonTemplates.push(ThisLink);
  }
  buildAskForSysopCreateReasons();
}

/* </source>

==== Création du menu de contrôle ====

<source lang="javascript"> */
function buildControlBar(){
  lrcDisplayDebug("Create control bar");
  var showIPNEWopt = "";
  if (lrcUserHasRight("autopatrol")) {
    showIPNEWopt = '<option value="IPNEW">' + lang_menu.IPNEW + '</option>'
  }

  var lvPreviewFoot = document.getElementById( 'livePreviewFoot' );
  var TR = lvPreviewFoot.getElementsByTagName('tr')[0];
  if(!TR) return;
  while(TR.firstChild){ TR.removeChild(TR.firstChild); }

  var SupprLigneForm = ''
    + '<form id="SupprLigneForm">'
    + '<input type="button" '
    + 'onclick="supprLigne(\'*\'); return false;" '
    + 'onselect="supprLigne(\'*\'); return false;" '
    + 'style="color: red; font-weight: bold;" '
    + 'title="'+lang_tooltips.HIDE_ALL+'" value="X" />'
    + '|'
    + '<input type="button" '
    + 'onclick="supprLigne(\'d\'); return false;" '
    + 'onselect="supprLigne(\'d\'); return false;" '
    + 'style="color: rgb(255, 235, 71); font-weight: bold;" '
    + 'title="'+lang_tooltips.HIDE_REVIEWED+'" value="X" />'
    + '<input type="button" '
    + 'onclick="supprLigne(\'r\'); return false;" '
    + 'onselect="supprLigne(\'r\'); return false;" '
    + 'style="color: rgb(255, 99, 83); font-weight: bold;" '
    + 'title="'+lang_tooltips.HIDE_REVERTS+'" value="X" />'
    + '<input type="button" '
    + 'onclick="supprLigne(\'n\'); return false;" '
    + 'onselect="supprLigne(\'n\'); return false;" '
    + 'style="color: rgb(178, 243, 113); font-weight: bold;" '
    + 'title="'+lang_tooltips.HIDE_NEW+'" value="X" />'
    + '<input type="button" '
    + 'onclick="supprLigne(\'c\'); return false;" '
    + 'onselect="supprLigne(\'c\'); return false;" '
    + 'style="color: white; font-weight: bold;" '
    + 'title="'+lang_tooltips.HIDE_BLANKING+'" value="X" />'
    + '</form>';
  AddButtonToControlBar(SupprLigneForm, false);

  var PreviewNavigationForm = ''
    + '<form id="PreviewNavigationForm">'
    + '<span id="historyPanel"></span>'
    + '<input id="btnNext" type="button" onclick="goNext();" onselect="goNext();" '
    + 'title="' + lang_tooltips.NEXTDIFF_TIP + '" value="' + lang_menu.NEXTDIFF + '" '
    +'style="padding:0;" />'
    + '</form>';
  AddButtonToControlBar(PreviewNavigationForm, true);

  var StopForm = ''
    + '<form id="StopForm">'
    + '<input id="stopLive"  type="checkbox" value="true" '+(lrcOptionMenuValues.Stop ? 'checked="checked"':'')+'/>'
    + '<label for="stopLive" title="' + lang_tooltips.PAUSE_TIP + '" >' + lang_menu.PAUSE   + '</label>'
   + '</form>';
  AddButtonToControlBar(StopForm, true);

  var DiffRForm = ''
    + '<form id="DiffRForm">'
    + '<input id="showDiffR" type="checkbox" '+(lrcOptionMenuValues.Diff ? 'checked="checked"':'')+'/>'
    + '<label for="showDiffR" title="' + lang_tooltips.DIFFR_TIP + '">'+ lang_menu.LOWDIFF + '</label>'
    + '</form>';
  AddButtonToControlBar(DiffRForm, true);

  var ModeSelectionForm = ''
    + '<form id="ModeSelectionForm">'
    + '<span title="' + lang_tooltips.SHOWRC_TIP + '">'
    + '<input id="showRC" type="checkbox" '+(lrcOptionMenuValues.RC ? 'checked="checked"':'')+' />'
    + '<label for="showRC">' + lang_menu.RCLABEL  + ' </label>'
    + '</span>'
    + '<span title="' + lang_tooltips.SHOWLOG_TIP + '">'
    + '<input id="showLog"    type="checkbox" '+(lrcOptionMenuValues.Log ? 'checked="checked"':'')+'/>'
    + '<label for="showLog">'   + lang_menu.LOGSHOW  + ' </label>'
    + '</span>'
    + '<span title="' + lang_tooltips.SHOWFILTER_TIP + '">'
    + '<input id="showFilter"    type="checkbox" '+(lrcOptionMenuValues.Filter ? 'checked="checked"':'')+'/>'
    + '<label for="showFilter">'   + lang_menu.ABSHOW  + '</label>'
    + '</span>'
    + '</form>';
  AddButtonToControlBar(ModeSelectionForm, true);

  var UserTypeForm = ''
    + '<form id="UserTypeForm">'
    + '<select id="showUsers" title="' + lang_tooltips.SHOWUSERS_TIP + '">'
     +'<option value="RESTMODE">' + lang_menu.RESTMODE + '</option>'
     + '<option value="IPONLY">' + lang_menu.IPONLY + '</option>'
     + showIPNEWopt
     + '<option value="ALLUSERS">' + lang_menu.ALLUSERS + '</option>'
     + '<option value="ALLNBOTS">' + lang_menu.ALLNBOTS + '</option>'
    + '</select>'
    + '</form>';
  AddButtonToControlBar(UserTypeForm, true);

  var NamespaceForm = ''
    + '<form id="NamespaceForm">'
    + '<span id="selectNS" title="' + lang_tooltips.SHOWNS_TIP + '"></span>'
    + '</form>';
  AddButtonToControlBar(NamespaceForm, true);

  // Apply options
  if(lrcOptionMenuValues.Lists) lrcToggleLiveFollow();
  if(lrcOptionMenuValues.Tchat) buildTchatWindow();
  if(lrcOptionMenuValues.Preview) lrcTogglePreview();
  updateRCTypeSelect();
  updatePreviewWindowAttributes();
  buildHistoryPanel();

  LiveRC_RunHooks("AfterOptions");
  liveNS();
}


function updateRCTypeSelect(){
  var RCTypeSelector = document.getElementById("showUsers")
  var RCTypeOptions = RCTypeSelector.getElementsByTagName('option');
  var OptionsSet = false;
  for(var a=0,l=RCTypeOptions.length;a<l;a++){
    if(RCTypeOptions[a].value == lrcOptionMenuValues.RCType) RCTypeOptions[a].selected = "selected";
  }
  if(!OptionsSet){
    lrcOptionMenuValues.RCType == "ALLUSERS";
    if(lrcUserHasRight("autopatrol")) lrcOptionMenuValues.RCType = "IPNEW";
    RCTypeSelector = lrcOptionMenuValues.RCType;
  }
}

function updateNSSelect(){
  var Select = document.getElementById("showNS0");
  var OptionsNS = Select.getElementsByTagName('option');
  for(var a=0,l=OptionsNS.length;a<l;a++){
    if(OptionsNS[a].value === lrcOptionMenuValues.RCns || parseInt(OptionsNS[a].value) === lrcOptionMenuValues.RCns){
      Select.value = lrcOptionMenuValues.RCns;
    }
  }
}

function AddButtonToControlBar(Button, AddSeparator){
  if(!Button) return;
  var ControlBar = document.getElementById("livePreviewFoot");
  if(!ControlBar) return;
  var Line = ControlBar.getElementsByTagName('tr')[0];
  if(!Line) return;
  if(AddSeparator){
    var Separator = document.createElement('td');
    Separator.valign = "middle";
    addClass(Separator, "noHover");
    Separator.innerHTML = "&bull;";
    Line.appendChild(Separator);
  }
  var NewTD = document.createElement('td');
  NewTD.valign = "middle";
  Line.appendChild(NewTD);
  if(typeof(Button)=="string"){
    NewTD.innerHTML = Button;
  }else if(typeof(Button)=="object"){
    NewTD.appendChild(Button);
  }
}

/* </source>

==== Récupération des espaces de noms ====

<source lang="javascript"> */

function liveNS() {
  lrcDisplayDebug("Get namespaces names");
  if(typeof(wgFormattedNamespaces)!="undefined"){
    var ns;
    var options = "";
    var lstNs = new Array();
    for (var id in wgFormattedNamespaces) {
      ns = wgFormattedNamespaces[id];
      if (id < 0) continue;
      if (id == 0) ns = lang_main_namespace;
      options += '<option value="' + id + '">' + ns + '</option>';
      lstNs.push(id);
    }
    options = '<option value="' + lstNs.join('|') + '">*</option>' + options;
    document.getElementById('selectNS').innerHTML = '<label for="showNS0">'+lang_menu.NAMESP+' </label><select id="showNS0">' + options + '</select>';
    updateNSSelect();
    liveSysop();
  }else{
    A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?action=query&meta=siteinfo&siprop=namespaces&format=xml',
                 onSuccess: getNS, message: "Pobieranie nazw przestrzeni" });
  }
}

function getNS(xmlreq, data) {
  var api = xmlreq.responseXML;

  if (api.firstChild.nodeName == "error") return;

  var nss = api.getElementsByTagName('query')[0].getElementsByTagName('namespaces')[0].getElementsByTagName('ns');
  var len = nss.length;
  var i;
  var id,ns;
  var options = "";
  var lstNs = new Array();
  var lstNsName = new Array();

  for (i=0; i<len; i++) {
    id = nss[i].getAttribute('id');
    ns = nss[i].textContent;
    // Handle IE
    if (!ns)  ns = nss[i].text;

    if (id < 0) continue;
    lstNsName.push(ns);
    lstNs.push(id);
    if (id == 0) ns = lang_main_namespace;
    options += '<option value="' + id + '">' + ns + '</option>';

  }
  if(typeof(wgFormattedNamespaces)=="undefined"){
    wgFormattedNamespaces = new Array();
    for(var a=0,l=lstNs.length;a<l;a++){
        wgFormattedNamespaces[lstNs[a]] = lstNsName[a];
    }
  }
  options = '<option value="' + lstNs.join('|') + '">*</option>' + options;
  document.getElementById('selectNS').innerHTML = '<label for="showNS0">'+lang_menu.NAMESP+' </label><select id="showNS0">' + options + '</select>';
  updateNSSelect();
  liveSysop();
}

/* </source>

==== Récupération de la liste des administrateurs ====

<source lang="javascript"> */

function liveSysop() {
  lrcDisplayDebug("Get sysop names");
  A&Lajax.http({url:wgServer + wgScriptPath + '/api.php?action=query&list=allusers&augroup=sysop&aulimit=' +lrcAPIlimit +'&format=xml', onSuccess: getSysop, message: "Traitement en cours...\n\n" });
  if (lrcParams["LoadWatchlist"]) {
    liveWatch(false);
  } else {
    liveRC();
    loadBlocks(false);
  }
}

function getSysop(xmlreq, data) {
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];
  if (api.firstChild.nodeName == "error") return;
  var rcs = api.getElementsByTagName('query')[0].getElementsByTagName('allusers')[0].getElementsByTagName('u');
  leni=rcs.length;
  for (i=leni-1; i>=0; i--) {
    lstSysop.push(rcs[i].getAttribute('name'));
  }
}

/* </source>

==== Récupération de la liste de suivi ====

<source lang="javascript"> */

function liveWatch(reload) {
  lrcDisplayDebug("Get watchlist");
  A&Lajax.http({url:wgServer + wgScriptPath + '/api.php?action=query&list=watchlistraw&wrlimit=' +lrcAPIlimit +'&format=xml',
               onSuccess: getWatch,
               reload:(reload ? reload : false),
               suivi:new Array(),
               contact:new Array()
  });
}

function getWatch(xmlreq, data) {
  var lstContact_Temp = data.contact;
  var lstSuivi_Temp = data.suivi;
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];
  var clPrefix = 'LiveRCWatch:';
  if (api.firstChild.nodeName == "error") return;
  var rcs = api.getElementsByTagName('watchlistraw')[0].getElementsByTagName('wr');
  leni=rcs.length;
  for (i=0; i<leni; i++) {
    var article = rcs[i].getAttribute('title');
    if (article.substr(0, clPrefix.length) == clPrefix) {
      var userName = article.substr(clPrefix.length);
      lstContact_Temp[userName] = {ts: 0, fromjs: false};
    } else {
      lstSuivi_Temp[article] = "--:--";
    }
  }
  var wc1=api.getElementsByTagName('query-continue')[0];
  if (wc1){
    var wrcontinue=wc1.getElementsByTagName('watchlistraw')[0].getAttribute('wrcontinue');
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&list=watchlistraw'
            + '&wrlimit=' +lrcAPIlimit
            + '&wrcontinue=' + encodeURIComponent(wrcontinue);
    A&Lajax.http({url:URL,
        onSuccess: getWatch,
        reload:reload,
        suivi:lstSuivi_Temp,
        contact:lstContact_Temp
    });
  }else{
    var reload = data.reload;
    if(!reload){
      lstSuivi = lstSuivi_Temp;
      lstContact = lstContact_Temp;
      liveRC();
      loadBlocks(false);
    }else{
      for(var user in lstContact_Temp){
        if(!lstContact.hasOwnProperty(user) && lstContact_Temp.hasOwnProperty(user)) lstContact[user] = lstContact_Temp[user];
      }
      for(var user in lstContact){
        if(lstContact.hasOwnProperty(user)  && !lstContact_Temp.hasOwnProperty(user)) delete lstContact[user];
      }
      delete lstContact_Temp;
      for(var user in lstSuivi_Temp){
        if(!lstSuivi.hasOwnProperty(user) && lstSuivi_Temp.hasOwnProperty(user)) lstSuivi[user] = lstSuivi_Temp[user];
      }
      for(var user in lstSuivi){
        if(lstSuivi.hasOwnProperty(user)  && !lstSuivi_Temp.hasOwnProperty(user)) delete lstSuivi[user];
      }
      delete lstSuivi_Temp;
    }
    clearTimeout(lrcTimeout["Watchlist"]);
    lrcTimeout["Watchlist"] = setTimeout("liveWatch(true);", lrcParams["ReloadList"]*1000);
  }
}

/* </source>

==== Récupération des derniers blocages ====

<source lang="javascript"> */

function loadBlocks(reload) {
  if (lrcParams["LoadIPCat"]) {
    lrcDisplayDebug("Get blocked users");
    var blocksLimit = 1000;
    var queryLimit = Math.min(lrcAPIlimit, blocksLimit);
    A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?action=query&list=logevents&letype=block&lelimit=' + queryLimit + '&format=xml',
                 onSuccess: readBlocks,
                 remaining: blocksLimit - queryLimit,
                 reload:reload,
                 blocked:new Array()
    });
  }
}

function readBlocks(xmlreq, data) {
  var logevents = xmlreq.responseXML.getElementsByTagName('logevents')[0];
  if (typeof(logevents) == 'undefined') return;
  var lstBlocks_Temp = data.blocked;
  lst = logevents.childNodes;
  for (var i = 0; i < lst.length; i++) {
    if (lst[i].getAttribute('action') == 'block') {
      var user = lst[i].getAttribute('title');
      if (user != null) {
        user = user.substr(user.indexOf(':') + 1);
        lstBlocks_Temp[user] = 1;
      }
    }
  }
  if (data.remaining > 0) {
    var queryLimit = Math.min(lrcAPIlimit, data.remaining);
    var lestart = xmlreq.responseXML.getElementsByTagName('query-continue')[0].firstChild.getAttribute('lestart');
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&list=logevents&letype=block'
            + '&lelimit=' + queryLimit
            + '&lestart=' + encodeURIComponent(lestart);
    A&Lajax.http({url: URL,
                 onSuccess: readBlocks,
                 remaining: data.remaining - queryLimit,
                 blocked:lstBlocks_Temp
    });
  } else {
    lstBlocks = lstBlocks_Temp;
    setTimeout("loadBlocks(true);", lrcParams["ReloadList"]*1000);
    if(data.reload) loadUsersInCats(watchCategories);
  }
}

/* </source>

==== Récupération des catégories d'utilisateurs ====

<source lang="javascript"> */

function loadUsersInCats(watchCategories) {
  lrcDisplayDebug("Get category members");
  for (var i = 0 ; i < watchCategories.length; i++) {
    A&Lajax.http({url: wgServer + wgScriptPath
                    + '/api.php?format=xml&action=query&list=categorymembers'
                    + '&cmlimit=' + lrcAPIlimit
                    + '&cmtitle=' + encodeURIComponent(watchCategories[i].category),
                 onSuccess: fillUserCat,
                 wcIndex: i,
                 category:watchCategories[i].category
    });
  }
}

function fillUserCat(xmlreq,data) {
  var cats = xmlreq.responseXML.getElementsByTagName('cm');
  for (var a = 0; a < cats.length; a++) {
    var ns = parseInt(cats[a].getAttribute('ns'));
    if (ns == 3) {
      var title = cats[a].getAttribute('title').split(wgFormattedNamespaces[3]+":").join("");
      lstUserCat[title] = data.wcIndex;
    }else{
      continue;
    }
  }
  var cmcontinue="";
  if (xmlreq.responseXML.getElementsByTagName('query-continue')[0]) {
    cmcontinue = xmlreq.responseXML.getElementsByTagName('query-continue')[0].getElementsByTagName('categorymembers')[0].getAttribute('cmcontinue');
    var URL = wgServer + wgScriptPath
            + '/api.php?format=xml&action=query&list=categorymembers'
            + '&cmlimit=' + lrcAPIlimit
            + '&cmtitle=' + encodeURIComponent(data.category)
            + '&cmcontinue=' + encodeURIComponent(cmcontinue)
    A&Lajax.http({url: URL,
                 onSuccess: fillUserCat,
                 wcIndex: data.wcIndex,
                 category:data.category
    });
  }
}

/* </source>

=== Fonctions de mise à jour des modifications récentes ===

==== Lancement de la requête de mise à jour ====

<source lang="javascript"> */

function liveRC() {
  if (document.getElementById('stopLive').checked){
    lrcDisplayDebug("");
    clearTimeout(lrcTimeout["RCRequest"]);
    lrcTimeout["RCRequest"] = setTimeout("liveRC()",1000);
     LiveRC_RequestError = 0;
    return;
  }
  lrcDisplayDebug("Get RC");
  clearTimeout(lrcTimeout["RCRequest"]);
  lrcTimeout["RCRequest"] = setTimeout("LiveRC_RequestError++; if(LiveRC_RequestError>4){ document.getElementById('stopLive').checked = 'checked'; }; liveRC(); ",(lrcParams["Refresh"]+30)*1000);

  var HookResult = LiveRC_RunHooks("BeforeRC");
  if(!HookResult) return;

  var rcns = document.getElementById('showNS0').value;
  if (rcns == null) return;

  var withFilters = document.getElementById('showFilter').checked;

  var URL = wgServer + wgScriptPath
    + '/api.php?action=query&list=recentchanges|logevents' + (withFilters ? '|abuselog&aflprop=ids|filter|user|title|action|result|timestamp|hidden' : '') + '&rcnamespace=' + rcns
    + '&rcprop=user|comment|parsedcomment|flags|timestamp|title|ids|sizes|tags' + (lrcUserHasRight("autopatrol") ? '|patrolled' : '')
    + (document.getElementById("showUsers").value != "ALLNBOTS" ? '&rcshow=!bot' : '')
    + '&rcend=' + lastrctimestamp + '&rclimit=' + lrcParams["RCLimit"]
    + '&leend=' + lastletimestamp + '&lelimit=' + lrcParams["RCLimit"]
    + (withFilters ? '&aflend=' + lastfiltertimestamp + '&afllimit=' + lrcParams["RCLimit"] : '')
    + '&format=xml';

  A&Lajax.http({url:URL, onSuccess:getRC, message:lang_tooltips.WORKING, nsfilter:rcns , withFilters:withFilters});
}

/*</source>

==== Récupération de la requête de mise à jour ====

<source lang="javascript"> */

function getRC(xmlreq, data) {
  if (document.getElementById('stopLive').checked){
    lrcDisplayDebug("");
    clearTimeout(lrcTimeout["RCRequest"]);
    lrcTimeout["RCRequest"] = setTimeout("liveRC()",1000);
    return;
  }
  var NSFilter = data.nsfilter;
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (api.firstChild.nodeName == "error") return;

  var query = api.getElementsByTagName('query')[0];

  var rcs = query.getElementsByTagName('recentchanges')[0].getElementsByTagName('rc');
  var i,j,leni,lenj,rc;

  goNext(2); // Set lrcAllLinesSeen if we need to preload a line after the function completes.

  leni=rcs.length;
  for (i=leni-1; i>=0; i--) {
    // Using rcid as revid can be 0 (e.g. when moving a page)
    if (rcs[i].getAttribute('rcid') <= lastrcid) continue;

    rc = new Object();
    rc.state = new Array();
    lenj = rcs[i].attributes.length;
    for (j=0; j<lenj; j++) {
      switch(rcs[i].attributes[j].name) {
        case 'anon':
          rc.state = lrcAddState(rc.state, "IP");
          break;
        case 'bot':
          rc.state = lrcAddState(rc.state, "BOT");
          break;
        case 'new':
          rc.state = lrcAddState(rc.state, "NEW");
          break;
        case 'minor':
          rc.state = lrcAddState(rc.state, "MINOR");
          break;
        case 'new_ns':
          rc.state = lrcAddState(rc.state, "NEWNS");
          break;
        case 'new_title':
          rc.state = lrcAddState(rc.state, "RENAMED");
          break;
        case 'patrolled':
          rc.state = lrcAddState(rc.state, "PATROLLED");
          break;
        case 'type':
          break;
        default:
          rc[rcs[i].attributes[j].name] = rcs[i].attributes[j].value;
          break;
      }
    }

    var tags = rcs[i].getElementsByTagName('tags')[0].getElementsByTagName('tag');
    if (tags.length) {
      rc.state = lrcAddState(rc.state, "TAG");
      rc.tags = tags;
    }

    if (typeof(rc.comment) != "undefined") {
      lenj = commenttests.length;
      for (j=0; j<lenj; j++)
        if (new RegExp(commenttests[j].regex).test(rc.comment))
          rc.state = lrcAddState(rc.state, commenttests[j].state);
    }

    if (rc.newlen == 0) rc.state = lrcAddState(rc.state, "BLANKING");

    if (lstSysop.indexOf(rc.user) != -1)
      rc.state = lrcAddState(rc.state, "SYSOP");

    var mitigating = (lrcHasState(rc.state, "REVERT"))
      || (lrcHasState(rc.state, "BLANKING"))
      || (lrcHasState(rc.state, "REPLACED"))
      || (lrcHasState(rc.state, "TAG"))
      || lstContact[rc.user]
      || (lstRevoc[rc.user])
      || (rc.user == wgUserName)
      || (lrcParams["WLAllChanges"] && lstSuivi.indexOf(rc.title) != -1);

    if (!mitigating) {
      if (document.getElementById("showUsers").value == "RESTMODE") continue;
      if (document.getElementById("showUsers").value == "IPONLY" && !(lrcHasState(rc.state, "IP"))) continue;
      if (document.getElementById("showUsers").value == "IPNEW" && (lrcHasState(rc.state, "PATROLLED"))) continue;
    }

    if ((typeof(rc.logtype) != "undefined") && rc.logtype == "newuser") continue;

    if (lstHidden[rc.user]) continue;

    if (lrcParams["LoadCatAndTemplates"]) {
      A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?titles=' + encodeURIComponent(rc.title) + '&action=query&prop=categories|templates&cllimit='+lrcAPIlimit+'&clprop=hidden&tllimit='+lrcAPIlimit+'&redirects&format=xml',
                   onSuccess: getRedirCat, rc: rc });
    } else {
      getRevision(rc);
    }
  }

  // Log
  var logs = query.getElementsByTagName('logevents')[0].getElementsByTagName('item');
  var i,j,leni,lenj,log;

  leni=logs.length;
  for (i=leni-1; i>=0; i--) {
    if (logs[i].getAttribute('logid') <= lastlogid) continue;
    log = new Object();
    log.state = 0;

    lenj = logs[i].attributes.length;
    for (j=0; j<lenj; j++) {
        if (logs[i].attributes[j].name == 'type')
        {
          switch(logs[i].attributes[j].value) {
            case 'patrol':
            log.state = lrcAddState(log.state, "PATROL");
              break;
            case 'newusers':
              log.state = lrcAddState(log.state, "NEWUSER");
              break;
            case 'upload':
              log.state = lrcAddState(log.state, "UPLOAD");
              break;
            case 'block':
              log.state = lrcAddState(log.state, "BLOCK");
              if (logs[i].firstChild)
                log.duration = logs[i].firstChild.attributes[1].value;
              break;
            case 'delete':
              log.state = lrcAddState(log.state, "DELETE");
              break;
            case 'move':
              log.state = lrcAddState(log.state, "MOVE");
              if (logs[i].firstChild)
                log.new_title = logs[i].firstChild.attributes[1].value;
            case 'protect':
              log.state = lrcAddState(log.state, "PROTECT");
              break;
            case 'review':
              log.state = lrcAddState(log.state, "REVIEW");
              break;
            default:
              break;
          }
        }
        else
          log[logs[i].attributes[j].name] = logs[i].attributes[j].value;

        //Set a dummy revid to prevent deletion
        log.revid=log.logid;
    }

    if (typeof(log.comment) != "undefined") {
      lenj = commenttests.length;
      for (j=0; j<lenj; j++)
        if (new RegExp(commenttests[j].regex).test(log.comment))
          log.state = lrcAddState(log.state, commenttests[j].state);
    }

    if (lstSysop.indexOf(log.user) != -1)
      log.state = lrcAddState(log.state, "SYSOP");

    if( (NSFilter.indexOf("|")==-1) && (log.ns!=null) && (NSFilter!=log.ns) ) continue;

    if (!(lrcHasState(log.state, "REVIEW"))) {
      if (lrcParams["LoadCatAndTemplates"]) {
        A&Lajax.http({url: wgServer + wgScriptPath + '/api.php?titles=' + encodeURIComponent(log.title) + '&action=query&prop=categories|templates&cllimit='+lrcAPIlimit+'&clprop=hidden&tllimit='+lrcAPIlimit+'&redirects&format=xml',
                     onSuccess: getRedirCat2, log: log });
      } else {
        getRevision(log);
      }
    }
  }

  if (data.withFilters) {
    // Filters
    var filters = query.getElementsByTagName('abuselog')[0].getElementsByTagName('item');
    var i,j,leni,lenj,filter;

    leni=filters.length;
    for (i=leni-1; i>=0; i--) {
      if (filters[i].getAttribute('id') <= lastfilterid) continue;
      filter = new Object();

      filter.state = new Array();
      filter.state = lrcAddState(filter.state, "ABFILTER");

      lenj = filters[i].attributes.length;
      for (j=0; j<lenj; j++) {
        filter[filters[i].attributes[j].name] = filters[i].attributes[j].value;
      }

      //Set a dummy revid to prevent deletion
      filter.revid = filter.id;

      // Get filter description


      //Set a dummy revid to prevent deletion
      filter.revid = filter.id

      if( (NSFilter.indexOf("|")==-1) && (filter.ns!=null) && (NSFilter!=filter.ns) ) continue;

      getRevision(filter);
    }
    if(filters[0]){
      lastfilterid = filters[0].getAttribute('id');
      lastfiltertimestamp = filters[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
    }
  }
  if(rcs[0]){
    lastrcid = rcs[0].getAttribute('rcid');
    lastrctimestamp = rcs[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
  }
  if(logs[0]){
    lastlogid = logs[0].getAttribute('logid');
    lastletimestamp = logs[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
  }


  lrcDisplayDebug("");
  LiveRC_RequestError = 0;
  clearTimeout(lrcTimeout["RCRequest"]);
  lrcTimeout["RCRequest"] = setTimeout("liveRC()",lrcParams["Refresh"]*1000);
}

/*</source>

==== Requête des modèles et catégories (RC) ====

<source lang="javascript"> */

function getRedirCat(xmlreq, data) {
  var yurik = xmlreq.responseXML.getElementsByTagName('api')[0];
  if (yurik.firstChild.nodeName == "error") return;

  var rc = data.rc;
  var pageid = rc.pageid;
  var revid = rc.revid;
  var state = rc.state;

  var page = yurik.getElementsByTagName('pages')[0].getElementsByTagName('page')[0];
  if (page.getElementsByTagName('redirect').length) {
    state = lrcAddState(state, "REDIRECT");
    if (page.getElementsByTagName('redirect')[0].getElementsByTagName('to').length)
      rc.redirect = page.getElementsByTagName('redirect')[0].getElementsByTagName('to')[0].textContent;
  }
  rc.categories = new Array();
  if (page.getElementsByTagName('categories').length) {
    var cats = page.getElementsByTagName('categories')[0].getElementsByTagName('cl');
    var i,j;
    var leni = cats.length;
    var lenj = categoriestests.length;
    var pageHasCat = false;
    for (i=0; i<leni; i++){
      if(cats[i].getAttribute("hidden")==null) pageHasCat = true;
      var catTitle = cats[i].getAttribute('title');
      rc.categories.push(catTitle);
      for (j=0; j<lenj; j++){
        if (new RegExp(lang_category+categoriestests[j].regex, "i").test(catTitle)){
          state = lrcAddState(state, categoriestests[j].state);
        }
      }
    }
    if(pageHasCat) state = lrcAddState(state, "CATEGORIZED");
  }
  rc.templates = new Array();
  if (page.getElementsByTagName('templates').length) {
    var temps = page.getElementsByTagName('templates')[0].getElementsByTagName('tl');
    var i,j;
    var leni = temps.length;
    for (i=0; i<leni; i++){
      var templateTitle = temps[i].getAttribute('title');
      if(lrcHomonTemplates.indexOf(templateTitle)!=-1) state = lrcAddState(state, "HOMONYMIE");
      if(templateTitle=="Modèle:Méta lien vers portail") state = lrcAddState(state, "PORTAIL");
      if(lrcRecentTemplates.indexOf(templateTitle.split(wgFormattedNamespaces[10]+":").join(""))!=-1) state = lrcAddState(state, "RECENT");
      rc.templates.push(templateTitle);
    }
  }
  rc.state = state;
  getRevision(rc);
}

/*</source>

==== Requête des modèles et catégories (Log) ====

<source lang="javascript"> */

function getRedirCat2(xmlreq, data) {
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];
  if (api.firstChild.nodeName == "error") return;

  var log = data.log;
  var pageid = log.pageid;
  var revid = log.revid;
  var state = log.state;

  var query = api.getElementsByTagName('query')[0];
  if (query.getElementsByTagName('redirects').length) {
    state = lrcAddState(state, "REDIRECT");
    if (query.getElementsByTagName('redirects')[0].getElementsByTagName('r').length)
      log.redirect = query.getElementsByTagName('redirects')[0].getElementsByTagName('r')[0].getAttribute('to');
  }
  log.categories = new Array();
  if (query.getElementsByTagName('categories').length) {
    var cats = query.getElementsByTagName('categories')[0].getElementsByTagName('cl');
    var i,j;
    var leni = cats.length;
    var lenj = categoriestests.length;
    var queryHasCat = false;
    for (i=0; i<leni; i++){
      if(cats[i].getAttribute("hidden")==null) queryHasCat = true;
      var catTitle = cats[i].getAttribute('title');
      log.categories.push(catTitle);
      for (j=0; j<lenj; j++){
        if (new RegExp(lang_category+categoriestests[j].regex, "i").test(catTitle)){
          state = lrcAddState(state, categoriestests[j].state);
        }
      }
    }
    if(queryHasCat) state = lrcAddState(state, "CATEGORIZED");
  }
  log.templates = new Array();
  if (query.getElementsByTagName('templates').length) {
    var temps = query.getElementsByTagName('templates')[0].getElementsByTagName('tl');
    var i,j;
    var leni = temps.length;
    for (i=0; i<leni; i++){
      var templateTitle = temps[i].getAttribute('title');
      if(lrcHomonTemplates.indexOf(templateTitle)!=-1) state = lrcAddState(state, "HOMONYMIE");
      if(templateTitle=="Modèle:Méta lien vers portail") state = lrcAddState(state, "PORTAIL");
      if(lrcRecentTemplates.indexOf(templateTitle.split(wgFormattedNamespaces[10]+":").join(""))!=-1) state = lrcAddState(state, "RECENT");
      log.templates.push(templateTitle);
    }
  }
  log.state = state;
  getRevision(log);
}

/* </source>

==== Gestion des noms de filtres ====

<source lang="javascript"> */

function getFilterAction(action){
  if(lrcMediawikiMessages[("abusefilter-action-"+action)]) return lrcMediawikiMessages[("abusefilter-action-"+action)];
  return action;
}

function getFilterComment(filter) {
  filter.comment = lang_messages.FILTER+' '
  filter.comment += '<a href="'+lrcGetUglyPageURL("Special:AbuseFilter/"+filter.filter_id)+'" '
+ ' onclick="liveFilter(\'AbuseFilter\', '+filter.filter_id+'); return false;" >'+filter.filter_id+'</a>';
  filter.comment += ': ';
  filter.comment += filter.filter;
  filter.comment += ' ('+getFilterAction("action")+' : '+ getFilterAction(filter.result) + ')';
  return filter.comment;
}

/* </source>

==== Affichage d'une ligne RC ====

<source lang="javascript"> */

var lrcRCpaused = new Array();

function getRevisionPaused() {
  if (document.getElementById('stopLive').checked){
    setTimeout("getRevisionPaused()", 1000);
    return;
  }
  for(var a=0,l=lrcRCpaused.length;a<l;a++){
    if(lrcRCpaused[a]) getRevision(lrcRCpaused[a]);
  }
  while(lrcRCpaused[0]){ lrcRCpaused.pop(); }
}

function getRevision(rc) {
  if (document.getElementById('stopLive').checked){
    var ID = lrcRCpaused.length;
    lrcRCpaused[ID] = rc;
    if(ID==0) setTimeout("getRevisionPaused()", 1000);
    return;
  }
  var ScrollTop = document.body.scrollTop;
  var title = rc.title;
  var pageid = rc.pageid;
  var revid = rc.revid;
  var oldid = rc.old_revid;
  var user = rc.user;
  var comment = (rc.comment ? rc.comment : "");
  var parsedcomment = (rc.parsedcomment ? rc.parsedcomment : "");
  var timestamp = rc.timestamp;
  var ns = rc.ns;
  var state = rc.state;
  var oldsize = rc.oldlen
  var newsize = rc.newlen
  var sizediff = newsize - oldsize;
  var lineUID = generateNewID();

  var match;
  var escTitle = lrcEscapeStr(title);
  var escUser = lrcEscapeStr(user);

  // INITIALISATION LIGNE RC //

  var tr1 = document.createElement('tr');
  var th0 = document.createElement('th');
  var th1 = document.createElement('th');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  th0.className = "th0RC";
  th1.className = "th1RC";
  td2.className = "td2RC";
  td3.className = "td3RC";
  td4.className = "td4RC";
  lrcLines[lineUID] = {tr1: tr1, title: title, user: user, revid: revid, oldid: oldid, state: state};

  // SUPPR. LIGNE //

  th0.innerHTML = '<a href="javascript:;" onClick="supprLigne(\''+pageid+'_'+revid+'\'); return false;" style="color:red" title="'+lang_tooltips.HIDE_THIS+'">X</a>';
  th0.id = lineUID;

  // ARTICLE //

  var arti = "", artiStyle = "";
  var preArti = "", postArti = "";

  var diff = "";
  var diffClose = "";
  if (lrcParams["AutoCloseDiff"] == 1)
    diffClose='supprLigne(\''+pageid+'_'+revid+'\');';
  if (lrcHasState(state, "NEW")) {
    diff = '<a class="lrc_PreviewLink" '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveArticle('+escTitle+','+escUser+');'+diffClose+' return false;" '
         + 'style="color:green">New</a>';
  }else if (lrcHasState(state, "UPLOAD")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=upload&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'upload\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color:darkslateblue">Log</a>';
  }else if (lrcHasState(state, "NEWUSER")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=newusers&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'newusers\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color:lime">Log</a>';
  }else if (lrcHasState(state, "BLOCK")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=block&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'block\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color:darkgoldenrod">Log</a>';
  }else if (lrcHasState(state, "DELETE")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=delete&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'delete\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color: saddlebrown">Log</a>';
  }else if (lrcHasState(state, "MOVE")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=move&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'move\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color:black">Log</a>';
  }else if (lrcHasState(state, "PROTECT")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:Log', '&type=protect&user=&page='+encodeURIComponent(title))+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'protect\',{page:'+escTitle+'});'+diffClose+' return false;" '
         + 'style="color: darkslategray">Log</a>';
  }else if (lrcHasState(state, "ABFILTER")){
    diff = '<a '
         + 'href="'+lrcGetUglyPageURL('Special:AbuseLog', '&details='+revid)+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveFilter(\'AbuseLog\', {\'details\':'+revid+'});'+diffClose+' return false;" '
         + 'style="color: darkslategray">Filt</a>';
  }else{ // simple edit
    diff = '<a class="lrc_PreviewLink" '
         + 'href="'+lrcGetUglyPageURL(title, '&diff='+revid+'&oldid='+oldid+'&unhide=1')+'" '
         + 'onClick="changeLigne(\''+pageid+'_'+revid+'\');liveDiff('+escTitle+','+revid+','+oldid+');'+diffClose+' return false;" '
         + 'style="color:orange" title="'+lang_tooltips.DIFF_TIP+'">'+lang_tooltips.DIFF_SHORT+'</a>'
  }
  var hist = '';
  var edit = '';
  var watch = '';
  var admin = '';
  // Don't show link for log rows
  if (!(lrcHasState(state, "UPLOAD")) &&
      !(lrcHasState(state, "NEWUSER")) &&
      !(lrcHasState(state, "BLOCK")) &&
      !(lrcHasState(state, "DELETE")) &&
      !(lrcHasState(state, "PROTECT")) &&
      !(lrcHasState(state, "PATROL")) &&
      !(lrcHasState(state, "MOVE")) &&
      !(lrcHasState(state, "ABFILTER")))
  {
    hist = '<a '
         + 'href="'+lrcGetUglyPageURL(title,'&action=history') + '" '
         + 'onClick="liveHist('+escTitle+'); return false;" '
         + 'style="color:darkorange;" title="'+lang_tooltips.HIST_TIP+'">'+lang_tooltips.HIST_SHORT+'</a>';
    edit = '<a '
         + 'href="'+lrcGetUglyPageURL(title,'&action=edit') + '" '
         + 'onClick="liveEdit('+escTitle+'); return false;" '
         + 'style="color:tomato" title="'+lang_tooltips.EDIT_TIP+'">'+lang_tooltips.EDIT_SHORT+'</a>';


    if(lstSuivi[title]){
        watch = '<a href="'+lrcGetUglyPageURL(title,'&action=unwatch') + '" '
              + 'onClick="LiveWatchArticle(this, 0, '+escTitle+'); return false;" '
              + 'title="'+lang_tooltips.UNWATCH_TIP+' « '+title+' »" '
              + '>'+lang_tooltips.UNWATCH_SHORT+'</a>';
    }else{
        watch = '<a href="'+lrcGetUglyPageURL(title,'&action=watch') + '" '
              + 'onClick="LiveWatchArticle(this, 0, '+escTitle+'); return false;" '
              + 'title="'+lang_tooltips.WATCH_TIP+' « '+title+' »" '
              + '>'+lang_tooltips.WATCH_SHORT+'</a>';
    }
    if (lrcUserHasRight("delete")) {
      admin += ' • <a '
             + 'href="'+lrcGetUglyPageURL(title,'&action=delete') + '" '
             + 'onClick="liveDelete('+escTitle+'); return false;" '
             + 'style="color:orangered;" title="'+lang_tooltips.DEL_TIP+'">'+lang_tooltips.DEL_SHORT+'</a>';
    }
    if (lrcUserHasRight("protect")) {
      admin += ' • <a '
             + 'href="'+lrcGetUglyPageURL(title,'&action=protect') + '" '
             + 'onClick="liveProtect('+escTitle+'); return false;" '
             + 'style="color:coral;" title="'+lang_tooltips.PROTECT_TIP+'">'+lang_tooltips.PROTECT_SHORT+'</a>';
    }
  }

  // Disambig / Homonymie ? ;
  ///////////////////////////
  if (ns == 0 && lrcHasState(state, "HOMONYMIE")) {
    artiStyle = 'color: darkorange; font-weight: bold; font-style: italic;';
    preArti += lrcIcon["Homon"] + ' ';
  }

  // Stub / Ébauche ? ;
  ///////////////////////////
  if (lrcHasState(state, "STUB")) {
    preArti += lrcIcon["Stub"] + ' ';
  }

  // Page protégée ? ;
  ////////////////////
  if (lrcHasState(state, "FULLLOCK"))
    preArti += lrcIcon["FullLock"]+' ';
  if (lrcHasState(state, "LOCK"))
    preArti += lrcIcon["Lock"]+' ';

  // Copyright ? ;
  //////////
  if (lrcHasState(state, "COPYRIGHT"))
    preArti += lrcIcon["Copyright"]+' ';

  // PaS ? ;
  //////////////////
  if (lrcHasState(state, "PAS"))
    preArti += lrcIcon["PaS"]+' ';

  // Événement récent ? ;
  /////////////////////////////////////////
  if( lrcHasState(state, "RECENT") && (ns == 0) )
    preArti += lrcIcon["Recent"]+' ';

  // Adq ? ;
  //////////
  if (lrcHasState(state, "ADQ"))
    postArti += lrcIcon["AdQ"];

  // Bon article ? ;
  //////////////////
  if (lrcHasState(state, "BA"))
    postArti += lrcIcon["BA"];

  // Article potentiellement de qualité ? ;
  /////////////////////////////////////////
  if (lrcHasState(state, "APDQ"))
    postArti += lrcIcon["APDQ"];

  // Article catégorisé ? ;
  /////////////////////////
  if ((!(lrcHasState(state, "UPLOAD")) &&
      !(lrcHasState(state, "NEWUSER")) &&
      !(lrcHasState(state, "BLOCK")) &&
      !(lrcHasState(state, "DELETE")) &&
      !(lrcHasState(state, "PROTECT")) &&
      !(lrcHasState(state, "PATROL")) &&
      !(lrcHasState(state, "MOVE")) &&
      !(lrcHasState(state, "ABFILTER")))
    && !(lrcHasState(state, "REDIRECT"))
    && !(lrcHasState(state, "HOMONYMIE"))
    && !(lrcHasState(state, "CATEGORIZED"))
    && (ns == 0 || ns==6)
    && lrcParams["LoadCatAndTemplates"])
    postArti += lrcIcon["Nocat"];

  // Article sans portail ? ;
  /////////////////////////
  if ((!(lrcHasState(state, "UPLOAD")) &&
      !(lrcHasState(state, "NEWUSER")) &&
      !(lrcHasState(state, "BLOCK")) &&
      !(lrcHasState(state, "DELETE")) &&
      !(lrcHasState(state, "PROTECT")) &&
      !(lrcHasState(state, "PATROL")) &&
      !(lrcHasState(state, "MOVE")) &&
      !(lrcHasState(state, "ABFILTER")))
    && !(lrcHasState(state, "REDIRECT"))
    && !(lrcHasState(state, "HOMONYMIE"))
    && !(lrcHasState(state, "PORTAIL"))
    && (ns == 0)
    && lrcParams["LoadCatAndTemplates"])
    postArti += lrcIcon["Noportal"];

  // Redirect, Log, or simple edit ? ;
  //////////////////
  var dlbClick = 'onDblClick="window.open(' + lrcEscapeStr(lrcGetPageURL(title)) + ');"'
  if (lrcHasState(state, "MOVE")) {
//    artiStyle = 'color: magenta; font-weight: bold; font-style: italic;';
    postArti += ' '+lrcIcon["Move"];
    postArti += ' <a '
              + 'href="'+lrcGetPageURL(rc.new_title)+'" '
              + 'onClick="liveArticle('+lrcEscapeStr(rc.new_title)+','+escUser+'); return false;"'
              + '>'+lrcStripString(rc.new_title, lrcParams["ArticleLengthLimit"])+'</a>';
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + 'class="lrc_ArticleLink" style="'+artiStyle+'" >'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else if (lrcHasState(state, "REDIRECT")) {
    artiStyle = 'color: green; font-weight: bold; font-style: italic;';
    postArti += ' '+lrcIcon["Redirect"];
    postArti += ' <a '
              + 'href="'+lrcGetPageURL(rc.redirect)+'" '
              + 'onClick="liveArticle('+lrcEscapeStr(rc.redirect)+','+escUser+');" '
              + '>'+lrcStripString(rc.redirect, lrcParams["ArticleLengthLimit"])+'</a>';
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + 'class="lrc_ArticleLink" style="'+artiStyle+'" >'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  } else if (lrcHasState(state, "UPLOAD")) {
    postArti += ' '+lrcIcon["Upload"];
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + dlbClick + ' class="lrc_ArticleLink" style="'+artiStyle+'" >'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else if (lrcHasState(state, "NEWUSER")) {
    postArti += ' '+lrcIcon["NewUser"];
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + dlbClick + ' class="lrc_ArticleLink" style="'+artiStyle+'" >'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else if (lrcHasState(state, "BLOCK")) {
//    artiStyle = 'color: magenta; font-weight: bold; font-style: italic;';
    postArti += ' '+lrcIcon["Block"];
    postArti += ' <a '
              + 'href="'+lrcGetUglyPageURL('Special:Log','&type=block&user=&page='+encodeURIComponent(rc.title))+'" '
              + 'onClick="liveLog(\'block\',{page:'+lrcEscapeStr(rc.title)+'}); return false;" '
              + '>('+rc.duration+')</a>';
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + 'class="lrc_ArticleLink" style="'+artiStyle+'">'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else if (lrcHasState(state, "DELETE")) {
    postArti += ' '+lrcIcon["Delete"];
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + dlbClick + ' class="lrc_ArticleLink" style="'+artiStyle+'">'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else if (lrcHasState(state, "PROTECT")) {
    postArti += ' '+lrcIcon["Protect"];
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + dlbClick + ' class="lrc_ArticleLink" style="'+artiStyle+'">'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }else {
    arti = '<a '
         + 'href="'+lrcGetPageURL(title)+'" '
         + 'onClick="liveArticle('+escTitle+','+escUser+'); return false;" '
         + dlbClick + ' class="lrc_ArticleLink" style="'+artiStyle+'">'+lrcStripString(title, lrcParams["ArticleLengthLimit"])+'</a>';
  }

  th1.innerHTML = '<small>' + tsToHhMm(timestamp) + ' • ' + diff + ' • ' + hist + ' • ' + edit + ' • ' + watch + admin + ' • </small>'
                + preArti + arti + postArti;
  addClass(th1,"creator-title");
  th1.style.textAlign="left";
  th1.style.border="1px";
  th1.style.width="40%";

  // EDITOR //
  ////////////
  var td2id = generateNewID();
  var discut  = '<a '
              + 'href="'+lrcGetPageURL(wgFormattedNamespaces[3]+':'+user)+'" '
              + 'onClick="liveArticle('+lrcEscapeStr(wgFormattedNamespaces[3]+':'+user)+'); return false;" '
              + 'style="color:seagreen" title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
  var contrib = '<a '
              + 'href="'+lrcGetPageURL('Special:Contributions/'+user)+'" '
              + 'onClick="liveContrib('+escUser+'); return false;" '
              + 'style="color:#43CD80" title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
  if (lrcUserHasRight("deletedhistory")) {
    contrib += '<a '
             + 'href="'+lrcGetPageURL('Special:DeletedContributions/'+user)+'" '
             + 'onClick="liveDeletedContrib('+escUser+'); return false;" '
             + 'style="color:#43CD80" title="'+lang_tooltips.DELETEDCONTRIB_TIP+'">'+lang_tooltips.DELETEDCONTRIB_SHORT+'</a>';
  }
  var uwatch;
  if (lstContact[user]) {
    uwatch = '<a href="javascript:;" onClick="addWatch('+escUser+',false,\'' + td2id + '\');" style="color:black" title="'+"Ne plus surveiller"+'">'+'X'+'</a>';
  } else {
    uwatch = '<a href="javascript:;" onClick="addWatch('+escUser+',true,\'' + td2id + '\');" style="color:#AAAA00" title="'+"Surveiller"+'">'+'W'+'</a>';
  }

  var editor = "", preEditor = "";

  // Reverted ? ;
  /////////////////
  if (lrcHasState(state, "REVERT"))
    preEditor += lrcIcon["Revert"]+'&nbsp;';

  // Bot ? ;
  //////////
  if (lrcHasState(state, "BOT"))
    preEditor += lrcIcon["Bot"]+'&nbsp;';

  // Sysop ? ;
  ////////////
  if (lrcHasState(state, "SYSOP"))
    preEditor += lrcIcon["Sysop"]+'&nbsp;';

  // TOR potentiel / AOL
  var isTOR = new RegExp(/172\.\d+\.\d+\.\d+/);
  if (isTOR.test(user))
    preEditor += lrcIcon["TOR"]+'&nbsp;';

  if (typeof(lstUserCat[user]) != 'undefined') {
    preEditor += lrcIcon[watchCategories[lstUserCat[user]].image]+'&nbsp;';
  }
  if (typeof(lstBlocks[user]) != 'undefined' && user != wgUserName) {
    preEditor += lrcIcon["Blocked"]+'&nbsp;';
  }

  editor = lrcGetUserLink(user);
  var uadmin   = '';
  if (lrcUserHasRight("block")) {
    uadmin = ' • <a '
           + 'href="'+lrcGetPageURL('Special:Blockip/' + user)+'" '
           + 'onClick="liveBlock('+escUser+'); return false;" '
           + 'style="color:seagreen" title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
  }

  var uhide = '<a href="javascript:;" onClick="supprLigne(\''+pageid+'_'+revid+'\'); hideUser('+ escUser +');" style="color:grey" title="'+lang_tooltips.USER_HIDE_TIP+'">'+lang_tooltips.USER_HIDE_SHORT+'</a>';

  td2.innerHTML = '<small>' + discut + ' • ' + contrib + ' • ' + uhide +  ' • ' +uwatch+ uadmin + ' • </small>'
                + preEditor + editor;
  addClass(td2, "creator-name");
  td2.style.border = "1px";
  td2.style.width = "20%";
  td2.id = td2id;

  if (lstRevoc[user]) {
    addClass(tr1, "RcReverted");
    td2.innerHTML += lrcIcon["NbRevoc"].split("$1").join(lstRevoc[user].nb).split("$2").join(escUser)+lrcGetAllRevoc(user);
  }

  // COMMENT //
  var wcomment = "";
  if( (lrcHasState(state, "UPLOAD")) || (lrcHasState(state, "NEWUSER")) || (lrcHasState(state, "BLOCK")) || (lrcHasState(state, "DELETE")) || (lrcHasState(state, "MOVE")) || (lrcHasState(state, "PROTECT")) ){
    wcomment = comment.htmlize();
    var regex1 = new RegExp(/\[\[(([^\]\|]*)(.*?))\]\]/g);
    wcomment = wcomment.replace(regex1, '<a href="'+wgServer+wgScript+'?title=$2&redirect=no" >$1</a>');
    var regex2 = new RegExp(/\>[^\]\|<]*\|([^\]\|<]*)</g);
    wcomment = wcomment.replace(regex2, ">$1<");
  }else if (lrcHasState(state, "ABFILTER")) {
    wcomment = getFilterComment(rc);
  }else{
    wcomment = parsedcomment;
  }
  if (lrcParams["BoldComments"]) wcomment = '<b>' + wcomment + '</b>';

  // Abusefilter tag ? ;
  /////////////////
  if (lrcHasState(state, "TAG")) {
    var TagTemplate = lrcIcon["Tag"];
    TagTemplate = TagTemplate.split("$1").join(rc.tags[0].firstChild.nodeValue);
    var TagList = "";
    for (var tagId = 1; tagId < rc.tags.length; ++tagId)
      TagList += ' | ' + rc.tags[tagId].firstChild.nodeValue;
    TagTemplate = TagTemplate.split("$2").join(TagList);
    wcomment += TagTemplate;
    addClass(tr1, "RcTag");
  } else {
    td3.style.border = "1px";
    td3.style.width = "40%";
  }
  td3.innerHTML = "<small>" + wcomment + "</small>";
  if (!(lrcHasState(state, "ABFILTER"))) {
    var CommentLinks = td3.getElementsByTagName('a');
    for(var a=0,l=CommentLinks.length;a<l;a++){
      var Target = CommentLinks[a].title.replace(lrcMediawikiMessages["red-link-title"].split("$1").join(""), "");
      if(!Target || Target === "") Target = CommentLinks[a].innerHTML;
      if(CommentLinks[a].className && CommentLinks[a].className == "new"){
        CommentLinks[a].setAttribute("onClick", "liveEdit("+lrcEscapeStr(Target)+", '&redlink=1'); return false;");
      }else{
        if(Target.indexOf(wgFormattedNamespaces[-1]+":"+lrcMediawikiMessages["mycontris"]+"/")==0){
          Target = CommentLinks[a].innerHTML;
          CommentLinks[a].setAttribute("onClick", "liveContrib("+lrcEscapeStr(Target)+"); return false;");
        }else{
          CommentLinks[a].setAttribute("onClick", "liveArticle("+lrcEscapeStr(Target)+"); return false;");
        }
      }
    }
  }

  if(lrcHasState(state, "PATROLLED")) addClass(tr1, "RcPatrolled");
  if(lrcHasState(state, "ABFILTER")) addClass(tr1, "RcAbFilter");
  if(lrcHasState(state, "UPLOAD")) addClass(tr1, "RcUpload");
  if(lrcHasState(state, "NEWUSER")) addClass(tr1, "RcNewUser");
  if(lrcHasState(state, "BLOCK")) addClass(tr1, "RcBlock");
  if(lrcHasState(state, "DELETE")) addClass(tr1, "RcDelete");
  if(lrcHasState(state, "MOVE")) addClass(tr1, "RcMove");
  if(lrcHasState(state, "PROTECT")) addClass(tr1, "RcProtect");
  if(lrcHasState(state, "REVERT")) addClass(tr1, "RcRevert");
  if(lrcHasState(state, "BLANKING") || newsize == 0)  addClass(tr1, "RcBlanking");
  if(lrcHasState(state, "NEW")) addClass(tr1, "RcNew");
  if(lrcHasState(state, "IP")) addClass(tr1, "RcIp");
  if(isTOR.test(user)) addClass(tr1, "RcTOR");
  if(lrcHasState(state, "REPLACED")) {
    addClass(tr1, "RcReplaced");
    td4.innerHTML = lrcIcon["Replaced"];
  }

  // CONTACT LIST //
  //////////////////
  if (lstContact[user]) {
    addClass(tr1, "RcContact");
  } else if (user == wgUserName) {
    addClass(tr1, "RcSelf");
  }

  // DELTA SIZE //

  // delta de modif ;
  ///////////////////
  if(""+sizediff != "NaN") {
    var txtdiff = "";
    if (sizediff < 0)
      txtdiff = '<sub class="mw-plusminus-neg">'+sizediff+'</sub>';
    else if (sizediff == 0)
      txtdiff = '<small class="mw-plusminus-null">='+sizediff+'</small>';
    else
      txtdiff = '<sup class="mw-plusminus-pos">+'+sizediff+'</sup>';
    td4.innerHTML += txtdiff;
    td4.style.border = "1px";
    td4.style.textAlign = "right";
  }

  // ASSEMBLAGE LIGNE //

  tr1.appendChild(th0);
  tr1.appendChild(th1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  tr1.appendChild(td4);
  tr1.id = pageid+"_"+revid;

  var tabScroll = document.getElementById("liveRC_RCList");
  var tab = document.getElementById( 'tabRC' );

  if(!lrcParams["InvertUpdate"]){ // Save scrollTop
    var ScrollDown = (tab.offsetHeight - tabScroll.scrollTop);
  }

  // IE automatically inserts a TBODY that we have to take care of
  if (tab.firstChild && (tab.firstChild.nodeName == "TBODY")) tab=tab.firstChild;
  var elold = document.getElementById(pageid+"_"+oldid);

  if(lrcParams["KeepAllLines"]){     // NO LIMIT
    if(lrcParams["InvertUpdate"]){   // Insert in first position
      tab.appendChild(tr1);
    }else{                           // Insert in last position
      if (tab.firstChild != null)
        tab.insertBefore(tr1, tab.firstChild);
      else
        tab.appendChild(tr1);
    }
  }else{                             // LIMIT
    if(lrcParams["InvertUpdate"]){   // Insert in first position
      tab.appendChild(tr1);
      if (elold == null) {
        if (tab.childNodes.length > lrcParams["RCLimit"]) {
          var idt = tab.firstChild.id;
          supprLigne(idt);
        }
      } else {
        supprLigne(pageid+"_"+oldid);
      }
    }else{                           // Insert in last position
      if (tab.firstChild != null)
        tab.insertBefore(tr1, tab.firstChild);
      else
        tab.appendChild(tr1);
      if (elold == null) {
        if (tab.childNodes.length > lrcParams["RCLimit"]) {
          var idt = tab.lastChild.id;
          supprLigne(idt);
        }
      } else {
        supprLigne(pageid+"_"+oldid);
      }
    }
  }

  // Don't show RC if checkbox is not checked
  if ((!document.getElementById('showRC').checked) &&
     (!(lrcHasState(state, "UPLOAD")) &&
      !(lrcHasState(state, "NEWUSER")) &&
      !(lrcHasState(state, "BLOCK")) &&
      !(lrcHasState(state, "DELETE")) &&
      !(lrcHasState(state, "PROTECT")) &&
      !(lrcHasState(state, "MOVE")) &&
      !(lrcHasState(state, "ABFILTER"))))
    supprLigne(pageid+"_"+revid);

  if (lrcHasState(state, "PATROL"))
    supprLigne(pageid+"_"+revid);

  // Don't show Log if checkbox is not checked
  if ((!document.getElementById('showLog').checked) &&
     ((lrcHasState(state, "UPLOAD")) ||
      (lrcHasState(state, "NEWUSER")) ||
      (lrcHasState(state, "BLOCK")) ||
      (lrcHasState(state, "DELETE")) ||
      (lrcHasState(state, "PROTECT")) ||
      (lrcHasState(state, "MOVE"))))
    supprLigne(pageid+"_"+revid);


  if(!lrcParams["InvertUpdate"]){ // Reload scrollTop
    if(ScrollDown) tabScroll.scrollTop = (tab.offsetHeight - ScrollDown);
  }


  // MISE A JOUR LISTE "Liste de suivi" //

  if(lstSuivi[title]) {
    addClass(tr1, "RcWatched");
    updateFollowWatchlist(rc);
  }

  if (lstContact[user]) {
    lstContact[user].ts = timestamp;
    updateFollowContact();
  }

  if (lrcHasState(state, "REVERT")) {
    var regex = new RegExp(/\[\[Sp[ée]cial:Contributions\/([^\]\|]+)/);
    match = regex.exec(comment);
    if (!match) {
                var regex2 = new RegExp(/\[\[Specjalna:Wkład\/([^\]\|]+)/);
                match = regex2.exec(comment);
    }
    if (match) {
      var userR = match[1];
      if (userR != user && userR != wgUserName) {
        if (!lstRevoc[userR]) lstRevoc[userR] = { ts: 0, nb: 0, pages:new Array() };
        lstRevoc[userR].ts = timestamp;
        lstRevoc[userR].nb += 1;
        lstRevoc[userR].pages.push({title:title, oldid:oldid, timestamp:timestamp});
        updateFollowRevoc();
      }
    }
  }
  lrcInitTableHeight();
  if(typeof(ScrollTop)!="undefined") document.body.scrollTop = ScrollTop;
  LiveRC_RunHooks("AfterRC", {id:tr1.id, rc:rc});

  if (lrcAllLinesSeen && document.getElementById(tr1.id)) {
    lrcAllLinesSeen = false;
    goNext(1);
  }
}

/* </source>

==== Passage au diff suivant ====

<source lang="javascript"> */

function goNext(mode) {
  //Argos
  var tab = document.getElementById('tabRC');
  // IE automatically inserts a TBODY that we have to take care of
  if (tab.firstChild && (tab.firstChild.nodeName == "TBODY")) tab=tab.firstChild;
  var lines = tab.getElementsByTagName('tr');
  var Nextlength = (lines.length - 1);
  var found = false;
  for (var j = Nextlength; j >= 0; j--) {
    var i = (lrcParams["InvertUpdate"]?(Nextlength - j):j);
    var thisline = lines[i];
    if(!hasClass(thisline, "RcChecked")){
      var Links = thisline.getElementsByTagName('a');
      for (var a=0,l=Links.length;a<l;a++) {
        if (Links[a].className && Links[a].className == "lrc_PreviewLink") {
          if (found || mode) {
            var ln = lrcLines[thisline.getElementsByTagName('th')[0].id];
            if (ln.title && ln.revid && ln.oldid) {
              if (mode == 2) return;
              var lnURL = lrcGetUglyPageURL(ln.title, '&diffonly=1&unhide=1&diff=' + ln.revid + '&oldid=' + ln.oldid)
              A&Lajax.preload(lnURL);
              return;
            }
          } else {
            var code = Links[a].getAttribute("onclick");
            var ReturnRegExp = new RegExp("return[ ]+false[ ]*;");
            code = code.replace(ReturnRegExp, "");
            eval(code);
            found = true;
          }
        }
      }
    }
  }
  if (mode == 2) {
    lrcAllLinesSeen = true;
  }
}

/* </source>

==== Suppression de ligne(s) RC ====

<source lang="javascript"> */

function supprLigne(quelLigne) {
  var i,len;
  var tab = document.getElementById('tabRC');
  // IE automatically inserts a TBODY that we have to take care of
  if (tab.firstChild && (tab.firstChild.nodeName == "TBODY")) tab=tab.firstChild;
  var els = new Array();
  if (quelLigne == '*')
    els = tab.getElementsByTagName('tr');
  else if (quelLigne == 'd') {
    els = getElementsByClass("RcChecked",tab,'tr');
  } else if (quelLigne == 'r') {
    els = getElementsByClass("RcRevert",tab,'tr');
  } else if (quelLigne == 'n') {
    els = getElementsByClass("RcNew",tab,'tr');
  } else if (quelLigne == 'c') {
    els = getElementsByClass("RcBlanking",tab,'tr');
  } else
    els.push(document.getElementById(quelLigne));
  len = els.length;
  for (i=len-1; i>=0; i--){
    if (els[i] != null) {
      lineUID = els[i].getElementsByTagName('th')[0].id;
      delete lrcLines[lineUID];
      tab.removeChild(els[i]);
    }
  }
  return false;
}

/* </source>

====  Validation d'une ligne RC ====

<source lang="javascript"> */

function changeLigne(quelLigne) {
  var el = document.getElementById(quelLigne);
  el.className = "RcChecked";
}

/* </source>

==== Fonctions de mise à jour des listes ====

===== Liste de suivi =====

<source lang="javascript"> */

function updateFollowWatchlist(rc){
    if(!rc) return;
    var title = rc.title;
    var cstilde = lrcEscapeStr(title);
    lstSuivi[title] = tsToHhMm(rc.timestamp);
    var tempsAr = new Array();
    var len = lstSuivi.length;
    for (var n in lstSuivi) {
        if(!lstSuivi.hasOwnProperty(n)) continue;
        if(lstSuivi[n] == "--:--") continue;
        var cstilde = lrcEscapeStr(n);
        var sdiff = '<a '
                    + 'href="'+wgServer + wgScript + '?title='+encodeURIComponent(n)+'&diff=cur&oldid=prev&unhide=1" '
                + 'onClick="liveDiff('+cstilde+',\'cur\',\'prev\'); return false;" '
                + 'style="color:orange">Diff</a>';
        var shist = '<a '
                + 'href="'+wgServer + wgScript + '?title='+encodeURIComponent(n)+'&action=history" '
                + 'onClick="liveHist('+cstilde+'); return false;" '
                + 'style="color:darkorange">H</a>';
        var sarti = '<a '
                + 'href="'+lrcGetPageURL(n)+'" '
                + 'onClick="liveArticle('+cstilde+'); return false;"'
                + '>'+n+'</a>';
        var sotherns = getNamespaceInfoFromPage(n);
        var sotherpn = getNamespaceInfoFromPage(n, "PageName");
        if(sotherns%2==0){
            var sotherText = lang_tooltips.TALK_SHORT;
            var sothernsnumber = (sotherns+1);
        }else{
            var sotherText = lang_tooltips.SUBJECT_SHORT;
            var sothernsnumber = (sotherns-1);
        }
        var sothername = (sothernsnumber == 0 ? sotherpn : wgFormattedNamespaces[sothernsnumber]+":"+sotherpn);
        var stalk = '<a style="color: seagreen;" '
                + 'href="'+lrcGetPageURL(sothername)+'" '
                + 'onClick="liveArticle('+lrcEscapeStr(sothername)+'); return false;"'
                + '>'+sotherText+'</a>';
        var ligne='<li><small>' + lstSuivi[n] + ' • ' + sdiff + ' • ' + shist + ' • ' + stalk + ' • </small>' + sarti + '</li>';
        tempsAr.push(ligne);
    }
    tempsAr.sort();
    len = tempsAr.length;
    var lvSuivi = document.getElementById( 'liveSuivi' );
    lvSuivi.innerHTML = "";
    var List = "<ul>";
    for (var n=len-1; n >= 0; n--){
        if(tempsAr[n]) List += tempsAr[n];
    }
    List += "</ul>";
    lvSuivi.innerHTML = List;
}

/* </source>

===== Masqués =====

<source lang="javascript"> */

function updateHidden() {
  var tempAr = new Array();
  for (var user in lstHidden) {
    if(!lstHidden.hasOwnProperty(user)) continue;
    var utilde = lrcEscapeStr(user);
    var uremove = '<a href="javascript:;" onClick="unhideUser('+utilde+');" style="color:grey">-</a>';
    var udiscut  = '<a '
                 + 'href="'+lrcGetPageURL(wgFormattedNamespaces[3]+':' + user)+'" '
                 + 'onClick="liveArticle('+lrcEscapeStr(wgFormattedNamespaces[3]+':'+user)+'); return false;" '
                 + 'style="color:seagreen" '
                 + 'title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a '
                 + 'href=href="'+lrcGetPageURL('Special:Contributions/'+user)+'" '
                 + 'onClick="liveContrib('+utilde+'); return false;" '
                 + 'style="color:#43CD80" '
                 + 'title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var udeletedcontrib = '';
    var ublock   = '';
    if(lrcUserHasRight("deletedhistory")) {
       udeletedcontrib = '<a '
                       + 'href="'+lrcGetPageURL('Special:DeletedContributions/'+user)+'" '
                       + 'onClick="liveDeletedContrib('+utilde+'); return false;" '
                       + 'style="color:#43CD80" '
                       + 'title="'+lang_tooltips.DELETEDCONTRIB_TIP+'">'+lang_tooltips.DELETEDCONTRIB_SHORT+'</a>';
    }
    if(lrcUserHasRight("block")) {
       ublock = ' • <a '
              + 'href="'+lrcGetPageURL('Special:Blockip/' + user)+'" '
              + 'onClick="liveBlock('+utilde+'); return false;" '
              + 'style="color:seagreen" '
              + 'title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = lrcGetUserLink(user);
    var ligne = '<li><span id="hidden-' + user + '"><small>' + uremove + ' • ' + udiscut + ' • ' + ucontrib + udeletedcontrib + ublock + ' • </small>' + ueditor + '</span></li>';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvHidden = document.getElementById('liveHidden');
  lvHidden.innerHTML = "";
  var len = tempAr.length;
  var List = "<ul>";
  for (var n=len-1; n>=0; n--){
    if(tempAr[n]) List += tempAr[n];
  }
  List += "</ul>";
  lvHidden.innerHTML = List;
}

function hideUser(name) {
   lstHidden[name] = true;
   updateHidden();
}

function unhideUser(name) {
   delete lstHidden[name];
   updateHidden();
}

/* </source>

===== Contacts =====

<source lang="javascript"> */

function updateFollowContact() {
  var tempAr = new Array();
  for (var user in lstContact) {
    if(!lstContact.hasOwnProperty(user)) continue;
    var timestamp = lstContact[user].ts;
    if (timestamp == 0) continue;
    var utilde = lrcEscapeStr(user);
    var udiscut  = '<a '
                 + 'href="'+lrcGetPageURL(wgFormattedNamespaces[3]+':' + user)+'" '
                 + 'onClick="liveArticle('+lrcEscapeStr(wgFormattedNamespaces[3]+':'+user)+'); return false;" '
                 + 'style="color:seagreen" '
                 + 'title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a '
                 + 'href=href="'+lrcGetPageURL('Special:Contributions/'+user)+'" '
                 + 'onClick="liveContrib('+utilde+'); return false;" '
                 + 'style="color:#43CD80" '
                 + 'title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var udeletedcontrib = '';
    var ublock   = '';
    if(lrcUserHasRight("deletedhistory")) {
       udeletedcontrib = '<a '
                       + 'href="'+lrcGetPageURL('Special:DeletedContributions/'+user)+'" '
                       + 'onClick="liveDeletedContrib('+utilde+'); return false;" '
                       + 'style="color:#43CD80" '
                       + 'title="'+lang_tooltips.DELETEDCONTRIB_TIP+'">'+lang_tooltips.DELETEDCONTRIB_SHORT+'</a>';
    }
    if(lrcUserHasRight("block")) {
       ublock = ' • <a '
              + 'href="'+lrcGetPageURL('Special:Blockip/' + user)+'" '
              + 'onClick="liveBlock('+utilde+'); return false;" '
              + 'style="color:seagreen" '
              + 'title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = lrcGetUserLink(user);
    var ligne = '<li><span id="contact-' + timestamp + '"><small>' + tsToHhMm(timestamp) + ' • ' + udiscut + ' • ' + ucontrib+ udeletedcontrib + ublock + ' • </small>' + ueditor + '</span></li>';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvContact = document.getElementById('liveContact');
  lvContact.innerHTML = "";
  var List = "<ul>";
  var len = tempAr.length;
  for (var n=len-1; n>=0; n--){
    if(tempAr[n]) List += tempAr[n];
  }
  List += "</ul>";
  lvContact.innerHTML = List;
}

/* </source>

===== Révoqués =====

<source lang="javascript"> */

function updateFollowRevoc() {
  var tempAr = new Array();
  for (var user in lstRevoc) {
    if(!lstRevoc.hasOwnProperty(user)) continue;
    var timestamp = lstRevoc[user].ts;
    var utilde = lrcEscapeStr(user);
    var uremove = '<a href="javascript:;" onClick="removeRevoc('+utilde+');" style="color:grey">-</a>';
    var udiscut  = '<a '
                 + 'href="'+lrcGetPageURL(wgFormattedNamespaces[3]+':' + user)+'" '
                 + 'onClick="liveArticle('+lrcEscapeStr(wgFormattedNamespaces[3]+':'+user)+'); return false;" '
                 + 'style="color:seagreen" '
                 + 'title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a '
                 + 'href=href="'+lrcGetPageURL('Special:Contributions/'+user)+'" '
                 + 'onClick="liveContrib('+utilde+'); return false;" '
                 + 'style="color:#43CD80" '
                 + 'title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var udeletedcontrib = '';
    var ublock   = '';
    if(lrcUserHasRight("deletedhistory")) {
       udeletedcontrib = '<a '
                       + 'href="'+lrcGetPageURL('Special:DeletedContributions/'+user)+'" '
                       + 'onClick="liveDeletedContrib('+utilde+'); return false;" '
                       + 'style="color:#43CD80" '
                       + 'title="'+lang_tooltips.DELETEDCONTRIB_TIP+'">'+lang_tooltips.DELETEDCONTRIB_SHORT+'</a>';
    }
    if(lrcUserHasRight("block")) {
       ublock = ' • <a '
              + 'href="'+lrcGetPageURL('Special:Blockip/' + user)+'" '
              + 'onClick="liveBlock('+utilde+'); return false;" '
              + 'style="color:seagreen" '
              + 'title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = lrcGetUserLink(user);
    var MoreLink = lrcGetAllRevoc(user);
    var ligne = '<li><span id="revoc-' + timestamp + '"><small>' + tsToHhMm(timestamp) + ' • ' + uremove + ' • ' + udiscut + ' • ' + ucontrib + udeletedcontrib + ublock + ' • </small>' + ueditor + ' : ' + lstRevoc[user].nb + ' '+lang_menu.XTIMES + MoreLink + '</span></li>';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvRevoc = document.getElementById('liveRevoc');
  lvRevoc.innerHTML = "";
  var List = "<ul>";
  var len = tempAr.length;
  for (var n=len-1; n>=0; n--){
    if(tempAr[n]) List += tempAr[n];
  }
  List += "</ul>";
  lvRevoc.innerHTML = List;
}

function lrcGetAllRevoc(user){
    if(!lstRevoc[user]) return "";
    var pages = lstRevoc[user].pages;
    var RevocLink = '<a href="javascript:;" onclick="lrcShowHideAllRevoc(this);"><b>+</b></a>'
                  + '<ul style="display:none">';
    for(var a=0,l=pages.length;a<l;a++){
        var Page = pages[a].title;
        var Oldid = pages[a].oldid;
        var Time = pages[a].timestamp;
        var Links = new Array();
        Links.time = tsToHhMm(Time);
        Links.page = '<a href="'+lrcGetPageURL(Page)+'" onclick="liveArticle('+lrcEscapeStr(Page)+'); return false;">'+Page+'</a>';
        Links.diff = '<a href="'+lrcGetUglyPageURL(Page, '&diffonly=1&unhide=1&diff=next&oldid='+Oldid)+'" onclick="liveDiff('+lrcEscapeStr(Page)+', \'next\', '+Oldid+'); return false;">'+lang_tooltips.DIFF_SHORT+'</a>';
        RevocLink += '<li><span style="margin-left:0.5em;font-size:75%">'+Links.time+' – '+Links.page+' ('+Links.diff+')</span></li>';
    }
    RevocLink += '</ul>';
    return RevocLink;
}

function removeRevoc(name) {
   delete lstRevoc[name];
   updateFollowRevoc();
}

function lrcShowHideAllRevoc(Link){
   if(!Link) return false;
   var Span = Link.nextSibling;
   if(!Span) return false;
   if(Span.style.display == "none"){
      Span.style.display = "";
   }else{
      Span.style.display = "none";
   }
}

/* </source>

=== Fonctions de prévisualisation ===

==== LiveDiff ====

<source lang="javascript"> */

// Lien "Marquer cette modification comme relue"

var lrcPatrolLnk;
var lrcPatrolLnkHref = "";

function lrcReplacePatrolLink(Node) {
  var x = getElementsByClass('patrollink',Node,null)[0];
  if (x == null) return false;
  lrcPatrolLnk = x.getElementsByTagName('a')[0];
  lrcPatrolLnkHref = lrcPatrolLnk.href;
  lrcPatrolLnk.href = "javascript:;";
  lrcPatrolLnk.style.color = "darkgreen";
  lrcPatrolLnk.onclick = lrcPatrolEdit;
  return true;
}

function lrcPatrolEdit() {
  var oldLink = lrcPatrolLnkHref;
  if(lrcPatrolLnkHref == "") return;
  lrcPatrolLnkHref = "";
  lrcPatrolLnk.style.color = "silver";
  lrcPatrolLnk.style.cursor = "default";
  lrcPatrolLnk.style.textDecoration = "none";
  A&Lajax.http({ url: oldLink, onSuccess: lrcAfterPatrolEdit});
}

function lrcAfterPatrolEdit(xmlreq, data) {
  lrcPatrolLnk.innerHTML = "Modification relue";
}

// Requête et affichage Diff

function liveDiff(page, id, oldid) {
  nextDiffNum++;
  lrcAddToHistory("liveDiff", new Array(lrcEscapeStr(page), lrcEscapeStr(id), lrcEscapeStr(oldid)), wgServer+wgScript+'?title='+encodeURIComponent(page)+'&diff='+id+'&oldid='+oldid+'&unhide=1', page + " : diff="+id+' oldid='+oldid);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Diff : <span style='color:red'>"+page+"</span>...</b>");
  A&Lajax.http({ url: lrcGetUglyPageURL(page, '&diffonly=1&unhide=1&diff='+id+'&oldid='+oldid),
                onSuccess: getDiff, mpage: page, mid: id, moldid:oldid,
                diffNum: nextDiffNum});
}

function getDiff(xmlreq, data) {
  // Cancel if the user has clicked on another link after this one
  if (nextDiffNum != data.diffNum) return;
  var page=data.mpage;
  var oldid=data.moldid;
  var id=data.mid;
  var bC  = getPageContent(xmlreq);
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  var lD = getElementsByClass('diff',bC,null);
  var upage = lrcEscapeStr(page);

  if (lD[0] == null) {
    LP.innerHTML = bC.innerHTML;
    if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  }else {
    if (document.getElementById('showDiffR').checked) {
      var avantEl = getElementsByClass('diff-deletedline',bC,null);
      var apresEl = getElementsByClass('diff-addedline',bC,null);
      var rollback = getElementsByClass('mw-rollback-link',bC,null);
      var revisiondelete = getElementsByClass('mw-revdelundel-link',bC,null);
      var patrol = getElementsByClass('patrollink',bC,null);
        var rl = "";
      if (rollback[0] != null){
        rl += '<span class="mw-rollback-link">'+ rollback[0].innerHTML + '</span>&nbsp;&nbsp;';
      }
      if (revisiondelete[0] != null){
        rl += lang_tooltips.REVISIONDELETE_SHORT + ' :';

        for(var a=0,l=revisiondelete.length;a<l;a++){
          var rdl = revisiondelete[a].getElementsByTagName('a')[0];
          var Page = lrcGetArgFromURL(rdl.href, "target");
          var Id = lrcGetArgFromURL(rdl.href, "ids");
          var rdlLink = '<a '
                       + 'href="'+wgServer + wgScript + '?title=Special:Revisiondelete&type=revision&target='+encodeURIComponent(Page)+'&ids='+Id+'" '
                       + 'onClick="liveRevisiondelete('+lrcEscapeStr(Page)+','+Id+'); return false;" '
                       + 'title="'+lang_tooltips.REVISIONDELETE_TIP+' '+Id+'">'+Id+'</a>'
          rl += '&nbsp;<span class="mw-revdelundel-link">'+rdlLink+'</span>&nbsp;';
        }
      }
      if (patrol[0] != null){
        rl += '&nbsp;<span class="patrollink">'+ patrol[0].innerHTML + '</span>';
      }
      if(rl!="") rl += "<br />";
      var avant = "";
      var apres = "";
      var lav = avantEl.length;
      var lap = apresEl.length;
      for(var n=0; n < lav ; n++)
        avant = avant + avantEl[n].innerHTML + "<br />";
      for(var n=0; n < lap ; n++)
        apres = apres + apresEl[n].innerHTML + "<br />";
      LP.innerHTML = rl+"<table width='100%'><tr><td width='50%' class='diff-deletedline' style='vertical-align:top'>"+
                avant+"</td><td class='diff-addedline' style='vertical-align:top'>"+apres+"</td></tr></table>";
    }
    else {
      LP.innerHTML = "<table border='0' width='98%' cellpadding='0' cellspacing='4' class='diff'>"+lD[0].innerHTML+"</table>";
    }
  }
  var notPatrolled = lrcReplacePatrolLink(LP);
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  if (typeof (setupTooltips) != 'undefined') {
    setupTooltips(dLP, false, true);
  }
  // Get username of submitter
  var user1 = getElementWithId('mw-diff-otitle2', 'div', bC);
  if (user1 != null) {
    user1 = user1.getElementsByTagName('a')[0].innerHTML;
  }
  var user2 = getElementWithId('mw-diff-ntitle2', 'div', bC);
  if (user2 != null) {
    user2 = user2.getElementsByTagName('a')[0].innerHTML;
  }
  var Previous = false;
  var asPreviousDiff = getElementWithId('differences-prevlink', 'a', bC);
  if(asPreviousDiff !=null){
    var PreviousOldid = lrcGetArgFromURL(asPreviousDiff.href, "oldid");
    if(PreviousOldid){
      Previous = {
                  "url"   : asPreviousDiff.href,
                  "text"  : asPreviousDiff.innerHTML,
                  "title" : (asPreviousDiff.title ? asPreviousDiff.title : ""),
                  "oldid" : PreviousOldid
                 }
    }
  }
  var Next = false;
  var asNextDiff = getElementWithId('differences-nextlink', 'a', bC);
  if (asNextDiff != null){
    var NextOldid = lrcGetArgFromURL(asNextDiff.href, "oldid");
    if(NextOldid){
      Next = {
              "url"   : asNextDiff.href,
              "text"  : asNextDiff.innerHTML,
              "title" : (asNextDiff.title ? asNextDiff.title : ""),
              "oldid" : NextOldid
             }
    }
  }
  buildPreviewBar({
    "Mode"     : "Diff",
    "Url"      : lrcGetPageURL(page),
    "Page"     : page,
    "User1"    : user1,
    "User2"    : user2,
    "Oldid"    : oldid,
    "Previous" : Previous,
    "Next"     : Next,
    "patrolledDiff": !notPatrolled
  });
  updatePreviewWindowAttributes();
  LiveRC_RunHooks("AfterPreviewDiff");
}

/* </source>

==== LiveHist ====

<source lang="javascript"> */

function liveHist(page, Params) {
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Hist : <span style='color:red'>"+page+"</span>...</b>");
  var URL = lrcGetUglyPageURL(page, '&action=history');
  if(!Params){
    lrcAddToHistory("liveHist",
                    new Array(lrcEscapeStr(page)),
                    URL,
                    page
                   );
  }else{
    var HistoryParams = new Array();
    for(var param in Params){
      if(Params[param]){
        if(param!="title" && param!="action"){
          HistoryParams.push(param+":"+lrcEscapeStr(Params[param]));
          URL += "&"+param+"="+encodeURIComponent(Params[param]);
         }
      }
    }
    lrcAddToHistory("liveHist",
                    new Array(lrcEscapeStr(page), "{"+HistoryParams.join(",")+"}"),
                    URL,
                    page + " : " + HistoryParams.join(" ")
                   );
  }
  A&Lajax.http({url:URL, onSuccess: getHist, message: page });
}

function getHist(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var c=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildPreviewBar({
    "Mode"  : "Hist",
    "Url"   : lrcGetUglyPageURL(c, '&action=history'),
    "Page"  : c,
    "User1" : ""
  });
  modifyHistInput();
  updatePreviewWindowAttributes();
  LiveRC_RunHooks("AfterPreviewHistory");
}

function modifyHistInput(){
  var LP = document.getElementById( 'livePreview' );
  var SearchForm = getElementWithId('mw-history-searchform', 'form', LP);
  var SInputs = SearchForm.getElementsByTagName('input');
  for(var a=0,l=SInputs.length;a<l;a++){
    if(SInputs[a].type && SInputs[a].type === "submit"){
      var Input = SInputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processHistSearch(this)}
      NewInput.onselect = function(){ processHistSearch(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.parentNode.removeChild(Input);
    }
  }
  var CompareForm = getElementWithId('mw-history-compare', 'form', LP);
  var CInputs = CompareForm.getElementsByTagName('input');
  for(var a=0,l=CInputs.length;a<l;a++){
    if(CInputs[a].type && CInputs[a].type === "submit"){
      var Input = CInputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processHistCompare(this)}
      NewInput.onselect = function(){ processHistCompare(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.parentNode.removeChild(Input);
    }
  }
  var DRButtons = CompareForm.getElementsByTagName('button');
  for(var a=0,l=DRButtons.length;a<l;a++){
    if(DRButtons[a] && DRButtons[a].className && DRButtons[a].className=="mw-history-revisiondelete-button"){
      var Input = DRButtons[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.innerHTML + " (live)";
      NewInput.onclick = function(){ processHistRevisionDelete(this)}
      NewInput.onselect = function(){ processHistRevisionDelete(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.parentNode.removeChild(Input);
    }
  }
}

function processHistSearch(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var page = Params["title"];
  liveHist(page, Params);
}

function processHistCompare(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var page = Params["title"];
  var diff = Params["diff"];
  var oldid = Params["oldid"];
  liveDiff(page, diff, oldid);
}

function processHistRevisionDelete(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var page = Params["title"];
  var Ids = new Array();
  for(var Id in Params){
   if(Id.indexOf("ids[")==0) Ids.push(Id.split("ids[").join("").split("]").join(""));
  }
  if(!Ids[0]) return;
  liveRevisiondelete(page,Ids);
}

/* </source>

==== LiveArticle ====

<source lang="javascript"> */

function liveArticle(page, user) {
  lrcAddToHistory("liveArticle", new Array(lrcEscapeStr(page), (user ? lrcEscapeStr(user):lrcEscapeStr(""))), wgServer + wgScript + '?title=' + encodeURIComponent(page) + '&redirect=no', page + (user ? " NeA&Lage : User:"+user :""));
  buildBlanckPreviewBar("<b style='text-decoration: blink;'><span style='color:red'>"+page+"</span>...</b>");
  A&Lajax.http({url:lrcGetUglyPageURL(page, '&redirect=no'),
          onSuccess: getArticle,
          onFailure: getArticle, /* The return code might be 404 if the page has been deleted. */
          page: page, user:user });
}

function getArticle(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var c=data.page;
  var User=data.user;
  var Url = data.url;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  if (bC == null) {
    var CreateLink = '<a '
                   + 'href="'+wgServer +wgScript+'?title='+encodeURIComponent(c)+'&action=edit&redlink=1" '
                   + 'onClick="liveEdit('+lrcEscapeStr(c)+', \'&redlink=1\'); return false;";>';
    LP.innerHTML = lang_messages.NOEXIST.split("$1").join(CreateLink).split("$2").join('</a>');
  } else {
    LP.innerHTML = bC.innerHTML;
  }
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildPreviewBar({
    "Mode"  : "Article",
    "Url"   : lrcGetPageURL(c),
    "Page"  : c,
    "User1" : (User ? User : false)
  });
  updatePreviewWindowAttributes();
  LiveRC_RunHooks("AfterPreviewArticle", data);
}

/* </source>

==== LiveContrib ====

<source lang="javascript"> */

function liveContrib(user, Params) {
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Contributions : <span style='color:red'>"+user+"</span>...</b>");
  if(!Params){
    var URL = lrcGetPageURL('Special:Contributions/'+user);
    lrcAddToHistory("liveContrib",
                    new Array(lrcEscapeStr(user)),
                    URL,
                    user
                   );
  }else{
    var URL = lrcGetUglyPageURL('Special:Contributions')+"&contribs=user&target="+encodeURIComponent(user);
    var HistoryParams = new Array();
    for(var param in Params){
      if(Params[param]){
        URL += "&"+param+"="+encodeURIComponent(Params[param]);
        if(param!="target") HistoryParams.push(param+":"+lrcEscapeStr(Params[param]));
      }
    }
    lrcAddToHistory("liveContrib",
                    new Array(lrcEscapeStr(user), "{"+HistoryParams.join(",")+"}"),
                    URL,
                    user + " : " + HistoryParams.join(" ")
                   );
  }
  A&Lajax.http({url:URL, onSuccess: getContrib, message: user });
}

function getContrib(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var user=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildPreviewBar({
    "Mode"  : "Contrib",
    "Url"   : lrcGetPageURL("Special:Contributions/" + user),
    "Page"  : "Special:Contributions/"+user,
    "User1" : user
  });
  modifyContribInput();
  LiveRC_RunHooks("AfterPreviewContribs");
}

function modifyContribInput(){
  var LP = document.getElementById( 'livePreview' );
  var Form = LP.getElementsByTagName('form')[0];
  var Inputs = Form.getElementsByTagName('input');
  for(var a=0,l=Inputs.length;a<l;a++){
    if(Inputs[a].type && Inputs[a].type === "submit"){
       var Input = Inputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processContrib(this)}
      NewInput.onselect = function(){ processContrib(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.style.display = "none";
    }
  }
  updatePreviewWindowAttributes();
}

function processContrib(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var user = Params["target"];
  liveContrib(user, Params);
}

/* </source>

==== LiveDeletedContrib ====

<source lang="javascript"> */

function liveDeletedContrib(user, Params) {
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>DeletedContributions : <span style='color:red'>"+user+"</span>...</b>");
  if(!Params){
    var URL = lrcGetPageURL('Special:DeletedContributions/'+user);
    lrcAddToHistory("liveDeletedContrib",
                    new Array(lrcEscapeStr(user)),
                    URL,
                    user
                   );
  }else{
    var URL = lrcGetUglyPageURL('Special:DeletedContributions')+"&target="+encodeURIComponent(user);
    var HistoryParams = new Array();
    for(var param in Params){
      if(Params[param]){
        URL += "&"+param+"="+encodeURIComponent(Params[param]);
        if(param!="target") HistoryParams.push(param+":"+lrcEscapeStr(Params[param]));
      }
    }
    lrcAddToHistory("liveDeletedContrib",
                    new Array(lrcEscapeStr(user), "{"+HistoryParams.join(",")+"}"),
                    URL,
                    user + " : " + HistoryParams.join(" ")
                   );
  }
  A&Lajax.http({url:URL, onSuccess: getDeletedContrib, message: user });
}

function getDeletedContrib(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var user=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildPreviewBar({
    "Mode"  : "DeletedContrib",
    "Url"   : lrcGetPageURL("Special:DeletedContributions/" + user),
    "Page"  : "Special:DeletedContributions/"+user,
    "User1" : user
  });
  modifyDeletedContribInput();
  LiveRC_RunHooks("AfterPreviewDeletedContribs");
}

function modifyDeletedContribInput(){
  var LP = document.getElementById( 'livePreview' );
  var Form = LP.getElementsByTagName('form')[0];
  var Inputs = Form.getElementsByTagName('input');
  for(var a=0,l=Inputs.length;a<l;a++){
    if(Inputs[a].type && Inputs[a].type === "submit"){
       var Input = Inputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processDeletedContrib(this)}
      NewInput.onselect = function(){ processDeletedContrib(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.style.display = "none";
    }
  }
  updatePreviewWindowAttributes();
}

function processDeletedContrib(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var user = Params["target"];
  liveDeletedContrib(user, Params);
}

/* </source>

==== LiveLog ====

<source lang="javascript"> */
// (:it:User:Jalo)

function liveLog(action , params) {
  var titolo = getLogTitle(action);
  var URLParams = "";
  var HistoryParams = new Array();
  for(var param in params){
    if(params[param]){
      URLParams += "&"+ param + "=" + encodeURIComponent(params[param]);
      HistoryParams.push(param + ":" + lrcEscapeStr(""+params[param]));
    }
  }
  lrcAddToHistory("liveLog", new Array(lrcEscapeStr(action), "{"+HistoryParams.join(",")+"}"), wgServer + wgScript + '?title=Special:Log&type=' + action + URLParams, titolo + " : " + HistoryParams.join(", "));
  buildBlanckPreviewBar("<b style='text-decoration: blink;'><span style='color:red'>"+titolo+"</span>...</b>");
  A&Lajax.http({url:lrcGetUglyPageURL('Special:Log', '&type=' + action + URLParams), onSuccess: getLog, page:params["page"] , user:params["user"] });
}

function getLogTitle(action){
  var lrcLogNames = {
   'upload':'uploadlogpage',
   'newusers':'newuserlogpage',
   'block':'blocklogpage',
   'delete':'dellogpage',
   'move':'movelogpage',
   'protect':'protectlogpage',
   'patrol':'review-logpage',
   'gblblock':'globalblocking-logpage',
   'renameuser':'renameuserlogpage',
   'import':'importlogpage',
   'globalauth':'centralauth-log-name',
   'gblrights':'centralauth-rightslog-name',
   'abusefilter':'abusefilter-log-name',
   'merge':'mergelog',
   'rights':'rightslog'
  }
  for(var Action in lrcLogNames){
    if(action == Action) return lrcMediawikiMessages[lrcLogNames[Action]];
  }
  return lrcMediawikiMessages["log"];
}

function getLog(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var c = data.page;
  var pref = "Page : ";
  if(!c){
    c=data.user;
    pref = "User : ";
  }
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildBlanckPreviewBar('<b><a href="'+lrcGetPageURL(c)+'" target="_new">'+pref+c+'</a></b>', true);
  modifyLogInput();
  LiveRC_RunHooks("AfterPreviewLog");
}

function modifyLogInput(){
  var LP = document.getElementById( 'livePreview' );
  var Form = LP.getElementsByTagName('form')[0];
  var Inputs = Form.getElementsByTagName('input');
  for(var a=0,l=Inputs.length;a<l;a++){
    if(Inputs[a].type && Inputs[a].type === "submit"){
       var Input = Inputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processLog(this)}
      NewInput.onselect = function(){ processLog(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.style.display = "none";
    }
  }
  updatePreviewWindowAttributes();
}

function processLog(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var action = Params["type"];
  var page = Params["page"];
  var user = Params["user"];
  liveLog(action, {page:page,user:user});
}

/* </source>

==== LiveFilter ====
<source lang=javascript> */

function liveFilter(Page, params) {
  var URL = wgServer;
  if(Page=="AbuseFilter"){
    URL += wgArticlePath.split("$1").join("Special:AbuseFilter/"+params);
    var FilterParams = params;
  }else{
    URL += wgScript + "?title=Special:AbuseLog";
    var FilterParams = new Array();

    for(var param in params){
      if(params[param]){
        URL += "&"+ param + "=" + encodeURIComponent(params[param]);
        FilterParams.push(param + ":" + lrcEscapeStr(""+params[param]));
      }
    }
    FilterParams = "{"+FilterParams.join(",")+"}";
  }
  lrcAddToHistory("liveFilter", new Array(lrcEscapeStr(Page), FilterParams), URL, FilterParams);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Filter: <span style='color:red'></span>...</b>");
  A&Lajax.http({ url: URL,
                onSuccess: getFilter,
                page: Page,
                args: params
              });
}

function getFilter(xmlreq, data) {
  var Args = data.args;
  var Page = data.page;
  var bC  = getPageContent(xmlreq);
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  if(typeof(Args)!="object"){
    var LogLink = '<a href="'+lrcGetUglyPageURL("Special:Abuselog", "&A&LSearchFilter="+Args)+'" '
                + ' onclick="liveFilter(\'AbuseLog\', {\'A&LSearchFilter\': \''+Args+'\'}); return false;" '
                + '>Abuselog '+Args+'</a>';
    buildBlanckPreviewBar('<b><a href="'+data.url+'" target="_new">'+Page+'</a></b> '+Args, true, LogLink);
  }else{
    var Text = "";
    for(var param in Args){
        Text += param + " = " + Args[param] + " ; ";
    }
    buildBlanckPreviewBar('<b><a href="'+data.url+'" target="_new">'+Page+'</a></b> '+Text, true);
    var InputTD = getElementsByClass("mw-submit", LP, "td")[0];
    if(InputTD){
        var Input = InputTD.firstChild;
        var NewInput = document.createElement('input');
        NewInput.type = "button";
        NewInput.id = "Live_mw-submit";
        NewInput.value = Input.value + " (live)";
        NewInput.onclick = function(){ processFilter(this)}
        NewInput.onselect = function(){ processFilter(this)}
        Input.parentNode.insertBefore(NewInput, Input);
        Input.style.display = "none";
     }
  }
  updatePreviewWindowAttributes();
  LiveRC_RunHooks("AfterPreviewFilter", data);
}

function processFilter(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  liveFilter("AbuseLog", Params);
}

/* </source>

==== LiveDelete ====

<source lang="javascript"> */

function liveDelete(Title){
  lrcAddToHistory("liveDelete", new Array(lrcEscapeStr(Title)), lrcGetUglyPageURL(Title, '&action=delete'), Title);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Suppr : <span style='color:red'>"+Title+"</span>...</b>");
  A&Lajax.http({url: lrcGetUglyPageURL(Title, '&action=delete'),
               onSuccess: getDelete, title:Title});
}

function getDelete(xmlreq, data){
    var c = data.title;
    var bC  = getPageContent(xmlreq, "deleteconfirm");
    if(!bC) bC = getPageContent(xmlreq, "mw-img-deleteconfirm");
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.appendChild(bC);
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    var Input = document.getElementById("A&LConfirmB");
    if(!Input) Input = document.getElementById("mw-filedelete-submit");
    var NewInput = document.createElement('input');
    NewInput.type = "button";
    NewInput.id = "Live_A&LConfirmB";
    NewInput.value = Input.value + " (live)";
    NewInput.onclick = function(){ processDelete(this)}
    NewInput.onselect = function(){ processDelete(this)}
    Input.parentNode.insertBefore(NewInput, Input);
    Input.style.display = "none";
    buildPreviewBar({
      "Mode"  : "Delete",
      "Url"   : lrcGetPageURL(c),
      "Page"  : c,
      "User1" : ""
    });
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPreviewDelete");
}

function processDelete(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    var action = Form.action;
    var Page = false;
    try{ Page = action.split("?title=")[1].split("&action=delete")[0]; }catch(e){ }
    try{ Page = decodeURIComponent(Page); }catch(e){ }
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL.join("&"),
                  onSuccess:doneDelete,
                  page:Page
                });
}

function doneDelete(ajaxDelete, data){
    var bC  = getPageContent(ajaxDelete);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = bC.innerHTML;
    if(data.data.indexOf("&A&LWatch=1")!=-1){
        if(!lstSuivi[data.page]) lstSuivi[data.page] = "--:--";
    }else{
        if(lstSuivi[data.page]) delete lstSuivi[data.page];
    }
}

/* </source>

==== LiveProtect ====

<source lang="javascript"> */

function liveProtect(Title){
  lrcAddToHistory("liveProtect", new Array(lrcEscapeStr(Title)), wgServer + wgScript + '?title=' + Title + '&action=protect', Title);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Protect : <span style='color:red'>"+Title+"</span>...</b>");
  A&Lajax.http({url: lrcGetUglyPageURL(Title, '&action=protect'),
               onSuccess: getProtect, title:Title});
}

function getProtect(xmlreq, data){
    var c = data.title;
    var ProtectionForm  = getPageContent(xmlreq, "mw-Protect-Form");
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.appendChild(ProtectionForm);
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    buildPreviewBar({
      "Mode"  : "Protect",
      "Url"   : wgServer + wgScript + '?title=' + encodeURIComponent(c) + '&action=protect',
      "Page"  : c,
      "User1" : ""
    });
    modifyProtectform();
}

function modifyProtectform(){
    var Input = document.getElementById("mw-Protect-submit");
    var NewInput = document.createElement('input');
    NewInput.type = "button";
    NewInput.id = "Live_mw-Protect-submit";
    NewInput.value = Input.value + " (live)";
    NewInput.onclick = function(){ processProtect(this)}
    NewInput.onselect = function(){ processProtect(this)}
    Input.parentNode.insertBefore(NewInput, Input);
    Input.style.display = "none";
    var Cascade = document.getElementById('mA&Lrotect-cascade');
    if(Cascade) Cascade.checked = false;
    var PreviewWindow = document.getElementById("livePreview");

    var ProtectEditSelect  = getElementWithId("mA&Lrotect-level-edit", 'select', PreviewWindow);
    ProtectEditSelect.onchange = function(){ modifyProtectformUpdate(this); };
    var ProtectMoveSelect  = getElementWithId("mA&Lrotect-level-move", 'select', PreviewWindow);
    ProtectMoveSelect.onchange = function(){ modifyProtectformUpdate(this); };

    var ProtectSet = getElementWithId("mA&LrotectSet", "table", PreviewWindow);
    var Target = ProtectSet.getElementsByTagName('tr')[0].nextSibling;
    var UnchainedInput = document.createElement('input');
    UnchainedInput.id = "mA&LrotectUnchained";
    UnchainedInput.type = "checkbox";
    UnchainedInput.onclick = function(){ ProtectUnchainedToggle(); };
    var UnchainedLabel = document.createElement('label');
    UnchainedLabel.setAttribute("for", "mA&LrotectUnchained");
    UnchainedLabel.innerHTML = lrcMediawikiMessages["protect-unchain-permissions"];
    var UnchainedTr = document.createElement('tr');
    var UnchainedTd = document.createElement('td');
    UnchainedTd.appendChild(UnchainedInput);
    UnchainedTd.appendChild(UnchainedLabel);
    UnchainedTr.appendChild(UnchainedTd);
    Target.parentNode.insertBefore(UnchainedTr, Target);

    ProtectUnchainedToggle();
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPrevieA&Lrotect");
}

function ProtectUnchainedToggle(){
    var PreviewWindow = document.getElementById("livePreview");
    var ProtectUnchainedInput  = getElementWithId("mA&LrotectUnchained", 'input', PreviewWindow);
        var ProtectMoveSelect  = getElementWithId("mA&Lrotect-level-move", 'select', PreviewWindow);
        if(ProtectUnchainedInput.checked){
            ProtectMoveSelect.disabled = false;
        }else{
            ProtectMoveSelect.disabled = "disabled";
        }
}

function modifyProtectformUpdate(Select){
    var PreviewWindow = document.getElementById("livePreview");
    var ProtectEditSelect  = getElementWithId("mA&Lrotect-level-edit", 'select', PreviewWindow);
    var ProtectMoveSelect  = getElementWithId("mA&Lrotect-level-move", 'select', PreviewWindow);
    var ProtectUnchainedInput  = getElementWithId("mA&LrotectUnchained", 'input', PreviewWindow);
    if(!ProtectEditSelect ||!ProtectMoveSelect || !ProtectUnchainedInput ) return;
    if(ProtectUnchainedInput.checked) return;
    var Value = Select.value;
    ProtectEditSelect.value = Value;
    ProtectMoveSelect.value = Value;
}

function processProtect(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    var action = Form.action;
    var Page = false;
    try{ Page = action.split("?title=")[1].split("&action=protect")[0]; }catch(e){ }
    try{ Page = decodeURIComponent(Page); }catch(e){ }
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL.join("&"),
                  onSuccess:doneProtect,
                  page:Page
                });
}

function doneProtect(ajaxProtect, data){
    var bC  = getPageContent(ajaxProtect);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = bC.innerHTML;
    if(data.data.indexOf("&mA&LrotectWatch=1")!=-1){
        if(!lstSuivi[data.page]) lstSuivi[data.page] = "--:--";
    }else{
        if(lstSuivi[data.page]) delete lstSuivi[data.page];
    }
}

/* </source>

==== LiveBlock ====

<source lang="javascript"> */

function liveBlock(UserName){
  lrcAddToHistory("liveBlock", new Array(lrcEscapeStr(UserName)), lrcGetPageURL('Special:Blockip/' + UserName), UserName);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Block : <span style='color:red'>"+UserName+"</span>...</b>");
  A&Lajax.http({url: lrcGetPageURL('Special:Blockip/' + UserName) ,
               onSuccess: getBlock, user:UserName});
}

function getBlock(xmlreq, data){
    var c = data.user;
    var bC  = getPageContent(xmlreq, "blockip");
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.appendChild(bC);
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    var Input = document.getElementsByName("A&LBlock")[0];
    var NewInput = document.createElement('input');
    NewInput.type = "button";
    NewInput.id = "Live_A&LBlock";
    NewInput.value = Input.value + " (live)";
    NewInput.onclick = function(){ processBlock(this)}
    NewInput.onselect = function(){ processBlock(this)}
    Input.parentNode.insertBefore(NewInput, Input);
    Input.style.display = "none";
    buildPreviewBar({
      "Mode"  : "Block",
      "Url"   : wgServer + wgScript + '?title=Special:Blockip/' + encodeURIComponent(c),
      "Page"  : c,
      "User1" : c
    });
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPreviewBlock");
}

function processBlock(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    var user = Params["A&LBlockAddress"];
    var duration = Params["A&LBlockExpiry"];
    if(Params["A&LBlockOther"]!="") duration = Params["A&LBlockOther"];
    var action = Form.action;
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL.join("&"),
                  onSuccess:doneBlock,
                  user:user,
                  duration:duration
                });
}

function doneBlock(ajaxBlock, data){
    var user = data.user;
    var userpage = wgFormattedNamespaces[2]+":"+user;
    var usertalk = wgFormattedNamespaces[3]+":"+user;
    if(data.data.indexOf("&A&LWatchUser=1")!=-1){
        if(!lstSuivi[userpage]) lstSuivi[userpage] = "--:--";
        if(!lstSuivi[usertalk]) lstSuivi[usertalk] = "--:--";
    }else{
        if(lstSuivi[userpage]) delete lstSuivi[userpage];
        if(lstSuivi[usertalk]) delete lstSuivi[usertalk];
    }
    var bC  = getPageContent(ajaxBlock);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = bC.innerHTML;
    var user = data.user;
    var duration = data.duration;
    if(user && duration ){
        var Bar = PreviewBarTemplate;
        var UserLink = '<b>'+lrcGetUserLink(user)+' '+lang_messages.BLOCKED+'</b>';
        var BlockAverto = '&nbsp;<small>'
                        + '<a id="BlockAvertoLink" href="javascript:;" '
                        + 'onClick="doBlockAverto('+lrcEscapeStr(user)+');" title="'+lang_menu.USERMSG+' « '+user+' »">'+lang_menu.USERMSG+'</a> : '
                        + '<input id="BlockAvertoParam" type="text" value="'+lang_messages.BLOCKTEMPLATE+'|'+duration+'" />'
                        + '</small>';
        Bar = Bar.split('$1').join(UserLink);
        Bar = Bar.split('$2').join("&nbsp;");
        Bar = Bar.split('$3').join("&nbsp;");
        Bar = Bar.split('$4').join(BlockAverto);
        var TabContainer = document.getElementById("livePreviewTitle");
        if(TabContainer) TabContainer.innerHTML = Bar;

    }
}

function doBlockAverto(user){
  var message = document.getElementById("BlockAvertoParam").value;
  var summary = lang_messages.BLOCKAVERTO;
  A&Lajax.http({ url: wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&intoken=edit&inprop=protection&titles='+wgFormattedNamespaces[3]+":"+user.replace(/&/g, "%26"),
                onSuccess: postLiveAverto,
                user: user, message: message, summary:summary });
}

/* </source>

==== LiveEdit ====

<source lang="javascript"> */

function liveEdit(Title, Param){
  lrcAddToHistory("liveEdit", new Array(lrcEscapeStr(Title), (Param?lrcEscapeStr(""+Param):'\'\'')), wgServer + wgScript + '?title=' + Title + '&action=edit' + (Param ? Param : ""), Title + (Param ? ' Param="'+Param+'"' : ""));
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Edit : <span style='color:red'>"+Title+"</span>...</b>");
  A&Lajax.http({url: lrcGetUglyPageURL(Title, '&action=edit' + (Param ? Param : "")),
               onSuccess: getEdit, title:Title});
}

function getEdit(xmlreq, data){
    var c = data.title;
    var bC  = getPageContent(xmlreq);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.appendChild(bC);
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    buildPreviewBar({
      "Mode"  : "Edit",
      "Url"   : wgServer + wgScript + '?title=' + encodeURIComponent(c) + '&action=edit',
      "Page"  : c,
      "User1" : ""
    });
    modifyEditform(bC);
}

function modifyEditform(Editform){
    var inputs = new Array("A&LSave", "A&LPreview", "A&LDiff");
    for(var a=0,l=inputs.length;a<l;a++){
        var Input = document.getElementById(inputs[a]);
        var NewInput = document.createElement('input');
        NewInput.type = "button";
        NewInput.id = "Live_" + Input.id;
        NewInput.value = Input.value + " (live)";
        NewInput.onclick = function(){ processEdit(this)}
        NewInput.onselect = function(){ processEdit(this)}
        Input.parentNode.insertBefore(NewInput, Input);
        Input.style.display = "none";
    }
    currentFocused = document.getElementById("A&LTextbox1"); // Do not change variable name : used by insertTags()
    currentFocused.rows = 10;
    try{
        var ToolbarButtons = document.getElementById('toolbar').getElementsByTagName('script')[0].innerHTML;
        eval(ToolbarButtons);
        mwSetupToolbar();
    }catch(e){ }
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPreviewEdit");
}

function processEdit(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    var Type = Input.id.replace(/.*_/g, "");
    ParamsInURL  = ParamsInURL.join("&")+"&"+Type+"=1";
    var action = Form.action;
    var Page = false;
    try{ Page = action.split("?title=")[1].split("&action=submit")[0]; }catch(e){ }
    try{ Page = decodeURIComponent(Page); }catch(e){ }
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL,
                  onSuccess:doneEdit,
                  type:Type,
                  page:Page
                });
}

function doneEdit(ajaxEdit, data){
    var Type = data.type;
    var bC  = getPageContent(ajaxEdit);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = bC.innerHTML;
    if(getElementWithId("editform", 'form', bC)){
        modifyEditform();
        if(Type=="A&LDiff") getElementWithId('wikiPreview', 'div', PreviewWindow).style.display = "";
    }else if(Type == "A&LSave"){
        PreviewWindow.className = "";
        if(data.data.indexOf("&A&LWatchtis=1")!=-1){
            if(!lstSuivi[data.page]) lstSuivi[data.page] = "--:--";
        }else{
            if(lstSuivi[data.page]) delete lstSuivi[data.page];
        }
        LiveRC_RunHooks("AfterPreviewArticle", data);
    }
}

/* </source>

==== LiveMove ====

<source lang="javascript"> */

function liveMove(Title){
  lrcAddToHistory("liveMove", new Array(lrcEscapeStr(Title)), lrcGetPageURL("Special:Movepage/"+ Title), Title);
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Move : <span style='color:red'>"+Title+"</span>...</b>");
  A&Lajax.http({url: lrcGetPageURL("Special:Movepage/"+ Title), onSuccess: getMove, title:Title});
}

function getMove(xmlreq, data){
    var c = data.title;
    var bC  = getPageContent(xmlreq, "movepage");
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.appendChild(bC);
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    var MoveSubmit = false;
    var Inputs = bC.getElementsByTagName("input");
    for(var a=0,l=Inputs.length;a<l;a++){
        if(Inputs[a].name && Inputs[a].name == "A&LMove") MoveSubmit = Inputs[a];
    }
    if(MoveSubmit){
        var NewInput = document.createElement('input');
        NewInput.type = "button";
        NewInput.id = "Live_A&LMove";
        NewInput.name = "Live_A&LMove";
        NewInput.value = MoveSubmit.value + " (live)";
        NewInput.onclick = function(){ processMove(this)}
        NewInput.onselect = function(){ processMove(this)}
        MoveSubmit.parentNode.insertBefore(NewInput, MoveSubmit);
        MoveSubmit.style.display = "none";

    }
    buildPreviewBar({
      "Mode"  : "Move",
      "Url"   : lrcGetPageURL('Special:Movepage/'+ c),
      "Page"  : c,
      "User1" : ""
    });
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPreviewMove");
}

function processMove(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    var action = Form.action;
    var OldPage = Params["A&LOldTitle"];
    var NeA&Lage = Params["A&LNewTitle"];
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL.join("&"),
                  onSuccess:doneMove,
                  oldpage:OldPage,
                  neA&Lage:NeA&Lage
                });
}

function doneMove(ajaxMove, Type){
    var bC  = getPageContent(ajaxMove);
    var PreviewWindow = document.getElementById("livePreview");
    var MoveForm = getElementWithId("movepage", 'form', PreviewWindow)
    if(MoveForm){
        var OldTitle = document.getElementsByName("A&LOldTitle")[0].value;
        getMove(ajaxMove, OldTitle);
    }else{
        PreviewWindow.innerHTML = bC.innerHTML;
        if(data.data.indexOf("&A&LWatch=1")!=-1){
            if(!lstSuivi[data.oldpage]) lstSuivi[data.oldpage] = "--:--";
            if(!lstSuivi[data.neA&Lage]) lstSuivi[data.neA&Lage] = "--:--";
        }else{
            if(lstSuivi[data.oldpage]) delete lstSuivi[data.oldpage];
            if(lstSuivi[data.neA&Lage]) delete lstSuivi[data.neA&Lage];
        }
    }
}

/* </source>

==== LiveRevisiondelete ====

<source lang="javascript"> */

function buildRevisiondeleteBar(Page){
    var PreviewDiv = document.getElementById( 'livePreview' );
    if(!PreviewDiv) return "";
    var HideSpans = getElementsByClass("mw-revdelundel-link", PreviewDiv, "span");
    var HideLinks = new Array();
    for(var a=0,l=HideSpans.length;a<l;a++){
        var Link = HideSpans[a].getElementsByTagName('a')[0];
        var Id = lrcGetArgFromURL(Link.href, "ids");
        var HideLink = '<a href="'+wgServer + wgScript + '?title=Special:Revisiondelete&type=revision&target='+encodeURIComponent(Page)+'&ids='+Id+'" '
                     + 'onClick="liveRevisiondelete('+lrcEscapeStr(Page)+','+Id+'); return false;" '
                     + 'title="'+lang_tooltips.REVISIONDELETE_TIP+' '+Id+'">'+Id+'</a>';
        HideLinks.push(HideLink);
    }
    if(HideLinks.length==0) return "";
    var RevisiondeleteTabs = '<small>'
                           + lang_tooltips.REVISIONDELETE_SHORT
                           + '&nbsp;:&nbsp;'
                           + HideLinks.join('&nbsp;|&nbsp;')
                           + '</small>'
                           + '&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;';
    return RevisiondeleteTabs;
}

function liveRevisiondelete(Page,Id){
    var URLids = "";
    var Histids = "";
    var HistPamamids = Id;
    if(typeof(Id)=='object'){
        URLids = lrcGetUglyPageURL(Page, '&action=historysubmit&revisiondelete=1&diff=prev&oldid='+Id[0]);
        HistPamamids = new Array();
        for(var Num in Id){
            HistPamamids.push(Num+":"+Id[Num]);
            URLids += "&ids[" + Id[Num] + "]=1";
            Histids += Id[Num] + " ";
        }
        HistPamamids = "{"+HistPamamids.join(",")+"}";
    }else{
        URLids = lrcGetUglyPageURL('Special:Revisiondelete', '&type=revision&target='+encodeURIComponent(Page)+"&");
        URLids += 'ids='+Id;
        Histids = Id;
    }
    lrcAddToHistory("liveRevisiondelete", new Array(lrcEscapeStr(Page), HistPamamids), URLids, Page + " id="+Histids);
    buildBlanckPreviewBar("<b style='text-decoration: blink;'>Revision delete : <span style='color:red'>"+Page+" id="+Histids+"</span>...</b>")
    A&Lajax.http({ url: URLids, onSuccess: getRevisiondelete, mpage: Page});
}

function getRevisiondelete(xmlreq, data){
    var c = data.mpage;
    var bC  = getPageContent(xmlreq);
    var PreviewDiv = document.getElementById( 'livePreview' );
    PreviewDiv.innerHTML = bC.innerHTML;
    if (PreviewDiv.innerHTML == "undefined") PreviewDiv.innerHTML = bC.xml;
    lrcCloseAll();
    addClass(document.body, "LiveRCPreviewDisplayed");
    buildPreviewBar({
      "Mode"  : "Revisiondelete",
      "Url"   : lrcGetPageURL(c),
      "Page"  : c,
      "User1" : "",
      "User2" : "",
      "patrolledDiff": true
    });
    getRevisiondelete_ModifyInputs();
}

function getRevisiondelete_ModifyInputs(){
    var Form = document.getElementById("mw-revdel-form-revisions");
    if(!Form) return;
    var Input = document.getElementsByName("A&LSubmit")[0];
    if(Input){
        var NewInput = document.createElement('input');
        NewInput.type = "button";
        NewInput.id = "Live_Revisiondelete";
        NewInput.value = Input.value + " (live)";
        NewInput.onclick = function(){ processRevisiondelete(this)}
        NewInput.onselect = function(){ processRevisiondelete(this)}
        Input.parentNode.insertBefore(NewInput, Input);
        Input.style.display = "none";
    }
    updatePreviewWindowAttributes();
    LiveRC_RunHooks("AfterPreviewRevisiondelete");
}

function processRevisiondelete(Input){
    var Form = getFormFromThisInput(Input);
    var Params = getFormParams(Form);
    if(!Params) return;
    var Page = decodeURIComponent(Params["target"]);
    var Id = Params["ids"];
    var action = Form.action;
    var headers = new Array();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    buildBlanckPreviewBar("<b style='text-decoration: blink;'>Revision delete : <span style='color:red'>"+Page+" id="+Id+"</span>...</b>")
    var ParamsInURL = new Array();
    for(var P in Params){
        if(typeof(Params[P])=="string") ParamsInURL.push(P+"="+encodeURIComponent(Params[P]));
    }
    A&Lajax.http({ url: action,
                  method: "POST",
                  headers: headers,
                  data: ParamsInURL.join("&")+"&A&LSubmit=1",
                  onSuccess:doneRevisiondelete,
                  mpage:Page,
                  mid:Id
                });
}

function doneRevisiondelete(xmlreq, data){
    var Page = data.mpage;
    var Id = data.mid;
    var bC  = getPageContent(xmlreq);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = bC.innerHTML;
    buildPreviewBar({
      "Mode"            : "Revisiondelete",
      "Url"             : lrcGetPageURL(Page),
      "Page"            : Page,
      "Oldid"           : Id,
      "User1"           : "",
      "User2"           : "",
      "patrolledDiff"   : true,
      "RevisiondeleteOK": true
    });
    getRevisiondelete_ModifyInputs();
}

/* </source>

==== LiveWhatLinkshere ====

<source lang="javascript"> */

function liveWhatlinkshere(page , params) {
  var URLParams = "";
  var HistoryParams = new Array();
  for(var param in params){
    if(params[param]){
      URLParams += "&"+ param + "=" + encodeURIComponent(params[param]);
      HistoryParams.push(param + ":" + lrcEscapeStr(""+params[param]));
    }
  }
  lrcAddToHistory("liveWhatlinkshere", new Array(lrcEscapeStr(page), "{"+HistoryParams.join(",")+"}"),
lrcGetUglyPageURL('Special:Whatlinkshere/'+page, URLParams), page + " : " + HistoryParams.join(", "));
  buildBlanckPreviewBar("<b style='text-decoration: blink;'>Whatlinkshere <span style='color:red'>"+page+"</span>...</b>");
  A&Lajax.http({url:lrcGetUglyPageURL('Special:Whatlinkshere/'+page, URLParams), onSuccess: getWhatlinkshere, page:page });
}

function getWhatlinkshere(xmlreq, data) {
  var bC  = getPageContent(xmlreq);
  var c = data.page;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  lrcCloseAll();
  addClass(document.body, "LiveRCPreviewDisplayed");
  buildBlanckPreviewBar('<b><a href="'+lrcGetPageURL(c)+'" target="_new">'+c+'</a></b>', true);
  modifyWhatlinkshereInput(data.url);
  LiveRC_RunHooks("AfterPreviewWhatlinkshere");
}

function modifyWhatlinkshereInput(url){
  var LP = document.getElementById( 'livePreview' );
  var Form = LP.getElementsByTagName('form')[0];
  var Inputs = Form.getElementsByTagName('input');
  for(var a=0,l=Inputs.length;a<l;a++){
    if(Inputs[a].type && Inputs[a].type === "submit"){
      var Input = Inputs[a];
      var NewInput = document.createElement('input');
      NewInput.type = "button";
      NewInput.value = Input.value + " (live)";
      NewInput.onclick = function(){ processWhatlinkshere(this)}
      NewInput.onselect = function(){ processWhatlinkshere(this)}
      Input.parentNode.insertBefore(NewInput, Input);
      Input.style.display = "none";
    }
  }
  var NewFiltersContainer = document.createElement('p');
  Form.getElementsByTagName('fieldset')[0].appendChild(NewFiltersContainer);
  var FilterFieldset = LP.getElementsByTagName('fieldset')[1];
  if(FilterFieldset){
    var FilterLegend = FilterFieldset.getElementsByTagName('legend')[0];
    NewFiltersContainer.appendChild(document.createTextNode(lrcMediawikiMessages["whatlinkshere-filters"]+' : '));
    FilterLegend.parentNode.removeChild(FilterLegend);
    var FilterLinks = FilterFieldset.getElementsByTagName('a');
    var FiltersTexts = getTextContent(FilterFieldset).split('|');
    var params = {
      "hidetrans"  : "whatlinkshere-hidetrans"  ,
      "hidelinks"  : "whatlinkshere-hidelinks" ,
      "hideredirs" : "whatlinkshere-hideredirs"  ,
      "hideimages" : "whatlinkshere-hideimages"
    };
    for(var param in params){
      var ThisParam = param;
      var ThisParamChecked = ( (lrcGetArgFromURL(url, ThisParam) === '1') ? true : false );
      var NewInput = document.createElement('input');
      NewInput.type = "checkbox";
      NewInput.id = ThisParam;
      NewInput.name = ThisParam;
      NewInput.value = 1;
      if(ThisParamChecked) NewInput.checked = "checked";
      var NewLabel = document.createElement('label')
      NewLabel.setAttribute('for', ThisParam);
      NewLabel.innerHTML = lrcMediawikiMessages[params[param]].split("$1").join(lrcMediawikiMessages["hide"]);
      NewFiltersContainer.appendChild(NewInput);
      NewFiltersContainer.appendChild(NewLabel);
      NewFiltersContainer.appendChild(document.createTextNode(" • "));
    }
    FilterFieldset.parentNode.removeChild(FilterFieldset);
  }
  updatePreviewWindowAttributes(NewLabel);
}

function processWhatlinkshere(Input){
  var Form = getFormFromThisInput(Input);
  var Params = getFormParams(Form);
  var page = Params["target"];
  liveWhatlinkshere(page, Params);
}

/* </source> */