/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

var oggPlayerButtonOnly = false;

$(function() {
   var pi = $(".pi-theme-groupswitch");
   if(pi.length > 0) {
      pi.children(".pi-group").each(function() { $this = $(this); $this.attr("id", "pi-switchablegroup-" + ($this.index() - 2))});
      pi.find("> .pi-navigation .pi-switch-text").each(function() { $this = $(this); $this.data("groupid", $this.index()); $this.click(function() { $this = $(this); if($this.hasClass("pi-switch-text-active")) return; pi.find("> .pi-navigation .pi-switch-text-active").removeClass("pi-switch-text-active"); $this.addClass("pi-switch-text-active"); pi.children(".pi-group.pi-collapse-open").removeClass("pi-collapse-open").addClass("pi-collapse-closed"); $("#pi-switchablegroup-"+$this.data("groupid")).removeClass("pi-collapse-closed").addClass("pi-collapse-open") })});
   }
});

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';