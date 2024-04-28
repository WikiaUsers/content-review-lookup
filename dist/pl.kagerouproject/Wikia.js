/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
$(document).ready(function () {
    var badgesTpl = document.getElementById('badges');
    if ((typeof badgesTpl !== "undefined") && (badgesTpl !== null)) {
        $("#badges").addClass("module");
        $('#WikiaRail').prepend(badgesTpl);
    }
});

$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

$(".big-img").click(function () {
  $(this).hide(500, function () {
    $(this).remove();
  });
});