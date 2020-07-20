/* Admin highlights */
highlight = {
    sysop: '#DAA520'
};

/* Custom edit buttons for source mode */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Masukkan templat infobox karakter",
		"tagOpen": "\{\{Character infobox\r| nation         = ",
		"tagClose": "\r| image          = \r| alsoknown      = \r| nationality    = \r| ethnicity      = \r| age            = \r| birth          = \r| death          = \r| gender         = \r| height         = \r| eyes           = \r| hair           = \r| skincolor      = \r| skintype       = \r| loveinterest   = \r| allies         = \r| enemies        = \r| weapon         = \r| fightingstyle  = \r| profession     = \r| position       = \r| reign          = \r| pred           = \r| success        = \r| affiliation    = \r| appearance     = \r| lastappearance = \r| voice          = \r| actor          = \r| more           = \r\}\}",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Tag referensi episode/isu",
		"tagOpen": "<ref name=\"\">{{Cite episode|2|4",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Masukkan templat imagebox",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| film        = \r| series      = \r| season      = \r| episode     = \r| source      = \r| origin      = \r| cats        = \r| license     = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Tag gambar tidak dikreditkan",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Mendukung",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Menentang",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Netral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Memilih untuk tetap",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Memilih untuk hapus",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Memilih untuk menggabungkan",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Selesai",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Tidak selesai",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};
}

//* Forum Reply Reverse Chronological Order And Highlight Certain Threads *//
var reverseForumPageNames = ['Thread:1282421'];
if (reverseForumPageNames.indexOf(wgPageName) !== -1) {
	$('.replies > li').not('.replies .new-reply').not('.replies li:last-child').each(function() {
		$(this).prependTo(this.parentNode);
	});

	var forumNameArray = ['Mike.DiMartino','Bryan.Konietzko'];
	$('.replies .message').each(function() {
		var that = this;
		$.each(forumNameArray, function(key,value) {
			var url = 'a[href="http://id.avatar.wikia.com/wiki/Message_Wall:' + value + '"]';
			if ($(that).children().find(url).length) {
				$(that).css('background','#A6D785');
			}
		});
	});
}