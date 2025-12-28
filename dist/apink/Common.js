/* Any JavaScript here will be loaded for all users on every page load. */

// LockForums config
window.LockForums = {
    expiryDays: 14,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};
 
// ArchiveBoards config
window.ArchiveBoards = {
    post: true,
    threads: false,
    boards: ['Wikia Updates']
};

// Add [[ Category: Images]] @ images automatically
 
if(typeof wgPageName !== 'undefined' && (wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload')) {
$('#wpUploadDescription').val('[[Category:Images]]');
}
 
// TZclock config
window.TZclockSimpleFormat = true;
 
// Rollback config
window.RollbackWikiDisable = true;
 
// AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

// Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac)
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});

/* =========================================
   APINK INFOBOX TABS — CLICK ONLY (NO MOVE)
   Arrows = prev/next
   Prevent any auto-shift
   ========================================= */
(function () {

  function getWrapper(box){ return box.querySelector('.wds-tabs__wrapper'); }
  function getUL(box){ return box.querySelector('ul.wds-tabs[role="tablist"], ul.wds-tabs'); }

  function lockStrip(box){
    var w = getWrapper(box);
    var ul = getUL(box);
    if (w) w.scrollLeft = 0;
    if (ul) ul.scrollLeft = 0;
  }

  function setup(box){
    if (box.dataset.apinkClickTabs === '1') return;
    box.dataset.apinkClickTabs = '1';

    var tabs = box.querySelectorAll('.wds-tabs__tab');
    var left = box.querySelector('.wds-tabs__arrow-left');
    var right = box.querySelector('.wds-tabs__arrow-right');
    var wrapper = getWrapper(box);
    var ul = getUL(box);

    if (!tabs.length || !left || !right || !wrapper || !ul) return;

    function currentIndex(){
      for (var i=0;i<tabs.length;i++){
        if (tabs[i].classList.contains('wds-is-current')) return i;
      }
      return 0;
    }

    function activate(i){
      if (!tabs[i]) return;
      var a = tabs[i].querySelector('a');
      if (a) a.click();
      setTimeout(function(){ lockStrip(box); }, 0);
      setTimeout(function(){ lockStrip(box); }, 50);
      setTimeout(function(){ lockStrip(box); }, 200);
    }

    left.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      var i = currentIndex();
      if (i > 0) activate(i-1);
    }, true);

    right.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      var i = currentIndex();
      if (i < tabs.length-1) activate(i+1);
    }, true);

    // Any tab click: lock it (prevents underline/strip shifting)
    box.addEventListener('click', function(e){
      if (e.target.closest('.wds-tabs__tab')) {
        setTimeout(function(){ lockStrip(box); }, 0);
        setTimeout(function(){ lockStrip(box); }, 50);
      }
    }, true);

    // If TabberNeue tries to scroll, undo it
    wrapper.addEventListener('scroll', function(){
      if (wrapper.scrollLeft !== 0) wrapper.scrollLeft = 0;
    }, true);

    ul.addEventListener('scroll', function(){
      if (ul.scrollLeft !== 0) ul.scrollLeft = 0;
    }, true);

    // Initial lock (TabberNeue renders late)
    [0, 200, 800, 1500].forEach(function(t){
      setTimeout(function(){ lockStrip(box); }, t);
    });
  }

  function init(root){
    (root || document).querySelectorAll('.apink-infobox-tabs').forEach(setup);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ init(document); });
  } else {
    init(document);
  }

  if (window.mw && mw.hook){
    mw.hook('wikipage.content').add(function($c){ init($c[0]); });
  }

})();