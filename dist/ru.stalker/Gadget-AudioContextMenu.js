(function() {
	document.querySelectorAll('.ext-audiobutton').forEach(function(button) {
		button.oncontextmenu = function() {
			return false;
		}
		button.addEventListener('contextmenu', function(event) {
			document.querySelectorAll('.sw-audio-dropdown').forEach(function (dropdown) {
				dropdown.remove();
			})
			var dropdown = document.createElement('div');
			dropdown.classList.add('sw-audio-dropdown');
			dropdown.style.left = event.clientX + 5 + 'px';
			dropdown.style.top = event.clientY + 5 + 'px';

			var dropdownButtonOpen = document.createElement('a');
			dropdownButtonOpen.innerHTML = 'Открыть файл';
			dropdownButtonOpen.href = event.target.parentNode.querySelector('source').src;
			dropdownButtonOpen.target = '__blank';

			var dropdownButtonDownload = document.createElement('a');
			dropdownButtonDownload.innerHTML = 'Скачать файл';
			dropdownButtonDownload.addEventListener('click', function() {
				var url = event.target.parentNode.querySelector('source').src;
				var filename = url.split("/")[7];

				fetch(url)
				.then(function (response) {
					return response.blob();
				})
				.then(function (blob) {
					var a = document.createElement('a');
					a.href = URL.createObjectURL(blob);
					a.download = filename; 
					a.style.display = 'none';
					document.body.appendChild(a);
					a.click();
					a.remove();
				});
			});  

			dropdown.appendChild(dropdownButtonOpen);
			dropdown.appendChild(dropdownButtonDownload);
			event.target.parentNode.appendChild(dropdown);

			document.addEventListener('click', function() {
				dropdown.remove();
			});
		});
	});
})()