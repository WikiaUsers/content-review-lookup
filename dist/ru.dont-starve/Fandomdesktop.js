$(function(){
	$('.wds-tabber > * > .wds-tabs > .wds-tabs__tab').each(function(){
		$(this).click(function() {
			hash = $(this).text().trim();
			$('.wds-tabber').each(function(){
    			currentTab = $('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab:contains('+hash+')', $(this));
				if(currentTab.length){
    				indexOfTab = $(currentTab).parent().children('.wds-tabs__tab').toArray().indexOf(currentTab.toArray()[0]);
        			$('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab', this).each(function(){
        				$(this).removeClass('wds-is-current');
        			});
        			$(this).children('.wds-tab__content').each(function(){
            			$(this).removeClass('wds-is-current');
        			});
        			$($('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab', this)[indexOfTab]).addClass('wds-is-current');
        			$($(this).children('.wds-tab__content')[indexOfTab]).addClass('wds-is-current');
    			}
			});
		});
	});
});

var intervalCPH = setInterval(customph, 500)
function customph() {
    if ($(".Comment_wrapper__2mxBn").length) {
        clearInterval(intervalCPH)
        commentSection = document.getElementsByClassName('CommentList_comment-list__2eFaY')
        commentSection[0].onclick = function(event) {
            if (event.target.classList.contains('FormEntryPoint_form-entry-point__1Ohw9')) {
                var intervalCPH2 = setInterval(customph2, 200)

                function customph2() {

                    if ($(".rich-text-editor__content.is-desktop.is-empty").length) {
                        clearInterval(intervalCPH2)
                        $('.rich-text-editor__content.is-desktop.is-empty').attr('data-placeholder', 'Поделитесь своим мнением, но старайтесь не отвечать на сообщения старше 6 месяцев!')
                    }
                }
            }
        }
    }
}