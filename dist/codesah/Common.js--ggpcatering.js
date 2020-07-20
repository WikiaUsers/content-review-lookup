//<nowiki>
$(function() {
	var flavours = ['bitter', 'fruity', 'savoury', 'sour', 'spicy', 'sweet'];
	var max_ingredients = 4;
	var different_flavours = 3;
	var flavour_values = [4, 2, 1];
	var ingredients = {
		'raisins':       ['fruity', 'spicy', 'sweet'],
		'tupelo honey':  ['sweet', 'fruity', 'spicy'],
		'bitter melon':  ['bitter', 'fruity', 'sweet'],
		'plum':          ['fruity', 'sweet', 'spicy'],
		'cinnamon':      ['spicy', 'sweet', 'bitter'],
		'ginger':        ['spicy', 'savoury', 'fruity'],
		'paprika':       ['savoury', 'spicy', 'fruity'],
		'filo pastry':   ['savoury', 'sweet', 'fruity'],
		'sour cream':    ['sour', 'savoury', 'sweet'],
		'yoghurt':       ['sour', 'bitter', 'fruity'],
		'rhubarb':       ['sour', 'fruity', 'sweet'],
		'burned toffee': ['sweet', 'sour', 'spicy'],
		'mint':          ['sweet', 'bitter', 'savoury'],
		'nutmeg':        ['spicy', 'sour', 'savoury'],
		'dandelion':     ['bitter', 'spicy', 'sour'],
		'coffee beans':  ['bitter', 'savoury', 'sweet'],
		'raspberries':   ['fruity', 'sour', 'bitter'],
		'pepper':        ['savoury', 'bitter', 'sour']
	};
	var images = {};
	
	var container = $('#ggpcatering');
	
	if(container.length === 0) {
		return;
	}
	
	$('<button type="button">Clear</button>').appendTo(container).click(function() {
		inputs.find('input').each(function() {
			this.checked = false;
		});
		inputs.change();
	});
	
	container.append('<br>');
	
	var inputs = $('<div>');
	$.each(flavours, function(index, flavour) {
		var checkbox = $('<input type="checkbox">').data('flavour', flavour).css('margin', '10px');
		var span = $('<span>').text(capitalize(flavour)).prepend(checkbox);
		inputs.append(span);
	});
	container.append(inputs);
	
	result = $('<div>').appendTo(container);
	
	preloadImages();
	
	inputs.change(function() {
		var selected = inputs.find('input:checked');
		var left_to_choose = different_flavours - selected.length;
		
		var not_selected = inputs.find('input:not(:checked)');
		
		if(left_to_choose === 0) {
			not_selected.attr('disabled', true);
			
			var selected_flavours = [];
			selected.each(function() {
				selected_flavours.push($(this).data('flavour'));
			});
			
			var best = best_ingredients(selected_flavours);
			
			result.html('');
			
			var table_head = $('<thead><tr><th></th><th>Ingredient</th><th>Value</th></tr></thead>');
			var table_foot = $('<tfoot>');
			var table_body = $('<tbody>');
			var table = $('<table class="wikitable">').append(table_head).append(table_foot).append(table_body);
			
			var total_value = 0;
			
			$.each(best, function(index, object) {
				var ingredient = object.ingredient;
				var value = object.value;
				
				var row = $('<tr>');
				var image = $('<img>').attr('src', images[ingredient]);
				if(!images[ingredient]) {
					image.addClass('imageNotLoaded-' + ingredient.replace(/\s/g, ''));
				}
				row.append($('<td>').append(image));
				
				var ingredient_field = $('<td>').text(capitalize(ingredient));
				row.append(ingredient_field)
				
				var value_field = $('<td>').append(value);
				total_value += value;
				
				row.append(value_field);
				table_body.append(row);
			});
			
			table_foot.append('<tr><th></th><th>Total</th><th>' + total_value + '</th></tr>');
			
			result.append(table);
		} else {
			not_selected.attr('disabled', false);
			result.text('Please select ' + left_to_choose + ' more flavour' + (left_to_choose > 1? 's': '') + '.');
		}
	});
	
	function best_ingredients(selected_flavours) {
		var values = [];
		
		$.each(ingredients, function(ingredient, flavours) {
			var value = 0;
			
			$.each(flavours, function(index, flavour) {
				if($.inArray(flavour, selected_flavours) > -1) {
					value += flavour_values[index];
				}
			});
			
			values.push({
				ingredient: ingredient,
				value: value
			});
		});
		
		values.sort(function(a, b) {
			return b.value - a.value;
		});
		
		var best = [];
		for(var i = 0; i < max_ingredients; i++) {
			best.push(values[i]);
		}
		return best;
	}
	
	function preloadImages() {
		$.each(ingredients, function(ingredient, values) {
			getFile(ingredient + '.png', function(filename) {
				images[ingredient] = filename;
				(new Image()).src = filename;
				$('.imageNotLoaded-' + ingredient.replace(/\s/g, '')).attr('src', filename).removeClass('imageNotLoaded-' + ingredient.replace(/\s/g, ''));
			});
		});
	}
	
	function getFile(path, callback) {
		wikia('[[File:' + path + ']]', function(response) {
			callback($(response.parse.text['*']).find('img').attr('src'));
		});
	}
	
	function wikia(code, callback) {
		$.ajax({
			data: {
				action: 'parse',
				text: code,
				prop: 'text',
				format: 'json'
			},
			dataType: 'json',
			type: 'POST',
			url: wgScriptPath + '/api.php',
			success: callback,
		});
	}
	
	function capitalize(string) {
		return string.toLowerCase().replace(/^./, function(match) {
			return match.toUpperCase();
		});
	}
});
//</nowiki>