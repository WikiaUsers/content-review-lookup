(function(){
	var skinPreviewDialog = false;
	var bodyLoadComplete = false;
	var skinAutoPlayInterval = false;
	var skinPreviewDialogResetPreviewToActive = false;
	var firstShipImageFound = false;
	
	var missingImageOverlayUrl = 'https://static.wikia.nocookie.net/starfighter-infinity/images/e/ef/Ship_MissingSkinOverlay.png/revision/latest';
	var missingImageOverlayHtml = '<img class="shipSkinMissingImageOverlay" src="' + missingImageOverlayUrl + '">';
	
	var skinList = {
		'Standard': false,
		'Andromedan': false,
		'Cold Steel': false,
		'Dartian': false,
		'Devimon': false,
		'Gilded': false,
		'Igni': false,
		'Nobility': false,
		'Null Dweller': false,
		'Pirate': false,
		'Radii': false,
		'Red Mist': false,
		'Relisk': false,
		'Resonite': false, 
		'Rodion': false,
		'Rustic': false,
		'Sheenite': false,
		'Splicer': false,
		'Solarion': false,
		'Tobor': false,
		'Tornadian': false,
		'Tyraan': false, 
		'Wave': false
	};


	var getShipName = function(){return $('h2[data-source="title1"]').text();};
	var isShipPage = function(){return $('aside.portable-infobox div[data-source="shields"]').length > 0;};

	var loadImageUrlFromApi = function(imageName, successFunc, errorFunc) {
		var fullImageName = 'Image:' + imageName;
		$.ajax({
			method: 'GET',
			dataType: "json",
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'query',
				prop: 'imageinfo',
				iiprop: 'url',
				iilimit: 1,
				ns: 6,
				titles: fullImageName
			},
			success: successFunc,
			error: errorFunc
		});
	};

	var setImageHtmlForShipSkin = function(skinName) {
		var shipName = getShipName();
		if (shipName == "") {
			return;
		}

		loadImageUrlFromApi(shipName + ' ' + skinName + '.png', function(d){
				var imageUrl = false;
				var imageHtml;
				skinList[skinName] = '';

				try {
					for (var idx in d.query.pages) {
						imageUrl = d.query.pages[idx].imageinfo[0].url;
						imageHtml = '<img class="shipPageSkinImage" src="' + imageUrl + '" crossOrigin="anonymous">';

						skinList[skinName] = imageHtml;
						showShipPageSkinDropdownWhenReady();
					}
				} catch (e) {
					showShipPageSkinDropdownWhenReady();
				}
			}, function(errMsg) {
				console.log('error getting ship skin image url', errMsg);
				skinList[skinName] = '';
				showShipPageSkinDropdownWhenReady();
		});
	};

	var showShipPageSkinDropdownWhenReady = function() {
		if (bodyLoadComplete) {
			var skinImagesFound = false;
			var selectHtml = '<div class="pi-item pi-data pi-item-spacing pi-border-color" data-source="skinSelection">';
			selectHtml += '<div class="shipPageShipSelector">';
			selectHtml += '<ul>';
			selectHtml += '<li>';
			selectHtml += '<table cellpadding="0" cellspacing="0"><tr>';
			selectHtml += '<td>';

			selectHtml += '<span class="shipPageSelectorMenu"><span class="menuTitle">Standard</span> <span class="fas fa-caret-down" aria-hidden="true"></span></span>';
			selectHtml += '<ul class="shipPageShipSelectorDropdown">';
			selectHtml += '<li id="showSkinPreviewDialog"><span>Show All</span></li>';
			firstShipImageFound = false;
			for (var skinName in skinList) {
				if (skinList[skinName] === false) {
					return false;
				}
				if (skinList[skinName] != "") {
					if (firstShipImageFound == false) {
						firstShipImageFound = skinList[skinName];
					}
					if (skinName != "Standard") {
						skinImagesFound = true;
					}

					//*** Pre-load images
					if (!$("#skinPreload_" + skinName).length) {
						$(skinList[skinName]).attr('id', "skinPreload_" + skinName).show().appendTo('#mw-content-text').hide();
					}
				}
				
				var extraAttr = "";
				var extraClass = "";
				if (skinName != "Standard") {
					extraClass = " skinMenuItem";
				} else {
					extraAttr = 'data-selected="selected"';
				}
				selectHtml += '<li id="' + skinName.replaceAll(' ', '') + 'SkinMenuItem"><span class="shipPageSelectorMenuItem' + extraClass + '"' + extraAttr + '>' + skinName + '</span></li>';
			}
			selectHtml += '</ul>';
			selectHtml += '</td>';
			selectHtml += '<td>';
			selectHtml += '<span id="skinSelectorAutoPlay" class="fas fa-play autoPlaySkinPlay"></span>';
			selectHtml += '</td>';
			selectHtml += '<tr>';
			selectHtml += '</tr></table>';
			selectHtml += '</li>';
			selectHtml += '</ul>';
			selectHtml += '</div>';

			if (skinImagesFound) {

				if (!$("figure[data-source=skinSelector]").length && $("figure[data-source=image1]").length) {
					$(selectHtml).insertAfter("figure[data-source=image1]");
				} else {
					console.log("Failed to add Ship Selector to page - anchor not found");
				}

				$(".shipPageSelectorMenuItem").click(function(){
					var isAutomatedClick = $(this).data('automatedClick');
					if (!isAutomatedClick && $('#skinSelectorAutoPlay').hasClass('fa-pause')) {
						$(".autoPlaySkinPlay").click();
					}
					$(this).data('automatedClick', false);

					var skinName = $(this).text();
					$('.shipPageSelectorMenu .menuTitle').text(skinName);
					$('.shipPageSelectorMenuItem').attr('data-selected', false);
					$(this).attr('data-selected', 'selected');

					var skinHtml = skinList[skinName];
					if (skinHtml == "") {
						skinHtml = missingImageOverlayHtml + '<span class="shipSkinMissingImageShipImage">' + firstShipImageFound + '</span>';
					}
					$("figure[data-source=image1]").html(skinHtml);

					if (!isAutomatedClick && skinPreviewDialog != false) {
						$('#' + skinName.replaceAll(' ', '') + 'SkinDialogItem').click();
					}
				});
				$(".autoPlaySkinPlay").click(function(){
					if ($('#skinSelectorAutoPlay').hasClass('fa-play')) {
						$('#skinSelectorAutoPlay').removeClass('fa-play').addClass('fa-pause');
						selectNextSkin();
						skinAutoPlayInterval = setInterval(function(){
							selectNextSkin();
						}, 3000);
					} else {
						clearInterval(skinAutoPlayInterval);
						$('#skinSelectorAutoPlay').removeClass('fa-pause').addClass('fa-play');
					}
				});
				$("#showSkinPreviewDialog").click(function(){
					showSkinPreviewDialog();
				});
				$("figure[data-source=image1]").click(function(){
					showSkinPreviewDialog();
				});

				$("#StandardSkinMenuItem span").click();

			} else {
				console.log("Hiding Ship Selector - No skin images found.");
			}
		}
	};

	var selectNextSkin = function(){
		var skinNameList = Object.keys(skinList);
		var selectedSkinName = 'Standard';
		if ($('.shipPageSelectorMenuItem[data-selected="selected"]').length) {
			selectedSkinName = $('.shipPageSelectorMenuItem[data-selected="selected"]').text();
		}
		var newSkinIdx = (skinNameList.indexOf(selectedSkinName) + 1) % skinNameList.length;
		var newSkinName = skinNameList[newSkinIdx];
		$('#' + newSkinName.replaceAll(' ', '') + 'SkinMenuItem span').data('automatedClick', true);
		$('#' + newSkinName.replaceAll(' ', '') + 'SkinMenuItem span').click();
	};

	var showSkinPreviewDialog = function(){
		if (skinPreviewDialog != false) {
			skinPreviewDialog.show();
			return;
		}
		
		var dialogHtml = '<div class="modal skinPreviewDialog">\n';
		dialogHtml += '<table cellspacing="0" cellpadding="0" border="0" class="shipSkinDialog">\n';
		var x = 0;
		var isFirstRow = true;
		var numPerRowDuringPreview = 4;
		var numPerRowAfterPreview = 7;
		var numOfPreviewRows = 3;
		var firstSkin = false;
		if ($('.shipPageSelectorMenuItem[data-selected="selected"]').length) {
			firstSkin = $('.shipPageSelectorMenuItem[data-selected="selected"]').text();
		}
		for (var skinName in skinList) {
			var imageHtml = skinList[skinName].replace(' class="shipPageSkinImage"', '');
			dialogHtml += '<td>\n';
			dialogHtml += '<div id="' + skinName.replaceAll(' ', '') + 'SkinDialogItem" class="skinDialogItem' + (firstSkin == false || firstSkin == skinName ? ' activeSkin' : '') + '" data-skinname="' + skinName + '">' + imageHtml + '</div>\n';
			dialogHtml += '</td>\n';
			if (!firstSkin)  firstSkin = skinName;
			if (++x == 2) {
				imageHtml = skinList[firstSkin].replace(' class="shipPageSkinImage"', '');
				dialogHtml += '<td colspan="3" rowspan="'+numOfPreviewRows+'">\n';
				dialogHtml += '<div class="shipSkinDialogPreviewImage">' + imageHtml + '</div>\n';
				dialogHtml += '</td>\n';
			}
			if (x <= numPerRowDuringPreview * numOfPreviewRows) {
				if (x % numPerRowDuringPreview == 0) {
					dialogHtml += '</tr><tr>';
				}
				if (x == numPerRowDuringPreview * numOfPreviewRows)
					x += 2;
			} else {
				if (x % numPerRowAfterPreview == 0) {
					dialogHtml += '</tr><tr>';
				}
			}
		}
		if (x % numPerRowAfterPreview > 0) {
			dialogHtml += '<td colspan="' + (x % numPerRowAfterPreview) + '">&nbsp;</td>';
		} else {
			dialogHtml = dialogHtml.substr(0, dialogHtml.length - 4);
		}
		dialogHtml += "</table>\n";
		dialogHtml += "</div>\n";

		skinPreviewDialog = new window.dev.modal.Modal({
			content: dialogHtml,
			id: 'skinPreviewDialog',
			size: 'large',
			isHTML: true,
			title: 'Standard'
		});
		skinPreviewDialog.create();
		skinPreviewDialog.show();


		$(".skinDialogItem").click(function(){
			if (skinPreviewDialogResetPreviewToActive != false) {
				clearTimeout(skinPreviewDialogResetPreviewToActive);
				skinPreviewDialogResetPreviewToActive = false;
			}

			var skinName = $(this).data("skinname");
			var skinNameDisplay = skinName;
			if (skinNameDisplay != 'Standard') {
				skinNameDisplay += ' Skin';
			}
			$('#skinPreviewDialog .oo-ui-processDialog-title').text(skinNameDisplay);
			$(".skinDialogItem.activeSkin").removeClass('activeSkin');
			$(this).addClass('activeSkin');

			var skinHtml = skinList[skinName];
			if (skinHtml == "") {
				skinHtml = missingImageOverlayHtml + '<span class="shipSkinMissingImageShipImage">' + firstShipImageFound + '</span>';
			}
			skinHtml = skinHtml.replace(' class="shipPageSkinImage"', '');
			$(".shipSkinDialogPreviewImage").html(skinHtml);

			if (!$('#skinSelectorAutoPlay').hasClass('fa-pause')) {
				$('#' + skinName.replaceAll(' ', '') + 'SkinMenuItem span').data('automatedClick', true);
				$("#" + skinName.replaceAll(" ", "") + "SkinMenuItem span").click();
			}
		});

		$(".skinDialogItem").mouseover(function(){
			if (skinPreviewDialogResetPreviewToActive != false) {
				clearTimeout(skinPreviewDialogResetPreviewToActive);
				skinPreviewDialogResetPreviewToActive = false;
			}

			var skinName = $(this).data("skinname");
			var skinNameDisplay = skinName;
			if (skinNameDisplay != 'Standard') {
				skinNameDisplay += ' Skin';
			}
			$('#skinPreviewDialog .oo-ui-processDialog-title').text(skinNameDisplay);
			$(this).addClass('highlightedSkin');

			var skinHtml = skinList[skinName];
			if (skinHtml == "") {
				skinHtml = missingImageOverlayHtml + '<span class="shipSkinMissingImageShipImage">' + firstShipImageFound + '</span>';
			}
			skinHtml = skinHtml.replace(' class="shipPageSkinImage"', '');
			$(".shipSkinDialogPreviewImage").html(skinHtml);
		});

		$(".skinDialogItem").mouseout(function(){
			if (skinPreviewDialogResetPreviewToActive != false) {
				clearTimeout(skinPreviewDialogResetPreviewToActive);
				skinPreviewDialogResetPreviewToActive = false;
			}
			skinPreviewDialogResetPreviewToActive = setTimeout(function(){
				$(".skinDialogItem.activeSkin").click();
			}, 200);
			$(this).removeClass('highlightedSkin');
		});
	};

	$( document ).ready(function() {
		if (isShipPage()) {
			bodyLoadComplete = true;

			mw.loader.using(['mediawiki.util'], function(){
				for (var skinName in skinList) {
					if (skinList[skinName] === false) {
						setImageHtmlForShipSkin(skinName);
					}
				}
			});
			importArticle({
				type: 'script',
				article: 'u:dev:MediaWiki:Modal.js'
			});

			showShipPageSkinDropdownWhenReady();
		}
	});
}());