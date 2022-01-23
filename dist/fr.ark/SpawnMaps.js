$(function () {

    var SharedDataPage = 'Donnée:Spawn Map/Shared';
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
	var CACHE_NAME = 'ArkDataMaps';
	var CACHE_EXPIRY_TIME = 24 * 60 * 60;


	function formatPercent(v, precision, threshold) {
		v = (v * 100).toFixed(precision);
		if (v < threshold) {
			return '<' + threshold + '%';
		}
		return v + '%';
	}

	function fetchSpawnDataPages(context) {
		return caches.open(CACHE_NAME).then(function (cache) {
			function fetchDataPageInternal(pageName, outFieldName) {
                // Construct a URL of the page.
                // On translations if prefixed with "en:", this'll slice off the script path.
                var isRequestingMain = pageName.startsWith('en:') && mw.config.get('wgContentLanguage') != 'en';
                var scriptPath = mw.config.get('wgScriptPath');
				var url = mw.util.getUrl((isRequestingMain ? pageName.slice(3) : pageName), {
					action: 'raw',
					ctype: 'application/json'
				});
                if (isRequestingMain && url.startsWith(scriptPath)) {
                    url = url.slice(scriptPath.length);
                }

				var timeNow = new Date().getTime();
				var request = new Request(url);
				return cache.match(request).then(function (response) {
					// Check if cache entry is recent and valid.
					if (response && response.ok
					    && (Date.parse(response.headers.get('Expires')) > timeNow)
					    && (parseInt(response.headers.get('X-ARK-Cache-Index')) == context.cacheIndex)) {
						return response;
					}

					// Fetch the page from API.
					return fetch(request).then(function (response) {
						response.clone().blob().then(function(body) {
							cache.put(request, new Response(body, { headers: {
								'Expires': (new Date(timeNow + (CACHE_EXPIRY_TIME))).toUTCString(),
								'X-ARK-Cache-Index': context.cacheIndex,
							}}));
						});
						return response;
					});
				}).then(function (response) {
					return response.json().then(function(data) {
						context[outFieldName] = data;
					});
				});
			}

			// Retrieve shared and map-specific data.
			return Promise.all([
				fetchDataPageInternal(SharedDataPage, 'shared'),
				fetchDataPageInternal(context.pageName, 'data')
			]);
		});
	}

	function populateCreatureSelector(context) {
		context.$select.empty();
		context.$select.append($('<option>').val('').text(Strings.SelectCreature));

		var $creatureGroup = $('<optgroup label="' + Strings.OptionGroupCreatures +'">');
		context.creatures.forEach(function (name) {
			var displayName = context.shared.NameTranslations[name] ? context.shared.NameTranslations[name] : name;
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
						var thisChance = npc.c;
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
					var tamable = !(spawner.u || context.shared.GeneralUntamability[name]);
					if (!tamable) {
						tooltipExtra = '\n' + (!spawner.u ? Strings.TooltipUntameable : Strings.TooltipUntameableLocal);
					}

					// Render locations.
					spawner.l.forEach(function (location) {
						if (location.length == 2) {
							/// XY point.
							var x = location[0], y = location[1];
							// Rarity.
							var rarity = Math.min(5, Math.round(1.5 * Math.log(1 + 2 * amount)));
							var rarityClass = RarityClasses[rarity];
							// Coordinates.
							var left = Math.max(0, 100 * ((x - context.offsetLeft) / mapWidth - context.pointSize / (2 * mapWidth)));
							var top = Math.max(0, 100 * ((y - context.offsetTop) / mapHeight - context.pointSize / (2 * mapWidth)));
							// Tooltip.
							var tooltipText = Strings.TooltipLat + ' ' + y + ', ' + Strings.TooltipLong + ' ' + x + tooltipExtra;
							// Display.
							$container.append($('<div class="dot point">').addClass(rarityClass + (!tamable ? ' untameable' : '')).css({
								left: left.toFixed(1) + '%',
								top: top.toFixed(1) + '%',
							}).prop('title', tooltipText));
						} else {
							/// XYXY rectangle.
							var x1 = location[0], y1 = location[1],
							    x2 = location[2], y2 = location[3];
							// Rarity.
							var area = (x2 - x1) * (y2 - y1);
							var rarity = Math.min(5, Math.round(1.5 * Math.log(1 + 50 * amount/area)));
							var rarityClass = RarityClasses[rarity];
							// Display location adjustments.
							var widthAdjust = (x2 - x1) / mapWidth < 0.01 ? 0.5 : 0;
							var heightAdjust = (y2 - y1) / mapHeight < 0.01 ? 0.5 : 0;
							// Coordinates.
							var left = Math.max(0, 100 * (x1 - context.offsetLeft) / mapWidth - widthAdjust);
							var top = Math.max(0, 100 * (y1 - context.offsetTop) / mapHeight - heightAdjust);
							var bottom = Math.min(100, 100 * (100 - y2 - (100 - context.offsetBottom)) / mapHeight - heightAdjust);
							var right = Math.min(100, 100 * (100 - x2 - (100 - context.offsetRight)) / mapWidth - widthAdjust);
							// Tooltip.
							var tooltipText = Strings.TooltipFrom + ' ' +
											  Strings.TooltipLat + ' ' + y1 + ', ' + Strings.TooltipLong  + ' ' + x1 +
											  '\n' + Strings.TooltipTo + ' ' +
											  Strings.TooltipLat + ' ' + y2 + ', ' + Strings.TooltipLong  + ' ' + x2 +
											  tooltipExtra;
							// Display.
							$container.append($('<div class="square">').addClass(rarityClass + (!tamable ? ' untameable' : '')).css({
								left: left.toFixed(1) + '%',
								top: top.toFixed(1) + '%',
								bottom: bottom.toFixed(1) + '%',
								right: right.toFixed(1) + '%',
							}).prop('title', tooltipText));
						}

					});
				});
			});
		}
	}


	var isFandomMobile = document.body.classList.contains('skin-fandommobile');

	$('.data-map-container').each(function () {
		// Do not double-initialise the map.
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
			cacheIndex: $(this).data('spawn-data-cache-id') || 1,

			data: null,
			creatures: [],
			shared: null,
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
		fetchSpawnDataPages(context).then(function() {

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