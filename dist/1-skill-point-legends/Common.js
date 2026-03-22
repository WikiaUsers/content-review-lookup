/* Any JavaScript here will be loaded for all users on every page load. */
/* IMPORTANT:
 The below code forces a reload for mw-selflink-fragment links so nested tabbers open correctly.
 Do NOT change ANYTHING BELOW. Fandom tabber initialization breaks without the forced reload.*/
document.addEventListener("click", function(e) {

  const link = e.target.closest("a.mw-selflink-fragment");
  if (!link) return;

  if (link.closest(".tabbernav")) return;

  const hash = link.hash;
  if (!hash) return;

  e.preventDefault();

  const page = mw.config.get("wgPageName");
  const url = mw.util.getUrl(page) + hash;

  window.location.href = url;

  setTimeout(function(){
    window.location.reload();
  }, 50);

});

/*The script below forces a reload when navigating between fragments and also handles browser back/forward navigation using popstate.*/

window.addEventListener("popstate", function () {

  if (window.location.hash) {
    location.reload();
  }

});

/*DO NOT CHANGE ANYTHING IN THE ABOVE CODES OR THE TABBER INITIALISATION WILL BREAK*/



/* TAB RESOLVER SCRIPT
   Opens the correct main tab (Armor/Weapons/Chests)
   and then the correct inner tab based on the URL hash */

mw.hook("wikipage.content").add(function(){

  if(!location.hash) return;

  const hash = location.hash.substring(1);

  let mainTab = null;

  /* Armor group */
  if([
    "Wooden_Set","Iron_Set","Gold_Set","Diamond_Set",
    "Emerald_Set","Ruby_Set","Lich_King_Set","Hollybeard_Set"
  ].includes(hash)){
    mainTab = "Armor";
  }

  /* Weapons group */
  if([
    "Common","Uncommon","Rare","Epic",
    "Legendary","Exclusive","Event","Secret"
  ].includes(hash)){
    mainTab = "Weapons";
  }

  /* Chests group */
  if([
    "Wooden_Chests","Iron_Chests","Golden_Chests","Diamond_Chests",
    "Emerald_Chests","Ruby_Chests","Special_Chests","Event_Chests"
  ].includes(hash)){
    mainTab = "Chests";
  }

  if(mainTab){

    const mainButton = document.querySelector(
      '.wds-tabs__tab[data-hash="'+mainTab+'"]'
    );

    if(mainButton){
      mainButton.click();
    }

  }

  setTimeout(function(){

    const innerTab = document.querySelector(
      '.wds-tabber .wds-tabs__tab[data-hash="'+hash+'"]'
    );

    if(innerTab){
      innerTab.click();
    }

  },300);

});
//Making Buttons Clickable
mw.hook("wikipage.content").add(function () {

  // Homepage boxes
  document.querySelectorAll(".homepage-nav-box").forEach(function(box){

    const link = box.querySelector("a");
    if (!link) return;

    box.addEventListener("click", function(e){
      if (e.target.tagName.toLowerCase() === "a") return;
      window.location.href = link.href;
    });

  });

  // Area page boxes
  document.querySelectorAll(".area-box").forEach(function(box){

    const link = box.querySelector(".area-title a");
    if (!link) return;

    box.addEventListener("click", function(e){
      if (e.target.tagName.toLowerCase() === "a") return;
      window.location.href = link.href;
    });

  });

});