//<nowiki>

if (wgCanonicalNamespace == 'Marketplace' && !getCookie('ign').length) {
	var name = prompt('What is your in-game name?')
	if (name != null && name != 'null' && name.length) {
		setCookie('ign',name,1000)
	} else {
		alert('This marketplace only works if you enter your in-game name. Please reload this page if you want to enter your name and use the marketplace.');
	}
}

$(function(){
$('.shoptable th b').click(function() {
	if ($(this).parents('.shoptable').is('.collapsed')) {
		$(this).parents('.shoptable').removeClass('collapsed');
		$(this).html('Close window')
	} else {
		$(this).parents('.shoptable').addClass('collapsed');
		$(this).html('Open shop')
	}
})

$('.money').attr('contenteditable','true').html(getCookie('shopMoney').length?getCookie('shopMoney'):'0').keyup(function() {
	var cookieval = parseInt($(this).html().replace(/\s/g,''));
	cookieval = cookieval?cookieval:'';
	setCookie('shopMoney',cookieval,1000);
});
$('.info td+td+td').click(function() {$(this).find('.money').focus();}).attr('title','click to change the amount of money you have.');
if (wgCanonicalNamespace == 'Marketplace') {
	$('h2').attr('data-section', function() {
		return $(this).find('.editsection a').attr('href').replace(/.*?(\d+)$/, '$1');
	})
}
})

$(function(){
$('td[colspan="2"][title]').click(function() {
	var table = $(this).parents('.shoptable');
	table.find('.select').removeClass('select');
	$(this).addClass('select');
	var item = $(this).attr('class').replace(/.*itemname-([^ ]*).*/,'$1').replace(/_/g,' ');
	var price = $(this).attr('title').replace('gp','');
	var amount = parseInt($(this).children('.stock').html());
	if (amount != 0) {
		var amounts = '<b data-amount="1">1</b>'+(amount>=5?'<b data-amount="5">5</b>':'')+(amount>=10?'<b data-amount="10">10</b>':'')+(amount>=50?'<b data-amount="50">50</b>':'');
		table.find('.buy').html('<td colspan="12" style="text-align:left;">'+item+': buy for '+price+'gp each</td><td colspan="5">Buy:'+amounts+'<b style="float:right;" data-amount="X">X</b></td><td></td>');
		table.find('.sell').html('<td colspan="18">You do not have any of this item to sell</td>')
	} else {
		amount = parseInt($(this).find('.carried').html());
		var amounts = '<b data-amount="1">1</b>'+(amount>=5?'<b data-amount="5">5</b>':'')+(amount>=10?'<b data-amount="10">10</b>':'')+(amount>=50?'<b data-amount="50">50</b>':'');
		table.find('.sell').html('<td colspan="12" style="text-align:left;">'+item+': sell for '+price+'gp each</td><td colspan="5">Sell:'+amounts+'<b style="float:right;" data-amount="X">X</b></td><td></td>');
		table.find('.buy').html('<td colspan="18">This item is currently not available to buy</td>');
	}
	var itemtd = this;
	if (wgCanonicalNamespace == 'Marketplace' && getCookie('ign').length) {
		table.find('.buy b, .sell b').click(function() {
			var thisb = this;
			submitOffer(itemtd,thisb)
		});
	}
})

$('.removeOffer').each(function() {
	if (getCookie('ign') == $(this).parents('table.offers').prev('.shoptable').prevAll('h2').eq(0).children('.mw-headline').html() || $(this).is('tr.'+getCookie('ign')+' .removeOffer')) {
		$(this).html('<a href="#" onclick="event.preventDefault();removeOffer(this);" title="Remove this offer (for example when the offer is completed or you reject the offer).">(remove)</a>')
	}
})
if (wgCanonicalNamespace == 'Marketplace') {
	$('table.offers').each(function() {
		$(this).find('tr+tr').each(function(i) {
			$(this).attr('data-pos',i);
		})
	})
}
})

