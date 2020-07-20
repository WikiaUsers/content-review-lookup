/* <nowiki> */
var button;
addOnloadHook(function() {
    $('.createrv').html('<b>Create item price:</b><br><button id="createRVP" onclick="createRVPrice()">Create price</button><input type="text" id="CreateRVPrice" placeholder="RV Price">');
    button = document.getElementById('createRVP');
});

function RVCreateDone(failed) {
	if(!failed) {
		alert('Thank you for creating the RV pages.');
		document.location.replace(wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=purge');
	} else {
		alert('An error occurred while submitting the edit.');
		button.disabled = false;
		button.innerHTML = 'Update price';
	}
}
 
function createRVPrice() {
	reqs = 0;
	button.disabled = true;
	button.innerHTML = 'Updating price...';
	window.createprice = $('#CreateRVPrice').val().replace(/,/g,'');
	if(Math.floor(createprice) == createprice)
		createUpdates();
	else {
		alert('The value you entered is not a number.');
		button.disabled = false;
		button.innerHTML = 'Update price';
	}
}
 
function createUpdates() {
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': "RareValues:" + wgPageName,
		'rvlimit': '1',
		'indexpageids': 'true'
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var updated = "{{RVItem\n|View={{{View}}}\n|Icon=<!-- Image file name, without 'File:' -->\n|Item=" + wgTitle + "\n|ItemId=<!-- The id of the furniture -->\n|Price=" + createprice + "\n|Last=" + createprice + "\n|Date=~~~~~\n|LastDate=~~~~~\n|Category=<!-- Market Watch item category - to help sort items on full list -->\n|Motto=<!-- Motto text of the item -->\n}}<noinclude>\n{{RareValues:{{PAGENAME}}/Data}}\n</noinclude>";
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Creating RV page via script on the furni page.',
			'action': 'edit',
			'title': "RareValues:" + wgPageName,
			'basetimestamp': page.starttimestamp,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': updated
		}, 'POST', function(response) {
			if(response.edit.result == 'Success') {
				createData();
			} else {
				RVCreateDone(true);
			}
		});
	});
}
 
function createData() {
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': "RareValues:" + wgPageName + "/Data",
		'rvlimit': '1',
		'indexpageids': 'true'
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var updated = "{{ExcgData|name=" + wgTitle + "|size={{{size|}}}|\n" + Math.round(new Date()/1000) + ":" + createprice + "\n}}";
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Creating RV Data via script on the RareValues page.',
			'action': 'edit',
			'title': "RareValues:" + wgPageName + "/Data",
			'basetimestamp': page.starttimestamp,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': updated
		}, 'POST', function(response) {
			if(response.edit.result == 'Success') {
				RVCreateDone();
			} else {
				RVCreateDone(true);
			}
		});
	});
}
/* </nowiki> */