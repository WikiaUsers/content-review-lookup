var NADNY_ORDERS_CONFIG = {
	userPageNS: 'User:',
	ordersDefaultPage: '/Orders/Zascianek',
	ordersPageLengthLimit: 800,
	ordersArchivePage: 'Archive'
};

function saveOrder(page, dish, price, annotation, vendor) {
	var params = {
		action: 'query',
		prop: 'info',
		intoken: 'edit',
		titles: page,
		indexpageids: '',
		format: 'json'
	};

	$.getJSON(
		wgScriptPath + '/api.php?',
		params,
		function(data) {
			if( data.query.pages && data.query.pageids ) {
				var pageid = data.query.pageids[0];
				var editToken = data.query.pages[pageid].edittoken;

				if( annotation ) {
					annotation = ' [' + annotation + ' - ' +  vendor + ']';
				} else {
					annotation = ' [' + vendor + '] ';
				}

				checkIfArticleIsFullAndAddTheOrder(editToken, page, dish, annotation, price, vendor);
			}
		}
	);
}

function checkIfArticleIsFullAndAddTheOrder(editToken, page, dish, annotation, price, vendor) {
	$.ajax({
		url: wgScriptPath + '/api.php',
		data: {
			format: 'json',
			action: 'query',
			titles: page,
			prop: 'info'
		},
		dataType: 'json',
		type: 'POST',
		success: function(data) {
			if( data && data.query && data.query.pages ) {
				var pages = data.query.pages, articleContentLength = 0;

				for(idx in pages) {
					if( pages[idx].length > 0 ) {
						var articleContent = pages[idx];
						articleContentLength += articleContent.length;
					}
				}

                                var annotationDiv = $('<div>').text( annotation );
                                annotation = annotationDiv.text();

				if( articleContentLength >= NADNY_ORDERS_CONFIG.ordersPageLengthLimit ) {
					// archive orders article and add to clean one orders' article
					archiveOrdersArticle(
						editToken,
						page,
						dish,
						annotation,
						price,
						vendor
					);
				} else {
					// just add to orders' article
					addToOrdersArticle(
						editToken,
						page,
						dish,
						annotation,
						price,
						vendor
					);
				}
			} else {
				alert('Błąd API... Skontaktuj się z nAndym lub wystaw P2');
			}
		}
	});
}

function addToOrdersArticle(editToken, page, dish, annotation, price, vendor) {
	var cd = new Date();
	var m = cd.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var day = (cd.getDate() < 10) ? '0' + cd.getDate() : cd.getDate();
	var articleText = cd.getFullYear() + '-' + month + '-' + day + '|' + dish + annotation + '|' + price + '|' + cd.getHours() + ':' + cd.getMinutes() + '|' + vendor + '$';
	var apiParams = {
		format: 'json',
		action: 'edit',
		title: page,
		summary: '',
		watchlist: 'unwatch',
		prependtext: articleText,
		token: editToken
	};
	var ajaxParams = {
		url: wgScriptPath + '/api.php',
		data: apiParams,
		dataType: 'json',
		type: 'POST',
		success: function( data ) {
			if ( data && data.edit && data.edit.result == 'Success' ) {
				//$().log('huzza!');
				alert(
					"Kupione!\n" + dish
						+ ' za ' + price + "PLN\n"
						+ "Smacznego!"
				);

				$('.WikiaMainContent').stopThrobbing();
			} else if ( data && data.error ) {
				//$().log( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				alert('Błąd API... Skontaktuj się z nAndym lub wystaw P2');
				$('.WikiaMainContent').stopThrobbing();
			} else {
				//$().log( 'Error: Unknown result from API.' );
				alert('Błąd API... Skontaktuj się z nAndym lub wystaw P2');
				$('.WikiaMainContent').stopThrobbing();
			}
		},
		error: function() {
			alert('Błąd API... Skontaktuj się z nAndym lub wystaw P2');
			$('.WikiaMainContent').stopThrobbing();
		}
	};

	$.when( $.ajax(ajaxParams) )
		.done(function() {
			$.ajax({url: 'http://nandytest.wikia.com/wiki/Orders?action=purge'});
		});
}

function archiveOrdersArticle(editToken, page, dish, annotation, price) {
	var params = {
		format: 'json',
		action: 'query',
		prop: 'revisions',
		titles: page,
		rvprop: 'content'
	};

	//get current content
	$.ajax({
		url: wgScriptPath + '/api.php',
		data: params,
		dataType: 'json',
		type: 'post',
		success: function(result) {
			if( result.query.pages ) {
				var ordersArticleContent = getContentFromResponse(result.query.pages, page);
				var apiParamsTruncate = {
					format: 'json',
					action: 'edit',
					title: page,
					summary: '',
					watchlist: 'unwatch',
					text: '',
					token: editToken
				};
				var ajaxParamsTruncate = {
					url: wgScriptPath + '/api.php',
					data: apiParamsTruncate,
					dataType: 'json',
					type: 'POST'
				};
				var apiParamsArchive = {
					format: 'json',
					action: 'edit',
					title: page + '/' + NADNY_ORDERS_CONFIG.ordersArchivePage,
					summary: '',
					watchlist: 'unwatch',
					prependtext: ordersArticleContent,
					token: editToken
				};
				var ajaxParamsArchive = {
					url: wgScriptPath + '/api.php',
					data: apiParamsArchive,
					dataType: 'json',
					type: 'POST'
				};

				//truncate orders' page and archive its content; once it's done add new order
				$.when( $.ajax(ajaxParamsTruncate), $.ajax(ajaxParamsArchive) )
					.done(function() {
						addToOrdersArticle(editToken, page, dish, annotation, price);
					});
			}
		},
		error: function() {
			alert('Błąd API... Skontaktuj się z nAndym lub wystaw P2');
			$('.WikiaMainContent').stopThrobbing();
		}
	});
}

