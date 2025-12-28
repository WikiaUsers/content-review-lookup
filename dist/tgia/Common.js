// Tooltip (adopted from the Pilgrammed wiki)
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
    });
});


$(function () {
  const OFFSET_X = 12;
  const OFFSET_Y = 18;

  $(document).on('mouseenter', '.status', function (e) {
    const $status = $(this);
    const $tip = $status.find('.description').clone()
      .removeClass('description')  
      .addClass('tooltip-clone')
      .appendTo('body')
      .css({
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',  
        zIndex: 2147483647,
        background: 'rgba(20,20,20,1)',
        color: '#fff',
        padding: '6px 8px',
        border: '2px solid #fff',
        boxSizing: 'border-box',
        maxWidth: '350px',
        wordWrap: 'break-word'
      });

    function positionTip(pageX, pageY) {
      const tipWidth = $tip.outerWidth();
      const tipHeight = $tip.outerHeight();
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();
      const scrollLeft = $(window).scrollLeft();
      const scrollTop = $(window).scrollTop();

      let left = pageX + OFFSET_X;
      let top = pageY + OFFSET_Y;

      if (left + tipWidth > windowWidth + scrollLeft) {
        left = pageX - OFFSET_X - tipWidth;
      }
      if (left < scrollLeft + 2) {
        left = scrollLeft + 2;
      }

      if (top + tipHeight > windowHeight + scrollTop) {
        top = pageY - OFFSET_Y - tipHeight;
      }
      if (top < scrollTop + 2) {
        top = scrollTop + 2;
      }

      $tip.css({ left: left, top: top });
    }

    positionTip(e.pageX, e.pageY);

    $status.on('mousemove.tooltip', function (ev) {
      positionTip(ev.pageX, ev.pageY);
    });

    $status.on('mouseleave.tooltip', function () {
      $status.off('.tooltip');
      $tip.remove();
    });
  });
});

// User profiles (adopted from the BFS wiki)
importArticle({
    type: 'script',
    article: 'u:dev:UserTags/code.js'
});

window.UserTagsJS = {
	modules: {},
	tags: {
		dev: {u:'TGIA Developer',order:-2001},
	}
};
UserTagsJS.modules.custom = {
	'135stew': ["dev"],
	'Nottackelgamer': ["dev"],
	'EntityDark': ["dev"]
};