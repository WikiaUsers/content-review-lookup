/** <nowiki>
* Этот скрипт реализует визуализацию зависимостей и несовместимостей игровых
* модификаций оружия и брони в шаблоне {{Modification}}. 
* Смотрите документацию к шаблону для более подробной информации. 
*/

// Текущая ячейка под указателем мыши 
let currentElem = null;

$('.modify-root').mouseover(function(event) {
	// если currentElem есть, то мы ещё не ушли с предыдущей ячейки
	if (currentElem) return;
	
	let target = event.target.closest('div.modify-box');	
	
	// Игнорируем переход не на ячейку
	if (!target) return;
	
	currentElem = target;
	
	// Формируем селекторы из тэгов ячеек, получаемых из атрибута текущей ячейки
	function parseSelector(attr) {
		let list = $(target).attr('data-' + attr);
		if (!list) return;
		return list.split(' ').map(item => "[data-tag='" + item + "']").join(',');
	}
	
	let depend		= parseSelector('depend');
	let standoff	= parseSelector('standoff');
	
	$(depend).addClass('active');	
	$(standoff).addClass('passive');
	 
});

$('.modify-root').mouseout(function(event) {
	// Игнорируем уход мыши вне ячейки
	if (!currentElem) return;
	
	// Игнорируем уход мыши на потомка
	let relatedTarget = event.relatedTarget;
	
	while (relatedTarget) {
		if (relatedTarget == currentElem) return;
		relatedTarget = relatedTarget.parentNode;
	}
	
	$('.modify-root .modify-box').removeClass('active passive');
	currentElem = null;
});

// </nowiki>