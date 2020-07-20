function customChatBanTime() {
	if (!$("#ChatBanModal").length) {
		return;
	}
	var expirySelector = $('[name="expires"]');
	$(".neutral").prepend("<input type='text' name='cust-chat-expiry' label='Custom time (seconds):'><a id='custBanExp' class='wikia-button'>Add</a><br />");
	$("#custBanExp").click( function () {
		var custInput = $('[name="cust-chat-expiry"]');
		if (custInput.val() == "")
			return;
		expirySelector.append('<option value="' + custInput.val() + '">' + custInput.val() + ' seconds</option>');
	});
}