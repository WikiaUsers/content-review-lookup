$(function(){
	if ($('.number-of-users').length === 0){
		return;
	}
	
	new mw.Api().get({
		action:'listuserssearchuser',
		contributed:'1',
		limit:'0',
		order:'ts_edit',
		sort:'desc',
		offset:'0',
	}).done(function(result){
		$('.number-of-users').text(result.listuserssearchuser.result_count);
	});
});