function submitOffer(itemtd,thisb) {
	var thistd = $(itemtd);
	var amount = parseInt($(thisb).attr('data-amount'));
	amount = amount?amount:prompt('Type the number of items to buy and press enter');
	if (!amount) {return false;}
	amount = parseInt(amount);
	if (!amount) { alert('The amount you entered is not a number.'); return false; }
	var stock = parseInt(thistd.children('.stock').html());
	stock = stock==0?parseInt(thistd.children('.carried').html()):stock;
	var type = $(thisb).is('.buy b')?'buy':'sell';
	if (amount > stock) { alert('The amount you entered is bigger than the '+(type=='buy'?'shop stocks':'buy offer')+'. Please enter an amount smaller than '+stock+'.'); return false;}
	var item = thistd.children('img').attr('alt').replace(/\.\w{2,4}$/,'');
	var section = thistd.parents('table.shoptable').prevAll('h2').eq(0).attr('data-section');
	var sectname = thistd.parents('table.shoptable').prevAll('h2').eq(0).children('.mw-headline').html();
	var sectid = thistd.parents('table.shoptable').prevAll('h2').eq(0).children('.mw-headline').attr('id');
	var price = parseInt(thistd.attr('title').replace('gp',''));
	if (!confirm('Are you sure you want to place an offer to '+type+' '+amount+' '+item+'s for '+(amount*price)+'gp?')) {return false;}
	var template = '{{Marketplace offer|name='+getCookie('ign')+'|do='+type+'|item='+item+'|amount='+amount+'|price='+(amount*price)+'}}';
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info|revisions',
		'intoken':'edit',
		'rvprop':'content|ids',
		'rvlimit':'1',
		'indexpageids':'true',
		'rvsection':section,
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var content = typeof(page.revisions)!="undefined"?page.revisions[0]['*']:'';
		content = content.replace(/\|\}\s*$/, template + '\n|}');
		callAPI({
			'action':'edit',
			'title':wgPageName,
			'section':section,
			'token':page.edittoken,
			'text':content,
			'summary':'/*'+sectname+'*/ Adding offer to '+type+' items.',
			'minor':'true',
		}, 'POST', function(response) {
			document.location.hash = sectid;
			document.location.reload()
		})
	})
}

function removeOffer(thisrow) {
	var pos = $(thisrow).parents('tr').attr('data-pos');
	var section = $(thisrow).parents('table.offers').prev('table.shoptable').prevAll('h2').eq(0).attr('data-section');
	var sectid = $(thisrow).parents('table.offers').prev('table.shoptable').prevAll('h2').eq(0).children('.mw-headline').attr('id');
	var regex = new RegExp('({{Marketplace offers}}\n(.*\n){'+pos+'}).*\n');
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info|revisions',
		'intoken':'edit',
		'rvprop':'content|ids',
		'rvlimit':'1',
		'indexpageids':'true',
		'rvsection':section,
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var content = typeof(page.revisions)!="undefined"?page.revisions[0]['*']:'';
		content = content.replace(regex, '$1');
		callAPI({
			'action':'edit',
			'title':wgPageName,
			'section':section,
			'token':page.edittoken,
			'text':content,
			'summary':'Removing completed/rejected offer',
			'minor':'true',
		}, 'POST', function(response) {
			document.location.hash = sectid;
			document.location.reload()
		})
	})
}

/* CODE TO ADD NEW MARKETPLACE SHOPS */

$(function() {
	if (!getCookie('ign').length) {return false;}
	$('#addnew').html('<button onclick="openAddShopForm();">Add or edit personal shop</button>');
	$('h2:contains('+getCookie('ign')+')').after(function() {
		return '<br/><div><button onclick="openEditShopForm('+$(this).attr('data-section')+')">Edit personal shop</button> <button onclick="removeShop('+$(this).attr('data-section')+')">Remove shop</button></div>';
	})
})

