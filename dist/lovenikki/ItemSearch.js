(function() {
	'use strict';
	
	if (mw.config.get('wgPageName') !== 'Item_Search') {
		return;
	}
	
	mw.util.addCSS(`
		.type-filter-button.active img {
			filter: brightness(90%);
		}
	`);
	
	$(function() {
		let allItems = [];
		let itemTypes = new Set();
		
		const typeGroups = {
			'Hair': ['Hair'],
			'Dress': ['Dress'],
			'Coat': ['Coat'],
			'Top': ['Top'],
			'Bottom': ['Bottom'],
			'Hosiery': ['Hosiery', 'Hosiery, Leglet'],
			'Shoes': ['Shoes'],
			'Accessory': ['Accessory, Hair Ornament', 'Accessory, Necklace', 'Accessory, Handheld (Right)', 'Accessory, Gloves', 'Accessory, Earrings', 'Accessory, Foreground', 'Accessory, Handheld (Left)', 'Accessory, Background', 'Accessory, Bracelet (Right)', 'Accessory, Brooch', 'Accessory, Face', 'Accessory, Scarf', 'Accessory, Ground', 'Accessory, Hairpin', 'Accessory, Waist', 'Accessory, Head Ornament', 'Accessory, Veil', 'Accessory, Tail', 'Accessory, Tattoo', 'Accessory, Wings', 'Accessory, Bracelet (Left)', 'Accessory, Handheld (Both)', 'Accessory, Skin', 'Accessory, Ears'],
			'Makeup': ['Makeup'],
			'Spirit': ['Spirit'],
		};
		const typeIcons = {
			'Hair': 'Icon Hair.png',
			'Dress': 'Icon Dress.png',
			'Coat': 'Icon Coat.png',
			'Top': 'Icon Tops.png',
			'Bottom': 'Icon Bottoms.png',
			'Hosiery': 'Icon Hosiery.png',
			'Shoes': 'Icon Shoes.png',
			'Accessory': 'Icon Accessory.png',
			'Makeup': 'Icon Makeup.png',
			'Spirit': 'Icon Spirit.png'
		};
		const typeOrder = ['Hair', 'Dress', 'Coat', 'Top', 'Bottom', 'Hosiery', 'Shoes', 'Accessory', 'Makeup', 'Spirit'];
		
		const colorOrder = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink', 'Brown', 'Tan', 'White', 'Grey', 'Black', 'Silver', 'Gold', 'Clear', 'Rainbow'];
		
		function createSearchInterface() {
			const container = $('<div>').attr('id', 'item-search-container');
			
			const searchBar = $('<div>');
			
			const searchInput = $('<input>')
				.attr({
					'type': 'text',
					'id': 'item-search-input',
					'placeholder': 'Search descriptions...'
				})
				.css({
					'width': '300px',
					'padding': '5px 10px',
					'border': '1px solid var(--theme-border-color)'
				});
			
			const typeButtons = $('<div>')
				.attr('id', 'type-filter-buttons')
				.css({
					'margin': '1em 0',
					'padding': '0.5em',
					'border': '1px solid var(--theme-border-color)',
					'display': 'flex',
					'flex-wrap': 'wrap',
					'justify-content': 'center'
				})
				.append($('<button>')
					.attr('id', 'type-all')
					.text('All')
					.css({'margin': '4px 0.5em', 'padding': '0', 'background': 'white', 'border': '1px solid #e2e4d2', 'box-shadow': '0px 0px 2px 2px rgba(226,228,210,0.5)', 'width': '60px', 'height': '30px', 'border-radius': '20px'})
					.addClass('type-filter-button active')
				);
				
			const br = $('<br />');
			
			const colorButtons = $('<div>')
				.attr('id', 'color-filter-buttons')
				.css({
					'margin': '1em 0',
					'padding': '0.5em',
					'border': '1px solid var(--theme-border-color)',
					'display': 'flex',
					'flex-wrap': 'wrap',
					'justify-content': 'center'
				})
				.append($('<button>')
					.attr('id', 'color-all')
					.text('All')
					.addClass('color-filter-button active')
				);
				
			const wholeWordCheckbox = $('<label>')
				.css('margin-left', '0.5em')
				.append($('<input>').attr({'type': 'checkbox', 'id': 'whole-word-check'}))
				.append(' Match whole words only');
			
			const regexCheckbox = $('<label>')
				.css('margin-left', '1em')
				.append($('<input>').attr({'type': 'checkbox', 'id': 'regex-check'}))
				.append(' Use regular expressions');
			
			searchBar.append(searchInput).append(wholeWordCheckbox).append(regexCheckbox).append(typeButtons).append(colorButtons);
			
			const resultCount = $('<div>')
				.attr('id', 'item-result-count')
				.css({
					'margin': '1em 0',
					'color': '#666'
				});
			
			const table = $('<table>')
				.addClass('article-table sortable table-full')
				.attr('id', 'item-results-table')
				.append(
					$('<thead>').append(
						$('<tr>')
							.append($('<th>').text('Image'))
							.append($('<th>').text('Name'))
							.append($('<th>').text('Type'))
							.append($('<th>').text('Appearance'))
					)
				)
				.append(
					$('<tbody>').attr('id', 'item-results-body')
						.append($('<tr>').append($('<td>').attr('colspan', '4').text('Loading...')))
				);
			
			container.append(searchBar).append(resultCount).append(table);
			
			const contentDiv = $('#mw-content-text');
			if (contentDiv.find('h2').length > 0) {
				contentDiv.find('h2').first().after(container);
			} else {
				contentDiv.prepend(container);
			}
		}
		
		function loadData() {
			const api = new mw.Api();
			api.get({
				action: 'query',
				titles: 'Template:Item Search/Data.json|Template:Item Search/Data2.json|Template:Item Search/Data3.json|Template:Item Search/Data4.json',
				prop: 'revisions',
				rvprop: 'content',
				rvslots: 'main',
				formatversion: 2
			}).done(function(data) {
				try {
					allItems = [];
					data.query.pages.forEach(function(page) {
						if (page.missing) {
							console.warn('JSON page not found: ' + page.title);
							return;
						}
						const content = page.revisions[0].slots.main.content;
						const jsonData = JSON.parse(content);
						allItems = allItems.concat(jsonData.items || []);
					});
					
					typeOrder.forEach(function(type) {
						const iconFilename = typeIcons[type];
						const iconUrl = mw.util.getUrl('Special:Redirect/file/' + iconFilename.replace(/^File:/i, '').replace(/ /g, '_'));
						$('#type-filter-buttons').append(
							$('<button>')
								.attr('data-type', type)
								.attr('title', type)
								.html('<img src="' + iconUrl + '" alt="' + type + '" style="max-height: 40px; object-fit: contain;">')
								.css({'margin': '0', 'padding': '0', 'background': 'none', 'border': 'none',})
								.addClass('type-filter-button')
						);
					});
					
					const primaryColors = new Set();
					allItems.forEach(function(item) {
						if (item.color1) {
							const colors = item.color1.split('/');
							colors.forEach(function(color) {
								primaryColors.add(color.trim());
							});
						}
					});
					
					const sortedColors = colorOrder.filter(function(color) {
						return primaryColors.has(color);
					});
					sortedColors.forEach(function(color) {
						const colorClass = 'custom-background-color-' + color.toLowerCase().replace(/\s+/g, '-');
						$('#color-filter-buttons').append(
							$('<button>')
								.attr('data-color', color)
								.text(color)
								.addClass('color-filter-button ' + colorClass)
						);
					});
					
					renderResults(allItems);
					
				} catch (error) {
					$('#item-results-body').html('<tr><td colspan="4">Error parsing JSON: ' + error.message + '</td></tr>');
					console.error('Error loading data:', error);
				}
			}).fail(function(error) {
				$('#item-results-body').html('<tr><td colspan="4">Error loading data</td></tr>');
				console.error('API error:', error);
			});
		}
		
		function debounce(func, wait) {
			let timeout;
			return function() {
				const context = this;
				const args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					func.apply(context, args);
				}, wait);
			};
		}
		
		function searchItems() {
			const searchTerm = $('#item-search-input').val().toLowerCase();
			const selectedTypes = $('.type-filter-button.active').not('#type-all').map(function() {
				return $(this).attr('data-type');
			}).get();
			const selectedColors = $('.color-filter-button.active').not('#color-all').map(function() {
				return $(this).attr('data-color');
			}).get();
			const wholeWord = $('#whole-word-check').is(':checked');
			const useRegex = $('#regex-check').is(':checked');
			
			let filtered = allItems;
			
			if (selectedTypes.length > 0) {
				filtered = filtered.filter(function(item) {
					return selectedTypes.some(function(selectedType) {
						const allowedTypes = typeGroups[selectedType] || [selectedType];
						return allowedTypes.indexOf(item.type) !== -1;
					});
				});
			}
			
			if (selectedColors.length > 0) {
				filtered = filtered.filter(function(item) {
					if (!item.color1) return false;
					const colors = item.color1.split('/').map(function(c) { return c.trim(); });
					return selectedColors.every(function(selectedColor) {
						return colors.indexOf(selectedColor) !== -1;
					});
				});
			}
			
			if (searchTerm) {
				filtered = filtered.filter(function(item) {
					const desc = (item.appearance || '').toLowerCase();
					
					if (useRegex) {
						try {
							const regex = new RegExp(searchTerm, 'i');
							return regex.test(desc);
						} catch (e) {
							return false;
						}
					} else if (wholeWord) {
						const regex = new RegExp('\\b' + searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
						return regex.test(desc);
					} else {
						return desc.indexOf(searchTerm) !== -1 || name.indexOf(searchTerm) !== -1;
					}
				});
			}
			
			renderResults(filtered, searchTerm);
		}
		
		function highlightText(text, searchTerm) {
			if (!searchTerm || !text) return mw.html.escape(text);
			
			text = mw.html.escape(text);
			searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			
			const regex = new RegExp('(' + searchTerm + ')', 'gi');
			return text.replace(regex, '<span style="background-color: rgba(var(--theme-accent-color--rgb),0.5)">$1</span>');
		}
		
		function renderResults(items, searchTerm) {
			searchTerm = searchTerm || '';
			const tbody = $('#item-results-body');
			const countDiv = $('#item-result-count');
			
			countDiv.text('Found ' + items.length + ' item' + (items.length !== 1 ? 's' : ''));
			
			if (items.length === 0) {
				tbody.html('<tr><td colspan="4">No items found</td></tr>');
				return;
			}
			
			tbody.empty();
			
			items.forEach(function(item) {
				const name = item.name;
				let desc = '';
				if (item.color1 || item.color2) {
					desc += '<b>Main Colors:</b> ';
					if (item.color1) desc += item.color1;
					if (item.color2) desc += ' | <b>Secondary Colors:</b> ' + item.color2 ;
					desc += '<br>';
				}
				desc += highlightText(item.appearance || '', searchTerm);
				const type = mw.html.escape(item.type || '-');
				const img = item.image ? mw.util.getUrl('Special:Redirect/file/' + item.image.replace(/^File:/i, '').replace(/ /g, '_')) : '';
				
				const row = $('<tr>');
				
				if (img) {
					row.append($('<td>').append(
						$('<img>')
							.attr('src', img)
							.css({
								'width': '100px',
								'height': '100px',
								'object-fit': 'contain'
							})
					));
				} else {
					row.append($('<td>').text('-'));
				}
				
				row.append($('<td>').html('<a href="' + mw.util.getUrl(item.name) + '">' + name + '</a>'));
				row.append($('<td>').html(type));
				row.append($('<td class="smalltext unsortable">').html(desc));
				
				tbody.append(row);
			});
		}
		
		createSearchInterface();
		loadData();
		
		$(document).on('input', '#item-search-input', debounce(searchItems, 300));
		$(document).on('click', '.type-filter-button', function() {
			if ($(this).attr('id') === 'type-all') {
				$('.type-filter-button').removeClass('active');
				$(this).addClass('active');
			} else {
				$('#type-all').removeClass('active');
				$(this).toggleClass('active');
				
				// If no types selected, activate "All"
				if ($('.type-filter-button.active').length === 0) {
					$('#type-all').addClass('active');
				}
			}
			searchItems();
		});
		$(document).on('change', '#whole-word-check, #regex-check', searchItems);
		$(document).on('click', '.color-filter-button', function() {
			if ($(this).attr('id') === 'color-all') {
				$('.color-filter-button').removeClass('active');
				$(this).addClass('active');
			} else {
				$('#color-all').removeClass('active');
				$(this).toggleClass('active');
				
				// If no colors selected, activate "All"
				if ($('.color-filter-button.active').length === 0) {
					$('#color-all').addClass('active');
				}
			}
			searchItems();
		});
	});
})();