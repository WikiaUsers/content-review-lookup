//скрипт виводить активну вилазку та архонтові лови, бере дані з api
$(function() {
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	const NODE_LINK_MAP = {
		"Венера":"Венера (вузол)",
		"Лекс":"Лекс (вузол)"
	};
	if (NW_PAGE_NAME === "Архонтові_лови") {
		$.when($.get( 'https://api.warframestat.us/pc/archonHunt/?language=uk', "json" )).done(function(data1) {
			var divID='hunt';
			var tableID = 'hunt_table';
			buildHuntTable(divID, tableID, data1);
			$.each( data1.missions, function (index, mission) {
				buildHuntTableRow(divID, tableID, mission);
			});
			setInterval(countdown, 1000);
		});
	} else if (NW_PAGE_NAME == "Вилазка") {
		$.when($.get( 'https://api.warframestat.us/pc/sortie/?language=uk', "json" )).done(function(data1) {
			var divID ='sortie';
			var tableID = 'sortie_table';
			buildSortieTable(divID, tableID, data1);
			$.each( data1.variants, function (index, mission) {
				buildSortieTableRow(divID, tableID, mission);
			});
			setInterval(countdown, 1000);
		});
	}
	function buildHuntTable(divID, tableID, huntData) {
		if ($('#'+ divID).find("#" + tableID).length === 0) {
			$('#'+ divID).append(
						$("<table>", {
            				id: tableID,
							class: "emodtable",
							style: "margin:auto;min-width:350px;",
							append: [
								$("<thead>", {
									append: [
										$("<tr>", {
											append: [
												$("<th>", {
													append: [
														$("<a>", {
															style: "font-weight:bold;",
															href: 'https://warframe.fandom.com/uk/wiki/' + huntData.boss,
															text: huntData.boss
														})
													]
												}),
												$("<th>", {
													append: [
														$("<span>", {
															'data-time': huntData.expiry,
															title: 'Закінчиться '+ new Date(huntData.expiry).toLocaleString(),
															text: '1'
														})
													]
												}),
											]
										})
									]
								}),
                $("<tbody>"),
                $("<tfoot>"),
							]
						})
					);
		}
	}
	function buildHuntTableRow(divID, tableID, missionData) {
		[_, nodeName, planet] = missionData.node.match(/(.+) \((.+)\)/);
		$('#'+ divID).find("table#" + tableID + ' tbody')
			.append($("<tr>", {
				append: [
					$("<td>", {'data-sort-value': nodeName})
						.html('<a href="https://warframe.fandom.com/uk/wiki/'
							+ (NODE_LINK_MAP[nodeName] || nodeName) + '">'
							+ nodeName + '</a> '
							+ '(<a href="https://warframe.fandom.com/uk/wiki/' + planet
							+ '">' + planet + '</a>)'
						),
					$("<td>", {
						'data-sort-value': missionData.type,
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/' + missionData.type,
								text: missionData.type
							})
						]
					}),
				]
			}));
	}
	
	function buildSortieTable(divID, tableID, sortieData) {
		if ($('#'+ divID).find("#" + tableID).length === 0) {
			$('#'+ divID).append(
						$("<table>", {
            				id: tableID,
							class: "emodtable",
							style: "margin:auto;min-width:350px;",
							append: [
								$("<thead>", {
									append: [
										$("<tr>", {
											append: [
												$("<th>", {
													colspan: 2,
													style: "width:30%",
													append: [
														$("<a>", {
															style: "font-weight:bold;",
															href: 'https://warframe.fandom.com/uk/wiki/' + sortieData.boss,
															text: sortieData.boss
														})
													]
												}),
												$("<th>", {
													style: "width:40%;",
													append: [
														$("<span>", {
															'data-time': sortieData.expiry,
															title: 'Закінчиться ' + new Date(sortieData.expiry).toLocaleString(),
															text: '1'
														})
													]
												}),
											]
										})
									]
								}),
                $("<tbody>"),
                $("<tfoot>"),
							]
						})
					);
		}
	}
	function buildSortieTableRow(divID, tableID, missionData) {
		[_, nodeName, planet] = missionData.node.match(/(.+) \((.+)\)/);
		$('#'+ divID).find("table#" + tableID + ' tbody')
			.append($("<tr>", {
				append: [
					$("<td>").html('<a href="https://warframe.fandom.com/uk/wiki/'
							+ (NODE_LINK_MAP[nodeName] || nodeName) + '">'
							+ nodeName + '</a> '
							+ '(<a href="https://warframe.fandom.com/uk/wiki/' + planet
							+ '">' + planet + '</a>)'
						),
					$("<td>", {
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/' + missionData.missionType,
								text: missionData.missionType
							})
						]
					}),
					$("<td>", {
						append: [
							$("<span>", {
								title: missionData.modifierDescription,
								text: missionData.modifier
							})
						]
					}),
				]
			}));
	}
  
	function countdown() {
    	$( 'span[data-time]' ).each( function () {
			var countDownDate = new Date($( this ).attr('data-time')).getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			$( this ).text((days > 0 ? days + " дн. " : '') + (hours > 0 ? hours + " год " : '') + (minutes > 0 ? minutes + " хв " : '') + seconds + " c");
		});
	}
});