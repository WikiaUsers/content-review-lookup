/* [[Sengoku Asuka ZERO Wiki:Collection tracker]] */
(function($, mw) {
	'use strict';

	var warriors, sortedWarriors, warriorBlobUrl, filters, compare, canStore, $content;

	function buildWarriorListAndRarityFilter() {
		var warriorList = $('<ul id="sazwtrackerwarriors"></ul>');
		var dataBlock = $content.find('#sazwtrackerwarriordata');
		filters.rarity = {
			'Any': {
				position: 0,
				value: '',
				title: null
			}
		};

		dataBlock.find('div').each(function() {
			var warrior = $(this).data();
			warrior.tags = warrior.tags.split(';');
			warrior.realmOfSouls = (warrior.tags.indexOf('Realm of Souls') !== -1);
			warrior.ascendable = (warrior.tags.indexOf('Ascendable') !== -1);
			filters.rarity[''.padStart(warrior.rarity, '☆')] = {
				position: warrior.rarity,
				value: warrior.rarity.toString(),
				title: null
			};
			warriors[warrior.page] = warrior;
			sortedWarriors.push(warrior);

			var checkbox = $('<input type="checkbox">');
			checkbox.attr('id', 'sazwtrackerwarrior' + warrior.id + 'check');
			checkbox.on('click', function(event) {
				if ($(this).next().data('timer') === null) {
					event.preventDefault();
					event.stopPropagation();
					window.open($(this).next().data('href'), '_blank');
					$(this).next().removeClass('openingpage');
				} else {
					clearTimeout($(this).next().data('timer'));
					$(this).next().data('timer', null);
				}
			});
			checkbox.on('change', function() {
				$content.find('#sazwtrackerlocalsave').prop('disabled', false);
				saveLocal('Auto');
				updateBlob();
				applyFilters();
				applySort();
			});

			var label = $('<label/>');
			label.attr('for', 'sazwtrackerwarrior' + warrior.id + 'check');
			label.attr('title', warrior.page);
			label.data('href', warrior.url);
			label.data('timer', null);
			label.on('mousedown', function(event) {
				if (event.which === 1) {
					$(this).data('timer', setTimeout( function() {
						$(this).data('timer', null);
						$(this).addClass('openingpage');
					}.bind(this), 1000));
				}
			});
			label.on('mouseleave', function() {
				if ($(this).data('timer') !== null) {
					clearTimeout($(this).data('timer'));
					$(this).data('timer', null);
					$(this).removeClass('openingpage');
				}
			});
			label.on('mouseup', function(event) {
				if (event.which === 2) {
					window.open($(this).data('href'), '_blank');
					event.preventDefault();
				}
			});
			label.html($(this).html());

			var element = $('<li/>');
			element.addClass('sazwtrackerwarrior');
			element.attr('id', 'sazwtrackerwarrior' + warrior.id);
			element.addClass('sazwtrackerrarity' + warrior.rarity);
			element.addClass('sazwtrackerelement' + warrior.element.toLowerCase());
			element.addClass('sazwtrackerweapon' + warrior.weapon.toLowerCase());
			element.append(checkbox).append(label);
			warriorList.append(element);
		}).remove();

		$content.find('#sazwtracker').prepend(warriorList);
	}

	function readFilterValues(id) {
		var filter = {
			'Any': {
				position: 0,
				value: '',
				title: null
			}
		};
		var dataBlock = $content.find(id);

		dataBlock.find('div').each(function() {
			filter[$(this).data('name')] = {
				position: $(this).data('position'),
				value: $(this).data('name'),
				title: null
			};
		});

		dataBlock.remove();
		return filter;
	}

	function booleanFilterValues(anyTitle, trueTitle, falseTitle) {
		return {
			'Any': {
				position: 0,
				value: '',
				title: anyTitle
			},
			'✓': {
				position: 1,
				value: 'true',
				title: trueTitle
			},
			'⊘': {
				position: 2,
				value: 'false',
				title: falseTitle
			}
		};
	}

	function createSortControls(group, ascending) {
		var list = $('<ul/>').addClass('sazwtrackersortbuttons');

		var upButton = $('<button>↑</button>');
		upButton.attr('title', "Move up in sort order");
		upButton.attr('id', 'sazwtrackerupbutton' + group.toLowerCase());
		upButton.addClass('sazwtrackerupbutton');
		upButton.on('click', function() {
			var id = $(this).attr('id').replace('sazwtrackerupbutton', 'sazwtrackerfilters');
			var thisGroup = $content.find('#' + id);
			var prevGroup = thisGroup.prev();
			if (prevGroup.length > 0) {
				thisGroup.insertBefore(prevGroup);
			}
			applySort();
			saveControlState();
		});
		list.append($('<li/>').append(upButton));

		var flipButton = $('<button/>')
			.append($('<span class="sazwtrackerflipasc">▲</span>').toggle(ascending))
			.append($('<span class="sazwtrackerflipdesc">▼</span>').toggle(!ascending))
			.data('asc', ascending);
		flipButton.attr('title', "Flip this sort order");
		flipButton.attr('id', 'sazwtrackerflipbutton' + group.toLowerCase());
		flipButton.addClass('sazwtrackerflipbutton');
		flipButton.on('click', function() {
			var ascending = !($(this).data('asc'));
			$(this).data('asc', ascending);
			$(this).find('.sazwtrackerflipasc').toggle(ascending);
			$(this).find('.sazwtrackerflipdesc').toggle(!ascending);
			applySort();
			saveControlState();
		});
		list.append($('<li/>').append(flipButton));

		var downButton = $('<button>↓</button>');
		downButton.attr('title', "Move down in sort order");
		downButton.attr('id', 'sazwtrackerdownbutton' + group.toLowerCase());
		downButton.addClass('sazwtrackerdownbutton');
		downButton.on('click', function() {
			var id = $(this).attr('id').replace('sazwtrackerdownbutton', 'sazwtrackerfilters');
			var thisGroup = $content.find('#' + id);
			var nextGroup = thisGroup.next();
			if (nextGroup.length > 0) {
				thisGroup.insertAfter(nextGroup);
			}
			applySort();
			saveControlState();
		});
		list.append($('<li/>').append(downButton));

		return list;
	}

	function createFilter(group, name, filter) {
		var label = $('<label/>');
		label.attr('for', 'sazwtrackerfilter' + group.toLowerCase() + name.toLowerCase());
		label.text(name);
		if (filter.title !== null) {
			label.attr('title', filter.title);
		} else {
			if (filter.value === '') {
				label.attr('title', 'Show warriors of any ' + group);
			} else {
				label.attr('title', 'Show only ' + name + ' warriors');
			}
		}

		var radiobutton = $('<input type="radio">');
		radiobutton.attr('id', 'sazwtrackerfilter' + group.toLowerCase() + name.toLowerCase());
		radiobutton.attr('name', group.toLowerCase());
		radiobutton.attr('value', filter.value.toLowerCase());
		radiobutton.prop('checked', filter.value === '');
		radiobutton.on('change', function() {
			applyFilters();
			saveControlState();
		});

		return $('<li/>').append(radiobutton).append(label).data('position', filter.position);
	}

	function createFilterGroup(label, group, values, ascending) {
		var container = $('<div/>')
			.append(createSortControls(group, ascending))
			.append($('<div class="sazwtrackerprop">').text(label))
			.addClass('sazwtrackerfiltergroup')
			.attr('id', 'sazwtrackerfilters' + group.toLowerCase());

		if (values !== null) {
			var list = $('<ul/>').addClass('sazwtrackerfilters');

			Object.keys(values).forEach(function(key) {
				list.append(
					createFilter(group, key, values[key])
				);
			});

			list.children().sort(function(a, b) {
				return $(a).data('position') - $(b).data('position');
			});
			container.append(list);
		}
		return container;
	}

	function createTopControls() {
		var header = $('<div id="sazwtrackerheader"></div>');
		header.prepend($content.find('#sazwtrackerdoc').show());
		$content.find('#sazwtracker').prepend(header);

		var topControls = $('<div id="sazwtrackertopcontrols"></div>');

		filters.element = readFilterValues('#sazwtrackerelementdata');
		filters.weapon = readFilterValues('#sazwtrackerweapondata');
		filters.realmOfSouls = booleanFilterValues(
			'Show both warriors available and not available in Realm of Souls',
			'Show only warriors available in Realm of Souls',
			'Show only warriors not available in Realm of Souls'
		);
		filters.ascendable = booleanFilterValues(
			'Show both ascendable and non-ascendable warriors',
			'Show only ascendable warriors',
			'Show only non-ascendable warriors'
		);
		filters.recruited = booleanFilterValues(
			'Show both recruited and non-recruited warriors',
			'Show only recruited warriors',
			'Show only non-recruited warriors'
		);

		topControls.append($('<div/>')
			.attr('id', 'sazwtrackerfiltercontrols')
			.append(createFilterGroup('Rarity', 'rarity', filters.rarity, false))
			.append(createFilterGroup('Element', 'element', filters.element, true))
			.append(createFilterGroup('Weapon', 'weapon', filters.weapon, true))
			.append(createFilterGroup('Title', 'title', null, true))
			.append(createFilterGroup('Name', 'name', null, true))
			.append(createFilterGroup('Realm of Souls',
				'realmofsouls',
				filters.realmOfSouls,
				false
			))
			.append(createFilterGroup('Ascendable', 'ascendable', filters.ascendable, false))
			.append(createFilterGroup('Recruited', 'recruited', filters.recruited, false)));

		var countsBlock = $('<div id="sazwtrackercounts"><output id="sazwtrackerrostercount">' +
			'0</output> of <output id="sazwtrackerwarriorcount">' + sortedWarriors.length + '</output>' + 
			' warriors in roster</div>');
		topControls.append(countsBlock);

		var resetButton = $('<button>Reset</button>');
		resetButton.attr('id', 'sazwtrackerreset');
		resetButton.on('click', function() {
			$content.find('.sazwtrackerwarrior input').prop('checked', false);
			$content.find('#sazwtrackerrostercount').text('0');
			$content.find('#sazwtrackerlocalsave').prop('disabled', false);
			saveLocal('Auto');
		});

		var saveButton = $('<button>Save</button>');
		saveButton.attr('id', 'sazwtrackerlocalsave');
		saveButton.prop('disabled', !canStore);
		saveButton.on('click', function() {
			saveLocal('User');
			$content.find('#sazwtrackerlocalload').prop('disabled', false);
			$content.find('#sazwtrackerlocalsave').prop('disabled', true);
		});
		var loadButton = $('<button>Load</button>');
		loadButton.attr('id', 'sazwtrackerlocalload');
		loadButton.prop('disabled', !(canStore &&
			localStorage.getItem('sazwTrackerUserRoster') !== null));
		loadButton.on('click', function() {
			if (loadLocal('User')) {
				saveLocal('Auto');
				$content.find('#sazwtrackerlocalsave').prop('disabled', true);
			} else {
				alert('Unable to load. The manual save may be corrupted.');
			}
		});

		var loadFileButton = $('<button>Load from file</button>');
		loadFileButton.on('click', function() {
			loadFileInput.click();
		});

		var loadFileInput = $('<input/>');
		loadFileInput.attr('id', 'sazwtrackerfileinput');
		loadFileInput.css('display', 'none');
		loadFileInput.attr('type', 'file');
		loadFileInput.attr('accept', '.json,text/json');
		loadFileInput.on('change', function() {
			var reader = new FileReader();
			reader.onload = function() {
				if (!setRoster(reader.result)) {
					alert('Unable to load file. It is corrupted or is not a roster file.');
				}
			};

			reader.readAsText(this.files[0]);
		});
		topControls.append(loadFileInput);

		var saveFileButton = $('<button>Save to file</button>');

		var saveFileLink = $('<a/>');
		saveFileLink.attr('id', 'sazwtrackerfilesave');
		saveFileLink.attr('target', '_blank');
		saveFileLink.attr('download', "SA0 Wiki Collection Tracker Roster.json");
		saveFileLink.append(saveFileButton);
		topControls.append($('<div/>')
			.attr('id', 'sawztrackerdatacontrols')
			.append(resetButton)
			.append(loadButton)
			.append(loadFileButton)
			.append(saveButton)
			.append(saveFileLink));

		header.append(topControls);
	}

	function saveControlState() {
		if (canStore) {
			var states = [];
			$content.find('.sazwtrackerfiltergroup').each(function() {
				var state = {};
				state.prop = $(this).attr('id').replace('sazwtrackerfilters', '');
				state.asc = $(this).find('.sazwtrackerflipbutton').data('asc');
				var filters = $(this).find('.sazwtrackerfilters');
				if (filters.length > 0) {
					state.filter = filters.find(":checked").val();
				}
				states.push(state);
			});
			localStorage.setItem('sazwTrackerControlState', JSON.stringify(states));
		}
	}

	function loadControlState() {
		if (canStore) {
			var states;
			var json = localStorage.getItem('sazwTrackerControlState');
			if (json === null) {
				return;
			}
			try {
				states = JSON.parse(json);
			} catch (e) {
				return;
			}
			if (!Array.isArray(states)) {
				return;
			}
			var groups = $content.find('#sazwtrackerfiltercontrols');
			states.forEach(function(state) {
				if (typeof state.prop === 'string') {
					var group = groups.find('#sazwtrackerfilters' + state.prop);
					group.find('.sazwtrackerflipbutton').data('asc', state.asc !== false);
					group.find('.sazwtrackerflipasc').toggle(state.asc !== false);
					group.find('.sazwtrackerflipdesc').toggle(state.asc === false);
					group.find('.sazwtrackerfilters input[value="' + state.filter + '"]')
						.prop('checked', true);
					groups.append(group);
				}
			});
		}
	}

	function applyFilters() {
		var rarityFilter = $content.find("input[name='rarity']:checked").val();
		var elementFilter = $content.find("input[name='element']:checked").val();
		var weaponFilter = $content.find("input[name='weapon']:checked").val();
		var realmFilter = $content.find("input[name='realmofsouls']:checked").val();
		var ascendFilter = $content.find("input[name='ascendable']:checked").val();
		var recruitedFilter = $content.find("input[name='recruited']:checked").val();
		var recruitCount = 0;

		for (var key in warriors) {
			var warrior = warriors[key];
			var passesRarity = !(rarityFilter !== '' && +rarityFilter !== warrior.rarity);
			var passesElement = !(elementFilter !== '' &&
				elementFilter !== warrior.element.toLowerCase()
			);
			var passesWeapon = !(weaponFilter !== '' && weaponFilter !== warrior.weapon.toLowerCase());
			var passesRealm = !(realmFilter !== '' && realmFilter !== warrior.realmOfSouls.toString());
			var passesAscend = !(ascendFilter !== '' && ascendFilter !== warrior.ascendable.toString());
			var show = (passesRarity && passesElement && passesWeapon && passesRealm && passesAscend);


			var checked = $content.find('#sazwtrackerwarrior' + warrior.id + ' input').is(':checked');
			if (recruitedFilter !== '') {
				show = show && (checked.toString() === recruitedFilter);
			}

			if (checked) {
				++recruitCount;
			}

			$content.find('#sazwtrackerwarrior' + warrior.id).toggle(show);
		}

		$content.find('#sazwtrackerrostercount').text(recruitCount);
	}

	function updateSortControls() {
		$content.find('.sazwtrackerfiltergroup').each(function() {
			var prevGroup = $(this).prev();
			$(this).find('.sazwtrackerupbutton')
				.prop('disabled', prevGroup.length === 0)
				.css('visibility', prevGroup.length === 0 ? 'hidden' : 'visible');
			var nextGroup = $(this).next();
			$(this).find('.sazwtrackerdownbutton')
				.prop('disabled', nextGroup.length === 0)
				.css('visibility', nextGroup.length === 0 ? 'hidden' : 'visible');
		});
	}

	function numericCompare(a, b) {
		return a - b;
	}

	function booleanCompare(a, b) {
		return (a ? 1 : 0) - (b ? 1 : 0);
	}

	function stringCompare(a, b) {
		return a.localeCompare(b);
	}

	function indexCompare(prop, a, b) {
		return (a in filters[prop] ? filters[prop][a].position : -1) -
			(b in filters[prop] ? filters[prop][b].position : -1);
	}

	function initCompareFunctions() {
		compare.rarity = function(a, b) {
			return numericCompare(a.rarity, b.rarity);
		};
		compare.element = function(a, b) {
			return indexCompare('element', a.element, b.element);
		};
		compare.weapon = function(a, b) {
			return indexCompare('weapon', a.weapon, b.weapon);
		};
		compare.realmofsouls = function(a, b) {
			return booleanCompare(a.realmofsouls, b.realmofsouls);
		};
		compare.title = function(a, b) {
			return stringCompare(a.title, b.title);
		};
		compare.name = function(a, b) {
			return stringCompare(a.name, b.name);
		};
		compare.ascendable = function(a, b) {
			return booleanCompare(a.ascendable, b.ascendable);
		};
		compare.recruited = function(a, b) {
			return booleanCompare(
				$content.find('#sazwtrackerwarrior' + a.id + ' input').is(':checked'),
				$content.find('#sazwtrackerwarrior' + b.id + ' input').is(':checked')
			);
		};
	}

	function applySort() {
		updateSortControls();

		var sortParams = [];
		$content.find('.sazwtrackerfiltergroup').each(function() {
			sortParams.push({
				prop: $(this).attr('id').replace('sazwtrackerfilters', ''),
				asc: $(this).find('.sazwtrackerflipbutton').data('asc') ? 1 : -1
			});
		});

		sortedWarriors.sort(function(a, b) {
			for (var index = 0; index < sortParams.length; ++index) {
				var order = compare[sortParams[index].prop](a, b);
				if (order !== 0) {
					return order * sortParams[index].asc;
				}
			}
		});

		var ul = $content.find('#sazwtrackerwarriors');
		sortedWarriors.forEach(function(warrior) {
			ul.append($content.find('#sazwtrackerwarrior' + warrior.id));
		});
	}

	function storageAvailable() {
		try {
			var x = '__storage_test__';
			localStorage.setItem(x, x);
			localStorage.removeItem(x);
			return true;
		} catch (e) {
			return e instanceof DOMException && (
					e.code === 22 ||
					e.code === 1014 ||
					e.name === 'QuotaExceededError' ||
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				(localStorage && localStorage.length !== 0);
		}
	}

	function getRoster() {
		var roster = [];

		for (var key in warriors) {
			var warrior = warriors[key];
			if ($content.find('#sazwtrackerwarrior' + warrior.id + ' input').is(':checked')) {
				roster.push(warrior.page);
			}
		}

		return JSON.stringify(roster);
	}

	function setRoster(json) {
		if (json === null) {
			return false;
		}
		var roster = JSON.parse(json);
		if (!Array.isArray(roster)) {
			return false;
		}
		if (!roster.every(function(page) {
				return (typeof page === 'string');
			})) {
			return false;
		}
		$content.find('.sazwtrackerwarrior input').prop('checked', false);
		roster.forEach(function(page) {
			$content.find('#sazwtrackerwarrior' + warriors[page].id + ' input').prop('checked', true);
			warriors[page].recruited = true;
		});

		applyFilters();
		applySort();
		return true;
	}

	function saveLocal(slot) {
		if (canStore) {
			localStorage.setItem('sazwTracker' + slot + 'Roster', getRoster());
		}
	}

	function loadLocal(slot) {
		if (canStore) {
			return setRoster(localStorage.getItem('sazwTracker' + slot + 'Roster'));
		}
	}

	function updateBlob() {
		$content.find('#sazwtrackerfilesave').attr('href', '');
		$content.find('#sazwtrackerfilesave button').prop('disabled', true);
		if (warriorBlobUrl !== null) {
			window.URL.revokeObjectURL(warriorBlobUrl);
		}
		var file = new Blob([getRoster()], {
			type: 'text/json'
		});
		warriorBlobUrl = URL.createObjectURL(file);
		$content.find('#sazwtrackerfilesave').attr('href', warriorBlobUrl);
		$content.find('#sazwtrackerfilesave button').prop('disabled', false);
	}

	function init(content) {
		var main = content.find('#sazwtracker:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		$content = content;
		warriors = {};
		sortedWarriors = [];
		warriorBlobUrl = null;
		filters = {};
		compare = {};

		canStore = storageAvailable();
		buildWarriorListAndRarityFilter();
		createTopControls();
		initCompareFunctions();
		loadControlState();
		if (!loadLocal('Auto')) {
			applyFilters();
			applySort();
		}
		updateBlob();
	}

	mw.hook('wikipage.content').add(init);
})(window.jQuery, window.mediaWiki);