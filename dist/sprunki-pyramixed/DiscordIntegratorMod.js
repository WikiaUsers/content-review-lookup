document.addEventListener('DOMContentLoaded', function() {
	var iframe = document.querySelector('iframe[src*="discord.com/widget"]');
	if (iframe) {
		iframe.addEventListener('click', function() {
			window.open("https://discord.gg/FKNEHwgqJ5", "_blank");
		});
	}
});