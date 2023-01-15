/**
 * Adds a button to text within <pre> tags to copy contents to a clipboard.
 * Base code from https://www.foxinfotech.in/2022/04/adding-copy-button-to-all-pre-tags-in-a-page.html
 * 
 * @requires	jQuery
 * @author User:Cephalon Scientia
 */
$(function() {
	var copyId = 0;		// for differentiating between multiple pre tags on the same page
	$('.copy pre').each(function(){
		copyId++;
		$(this).attr('data-copyId', copyId).wrap('<div class="pre-wrapper"/>');
		$(this).parent().css('margin', $(this).css('margin'));
		$('<button class="copy-snippet">Copy</button>').insertAfter($(this)).data('copytarget', copyId);
	});

	$('body').on('click', '.copy-snippet', function(event) {
		event.preventDefault();

		var $copyButton = $(this);

		$pre = $(document).find('pre[data-copyId=' + $copyButton.data('copytarget') + ']');
		if ($pre.length) {
			var textArea = document.createElement("textarea");

			// Place in top-left corner of screen regardless of scroll position.
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;

			// Ensure it has a small width and height. Setting to 1px / 1em
			// doesn't work as this gives a negative w/h on some browsers.
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			
			// We don't need padding, reducing the size if it does flash render.
			textArea.style.padding = 0;

			// Clean up any borders.
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';

			// Avoid flash of white box if rendered for any reason.
			textArea.style.background = 'transparent';

			// Set value to text to be copied
			textArea.value = $pre.text();

			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
				$copyButton.text('Copied to clipboard').prop('disabled', true);
			} catch (err) {
				$copyButton.text('Failed to copy, try again').prop('disabled', true);
			}
			setTimeout(function(){
				$copyButton.text('Copy').prop('disabled', false);
			}, 2000);
			textArea.remove();
		}
	});
});