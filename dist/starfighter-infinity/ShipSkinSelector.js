(function(){
	var skinPreviewDialog = false;
	var orgColorDialog = false;
	var bodyLoadComplete = false;
	var skinAutoPlayInterval = false;
	var skinPreviewDialogResetPreviewToActive = false;
	var firstShipImageFound = false;
	
	var missingImageOverlayUrl = 'https://static.wikia.nocookie.net/starfighter-infinity/images/e/ef/Ship_MissingSkinOverlay.png/revision/latest';
	var missingImageOverlayHtml = '<img class="shipSkinMissingImageOverlay" src="' + missingImageOverlayUrl + '">';
	
	var colorWheelImageHtml = false;
	var orgColorAnimation = false;
	var orgColorAnimation2 = false;

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
			selectHtml += '<span id="orgColorDialogButton" class="orgColorDialogButton">';
			if (colorWheelImageHtml != false) {
				selectHtml += colorWheelImageHtml;
			}
			selectHtml += '</span>';
			selectHtml += '</td>';
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
				//*** Initialize skin preview dialog
				mw.hook('dev.modal').add(function(modal) {
					showSkinPreviewDialog(true);
				});
				
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
					if ($("#skinMainShipImage").length == 0) {
						$("figure[data-source=image1]").html('<span id="skinMainShipImage">' + skinHtml + '</span>');
					} else {
						$("#skinMainShipImage").replaceWith('<span id="skinMainShipImage">' + skinHtml + '</span>');
					}

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
				mw.hook('dev.modal').add(function(modal) {
					$("#showSkinPreviewDialog").click(function(){
						showSkinPreviewDialog();
					});
					$("figure[data-source=image1]").click(function(){
						showSkinPreviewDialog();
					});
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




	//*** Begin Skin Preview Dialog Section

	var showSkinPreviewDialog = function(initOnly){
		if (skinPreviewDialog != false) {
			skinPreviewDialog.show();
			return;
		}

		var x = 0;
		var isFirstRow = true;
		var numPerRowDuringPreview = 4;
		var numPerRowAfterPreview = 7;
		var numOfPreviewRows = 3;
		var firstSkin = false;
		if ($('.shipPageSelectorMenuItem[data-selected="selected"]').length) {
			firstSkin = $('.shipPageSelectorMenuItem[data-selected="selected"]').text();
		}

		var dialogHtml = '<div class="modal skinPreviewDialog">\n';
		dialogHtml += '<table cellspacing="0" cellpadding="0" border="0" class="shipSkinDialog">\n';
		for (var skinName in skinList) {
			var imageHtml = skinList[skinName].replace(' class="shipPageSkinImage"', '');
			dialogHtml += '<td>\n';
			dialogHtml += '<div id="' + skinName.replaceAll(' ', '') + 'SkinDialogItem" class="skinDialogItem' + (firstSkin == false || firstSkin == skinName ? ' activeSkin' : '') + '" data-skinname="' + skinName + '">' + imageHtml + '</div>\n';
			dialogHtml += '</td>\n';
			if (!firstSkin)  firstSkin = skinName;
			if (++x == 2) {
				imageHtml = skinList[firstSkin].replace(' class="shipPageSkinImage"', '');
				dialogHtml += '<td colspan="3" rowspan="'+numOfPreviewRows+'">\n';
				dialogHtml += '<div class="shipSkinDialogPreviewImage"><span id="skinDialogShipImage">' + imageHtml + '</span></div>\n';
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
			buttons: [
				{
					classes: ['orgColorDialogButton'],
					id: 'orgColorDialogButtonSkinPreview',
					primary: true,
					text: ' ',
					event: 'custom'
				}
			],
			content: dialogHtml,
			id: 'skinPreviewDialog',
			size: 'large',
			isHTML: true,
			title: 'Standard',
			events: {
				custom: function(){ skinPreviewDialog.close(); showOrgColorDialog(); }
			}
		});
		skinPreviewDialog.create().then(function(r){
			console.log("skinPreviewDialog.create complete");
			setUpOrgColorOverlay();

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
				$("#skinDialogShipImage").replaceWith('<span id="skinDialogShipImage">' + skinHtml + '</span>');

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
				$("#skinDialogShipImage").replaceWith('<span id="skinDialogShipImage">' + skinHtml + '</span>');
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
			
			$(".orgColorDialogButton").click(function(){
				showOrgColorDialog();
			});
		});

		if (!initOnly)  skinPreviewDialog.show();
	};

	//*** End Skin Preview Dialog Section



	//*** Begin Org Color Overlay Section

	var isPixelWithinRangeOfColor = function(pixel, targetColor, range) {
		if (range === undefined)  range = 8;

		var hslTarget = RGBToHSL(targetColor);
		var rangeDegrees = 360 * range / 100;
		var rangeStart = hslTarget[0] - rangeDegrees;
		if (rangeStart < 0)  rangeStart = 360 + rangeStart;
		var rangeEnd = hslTarget[0] + rangeDegrees;
		if (rangeEnd < 0)  rangeEnd = 360 - rangeEnd;

		if (pixel[3] > 0) {  //*** Ignore any transparent pixels
			var hslPixel = RGBToHSL(pixel);
			if (hslPixel[1] > 20 && hslPixel[2] > 6) {
				if (rangeStart > rangeEnd) {
					if (hslPixel[0] >= rangeStart || hslPixel[0] <= rangeEnd) {
						return true;
					}
				} else {
					if (hslPixel[0] >= rangeStart && hslPixel[0] <= rangeEnd) {
						return true;
					}
				}
			}
		}
		return false;
	};

	//***  Taken from https://css-tricks.com/converting-color-spaces-in-javascript/
	var RGBToHSL = function(pixel) {
	  // Make r, g, and b fractions of 1
	  var r = pixel[0] / 255;
	  var g = pixel[1] / 255;
	  var b = pixel[2] / 255;

	  // Find greatest and smallest channel values
	  var cmin = Math.min(r,g,b);
	  var cmax = Math.max(r,g,b);
	  var delta = cmax - cmin;
	  var h = 0;
	  var s = 0;
	  var l = 0;

	  // Calculate hue
	  // No difference
	  if (delta == 0)
		h = 0;
	  // Red is max
	  else if (cmax == r)
		h = ((g - b) / delta) % 6;
	  // Green is max
	  else if (cmax == g)
		h = (b - r) / delta + 2;
	  // Blue is max
	  else
		h = (r - g) / delta + 4;

	  h = Math.round(h * 60);

	  // Make negative hues positive behind 360°
	  if (h < 0)
		  h += 360;

	  // Calculate lightness
	  l = (cmax + cmin) / 2;

	  // Calculate saturation
	  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	  // Multiply l and s by 100
	  s = +(s * 100).toFixed(1);
	  l = +(l * 100).toFixed(1);

	  return [h, s, l];
	};

	//***  Taken from https://css-tricks.com/converting-color-spaces-in-javascript/
	var RGBToHex = function (pixel) {
	  var r = pixel[0].toString(16);
	  var g = pixel[1].toString(16);
	  var b = pixel[2].toString(16);

	  if (r.length == 1)
		r = "0" + r;
	  if (g.length == 1)
		g = "0" + g;
	  if (b.length == 1)
		b = "0" + b;

	  return "#" + r + g + b;
	};

	//***  Taken from https://css-tricks.com/converting-color-spaces-in-javascript/
	var hexToRGB = function (h) {
	  var r = 0, g = 0, b = 0;
	  h = h.replace(/#/, '');

	  // 3 digits
	  if (h.length == 3) {
		r = "0x" + h[0] + h[0];
		g = "0x" + h[1] + h[1];
		b = "0x" + h[2] + h[2];

	  // 6 digits
	  } else if (h.length == 6) {
		r = "0x" + h[0] + h[1];
		g = "0x" + h[2] + h[3];
		b = "0x" + h[4] + h[5];
	  }
	  
	  return [+r, +g, +b];
	};

	var isHumanShipPage = function(){
		return $('div[data-source="race"] div.pi-data-value').filter(function(){return $(this).text() == "Humans";}).length;
	};

	var getBaseOrgColor = function(){
		//var targetColor = [255, 0, 0];  //*** Aralien Red  #ff0000
		//if (isHumanShipPage())  targetColor = [81, 154, 255];  //*** Human Blue  #519AFF
		var targetColor = hexToRGB('#f31d1c');  //*** Aralien Red
		if (isHumanShipPage())  targetColor = hexToRGB('#126d9a');  //*** Human Blue  #519AFF
		return targetColor;
	};

	var setUpOrgColorOverlay = function(){
		var c, ctx, img, imgData;
		var shipName = getShipName();

		if (!$("#orgColorCanvasDialog").length)
			$('<canvas id="orgColorCanvasDialog" class="orgColorCanvas orgColorCanvas'+shipName+'" width="400" height="300"></canvas>').insertBefore("#skinDialogShipImage");
		if (!$("#orgColorCanvasMain").length)
			$('<canvas id="orgColorCanvasMain" class="orgColorCanvas orgColorCanvas'+shipName+'" width="400" height="300"></canvas>').insertBefore("#skinMainShipImage");

		c = document.getElementById("orgColorCanvasDialog");
		if (c) {
			ctx = c.getContext("2d");
			img = $(".shipSkinDialogPreviewImage img")[0];
			ctx.drawImage(img, 0, 0);
			imgData = ctx.getImageData(0, 0, c.width, c.height);

			var targetColor = getBaseOrgColor();
			for (var i = 0; i < imgData.data.length; i += 4) {
				var pixel = imgData.data.slice(i, i + 4);

				if (!isPixelWithinRangeOfColor(pixel, targetColor)) {
					imgData.data[i + 3] = 0;
				}
			}

			ctx.putImageData(imgData, 0, 0);
			
			c = document.getElementById("orgColorCanvasMain");
			if (c) {
				ctx = c.getContext("2d");
				ctx.putImageData(imgData, 0, 0);
			} else {
				console.log("Main ship image overlay not found.");
			}
			
			applyOrgColorFromCookie();
		} else {
			console.log("Dialog preview image overlay not found.");
		}
	};

	var startAnimation = function(){
		var c = document.getElementById("orgColorCanvasMain");
		if (c) {
			orgColorAnimation = c.animate({
				filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
			}, {
				duration: 10000,
				iterations: Infinity
			});
		}
		c = document.getElementById("orgColorCanvasDialog");
		if (c) {
			orgColorAnimation2 = c.animate({
				filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
			}, {
				duration: 10000,
				iterations: Infinity
			});
		}

		$(".orgColorDialogButton img").css('background', 'linear-gradient( 90deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100% )');
	};

	var changeOrgColor = function(newOrgColor){
		var startingColor = getBaseOrgColor();
		var hslStart = RGBToHSL(startingColor);
		var hslEnd = RGBToHSL(newOrgColor);
		var hueShiftAmount = Math.round(hslEnd[0] - hslStart[0]);
		if (orgColorAnimation != false) {
			orgColorAnimation.cancel();
			orgColorAnimation = false;
		}
		if (orgColorAnimation2 != false) {
			orgColorAnimation2.cancel();
			orgColorAnimation2 = false;
		}
		$("#orgColorCanvasMain")[0].style.filter = 'hue-rotate(' + hueShiftAmount + 'deg) ' + 'saturate(' + (hslEnd[1] / hslStart[1] * 100) + '%) ' +  'brightness(' + (hslEnd[2] / hslStart[2] * 100) + '%)';
		$("#orgColorCanvasDialog")[0].style.filter = 'hue-rotate(' + hueShiftAmount + 'deg) ' + 'saturate(' + (hslEnd[1] / hslStart[1] * 100) + '%) ' +  'brightness(' + (hslEnd[2] / hslStart[2] * 100) + '%)';
		console.log("changeOrgColor ", hslStart, hslEnd);

		$(".orgColorDialogButton img").css('background', RGBToHex(newOrgColor));
	};

	//*** End Org Color Orverlay Section



	//*** Begin Org Color Selection Dialog Section
	var getOrgColorCookie = function() {
		var value = "; " + document.cookie;
		var parts = value.split("; starfighterInfinityOrgColor=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};

	var setOrgColorCookie = function(colorValue){
		var expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 365.24 * 10);  // 10 years

		var cookieString = "starfighterInfinityOrgColor=" + encodeURIComponent(colorValue) + ";domain=starfighter-infinity.fandom.com;path=/";
		cookieString += ";expires=" + expirationDate.toGMTString();
		document.cookie = cookieString;
	};
	var clearOrgColorCookie = function(){
		var cookieString = "starfighterInfinityOrgColor=;domain=starfighter-infinity.fandom.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = cookieString;
	};

	var updateOrgColorSelect = function(){
		var hexVal = $("#orgColorSelect").val();
		console.log("updateOrgColorSelect called: ", hexVal);
		if (hexVal == 'Rainbow') {
			startAnimation();
			setOrgColorCookie('Random');  //*** Set the cookie to random
		} else if (hexVal == 'Custom') {
			//*** Set the cookie to the last color value on the sliders
			var r = $("#redColorSlider").val();
			var g = $("#greenColorSlider").val();
			var b = $("#blueColorSlider").val();
			setOrgColorCookie(RGBToHex([+r, +g, +b]));
			changeOrgColor([+r, +g, +b]);
		} else if (hexVal == 'Default') {
			changeOrgColor(getBaseOrgColor());
			clearOrgColorCookie();  //*** Clear the cookie
		} else {
			var pixel = hexToRGB(hexVal);

			$("#redColorDisplay").text(pixel[0]);
			$("#greenColorDisplay").text(pixel[1]);
			$("#blueColorDisplay").text(pixel[2]);
			$("#redColorSlider").val(pixel[0]);
			$("#greenColorSlider").val(pixel[1]);
			$("#blueColorSlider").val(pixel[2]);
			$(".colorPreview").css("background-color", hexVal);

			changeOrgColor(hexToRGB(hexVal));
			setOrgColorCookie(hexVal);  //*** Set the cookie to the color given
		}
	};

	var updateOrgColorSlider = function(){
		var r = $("#redColorSlider").val();
		var g = $("#greenColorSlider").val();
		var b = $("#blueColorSlider").val();
		var hexVal = RGBToHex([+r, +g, +b]);

		$("#redColorDisplay").text(r);
		$("#greenColorDisplay").text(g);
		$("#blueColorDisplay").text(b);
		$(".colorPreview").css("background-color", hexVal);

		$("#orgColorSelect").val('Custom');
		changeOrgColor(hexToRGB(hexVal));
		setOrgColorCookie(hexVal);  //*** Set the cookie to the color given
	};

	var showOrgColorDialog = function(initOnly){
		if (orgColorDialog == false) {
			initializeOrgColorDialog();
		}

		orgColorDialog.show();
		return;
	}

	var initializeOrgColorDialog = function(){
		var dialogHtml = '<div class="modal orgColorSelector">\n';
		dialogHtml += '<table cellspacing="0" cellpadding="0" border="0" class="rgbTable">\n';
		dialogHtml += '<tr id="redRow">\n';
		dialogHtml += '  <td>Red</td>\n';
		dialogHtml += '  <td>\n';
		dialogHtml += '    <div class="slider">\n';
		dialogHtml += '      <input type="range" id="redColorSlider" class="orgColorSlider" min="0" max="255" value="0">\n';
		dialogHtml += '      <p id="redColorDisplay">0</p>\n';
		dialogHtml += '    </div>\n';
		dialogHtml += '  </td>\n';
		dialogHtml += '  <td rowspan="3" class="colorPreviewCell">\n';
		dialogHtml += '    <div class="colorPreview"><span></span></div>\n';
		dialogHtml += '  </td>\n';
		dialogHtml += '</tr>\n';
		dialogHtml += '<tr id="greenRow">\n';
		dialogHtml += '  <td>Green</td>\n';
		dialogHtml += '  <td>\n';
		dialogHtml += '    <div class="slider">\n';
		dialogHtml += '      <input type="range" id="greenColorSlider" class="orgColorSlider" min="0" max="255" value="0">\n';
		dialogHtml += '      <p id="greenColorDisplay">0</p>\n';
		dialogHtml += '    </div>\n';
		dialogHtml += '  </td>\n';
		dialogHtml += '</tr>\n';
		dialogHtml += '<tr id="blueRow">\n';
		dialogHtml += '  <td>Blue</td>\n';
		dialogHtml += '  <td>\n';
		dialogHtml += '    <div class="slider">\n';
		dialogHtml += '      <input type="range" id="blueColorSlider" class="orgColorSlider" min="0" max="255" value="0">\n';
		dialogHtml += '      <p id="blueColorDisplay">0</p>\n';
		dialogHtml += '    </div>\n';
		dialogHtml += '  </td>\n';
		dialogHtml += '</tr>\n';
		dialogHtml += '<tr id="hexRow">\n';
		dialogHtml += '  <td colspan="99"></td>\n';
		dialogHtml += '</tr>\n';
		dialogHtml += '<tr id="selectRow">\n';
		dialogHtml += '  <td colspan="99">\n';
		dialogHtml += '    <select id="orgColorSelect">\n';
		dialogHtml += '      <option value="Custom">Custom</option>\n';
		dialogHtml += '      <option value="Default">Default</option>\n';
		dialogHtml += '      <option value="#ff0000">Empire Red</option>\n';
		dialogHtml += '      <option value="#519aff">Alliance Blue</option>\n';
		// dialogHtml += '      <option value="#d0e92c">Freedom Yellow</option>\n';
		dialogHtml += '      <option value="#fffe12">Freedom Yellow</option>\n';
		dialogHtml += '      <option value="Rainbow">Rotating Colors</option>\n';
		dialogHtml += '    </select>\n';
		dialogHtml += '  </td>\n';
		dialogHtml += '</tr>\n';
		dialogHtml += "</table>\n";
		dialogHtml += "</div>\n";

		orgColorDialog = new window.dev.modal.Modal({
			content: dialogHtml,
			id: 'orgColorDialog',
			size: 'large',
			isHTML: true,
			title: 'Select Org Color'
		});
		orgColorDialog.create().then(function(r){
			$(".orgColorSlider").on('input', function(){
				updateOrgColorSlider();
			});
			$("#orgColorSelect").on('change', function(){
				updateOrgColorSelect();
			});
		});
	};

	//*** End Org Color Selection Dialog Section

	
	var applyOrgColorFromCookie = function(){
		var orgColor = getOrgColorCookie();
		if (orgColor === undefined)
			return false;
		orgColor = orgColor.replace("%23", "#");
		
		if (orgColor == "Random") {
			startAnimation();
		} else if (orgColor != "") {
			console.log(orgColor);
			changeOrgColor(hexToRGB(orgColor));
		}
	};


	$( document ).ready(function() {
		if (isShipPage()) {
			bodyLoadComplete = true;

			loadImageUrlFromApi('Color wheel.png', function(d){
				try {
					for (var idx in d.query.pages) {
						var colorWheelImageUrl = d.query.pages[idx].imageinfo[0].url;
						colorWheelImageHtml = '<img class="orgColorPicker" src="' + colorWheelImageUrl + '" crossOrigin="anonymous">';
						$(".orgColorDialogButton").html(colorWheelImageHtml);
						console.log("orgColorDialogButton loading complete");
					}
				} catch (e) {
					console.log("Failed loading color wheel image. ", e);
				}
			}, function(errMsg) {
				console.log('error getting color wheel image url', errMsg);
			});

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

			mw.hook('dev.modal').add(function(modal) {
				initializeOrgColorDialog();
			});

			showShipPageSkinDropdownWhenReady();
		}
	});
}());