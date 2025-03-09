// For [[Little Bear Wiki:FCC]]
if ($(location.hash).attr('class') === 'FCC-link'){
	for (let i = 0; i < 5; i++){
		setTimeout(() => scroll(0, 0), i * 1000);
	}
	
	$(location.hash).addClass('bold');
}