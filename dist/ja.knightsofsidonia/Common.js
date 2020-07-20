/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */

/* =============
   MOS box 
   from Brickipedia
   ==============
   This is the little box underneath the
   search bar and article tally, which has the 
   Seal of Rassilon in it.
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */

importScript('MediaWiki:Common.js/moxbox.js');


importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/VotesTally.js",
    ]
});