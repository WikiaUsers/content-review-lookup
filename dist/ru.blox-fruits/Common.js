/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

document.querySelectorAll('.research-collapsible-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		btn.textContent = isActive ? 'Закрыть' : 'Посмотреть';
	});
});

document.querySelectorAll('.navbox-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		
		const wrapper = btn.closest('.navbox-wrapper');
		const container = wrapper.querySelector('.navbox-container');

		if (isActive) {
			container.classList.add('active');
		} else {
			container.classList.remove('active');
		}
	});
});