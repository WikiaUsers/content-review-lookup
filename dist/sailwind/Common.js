/* Any JavaScript here will be loaded for all users on every page load. */
/*Loads in JS from other pages*/
mw.loader.load('/wiki/MediaWiki:CargoCalc.js?action=raw&ctype=text/javascript');
/*-------------------------------------*/

window.SpoilerAlertJS = {
    question: 'Yar! This area contains spoilers. Are ye sure ye wish to read it?',
    yes: 'Aye',
    no: 'Nay',
    fadeDelay: 500
};

// Add category-based classes to body for CSS targeting
$(function() {
    var categories = mw.config.get('wgCategories');
    if (categories) {
        categories.forEach(function(cat) {
            var className = 'category-' + cat.replace(/ /g, '_').replace(/'/g, '_');
            $('body').addClass(className);
        });
    }
});

/* =========================
   GAFF DIAGRAM (FANDOM SAFE)
   HTML + DIV HITBOX VERSION
   ========================= */

function initGaffDiagram() {
  var root = document.getElementById("swg-root");
  if (!root) return;

  var swgParts = {
    throat: { name:'Throat', tags:['corner','spar'], desc:'The forward upper corner...', stats:[['Location','Upper forward'],['Attached','Gaff & Mast']]},
    peak:   { name:'Peak', tags:['corner'], desc:'Outer upper corner...', stats:[['Location','Upper aft']]},
    tack:   { name:'Tack', tags:['corner'], desc:'Lower forward corner...', stats:[['Location','Lower forward']]},
    clew:   { name:'Clew', tags:['corner'], desc:'Lower aft corner...', stats:[['Location','Lower aft']]},
    luff:   { name:'Luff', tags:['edge'], desc:'Forward edge along mast...', stats:[]},
    leech:  { name:'Leech', tags:['edge'], desc:'Aft free edge...', stats:[]},
    foot:   { name:'Foot', tags:['edge'], desc:'Bottom edge...', stats:[]},
    head:   { name:'Head', tags:['edge'], desc:'Top edge along gaff...', stats:[]},
    belly:  { name:'Belly', tags:[], desc:'Main sail body...', stats:[]},
    mast:   { name:'Mast', tags:['spar'], desc:'Vertical spar...', stats:[]},
    gaff:   { name:'Gaff', tags:['spar'], desc:'Diagonal spar...', stats:[]},
    boom:   { name:'Boom', tags:['spar'], desc:'Horizontal spar...', stats:[]}
  };

  /* =========================
     BUILD HTML STRUCTURE
     ========================= */

  root.innerHTML = `
  <div class="swg-wrap">
    <div class="swg-top">Gaff Sail — Interactive Diagram</div>

    <div class="swg-layout">

      <div>

        <div class="swg-diagram" id="swg-diagram">

          <!-- VISUAL BASE (pure HTML drawing) -->
          <div class="swg-canvas">

            <div class="swg-mast swg-hit" data-part="mast"></div>
            <div class="swg-gaff swg-hit" data-part="gaff"></div>
            <div class="swg-boom swg-hit" data-part="boom"></div>

            <div class="swg-sail swg-hit" data-part="belly"></div>

            <!-- corners -->
            <div class="swg-point swg-hit" data-part="throat"></div>
            <div class="swg-point swg-hit" data-part="peak"></div>
            <div class="swg-point swg-hit" data-part="tack"></div>
            <div class="swg-point swg-hit" data-part="clew"></div>

          </div>

          <p class="swg-hint">
            Click any part of the sail or use the buttons below
          </p>

        </div>

        <div class="swg-btns" id="swg-btns"></div>

      </div>

      <div class="swg-panel">

        <div class="swg-ph"><span>Gaff Sail Parts</span></div>

        <div class="swg-pb">

          <div class="swg-pname" id="swg-pname">Select a part</div>

          <div class="swg-pdesc" id="swg-pdesc"
               style="color:rgba(255,255,255,0.5);font-style:italic">
            Click a part of the diagram.
          </div>

          <div id="swg-ptags"></div>

          <hr class="swg-div" id="swg-sdiv" style="display:none"/>

          <div id="swg-pstats"></div>

        </div>
      </div>

    </div>
  </div>
  `;

  /* =========================
     INTERACTION LOGIC
     ========================= */

  function activate(k) {
    var p = swgParts[k];
    if (!p) return;

    document.getElementById("swg-pname").textContent = p.name;

    var d = document.getElementById("swg-pdesc");
    d.textContent = p.desc;
    d.style.color = "#fff";
    d.style.fontStyle = "normal";

    var t = document.getElementById("swg-ptags");
    t.innerHTML = "";

    (p.tags || []).forEach(function(tag){
      var s = document.createElement("span");
      s.className = "swg-tag swg-tag-" + tag;
      s.textContent = tag;
      t.appendChild(s);
    });

    var st = document.getElementById("swg-pstats");
    st.innerHTML = "";

    var sd = document.getElementById("swg-sdiv");
    if (p.stats && p.stats.length) {
      sd.style.display = "";
      p.stats.forEach(function(r){
        var row = document.createElement("div");
        row.className = "swg-srow";
        row.innerHTML =
          '<span class="swg-sl">' + mw.html.escape(r[0]) + '</span>' +
          '<span class="swg-sv">' + mw.html.escape(r[1]) + '</span>';
        st.appendChild(row);
      });
    } else {
      sd.style.display = "none";
    }

    document.querySelectorAll(".swg-hit").forEach(function(el){
      el.style.opacity = (el.dataset.part === k ? "1" : "0.25");
    });

    document.querySelectorAll(".swg-btn").forEach(function(b){
      b.classList.toggle("swg-active", b.dataset.part === k);
    });
  }

  /* click hits */
  document.querySelectorAll(".swg-hit").forEach(function(el){
    el.addEventListener("click", function(){
      activate(el.dataset.part);
    });
  });

  /* buttons */
  var br = document.getElementById("swg-btns");

  Object.keys(swgParts).forEach(function(k){
    var b = document.createElement("button");
    b.className = "swg-btn";
    b.dataset.part = k;
    b.textContent = swgParts[k].name;

    b.addEventListener("click", function(){
      activate(k);
    });

    br.appendChild(b);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGaffDiagram);
} else {
  initGaffDiagram();
}