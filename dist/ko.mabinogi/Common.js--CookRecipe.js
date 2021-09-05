// <nowiki>
/**
 * This is a script for [[Template:요리 방법]].
 * [[틀:요리 방법]]를 위한 스크립트.
 */

/**
 * This function make the elements draggable and sortable.
 * Inspired by https://github.com/SortableJS/Sortable
 * 이 함수는 요소들을 끌어서 정렬할 수 있게 합니다.
 */
function MakeSortable() {
	'use strict';
	function indexOf(el) {
		return Array.from(el.parentNode.children).indexOf(el);
	}

	for (var $recipe of document.querySelectorAll('.cook-recipe')) {
		var $dragged;
		var $items = $recipe.querySelector('.마비노기-인터페이스--준비물');
		var $bars = $recipe.querySelectorAll('.cr-ratio-bar');

		function _onDragOver(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';

			var $target = event.target;
			if ($target && $target !== $dragged && $target.nodeName == 'LI') {
				var dragged = indexOf($dragged);
				var target = indexOf($target);
				var $bar;
				if (dragged < target) {
					if (target == 2) {
						$items.insertBefore($target, $dragged);
					} else {
						$items.insertBefore($dragged, $target.nextSibling);
					}
					for ($bar of $bars) {
						$bar.insertBefore(
							$bar.children[dragged],
							$bar.children[target].nextSibling || $bar.children[target]
						);
					}
				} else {
					$items.insertBefore($dragged, $target);
					for ($bar of $bars) {
						$bar.insertBefore($bar.children[dragged], $bar.children[target]);
					}
				}
			}
		}

		function _onDragEnd(event) {
			event.preventDefault();

			$dragged.classList.remove('ghost');
			$items.removeEventListener('dragover', _onDragOver, false);
			$items.removeEventListener('dragend', _onDragEnd, false);
		}

		for (var $item of $items.children) {
			$item.draggable = true;
			$item.style.cursor = 'move';
		}
		$items.addEventListener('dragstart', function (event) {
			var target = event.target;
			if (target.nodeName != 'LI') {
				return;
			}
			$dragged = target;
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('Text', $dragged.textContent);

			$items.addEventListener('dragover', _onDragOver, false);
			$items.addEventListener('dragend', _onDragEnd, false);

			setTimeout(function () {
				$dragged.classList.add('ghost');
			}, 0);
		});

		init();
	}
}

/**
 * This function hides the optional last ingredient of the recipe when the
 * checkbox is not checked.
 * 체크 박스의 체크를 풀면 선택 사항인 재료가 숨겨지도록 합니다.
 */
function MakeOmittable() {
	'use strict';
	for (var $recipe of document.querySelectorAll('.cook-recipe')) {
		var $optional = $recipe.querySelector(
			'.마비노기-인터페이스--준비물 .cr-optional'
		);
		if (!$optional) continue;

		var $checkbox = document.createElement('input');
		$checkbox.className = 'rt-optional-checkbox';
		$checkbox.setAttribute('type', 'checkbox');
		$checkbox.classList.add('basic-tooltip');
		$checkbox.setAttribute('title',
			'이 재료를 넣지 않아도 품질은 떨어지지만 조리할 수 있습니다.');
		$checkbox.checked = true;
		$optional.appendChild($checkbox);
		$checkbox.addEventListener('change', function () {
			for (var $ratio of $recipe.querySelectorAll('.cr-ratio-bar .cr-optional')) {
				$ratio.style.display = this.checked ? 'block' : 'none';
			}
		});
	}
}

function init() {
	'use strict';
	if (window.recipeTable) {
		return;
	}
	window.recipeTable = true;

	MakeSortable();
	MakeOmittable();
}

init();