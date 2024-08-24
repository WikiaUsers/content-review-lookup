/* Das folgende JavaScript wird für alle Benutzer geladen. */
/* Any JavaScript here will be loaded for all users on every page load. */

/* Allow direct link to Tabber */
 
tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ').replace('%20', ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      delete currentTabber;
    }
  }
};

window.tooltips_list = [
    {
        classname: 'info-tooltip',
        parse: '{'+'{InfoTip|<#info#>|<#type#>}}',
    },
]