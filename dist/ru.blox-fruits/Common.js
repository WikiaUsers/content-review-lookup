/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

document.querySelectorAll('.research-collapsible-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		btn.textContent = isActive ? 'Закрыть' : 'Посмотреть';
	});
});

function toggleItem(el) {
  el.classList.toggle('active');
}