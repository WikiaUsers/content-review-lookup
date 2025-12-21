(function()  {
  "use strict";
  
  /*
  Cette page sépare nettement les fonctionnalités de l'EBG en dédiant à
  chacune d'entre elles une "closure" -- (function(){"use strict";...})();.
  Lorsqu'une de ces fonctionnalités en a besoin, elle peut créer & utiliser
  l'objet "window.ebg.nomDeFonctionnalite" pour stocker des valeurs ou des 
  références. Chacun de ces éléments *doit* être déclaré au sommet de la 
  "closure" de sa fonctionnalité. Chaque fonctionnalité peut aussi accéder à
  des valeurs et références inter-fonctionnalités avec "window.ebg.common".
  
   Pour limiter les bugs & garder le code lisible, on n'ajoute dans ebg que :
   - Des références à des objets qui risqueraient d'être nettoyés autrement
   - Des choses utiles à plusieurs fonctionnalités lorsqu'elles sont chères
     ou compliquées à construire -- les mettre dans ebg.common
   - Des fonctions utilitaires ou partagées, à mettre dans ebg.common
   
   De plus, les fonctionnalités ne doivent pas :
   - Changer quoi que ce soit de ce qui est dans ebg.common. C'est en lecture
     seule, "get". (Seule la 1ère "closure" définit le contenu d'ebg.common.)
   - Utiliser ou changer ce que les autres fonctionnalités ajoutent dans leur
     ebg.nomDeFonctionnalite. C'est privé.
  */
  
  if (window.ebg == undefined)  window.ebg = {};
  if (window.ebg.common == undefined)  window.ebg.common = {};
  
  var common = window.ebg.common;
  
  /************** Listes potentiellement chères à construire **************/
  // Titres de "Encyclopédie Baldur's Gate:Liste d'articles types"
  if (!(common.pageTypes instanceof Array))  common.pageTypes = null;
  
  /***** Références nécessaires pour pouvoir surcharger ces fonctions *****/
  if (!(common.realXHROpen instanceof Function))
    common.realXHROpen = window.XMLHttpRequest.prototype.open;
  if (!(common.realStringConcat instanceof Function))
    common.realStringConcat = window.String.prototype.concat;
  
  /************************* Fonctions utilitaires *************************/
  if (!(common.getNSName instanceof Function))  {
  	// "4" --> "Project", c'est-à-dire "Encyclopédie Baldur's Gate" ici
    common.getNSName = function(sId)  {
      return mw.config.get("wgFormattedNamespaces")[String(sId)];
    };
  }
  
  if (!(common.honorIncludeTags instanceof Function))  {
    // Nécessaire quand le contenu d'une page est chargé avec "action=raw"
    common.honorIncludeTags = function(content)  {
      return content.replace(
       /[^]*?<onlyinclude>([^]*?)<\/onlyinclude>(?:(?!<onlyinclude>)[^])*/gi,
       "$1"
      ).replace(
       /<noinclude>[^]*?<\/noinclude>|<includeonly>|<\/includeonly>/gi, ""
      );
    };
  }
  
  if (!(common.loadPageTypes instanceof Function))  {
  	var jqXHRLoadPageTypes = null;
  	// Télécharge la liste d'articles types de la wiki et la stocke dans
  	// common.pageTypes. Voir "Catégorie:Articles types" pour + de détails.
  	// La fonction "callback" est garantie d'être appelée, sauf "alert()".
  	common.loadPageTypes = function(callback)  {
      // Le téléchargement est en cours, inutile de rappeler cette fonction
  	  if (jqXHRLoadPageTypes !== null && this.pageTypes === null)  return;
  	  
  	  // Tout est déjà prêt, on rend immédiatement le contrôle
      if (this.pageTypes !== null)  {
        callback.call();
        return;
      }
      
      // Formatte le contenu téléchargé, le stocke et appelle "callback"
  	  var formatPageTypes = function(content)  {
  	  	jqXHRLoadPageTypes = null;
        if (common.pageTypes !== null)  return;
        
        // Sera considéré comme titre toute suite de caractères commençant et
        // terminant par un caractère non-blanc, non-_, et ne pouvant inclure
        // que ces caractères, des espaces normales et _. Chaque suite d'au
        // moins un caractère blanc hors espaces normales signifie "le titre
        // actuel a été capturé en entier au dernier non-blanc rencontré".
        var S = "a-z0-9çàâäéèêëîïôöùûüæœ°~,;.:'\"()!&\\\\/*";
        var rTitles = new RegExp("["+S+"-](?:["+S+" _-]*["+S+"-])?", "gi");
        var aMatch;
        var pageTypes = [];
        
        content = common.honorIncludeTags(content);
        while ((aMatch = rTitles.exec(content)) !== null)
          pageTypes[pageTypes.length] = aMatch[0];
        
        common.pageTypes = pageTypes;
        callback.call();
  	  };
  	  
  	  // Lance le téléchargement
      jqXHRLoadPageTypes = $.get(mw.util.wikiScript(), {
        title: this.getNSName("4") + ":Liste d'articles types",
        action: "raw"
      }).done(formatPageTypes).fail(function()  {
        jqXHRLoadPageTypes = null;
        alert("Échec du chargement de la liste d'articles types.");
      });
  	};
  }
})();

