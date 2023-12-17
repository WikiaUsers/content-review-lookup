/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Etiquettes Utilisateurs */

window.UserTagsJS = {
	modules: {},
	tags: {
		// groupe: { tag associé }
        victime: { u:'Victime'},
        dieu: { u:'Kami-sama'},
        nondieu: { u:'Kami-sama (ou pas)'},
        consanguin: { u:'Consanguin', f:'Consanguine' },
        schizo: { u:'Schizo sans ami'},
        rage: { u:'Rageux', f:'Rageuse' },
        tyran: { u:'Tyran'},
        creature: { u:'Créature extraordinaire'},
        homme: { u:'Truc de Fuji', m:'Homme de Fuji', f:'Femme de Fuji' },
        bouteille: { u:'Bouteille'},
        fakeadmin: {u:'Administrateur'},
        confiance: {u:'Membre de Confiance'},
        confirme: {u:'Membre Confirmé', f:'Membre Confirmée'},
        baka: {u:'Baka' },
        jubi: {u:'Truc de Jubi', m:'Homme de Jubi', f:'Femme de Jubi' },
        essentiel: {u:'Membre Essentiel', f:'Membre Essentielle' },
        correcteur: {u:'Correcteur', f:'Correctrice' },
        momo: {u:'Méga Octet' },
        robot: {u:'Bot'},
        modo: {u:'Modérateur', f:'Modératrice'}
	}
};
 
UserTagsJS.modules.custom = {
        'JealyJ': ['essentiel', 'dieu', 'tyran', 'bouteille', 'baka', 'homme'],
        'Fujimaru-kun': ['dieu', 'tyran', 'jubi', 'correcteur'],
        'Alpha Lucy': ['robot'],
        'Akemi7': ['essentiel', 'victime', 'rage'],
        'Ryffo': ['rage', 'consanguin'],
        'Avadonia': ['schizo', 'rage'],
        'NikoErza': ['nondieu', 'confiance'],
        'HamtaFabien': ['homme', 'consanguin', 'confiance'],
        'RebyRina': ['bouteille', 'confiance' ,'correcteur'],
        'Reby Redfox': ['essentiel', 'correcteur'],
        'EqueenK': ['confiance', 'creature'],
        'Oméga': ['essentiel', 'correcteur', 'momo'],
        'Linacho' : ['confirme'],
        'Dalca Niorl' : ['confirme']
};

UserTagsJS.modules.implode = {
	'modo': ['content-moderator', 'threadmoderator']
};

/* Système de notation de fictions (RatingWidget) */
(function(d, t, e, m){
    
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
                
        RW.init({
            huid: "221141",
            uid: "5ce8680f8035f3cc44fbeb6b8399a1f5",
            source: "website",
            options: {
                "size": "medium",
                "lng": "fr",
                "style": "oxygen",
                "forceSync": false
            } 
        });
        RW.render();
    };
        // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0], id = "rw-js",
        l = d.location, ck = "Y" + t.getFullYear() + 
        "M" + t.getMonth() + "D" + t.getDate(), p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
    if (d.getElementById(id)) return;              
    rw = d.createElement(e);
    rw.id = id; rw.async = true; rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
    }(document, new Date(), "script", "rating-widget.com/"));