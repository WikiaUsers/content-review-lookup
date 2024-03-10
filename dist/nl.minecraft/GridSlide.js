addOnloadHook(function() {
  jQuery("table.gridTable").mouseenter(function() {
    jQuery(this).addClass("pause");
    if (jQuery(this).hasClass('brewing')) jQuery("span.grid-input:first", this).parent().before('<div class="pauzeText"><div>Pauze</div></div>')
    else  jQuery("span.grid-output", this).parent().before('<div class="pauzeText"><div>Pauze</div></div>')
  }).mouseleave(function() {
    jQuery(this).removeClass("pause");
    jQuery("div.pauzeText", this).remove()
  });
  setInterval(function() {
    jQuery("table.gridTable").each(function() {
      jQuery(this).hasClass("pause") || (jQuery("div.grid-input-slide", this).each(function() {
        var b = jQuery("span.grid-input.active", this), a = b.next();
        if(1 > a.length || !a.hasClass("grid-input")) {
          a = jQuery("span.grid-input:first", this)
        }
        b.removeClass("active").hide();
        a.addClass("active").show();
        b = jQuery("span.grid-input-numbers.active", this);
        a = b.next();
        1 > a.length && (a = jQuery("span.grid-input-numbers:first", this));
        b.removeClass("active").hide();
        a.addClass("active").show()
      }), jQuery("div.grid-output-slide", this).each(function() {
        var b = jQuery("span.grid-output.active", this), a = b.next();
        if(1 > a.length || !a.hasClass("grid-output")) {
          a = jQuery("span.grid-output:first", this)
        }
        b.removeClass("active").hide();
        a.addClass("active").show();
        b = jQuery("span.grid-output-numbers.active", this);
        a = b.next();
        1 > a.length && (a = jQuery("span.grid-output-numbers:first", this));
        b.removeClass("active").hide();
        a.addClass("active").show()
      }))
    })
  }, 1E3)
});