/***************************** FONCTIONNALITÉS *****************************/

// Ajoute un menu de sélection d'articles types en haut à droite de l'éditeur
(function()  {
  "use strict";
  
  if (window.ebg.editor == undefined)  window.ebg.editor = {};
  if (!(window.ebg.editor.selectPageType instanceof Element))
    window.ebg.editor.selectPageType = null;
  if (!(window.ebg.editor.obsDOMChange instanceof MutationObserver))
    window.ebg.editor.obsDOMChange = null;
  
  // Télécharge le contenu de l'article type choisi & le colle dans l'éditeur
  function loadAndPastePageType(title)
  {
  	// En prenant les appellations de "Spécial:Préférences > Modification" :
  	// "ÉditeurVisuel"/"ÉditeurVisuel - mode source" OU "Éditeur source"
    var txtArea = document.getElementsByClassName("ve-ce-rootNode")[0] ||
                  document.getElementsByClassName("CodeMirror-code")[0];
    
    if (txtArea === undefined)  {
      alert("Zone de texte introuvable, impossible d'insérer l'article.");
      return;
    }
    
    // Le serveur ne veut pas d'encodeURIComponent() à cet endroit
    var page = window.ebg.common.getNSName("4") + ":" + title;
    $.get(mw.util.wikiScript(), {title: page, action: "raw"}).done(
      function(content)  {
      	content = window.ebg.common.honorIncludeTags(content);
        // ClipboardEvent n'est pas compatible avec IE11
        // text/x-wiki échoue avec CodeMirror, l'ancien "Éditeur source"
        txtArea.dispatchEvent(new ClipboardEvent(
          "paste", {dataType: "text/plain", data: content}
        ));
      }
    ).fail(function() { alert('Échec du chargement de "' + page + '".'); });
  }
  
  // Place le menu <select> en haut à droite de l'éditeur
  function attachToDOM(elemSelect)
  {
    // Utiliser document.contains s'il faut être compatible IE11
    if (elemSelect.isConnected)  return;
    
    var header = document.getElementsByClassName("ve-fd-header__actions")[0];
    if (header !== undefined)  header.prepend(elemSelect);
    else console.log("Point d'attache du <select> de page type non trouvé.");
  }
  
  // Ajoute les titres des articles types dans <select>
  function addSelectOptions(elemSelect, pageTypes)
  {
    if (elemSelect.options.length > 1)  return;
    
    var pageTitle;
    var option;
    for (var i = 0, len = pageTypes.length; i < len; ++i)
    {
      pageTitle = pageTypes[i];
      option = document.createElement("option");
      option.value = pageTitle;
      option.text = pageTitle.replace(/\((BG\d+)\)$/, "$1");
      elemSelect.appendChild(option);
    }
  }
  
  // Crée & configure l'élément <select> et s'assure qu'il sera ajouté au DOM
  function createSelectNode()
  {
    if (window.ebg.editor.selectPageType !== null)  return;
    
    var selectPageType = document.createElement("select");
    window.ebg.editor.selectPageType = selectPageType;
    
    var option = document.createElement("option");
    option.value = "";
    option.text = "Choix du type d'article";
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    selectPageType.appendChild(option);
    
    if (window.ebg.common.pageTypes !== null)
      addSelectOptions(selectPageType, window.ebg.common.pageTypes);
    
    attachToDOM(selectPageType);
    
    // Quand un article type est sélectionné, on le télécharge et l'affiche
    selectPageType.addEventListener("change", function(e)  {
      if (this.selectedIndex === 0)  return;
      loadAndPastePageType(this.value);
      // Assure que <select> affichera toujours "Choix du type d'article"
      this.selectedIndex = 0;
    });
    
    // On réessaiera d'attacher au DOM plus tard si les conditions n'étaient
    // pas prêtes en passant ici (situation inattendue). De plus, 'ancien
    // "Éditeur source" (CodeMirror) détache notre <select> du DOM lors du 
    // basculement vers et depuis le mode visuel, donc il faut le rattacher.
    var obsDOMChanges = new MutationObserver(function(records)  {
      attachToDOM(selectPageType);
    });
    obsDOMChanges.observe(document, {childList: true, subtree: true});
    // Référence forte pour être sûr que l'observateur ne sera pas nettoyé
    window.ebg.editor.obsDOMChanges = obsDOMChanges;
  }
  
  // Sachant pageTypes est prêt, ajoute les options si <select> l'est aussi
  function onPageTypesLoaded()
  {
  	var ebg = window.ebg;
    if (ebg.editor.selectPageType !== null)
      addSelectOptions(ebg.editor.selectPageType, ebg.common.pageTypes);
  }
  
  // Déclenche le téléchargement des titres et la création de <select>
  function onEditorReady(isCodeMirrorReady, codeMirrorTopParent)
  {
  	if (isCodeMirrorReady === false)  return;
    
    window.ebg.common.loadPageTypes(onPageTypesLoaded);
    createSelectNode();
  }
  
  // Demande notification qd "ÉditeurVisuel" (incl. "mode source") est activé
  mw.hook("ve.activationComplete").add(onEditorReady);
  // Demande une notification quand "Éditeur source" est activé
  mw.hook("ext.CodeMirror.switch").add(onEditorReady);
  
  // Pense-bête départageant "ÉditeurVisuel" & "ÉditeurVisuel - mode source"
  // ve.init.target.getSurface().getMode();  // "visual" ou "source"
})();


