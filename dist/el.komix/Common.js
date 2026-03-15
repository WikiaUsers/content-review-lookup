// **********************************************
// WikiActivity - https://dev.fandom.com/wiki/WikiActivity
// **********************************************

window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};


// **********************************************
// User Tags - https://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
    modules: {},
    tags: {
        comicw: { u:'Σχεδιαστης' },
        articlec: { u:'Διορθωτης αρθρων' },
        bloga: { u:'Blog Admin' },
        articlea: { u:'Article Admin' },
        veterans: {u:'Veteran'}
    }
};

UserTagsJS.modules.custom = {
    'JimRm': ['comicw'],
    'Chris Moustakas': ['articlec'],
    'Angel.tze': ['comicw'],
    'Comic fun': ['comicw'],
    'Qui-Gon-Jonn': ['comicw'],
    'Petross21': ['articlea', 'bloga'],
    'John Johny': ['veterans'],
    'McDuck7': ['veterans'],
    'ΚΟΜΙΞΑΚΙΑΣ 15': ['veterans']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator'];

/*New Slider*/
$(document).ready(function() {
  function a(b) {
    a.startTimestamp || (a.startTimestamp = b);
    if (!a.stopped) {
      var c = (b - a.startTimestamp) / 8e3 * 1e3;
      $(".scrolls").scrollLeft() + c > $(".scrolls > p > span:eq(0)").width()
        ? ($(".scrolls > p").append($(".scrolls > p > span:eq(0)")),
          $(".scrolls").scrollLeft(
            $(".scrolls").scrollLeft() +
              c -
              $(".scrolls > p > span:eq(0)").width()
          ))
        : $(".scrolls").scrollLeft($(".scrolls").scrollLeft() + c);
    }
    a.startTimestamp = b;
    window.requestAnimationFrame(a);
  }
  for (
    var d = $(".scrolls > p > span").clone(!0);
    $(".scrolls > p").width() < 3 * $(".scrolls").width();

  )
    $(".scrolls > p").append(d.clone(!0));
  a.startTimestamp;
  a.stopped = !1;
  window.requestAnimationFrame(a);
  $(".scrolls").on("click", function() {
    a.stopped = !a.stopped;
  });
  $(".scrolls").on("mouseenter", function() {
    a.stopped = !0;
  });
  $(".scrolls").on("mouseleave", function() {
    a.stopped = !1;
  });
});

/* Custom Tabber*/

document.querySelectorAll('.custom-tabber').forEach(function(tabber) {
    var tabs = tabber.querySelectorAll('.ct-tab');
    var panels = tabber.querySelectorAll('.ct-panel');

    tabs.forEach(function(tab, index) {
      tab.addEventListener('click', function() {

        // Deactivate all tabs
        tabs.forEach(function(t) {
          t.classList.remove('ct-active');
        });

        // Hide all panels
        panels.forEach(function(p) {
          p.style.display = 'none';
        });

        // Activate clicked tab and show matching panel by index
        tab.classList.add('ct-active');
        if (panels[index]) panels[index].style.display = 'block';
      });
    });
  });

/* Custom Scrolling */
function initKomixArrows() {
    const rowWrappers = document.querySelectorAll('.komix-editions-row-wrapper');
    
    if (rowWrappers.length === 0) return false; // No rows found
    
    rowWrappers.forEach(function(wrapper) {
        if (wrapper.dataset.arrowsInitialized) return; // Already done
        wrapper.dataset.arrowsInitialized = 'true';
        
        const row = wrapper.querySelector('.komix-editions-row');
        if (!row) return;
        
        const itemWidth = 120; // Item + gap
        const scrollAmount = itemWidth * 3;
        
        // Create arrows
        const leftArrow = document.createElement('div');
        leftArrow.className = 'komix-arrow komix-arrow-left';
        leftArrow.innerHTML = '◀';
        
        const rightArrow = document.createElement('div');
        rightArrow.className = 'komix-arrow komix-arrow-right';
        rightArrow.innerHTML = '▶';
        
        wrapper.appendChild(leftArrow);
        wrapper.appendChild(rightArrow);
        
        // Arrow click handlers
        leftArrow.addEventListener('click', function(e) {
            e.preventDefault();
            row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        rightArrow.addEventListener('click', function(e) {
            e.preventDefault();
            row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Arrow visibility
        const checkArrows = () => {
            const maxScroll = row.scrollWidth - row.clientWidth;
            const currentScroll = row.scrollLeft;
            
            leftArrow.style.opacity = currentScroll > 10 ? '1' : '0.3';
            rightArrow.style.opacity = currentScroll < maxScroll - 10 ? '1' : '0.3';
        };
        
        row.addEventListener('scroll', checkArrows);
        checkArrows();
    });
    
    return true; // Success
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKomixArrows);
} else {
    // DOM already loaded
    if (!initKomixArrows()) {
        // Retry after short delay
        setTimeout(initKomixArrows, 100);
    }
}


$(document).on('articlesChanged', initKomixArrows);
window.addEventListener('load', initKomixArrows);