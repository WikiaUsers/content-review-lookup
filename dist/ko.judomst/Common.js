/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "리다이렉트",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "취소선",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "줄바꿈",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
		"speedTip": "편집자에게만 보임",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};
}