function getContentFromResponse(responsePages, pageTitle) {
	var content = '';
	for(i in responsePages) {
		if( typeof(responsePages[i].title) !== 'undefined' && responsePages[i].title === pageTitle ) {
			var revisions = responsePages[i].revisions.shift();
			content = revisions['*'];
			break;
		}
	}

	return content;
}

$('.canOrder .buy').text('Kup teraz');

$('.canOrder .buy').click(function() {
	if (wgUserName !== null) {
		var dish = $(this).parents().first().find('td:first-child').text().trim();
		var price = $(this).parents().first().find('td:nth-child(2)').text().trim();
		var vendor = window.wgPageName || 'unknown';
		var annotation = prompt(
			"Zamawiasz:\n" + dish
				+ " za " + price + "PLN\n"
				+ " ze strony: " + vendor + "\n"
				+ "Uwagi do zamówienia:\n"
		);
		if (annotation != null) {
			$('.WikiaMainContent').startThrobbing();
			saveOrder(
				NADNY_ORDERS_CONFIG.userPageNS + wgUserName + NADNY_ORDERS_CONFIG.ordersDefaultPage,
				dish,
				price,
				annotation,
				vendor
			);
		}
		else {
			alert("Zamówienie anulowane. Jeśli jednak zmienisz zdanie - ZAPRASZAMY!")
		}
	}
	else {
		alert('Zaloguj się aby składać zamówienia');
	}
});

function drawTable(ordersArray) {
	var tableOutput = '<table class="wikitable">';
	var sum = 0;
	var orderCount = 0;
	tableOutput += '<tr>';
	tableOutput += '<th class="ordering">Lp</th>';
	tableOutput += '<th class="ordering">Miejsce</th>';
	// tableOutput += '<th class="ordering">Strona</th>';
	tableOutput += '<th class="venue">Data</th>';
	tableOutput += '<th class="user">Kupujący</th>';
	tableOutput += '<th class="product">Potrawa</th>';
	tableOutput += '<th class="price">Cena</th>';
	tableOutput += '</tr>';
	for (var i in ordersArray) {
		var orderLine = ordersArray[i].split('|'),
			vendor = orderLine[6] || 'unknown';

		if(typeof orderLine[4] !== 'undefined') {
			orderCount++;
			tableOutput += '<tr>';
			tableOutput += '<td class="ordering ">'+orderCount+'</td>';
			tableOutput += '<td class="venue">'+orderLine[0]+'</td>';
			// tableOutput += '<td class="venue">'+ vendor +'</td>';
			tableOutput += '<td class="venue">'+orderLine[2]+' '+orderLine[5]+'</td>';
			tableOutput += '<td class="user">'+orderLine[1]+'</td>';
			tableOutput += '<td class="product">'+orderLine[3]+'</td>';
			tableOutput += '<td class="price">'+orderLine[4]+' PLN</td>';
			tableOutput += '</tr>';
			sum += parseInt(orderLine[4], 10);
		}
	}
	tableOutput += '<tr class="summary">';
	tableOutput += '<td class="ordering">' + orderCount + '</td>';
	tableOutput += '<td colspan="4" class="legend">RAZEM</td>';
	tableOutput += '<td class="price">' + sum + ' PLN</td>';
	tableOutput += '</tr></table>';
	return tableOutput;
}

$(function() {
	var ordersArray = $('.ordersdata').text().trim().replace('\n','').split('$');
	var dailyOrders = new Array();
	ordersArray.forEach(function(element, index, array) {
		if (element.trim() !== '') {
			var tempArr = element.trim().split('|');
			dailyOrders.push(tempArr[2]);
		}
	});
	dailyOrders = $.unique(dailyOrders);
	dailyOrders = $.unique(dailyOrders);
	dailyOrders = dailyOrders.sort();
	dailyOrders = dailyOrders.reverse();
	var ordersOutput = '';
	var tempArray = new Array();
	var dailyOrdersLen = dailyOrders.length;
	for (i = 0; i < dailyOrdersLen; i++) {
		ordersOutput += '<h2>' + dailyOrders[i] + ':</h2><br />';
		tempArray = new Array();
		var ordersArrayLen = ordersArray.length;
		for (j = 0; j < ordersArrayLen; j++) {
			if (ordersArray[j].trim() !== '') {
				var tempArr = ordersArray[j].trim().split('|');
				if (tempArr[2] == dailyOrders[i]) {
					tempArray.push(ordersArray[j].trim());
				}
			}
		}
		ordersOutput += drawTable(tempArray);
	}
	$('.ordersview').append(ordersOutput);
});