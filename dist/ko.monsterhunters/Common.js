/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/*************************************************************************/

/*************************************************************************/
/* 맨 위로 바로가기 버튼 */
$(function() {
	if (wgNamespaceNumber != 2) {
		$('#WikiaRail').append('<div id="toTop"><img src="https://images.wikia.nocookie.net/cafeinlove/ko/images/b/b3/Up-arrow.png" /></div>' );
		$(window).scroll(function() {
			if($(this).scrollTop() > 400) {
				$('#toTop').fadeIn();	
			} else {
				$('#toTop').fadeOut();
			}
		});
 		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},100);
		});
	}
});
 
/*************************************************************************/
/* 편집창 위의 단추 추가 */
  function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
   {"imageFile": imageFile, "speedTip": speedTip, "tagOpen": tagOpen, "tagClose": tagClose, "sampleText": sampleText};
  }
  addCustomButton('https://images.wikia.nocookie.net/suju/ko/images//4/43/Button_KST.png', '한국시간으로 서명하기', '--\~\~\~ \{\{SUBST:KSTS\}\}', '', '');