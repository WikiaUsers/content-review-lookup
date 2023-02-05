/* Скрипт интерактивных статей о размерах */
/* Скопирован с http://banishedinfo.com/t/Size_calculator */

function c(v, m)
{
  v -= .5;
  var s = v < 0 ? -1: 1;
  v = Math.abs(Math.pow(v, m));
  return v * Math.pow(2, m - 1) * s + 0.5;
}

function makeColour(value, m)
{
  if (value < 0) value = 0;
  if (value > 1) value = 1;
  return 'hsla(' + (120 * c(value, m || 3)) + ', 50%, 45%, 1)';
}

function pd(val, tar) { return Math.abs((tar - val) / tar); }

$('#info-tabs .grid').each(function () {
	
	var clicked = false,
	    target = $(this),
	    infobox = target.siblings('.grid-info'),
	    helpbox = target.siblings('.grid-helper'),
	    type = target.data('type'),
	    min = target.data('min'),
	    data_targets = {};
	
	infobox.find('[data-value]').each(function () {
		var t = $(this).text('-');
		data_targets[t.data('value')] = t;
	});
	
	helpbox.on('click', '[data-action]', function (e) {
		e.preventDefault();
		target.find('.highlighted').removeClass('highlighted');
		
		switch (type + '-' + $(this).data('action'))
		{
		  case 'crops-max-fpw':
		    var boxes = target.find('.box.valid'), max = 0;
		    boxes.each(function () { if ($(this).data('fpw') >= 840) $(this).addClass('highlighted'); });
		    break;
			
			case 'orchard-max-tps':
				target.find('.row3 .col4').addClass('highlighted');
				break;
				
			case 'orchard-max-fpw':
				target.find('.row3 .col14,.row9 .col6').addClass('highlighted');
				break;
			
			case 'cemetery-max-gps':
				target.find('.row18 .col19,.row16 .col19,.row14 .col19').addClass('highlighted');
				break;
				
			case 'cows-max-aps':
			case 'sheep-max-aps':
			case 'chickens-max-aps':
				var boxes = target.find('.box.valid'), max = 0;
				boxes.each(function () { var aps = $(this).data('aps'); if (aps > max) max = aps; });
				boxes.each(function () { if (pd($(this).data('aps'), max) == 0) $(this).addClass('highlighted'); });
				break;
				
			case 'cows-max-apw':
			case 'sheep-max-apw':
			case 'chickens-max-apw':
				var boxes = target.find('.box.valid'), max = 0;
				boxes.each(function () { var apw = $(this).data('apw'); if (apw > max) max = apw; });
				boxes.each(function () { if (pd($(this).data('apw'), max) < 0.08) $(this).addClass('highlighted'); });
				break;
		}
	});
	
	if (type == 'crops')
	{
		target.find('.box').each(function (i) {
			var t = $(this), row = t.parent().data('row') + 1, col = t.data('col') + 1, size = col * row;
			var workers = size < 125 ? 1 : 2;
			var fpw = Math.floor(size * 7 / workers);
			if (row >= min && col >= min)
				t.css('background-color', makeColour((fpw - 112) / (790 - 112), 1)).addClass('valid');
				
			t.data({ size: size, workers: workers, fpw: fpw });
		});
	}
	
	if (type == 'orchard')
	{
		var min_fps, max_fps;
		
		target.find('.box').each(function (i) {
			var t = $(this), row = t.parent().data('row') + 1, col = t.data('col') + 1, size = col * row;
			
			var workers = Math.min(Math.ceil((size + 1) / 5 / 15), 3);
			var trees = Math.ceil(col / 2) * Math.ceil(row / 3);
			var fps = trees * 32.5 / size;
			
			if (row >= min && col >= min)
				t.css('background-color', makeColour((fps - 5.42) / (8.4 - 5.42), 3)).addClass('valid');
			
			if (row >= min && col >= min)
			{
				if (max_fps == undefined || fps > max_fps) max_fps = fps;
				if (min_fps == undefined || fps < min_fps) min_fps = fps;
			}
		});
		
		target.data('max_fps', max_fps);
		target.data('min_fps', min_fps);
	}
	
	if (type == 'cemetery')
	{
		var min_gps, max_gps;
		
		target.find('.box').each(function (i) {
			var t = $(this), row = t.parent().data('row') + 1, col = t.data('col') + 1, size = col * row;
			var graves = Math.floor((row - 2 + 1) / 2) * (col - 2) - (2 * Math.floor((row - 2 + 1) / 2));
			var gps = graves / size;
			
			if (row >= min && col >= min)
				t.css('background-color', makeColour((gps - 0.17) / (0.38 - 0.17), 2)).addClass('valid');
			
			if (row >= min && col >= min)
			{
				if (max_gps == undefined || gps > max_gps) max_gps = gps;
				if (min_gps == undefined || gps < min_gps) min_gps = gps;
			}
		});
		
		target.data('max_gps', max_gps);
		target.data('min_gps', min_gps);
	}
	
	if (type == 'cows' || type == 'sheep' || type == 'chickens')
	{
		var min_aps, max_aps;
		
		target.find('.box').each(function (i) {
			var t = $(this), row = t.parent().data('row') + 1, col = t.data('col') + 1, size = col * row;
			
			var spa = { cows: 20, sheep: 16, chickens: 6 }[type];
			var animals = Math.floor(size / spa);
			var workers = 1;
			var apw = animals / workers;
			var aps = animals / size;
			
			if (type == 'cows')
				if (row >= min && col >= min)
					t.css('background-color', makeColour((aps - 0.04) / (0.05 - 0.04), 6)).addClass('valid');
				
			if (type == 'sheep')
				if (row >= min && col >= min)
					t.css('background-color', makeColour((aps - 0.051) / (0.0625 - 0.051), 5)).addClass('valid');
				
			if (type == 'chickens')
				if (row >= min && col >= min)
					t.css('background-color', makeColour((aps - 0.158) / (0.1667 - 0.158), 5)).addClass('valid');
			
			t.data({ size: size, animals: animals, workers: workers, aps: aps, apw: apw });
			
			if (row >= min && col >= min)
			{
				if (max_aps == undefined || aps > max_aps) max_aps = aps;
				if (min_aps == undefined || aps < min_aps) min_aps = aps;
			}
		});
		
		target.data('max_aps', max_aps);
		target.data('min_aps', min_aps);
	}
	
	target.on('mouseover', '.box', function () {
		var t = $(this), col = t.data('col') + 1, row = t.parent().data('row') + 1;
		
		if (clicked)
			return;
		
		if (col < min) col = min;
		if (row < min) row = min;
		t = target.find('.row' + (row - 1) + ' .col' + (col - 1));
		
		target.addClass('active');
		target.find('.box.active').removeClass('active');
		
		t.prevAll().addClass('active');
		t.parent().prevAll().find(':lt(' + col + ')').addClass('active');
		t.addClass('active');
		
		// Icons
		
		if (type == 'orchard')
		{
			target.find('.box.tree').removeClass('tree');
			target.children('.row').each(function (i) {
				if (i + 1 > row || (row - i + 2) % 3) return;
				$(this).children('.box').each(function (i) {
					if (i + 1 > col || i & 1) return;
					$(this).addClass('tree');
				});
			});
		}
		
		if (type == 'cemetery')
		{
			target.find('.box.grave').removeClass('grave');
			target.children('.row').each(function (i) {
				if (i + 1 > row || (row - i) & 1 || i == 0 || i + 1 == row) return;
				$(this).children('.box').each(function (i) {
					if (i + 1 > col || i == 0 || i + 1 == col || i + 1 == (col + 1 &~ 1) / 2 || i + 1 == ((col + 1 &~ 1) - 2) / 2) return;
					$(this).addClass('grave');
				});
			});
		}
		
		// Data
		var size = col * row;
		
		switch (type)
		{
			case 'crops':
				var workers = size < 125 ? 1 : 2; // Math.min(Math.ceil(size / 8 / 7), 4);
				
				data_targets.size.text(col + ' x ' + row);
				data_targets.squares.text(size);
				data_targets.workers.text(workers);
				data_targets.food.text(size * 7);
				data_targets.fpw.text(Math.floor(size * 7 / workers));
				break;
				
			case 'orchard':
				var workers = Math.min(Math.ceil((size + 1) / 5 / 15), 3);
				var trees = Math.ceil(col / 2) * Math.ceil(row / 3);
				var fps = trees * 32.5 / size;
				
				var td = target.data();
				var rd = (fps - td.min_fps) / (td.max_fps - td.min_fps) * 100;
				
				data_targets.size.text(col + ' x ' + row);
				data_targets.squares.text(size);
				data_targets.workers.text(workers);
				data_targets.trees.text(trees);
				data_targets.density.text((trees / size).toFixed(2));
				data_targets.food.text(trees * 32.5);
				data_targets.fpw.text(Math.floor(trees * 32.5 / workers));
				data_targets.fps.text(fps.toFixed(1));
				data_targets.rd.text(rd.toFixed() + '%');
				break;
				
			case 'cemetery':
				var graves = Math.floor((row - 2 + 1) / 2) * (col - 2) - (2 * Math.floor((row - 2 + 1) / 2));
				var gps = graves / size;
				
				var td = target.data();
				var rd = (gps - td.min_gps) / (td.max_gps - td.min_gps) * 100;
				
				data_targets.size.text(col + ' x ' + row);
				data_targets.stone.text((col + row) * 2 - 4);
				data_targets.squares.text(size);
				data_targets.graves.text(graves);
				data_targets.gps.text(gps.toFixed(3));
				data_targets.rd.text(rd.toFixed() + '%');
				break;
				
			case 'cows':
			case 'sheep':
			case 'chickens':
				var aps = { cows: 20, sheep: 16, chickens: 6 }[type];
				var animals = Math.floor(size / aps);
				var workers = size < 200 ? 1 : 2;
				var aps = animals / size;
				
				var td = target.data();
				var rd = (aps - td.min_aps) / (td.max_aps - td.min_aps) * 100;
				
				data_targets.size 	&& data_targets.size.text(col + ' x ' + row);
				data_targets.squares 	&& data_targets.squares.text(size);
				data_targets.animals 	&& data_targets.animals.text(animals);
				data_targets.workers 	&& data_targets.workers.text(workers);
				data_targets.aps 	&& data_targets.aps.text(aps.toFixed(3));
				data_targets.apw 	&& data_targets.apw.text(animals / workers);
				data_targets.rd 	&& data_targets.rd.text(rd.toFixed() + '%');
				
				if (animals < 10)
					infobox.children('.info').show().html('Примечание: нужно минимум 10 животных чтобы разделить пастбище.');
				else
					infobox.children('.info').hide();
				
				break;
		}
	});
	
	target.on('click', '.box', function () {
		var t = $(this), col = t.data('col'), row = t.parent().data('row');
		
		if (t.hasClass('selected'))
		{
			t.removeClass('selected');
			clicked = false;
			location.replace('#x');
			return;
		}
		
		target.find('.box.selected').removeClass('selected');
		t.addClass('selected');
		
		clicked = false;
		t.trigger('mouseover');
		clicked = true;
		
		location.replace('#' + (col+1) + 'x' + (row+1));
	});
	
	target.on('mouseout', function (e) {
		if (clicked)
			return;
		
		if (!$(e.target).hasClass('grid'))
			return;
		
		target.removeClass('active');
		target.find('.box.active').removeClass('active');
	});
	
});

~function (hash) {
	if (hash != '' && hash != 'x')
	{
		hash = hash.substr(1).split('x');
		if (hash.length == 2)
			$('.tabs.active .row' + (hash[1]-1) + ' .col' + (hash[0]-1)).trigger('click');
	}
}(location.hash);