

/* 편집창 위의 단추 추가 */
  function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
   {"imageFile": imageFile, "speedTip": speedTip, "tagOpen": tagOpen, "tagClose": tagClose, "sampleText": sampleText};
  }
  addCustomButton('https://images.wikia.nocookie.net/suju/ko/images//4/43/Button_KST.png', '한국시간으로 서명하기', '--\~\~\~ \{\{SUBST:KSTS\}\}', '', '');