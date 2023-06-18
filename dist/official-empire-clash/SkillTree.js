
var container = document.querySelector('.miro-board');

if (container) {
	var iframe = document.createElement('iframe');
	
	iframe.className = 'responsive-iframe';
	iframe.src = 'https://miro.com/app/live-embed/' + container.dataset.boardid + '/?embedMode=view_only_without_ui';
	
	container.appendChild(iframe);
}