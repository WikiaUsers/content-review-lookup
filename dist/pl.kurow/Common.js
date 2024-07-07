 /** Extra toolbar options ****************************************************** <nowiki>
  *
  *  Description: UNDOCUMENTED
  *  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
  */
 
 //This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
 // This is based on the original code on Wikipedia:Tools/Editing tools
 // To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 }
 
 /*</nowiki>*/