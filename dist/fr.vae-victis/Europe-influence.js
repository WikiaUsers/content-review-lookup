/* ================================================================
   CARTE D'INFLUENCE EUROPE — D3 + TopoJSON
   Points ville sur la carte / points abstraits en badges dessous
   ================================================================ */

(function () {

  var PAGE_MAP = {
    "France":               "france",
    "Allemagne":            "allemagne-autriche",
    "Allemagne - Autriche": "allemagne-autriche",
    "Benelux":              "benelux",
    "Royaume-Uni":          "royaume-uni",
    "Italie":               "italie",
    "Terres Balkaniques":   "grece-balkans",
    "Grèce & Balkans":      "grece-balkans",
    "Balkans":              "grece-balkans",
    "Pacte de Visegrád":    "visegrad",
    "Scandinavie":          "scandinavie",
    "Ruthénie":             "ruthenie",
    "Espagne":              "espagne",
    "Espagne & Portugal":   "espagne",
    "Russie":               "russie"
  };

  var ENTITES = {
    "france":             { label:"France",             membres:["FRA"],                                                                           cx:2.5,  cy:46.5, zoom:5   },
    "allemagne-autriche": { label:"Allemagne — Autriche",membres:["DEU","AUT"],                                                                    cx:13,   cy:48,   zoom:5   },
    "benelux":            { label:"Benelux",             membres:["BEL","NLD","LUX"],                                                              cx:4.5,  cy:50.5, zoom:9   },
    "royaume-uni":        { label:"Royaume-Uni",         membres:["GBR"],                                                                          cx:-2,   cy:54,   zoom:5   },
    "italie":             { label:"Italie",              membres:["ITA"],                                                                           cx:12,   cy:43,   zoom:5   },
    "grece-balkans":      { label:"Grèce & Balkans",     membres:["GRC","ALB","BIH","SRB","MNE","MKD","HRV","SVN","BGR"],                         cx:21,   cy:42,   zoom:5   },
    "visegrad":           { label:"Pacte de Visegrád",   membres:["POL","CZE","SVK","HUN"],                                                        cx:19,   cy:50,   zoom:5   },
    "scandinavie":        { label:"Scandinavie",         membres:["SWE","NOR","DNK","FIN","ISL"],                                                  cx:15,   cy:63,   zoom:3   },
    "ruthenie":           { label:"Ruthénie",            membres:["UKR","BLR","EST","LVA","LTU","ROU","MDA"],                                      cx:28,   cy:52,   zoom:4   },
    "espagne":            { label:"Espagne & Portugal",  membres:["ESP","PRT"],                                                                    cx:-4,   cy:40,   zoom:5   },
    "russie":             { label:"Russie",              membres:["RUS"],                                                                           cx:50,   cy:60,   zoom:2   }
  };

  var COLORS = { sovereign:"#4da6ff", olympiens:"#ffaa00", shemning:"#ff4444" };
  var FM     = { sovereign:1, olympiens:1, shemning:1 };

  /* ============================================================
     DIEUX — mêmes données que la map USA
  ============================================================ */
  var gods = {
    "OldMedia": {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/XchMz1H.png"},
    "Wrath":    {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/GaCuvNW.png"},
    "Liberty":  {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/dpdahAx.png"},
    "Capital":  {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/vWYUkt0.png"},
    "Vigil":    {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/4aHcx0Z.png"},
    "Science":  {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/max1TBK.png"},
    "Industry": {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/KJYBQTa.png"},
    "Judgment": {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/Gl0Svqj.png"},
    "Manifest": {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/y6UrXPC.png"},
    "Union":    {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/FCZIX7S.png"},
    "NewMedia": {faction:"sovereign",color:"#4da6ff",img:"https://imgur.com/VfekSi7.png"},
    "Zeus":       {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/ZxtANYW.png"},
    "Hera":       {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/vT6JCpN.png"},
    "Poseidon":   {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/0EVh7fK.png"},
    "Demeter":    {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/8Yy06Sz.png"},
    "Persephone": {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/m172FNo.png"},
    "Athena":     {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/fsqZnmm.png"},
    "Artemis":    {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/iz9bXvX.png"},
    "Ares":       {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/0PbjvDI.png"},
    "Hades":      {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/QXvCD0R.png"},
    "Apollon":    {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/9pQUNvV.png"},
    "Hermes":     {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/ryjH4K6.png"},
    "Dionysos":   {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/AtXNwSQ.png"},
    "Hephaistos": {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/QLztc2H.png"},
    "Hestia":     {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/3OrwtHb.png"},
    "Aphrodite":  {faction:"olympiens",color:"#ffaa00",img:"https://imgur.com/KQn07wF.png"},
    "Entite":  {faction:"shemning",color:"#ff5555",img:"https://imgur.com/17wKCf5.png"},
    "Isis":    {faction:"shemning",color:"#ff5555",img:"https://imgur.com/10QE9jI.png"},
    "Seth":    {faction:"shemning",color:"#ff5555",img:"https://imgur.com/PyP4buO.png"},
    "Osiris":  {faction:"shemning",color:"#ff5555",img:"https://imgur.com/f0VyKhJ.png"},
    "Hel":     {faction:"shemning",color:"#ff5555",img:"https://imgur.com/TqaunLZ.png"},
    "Tyr":     {faction:"shemning",color:"#ff5555",img:"https://imgur.com/9m94ohP.png"},
    "Loki":    {faction:"shemning",color:"#ff5555",img:"https://imgur.com/70LPY7F.png"},
    "Shiva":   {faction:"shemning",color:"#ff5555",img:"https://imgur.com/1On3bBf.png"},
    "Vishnu":  {faction:"shemning",color:"#ff5555",img:"https://imgur.com/Dyim98R.png"},
    "Brahma":  {faction:"shemning",color:"#ff5555",img:"https://imgur.com/A4msk4Q.png"},
    "Amateratsu":{faction:"shemning",color:"#ff5555",img:"https://imgur.com/hSmRk8a.png"}
  };

  function h2r(hex,a){var r=parseInt(hex.slice(1,3),16),gv=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return "rgba("+r+","+gv+","+b+","+a+")";}
  function godCol(g){return (gods[g]||{color:"#88aacc"}).color;}
  function godFaction(g){var f=(gods[g]||{faction:"sovereign"}).faction;return {sovereign:"Sovereign",olympiens:"Olympiens",shemning:"Shemning"}[f]||f;}
  function godImg(g){return (gods[g]||{img:""}).img;}



  /* type: "ville" = sur la carte | "abstrait" = badge dessous */
  var ZONES = [
    /* ── FRANCE ── */
    { id:"fr-paris",    e:"france",            nom:"Paris",                 f:"sovereign", i:5, type:"ville",    lon:2.35,  lat:48.85, desc:"Cœur politique et institutionnel de la France." , img:"", dieu:"", dieuImg:"" },
    { id:"fr-metro",    e:"france",            nom:"Métropoles",            f:"sovereign", i:3, type:"ville",    lon:4.83,  lat:45.75, desc:"Lyon, Marseille, Bordeaux, Toulouse, Nantes, Strasbourg." , img:"", dieu:"", dieuImg:"" },
    { id:"fr-armee",    e:"france",            nom:"Armée",                 f:"sovereign", i:4, type:"abstrait", lon:null,  lat:null,  desc:"Forces armées françaises. Présence OPEX internationale." , img:"", dieu:"", dieuImg:"" },
    { id:"fr-rural",    e:"france",            nom:"Ruralité",              f:"shemning",  i:2, type:"abstrait", lon:null,  lat:null,  desc:"France périphérique, zones rurales et périurbaines." , img:"", dieu:"", dieuImg:"" },
    { id:"fr-culture",  e:"france",            nom:"Culture",               f:"olympiens", i:3, type:"abstrait", lon:null,  lat:null,  desc:"Rayonnement culturel, cinéma, littérature, gastronomie." , img:"", dieu:"", dieuImg:"" },
    { id:"fr-pop",      e:"france",            nom:"Population",            f:"shemning",  i:3, type:"abstrait", lon:null,  lat:null,  desc:"68 millions de citoyens. Tensions sociales et fractures identitaires." , img:"", dieu:"", dieuImg:"" },

    /* ── ROYAUME-UNI ── */
    { id:"gb-london",   e:"royaume-uni",       nom:"Londres",               f:"sovereign", i:5, type:"ville",    lon:-0.12, lat:51.50, desc:"Capitale politique, financière et culturelle." , img:"", dieu:"", dieuImg:"" },
    { id:"gb-metro",    e:"royaume-uni",       nom:"Métropoles",            f:"sovereign", i:3, type:"ville",    lon:-2.0,  lat:52.5,  desc:"Manchester, Birmingham, Glasgow, Édimbourg, Cardiff." , img:"", dieu:"", dieuImg:"" },
    { id:"gb-parlement",e:"royaume-uni",       nom:"Parlement Britannique", f:"sovereign", i:4, type:"abstrait", lon:null,  lat:null,  desc:"Westminster. Cœur de la démocratie parlementaire." , img:"", dieu:"", dieuImg:"" },
    { id:"gb-cwlth",    e:"royaume-uni",       nom:"Commonwealth",          f:"sovereign", i:4, type:"abstrait", lon:null,  lat:null,  desc:"56 nations, 2,5 milliards d'habitants. Réseau d'influence post-impérial." , img:"", dieu:"", dieuImg:"" },
    { id:"gb-medias",   e:"royaume-uni",       nom:"Médias",                f:"shemning",  i:4, type:"abstrait", lon:null,  lat:null,  desc:"BBC, Sky News, The Guardian. Influence médiatique mondiale." , img:"", dieu:"", dieuImg:"" },
    { id:"gb-culture",  e:"royaume-uni",       nom:"Culture",               f:"olympiens", i:3, type:"abstrait", lon:null,  lat:null,  desc:"Musique, cinéma, mode, universités (Oxford, Cambridge)." , img:"", dieu:"", dieuImg:"" },

    /* ── ALLEMAGNE — AUTRICHE ── */
    { id:"de-berlin",   e:"allemagne-autriche",nom:"Berlin",                f:"sovereign", i:5, type:"ville",    lon:13.40, lat:52.52, desc:"Capitale fédérale. Siège du gouvernement et du Bundestag." , img:"", dieu:"", dieuImg:"" },
    { id:"de-munich",   e:"allemagne-autriche",nom:"Munich",                f:"sovereign", i:4, type:"ville",    lon:11.58, lat:48.14, desc:"BMW, Siemens, Allianz. Capital économique et culturel bavarois." , img:"", dieu:"", dieuImg:"" },
    { id:"de-ruhr",     e:"allemagne-autriche",nom:"Ruhr",                  f:"shemning",  i:4, type:"ville",    lon:7.2,   lat:51.5,  desc:"Bassin industriel. Reconversion post-charbon, tensions sociales." , img:"", dieu:"", dieuImg:"" },
    { id:"at-vienne",   e:"allemagne-autriche",nom:"Vienne",                f:"olympiens", i:4, type:"ville",    lon:16.37, lat:48.21, desc:"Diplomatie, culture, opéra." , img:"", dieu:"", dieuImg:"" },
    { id:"de-bce",      e:"allemagne-autriche",nom:"BCE",                   f:"sovereign", i:5, type:"abstrait", lon:null,  lat:null,  desc:"Banque Centrale Européenne à Francfort. Pilotage monétaire de l'eurozone." , img:"", dieu:"", dieuImg:"" },
    { id:"de-bundestag",e:"allemagne-autriche",nom:"Bundestag",             f:"sovereign", i:4, type:"abstrait", lon:null,  lat:null,  desc:"Parlement fédéral allemand. Chambre législative centrale." , img:"", dieu:"", dieuImg:"" },
    { id:"de-culture",  e:"allemagne-autriche",nom:"Culture",               f:"olympiens", i:3, type:"abstrait", lon:null,  lat:null,  desc:"Philosophie, musique classique, expressionnisme." , img:"", dieu:"", dieuImg:"" },

    /* ── BENELUX ── */
    { id:"be-bxl",      e:"benelux",           nom:"Bruxelles",             f:"sovereign", i:5, type:"ville",    lon:4.35,  lat:50.85, desc:"Siège UE et OTAN. Capitale de facto de l'Europe institutionnelle." , img:"", dieu:"", dieuImg:"" },
    { id:"nl-lahaye",   e:"benelux",           nom:"La Haye",               f:"sovereign", i:4, type:"ville",    lon:4.30,  lat:52.07, desc:"CPI, CIJ. Justice internationale." , img:"", dieu:"", dieuImg:"" },
    { id:"nl-amsterdam",e:"benelux",           nom:"Amsterdam",             f:"sovereign", i:4, type:"ville",    lon:4.90,  lat:52.37, desc:"Rotterdam/Amsterdam. Premier complexe portuaire européen." , img:"", dieu:"", dieuImg:"" },
    { id:"be-monarchie",e:"benelux",           nom:"Monarchie Belge",       f:"sovereign", i:3, type:"abstrait", lon:null,  lat:null,  desc:"Couronne belge. Rôle d'arbitrage dans un État fédéral fragmenté." , img:"", dieu:"", dieuImg:"" },
    { id:"be-culture",  e:"benelux",           nom:"Culture",               f:"olympiens", i:2, type:"abstrait", lon:null,  lat:null,  desc:"BD franco-belge, bières trappistes, surréalisme, Rubens." , img:"", dieu:"", dieuImg:"" },

    /* ── ITALIE ── */
    { id:"it-rome",     e:"italie",            nom:"Rome",                  f:"sovereign", i:5, type:"ville",    lon:12.49, lat:41.90, desc:"Quirinal, Vatican. Siège de l'Église catholique mondiale." , img:"", dieu:"", dieuImg:"" },
    { id:"it-venise",   e:"italie",            nom:"Venise",                f:"olympiens", i:3, type:"ville",    lon:12.33, lat:45.44, desc:"Sérénissime, luxe, tourisme, déclin." , img:"", dieu:"", dieuImg:"" },
    { id:"it-naples",   e:"italie",            nom:"Naples",                f:"shemning",  i:3, type:"ville",    lon:14.27, lat:40.85, desc:"Camorra, économie souterraine, fracture nord-sud." , img:"", dieu:"", dieuImg:"" },
    { id:"it-culture",  e:"italie",            nom:"Culture",               f:"olympiens", i:4, type:"abstrait", lon:null,  lat:null,  desc:"Renaissance, opéra, mode (Milan), gastronomie, patrimoine UNESCO." , img:"", dieu:"", dieuImg:"" },

    /* ── ESPAGNE & PORTUGAL ── */
    { id:"es-madrid",   e:"espagne",           nom:"Madrid",                f:"sovereign", i:5, type:"ville",    lon:-3.70, lat:40.42, desc:"Gouvernement, Cortes, Cour suprême." , img:"", dieu:"", dieuImg:"" },
    { id:"es-barcelone",e:"espagne",           nom:"Barcelone",             f:"sovereign", i:4, type:"ville",    lon:2.17,  lat:41.38, desc:"Catalogne. Pôle économique, tensions séparatistes." , img:"", dieu:"", dieuImg:"" },
    { id:"pt-lisbonne", e:"espagne",           nom:"Lisbonne",              f:"sovereign", i:3, type:"ville",    lon:-9.14, lat:38.72, desc:"Port atlantique, héritage maritime." , img:"", dieu:"", dieuImg:"" },
    { id:"es-navarre",  e:"espagne",           nom:"Navarre",               f:"shemning",  i:2, type:"abstrait", lon:null,  lat:null,  desc:"Pays basque et Navarre. Histoire séparatiste, tensions latentes." , img:"", dieu:"", dieuImg:"" },
    { id:"es-culture",  e:"espagne",           nom:"Culture",               f:"olympiens", i:3, type:"abstrait", lon:null,  lat:null,  desc:"Flamenco, Cervantes, Picasso, architecture mauresque." , img:"", dieu:"", dieuImg:"" },

    /* ── VISEGRÁD ── */
    { id:"pl-varsovie", e:"visegrad",          nom:"Varsovie",              f:"sovereign", i:4, type:"ville",    lon:21.01, lat:52.23, desc:"Capitale polonaise. Puissance régionale montante." , img:"", dieu:"", dieuImg:"" },
    { id:"cz-prague",   e:"visegrad",          nom:"Prague",                f:"sovereign", i:3, type:"ville",    lon:14.42, lat:50.08, desc:"Démocratie libérale, hub culturel." , img:"", dieu:"", dieuImg:"" },
    { id:"hu-budapest", e:"visegrad",          nom:"Budapest",              f:"shemning",  i:3, type:"ville",    lon:19.04, lat:47.50, desc:"Régime Orbán, dérive autoritaire." , img:"", dieu:"", dieuImg:"" },
    { id:"v4-groupe",   e:"visegrad",          nom:"Groupe de Visegrád",    f:"shemning",  i:4, type:"abstrait", lon:null,  lat:null,  desc:"Alliance PL-CZ-SK-HU. Bloc de résistance aux injonctions de Bruxelles." , img:"", dieu:"", dieuImg:"" },

    /* ── GRÈCE & BALKANS ── */
    { id:"gr-athenes",  e:"grece-balkans",     nom:"Athènes",               f:"sovereign", i:4, type:"ville",    lon:23.73, lat:37.98, desc:"Berceau de la démocratie." , img:"", dieu:"", dieuImg:"" },
    { id:"rs-belgrade", e:"grece-balkans",     nom:"Belgrade",              f:"shemning",  i:3, type:"ville",    lon:20.46, lat:44.82, desc:"Carrefour balkanique. Héritier des tensions des années 90." , img:"", dieu:"", dieuImg:"" },
    { id:"gr-olympie",  e:"grece-balkans",     nom:"Olympie",               f:"olympiens", i:5, type:"abstrait", lon:null,  lat:null,  desc:"Site sacré des Jeux olympiques. Territoire mythique des dieux." , img:"", dieu:"", dieuImg:"" },

    /* ── SCANDINAVIE ── */
    { id:"se-stockholm",e:"scandinavie",       nom:"Stockholm",             f:"sovereign", i:4, type:"ville",    lon:18.07, lat:59.33, desc:"OTAN 2024. Puissance nordique économique et diplomatique." , img:"", dieu:"", dieuImg:"" },
    { id:"no-oslo",     e:"scandinavie",       nom:"Oslo",                  f:"sovereign", i:3, type:"ville",    lon:10.75, lat:59.91, desc:"Pétrole, droits de l'homme, Prix Nobel de la Paix." , img:"", dieu:"", dieuImg:"" },
    { id:"dk-cop",      e:"scandinavie",       nom:"Copenhague",            f:"sovereign", i:3, type:"ville",    lon:12.57, lat:55.68, desc:"Hub nordique, transition verte." , img:"", dieu:"", dieuImg:"" },
    { id:"fi-helsinki", e:"scandinavie",       nom:"Helsinki",              f:"sovereign", i:3, type:"ville",    lon:24.94, lat:60.17, desc:"Frontière directe OTAN-Russie." , img:"", dieu:"", dieuImg:"" },

    /* ── RUTHÉNIE ── */
    { id:"ua-kiev",     e:"ruthenie",          nom:"Kiev",                  f:"sovereign", i:5, type:"ville",    lon:30.52, lat:50.45, desc:"Capitale résistante. Lutte pour la souveraineté." , img:"", dieu:"", dieuImg:"" },
    { id:"ua-front",    e:"ruthenie",          nom:"Front Est",             f:"shemning",  i:5, type:"ville",    lon:37.5,  lat:48.0,  desc:"Zone de guerre active. Ares à son apogée de puissance." , img:"", dieu:"", dieuImg:"" },
    { id:"ro-bucarest", e:"ruthenie",          nom:"Bucarest",              f:"sovereign", i:3, type:"ville",    lon:26.10, lat:44.44, desc:"Membre OTAN-UE. Ancrage occidental roumain." , img:"", dieu:"", dieuImg:"" },
    { id:"lv-riga",     e:"ruthenie",          nom:"Riga",                  f:"sovereign", i:3, type:"ville",    lon:24.11, lat:56.95, desc:"Capitales baltes. Souveraineté chèrement acquise.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-gouvernement", e:"russie", nom:"Gouvernement de Russie", f:"shemning",  i:5, type:"abstrait", lon:null,  lat:null,  desc:"Kremlin, Parlement, administration fédérale. Contrôle total de l'appareil d'État.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-armee",         e:"russie", nom:"Armée Russe",            f:"shemning",  i:5, type:"abstrait", lon:null,  lat:null,  desc:"Forces armées russes. Puissance nucléaire, présence en Ukraine et dans le monde.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-moscou",        e:"russie", nom:"Moscou",                 f:"shemning",  i:5, type:"ville",    lon:37.62, lat:55.75, desc:"Capitale politique et économique. Siège du Kremlin et de l'oligarchie russe.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-stpete",        e:"russie", nom:"Saint-Pétersbourg",      f:"shemning",  i:3, type:"ville",    lon:30.32, lat:59.93, desc:"Ancienne capitale impériale. Culture, industrie navale et influence historique.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-siberie",       e:"russie", nom:"Sibérie",                f:"shemning",  i:4, type:"ville",    lon:82.0,  lat:60.0,  desc:"Immenses ressources naturelles — pétrole, gaz, minerais. Réservoir stratégique de la Russie.", img:"", dieu:"", dieuImg:"" },
    { id:"ru-culture",       e:"russie", nom:"Culture",                f:"shemning",  i:2, type:"abstrait", lon:null,  lat:null,  desc:"Littérature, musique classique, propagande soviétique. Outil de soft power russe.", img:"", dieu:"", dieuImg:"" }
  ];

  /* Correspondance ISO A3 → noms dans le GeoJSON europe haute résolution */
  var A3_TO_NAME = {
    "FRA":"France","DEU":"Germany","AUT":"Austria","GBR":"United Kingdom",
    "ITA":"Italy","ESP":"Spain","PRT":"Portugal","BEL":"Belgium",
    "NLD":"Netherlands","LUX":"Luxembourg","POL":"Poland",
    "CZE":"Czech Republic",
    "SVK":"Slovakia","HUN":"Hungary","GRC":"Greece","ALB":"Albania",
    "BIH":"Bosnia and Herzegovina","SRB":"Serbia","MNE":"Montenegro",
    "MKD":"The former Yugoslav Republic of Macedonia",
    "HRV":"Croatia","SVN":"Slovenia","BGR":"Bulgaria",
    "SWE":"Sweden","NOR":"Norway","DNK":"Denmark","FIN":"Finland","ISL":"Iceland",
    "UKR":"Ukraine","BLR":"Belarus","EST":"Estonia","LVA":"Latvia",
    "LTU":"Lithuania","ROU":"Romania",
    "MDA":"Republic of Moldova",
    "RUS":"Russia","CHE":"Switzerland","TUR":"Turkey"
  };
  /* Inverse : nom → ISO A3 */
  var NAME_TO_A3 = {};
  Object.keys(A3_TO_NAME).forEach(function(k){ NAME_TO_A3[A3_TO_NAME[k]]=k; });

  var TOPO_URL = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson";

  /* ============================================================
     CSS
  ============================================================ */
  var CSS = [
    "#eu-influence-root{background:#0d1117;border:1px solid #1e2a40;border-radius:10px;overflow:hidden;font-family:'Segoe UI',Arial,sans-serif;color:#c8d0e0;margin:16px 0}",
    "#eu-layout{display:flex;min-height:460px}",
    "#eu-map-col{flex:1 1 auto;display:flex;flex-direction:column;border-right:1px solid #1e2a40;min-width:0}",
    "#eu-side{width:230px;flex-shrink:0;display:flex;flex-direction:column}",
    "#eu-header{padding:8px 12px;border-bottom:1px solid #1e2a40;background:rgba(255,255,255,.02)}",
    "#eu-country-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#4a6a9a}",
    "#eu-map-wrap{position:relative;flex:1;min-height:280px;overflow:hidden}",
    "#eu-mapsvg-container{width:100%;height:100%;min-height:280px}",
    "#eu-mapsvg-container svg{display:block}",
    "#eu-controls{position:absolute;top:8px;right:8px;display:flex;flex-direction:column;gap:4px;z-index:10}",
    ".eu-zbtn{width:26px;height:26px;background:rgba(20,30,50,.92);border:1px solid #2a3a5a;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:#8090b0;user-select:none;line-height:1}",
    ".eu-zbtn:hover{background:rgba(40,60,100,.95);color:#c8d0e0}",
    /* Badges abstraits */
    "#eu-badges-wrap{padding:8px 12px;border-top:1px solid #1e2a40;display:flex;flex-wrap:wrap;gap:6px}",
    ".eu-badge{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:5px;border:1px solid;cursor:pointer;font-size:10px;transition:opacity .15s}",
    ".eu-badge:hover{opacity:.75}",
    ".eu-badge-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}",
    ".eu-badge.sovereign{background:rgba(77,166,255,.1);border-color:#4da6ff;color:#4da6ff}",
    ".eu-badge.olympiens{background:rgba(255,170,0,.1);border-color:#ffaa00;color:#ffaa00}",
    ".eu-badge.shemning{background:rgba(255,68,68,.1);border-color:#ff4444;color:#ff4444}",
    /* Panthéons */
    "#eu-pantheons-wrap{padding:8px 12px;border-top:1px solid #1e2a40}",
    ".eu-section-title{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#3a4a6a;margin-bottom:6px}",
    ".eu-panth-row{display:flex;align-items:center;gap:6px;margin-bottom:5px}",
    ".eu-panth-label{font-size:9px;font-weight:700;letter-spacing:1px;color:#4a5a7a;width:65px;flex-shrink:0}",
    ".eu-panth-track{flex:1;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}",
    ".eu-panth-fill{height:100%;border-radius:3px;transition:width .6s ease}",
    ".eu-panth-score{font-size:9px;color:#4a5a7a;width:24px;text-align:right}",
    /* Panneau — style identique USA map */
    ".eu-panel{padding:10px 12px;border-bottom:1px solid #1e2a40}",
    ".eu-panel:last-child{border-bottom:none;flex:1;overflow-y:auto}",
    "#eu-empty-msg{font-size:10px;color:#3a4a6a;text-align:center;padding:30px 8px;line-height:1.7}",
    ".eu-p-img{width:100%;height:120px;object-fit:cover;border-radius:6px;margin-bottom:8px;display:block}",
    ".eu-p-name{font-size:14px;font-weight:700;color:#e0d4a8;margin-bottom:2px;letter-spacing:.3px}",
    ".eu-p-type{font-size:9px;color:#4a5a7a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}",
    ".eu-p-sublabel{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#3a4a6a;margin:8px 0 4px}",
    ".eu-p-god{display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:5px;font-size:11px;font-weight:600;margin-bottom:4px}",
    ".eu-p-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}",
    ".eu-strat-bar{height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-bottom:8px}",
    ".eu-strat-fill{height:100%;border-radius:2px;transition:width .5s ease}",
    ".eu-p-desc{font-size:10px;color:#7080a0;line-height:1.65;border-top:1px solid #1a2a40;padding-top:8px;margin-top:4px}",
    /* Légende */
    ".eu-leg-title{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#3a4a6a;margin-bottom:5px}",
    ".eu-leg-item{display:flex;align-items:center;gap:6px;font-size:10px;color:#6070a0;margin-bottom:3px}",
    ".eu-leg-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}",
    ".eu-mult{font-size:9px;color:#3a4a6a;margin-left:2px}"
  ].join("");

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    var pageTitle = (window.mw && mw.config) ? mw.config.get("wgTitle") : document.title.replace(/\s*[\|\-–]\s*.+$/,"").trim();
    var eKey = PAGE_MAP[pageTitle];
    if (!eKey) return;
    var entite = ENTITES[eKey];
    if (!entite) return;

    if (!document.getElementById("eu-influence-css")) {
      var st = document.createElement("style"); st.id="eu-influence-css"; st.textContent=CSS;
      document.head.appendChild(st);
    }
    if (!document.getElementById("eu-influence-root")) {
      var anchor = document.querySelector(".mw-parser-output") || document.querySelector("#mw-content-text") || document.body;
      var root = document.createElement("div"); root.id="eu-influence-root";
      anchor.insertBefore(root, anchor.firstChild);
    }

    var root = document.getElementById("eu-influence-root");
    if (!root) return;

    var allZones  = ZONES.filter(function(z){ return z.e === eKey; });
    var scores    = calcScores(allZones);
    var maxScore  = Math.max(scores.sovereign, scores.olympiens, scores.shemning, 1);
    var villes    = allZones.filter(function(z){ return z.type === "ville"; });
    var abstraits = allZones.filter(function(z){ return z.type === "abstrait"; });

    root.innerHTML = buildLayout(entite.label);
    buildBadges(abstraits);
    buildBars(scores, maxScore);
    bindEvents();

    loadTopo(function(topo) {
      function tryBuild(n) {
        var c = document.getElementById("eu-mapsvg-container");
        if (c && c.offsetWidth > 0) { buildMap(eKey, entite, topo, villes); }
        else if (n < 30) { setTimeout(function(){ tryBuild(n+1); }, 100); }
      }
      requestAnimationFrame(function(){ tryBuild(0); });
    });
  }

  function loadTopo(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", TOPO_URL, true);
    xhr.onload = function(){ if(xhr.status===200){ cb(JSON.parse(xhr.responseText)); } };
    xhr.send();
  }

  function calcScores(zones) {
    var s={sovereign:0,olympiens:0,shemning:0};
    zones.forEach(function(z){ s[z.f] += 1; });
    return s;
  }

  function buildLayout(label) {
    return '<div id="eu-layout">' +
      '<div id="eu-map-col">' +
        '<div id="eu-header"><span id="eu-country-label">'+label+'</span></div>' +
        '<div id="eu-map-wrap"><div id="eu-mapsvg-container"></div>' +
          '<div id="eu-controls">' +
            '<div class="eu-zbtn" id="eu-zi">+</div>' +
            '<div class="eu-zbtn" id="eu-zo">−</div>' +
            '<div class="eu-zbtn" id="eu-zr">↺</div>' +
          '</div>' +
        '</div>' +
        '<div id="eu-badges-wrap"></div>' +
        '<div id="eu-pantheons-wrap"><div class="eu-section-title">Influence des panthéons</div><div id="eu-pantheons-bars"></div></div>' +
      '</div>' +
      '<div id="eu-side">' +
        '<div class="eu-panel"><div id="eu-empty-msg">📍 Sélectionnez une zone</div><div id="eu-detail" style="display:none"></div></div>' +
        '<div class="eu-panel">' +
          '<div class="eu-leg-title">Factions</div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#4da6ff"></div>Sovereign<span class="eu-mult">× 3 pts</span></div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#ffaa00"></div>Olympiens<span class="eu-mult">× 1 pt</span></div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#ff4444"></div>Shemning<span class="eu-mult">× 1 pt</span></div>' +
          '<div class="eu-leg-title" style="margin-top:9px">Importance</div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#3a4a6a;width:5px;height:5px"></div>Faible (1–2)</div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#3a4a6a;width:9px;height:9px"></div>Moyenne (3)</div>' +
          '<div class="eu-leg-item"><div class="eu-leg-dot" style="background:#3a4a6a;width:14px;height:14px"></div>Critique (4–5)</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ============================================================
     BADGES ABSTRAITS
  ============================================================ */
  function buildBadges(abstraits) {
    var wrap = document.getElementById("eu-badges-wrap");
    if (!wrap || abstraits.length === 0) { if(wrap) wrap.style.display="none"; return; }
    abstraits.forEach(function(z) {
      var badge = document.createElement("div");
      badge.className = "eu-badge " + z.f;
      badge.innerHTML =
        '<div class="eu-badge-dot" style="background:'+COLORS[z.f]+'"></div>' +
        '<span>'+z.nom+'</span>' +
        '<span style="opacity:.5;font-size:9px;margin-left:2px">'+z.i+'/5</span>';
      badge.addEventListener("click", function(e){ e.stopPropagation(); showDetail(z); });
      wrap.appendChild(badge);
    });
  }

  /* ============================================================
     CARTE D3
  ============================================================ */
  function buildMap(eKey, entite, topo, villes) {
    var container = document.getElementById("eu-mapsvg-container");
    if (!container) return;
    var W = container.offsetWidth, H = Math.max(container.offsetHeight, 280);

    var proj = d3.geoMercator()
      .center([entite.cx, entite.cy])
      .scale(W * entite.zoom * 0.8)
      .translate([W/2, H/2]);

    var path = d3.geoPath().projection(proj);
    var initTransform = d3.zoomIdentity;

    var svg = d3.select(container).append("svg")
      .attr("width", W).attr("height", H)
      .style("background","#0d1117")
      .style("cursor","grab")
      .style("display","block");

    var g = svg.append("g");

    /* Pays — GeoJSON haute résolution */
    /* topo est ici un GeoJSON FeatureCollection directement */
    var features = topo.features || [];
    g.selectAll("path.eu-cp")
      .data(features)
      .enter().append("path")
      .attr("class","eu-cp")
      .attr("d", path)
      .attr("fill", function(d){
        var name = (d.properties && (d.properties.NAME||d.properties.name||d.properties.NAME_ENGL))||"";
        var a3 = NAME_TO_A3[name]||"";
        return (a3 && entite.membres.indexOf(a3)!==-1) ? "#1e3050" : "#111a28";
      })
      .attr("stroke", function(d){
        var name = (d.properties && (d.properties.NAME||d.properties.name||d.properties.NAME_ENGL))||"";
        var a3 = NAME_TO_A3[name]||"";
        return (a3 && entite.membres.indexOf(a3)!==-1) ? "#4a7ab0" : "#1e2d40";
      })
      .attr("stroke-width", function(d){
        var name = (d.properties && (d.properties.NAME||d.properties.name||d.properties.NAME_ENGL))||"";
        var a3 = NAME_TO_A3[name]||"";
        return (a3 && entite.membres.indexOf(a3)!==-1) ? 1.2 : 0.3;
      });

    /* Points villes */
    var RS = { 1:4, 2:5, 3:6, 4:8, 5:11 };
    villes.forEach(function(z) {
      var pt = proj([z.lon, z.lat]);
      if (!pt) return;
      var px=pt[0], py=pt[1], ri=RS[z.i]||6, col=COLORS[z.f]||"#888";

      g.append("circle")
        .attr("cx",px).attr("cy",py).attr("r",ri+5)
        .attr("fill",col).attr("opacity",0.12)
        .attr("pointer-events","none");

      var dot = g.append("circle")
        .attr("cx",px).attr("cy",py).attr("r",ri)
        .attr("fill",col).attr("opacity",0.9)
        .attr("stroke","rgba(255,255,255,0.7)").attr("stroke-width","0.8")
        .style("cursor","pointer");

      /* Label ville */
      var lbl = g.append("text")
        .attr("x", px+ri+3).attr("y", py+4)
        .attr("fill","#c8d0e0").attr("font-size","9")
        .attr("font-family","sans-serif").attr("pointer-events","none")
        .text(z.nom);

      dot.on("mouseenter", function(){
        dot.attr("r", ri*1.35).attr("opacity",1);
        lbl.attr("fill","#e0d4a8").attr("font-weight","bold");
      });
      dot.on("mouseleave", function(){
        dot.attr("r", ri).attr("opacity",0.9);
        lbl.attr("fill","#c8d0e0").attr("font-weight","normal");
      });
      dot.on("click", function(event){
        if (event) event.stopPropagation();
        showDetail(z);
      });
    });

    /* Zoom D3 — filtre les clics sur les boutons */
    var zoom = d3.zoom()
      .scaleExtent([0.5, 15])
      .filter(function(event){
        if (event.type === "wheel") return true;
        if (event.type === "mousedown" || event.type === "touchstart") {
          return !event.target.closest("#eu-controls");
        }
        return true;
      })
      .on("zoom", function(event){ g.attr("transform", event.transform); });

    svg.call(zoom);

    /* Boutons */
    document.getElementById("eu-zi").onclick = function(e){
      e.stopPropagation();
      svg.transition().duration(300).call(zoom.scaleBy, 1.5);
    };
    document.getElementById("eu-zo").onclick = function(e){
      e.stopPropagation();
      svg.transition().duration(300).call(zoom.scaleBy, 0.67);
    };
    document.getElementById("eu-zr").onclick = function(e){
      e.stopPropagation();
      svg.transition().duration(400).call(zoom.transform, initTransform);
    };

    svg.on("click", function(){ showEmpty(); });
  }

  /* ============================================================
     BARRES
  ============================================================ */
  function buildBars(scores, maxScore) {
    var wrap = document.getElementById("eu-pantheons-bars"); if(!wrap)return;
    [{k:"sovereign",l:"SOVEREIGN"},{k:"olympiens",l:"OLYMPIENS"},{k:"shemning",l:"SHEMNING"}].forEach(function(p){
      var pct=Math.round((scores[p.k]/maxScore)*100), row=document.createElement("div"); row.className="eu-panth-row";
      row.innerHTML='<div class="eu-panth-label">'+p.l+'</div><div class="eu-panth-track"><div class="eu-panth-fill" style="width:'+pct+'%;background:'+COLORS[p.k]+'"></div></div><div class="eu-panth-score">'+scores[p.k]+'</div>';
      wrap.appendChild(row);
    });
  }

  /* ============================================================
     DÉTAIL
  ============================================================ */
  function showDetail(z) {
    document.getElementById("eu-empty-msg").style.display="none";
    var d=document.getElementById("eu-detail"); d.style.display="block";

    /* Dieu depuis le dictionnaire gods (priorité) ou champ z.dieu */
    var godKey  = z.dieu || "";
    var col     = godKey ? godCol(godKey) : (COLORS[z.f]||"#888");
    var fl      = godKey ? godFaction(godKey) : ({sovereign:"Sovereign",olympiens:"Olympiens",shemning:"Shemning"}[z.f]||z.f);
    var gimg    = godKey ? godImg(godKey) : (z.dieuImg||"");
    var zimg    = z.img || "";
    var type    = z.type==="ville" ? "Zone géographique" : "Organisation";

    d.innerHTML =
      /* Image zone */
      (zimg
        ? '<img class="eu-p-img" src="'+zimg+'" alt="'+z.nom+'" onerror="this.style.display=\'none\'">'
        : '') +
      '<div class="eu-p-name">'+z.nom+'</div>'+
      '<div class="eu-p-type">'+type+'</div>'+
      /* Contrôleur */
      '<div class="eu-p-sublabel">Contrôleur</div>'+
      '<div class="eu-p-god" style="background:'+h2r(col,0.15)+';color:'+col+';border:1px solid '+h2r(col,0.35)+'">' +
        '<span class="eu-p-dot" style="background:'+col+'"></span>'+
        (godKey||"Inconnu")+' <span style="opacity:.5;font-size:10px;margin-left:2px">· '+fl+'</span>'+
      '</div>'+
      /* Symbole divin */
      '<div class="eu-p-sublabel">Symbole divin</div>'+
      '<div style="text-align:center;margin-bottom:10px">'+
        (gimg
          ? '<img src="'+gimg+'" style="width:80px;height:80px;object-fit:contain;border-radius:50%;border:2px solid '+col+';background:rgba(0,0,0,.3)" onerror="this.style.display=\'none\'">'
          : '<div style="width:80px;height:80px;border-radius:50%;border:1px dashed rgba(200,169,110,.3);display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:rgba(200,169,110,.4)">à venir</div>'
        )+
      '</div>'+
      /* Importance */
      '<div class="eu-p-sublabel">Importance stratégique · '+z.i+'/5</div>'+
      '<div class="eu-strat-bar"><div class="eu-strat-fill" style="width:'+(z.i*20)+'%;background:'+col+'"></div></div>'+
      /* Description */
      '<div class="eu-p-desc">'+z.desc+'</div>';
  }

  function showEmpty() {
    var el=document.getElementById("eu-empty-msg"), dl=document.getElementById("eu-detail");
    if(el)el.style.display="block"; if(dl)dl.style.display="none";
  }

  function bindEvents() {
    var root=document.getElementById("eu-influence-root"); if(!root)return;
    root.addEventListener("click",function(e){
      if(!e.target.closest("#eu-side")&&!e.target.closest(".eu-badge")) showEmpty();
    });
  }

  /* ============================================================
     LANCEMENT
  ============================================================ */
  function run() {
    if (window.mw && mw.hook) {
      mw.hook("wikipage.content").add(function(){ init(); });
    } else if (document.readyState==="loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  run();

})();