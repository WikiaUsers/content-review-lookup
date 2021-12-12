$(function() {

if (!$("body").hasClass("action-view")) return false;
 
function sep(number) {
	return (number.toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertb(number, check) {
	if (number > 1048576) {
		number = (number/1048576).toFixed(3).replace(/\.?0+$/g, '');
		if (check === 0) return sep(number);
		else return sep(number)+'MB';
	}
	if (number > 1024) {
		number = (number/1024).toFixed(3).replace(/\.?0+$/g, '');
		return sep(number)+'KB';
	}
	if (number === 0) return number;
	return sep(number) + ' bytes';
}

var	parseprofile = mw.config.get('wgPageParseReport');
var	limitr = parseprofile.limitreport;
var	scrib = parseprofile.scribunto;

new mw.Api().get({
	action: "query",
	meta: "allmessages",
	ammessages: "limitreport-title|limitreport-cputime|limitreport-walltime|limitreport-ppvisitednodes|limitreport-ppgeneratednodes|limitreport-postexpandincludesize|limitreport-templateargumentsize|limitreport-expansiondepth|limitreport-expensivefunctioncount|limitreport-unstrip-depth|limitreport-unstrip-size|scribunto-limitreport-timeusage|scribunto-limitreport-memusage",
    format: "json"
}).done(function(data){
	var messages = data.query.allmessages;
	$('.page__right-rail div.right-rail-wrapper').prepend(
		$('<div>', {
			id: 'PPData-Rightrail',
			'class': 'rail-module wds-collapsible-panel wds-is-collapsed' 
		}).css({'margin-top': '10px', 'padding-bottom': '5px'}).prepend(
			$('<h2>', { 
				'class': 'wds-collapsible-panel__header',
				text: messages[0]['*']
			}).css({
				'padding': '5px 0',
				'margin-left': '0',
				'margin-right': '15px',
				'display': 'inline-flex'
			}).append(
				$('<svg class="wds-icon wds-icon-tiny wds-collapsible-panel__chevron"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>')),
			$('<div>', { 'class': 'wds-collapsible-panel__content'}).prepend(
				$('<ul>').css('font-size', '13px').append(
					$('<li>', {
						text: messages[1]['*'] + ': ' + limitr.cputime + 's'
					}),
					$('<li>', {
						text: messages[2]['*'] + ': ' + limitr.walltime + 's'
					}),
					$('<li>', {
						text: messages[3]['*'] + ': ' + sep(limitr.ppvisitednodes.value) + '/' + sep(limitr.ppvisitednodes.limit)
					}),
					$('<li>', {
						text: messages[4]['*'] + ': ' + sep(limitr.ppgeneratednodes.value) + '/' + sep(limitr.ppgeneratednodes.limit)
					}),
					$('<li>', {
						text: messages[5]['*'] + ': ' + convertb(limitr.postexpandincludesize.value,0) + '/' + convertb(limitr.postexpandincludesize.limit,1)
					}),
					$('<li>', {
						text: messages[6]['*'] + ': ' + convertb(limitr.templateargumentsize.value,0) + '/' + convertb(limitr.templateargumentsize.limit,1)
					}),
					$('<li>', {
						text: messages[7]['*'] + ': ' + limitr.expansiondepth.value + '/' + limitr.expansiondepth.limit
					}),
					$('<li>', {
						text: messages[8]['*'] + ': ' + limitr.expensivefunctioncount.value + '/' + limitr.expensivefunctioncount.limit
					}),
					$('<li>', {
						text: messages[9]['*'] + ': ' + limitr['unstrip-depth'].value + '/' + limitr['unstrip-depth'].limit
					}),
					$('<li>', {
						text: messages[10]['*'] + ': ' + sep(limitr['unstrip-size'].value) + '/' + sep(limitr['unstrip-size'].limit) + ' bytes'
					})
				)
			)
		)
	);
	if (!$.isEmptyObject(scrib)) {
		$('#PPData-Rightrail .wds-collapsible-panel__content ul').append(
			$('<li>', {
				text: messages[11]['*'] + ': ' + scrib['limitreport-timeusage'].value + '/' + scrib['limitreport-timeusage'].limit + 's'
			}),
			$('<li>', {
				text: messages[12]['*'] + ': ' + convertb(scrib['limitreport-memusage'].value,0) + '/' + convertb(scrib['limitreport-memusage'].limit,1)
			})
		);
	}
});

});