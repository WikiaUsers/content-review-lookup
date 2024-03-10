$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	if (! document.getElementById('pbh-table')) {
		return;
	}
	var clicked = {};
	var undo = {};
	var currentColor = 'red';
	var justCleared = false;
	
	// toolbox element variables
	var $toolbox = $(document.getElementById('pbh-setcolor-box'));
	var $remove = $(document.getElementById('pbh-remove'));
	var $removeall = $(document.getElementById('pbh-removeall'));
	var $undo = $(document.getElementById('pbh-undo'));
	var $colorPickList = $('.pbh-setcolor');
	
	var $cellList = $('.pbh-blue, .pbh-red');
	var $championList = $('.pbh-cn'); // cn short for pbh-champion
	
	// TOOLBOX EVENT FUNCTIONS
	
	function selectThisToolOnly(obj) {
		$toolbox.find('div').each(function() {
			$(this).removeClass('pbh-current-tool');
		})
		$(obj).addClass('pbh-current-tool');
	}
	
	// handle color picking options
	$colorPickList.each(function() {
		$(this).click(function() {
			currentColor = $(this).attr('data-pbhcolor');
			selectThisToolOnly(this);
		});
	});
	
	// handle remove color tool
	$remove.click(function() {
		currentColor = null;
		selectThisToolOnly(this);
	});
	
	// handle removeAll tool
	$removeall.click(function() {
		undo = Object.assign({}, clicked);
		$cellList.each(function () {
			$(this).css('background-color', '');
		});
		clicked = {};
		if (! jQuery.isEmptyObject(undo)) {
			$(this).css('display','none');
			$undo.css('display','');
		}
		justCleared = true;
	});
	
	// handle undo tool
	$undo.click(function() {
		clicked = Object.assign({}, undo);
		undo = {};
		$cellList.each(function() {
			var color = $(this).attr('data-lastcolor');
			$(this).css('background-color', color ? color : '');
		});
		$(this).css('display','none');
		$removeall.css('display','');
		justCleared = false;
	});
	
	
	// TABLE EVENT FUNCTIONS
	
	function writeBGColor(obj) {
		$(obj).attr('data-lastcolor', $(obj).css('background-color'));
	}

	function highlight(champion, clickEvent) {
		$('.pbh-' + champion).each(function () {
			$(this).css('background-color', currentColor);
			if (clickEvent) {
				writeBGColor(this);
			}
		});
	}

	function unhighlight(champion, clickEvent) {
		$('.pbh-' + champion).each(function () {
			// in each cell we have attr c1 & maybe also c2 that say what champions
			// are there. before removing a color, check if that cell has another
			// champion in it, and if it does then switch to that champ's color
			// instead of removing altogether.
			var c1 = this.getAttribute('data-c1');
			var c2 = this.getAttribute('data-c2');
			var other = champion == c1 ? c2 : c1;
			var newcolor = other && other in clicked && clicked[other] ? clicked[other] : ''; // color of the other champion or nothing
			
			// if there's no recorded color of the champion then make it newcolor
			if (!(champion in clicked && clicked[champion])) {
				$(this).css('background-color', newcolor);
			}
			// otherwise it depends if it's a clickEvent or not
			else if (!clickEvent) {
				$(this).css('background-color', $(this).attr('data-lastcolor'));
			}
			else {
				$(this).css('background-color', clicked[champion] ? clicked[champion] : '');
			}
			
			// write to attr if we are erasing
			if (clickEvent) {
				writeBGColor(this);
			}
		});
	}

	// change colors of cells depending on hover / click
	$championList.each(function() {
		// case hover
		$(this).hover(function() {
			if (currentColor) {
				var champion = this.getAttribute('data-champion');
				highlight(champion);
			}
		}, function () {
			unhighlight(this.getAttribute('data-champion'));
		});
		
		// case click
		$(this).click(function() {
			undo = {};
			if (justCleared) {
				justCleared = false;
				$cellList.each(function () {
					$(this).attr('data-lastcolor', '');
				});
			}
			var champion = this.getAttribute('data-champion');
			clicked[champion] = (champion in clicked && clicked[champion] == currentColor) ? false : currentColor;
			// console.log(clicked); // DEBUG
			if (clicked[champion] && currentColor) {
				highlight(champion, true);
			}
			else {
				unhighlight(champion, true);
			}
			$removeall.css('display','');
			$undo.css('display','none');
		});
	});
});