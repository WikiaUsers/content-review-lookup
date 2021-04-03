
/**
 * Easy Copy Input
 * Author: Dantman
 */
 
function initCPinput() {
	$('span.cpinput').each(function() {
		$('<input class=cpinput title="右クリックしてコピーを選択" readonly="readonly" />' )
			.val($(this).html())
			.click(cpInputOnClick).focus(cpInputOnFocus).blur(cpInputOnBlur)
			.insertBefore(this);
		$(this).remove();
	});
}
$(initCPinput);
 
function cpInputOnClick() {
	this.focus();
}
function cpInputOnFocus() {
	this.select();
	this.style.backgroundColor = '#0000FF';
}
function cpInputOnBlur() {
	this.style.backgroundColor = '#FFFFFF';
}