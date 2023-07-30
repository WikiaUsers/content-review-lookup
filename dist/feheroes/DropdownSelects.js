mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('DropdownSelects');
	if (!main) return;

	var OO;
	var data = main.dataset;
	var colorMenu, weaponMenu, movementMenu, entryMenu, availabilityDropdown, abilityDropdown;

	//Begin actual code
	var SELECT_ALL_DATA = -1;
	var SELECT_ALL_LABEL = "All";
	var $elementsToFilter = $( ".hero-filter-element" );
	var addAvailabilityFilter = typeof $elementsToFilter[0].dataset.availabilityClasses === 'string';
	var addAbilityFilter = typeof $elementsToFilter[0].dataset.abilities === 'string';
	var optionTemplate = [
		{
			data: 'ghb',
			label: 'GHB',
			info: '[<a href="../Grand_Hero_Battle_maps" target=_blank>?</a>]',
		},
		{
			data: 'tempest',
			label: 'TT',
			info: '[<a href="../Tempest_Trials" target=_blank>?</a>]',
		},
		{
			data: 'story',
			label: 'Story (Askr Trio)',
			info: '[<a href="../Category:Story_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'regular_5',
			label: 'Regular 5<img alt="★" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/4/4e/Icon_Rarity_5.png/revision/latest/scale-to-width-down/20?cb=20180513213447" decoding="async" width="20" height="20" data-image-name="Icon Rarity 5.png" data-image-key="Icon_Rarity_5.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/4/4e/Icon_Rarity_5.png/revision/latest/scale-to-width-down/20?cb=20180513213447" class=" lazyloaded">', 
			info: '<abbr title="Heroes in the regular summoning pool that can be summoned at 5★ rarity">[?]</abbr>',
		},
		{
			data: 'specialRate',
			label: '4<img alt="★" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/b/b0/Icon_Rarity_4.5.png/revision/latest/scale-to-width-down/20?cb=20230513213447" decoding="async" width="20" height="20" data-image-name="Icon Rarity 4.5.png" data-image-key="Icon_Rarity_4.5.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/b/b0/Icon_Rarity_4.5.png/revision/latest/scale-to-width-down/20?cb=20230513213447" class=" lazyloaded"> Special Rate',
			info: '<abbr title="Heroes in the 5★ special rate summoning pool that are initially summoned at 4★ rarity but end up being 5★ rarity">[?]</abbr>',
		},
		{
			data: 'regular_4_3_2_1',
			label: 'Regular 1-4<img alt="★" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/7/7d/Icon_Rarity_4.png/revision/latest/scale-to-width-down/20?cb=20180513213504" decoding="async" width="20" height="20" data-image-name="Icon Rarity 4.png" data-image-key="Icon_Rarity_4.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/7/7d/Icon_Rarity_4.png/revision/latest/scale-to-width-down/20?cb=20180513213504" class=" ls-is-cached lazyloaded">',
			info: '<abbr  title="Heroes in the regular summoning pool that  can be summoned at 4★ rarity or lower">[?]</abbr>',
		},
		{
			data: 'special',
			label: 'Special/Seasonal',
			info: '[<a href="../Category:Special_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'legendary',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/a/a2/Icon_Hero_Type_Legend.png/revision/latest/scale-to-width-down/20?cb=20220410030231" decoding="async" width="20" height="20" data-image-name="Icon Hero Type Legend.png" data-image-key="Icon_Hero_Type_Legend.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/a/a2/Icon_Hero_Type_Legend.png/revision/latest/scale-to-width-down/20?cb=20220410030231" class=" lazyloaded"> Legendary',
			info: '[<a href="../Category:Legendary_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'mythic',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/9/92/Icon_Hero_Type_Mythic.png/revision/latest/scale-to-width-down/20?cb=20220410030230" decoding="async" width="20" height="20" data-image-name="Icon Hero Type Mythic.png" data-image-key="Icon_Hero_Type_Mythic.png" data-src="ttps://static.wikia.nocookie.net/feheroes_gamepedia_en/images/9/92/Icon_Hero_Type_Mythic.png/revision/latest/scale-to-width-down/20?cb=20220410030230" class=" lazyloaded"> Mythic',
			info: '[<a href="../Category:Mythic_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'duo',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/d/de/Icon_Hero_Type_Duo.png/revision/latest/scale-to-width-down/20?cb=20220410030228" decoding="async" width="20" height="20" data-image-name="Icon Hero Type Duo.png" data-image-key="Icon_Hero_Type_Duo.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/d/de/Icon_Hero_Type_Duo.png/revision/latest/scale-to-width-down/20?cb=20220410030228" class=" lazyloaded"> Duo',
			info: '[<a href="../Category:Duo_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'harmonized',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/4/41/Icon_Hero_Type_Har..png/revision/latest/scale-to-width-down/20?cb=20220410030227" decoding="async" width="20" height="20" data-image-name="Icon Hero Type Har..png" data-image-key="Icon_Hero_Type_Har..png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/4/41/Icon_Hero_Type_Har..png/revision/latest/scale-to-width-down/20?cb=20220410030227" class=" lazyloaded"> Harmonized',
			info: '[<a href="../Category:Harmonized_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'ascended',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/1/13/Icon_FlowerBud_L.webp/revision/latest/scale-to-width-down/20?cb=20211018053729" decoding="async" width="20" height="20" data-image-name="Icon FlowerBud L.png" data-image-key="Icon_FlowerBud_L.png" data-src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/1/13/Icon_FlowerBud_L.webp/revision/latest/scale-to-width-down/20?cb=20211018053729" class=" lazyloaded"> Ascended',
			info: '[<a href="../Category:Ascended_Heroes" target=_blank>?</a>]',
		},
		{
			data: 'rearmed',
			label: '<img alt="" src="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/8/86/Icon_Arcane_Weapon.png/revision/latest/scale-to-width-down/20?cb=20220916064333" decoding="async" width="20" height="20" data-image-name="Icon Arcane Weapon.png" data-image-key="https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/8/86/Icon_Arcane_Weapon.png/revision/latest/scale-to-width-down/20?cb=20220916064333" class=" lazyloaded"> Rearmed',
			info: '[<a href="../Category:Rearmed_Heroes" target=_blank>?</a>]',
		}
	];

	/**
	* commaList is either a string: "label1,label2"
	*   or an array: [ [data1, label1], [data2, label2] ]
	*/
	function makeDropdown(label, commaList) {
		if (!Array.isArray(commaList)) {
			// map to [data, label]
			commaList = commaList.split(',').map(function (e, i) { return [i, e]; });
		}
		var widget = new OO.ui.DropdownWidget({
			indicator: "down",
			label: label,
			menu: {
				items: [[SELECT_ALL_DATA, SELECT_ALL_LABEL]].concat(commaList).map(function(ele) {
					return new OO.ui.MenuOptionWidget( {
						data: ele[0],
						label: ele[1],
					} );
				})
			}
		});
		return widget;
	}

	/**
	* Creates a multi-select dropdown.
	* Creates an ALL option automatically.
	* @param {string|jQueryEl} label - default menu label
	* @param {function(item, isSelected)} onChoose - choose event listener
	* @param {Array} menuOptions - Each entry has an option object:
	*      { data: {string}, label: {string|jQueryEl}, info: {HTMLstring} }
	*/
	function makeMultiSelectDropdown(label, onChoose, menuOptions) {
		function createOption (optionConfig) {
			function makeCheckboxLabel(checkboxName, labelText, alignRightTip) {
				var label = document.createElement('span');
				label.style = 'display: flex;';
				label.innerHTML = '<input type="checkbox" name="' + checkboxName + '" checked><label style="flex:1; margin-right:0.5rem;" for="' + checkboxName + '">' + labelText + '</label> ' + (alignRightTip || '');
				$(label).find('input[type="checkbox"]')[0].onclick = function (e) { e.preventDefault(); };
				return $(label);
			}
			
			var option = new OO.ui.MenuOptionWidget( {
				data: optionConfig.data,
				label: makeCheckboxLabel(optionConfig.data, optionConfig.label, optionConfig.info),
				pressable: false,
			});
			var OGsetSelected = option.setSelected;
			option.setSelected = function (selected) {
				this.getLabel().find('input[type="checkbox"]')[0].checked = selected;
				OGsetSelected.call(this, selected);
			};
			option.setSelected(true);
			return option;
		}

		var ALL_OPTION = createOption({ data:SELECT_ALL_DATA, label: SELECT_ALL_LABEL });
		var widget = new OO.ui.DropdownWidget( {
			indicator: "down",
			label: label,
			menu: {
				autoHide: true,
				multiselect: true,
				hideOnChoose: false,
				items: [ALL_OPTION].concat(menuOptions.map(createOption)),
			}
		});

		widget.getMenu().on("choose", function (item, isSelected) {
			var items = widget.getMenu().items;
			if (item === ALL_OPTION) {
				// If ALL_OPTION changed, update the rest of the toggles
				items.map(function (item) {
					item.setSelected(isSelected);
				});
			} else {
				// If a non ALL_OPTION changed, update the ALL_OPTION state
				var selectedCount = widget.getMenu().findSelectedItems().length - (ALL_OPTION.isSelected() ? 1 : 0);
				ALL_OPTION.setSelected(selectedCount === (items.length - 1));
			}
			// update the label
			widget.setLabel(getLabel(widget.getMenu().findSelectedItems()));
			function getLabel (selectedItems) {
				if (ALL_OPTION.isSelected()) {
					return label; // original label
				}
				if (selectedItems.length === 0) {
					return 'NONE';
				}
				// concatenate (non-all) selected items labels
				label = selectedItems.filter(function (item) {
					return item !== ALL_OPTION;
				}).map(function (item) {
					return item.getLabel().find('label')[0].innerText;
				}).join(', ');
				if (label.length > 18) {
					label = label.substring(0, 15) + "...";
				}
				return label;
			}
			
			onChoose.call(this, item, isSelected);
		});

		// Hacky Fix for multi-select bug
		var OGfindSelectedItems = widget.getMenu().findSelectedItems;
		widget.getMenu().findSelectedItems = function () {
			var selectedItems = OGfindSelectedItems.call(this);
			selectedItems.getLabel = function () { return widget.getLabel(); };
			return selectedItems;
		};
		return widget;
	}

	function applyFilterAction() {
		var colorItem = colorMenu.findSelectedItem();
		var weaponItem = weaponMenu.findSelectedItem();
		var moveItem = movementMenu.findSelectedItem();
		var entryItem = entryMenu.findSelectedItem();
		var availItems = availabilityDropdown.getMenu().findSelectedItems().map(function (item) { return item.getData(); });
		var abilityItem = abilityDropdown.getMenu().findSelectedItem();
		$elementsToFilter.css( "display", function () {
		var weaponProps = (this.dataset.weaponProps || "").split(";");
		var titles = (this.dataset.titles || "").split(";");
		var avails = (this.dataset.availabilityClasses || "").split(";");
		var abilities = (this.dataset.abilities || "").split(";");

		return (!colorItem || colorItem.getLabel() === SELECT_ALL_LABEL || weaponProps.indexOf(colorItem.getLabel()) > -1) &&
			(!weaponItem || weaponItem.getLabel() === SELECT_ALL_LABEL || weaponProps.indexOf(weaponItem.getLabel()) > -1) &&
			(!moveItem || moveItem.getLabel() === SELECT_ALL_LABEL || this.dataset.moveType === moveItem.getLabel()) &&
			(!entryItem || entryItem.getLabel() === SELECT_ALL_LABEL || titles.indexOf(entryItem.getData() + '') > -1) &&
			(!abilityItem || abilityItem.getData() === SELECT_ALL_DATA || abilities.includes(abilityItem.getData())) &&
			(availItems.indexOf(SELECT_ALL_DATA) > -1 || avails.filter(function (unitAvail) { return availItems.includes(unitAvail); }).length) ? "" : "none";
		} );
	}

	mw.loader.using('oojs-ui-core').then(function(require) {
		OO = require('oojs');
		var colorDropdown = makeDropdown("Color", data.colors);
		var weaponDropdown = makeDropdown("Weapon Types", data.weaponTypes);
		var movementDropdown = makeDropdown("Move Types", data.moveTypes);
		var entryDropdown = makeDropdown("Entry", data.titles);
		availabilityDropdown = addAvailabilityFilter && makeMultiSelectDropdown("Availability", applyFilterAction, optionTemplate);
		abilityDropdown = addAbilityFilter && makeDropdown("Ability", [
			['refresher', 'Refresher'],
			['resplendent', 'Resplendent'],
		]);

		colorMenu = colorDropdown.getMenu();
		movementMenu = movementDropdown.getMenu();
		weaponMenu = weaponDropdown.getMenu();
		entryMenu = entryDropdown.getMenu();
		//var availabilityMenu = availabilityDropdown.getMenu();
		var abilityMenu = abilityDropdown.getMenu();

		weaponMenu.$element.append( "<hr/>" );
		weaponMenu.addItems(data.weaponClasses.split(",").map(function(ele) {
		return new OO.ui.MenuOptionWidget( {
			label: ele
		} );
		}));

		colorDropdown.$element.css( "max-width", "9em" );
		weaponDropdown.$element.css( "max-width", "12em" );
		movementDropdown.$element.css( "max-width", "10em" );
		entryDropdown.$element.css( "max-width", "20em" );
		availabilityDropdown.$element.css( "max-width", "14em" );
		abilityDropdown.$element.css( "max-width", "9em" );

		colorMenu.on( "choose", applyFilterAction );
		movementMenu.on( "choose", applyFilterAction );
		weaponMenu.on( "choose", applyFilterAction );
		entryMenu.on( "choose", applyFilterAction );
		abilityMenu.on('choose', applyFilterAction);

		new OO.ui.HorizontalLayout( {
			items: [colorDropdown, weaponDropdown, movementDropdown, entryDropdown,
				addAvailabilityFilter && availabilityDropdown,
				addAbilityFilter && abilityDropdown,    
			]
		} ).$element.insertAfter( main );
	});
});