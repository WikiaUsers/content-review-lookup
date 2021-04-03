function toggleBrowserPoniesToBackground () {
	var main = document.getElementById('main');
	if (main.style.zIndex === '') {
		main.style.zIndex = '100000000';
	}
	else {
		main.style.zIndex = '';
	}
}

#main {
	position: relative;
	background: rgba(255, 255, 255, 0.8);
	border: 5px solid rgba(163, 204, 222, 0.8);
}