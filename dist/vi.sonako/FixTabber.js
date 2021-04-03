window.whenReady = new Array();
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
	$(".tabber").css('display','block');
	$(".tabber").addClass('failed');
 
	window.whenReady.forEach(function(z){
	  if (typeof window[z] === "function") window[z](); 
	});
	//example: window.whenReady.push("functionName");
 
	$(window).trigger('resize');
  }
}
if (mw.util.getParamValue('action') != "edit") {
  tabberOptions = {
	manualStartup: 1, //to disable default tabber script, custom tabber script ignores this.
	onLoad: function() {

	  $(this.div).css('display','block');

	  $(this.div).css('margin-right','-1px'); //fixes issue where content does not resize to fit tabber.

	  if (window.location.hash) {
	    var choosetab = (window.location.hash).replace('#', '').replace(/_/g, ' ');
	    var currentTabber = this;
	    $(".tabbernav li a", this.div).each(function(i) { 
	      if ($(this).attr("title") === choosetab) currentTabber.tabShow(i);
              if ($('.tabberlive .tabbernav a[title="'+choosetab+'"]').length) $('.tabberlive .tabbernav a[title="'+choosetab+'"]').get(0).scrollIntoView();
	    });
	    delete currentTabber;
	  }
	}
  };
}