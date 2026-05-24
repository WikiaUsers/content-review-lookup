/* ===== CARTE D'INFLUENCE USA ===== */
(function() {

    var gods = {
    "OldMedia":{faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/XchMz1H.png"},
    "Wrath":   {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/GaCuvNW.png"},
    "Liberty": {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/dpdahAx.png"},
    "Capital": {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/vWYUkt0.png"},
    "Vigil":   {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/4aHcx0Z.png"},
    "Science": {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/max1TBK.png"},
    "Industry":{faction:"sovereign", color:"#4da6ff", img:"https://imgur.com/KJYBQTa.png"},
    "Judgment":{faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/Gl0Svqj.png"},
    "Manifest":{faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/y6UrXPC.png"},
    "Union":   {faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/FCZIX7S.png"},
    "NewMedia":{faction:"sovereign",color:"#4da6ff", img:"https://imgur.com/VfekSi7.png"},
	"Zeus":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/ZxtANYW.png"},
	"Hera":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/vT6JCpN.png"},
	"Poseidon":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/0EVh7fK.png"},
	"Demeter":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/8Yy06Sz.png"},
	"Persephone":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/m172FNo.png"},
	"Athena":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/fsqZnmm.png"},
	"Artemis":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/iz9bXvX.png"},
	"Ares":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/0PbjvDI.png"},
	"Hades":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/QXvCD0R.png"},
	"Apollon":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/9pQUNvV.png"},
	"Hermes":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/ryjH4K6.png"},
	"Dionysos":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/AtXNwSQ.png"},
	"Hephaistos":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/QLztc2H"},
	"Hestia":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/3OrwtHb.png"},
	"Aphrodite":   {faction:"olympiens",color:"#ffaa00", img:"https://imgur.com/KQn07wF.png"},
    "Entite":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/17wKCf5.png"},
    "Isis":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/10QE9jI.png"},
    "Seth":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/PyP4buO.png"},
    "Osiris":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/f0VyKhJ.png"},
    "Hel":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/TqaunLZ.png"},
    "Tyr":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/9m94ohP.png"},
    "Loki":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/70LPY7F.png"},
    "Shiva":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/1On3bBf.png"},
    "Vishnu":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/Dyim98R.png"},
    "Brahma":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/A4msk4Q.png"},
    "Amateratsu":{faction:"shemning", color:"#ff5555", img:"https://imgur.com/hSmRk8a.png"}				
  };

  /* Multiplicateurs par faction */
  var factionMult = { sovereign: 3, olympiens: 1, shemning: 1 };

  var mapPoints = [
    {id:"hollywood",    name:"Hollywood",     god:"OldMedia", strat:3, cx:-118.3, cy:34.1,  img:"https://i.imgur.com/GyaMxB6.png", desc:"Empire médiatique, contrôle l'image et la culture populaire américaine."},
    {id:"newyork",      name:"New York",       god:"Capital",  strat:5, cx:-74.0,  cy:40.7,  img:"https://i.imgur.com/9p1m9wX.png", desc:"Capital financier mondial, siège des grandes banques et de Wall Street."},
    {id:"philadelphia", name:"Philadelphie",   god:"Liberty",  strat:3, cx:-75.2,  cy:40.0,  img:"https://i.imgur.com/3UuI02G.png", desc:"Berceau historique de la démocratie américaine."},
    {id:"siliconvalley",name:"Silicon Valley", god:"Science",  strat:5, cx:-121.9, cy:37.4,  img:"https://i.imgur.com/UfqKEeB.png", desc:"Hub technologique mondial, contrôle des données et de l'IA."},
    {id:"texas",        name:"Texas",          god:"Industry", strat:4, cx:-99.3,  cy:31.5,  img:"https://i.imgur.com/fwrJUhh.png", desc:"Pétrole, énergie et industrie lourde. Indépendance farouche."},
    {id:"hinterland",   name:"Hinterland",     god:"Manifest", strat:3, cx:-107.0, cy:44.0,  img:"https://i.imgur.com/k2ePN9T.png", desc:"Vaste territoire rural, réserves naturelles et population dispersée."},
    {id:"miami",        name:"Miami",          god:"Capital",  strat:3, cx:-80.2,  cy:25.8,  img:"https://i.imgur.com/XiXrum7.png", desc:"Carrefour commercial entre les Amériques, port stratégique."},
    {id:"washingtondc", name:"Washington DC",  god:"Union",    strat:5, cx:-77.0,  cy:38.9,  img:"https://i.imgur.com/UI9Spjl.png", desc:"Siège du pouvoir fédéral. Toutes les décisions nationales y transitent."},
    {id:"midwest",      name:"Mid-Ouest",      god:"Industry", strat:3, cx:-93.0,  cy:42.0,  img:"https://i.imgur.com/qVqhLkP.png", desc:"Ceinture industrielle et agricole, colonne vertébrale économique."},
    {id:"sanfrancisco", name:"San Francisco",  god:"NewMedia", strat:4, cx:-122.4, cy:37.8,  img:"https://i.imgur.com/7edlLzl.png", desc:"Foyer progressiste, capital-risque et nouvelles technologies."},
    {id:"losangeles",   name:"Los Angeles",    god:"Capital",  strat:4, cx:-118.2, cy:34.05, img:"https://i.imgur.com/KLKHdNC.png", desc:"Mégapole culturelle, deuxième marché économique des USA."},
    {id:"chicago",      name:"Chicago",        god:"Liberty",  strat:4, cx:-87.6,  cy:41.85, img:"https://i.imgur.com/RpGzh2R.png", desc:"Carrefour logistique du continent, poids lourd politique du Midwest."},
    {id:"seattle",      name:"Seattle",        god:"Liberty",  strat:3, cx:-122.3, cy:47.6,  img:"https://i.imgur.com/Tdhz0GZ.png", desc:"Porte d'entrée vers le Pacifique, technologie et commerce maritime."}
  ];

  var orgs = [
    {id:"usarmy",   name:"U.S. Army",       god:"Wrath",    strat:5, img:"https://i.imgur.com/Hrq7LIz.png", desc:"Force militaire dominante. Présence sur tout le territoire et au-delà."},
    {id:"govus",    name:"Gouvernement",    god:"Liberty",  strat:5, img:"https://i.imgur.com/LoLg6gD.png", desc:"Pouvoir exécutif fédéral, contrôle des institutions d'État."},
    {id:"agencies", name:"CIA / FBI",       god:"Vigil",    strat:4, img:"https://i.imgur.com/vM0j71y.png", desc:"Agences fédérales de renseignement. Surveillance et opérations clandestines."},
    {id:"scotus",   name:"Cour Suprême",    god:"Judgment", strat:5, img:"https://i.imgur.com/gUuqrr2.png", desc:"Autorité judiciaire ultime. Ses décisions façonnent la loi du pays."},
    {id:"media",    name:"Médias nat.",     god:"OldMedia", strat:4, img:"https://i.imgur.com/eJqoQwV.png", desc:"CNN, Fox News et autres. Contrôle du récit national."},
    {id:"doj",      name:"DOJ",             god:"Judgment", strat:4, img:"https://i.imgur.com/4Ks35hW.png", desc:"Department of Justice. Bras légal du gouvernement fédéral."},
    {id:"religion", name:"Communauté rel.", god:"Union",    strat:3, img:"https://i.imgur.com/q4SPhU7.png", desc:"Réseaux religieux influents, lobbying moral et politique."},
    {id:"univs",    name:"Universités",     god:"Science",  strat:3, img:"https://i.imgur.com/FGBhbve.png", desc:"Harvard, MIT... Fabrique des élites et de la recherche."},
    {id:"amazon",   name:"Amazon",          god:"Capital",  strat:4, img:"https://i.imgur.com/NB5Us2l.png", desc:"Emprise logistique et commerciale totale sur le territoire."},
    {id:"guns",     name:"Lobby armes",     god:"Wrath",    strat:3, img:"https://i.imgur.com/3dRbwIm.png", desc:"NRA et alliés. Bloque toute régulation des armes à feu."},
    {id:"agri",     name:"Agriculture",     god:"Industry", strat:3, img:"https://i.imgur.com/DnwEIZi.png", desc:"Industrie agro-alimentaire, subventions et poids politique rural."}
  ];

  var sel = null, selOrg = null;

  function h2r(hex, a) {
    var r=parseInt(hex.slice(1,3),16), gv=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return 'rgba('+r+','+gv+','+b+','+a+')';
  }
  function fCol(god) { return (gods[god]||{color:"#88aacc"}).color; }
  function fName(god) {
    var f=(gods[god]||{faction:"?"}).faction;
    return {sovereign:"Sovereign",olympiens:"Olympiens",shemning:"Shemning"}[f]||f;
  }
  function godImg(god) { return (gods[god]||{img:""}).img; }

  /* Calcul des scores par panthéon (map + orgs) */
  function calcScores() {
    var scores = {sovereign:0, olympiens:0, shemning:0};
    var allPoints = mapPoints.concat(orgs);
    allPoints.forEach(function(pt) {
      var f = (gods[pt.god]||{faction:"sovereign"}).faction;
      var mult = factionMult[f]||1;
      scores[f] += pt.strat * mult;
    });
    return scores;
  }

  function renderPantheons() {
    var el = document.getElementById("usa-pantheons-bars");
    if (!el) return;
    var scores = calcScores();
    var total = scores.sovereign + scores.olympiens + scores.shemning;
    if (total === 0) return;

    var pantheons = [
      {key:"sovereign", name:"Sovereign", color:"#4da6ff"},
      {key:"olympiens", name:"Olympiens", color:"#ffaa00"},
      {key:"shemning",  name:"Shemning",  color:"#ff5555"}
    ];

    el.innerHTML = pantheons.map(function(p) {
      var score = scores[p.key];
      var pct = Math.round((score / total) * 100);
      return '<div class="usa-panth-row">' +
        '<div class="usa-panth-header">' +
          '<span class="usa-panth-name" style="color:'+p.color+'">' + p.name + '</span>' +
			'<span class="usa-panth-score">' + pct + '%</span>' +
        '</div>' +
        '<div class="usa-panth-track">' +
          '<div class="usa-panth-fill" style="width:'+pct+'%;background:'+p.color+'"></div>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function initMap() {
    if (!document.getElementById('usa-mapsvg-container')) return;

    var svg = d3.select("#usa-mapsvg-container").append("svg")
      .attr("viewBox","0 0 960 600")
      .style("display","block")
      .style("width","100%");

    var zoom = d3.zoom()
      .scaleExtent([0.8,6])
      .translateExtent([[-300,-200],[1260,800]])
      .on("zoom", function(e){ g.attr("transform",e.transform); });
    svg.call(zoom);

    var g = svg.append("g");
    var proj = d3.geoAlbersUsa().scale(1200).translate([480,300]);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world) {
      var pathGen = d3.geoPath(proj);
      var countries = topojson.feature(world, world.objects.countries);
      var neighbors = ["124","484"];

      g.append("g").selectAll("path")
        .data(countries.features).join("path")
        .attr("d", pathGen)
        .attr("fill", function(d) {
          if (String(d.id)==="840") return "#111e30";
          if (neighbors.indexOf(String(d.id))>=0) return "#0d1825";
          return "#08111c";
        })
        .attr("stroke", function(d) {
          if (String(d.id)==="840") return "rgba(100,160,255,0.25)";
          if (neighbors.indexOf(String(d.id))>=0) return "rgba(80,110,160,0.15)";
          return "rgba(40,60,90,0.1)";
        })
        .attr("stroke-width", function(d){ return String(d.id)==="840"?0.8:0.4; });

      mapPoints.forEach(function(pt) {
        var coords = proj([pt.cx,pt.cy]);
        if (!coords) return;
        var x=coords[0], y=coords[1];
        var col=fCol(pt.god);
        var r=5+pt.strat*2.5;

        var pg = g.append("g")
          .attr("transform","translate("+x+","+y+")")
          .style("cursor","pointer")
          .on("click", function(){ sel=sel===pt.id?null:pt.id; selOrg=null; renderAll(); });

        pg.append("circle").attr("r",r+6).attr("fill",h2r(col,0.12));
        pg.append("circle").attr("r",r).attr("fill",h2r(col,0.75)).attr("stroke",col).attr("stroke-width",1.5);
        pg.append("circle").attr("r",r-2).attr("fill","none").attr("stroke","rgba(255,255,255,0.2)").attr("stroke-width",0.5);
        pg.append("text")
          .attr("y", r+13)
          .attr("text-anchor","middle")
          .attr("font-size","9")
          .attr("fill","rgba(180,210,255,0.7)")
          .attr("pointer-events","none")
          .text(pt.name);
      });
    });

    function renderOrgs() {
      var list=document.getElementById("usa-orgs-list");
      if (!list) return;
      list.innerHTML=orgs.map(function(o){
        var col=fCol(o.god);
        return '<span class="usa-chip'+(selOrg===o.id?' usa-sel':'')+'" onclick="usaPickOrg(\''+o.id+'\')"><span class="usa-dot" style="background:'+col+'"></span>'+o.name+'</span>';
      }).join("");
    }

    window.usaPickOrg=function(id){ selOrg=selOrg===id?null:id; sel=null; renderAll(); };

    function renderPanel() {
      var empty=document.getElementById("usa-empty-msg");
      var detail=document.getElementById("usa-detail-content");
      if (!empty||!detail) return;
      var data=null;
      if (sel) data=mapPoints.filter(function(p){return p.id===sel;})[0];
      if (selOrg) data=orgs.filter(function(o){return o.id===selOrg;})[0];
      if (!data){ empty.style.display="block"; detail.style.display="none"; return; }
      empty.style.display="none"; detail.style.display="block";
      var col=fCol(data.god);
      var type=selOrg?"Organisation":"Zone géographique";
      var gimg=godImg(data.god);

      detail.innerHTML=
        '<img class="usa-p-img" src="'+data.img+'" alt="'+data.name+'" onerror="this.style.display=\'none\'">' +
        '<div class="usa-p-name">'+data.name+'</div>' +
        '<div class="usa-p-type">'+type+'</div>' +
        '<div class="usa-p-sublabel">Contrôleur</div>' +
        '<div class="usa-p-god" style="background:'+h2r(col,0.15)+';color:'+col+';border:1px solid '+h2r(col,0.35)+'">' +
          '<span class="usa-dot" style="background:'+col+'"></span>' +
          data.god+' <span style="opacity:0.5;font-size:10px;margin-left:2px">· '+fName(data.god)+'</span>' +
        '</div>' +
        '<div class="usa-p-sublabel">Symbole divin</div>' +
        '<div style="text-align:center;margin-bottom:12px">' +
          (gimg
            ? '<img src="'+gimg+'" style="width:80px;height:80px;object-fit:contain;border-radius:50%;border:2px solid '+col+';background:rgba(0,0,0,0.3)" onerror="this.style.display=\'none\'">'
            : '<div style="width:80px;height:80px;border-radius:50%;border:1px dashed rgba(200,169,110,0.3);display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:rgba(200,169,110,0.4)">à venir</div>'
          ) +
        '</div>' +
        '<div class="usa-p-sublabel">Importance stratégique · '+data.strat+'/5</div>' +
        '<div class="usa-strat-bar"><div class="usa-strat-fill" style="width:'+(data.strat*20)+'%;background:'+col+'"></div></div>' +
        '<div class="usa-p-desc">'+data.desc+'</div>';
    }

    function renderAll(){ renderOrgs(); renderPanel(); }

    document.getElementById("usa-zi").onclick=function(){ svg.transition().duration(250).call(zoom.scaleBy,1.4); };
    document.getElementById("usa-zo").onclick=function(){ svg.transition().duration(250).call(zoom.scaleBy,0.7); };
    document.getElementById("usa-zr").onclick=function(){ svg.transition().duration(400).call(zoom.transform,d3.zoomIdentity); };

    renderOrgs();
    renderPanel();
    renderPantheons();
  }

  initMap();
})();