tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      delete currentTabber;
    }
  }
};