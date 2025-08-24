window.AddRailModule = [{page: 'Template:RailModule', prepend: true, maxAge: 0}];

// disables CategorySelectAdd button when Work In Progress template is on page
mw.hook("wikipage.content").add(function() {
    var userName = mw.config.get('wgUserName');
    var element = document.querySelector('[data-user-owner-name]');
    var categoryButton = document.getElementById('CategorySelectAdd');
    
    if (!element || !categoryButton) return;
  
    var userOwnerName = element.getAttribute('data-user-owner-name');
	categoryButton.disabled = !!userOwnerName && userOwnerName !== userName;
});