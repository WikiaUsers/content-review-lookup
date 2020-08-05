/*---------------------------------------------
 * 생일 알리미 컨트롤 | Birthday Alarm Control
 *
 * @Author: [[User:Cafeinlove]]
 * @License: MIT License
 *---------------------------------------------*/
(function($) {

	var $container = $('#birthdayList');

	if (!$container) return;

	var $tabs = $container.children();
	var size =	$tabs.length - 1;
	var current = 0;
	var $prevBtn = $('#birthdayPrev > a');
	var $nextBtn = $('#birthdayNext > a');
	var aClass = 'active';
	var dClass = 'disabled';

	$nextBtn.click(function(e) {
		e.preventDefault();
		nextTab();
	});

	$prevBtn.click(function(e) {
		e.preventDefault();
		prevTab();
	});

	function showCurrent() {
		$tabs.each( function(i) {
			if (i !== current) {
				$(this).removeClass(aClass);
			} else {
				$(this).addClass(aClass);
			}
		});
	}

	function nextTab() {
		if (current === 0) {
			$prevBtn.parent().removeClass(dClass);
		}
		current += 1;
		if (current === size) {
			$nextBtn.parent().addClass(dClass);
		}
		showCurrent();
	}

	function prevTab() {
		if (current === size) {
			$nextBtn.parent().removeClass(dClass);
		}
		current -= 1;
		if (current === 0) {
			$prevBtn.parent().addClass(dClass);
		}
		showCurrent();
	}

})(jQuery);