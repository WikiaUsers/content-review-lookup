/* Перемикання між сторінками слайдеру */
mw.loader.using(["jquery.cookie"]);
 
mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");
 
  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });
 
  $(".portal_sliderlink").click(function() { // обов'язкова прив'язка до кліку
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // обов'язкова прив'язка до кліку
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // перехід до наступної вкладки
    return false;
  });
  $(".portal_prev").click(function() { // обов'язкова прив'язка до кліку
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // перехід до попередньої вкладки
    return false;
  });
});