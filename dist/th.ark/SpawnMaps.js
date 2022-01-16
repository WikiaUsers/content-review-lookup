$(function () {

    var SharedDataPage = 'Data:Spawn Map/Shared';
	var RarityClasses = [
		'cr-region-map-very-rare',
		'cr-region-map-rare',
		'cr-region-map-very-uncommon',
		'cr-region-map-uncommon',
		'cr-region-map-common',
		'cr-region-map-very-common'
	];
	var Strings = {
		CreatureSpawns: 'Creature Spawns',
		SelectCreature: 'Select a creature', // WIP T66: Select a creature or container
		OptionGroupCreatures: 'Creatures',
		OptionGroupContainers: 'Group Containers',
		ToggleDetails: ' full spawn groups details',
		DeselectGroups: 'deselect all containers',
		TooltipFrom: 'from',
		TooltipTo: 'to',
		TooltipLat: 'lat',
		TooltipLong: 'long',
		TooltipUntameable: 'untameable',
		TooltipUntameableLocal: 'creatures at this location are not tameable',
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
                var timeNow = new Date().getTime();
                var url = mw.util.getUrl(pageName, {
                    action: 'raw',
                    ctype: 'application/json'
                });
                var request = new Request(url);
                return cache.match(request).then(function (response) {
                    // Check if cache entry is recent and valid.
                    if (response && response.ok && (Date.parse(response.headers.get('Expires')) > timeNow)) {
                        return response;
                    }

                    // Fetch the page from API.
                    return fetch(request).then(function (response) {
                        response.clone().blob().then(function(body) {
                            cache.put(request, new Response(body, { headers: {
                                'Expires': (new Date(timeNow + (CACHE_EXPIRY_TIME))).toUTCString(),
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
					var tamable = !(spawner.u || context.shared.GeneralUntamability[name]);
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