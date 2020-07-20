importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});

window.SignatureCheckJS = {
	// Parts of the confirm prompt
        preamble: 'Quên ký tênn\n\n',
	        noSignature: ' Có lẽ bạn đã quên ký tên diễn đàn. Dùng ~~<nowiki>~~</nowiki> để ký tên để nhằm không phải là Zombie ký tên.\n',
        epilogue: '\n Nếu bạn không ký tên diễn đàn, một bảo quản viên sẽ cảnh cáo bạn ngay, bạn có thực sự muốn gửi? \n'
	// Other stuff
	checkSignature: true // Enable the signature check function
};