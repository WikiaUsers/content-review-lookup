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