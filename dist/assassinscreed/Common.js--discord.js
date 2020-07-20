/* Discord Widget for side as requested by Sima */
function addDiscordWidget() {
    var widget = '<span class="DiscordIntegrator loaded" data-id="334703664985931777" data-logged-in="{{{loggedIn}}}" data-useptb="" data-theme="light" data-width="100%" data-height="400px" data-allowtransparency="true"><iframe src="https://discordapp.com/widget?id=334703664985931777&amp;theme=light&amp;username=DarkFeather" width="100%" height="400px" allowtransparency="true" frameborder="0"></iframe></span>';
	var element = document.getElementById('WikiaRailWrapper');
	element.innerHTML += widget;
}
addOnloadHook( addDiscordWidget );