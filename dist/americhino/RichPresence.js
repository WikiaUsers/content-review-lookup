// literally just creates the label i was bored don't use kthxbye
var activityLabel = $('<li>');
activityLabel
	.addClass('rich-activity ra-game')
	.text(' Fortnite')
	.prepend(
		$('<span>')
		.addClass('rich-activity ra-label')
		.text('Playing')
	);
$('.masthead-info > .details > ul').append(activityLabel);
$(activityLabel).append('<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="RichActivity"><path d="M6,7 L2,7 L2,6 L6,6 L6,7 Z M8,5 L2,5 L2,4 L8,4 L8,5 Z M8,3 L2,3 L2,2 L8,2 L8,3 Z M8.88888889,0 L1.11111111,0 C0.494444444,0 0,0.494444444 0,1.11111111 L0,8.88888889 C0,9.50253861 0.497461389,10 1.11111111,10 L8.88888889,10 C9.50253861,10 10,9.50253861 10,8.88888889 L10,1.11111111 C10,0.494444444 9.5,0 8.88888889,0 Z" fill-rule="evenodd"></path></svg>');
mw.util.addCSS('.RichActivity{fill:#fff;margin-bottom:-2px;margin-left:4px}');