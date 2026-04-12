/* Do the looping of image switching in-place */
mw.hook('wikipage.content').add(($content) => {
	$content[0].querySelectorAll('.inplace-gallery').forEach(gallery => {
		const styles = getComputedStyle(gallery);
		const images = gallery.querySelectorAll('.inplace-gallery-item');
		
		if (images.length <= 1)
			return;
	
		const speed = parseInt(styles.getPropertyValue('--speed')) || 3;
		let index = 0;
	
		setInterval(() => {
			images[index].classList.remove('enabled');
			index = (index + 1) % images.length;
			images[index].classList.add('enabled');
		}, speed * 1000);
	});
});