function openAddShopForm() {
	var selector = '.mw-headline:contains('+getCookie('ign')+')'
	if ($(selector).length) {
		document.location.hash = $(selector).attr('id');
		openEditShopForm($(selector).parent().attr('data-section'));
		return false;
	}
	$('#addnew').after('<form action="javascript:addNewShop()" class="shopaddform"><div data-pos="1"><label>Item name: <input type="text" name="item"></label> <label>Amount: <input type="text" name="amount"></label> <label>Price: <input type="text" name="price"></label><a href="javascript:removeLine(1)">Remove</a></div><div class="buttons"><input type="submit" value="Submit shop"><button onclick="event.preventDefault();addItemRow()">Add another item</button></div></form>')
	$('#addnew').remove();
}

function addNewShop() {
	var content = '{{Shop|user=' + getCookie('ign');
	var pos;
	$('.shopaddform div[data-pos]').each(function() {
		pos = $(this).attr('data-pos');
		content += '\n|'+ $(this).find('[name="item"]').val()+ '|a'+ pos + '='+ $(this).find('[name="amount"]').val()+ '|p'+ pos + '='+ $(this).find('[name="price"]').val().replace('gp','');
	})
	content += '\n}}\n\n{{Marketplace offers}}\n|}';
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info',
		'intoken':'edit',
		'indexpageids':'true',
	}, 'GET', function(response) {
		var edittoken = response.query.pages[response.query.pageids[0]].edittoken;
		callAPI({
			'action':'edit',
			'section':'new',
			'title':wgPageName,
			'token':edittoken,
			'summary':getCookie('ign'),
			'minor':'true',
			'text':content
		}, 'POST', function(response) {
			document.location.hash = getCookie('ign').replace(' ','_');
			document.location.reload();
		});
	});
}

function openEditShopForm(section) {
	$('.shopaddform').remove();
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info|revisions',
		'intoken':'edit',
		'rvprop':'content|ids',
		'rvlimit':'1',
		'indexpageids':'true',
		'rvsection':section,
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var content = typeof(page.revisions)!="undefined"?page.revisions[0]['*']:'';
		var template = content.replace(/^(.*\n+{{Shop\|user=.*\n)((.|\n)+?)(\n+}}(.|\n)*)$/, '$2');
		var params;
		var lines = template.replace(/^\n+|\n+$/g,'').split('\n');
		var divs = []
		for (i=0;i<lines.length;i++) {
			params = lines[i].replace(/^\|/,'').replace(/\|..=/g,'|').split('\|');
			divs[i] = '<div data-pos="'+(i+1)+'"><label>Item name: <input type="text" name="item" value="'+params[0]+'"></label> <label>Amount: <input type="text" name="amount" value="'+params[1]+'"></label> <label>Price: <input type="text" name="price" value="'+params[2]+'"></label><a href="javascript:removeLine('+(i+1)+')">Remove</a></div>';
		}
		$('[data-section="'+section+'"]').after('<form action="javascript:editShop('+section+')" class="shopaddform">\n'+divs.join('\n')+'\n<tr><div><input type="submit" value="Submit changes"> <button onclick="event.preventDefault();addItemRow()">Add another item</button> <button onclick="event.preventDefault();openAddShopForm();">Reset</button>  <button onclick="event.preventDefault();$(this).parents(\'form\').eq(0).remove();">Cancel</button></div></form>');
	});
}

function removeLine(pos) {
	$('.shopaddform div[data-pos="'+pos+'"]').remove();
	$('.shopaddform div[data-pos]').each(function(i) {
		$(this).attr('data-pos',i+1);
	})
}

