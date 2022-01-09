$(function () {

	var NameTranslations = {};
	var GeneralUntamability = {
		"Aberrant Cnidaria":1,"Aberrant Meganeura":1,"Alpha Basilisk":1,"Alpha Carnotaurus":1,"Alpha Deathworm":1,"Alpha Fire Wyvern":1,"Alpha Karkinos":1,"Alpha Leedsichthys":1,"Alpha Megalodon":1,"Alpha Mosasaur":1,"Alpha Raptor":1,"Alpha Surface Reaper King":1,"Alpha T-Rex":1,"Alpha Tusoteuthis":1,"Ammonite":1,"Broodmother Lysrix":1,"Cnidaria":1,"Corrupted Arthropluera":1,"Corrupted Carnotaurus":1,"Corrupted Chalicotherium":1,"Corrupted Dilophosaur":1,"Corrupted Giganotosaurus":1,"Corrupted Paraceratherium":1,"Corrupted Pteranodon":1,"Corrupted Raptor":1,"Corrupted Reaper King":1,"Corrupted Rex":1,"Corrupted Rock Drake":1,"Corrupted Spino":1,"Corrupted Stegosaurus":1,"Corrupted Triceratops":1,"Corrupted Wyvern":1,"Deathworm":1,"Defense Unit":1,"Deinonychus":1,"Enforcer":1,"Enraged Corrupted Rex":1,"Eurypterid":1,"Fire Wyvern":1,"Glowbug":1,"Ice Wyvern":1,"Iceworm Male":1,"Insect Swarm":1,"Leedsichthys":1,"Lightning Wyvern":1,"Macrophage":1,"Magmasaur":1,"Meganeura":1,"Nameless":1,"Oil Jug Bug":1,"Parakeet Fish School":1,"Poison Wyvern":1,"Polar Bear":1,"Purlovia":1,"R-Reaper King":1,"R-Reaper Queen":1,"Reaper Queen":1,"Rock Drake":1,"Rubble Golem":1,"Scout":1,"Seeker":1,"Summoner":1,"Surface Reaper King":1,"Titanomyrma Drone":1,"Titanomyrma Soldier":1,"Water Jug Bug":1,"Yeti":1
	};
	var RarityClasses = [
		'cr-region-map-very-rare',
		'cr-region-map-rare',
		'cr-region-map-very-uncommon',
		'cr-region-map-uncommon',
		'cr-region-map-common',
		'cr-region-map-very-common'
	];
	var Strings = {
		CreatureSpawns: 'Apparition des créatures',
		SelectCreature: 'Sélectionnez une créature', // WIP T66: Select a creature or container
		OptionGroupCreatures: 'Créatures',
		OptionGroupContainers: 'Contenants de groupes',
		ToggleDetails: ' détails complets des contenants de groupes',
		DeselectGroups: 'désélectionnez tous les contenants',
		TooltipFrom: 'depuis',
		TooltipTo: 'vers',
		TooltipLat: 'lat',
		TooltipLong: 'long',
		TooltipUntameable: 'non apprivoisable',
		TooltipUntameableLocal: 'les créatures de ce lieu ne sont pas apprivoisables',
	};
	var RE_CONTAINER_NAME = /DinoSpawnEntries_?|SpawnEntries_?/i;


	function formatPercent(v, precision, threshold) {
		v = (v * 100).toFixed(precision);
		if (v < threshold) {
			return '<' + threshold + '%';
		}
		return v + '%';
	}

	function fetchSpawnData(context, onSuccess, onFailure) {
		// TODO: caching
		$.getJSON(mw.util.getUrl(context.pageName, {
			action: 'raw',
		})).done(function(data) {
			context.data = data;
			onSuccess();
		}).fail(onFailure);
	}

	function populateCreatureSelector(context) {
		context.$select.empty();
		context.$select.append($('<option>').val('').text(Strings.SelectCreature));

		var $creatureGroup = $('<optgroup label="' + Strings.OptionGroupCreatures +'">');
		context.creatures.forEach(function (name) {
			var displayName = NameTranslations[name] ? NameTranslations[name] : name;
			$creatureGroup.append($('<option>').text(displayName).val(name));
		});
		context.$select.append($creatureGroup);
	}

	function clearDisplayedGroups(context) {
		context.$map.children('.spawn-group').remove();
		context.$legend.find('.groups-legend').remove();
		context.$legend.find('.details-toggle').remove();
		context.$legend.find('.mass-group-deselect').remove();
	}

	function showGroups(context, name) {
		clearDisplayedGroups(context);

		// Do not attempt to locate and show any groups when the thing to be shown is nothing.
		if (!name) {
			return;
		}

		var imgWidth = context.$resourceMap.prop('width');
		var imgHeight = context.$resourceMap.prop('height');
		var mapWidth = context.offsetRight - context.offsetLeft;
		var mapHeight = context.offsetBottom - context.offsetTop;

		// Filter containers to process only those which contain the creature.
		var containers = context.data.filter(function (container) {
			return container.e.some(function (group) {
				return group.s.some(function (npc) {
					return npc.n == name;
				});
			});
		});
		
		// Display spawning group information in the legend, and calculate the probability the selected creature will spawn.
		var containerProbabilities = {};
		if (containers.length) {
			// Construct a container for the groups legend.
			var $extendedLegend = $('<ul class="groups-legend">');

			// Construct a button to toggle group information display.
			var $toggleDetails = $('<label class="details-toggle">').append($('<input type="checkbox">').click(function () {
				if (this.checked) {
					$extendedLegend.find('li.is-detail').show();
				} else {
					$extendedLegend.find('li.is-detail').hide();
				}
			})).append(Strings.ToggleDetails);
			// Construct a button to toggle all groups in the legend.
			var $deselectGroups = $('<button class="mass-group-deselect">').text(Strings.DeselectGroups).click(function() {
				$extendedLegend.find('input[type=checkbox]:checked').each(function() {
					$(this).prop('checked', false).change();
				});
			});
			// Append the buttons and legend extension.
			context.$legend.append($toggleDetails);
			context.$legend.append($deselectGroups);
			context.$legend.append($extendedLegend);
			
			// Walk over the groups.
			containers.forEach(function (container) {
				// Construct a basic list element for the container.
				var $groups = $('<ul>');
				var $container = $('<li>').append(
					$('<label>').append(
						$('<input type="checkbox" checked>').val(container.n).change(function () {
							var $this = $(this);
							var $mapGroup = $('#' + context.id + '-container-' + $this.val());
							var $legendGroup = $this.closest('li').find('ul');
							if ($this.prop('checked')) {
								$mapGroup.show();
								$legendGroup.show();
							} else {
								$mapGroup.hide();
								$legendGroup.hide();
							}
						})
					).append(' ' + container.n.replace(RE_CONTAINER_NAME, ''))
				).append($groups);
				$extendedLegend.append($container);
				
				// Walk over every group, display each and its members.
				var localProbability = 0;
				container.e.forEach(function (group) {
					// Construct a basic list element.
					var $npcs = $('<ul>');
					var $group = $('<li>').text(group.n + ': ' + formatPercent(group.c, 1, 0.1)).append($npcs);
					$groups.append($group);

					// Check if group contains the selected creature, otherwise mark the group as hidden by default.
					if (!group.s.some(function (npc) { return npc.n == name; })) {
						$group.addClass('is-detail');
					}
					
					// Walk over each member, add them to list and update their probability.
					group.s.forEach(function (npc) {
						// Roll the NPC's chance into 1 if negative.
						// TODO: Legacy code. This is no longer needed with the new data source.
						var thisChance = npc.c <= -0.01 ? 1 : npc.c;
						// Update probability inside the container.
						if (npc.n == name) {
							localProbability += thisChance * group.c;
						}
						// Display.
						var displayedChance = formatPercent(thisChance, thisChance <= 0.1 ? 1 : 0, 0.1);
						$npcs.append($('<li>').text(npc.n + ': ' + displayedChance));
					});
				});

				containerProbabilities[container.n] = localProbability;
			});
			
			// Hide detail groups by default.
			$extendedLegend.find('li.is-detail').hide();

			// Render data overlay.
			containers.forEach(function (container) {
				var $container = $('<div class="spawn-group" id="' + context.id + '-container-' + container.n + '">');
				context.$resourceMap.before($container);

				container.s.forEach(function (spawner) {
					var tooltipExtra = '';
					// Rarity coefficients.
					var localProbability = containerProbabilities[container.n] ? containerProbabilities[container.n] : 0;
					var amount = localProbability * spawner.f;
					// Tamability.
					var tamable = !(spawner.u || GeneralUntamability[name]);
					if (!tamable) {
						tooltipExtra = '\n' + (!spawner.u ? Strings.TooltipUntameable : Strings.TooltipUntameableLocal);
					}

					// Render points.
					spawner.p.forEach(function (point) {
						// Rarity.
						var rarity = Math.min(5, Math.round(1.5 * Math.log(1 + 2 * amount)));
						var rarityClass = RarityClasses[rarity];
						// Coordinates.
						var left = Math.max(0, 100 * ((point.x - context.offsetLeft) / mapWidth - context.pointSize / (2 * mapWidth)));
						var top = Math.max(0, 100 * ((point.y - context.offsetTop) / mapHeight - context.pointSize / (2 * mapWidth)));
						// Tooltip.
						var tooltipText = Strings.TooltipLat + ' ' + point.y + ', ' + Strings.TooltipLong + ' ' + point.x + tooltipExtra;
						// Display.
						$container.append($('<div class="dot point">').addClass(rarityClass + (!tamable ? ' untameable' : '')).css({
							left: left.toFixed(1) + '%',
							top: top.toFixed(1) + '%',
						}).prop('title', tooltipText));
					});

					// Render locations.
					spawner.l.forEach(function (location) {
						// Rarity.
						var area = (location.x2 - location.x1) * (location.y2 - location.y1);
						var rarity = Math.min(5, Math.round(1.5 * Math.log(1 + 50 * amount/area)));
						var rarityClass = RarityClasses[rarity];
						// Display location adjustments.
						var widthAdjust = (location.x2 - location.x1) / mapWidth < 0.01 ? 0.5 : 0;
						var heightAdjust = (location.y2 - location.y1) / mapHeight < 0.01 ? 0.5 : 0;
						// Coordinates.
						var left = Math.max(0, 100 * (location.x1 - context.offsetLeft) / mapWidth - widthAdjust);
						var top = Math.max(0, 100 * (location.y1 - context.offsetTop) / mapHeight - heightAdjust);
						var bottom = Math.min(100, 100 * (100 - location.y2 - (100 - context.offsetBottom)) / mapHeight - heightAdjust);
						var right = Math.min(100, 100 * (100 - location.x2 - (100 - context.offsetRight)) / mapWidth - widthAdjust);
						// Tooltip.
						var tooltipText = Strings.TooltipFrom + ' ' +
										  Strings.TooltipLat + ' ' + location.y1 + ', ' + Strings.TooltipLong  + ' ' + location.x1 +
										  '\n' + Strings.TooltipTo + ' ' +
										  Strings.TooltipLat + ' ' + location.y2 + ', ' + Strings.TooltipLong  + ' ' + location.x2 +
										  tooltipExtra;
						// Display.
						$container.append($('<div class="square">').addClass(rarityClass + (!tamable ? ' untameable' : '')).css({
							left: left.toFixed(1) + '%',
							top: top.toFixed(1) + '%',
							bottom: bottom.toFixed(1) + '%',
							right: right.toFixed(1) + '%',
						}).prop('title', tooltipText));
					});
				});
			});
		}
	}


	var isFandomMobile = document.body.classList.contains('skin-fandommobile');

	$('.data-map-container').each(function () {
		if (this.__spawnMapInitialised) {
			return;
		}
		this.__spawnMapInitialised = true;

		var $this = $(this);
		var context = {
			id: $this.attr('id'),
			$map: $this.find('.map-container'),
			$legend: $this.find('.map-legend-container'),
			$resourceMap: null,
			pointSize: 7,
			offsetTop: parseFloat($this.data('border-top')),
			offsetLeft: parseFloat($this.data('border-left')),
			offsetRight: parseFloat($this.data('border-right')),
			offsetBottom: parseFloat($this.data('border-bottom')),

			pageName: $(this).data('spawn-data-page-name'),
			data: null,
			creatures: [],
		};
		context.$resourceMap = isFandomMobile ? context.$map.find('img.resourcemap') : context.$map.children().last();

		if (!context.pageName) {
			return;
		}

		if (isFandomMobile) {
			// Nasty FandomMobile workaround. the entire structure should be ideally reworked instead.
			// Reparent the resource map table. removing .wikitable does nothing, and the wrapper is still rendered.
			$this.append($this.find('.resourcemaptable'));
			$this.children('div.article-table-wrapper').remove();
		} else {
			// Nasty FandomDesktop workaround to fix position:sticky
			$('.page-content').css({ 'overflow-x': 'initial' });
		}

		// Request spawn data from browser cache or server.
		fetchSpawnData(context, function() {

			context.$select = $('<select>')
							  .change(function () {
									showGroups(context, $(this).val());
							  });
			context.$legend.append($('<tr class="no-icon"><td colspan="2"><b>'+Strings.CreatureSpawns+'</b></td></tr>'));
			context.$legend.append(context.$select);

			// Gather creature names from data.
			context.data.forEach(function (container) {
				container.e.forEach(function (group) {
					group.s.forEach(function (member) {
						var name = member.n;
						if (context.creatures.indexOf(name) == -1) {
							context.creatures.push(name);
						}
					});
				});
			});
			context.creatures = context.creatures.sort();

			// Populate the creature selector.
			populateCreatureSelector(context);

			// Handle URL hash creature switching for Dododex.
			var urlHash = decodeURIComponent(window.location.hash);
			if (urlHash) {
				context.$select.val(urlHash.substr(1));
				context.$select.change();
			}

		}, function() {
			// TODO: handle error, somehow?
		});
	});

});