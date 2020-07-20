$('.wpSummaryFields .checkboxes').append(
	$('<label />',{class: 'wpRequestReview'}).append(
        $('<span />').text('Request review'),
		$('<select />',{tabindex: 22, name:'wpRequestReview', id:'wpRequestReview', accesskey:'i',disabled:true}).css('display','block').append(
            $('<option />',{value:'none'}).text('none')
		)
	)
);

reviewOptions = {
	'content-review': 'Content Review',
	'technical-review': 'Technical Review'
}
Object.keys(reviewOptions).forEach(function(v) {
	$('<option />',{value:v}).text(reviewOptions[v]).appendTo($('#wpRequestReview'));
});

$('#wpRequestReview').prop('disabled',false);

$('#wpSave').click(function() {
	console.log('save... Review?',$('#wpRequestReview').val() === 'none' ? false : $('#wpRequestReview').val())
});

function logRequest() {

}

function markAsDone() {

}

function loadReviewJSON() {
    require(['BannerNotification'],function(BannerNotification) {
	new BannerNotification('this: ' + wgRedirectedFrom,'notify').show();
    });
}

function writeReviewJSON() {

}