// La fenêtre "Ajouter une page" permet le choix du type d'article à créer
(function() {
  "use strict";
  
  if (window.ebg.newPagePopUp == undefined)  window.ebg.newPagePopUp = {};
  if (!(window.ebg.newPagePopUp.obsBodyChildren instanceof MutationObserver))
    window.ebg.newPagePopUp.obsBodyChildren = null;
  
  // URL utilisée par "Special:CreatePage" et "⋮ --> Ajouter une page"
  var WANTED_URL = "/fr/wikia.php?controller=CreatePage&method=checkTitle";
  // La réponse complète attendue est {"result":"ok"}
  var WANTED_RESPONSE = /^\s*\{\s*["']result["']\s*:\s*["']ok["']\s*\}\s*$/i;
  
  // Sachant pageTypes prêt, on crée, configure et attache les boutons radio.
  // Puis on surcharge XMLHttpRequest.prototype.open pour intercepter la 
  // requête faite par Fandom lors du clic sur "Suivant". Si la réponse du
  // serveur indique que c'est la requête qu'on attend, on surcharge
  // String.prototype.concat car Fandom s'apprête à changer location.href par
  // ce biais. Avec concat on s'assure que la nouvelle URL chargera l'article
  // type choisi dans l'éditeur en fonction du bouton radio sélectionné.
  function onPageTypesLoaded()
  {
  	var pageTitle;
    var radio, spanRadio;
    var articleType = null;
    var pageTypes = window.ebg.common.pageTypes;
    var onRadioChange = function(e)  {
      // Quand un bouton radio est choisi, on retient sa valeur pour après
      if (this.checked)  articleType = this.value;
    };
    var divPageTypes = document.createElement("div");
    divPageTypes.classList.add(
      "ebg-flex-container", 
      "ebg-flex-container--wrap", 
      "ebg-flex-container--center"
    );
    
    for (var i = 0; i < pageTypes.length; ++i)
    {
      pageTitle = pageTypes[i];
      spanRadio = document.createElement("span");
      spanRadio.classList.add("ebg-flex-container__item");
      radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "pgTypes";  // Pas sûr que définir "name" marche avec IE11
      radio.value = pageTitle;
      
      spanRadio.append(radio, pageTitle.replace(/\((BG\d+)\)$/, "$1"));
      divPageTypes.append(spanRadio);
      
      radio.addEventListener("change", onRadioChange);
    }
    var attachPoint = document.querySelector(
      "form.create-page-dialog__wrapper .wds-dialog__content"
    );
    if (attachPoint === null)  {
      console.log("Le formulaire de création a-t-il été fermé ? Impossible "+
                  "d'afficher les choix de type d'article à créer.");
      return;
    }
    attachPoint.appendChild(divPageTypes);
    
    // Attend la réponse du serveur après un clic sur "Suivant"
    window.XMLHttpRequest.prototype.open = function(mthd, url, asy, u, pwd) {
      // Si c'est une autre requête, on laisse les choses se faire sans nous
      if (!url.includes(WANTED_URL))
        return window.ebg.common.realXHROpen.apply(this, arguments);
      
      // C'est la bonne requête, on écoute la réponse
      this.addEventListener('load', function()  {
        // On n'intervient que si la réponse est précisément ce qu'on attend
        if (this.readyState !== XMLHttpRequest.DONE ||
            this.status !== 200 ||
            !WANTED_RESPONSE.test(this.responseText) ||
            !this.responseURL.includes(WANTED_URL)
        ) return;
        
        // C'est la réponse attendue, Fandom s'apprête à changer la page
        window.String.prototype.concat = function(s1, s2, s3, s4, s5)  {
          if (s1 === "action=edit" || s1 === "veaction=edit" || 
              s1 === "veaction=editsource")  {
            // Fandom est en train de finir de construire l'URL, on y ajoute
            // un bout en fonction du bouton radio sélectionné
            if (articleType !== null)  {
              arguments[0] += "&preload=" + encodeURIComponent(
                window.ebg.common.getNSName("4") + ":" + articleType
              );
            }
          }
          return window.ebg.common.realStringConcat.apply(this, arguments);
        };
      });
      return window.ebg.common.realXHROpen.apply(this, arguments);
    };
  }
  
  // Si la fenêtre "Ajouter une page" est affichée, lance le téléchargement
  // de la liste d'articles types et signale quoi faire après
  function onBodyChildChange(mutations, _)
  {
    mutations.forEach(function(mutRecord)  {
      if (mutRecord.type !== "childList")	return;
      
  	  // On regarde tout ajout d'un enfant direct à <body>
      mutRecord.addedNodes.forEach(function(node)  {
        if (!(node instanceof Element))	return;
        
        // On ne prend qu'un élément ayant un <form> avec la bonne classe CSS
        var form = node.getElementsByTagName("form")[0];
        if (form === undefined ||
            !form.className.includes("create-page-dialog__wrapper"))
          return;
        
        // On s'assure que le point d'attache désiré est bien présent
        var attachPoint = form.getElementsByClassName(
          "wds-dialog__content"
        )[0];
        if (attachPoint === undefined)  {
          alert("Impossible d'ajouter au formulaire les choix de type " +
                "d'article à créer.");
          return;
        }
        
        // Suffisamment de conditions sont satisfaites, on installe
        window.ebg.common.loadPageTypes(onPageTypesLoaded);
      });
    });
  }
  
  // On observe chaque changement à la liste d'enfants directs de <body>, car
  // on attend la fenêtre flottante "Ajouter une page" pour installer la
  // fonctionnalité dessus.
  var obs = new MutationObserver(onBodyChildChange);
  obs.observe(document.getElementsByTagName("body")[0], {childList: true});
  // Prévient le nettoyage du MutationObserver si le noeud observé disparaît.
  window.ebg.newPagePopUp.obsBodyChildren = obs;
})();
// [[Catégorie:CSS et JavaScript]]