function addItemRow() {
	var lastchild = $('.shopaddform div:last-child');
	if (parseInt(lastchild.prev().attr('data-pos')) == 40) {
		alert('You can only have a maximum of 40 items in a shop.');
		return false;
	}
	if (lastchild.prev().find('input[name="item"]').val() != '' && lastchild.prev().find('input[name="amount"]').val() != '' && lastchild.prev().find('input[name="price"]').val() != '') {
		lastchild.before('<div data-pos="'+ (parseInt(lastchild.prev().attr('data-pos'))+1) +'"><label>Item name: <input type="text" name="item"></label> <label>Amount: <input type="text" name="amount"></label> <label>Price: <input type="text" name="price"></label><a href="javascript:removeLine('+ (parseInt(lastchild.prev().attr('data-pos'))+1)+ ')">Remove</a></div>');
	} else {
		alert('Please fill in all fields of the previous item before adding another row.')
	}
}

function editShop(section) {
	var template = '{{Shop';
	var pos;
	$('.shopaddform div[data-pos]').each(function() {
		pos = $(this).attr('data-pos');
		template += '\n|'+ $(this).find('[name="item"]').val()+ '|a'+ pos + '='+ $(this).find('[name="amount"]').val()+ '|p'+ pos + '='+ $(this).find('[name="price"]').val().replace('gp','');
	})
	template += '\n}}';
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info|revisions',
		'intoken':'edit',
		'rvprop':'content|ids',
		'rvlimit':'1',
		'indexpageids':'true',
		'rvsection':section,
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var content = typeof(page.revisions)!="undefined"?page.revisions[0]['*']:'';
		content = content.replace(/{{Shop\n(.|\n)+?\n+}}/, template);
		callAPI({
			'action':'edit',
			'title':wgPageName,
			'section':section,
			'token':page.edittoken,
			'text':content,
			'summary':'Editing shop stocks',
			'minor':'true'
		}, 'POST', function(response) {
			document.location.reload()
		})
	})
}

function removeShop(section) {
	if (!confirm('Are you sure you want to remove your personal shop?')) {return false;}
	callAPI({
		'action':'query',
		'titles':wgPageName,
		'prop':'info|revisions',
		'intoken':'edit',
		'rvprop':'content|ids',
		'rvlimit':'1',
		'indexpageids':'true',
		'rvsection':section,
	}, 'GET', function(response) {
		var edittoken = response.query.pages[response.query.pageids[0]].edittoken;
		callAPI({
			'action':'edit',
			'title':wgPageName,
			'section':section,
			'token':edittoken,
			'text':'',
			'summary':'Removing shop table',
			'minor':'true'
		}, 'POST', function(response) {
			document.location.reload()
		})
	})
}

//Item search

$('#searchitem').html('<form action="javascript:searchItem()" id="searchItem" style="float:right;border:1px solid black;padding:2px;"><b>Search for an item offer</b><br/><label>Item: <input type="text" id="searchItemName"></label> <button>Search</button><div id="searchItemOutput"></div></form>');

function searchItem() {
	var item = $('#searchItemName').val().toLowerCase().replace(/ |-/g,'_');
	var ownerlist = [];
	var priceslist = {}, amountslist = {};
	$('.item-'+item).each(function() {
		var owner = $(this).parents('table.shoptable').attr('class').replace(/.*owner-([^ ]*).*/,'$1')
		ownerlist.push(owner)
		priceslist[owner] = $(this).attr('title');
		amountslist[owner] = $(this).find('.stock').html().match(/\s*0\s*/)?parseInt($(this).find('.carried').html())*-1:parseInt($(this).find('.stock').html());
	})
	$('#searchItemOutput').html('<ul>\n</ul>');
	for (var i=0;i<ownerlist.length;i++) {
		$('#searchItemOutput ul').append('<li><a href="#'+ownerlist[i]+'">'+$('#'+ownerlist[i]).html()+'</a> offers '+amountslist[ownerlist[i]]+' '+item.replace(/_/g,' ')+' for '+priceslist[ownerlist[i]]+'.</li>\n');
	}
}